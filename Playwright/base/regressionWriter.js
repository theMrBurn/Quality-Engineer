const fs = require("fs").promises;
const path = require("path");

// ── Fix 1: rolling window ─────────────────────────────────────────────────────
// Total runs kept per project file. Diff only needs the previous run, so
// anything beyond this is historical ballast.
const MAX_TOTAL_RUNS = 50;

// ── Fix 3: compressed history ─────────────────────────────────────────────────
// The last N runs stay as full snapshots (needed for accurate diffing and
// recent debugging). Older runs are slimmed to just identity + selfHeal fields;
// their locatorMap, apiCalls, and pomExpected are dropped.
const MAX_FULL_RUNS = 5;

// ── Fix 2: API noise filter ───────────────────────────────────────────────────
// These calls are static assets and external telemetry — not your API contract.
// Filtering them before writing cuts per-snapshot size by ~40-60%.
const NOISE_EXTENSIONS = /\.(js|css|gif|svg|png|ico|woff2?|ttf|map)(\?.*)?$/i;
const NOISE_DOMAINS = [
  "aadcdn.msftauth.net",
  "browser.events.data.microsoft.com",
  "login.microsoftonline.com",
];

function isSignificantCall(call) {
  if (NOISE_EXTENSIONS.test(call.url)) return false;
  if (NOISE_DOMAINS.some((d) => call.url.includes(d))) return false;
  return true;
}

/**
 * Strips heavy fields from a snapshot, keeping only what's useful for
 * long-term trend review (identity, status, selfHeal signals).
 */
function compressSnapshot(snapshot) {
  const { locatorMap, apiCalls, pomExpected, ...slim } = snapshot;
  return { ...slim, _compressed: true };
}

/**
 * appendAndDiff — writes a new snapshot to the regression JSON file
 * and computes a diff against the previous run.
 *
 * Snapshot shape (current):
 * {
 *   timestamp, testTitle, status, url,
 *   locatorMap, pomExpected,
 *   selfHeal: { undeclaredByPOM, missingFromDOM },
 *   apiCalls: [{ url, method, status }]
 * }
 *
 * Backwards compatible — handles old snapshots that had
 * interactions.skipped/touched instead of selfHeal.
 */
async function appendAndDiff(filePath, newSnapshot) {
  let existing = { runs: [] };

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(raw);
  } catch {
    // first run or file doesn't exist yet — start fresh
  }

  // Fix 2: strip static assets and external telemetry from API calls
  newSnapshot.apiCalls = (newSnapshot.apiCalls ?? []).filter(isSignificantCall);

  const previousRun = existing.runs.at(-1) ?? null;
  const diff = previousRun ? computeDiff(previousRun, newSnapshot) : null;

  existing.runs.push(newSnapshot);

  // Fix 3: compress runs that are no longer in the recent window
  if (existing.runs.length > MAX_FULL_RUNS) {
    const compressUpTo = existing.runs.length - MAX_FULL_RUNS;
    existing.runs = existing.runs.map((run, i) =>
      i < compressUpTo && !run._compressed ? compressSnapshot(run) : run
    );
  }

  // Fix 1: prune runs beyond the total cap (oldest first)
  if (existing.runs.length > MAX_TOTAL_RUNS) {
    existing.runs = existing.runs.slice(-MAX_TOTAL_RUNS);
  }

  // ensure output directory exists
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

  return (
    diff ?? {
      locators: { added: [], removed: [] },
      apiCalls: { added: [], removed: [] },
      selfHeal: { undeclaredByPOM: [], missingFromDOM: [] },
    }
  );
}

function computeDiff(previous, current) {
  // ── locator map diff ──────────────────────────────────────────
  const prevLocators = new Set(Object.keys(previous.locatorMap ?? {}));
  const currLocators = new Set(Object.keys(current.locatorMap ?? {}));

  // ── API call diff ─────────────────────────────────────────────
  const prevApis = new Set(
    (previous.apiCalls ?? []).map((c) => `${c.method}:${c.url}`)
  );
  const currApis = new Set(
    (current.apiCalls ?? []).map((c) => `${c.method}:${c.url}`)
  );

  // ── self-heal diff ────────────────────────────────────────────
  // Backwards compatible: old snapshots used interactions.skipped,
  // new snapshots use selfHeal.undeclaredByPOM
  const prevUndeclared = new Set(
    previous.selfHeal?.undeclaredByPOM ??
    previous.interactions?.skipped ??
    []
  );
  const currUndeclared = new Set(
    current.selfHeal?.undeclaredByPOM ??
    current.interactions?.skipped ??
    []
  );

  const prevMissing = new Set(
    previous.selfHeal?.missingFromDOM ?? []
  );
  const currMissing = new Set(
    current.selfHeal?.missingFromDOM ?? []
  );

  return {
    locators: {
      added:   [...currLocators].filter((k) => !prevLocators.has(k)),
      removed: [...prevLocators].filter((k) => !currLocators.has(k)),
    },
    apiCalls: {
      added:   [...currApis].filter((k) => !prevApis.has(k)),
      removed: [...prevApis].filter((k) => !currApis.has(k)),
    },
    selfHeal: {
      // elements scraper newly found that POM doesn't declare
      newlyUndeclared: [...currUndeclared].filter((k) => !prevUndeclared.has(k)),
      // POM locators newly missing from DOM — regression signal
      newlyMissing:    [...currMissing].filter((k) => !prevMissing.has(k)),
      // previously missing, now back in DOM — self-heal confirmed
      recovered:       [...prevMissing].filter((k) => !currMissing.has(k)),
    },
  };
}

module.exports = { appendAndDiff };