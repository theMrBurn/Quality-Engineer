/**
 * globalSetup — pre-run diagnostic for the self-healing system.
 *
 * Runs once in the main Playwright process before any test worker starts.
 * Logs a summary of golden selectors and pending signals available per project
 * so the engineer can see what healing data workers will use.
 *
 * NOTE: This process is separate from test workers. HealCache in-memory state
 * written here does NOT transfer to workers. Workers pre-warm their own
 * HealCache from disk at sweep fixture setup time — see baseTest.js.
 *
 * Approach 2 of the self-healing plan.
 */

"use strict";

const fs   = require("fs");
const path = require("path");

const SUGGESTIONS_DIR = path.resolve(__dirname, "../regression-data/suggestions");

async function globalSetup() {
  let files = [];
  try {
    files = fs.readdirSync(SUGGESTIONS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    console.log(
      "[globalSetup][heal] No suggestion data found — workers will run without pre-warmed selectors."
    );
    return;
  }

  let totalGolden  = 0;
  let totalPending = 0;
  const summary    = [];

  for (const file of files) {
    try {
      const store     = JSON.parse(fs.readFileSync(path.join(SUGGESTIONS_DIR, file), "utf-8"));
      const golden    = Object.keys(store.goldenSelectors ?? {}).length;
      const pending   = (store.suggestions ?? []).filter((s) => s.status === "pending").length;
      const regressions = (store.suggestions ?? []).filter(
        (s) => s.type === "regression" && s.status === "pending"
      ).length;
      totalGolden  += golden;
      totalPending += pending;
      if (golden > 0 || pending > 0) {
        summary.push(
          `  ${(store.projectName ?? file).padEnd(28)} ` +
          `${String(golden).padStart(3)} golden  ` +
          `${String(pending).padStart(3)} pending  ` +
          `${regressions > 0 ? `⚠ ${regressions} regressions` : ""}`
        );
      }
    } catch {
      // skip malformed files
    }
  }

  if (summary.length > 0) {
    console.log("\n[globalSetup][heal] Self-healing data available for this run:");
    summary.forEach((line) => console.log(line));
    console.log(
      `\n  Total: ${totalGolden} golden selectors ready · ` +
      `${totalPending} pending signals\n`
    );
  } else {
    console.log(
      "[globalSetup][heal] Suggestion store empty — run tests to accumulate golden selectors."
    );
  }
}

module.exports = globalSetup;
