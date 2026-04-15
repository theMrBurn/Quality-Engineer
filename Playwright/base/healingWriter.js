/**
 * healingWriter — persists Track 2 self-healing signals to disk.
 *
 * Design contract (mirrors storage.py from the personal newsfeed_terminal project):
 * ─────────────────────────────────────────────────────────────────────────────
 * - One JSON file per project under regression-data/suggestions/
 * - Upserts by compound key (type:elementKey) — frequency counter increments,
 *   metadata (lastSeen, lastTestTitle, lastUrl) refreshes on every hit
 * - `status` mirrors the newsfeed's `seen` bit:
 *     pom_addition → "pending" | "applied" | "ignored"
 *     regression   → "pending" | "resolved" | "false_positive"
 * - suggestedCode is a ready-to-paste POM locator entry
 * - goldenSelectors stores last-known-good CSS selectors per locator key,
 *   used by HealCache to attempt recovery before throwing on a locator failure
 * - Never throws. Never hard fails. Called from baseTest teardown only.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * To mark a suggestion reviewed, set its `status` field directly in the JSON
 * file, or use selfHealReporter.js to inspect what's pending.
 */

const fs = require("fs").promises;
const path = require("path");

const SUGGESTIONS_DIR = path.resolve(__dirname, "../regression-data/suggestions");

// ---------------------------------------------------------------------------
// Locator code generation
// ---------------------------------------------------------------------------

/**
 * Generate the best Playwright locator expression for a scraped element.
 * Prefers semantic APIs (getByRole, getByTestId) over raw CSS — same priority
 * order as the scraper's key assignment in scrapeUtils.js.
 *
 * @param {{ tagName: string, ariaLabel: string|null, dataTestId: string|null, id: string|null, name: string|null, selector: string }} el
 * @returns {string}
 */
function suggestLocator(el) {
  const { tagName, ariaLabel, dataTestId, id, name, selector } = el;

  if (dataTestId) {
    return `page.getByTestId('${dataTestId}')`;
  }

  if (ariaLabel) {
    const roleByTag = { button: "button", a: "link", select: "combobox" };
    const role = roleByTag[tagName];
    if (role) {
      const escaped = ariaLabel.replace(/'/g, "\\'");
      return `page.getByRole('${role}', { name: '${escaped}' })`;
    }
    return `page.locator('[aria-label="${ariaLabel}"]')`;
  }

  if (id) return `page.locator('#${id}')`;
  if (name) return `page.locator('${tagName}[name="${name}"]')`;
  return `page.locator('${selector}')`;
}

/**
 * Format a complete POM locator entry ready to paste into a POM class.
 *
 * @param {string} key
 * @param {object} el
 * @returns {string}
 */
function pomEntry(key, el) {
  return `  ${key}: () => ${suggestLocator(el)},`;
}

// ---------------------------------------------------------------------------
// Main writer
// ---------------------------------------------------------------------------

/**
 * Read the last-known-good CSS selectors for a project's POM locators.
 * Used by baseTest to pre-warm HealCache at sweep fixture setup and on failure.
 *
 * @param {string} projectName
 * @returns {Promise<Record<string, string>>}  { locatorKey: cssSelector }
 */
async function readGoldenSelectors(projectName) {
  const filePath = path.join(SUGGESTIONS_DIR, `${projectName}.json`);
  try {
    const raw   = await fs.readFile(filePath, "utf-8");
    const store = JSON.parse(raw);
    return store.goldenSelectors ?? {};
  } catch {
    return {};
  }
}

/**
 * Write or update self-healing suggestions for one test run.
 * Called from baseTest.js teardown after Track 2 signals are computed.
 *
 * @param {object}   opts
 * @param {string}   opts.projectName
 * @param {string}   opts.testTitle
 * @param {string}   opts.status           Playwright test status (passed/failed/etc.)
 * @param {string}   opts.url              Page URL at time of teardown
 * @param {string}   opts.timestamp        ISO timestamp
 * @param {string[]} opts.undeclaredByPOM  Keys scraper found that POM doesn't declare
 * @param {string[]} opts.missingFromDOM   POM keys absent from DOM (regression signal)
 * @param {Array}    opts.scrapeResults    Full element objects from scrapeInteractiveElements
 * @param {Object}   opts.goldenSelectors  { key: cssSelector } for locators visible this run
 */
async function writeSuggestions({
  projectName,
  testTitle,
  status,
  url,
  timestamp,
  undeclaredByPOM,
  missingFromDOM,
  scrapeResults,
  goldenSelectors = {},
}) {
  // Build key → full element data lookup from the scrape pass
  const elementByKey = new Map(
    (scrapeResults ?? []).filter(Boolean).map((el) => [el.key, el])
  );

  // Load existing suggestion store for this project
  const filePath = path.join(SUGGESTIONS_DIR, `${projectName}.json`);
  let store = { projectName, goldenSelectors: {}, suggestions: [] };
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    store = JSON.parse(raw);
    if (!store.goldenSelectors) store.goldenSelectors = {};
  } catch {
    // first run — start fresh
  }

  // Merge new golden selectors (visible this run) into the store.
  // goldenSelectors = last-known-good CSS selector per locator key.
  // These are the fallback selectors HealCache uses on retry.
  Object.assign(store.goldenSelectors, goldenSelectors);

  // Index existing suggestions by compound key for O(1) upsert
  const index = new Map(
    store.suggestions.map((s) => [`${s.type}:${s.key}`, s])
  );

  // ── pom_addition suggestions (undeclaredByPOM) ──────────────────────────
  // These are elements the scraper found on the page that no POM key covers.
  // Generating a ready-to-paste locator entry removes the manual discovery step.
  //
  // Skip tagName_index fallback keys (e.g. a_0, button_3) — the scraper emits
  // these when an element has no id, ariaLabel, testId, or name. They carry no
  // semantic meaning and produce noise suggestions that can't be actioned.
  for (const key of undeclaredByPOM) {
    if (/^[a-z]+_\d+$/.test(key)) continue;
    const el = elementByKey.get(key);
    const compound = `pom_addition:${key}`;
    const existing = index.get(compound);

    if (existing) {
      existing.seenCount += 1;
      existing.lastSeen = timestamp;
      existing.lastTestTitle = testTitle;
      existing.lastUrl = url;
    } else {
      const entry = {
        type: "pom_addition",
        key,
        selector: el?.selector ?? key,
        tagName: el?.tagName ?? "unknown",
        // Ready-to-paste POM entry. Falls back to a commented placeholder
        // when the scrape result doesn't have enough attribute data.
        suggestedCode: el
          ? pomEntry(key, el)
          : `  ${key}: () => page.locator('/* ${key} — inspect manually */'),`,
        seenCount: 1,
        firstSeen: timestamp,
        lastSeen: timestamp,
        lastTestTitle: testTitle,
        lastUrl: url,
        status: "pending", // pending | applied | ignored
      };
      store.suggestions.push(entry);
      index.set(compound, entry);
    }
  }

  // ── regression alerts (missingFromDOM) ──────────────────────────────────
  // These are POM-declared locators that the scraper didn't find in the DOM.
  // High signal — could mean a selector broke, a feature was removed, or
  // the page didn't fully load before the sweep fired.
  for (const key of missingFromDOM) {
    const compound = `regression:${key}`;
    const existing = index.get(compound);

    if (existing) {
      existing.missCount += 1;
      existing.lastSeen = timestamp;
      existing.lastTestTitle = testTitle;
      existing.lastUrl = url;
    } else {
      const entry = {
        type: "regression",
        key,
        missCount: 1,
        firstMissed: timestamp,
        lastSeen: timestamp,
        lastTestTitle: testTitle,
        lastUrl: url,
        status: "pending", // pending | resolved | false_positive
      };
      store.suggestions.push(entry);
      index.set(compound, entry);
    }
  }

  // Persist
  await fs.mkdir(SUGGESTIONS_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(store, null, 2));
}

module.exports = { writeSuggestions, readGoldenSelectors };
