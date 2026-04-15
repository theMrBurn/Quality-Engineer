const { test } = require("@playwright/test");
const NetworkInterceptor = require("../helpers/utils/network_interceptor");
const { scrapeInteractiveElements } = require("../helpers/utils/scrapeUtils");
const { appendAndDiff } = require("./regressionWriter");
const { writeSuggestions, readGoldenSelectors } = require("./healingWriter");
const { HealCache } = require("./healCache");
const path = require("path");

// ── Golden selector extraction ─────────────────────────────────────────────
// Evaluates a resolved element handle in the browser to extract the best CSS
// selector we can use as a fallback if the primary locator breaks in future.
//
// Priority:
//   id → data-testid → aria-label → name
//   → href (links) → text content (buttons) → input[type]
//   → :has-text() for headings and links without href
//
// Playwright's :has-text() pseudo-class is intentionally used here — these
// selectors are only ever passed to page.locator() inside BasePOM, never to
// a browser evaluate, so the Playwright-specific syntax is valid.
async function extractFallbackSelector(locatorFn) {
  try {
    const handle = await locatorFn().first().elementHandle({ timeout: 2000 });
    if (!handle) return null;
    return await handle.evaluate((el) => {
      const tag  = el.tagName.toLowerCase();
      const esc  = (s) => s.replace(/"/g, '\\"');

      // Attribute-based — most stable, order matters
      if (el.id) return `#${el.id}`;

      const testId = el.getAttribute("data-testid") || el.getAttribute("data-test");
      if (testId) return `[data-testid="${testId}"]`;

      const ariaLabel = el.getAttribute("aria-label");
      if (ariaLabel) return `${tag}[aria-label="${esc(ariaLabel)}"]`;

      const name = el.getAttribute("name");
      if (name) return `${tag}[name="${esc(name)}"]`;

      // href for links — stable when the route is meaningful
      if (tag === "a") {
        const href = el.getAttribute("href");
        if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
          return `a[href="${esc(href)}"]`;
        }
      }

      // Buttons: text content beats type — more specific and easier to read
      if (tag === "button") {
        const text = el.textContent?.trim();
        if (text && text.length <= 60) return `button:has-text("${esc(text)}")`;
        const type = el.getAttribute("type");
        if (type) return `button[type="${type}"]`;
      }

      // Inputs without an id/name — fall back to type (checkbox, radio, etc.)
      if (tag === "input") {
        const type = el.getAttribute("type");
        if (type) return `input[type="${type}"]`;
      }

      // Headings and bare links — text content via Playwright :has-text()
      const text = el.textContent?.trim();
      if (text && text.length > 0 && text.length <= 60) {
        if (["h1", "h2", "h3", "h4", "a"].includes(tag)) {
          return `${tag}:has-text("${esc(text)}")`;
        }
      }

      return null;
    });
  } catch {
    return null;
  }
}

// ── Per-project golden selector pre-warm (once per worker process) ─────────
// Workers are separate Node.js processes — this Set ensures we only hit disk
// once per project per worker, not once per test.
const _warmedProjects = new Set();

/**
 * baseTest — extended Playwright test fixture.
 *
 * Design contract:
 * ─────────────────────────────────────────────────────────────────
 * TRACK 1 — Declared (test file try blocks)
 *   - POM locators are source of truth
 *   - Feature-specific assertions
 *   - Only source of hard fails in the system
 *
 * TRACK 2 — Autonomous (this fixture, runs invisibly around every test)
 *   - baseTest auto-validates all keys in POM.expectedLocators (soft warn only)
 *   - NetworkInterceptor passively records API traffic during test execution
 *   - Scraper discovers actual DOM elements async, never blocking the test
 *   - appendAndDiff writes regression snapshot and computes delta vs last run
 *   - Self-healing signal: scraper finds element POM missed → logged for future POM update
 *
 * RULE: sweep() is fire-and-forget — never await in test files.
 * RULE: testInfo._pomClass = YourPOM must be set before sweep() in each test.
 * RULE: baseTest never hard fails. Only try blocks in test files hard fail.
 * RULE: networkidle is never used — "load" only, prevents polling hangs.
 * ─────────────────────────────────────────────────────────────────
 */

function resolveProjectName(testInfo) {
  return testInfo.project.name;
}

const baseTest = test.extend({
  sweep: async ({ page }, use, testInfo) => {
    const projectName = resolveProjectName(testInfo);

    // ── TRACK 2 SETUP ─────────────────────────────────────────────
    NetworkInterceptor.reset();
    await NetworkInterceptor.interceptRequests(page);

    // Pre-warm HealCache from this project's golden selectors written by previous runs.
    // Runs once per project per worker — subsequent tests skip the disk read.
    if (!_warmedProjects.has(projectName)) {
      _warmedProjects.add(projectName);
      try {
        const golden = await readGoldenSelectors(projectName);
        let count = 0;
        for (const [key, selector] of Object.entries(golden)) {
          HealCache.set(key, selector);
          count++;
        }
        if (count > 0) {
          console.log(`[baseTest][heal] Pre-warmed ${count} golden selectors for ${projectName}`);
        }
      } catch {
        // no previous run data — first run, healing starts blank
      }
    }

    let scrapePromise = null;

    /**
     * sweep() — fire-and-forget DOM scrape trigger.
     * Call once per test after goto(), never await.
     */
    const sweep = () => {
      if (!scrapePromise) {
        scrapePromise = scrapeInteractiveElements(page).catch((err) => {
          console.warn(`[baseTest][sweep] scrape failed — ${err.message}`);
          return { results: [], locatorMap: new Map() };
        });
      }
    };

    // ── YIELD — test runs here ─────────────────────────────────────
    await use(sweep);

    // ── TRACK 2 TEARDOWN ──────────────────────────────────────────
    // Runs after every test, pass or fail. Never throws. Never hard fails.

    try {
      const { locatorMap, results: scrapeResults = [] } = scrapePromise
        ? await scrapePromise
        : { locatorMap: new Map(), results: [] };

      // ── POM locator validation (soft warn) ──────────────────────
      // testInfo._pomClass set by test file before sweep() call
      const pomClass = testInfo._pomClass ?? null;
      const expectedLocators = pomClass?.expectedLocators ?? [];

      // golden selectors captured for locators that ARE visible this run.
      // Written to the suggestion store and loaded into HealCache so retries
      // and future runs can fall back to them if the primary locator breaks.
      const goldenSelectors = {};

      if (expectedLocators.length > 0) {
        let pomInstance = null;
        try {
          pomInstance = new pomClass(page);
        } catch (err) {
          console.warn(
            `[baseTest][pom-check] Could not instantiate POM — ${err.message}`
          );
        }

        if (pomInstance) {
          for (const key of expectedLocators) {
            try {
              const locatorFn = pomInstance.locators[key];
              if (locatorFn) {
                const visible = await locatorFn().first().isVisible().catch(() => false);
                if (!visible) {
                  console.warn(
                    `[baseTest][pom-check] SOFT WARN — '${key}' not visible on ${page.url()}`
                  );
                } else {
                  // Locator resolved — capture its CSS selector as a golden reference.
                  const sel = await extractFallbackSelector(locatorFn);
                  if (sel) {
                    goldenSelectors[key] = sel;
                    HealCache.set(key, sel); // immediately available for later tests in same run
                  }
                }
              } else {
                console.warn(
                  `[baseTest][pom-check] SOFT WARN — '${key}' in expectedLocators but missing from this.locators`
                );
              }
            } catch (err) {
              console.warn(
                `[baseTest][pom-check] SOFT WARN — '${key}' threw: ${err.message}`
              );
            }
          }
        }
      }

      // ── Scraper vs POM delta (self-healing signal) ───────────────
      const scrapedKeys = new Set(locatorMap.keys());
      const pomKeys = new Set(expectedLocators);

      const undeclaredByPOM = [...scrapedKeys].filter((k) => !pomKeys.has(k));
      const missingFromDOM  = [...pomKeys].filter((k) => !scrapedKeys.has(k));

      if (undeclaredByPOM.length > 0) {
        console.warn(
          `[baseTest][self-heal] Scraper found elements NOT in POM (${undeclaredByPOM.length}):`,
          undeclaredByPOM
        );
      }
      if (missingFromDOM.length > 0) {
        console.warn(
          `[baseTest][self-heal] POM locators NOT found in DOM — possible regression (${missingFromDOM.length}):`,
          missingFromDOM
        );
        // Load golden selectors for missing keys into HealCache so the next
        // retry attempt can fall back to last-known-good selectors before throwing.
        // The pre-warm at setup only loaded data from the previous run; this picks
        // up golden selectors written by earlier tests in the SAME run.
        for (const key of missingFromDOM) {
          if (HealCache.get(key).length === 0) {
            // not already in cache — check stored data
            try {
              const stored = await readGoldenSelectors(projectName);
              const sel = stored[key];
              if (sel) {
                HealCache.set(key, sel);
                console.log(`[baseTest][heal] Loaded golden selector for retry — '${key}': ${sel}`);
              }
            } catch {
              // no stored data
            }
          }
        }
      }

      // Log heal events accumulated during this test run
      const healLog = HealCache.getHealLog();
      if (healLog.length > 0) {
        console.log(`[baseTest][heal] ${healLog.length} heal event(s) this run:`, healLog.map((e) => e.key));
      }

      // ── Self-heal suggestion write ───────────────────────────────
      // Persists signals to regression-data/suggestions/{projectName}.json.
      // Upserts by element key — increments frequency counters on repeat hits.
      // Also writes goldenSelectors (last-known-good CSS per locator key).
      // Never throws. Run `node Playwright/base/selfHealReporter.js` after
      // a test run to inspect pending suggestions as a formatted table.
      await writeSuggestions({
        projectName,
        testTitle: testInfo.title,
        status: testInfo.status,
        url: page.url(),
        timestamp: new Date().toISOString(),
        undeclaredByPOM,
        missingFromDOM,
        scrapeResults,
        goldenSelectors,
      }).catch((err) =>
        console.warn(`[baseTest][healing] Suggestion write failed — ${err.message}`)
      );

      // ── API snapshot + regression write ─────────────────────────
      const apiCalls = NetworkInterceptor.snapshot();

      const snapshot = {
        timestamp: new Date().toISOString(),
        testTitle: testInfo.title,
        status: testInfo.status,
        url: page.url(),
        locatorMap: Object.fromEntries(locatorMap),
        pomExpected: expectedLocators,
        selfHeal: { undeclaredByPOM, missingFromDOM },
        apiCalls,
      };

      const outputPath = path.resolve(
        __dirname,
        "../regression-data",
        `${projectName}.json`
      );

      const diff = await appendAndDiff(outputPath, snapshot).catch((err) => {
        console.warn(`[baseTest][regression] Write failed — ${err.message}`);
        return null;
      });

      if (diff) {
        if (diff.locators.added.length > 0)
          console.log(`[baseTest][diff] New locators (${diff.locators.added.length}):`, diff.locators.added);
        if (diff.locators.removed.length > 0)
          console.warn(`[baseTest][diff] Removed locators (${diff.locators.removed.length}):`, diff.locators.removed);
        if (diff.apiCalls.added.length > 0)
          console.log(`[baseTest][diff] New API calls (${diff.apiCalls.added.length}):`, diff.apiCalls.added);
        if (diff.apiCalls.removed.length > 0)
          console.warn(`[baseTest][diff] Dropped API calls (${diff.apiCalls.removed.length}):`, diff.apiCalls.removed);
      }

    } catch (err) {
      console.warn(`[baseTest][teardown] Unhandled Track 2 error — ${err.message}`);
    } finally {
      NetworkInterceptor.teardown(page);
    }
  },
});

module.exports = { baseTest };