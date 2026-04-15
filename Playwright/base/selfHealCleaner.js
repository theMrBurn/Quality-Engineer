#!/usr/bin/env node
/**
 * selfHealCleaner — self-service suggestion apply tool.
 *
 * Reads the suggestion store written by Track 2, discovers POM files for the
 * project, and presents pending signals as numbered, actionable options.
 * The engineer decides what to apply — nothing happens without an explicit flag.
 *
 * Modes:
 *   Display (default)  — list pending suggestions with copy-paste apply commands
 *   Apply fallback     — write a `static fallbacks` entry to the POM (safe, additive)
 *   Apply locator      — insert a new locator into `this.locators` (pom_addition)
 *   Patch              — write a human-readable patch file instead of modifying code
 *   Ignore             — mark a suggestion ignored / false_positive in the store
 *
 * Usage:
 *   node Playwright/base/selfHealCleaner.js --project DenaliLPPTest
 *   node Playwright/base/selfHealCleaner.js --project DenaliLPPTest --apply-key loginButton --mode fallback
 *   node Playwright/base/selfHealCleaner.js --project DenaliLPPTest --apply-key exportButton --mode locator --target denaliPortal.js
 *   node Playwright/base/selfHealCleaner.js --project DenaliLPPTest --ignore-key someNoise
 *   node Playwright/base/selfHealCleaner.js --project DenaliLPPTest --output patch
 *   node Playwright/base/selfHealCleaner.js --project DenaliLPPTest --dry-run --apply-key loginButton --mode fallback
 *   node Playwright/base/selfHealCleaner.js --project DenaliLPPTest --clean-noise
 *
 * Makefile shortcuts:
 *   make suggest PROJECT=DenaliLPPTest
 *   make patch   PROJECT=DenaliLPPTest
 */

"use strict";

const fs   = require("fs");
const path = require("path");

const SUGGESTIONS_DIR  = path.resolve(__dirname, "../regression-data/suggestions");
const PATCHES_DIR      = path.resolve(__dirname, "../regression-data/patches");
const PROJECTS_JSON    = path.resolve(__dirname, "../../projects.json");
const REPO_ROOT        = path.resolve(__dirname, "../..");

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Keys produced by the DOM scraper fallback (tagName_index). Not actionable. */
const NOISE_KEY_RE = /^[a-z]+_\d+$/;

// ---------------------------------------------------------------------------
// ANSI helpers
// ---------------------------------------------------------------------------
const C = {
  reset:      "\x1b[0m",
  dim:        "\x1b[2m",
  bold:       "\x1b[1m",
  red:        "\x1b[31m",
  yellow:     "\x1b[33m",
  green:      "\x1b[32m",
  cyan:       "\x1b[36m",
  redBold:    "\x1b[1;31m",
  yellowBold: "\x1b[1;33m",
  greenDim:   "\x1b[2;32m",
  sep:        "\x1b[2m│\x1b[0m",
};

// ---------------------------------------------------------------------------
// File system helpers
// ---------------------------------------------------------------------------

function walkFiles(dir, ext = ".js") {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(walkFiles(full, ext));
      } else if (entry.name.endsWith(ext)) {
        results.push(full);
      }
    }
  } catch { /* skip unreadable */ }
  return results;
}

/**
 * Find all .js files in testDir that extend BasePOM.
 * Returns absolute paths.
 */
function discoverPOMFiles(testDir) {
  const absDir = path.isAbsolute(testDir)
    ? testDir
    : path.resolve(REPO_ROOT, testDir);

  return walkFiles(absDir).filter((f) => {
    try {
      return fs.readFileSync(f, "utf-8").includes("extends BasePOM");
    } catch {
      return false;
    }
  });
}

/**
 * Extract locator keys declared in `this.locators = { ... }` in a POM file.
 */
function extractLocatorKeys(content) {
  const block = content.match(/this\.locators\s*=\s*\{([\s\S]*?)^\s*\};?/m);
  if (!block) return [];
  return [...block[1].matchAll(/^\s{6,}(\w+)\s*:/gm)].map((m) => m[1]);
}

/**
 * Extract keys declared in `static expectedLocators = [...]`.
 */
function extractExpectedLocators(content) {
  const block = content.match(/static\s+expectedLocators\s*=\s*\[([\s\S]*?)\]/m);
  if (!block) return [];
  return [...block[1].matchAll(/"(\w+)"/g)].map((m) => m[1]);
}

// ---------------------------------------------------------------------------
// Suggestion store helpers
// ---------------------------------------------------------------------------

function loadStore(projectName) {
  const filePath = path.join(SUGGESTIONS_DIR, `${projectName}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function saveStore(store) {
  const filePath = path.join(SUGGESTIONS_DIR, `${store.projectName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(store, null, 2));
}

function loadProjects() {
  try {
    return JSON.parse(fs.readFileSync(PROJECTS_JSON, "utf-8"));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// POM file patching
// ---------------------------------------------------------------------------

/**
 * Add or update a key in the `static fallbacks` declaration.
 * If `static fallbacks` doesn't exist, inserts it after `static expectedLocators`.
 * Returns the modified file content, or null if the file couldn't be patched.
 */
function patchStaticFallbacks(content, key, selector) {
  const escaped = selector.replace(/'/g, "\\'");
  const newEntry = `    ${key}: ['${escaped}'],`;

  // Case 1: static fallbacks already exists — merge
  const fallbacksBlockMatch = content.match(/(static\s+fallbacks\s*=\s*\{)([\s\S]*?)(\n\s*\};)/);
  if (fallbacksBlockMatch) {
    const [, open, body, close] = fallbacksBlockMatch;
    // Key already present inside the fallbacks block — update it
    if (new RegExp(`\\b${key}\\s*:`).test(body)) {
      const updatedBody = body.replace(
        new RegExp(`(\\b${key}\\s*:\\s*\\[)[^\\]]*\\]`),
        `$1'${escaped}']`
      );
      return content.replace(fallbacksBlockMatch[0], `${open}${updatedBody}${close}`);
    }
    // Key not present — append before closing brace
    return content.replace(
      fallbacksBlockMatch[0],
      `${open}${body}\n${newEntry}${close}`
    );
  }

  // Case 2: no static fallbacks yet — insert after static expectedLocators
  const expectedMatch = content.match(/(static\s+expectedLocators\s*=\s*\[[\s\S]*?\];?)/m);
  if (expectedMatch) {
    const insertion =
      `\n\n  // Approach 3 fallbacks — populated by selfHealCleaner.\n` +
      `  // Add selectors here to explicitly declare healing candidates for this POM.\n` +
      `  static fallbacks = {\n${newEntry}\n  };`;
    return content.replace(expectedMatch[0], expectedMatch[0] + insertion);
  }

  return null;
}

/**
 * Append a new locator entry to `this.locators = { ... }`.
 * Returns modified content or null.
 */
function patchLocatorsBlock(content, suggestedCode) {
  // Find the closing brace of this.locators = { ... }
  // The pattern is: last locator entry, then optional trailing comma/newline, then `    };`
  const match = content.match(/([ \t]+\};?\s*\n)([ \t]+\};\s*\n)/m);
  if (!match) return null;

  const indented = suggestedCode.trim();
  return content.replace(
    /(this\.locators\s*=\s*\{[\s\S]*?)([ \t]+\};)/m,
    (_, body, closing) => `${body}      ${indented}\n    ${closing.trim()}`
  );
}

// ---------------------------------------------------------------------------
// Patch file generation
// ---------------------------------------------------------------------------

function generatePatchFile(projectName, store, pomFiles) {
  const { suggestions = [], goldenSelectors = {} } = store;
  const pending = suggestions.filter((s) => s.status === "pending");

  if (pending.length === 0) {
    return "# No pending suggestions — nothing to patch.\n";
  }

  const lines = [];
  lines.push(`# Self-Heal Patch — ${projectName}`);
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push(`# Apply: node Playwright/base/selfHealCleaner.js --project ${projectName} --apply-key <key> --mode <fallback|locator>`);
  lines.push("");

  const regressions = pending.filter((s) => s.type === "regression");
  const additions   = pending.filter((s) => s.type === "pom_addition" && !NOISE_KEY_RE.test(s.key));

  if (regressions.length > 0) {
    lines.push("## REGRESSIONS — locator broke, element not found in DOM");
    lines.push("## Action: add to `static fallbacks` to enable auto-heal on retry");
    lines.push("");

    for (const s of regressions) {
      const golden = goldenSelectors[s.key];
      lines.push(`### ${s.key}`);
      lines.push(`# Missed: ${s.missCount}x · Last test: ${s.lastTestTitle}`);
      lines.push(`# Last URL: ${s.lastUrl ?? "unknown"}`);
      lines.push("");

      if (golden) {
        lines.push("# Add this to the POM class:");
        lines.push("# -----------------------------------------------------------------");
        lines.push("  static fallbacks = {");
        lines.push(`    ${s.key}: ['${golden}'],`);
        lines.push("  };");
        lines.push("# -----------------------------------------------------------------");
        lines.push("");
        lines.push("# Or apply directly:");
        lines.push(`#   node Playwright/base/selfHealCleaner.js --project ${projectName} --apply-key ${s.key} --mode fallback`);
      } else {
        lines.push("# No golden selector captured yet.");
        lines.push("# Run a passing test to build the golden selector, then rerun this command.");
      }
      lines.push("");
    }
  }

  if (additions.length > 0) {
    lines.push("## NEW ELEMENTS — found on page, not declared in POM");
    lines.push("## Action: add to `this.locators` and `static expectedLocators`");
    lines.push("");

    for (const s of additions) {
      lines.push(`### ${s.key}`);
      lines.push(`# Seen: ${s.seenCount}x · Last test: ${s.lastTestTitle}`);
      lines.push(`# Last URL: ${s.lastUrl ?? "unknown"}`);
      lines.push("");

      if (s.suggestedCode) {
        lines.push("# Add to this.locators:");
        lines.push("# -----------------------------------------------------------------");
        lines.push(s.suggestedCode);
        lines.push("# -----------------------------------------------------------------");
        lines.push("");
        lines.push("# Also add the key to static expectedLocators:");
        lines.push(`#   "${s.key}",`);
        lines.push("");
        lines.push("# Or apply directly:");
        lines.push(`#   node Playwright/base/selfHealCleaner.js --project ${projectName} --apply-key ${s.key} --mode locator --target <pomFile.js>`);
      }
      lines.push("");
    }
  }

  // Append POM file map at the bottom
  if (pomFiles.length > 0) {
    lines.push("## POM files discovered for this project");
    for (const f of pomFiles) {
      lines.push(`#   ${path.relative(REPO_ROOT, f)}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Display (default mode)
// ---------------------------------------------------------------------------

function display(projectName, store, pomFiles) {
  const { suggestions = [], goldenSelectors = {} } = store;
  const pending = suggestions.filter((s) => s.status === "pending");

  const HR   = `${C.dim}${"─".repeat(88)}${C.reset}`;
  const THIN = `  ${C.dim}${"─".repeat(84)}${C.reset}`;

  console.log("");
  console.log(`${C.bold}Self-Heal Cleaner${C.reset}  ${C.sep}  ${C.cyan}${projectName}${C.reset}`);
  console.log("");

  if (pomFiles.length === 0) {
    console.log(`  ${C.yellow}No POM files discovered in testDir for ${projectName}.${C.reset}`);
    console.log(`  ${C.dim}Check that the testDir in projects.json is correct.${C.reset}`);
    console.log("");
  } else {
    console.log(`  ${C.dim}POM files:${C.reset}`);
    for (const f of pomFiles) {
      console.log(`    ${C.dim}${path.relative(REPO_ROOT, f)}${C.reset}`);
    }
    console.log("");
  }

  if (pending.length === 0) {
    console.log(`  ${C.greenDim}No pending suggestions — everything looks clean.${C.reset}`);
    console.log("");
    return;
  }

  const regressions = pending.filter((s) => s.type === "regression");
  const additions   = pending.filter((s) => s.type === "pom_addition" && !NOISE_KEY_RE.test(s.key));
  const noiseCount  = pending.filter((s) => s.type === "pom_addition" &&  NOISE_KEY_RE.test(s.key)).length;

  // ── Regressions ────────────────────────────────────────────────────────────
  if (regressions.length > 0) {
    console.log(`  ${C.redBold}REGRESSIONS${C.reset}${C.dim} — locator broke, element not found in DOM${C.reset}`);
    console.log(THIN);

    for (const s of regressions) {
      const golden = goldenSelectors[s.key];
      console.log("");
      console.log(
        `  ${C.redBold}✗${C.reset} ${C.bold}${s.key}${C.reset}` +
        `  ${C.dim}missed ${s.missCount ?? 1}x · ${s.lastTestTitle ?? ""}${C.reset}`
      );
      console.log(`    ${C.dim}last url: ${s.lastUrl ?? "unknown"}${C.reset}`);

      if (golden) {
        console.log(`    ${C.green}golden selector: ${C.reset}${C.bold}${golden}${C.reset}`);
        console.log("");
        console.log(`    ${C.dim}Options:${C.reset}`);
        console.log(`      ${C.yellow}a)${C.reset} Add to ${C.bold}static fallbacks${C.reset} ${C.dim}(safe — keeps primary locator, adds healing backup)${C.reset}`);
        console.log(`         ${C.dim}make suggest PROJECT=${projectName} ARGS="--apply-key ${s.key} --mode fallback"${C.reset}`);
        console.log(`         ${C.dim}node Playwright/base/selfHealCleaner.js --project ${projectName} --apply-key ${s.key} --mode fallback${C.reset}`);
        console.log("");
        console.log(`      ${C.yellow}b)${C.reset} Preview change without writing ${C.dim}(--dry-run)${C.reset}`);
        console.log(`         ${C.dim}node Playwright/base/selfHealCleaner.js --project ${projectName} --apply-key ${s.key} --mode fallback --dry-run${C.reset}`);
        console.log("");
        console.log(`      ${C.yellow}c)${C.reset} Mark as false positive ${C.dim}(ignore — won't reappear in reports)${C.reset}`);
        console.log(`         ${C.dim}node Playwright/base/selfHealCleaner.js --project ${projectName} --ignore-key ${s.key}${C.reset}`);
      } else {
        console.log(`    ${C.yellow}no golden selector yet — run a passing test to capture one${C.reset}`);
      }
    }
    console.log("");
  }

  // ── New elements ───────────────────────────────────────────────────────────
  if (additions.length > 0) {
    console.log(`  ${C.yellowBold}NEW ELEMENTS${C.reset}${C.dim} — found on page, not declared in POM${C.reset}`);
    console.log(THIN);

    for (const s of additions) {
      console.log("");
      console.log(
        `  ${C.yellowBold}⚠${C.reset} ${C.bold}${s.key}${C.reset}` +
        `  ${C.dim}seen ${s.seenCount ?? 1}x · ${s.lastTestTitle ?? ""}${C.reset}`
      );
      console.log(`    ${C.dim}last url: ${s.lastUrl ?? "unknown"}${C.reset}`);

      if (s.suggestedCode) {
        console.log(`    ${C.green}suggested locator:${C.reset}`);
        console.log(`      ${C.bold}${s.suggestedCode.trim()}${C.reset}`);
        console.log("");
        console.log(`    ${C.dim}Options:${C.reset}`);

        const targets = pomFiles.map((f) => path.basename(f));
        const targetFlag = targets.length === 1
          ? `--target ${targets[0]}`
          : `--target <${targets.join("|")}>`;

        console.log(`      ${C.yellow}a)${C.reset} Add locator to POM ${C.dim}(inserts into this.locators + expectedLocators)${C.reset}`);
        console.log(`         ${C.dim}node Playwright/base/selfHealCleaner.js --project ${projectName} --apply-key ${s.key} --mode locator ${targetFlag}${C.reset}`);
        console.log("");
        console.log(`      ${C.yellow}b)${C.reset} Mark as ignored ${C.dim}(element is noise, not worth tracking)${C.reset}`);
        console.log(`         ${C.dim}node Playwright/base/selfHealCleaner.js --project ${projectName} --ignore-key ${s.key}${C.reset}`);
      }
    }
    console.log("");
  }

  if (noiseCount > 0) {
    console.log(`  ${C.dim}${noiseCount} scraper noise entr${noiseCount === 1 ? "y" : "ies"} suppressed (tagName_index keys).${C.reset}`);
    console.log(`  ${C.dim}Bulk-ignore: node Playwright/base/selfHealCleaner.js --project ${projectName} --clean-noise${C.reset}`);
    console.log("");
  }

  console.log(HR);
  console.log(`  ${C.dim}Generate patch file: make patch PROJECT=${projectName}${C.reset}`);
  console.log(`  ${C.dim}Full report:         make report PROJECT=${projectName}${C.reset}`);
  console.log("");
}

// ---------------------------------------------------------------------------
// Apply
// ---------------------------------------------------------------------------

function applyFallback({ store, key, pomFiles, dryRun }) {
  const golden = store.goldenSelectors?.[key];
  if (!golden) {
    console.error(`  ${C.red}No golden selector for '${key}'. Run a passing test first.${C.reset}`);
    process.exit(1);
  }

  // Find the POM that declares this key in expectedLocators
  let targetFile = null;
  let targetContent = null;
  for (const f of pomFiles) {
    const content = fs.readFileSync(f, "utf-8");
    const keys    = extractExpectedLocators(content);
    if (keys.includes(key)) {
      targetFile    = f;
      targetContent = content;
      break;
    }
  }

  if (!targetFile) {
    // Fall back to first POM if key not found in any expectedLocators
    if (pomFiles.length === 0) {
      console.error(`  ${C.red}No POM files found for this project.${C.reset}`);
      process.exit(1);
    }
    targetFile    = pomFiles[0];
    targetContent = fs.readFileSync(targetFile, "utf-8");
    console.warn(`  ${C.yellow}Key '${key}' not found in any expectedLocators — targeting ${path.basename(targetFile)}${C.reset}`);
  }

  const patched = patchStaticFallbacks(targetContent, key, golden);
  if (!patched) {
    console.error(`  ${C.red}Could not patch ${path.basename(targetFile)} — static expectedLocators not found.${C.reset}`);
    console.error(`  ${C.dim}Add the entry manually:${C.reset}`);
    console.error(`    static fallbacks = { ${key}: ['${golden}'] };`);
    process.exit(1);
  }

  const relPath = path.relative(REPO_ROOT, targetFile);

  if (dryRun) {
    console.log(`\n  ${C.bold}DRY RUN — no files written${C.reset}`);
    console.log(`  Would patch: ${C.cyan}${relPath}${C.reset}`);
    console.log(`  Would add:   ${C.green}static fallbacks.${key} = ['${golden}']${C.reset}\n`);
    return;
  }

  fs.writeFileSync(targetFile, patched);

  // Mark suggestion applied
  const entry = store.suggestions.find(
    (s) => s.type === "regression" && s.key === key
  );
  if (entry) {
    entry.status   = "applied";
    entry.appliedAt = new Date().toISOString();
    saveStore(store);
  }

  console.log(`\n  ${C.green}✓${C.reset} Patched ${C.cyan}${relPath}${C.reset}`);
  console.log(`  ${C.dim}Added static fallbacks.${key} = ['${golden}']${C.reset}`);
  console.log(`  ${C.dim}Rerun tests — if they pass via heal, promote to primary locator.${C.reset}\n`);
}

function applyLocator({ store, key, pomFiles, targetBasename, dryRun }) {
  const entry = store.suggestions.find(
    (s) => s.type === "pom_addition" && s.key === key
  );
  if (!entry || !entry.suggestedCode) {
    console.error(`  ${C.red}No pom_addition suggestion with code for '${key}'.${C.reset}`);
    process.exit(1);
  }

  let targetFile = pomFiles.find((f) => path.basename(f) === targetBasename);
  if (!targetFile) {
    if (pomFiles.length === 1) {
      targetFile = pomFiles[0];
    } else {
      console.error(`  ${C.red}Specify --target <filename>. Available: ${pomFiles.map((f) => path.basename(f)).join(", ")}${C.reset}`);
      process.exit(1);
    }
  }

  const content = fs.readFileSync(targetFile, "utf-8");
  const patched = patchLocatorsBlock(content, entry.suggestedCode);
  const relPath = path.relative(REPO_ROOT, targetFile);

  if (!patched) {
    console.error(`  ${C.red}Could not locate this.locators block in ${path.basename(targetFile)}.${C.reset}`);
    console.error(`  ${C.dim}Add manually:${C.reset}\n  ${entry.suggestedCode.trim()}`);
    process.exit(1);
  }

  if (dryRun) {
    console.log(`\n  ${C.bold}DRY RUN — no files written${C.reset}`);
    console.log(`  Would patch: ${C.cyan}${relPath}${C.reset}`);
    console.log(`  Would add:   ${C.green}${entry.suggestedCode.trim()}${C.reset}`);
    console.log(`  ${C.dim}Also add "${key}" to static expectedLocators manually.${C.reset}\n`);
    return;
  }

  fs.writeFileSync(targetFile, patched);

  entry.status    = "applied";
  entry.appliedAt = new Date().toISOString();
  saveStore(store);

  console.log(`\n  ${C.green}✓${C.reset} Patched ${C.cyan}${relPath}${C.reset}`);
  console.log(`  ${C.dim}Added ${key} to this.locators.${C.reset}`);
  console.log(`  ${C.yellow}!${C.reset} ${C.dim}Also add "${key}" to static expectedLocators to enable Track 2 validation.${C.reset}\n`);
}

function ignoreKey({ store, key, type }) {
  const entry = store.suggestions.find(
    (s) => s.key === key && (type ? s.type === type : true)
  );
  if (!entry) {
    console.error(`  ${C.red}No suggestion found for key '${key}'${type ? ` (type: ${type})` : ""}.${C.reset}`);
    process.exit(1);
  }

  entry.status = entry.type === "regression" ? "false_positive" : "ignored";
  saveStore(store);

  console.log(`\n  ${C.dim}Marked '${key}' as ${entry.status}. It will no longer appear in pending reports.${C.reset}\n`);
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const get  = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] ?? null : null;
  };
  return {
    project:    get("--project"),
    applyKey:   get("--apply-key"),
    ignoreKey:  get("--ignore-key"),
    mode:       get("--mode"),      // "fallback" | "locator"
    target:     get("--target"),    // POM filename for --mode locator
    output:     get("--output"),    // "patch"
    dryRun:     args.includes("--dry-run"),
    pending:    args.includes("--pending-only"),
    cleanNoise: args.includes("--clean-noise"),
  };
}

function main() {
  const opts = parseArgs(process.argv);

  if (!opts.project) {
    console.error(`\n  ${C.red}--project <name> is required.${C.reset}`);
    console.error(`  ${C.dim}Example: node Playwright/base/selfHealCleaner.js --project DenaliLPPTest${C.reset}\n`);
    process.exit(1);
  }

  const store = loadStore(opts.project);
  if (!store) {
    console.log(`\n  ${C.dim}No suggestion store found for '${opts.project}'.${C.reset}`);
    console.log(`  ${C.dim}Run tests first — Track 2 writes suggestions automatically.${C.reset}\n`);
    return;
  }

  // Discover POM files from projects.json testDir
  const projects  = loadProjects();
  const project   = projects.find((p) => p.name === opts.project);
  const testDir   = project?.testDir ?? null;
  const pomFiles  = testDir ? discoverPOMFiles(testDir) : [];

  // ── Clean noise mode ───────────────────────────────────────────────────────
  if (opts.cleanNoise) {
    const noiseEntries = store.suggestions.filter(
      (s) => s.type === "pom_addition" && NOISE_KEY_RE.test(s.key) && s.status === "pending"
    );
    if (noiseEntries.length === 0) {
      console.log(`\n  ${C.greenDim}No noise entries to clean.${C.reset}\n`);
      return;
    }
    for (const e of noiseEntries) {
      e.status = "ignored";
    }
    saveStore(store);
    console.log(`\n  ${C.green}✓${C.reset} Ignored ${noiseEntries.length} noise entr${noiseEntries.length === 1 ? "y" : "ies"} (tagName_index keys).${C.reset}\n`);
    return;
  }

  // ── Patch output mode ──────────────────────────────────────────────────────
  if (opts.output === "patch") {
    const content = generatePatchFile(opts.project, store, pomFiles);
    fs.mkdirSync(PATCHES_DIR, { recursive: true });
    const outPath = path.join(PATCHES_DIR, `${opts.project}.patch.txt`);
    fs.writeFileSync(outPath, content);
    const relOut = path.relative(REPO_ROOT, outPath);
    console.log(`\n  ${C.green}✓${C.reset} Patch written to ${C.cyan}${relOut}${C.reset}`);
    console.log(`  ${C.dim}Review the file, then apply suggestions individually with --apply-key.${C.reset}\n`);
    return;
  }

  // ── Ignore mode ────────────────────────────────────────────────────────────
  if (opts.ignoreKey) {
    ignoreKey({ store, key: opts.ignoreKey, type: opts.mode });
    return;
  }

  // ── Apply mode ─────────────────────────────────────────────────────────────
  if (opts.applyKey) {
    if (!opts.mode) {
      console.error(`  ${C.red}--mode is required with --apply-key. Use: fallback | locator${C.reset}`);
      process.exit(1);
    }
    if (opts.mode === "fallback") {
      applyFallback({ store, key: opts.applyKey, pomFiles, dryRun: opts.dryRun });
    } else if (opts.mode === "locator") {
      applyLocator({ store, key: opts.applyKey, pomFiles, targetBasename: opts.target, dryRun: opts.dryRun });
    } else {
      console.error(`  ${C.red}Unknown --mode "${opts.mode}". Use: fallback | locator${C.reset}`);
      process.exit(1);
    }
    return;
  }

  // ── Default: display mode ──────────────────────────────────────────────────
  display(opts.project, store, pomFiles);
}

main();
