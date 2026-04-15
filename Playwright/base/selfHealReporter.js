#!/usr/bin/env node
/**
 * selfHealReporter — terminal reporter for Track 2 self-healing signals.
 *
 * Reads regression-data/suggestions/*.json and renders a formatted table
 * to stdout. Display patterns ported from the newsfeed_terminal project:
 *
 *   DataTable columns  → aligned signal table (Signal | Element | Count | Status | Last Test)
 *   _status_line()     → pipe-separated summary bar at the top
 *   [dim] seen items   → ANSI dim for applied/ignored/resolved rows
 *   severity="error"   → red bold for regressions
 *   severity="warning" → yellow for pending pom_addition suggestions
 *   cycle_source       → --project filter narrows to one project file
 *
 * Usage:
 *   node Playwright/base/selfHealReporter.js
 *   node Playwright/base/selfHealReporter.js --project GenericPOC
 *   node Playwright/base/selfHealReporter.js --type regression
 *   node Playwright/base/selfHealReporter.js --pending-only
 *   node Playwright/base/selfHealReporter.js --format markdown    # ADO/GitHub artifact
 *   node Playwright/base/selfHealReporter.js --format plain       # pipeline logs
 *
 * To mark a suggestion reviewed, set its `status` field in the JSON file:
 *   pom_addition → "applied" | "ignored"
 *   regression   → "resolved" | "false_positive"
 */

"use strict";

const fs   = require("fs");
const path = require("path");

const SUGGESTIONS_DIR = path.resolve(__dirname, "../regression-data/suggestions");

// ---------------------------------------------------------------------------
// ANSI helpers (mirrors Textual's Rich markup — [dim], [bold], severity colors)
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

/** Left-pad a string to `width`, truncating if longer. */
function col(str, width) {
  const s = String(str ?? "");
  return s.length >= width ? s.slice(0, width - 1) + "…" : s.padEnd(width);
}

// ---------------------------------------------------------------------------
// Badge renderers
// ---------------------------------------------------------------------------

function signalBadge(type) {
  if (type === "regression") return `${C.redBold}✗ missing ${C.reset}`;
  return `${C.yellowBold}⚠ new-elem${C.reset}`;
}

function statusBadge(status, type) {
  if (type === "regression") {
    if (status === "pending")        return `${C.redBold}REGRESSION${C.reset}`;
    if (status === "resolved")       return `${C.greenDim}resolved  ${C.reset}`;
    if (status === "false_positive") return `${C.dim}false+    ${C.reset}`;
  }
  if (status === "pending")  return `${C.yellow}pending   ${C.reset}`;
  if (status === "applied")  return `${C.greenDim}applied   ${C.reset}`;
  if (status === "ignored")  return `${C.dim}ignored   ${C.reset}`;
  return col(status, 10);
}

// ---------------------------------------------------------------------------
// Status line — mirrors NewsApp._status_line()
// Pipe-separated: title | suggestions | regressions | applied | ignored
// ---------------------------------------------------------------------------

function statusLine(stores) {
  let pending = 0, regressions = 0, applied = 0, ignored = 0;

  for (const store of stores) {
    for (const s of store.suggestions ?? []) {
      if (s.type === "regression" && s.status === "pending") {
        regressions++;
      } else if (s.status === "pending") {
        pending++;
      } else if (s.status === "applied" || s.status === "resolved") {
        applied++;
      } else {
        ignored++;
      }
    }
  }

  const parts = [
    `${C.bold}Self-Heal Report${C.reset}`,
    `suggestions: ${pending > 0 ? C.yellowBold : C.dim}${pending}${C.reset}`,
    `regressions: ${regressions > 0 ? C.redBold : C.dim}${regressions}${C.reset}`,
    `applied: ${C.greenDim}${applied}${C.reset}`,
    `ignored: ${C.dim}${ignored}${C.reset}`,
  ];

  return parts.join(`  ${C.sep}  `);
}

// ---------------------------------------------------------------------------
// Load suggestion stores from disk
// ---------------------------------------------------------------------------

function loadAllStores(projectFilter) {
  let files = [];
  try {
    files = fs.readdirSync(SUGGESTIONS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  if (projectFilter) {
    files = files.filter((f) =>
      f.toLowerCase().includes(projectFilter.toLowerCase())
    );
  }

  return files
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(SUGGESTIONS_DIR, f), "utf-8"));
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

function render(stores, { typeFilter, pendingOnly }) {
  const HR      = `${C.dim}${"─".repeat(88)}${C.reset}`;
  const THIN_HR = `  ${C.dim}${"─".repeat(84)}${C.reset}`;
  const lines   = [];

  lines.push("");
  lines.push(statusLine(stores));
  lines.push("");

  for (const store of stores) {
    const { projectName, suggestions = [] } = store;

    let rows = [...suggestions];
    if (typeFilter)  rows = rows.filter((s) => s.type === typeFilter);
    if (pendingOnly) rows = rows.filter((s) => s.status === "pending");

    const sectionLabel = `── ${projectName} `;
    const fill = Math.max(0, 80 - sectionLabel.length);
    lines.push(`${C.cyan}${C.bold}${sectionLabel}${C.reset}${C.dim}${"─".repeat(fill)}${C.reset}`);
    lines.push("");

    if (rows.length === 0) {
      lines.push(`  ${C.dim}No signals match current filters.${C.reset}`);
      lines.push("");
      continue;
    }

    // Column header — mirrors DataTable column labels
    lines.push(
      `  ${C.dim}` +
      `${col("SIGNAL", 12)}` +
      `${col("ELEMENT", 26)}` +
      `${col("COUNT", 8)}` +
      `${col("STATUS", 12)}` +
      `LAST TEST` +
      `${C.reset}`
    );
    lines.push(THIN_HR);

    for (const s of rows) {
      const isReviewed = s.status !== "pending";
      const dimPrefix  = isReviewed ? C.dim : "";
      const count      = s.seenCount ?? s.missCount ?? 1;

      lines.push(
        `  ${signalBadge(s.type)}  ` +
        `${dimPrefix}${col(s.key, 26)}${C.reset}` +
        `${dimPrefix}${col(`${count}x`, 8)}${C.reset}` +
        `${statusBadge(s.status, s.type)}  ` +
        `${C.dim}${col(s.lastTestTitle ?? "", 38)}${C.reset}`
      );

      // pom_addition: show ready-to-paste locator on the next line
      if (s.type === "pom_addition" && s.status === "pending" && s.suggestedCode) {
        lines.push(`  ${C.dim}    ↳ ${C.reset}${C.green}${s.suggestedCode}${C.reset}`);
      }

      // regression: show last URL so you know which page to investigate
      if (s.type === "regression" && s.status === "pending") {
        lines.push(`  ${C.dim}    ↳ last url: ${s.lastUrl ?? "unknown"}${C.reset}`);
      }
    }

    lines.push("");
  }

  lines.push(HR);
  lines.push(
    `  ${C.dim}Mark applied  → set status to "applied" or "resolved" in the JSON file${C.reset}`
  );
  lines.push(
    `  ${C.dim}Ignore noise  → set status to "ignored" or "false_positive"${C.reset}`
  );
  lines.push(
    `  ${C.dim}Files         → ${SUGGESTIONS_DIR}${C.reset}`
  );
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// CLI entry
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const get  = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] ?? null : null;
  };
  return {
    projectFilter: get("--project"),
    typeFilter:    get("--type"),
    pendingOnly:   args.includes("--pending-only"),
    format:        get("--format") ?? "ansi", // "ansi" | "plain" | "markdown"
  };
}

// ---------------------------------------------------------------------------
// Plain renderer — ANSI-free, for pipeline log output
// ---------------------------------------------------------------------------

function renderPlain(stores, { typeFilter, pendingOnly }) {
  const lines = [];
  let pending = 0, regressions = 0, applied = 0, ignored = 0;

  for (const store of stores) {
    for (const s of store.suggestions ?? []) {
      if (s.type === "regression" && s.status === "pending") regressions++;
      else if (s.status === "pending") pending++;
      else if (s.status === "applied" || s.status === "resolved") applied++;
      else ignored++;
    }
  }

  lines.push("");
  lines.push("Self-Heal Report");
  lines.push(`suggestions: ${pending}  |  regressions: ${regressions}  |  applied: ${applied}  |  ignored: ${ignored}`);
  lines.push("");

  for (const store of stores) {
    const { projectName, suggestions = [] } = store;
    let rows = [...suggestions];
    if (typeFilter)  rows = rows.filter((s) => s.type === typeFilter);
    if (pendingOnly) rows = rows.filter((s) => s.status === "pending");

    lines.push(`── ${projectName} ${"─".repeat(Math.max(0, 60 - projectName.length))}`);
    lines.push("");

    if (rows.length === 0) {
      lines.push("  No signals match current filters.");
      lines.push("");
      continue;
    }

    const colW = [12, 28, 8, 12];
    lines.push(
      "  " +
      "SIGNAL".padEnd(colW[0]) +
      "ELEMENT".padEnd(colW[1]) +
      "COUNT".padEnd(colW[2]) +
      "STATUS".padEnd(colW[3]) +
      "LAST TEST"
    );
    lines.push("  " + "─".repeat(84));

    for (const s of rows) {
      const signal = s.type === "regression" ? "✗ missing" : "⚠ new-elem";
      const count  = s.seenCount ?? s.missCount ?? 1;
      lines.push(
        "  " +
        signal.padEnd(colW[0]) +
        String(s.key).slice(0, 26).padEnd(colW[1]) +
        `${count}x`.padEnd(colW[2]) +
        String(s.status).padEnd(colW[3]) +
        (s.lastTestTitle ?? "").slice(0, 38)
      );
      if (s.type === "pom_addition" && s.status === "pending" && s.suggestedCode) {
        lines.push(`      ↳ ${s.suggestedCode.trim()}`);
      }
      if (s.type === "regression" && s.status === "pending") {
        lines.push(`      ↳ last url: ${s.lastUrl ?? "unknown"}`);
      }
    }
    lines.push("");
  }

  lines.push("─".repeat(88));
  lines.push(`  Files: ${SUGGESTIONS_DIR}`);
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Markdown renderer — for ADO pipeline artifacts and GitHub PR comments
// ---------------------------------------------------------------------------

function renderMarkdown(stores, { typeFilter, pendingOnly }) {
  const lines = [];
  let pending = 0, regressions = 0, applied = 0, ignored = 0;

  for (const store of stores) {
    for (const s of store.suggestions ?? []) {
      if (s.type === "regression" && s.status === "pending") regressions++;
      else if (s.status === "pending") pending++;
      else if (s.status === "applied" || s.status === "resolved") applied++;
      else ignored++;
    }
  }

  lines.push("# Self-Heal Report");
  lines.push("");
  lines.push(`> Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("| Metric | Count |");
  lines.push("|--------|-------|");
  lines.push(`| 🟡 Pending suggestions | ${pending} |`);
  lines.push(`| 🔴 Regressions | ${regressions} |`);
  lines.push(`| ✅ Applied / Resolved | ${applied} |`);
  lines.push(`| ⬜ Ignored | ${ignored} |`);
  lines.push("");

  for (const store of stores) {
    const { projectName, suggestions = [], goldenSelectors = {} } = store;
    let rows = [...suggestions];
    if (typeFilter)  rows = rows.filter((s) => s.type === typeFilter);
    if (pendingOnly) rows = rows.filter((s) => s.status === "pending");

    lines.push(`---`);
    lines.push("");
    lines.push(`## ${projectName}`);
    lines.push("");

    if (rows.length === 0) {
      lines.push("_No signals match current filters._");
      lines.push("");
      continue;
    }

    lines.push("| Signal | Element | Count | Status | Last Test |");
    lines.push("|--------|---------|-------|--------|-----------|");

    for (const s of rows) {
      const signal = s.type === "regression" ? "🔴 Regression" : "🟡 New element";
      const count  = s.seenCount ?? s.missCount ?? 1;
      const status = s.status === "pending" && s.type === "regression"
        ? "**REGRESSION**"
        : s.status;
      lines.push(
        `| ${signal} | \`${s.key}\` | ${count}x | ${status} | ${(s.lastTestTitle ?? "").slice(0, 40)} |`
      );
    }

    lines.push("");

    // Suggested fixes section — actionable code blocks
    const actionable = rows.filter(
      (s) => s.status === "pending" &&
             (s.suggestedCode || goldenSelectors[s.key])
    );

    if (actionable.length > 0) {
      lines.push("### Suggested fixes");
      lines.push("");

      for (const s of actionable) {
        lines.push(`**\`${s.key}\`**`);

        if (s.type === "pom_addition" && s.suggestedCode) {
          lines.push("");
          lines.push("Add to POM `this.locators`:");
          lines.push("```javascript");
          lines.push(s.suggestedCode.trim());
          lines.push("```");
        }

        if (s.type === "regression") {
          const golden = goldenSelectors[s.key];
          if (golden) {
            lines.push("");
            lines.push("Golden selector available (last known working):");
            lines.push("```");
            lines.push(golden);
            lines.push("```");
            lines.push("");
            lines.push("Apply via:");
            lines.push("```bash");
            lines.push(`make patch PROJECT=${projectName}  # generates patch file`);
            lines.push(`# or: node Playwright/base/selfHealCleaner.js --project ${projectName} --apply-key ${s.key}`);
            lines.push("```");
          } else {
            lines.push("");
            lines.push("> No golden selector available. Run a passing test to capture one.");
          }
          lines.push("");
          lines.push(`Last seen at: \`${s.lastUrl ?? "unknown"}\``);
        }

        lines.push("");
      }
    }

    // Golden selectors reference
    const goldenKeys = Object.keys(goldenSelectors);
    if (goldenKeys.length > 0) {
      lines.push("<details>");
      lines.push(`<summary>Golden selectors (${goldenKeys.length} captured)</summary>`);
      lines.push("");
      lines.push("| Locator key | Fallback selector |");
      lines.push("|-------------|-------------------|");
      for (const [k, v] of Object.entries(goldenSelectors)) {
        lines.push(`| \`${k}\` | \`${v}\` |`);
      }
      lines.push("");
      lines.push("</details>");
      lines.push("");
    }
  }

  lines.push("---");
  lines.push("");
  lines.push(`_Apply suggestions: \`make suggest PROJECT=<name>\` or \`make patch PROJECT=<name>\`_`);
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// CLI entry
// ---------------------------------------------------------------------------

function main() {
  const { projectFilter, typeFilter, pendingOnly, format } = parseArgs(process.argv);
  const stores = loadAllStores(projectFilter);

  const noDataMsg = {
    ansi:     `\n${C.dim}No suggestion files found.${C.reset}\n${C.dim}Run your tests first — Track 2 writes suggestions automatically.${C.reset}\n${C.dim}Expected location: ${SUGGESTIONS_DIR}${C.reset}\n`,
    plain:    `\nNo suggestion files found.\nRun your tests first — Track 2 writes suggestions automatically.\nExpected location: ${SUGGESTIONS_DIR}\n`,
    markdown: `# Self-Heal Report\n\n> No suggestion data found. Run tests first.\n`,
  };

  if (stores.length === 0) {
    process.stdout.write(noDataMsg[format] ?? noDataMsg.plain);
    return;
  }

  const opts = { typeFilter, pendingOnly };

  if (format === "markdown") {
    process.stdout.write(renderMarkdown(stores, opts));
  } else if (format === "plain") {
    process.stdout.write(renderPlain(stores, opts));
  } else {
    process.stdout.write(render(stores, opts));
  }
}

main();
