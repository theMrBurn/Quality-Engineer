/**
 * Page identity telemetry probe.
 *
 * Given a live Playwright Page, captures a small, stable identity fingerprint
 * for it: title, normalized route, visible headings, breadcrumbs, and a crude
 * text-size metric. Pairs with `diffPageIdentity` to turn two captures into a
 * structured diff for the regression snapshot.
 *
 * Design constraints (enterprise/intranet/VPN deployment):
 *   - Zero network calls. Only reads what the page already exposes.
 *   - Zero new dependencies. Pure Playwright DOM reads + a few regexes.
 *   - Null-safe. Every field is wrapped so pages with missing elements
 *     return empty/null values instead of throwing. A login page, an
 *     error page, and a half-hydrated SPA all produce a valid capture.
 *   - No dynamic code injection beyond the `page.evaluate` calls your
 *     existing sweep already uses.
 *   - No data leaves the process. Return value flows into whatever
 *     your regression-data pipeline already does — nothing phones home.
 *
 * Usage:
 *
 *   const { pageIdentityProbe } = require("../helpers/telemetry/pageIdentityProbe");
 *   const identity = await pageIdentityProbe(page);
 *   // → { title, routeSignature, headings, breadcrumbs, visibleTextChars }
 */

/**
 * Replace numeric-id and UUID path segments with placeholders so two sweeps
 * of "same page, different record" collapse to a single route signature.
 *
 *   /dealership/12345                 → /dealership/:id
 *   /atlas#/sales/dealership/12345    → /atlas#/sales/dealership/:id
 *   /items/a3f7c2e1-... (UUID)        → /items/:uuid
 *   /v1/api                           → /v1/api   (short non-numeric untouched)
 */
function normalizeRoute(rawUrl) {
  try {
    const u = new URL(rawUrl);
    const uuidRe =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const normalizeSegments = (p) =>
      p
        .split("/")
        .map((seg) => {
          if (uuidRe.test(seg)) return ":uuid";
          // Numeric IDs of 2+ digits. Single-digit `/v1` etc. preserved.
          if (/^\d{2,}$/.test(seg)) return ":id";
          return seg;
        })
        .join("/");
    const path = normalizeSegments(u.pathname);
    const hash = u.hash ? "#" + normalizeSegments(u.hash.slice(1)) : "";
    return path + hash;
  } catch {
    // Un-parseable URL (data:, about:blank, etc.) — return verbatim.
    return rawUrl;
  }
}

/**
 * Extract visible h1/h2 text content from the page.
 *
 * Uses `offsetParent` + `getClientRects` as a cheap visibility heuristic
 * — imperfect but fast and runs inside `page.evaluate` so it's one round
 * trip. Caps results at 10 per heading level to keep runaway pages
 * (giant nav menus, marketing footers) from flooding the snapshot.
 */
async function extractHeadings(page) {
  try {
    return await page.evaluate(() => {
      const grab = (sel) =>
        Array.from(document.querySelectorAll(sel))
          .filter(
            (e) => e.offsetParent !== null || e.getClientRects().length > 0,
          )
          .map((e) => (e.textContent || "").trim())
          .filter((t) => t.length > 0 && t.length < 200)
          .slice(0, 10);
      return {
        h1: grab("h1"),
        h2: grab("h2"),
      };
    });
  } catch {
    return { h1: [], h2: [] };
  }
}

/**
 * Extract breadcrumb trail using a priority list of common selectors.
 *
 * Dealer and CRM apps use wildly varied breadcrumb markup — there's no one
 * selector. This probe tries a handful in priority order and returns the
 * first match, splitting by common separators if the container has raw
 * text instead of child elements.
 */
async function extractBreadcrumbs(page) {
  try {
    return await page.evaluate(() => {
      const selectors = [
        'nav[aria-label*="readcrumb" i]',
        '[role="navigation"][aria-label*="readcrumb" i]',
        ".breadcrumb",
        ".breadcrumbs",
        '[class*="breadcrumb" i]',
        '[data-testid*="breadcrumb" i]',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (!el) continue;
        // Prefer <li> children — they're the semantic crumb container,
        // and selecting <li> avoids double-counting nested <a> tags.
        let items = Array.from(el.querySelectorAll("li"))
          .map((e) => (e.textContent || "").trim())
          .filter((t) => t.length > 0);
        // No <li>? Fall back to direct <a> children (some apps use
        // flat <a> tags inside a <nav> with no list wrapper).
        if (items.length === 0) {
          items = Array.from(el.querySelectorAll("a"))
            .map((e) => (e.textContent || "").trim())
            .filter((t) => t.length > 0);
        }
        if (items.length > 0) return items.slice(0, 10);
        // Last resort: split the container's raw text by common separators.
        const text = (el.textContent || "").trim();
        return text
          .split(/\s*[›»/>|]\s*/)
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
          .slice(0, 10);
      }
      return [];
    });
  } catch {
    return [];
  }
}

/**
 * Crude content-size metric. `innerText` respects CSS visibility and is a
 * decent proxy for "how much user-facing text is on this page" without
 * the weight of a full content extraction pass.
 */
async function extractVisibleTextChars(page) {
  try {
    return await page.evaluate(() => (document.body?.innerText || "").length);
  } catch {
    return 0;
  }
}

/**
 * Capture a full page identity fingerprint.
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<{
 *   title: string,
 *   routeSignature: string,
 *   headings: { h1: string[], h2: string[] },
 *   breadcrumbs: string[],
 *   visibleTextChars: number
 * }>}
 */
async function pageIdentityProbe(page) {
  // Run the independent reads in parallel; each is individually null-safe.
  const [title, headings, breadcrumbs, visibleTextChars] = await Promise.all([
    page.title().catch(() => ""),
    extractHeadings(page),
    extractBreadcrumbs(page),
    extractVisibleTextChars(page),
  ]);
  return {
    title,
    routeSignature: normalizeRoute(page.url()),
    headings,
    breadcrumbs,
    visibleTextChars,
  };
}

/**
 * Diff two page identity captures.
 *
 * Returns null if both sides are empty, a `firstCapture` marker if only
 * the current side is present, a `captureRemoved` marker if only the
 * previous side is present, and a structured diff otherwise.
 *
 * The diff is deliberately simple — set operations on headings, string
 * equality on title/route/breadcrumbs, percentage delta on text chars.
 * No semantic analysis, no NLP, no fuzzy matching. Regression signals
 * show up as binary flags and small arrays.
 */
function diffPageIdentity(prev, curr) {
  if (!prev && !curr) return null;
  if (!prev) return { firstCapture: true };
  if (!curr) return { captureRemoved: true };

  const setDiff = (prevArr, currArr) => {
    const prevSet = new Set(prevArr || []);
    const currSet = new Set(currArr || []);
    return {
      added: [...currSet].filter((x) => !prevSet.has(x)),
      removed: [...prevSet].filter((x) => !currSet.has(x)),
    };
  };

  const arrayEqual = (a, b) => {
    const aa = a || [];
    const bb = b || [];
    if (aa.length !== bb.length) return false;
    return aa.every((v, i) => v === bb[i]);
  };

  let visibleTextDelta = null;
  if (typeof prev.visibleTextChars === "number" && prev.visibleTextChars > 0) {
    visibleTextDelta =
      (curr.visibleTextChars - prev.visibleTextChars) / prev.visibleTextChars;
  } else if (typeof curr.visibleTextChars === "number") {
    visibleTextDelta = null;
  }

  return {
    titleChanged: prev.title !== curr.title,
    routeSignatureChanged: prev.routeSignature !== curr.routeSignature,
    headings: {
      h1: setDiff(
        prev.headings && prev.headings.h1,
        curr.headings && curr.headings.h1,
      ),
      h2: setDiff(
        prev.headings && prev.headings.h2,
        curr.headings && curr.headings.h2,
      ),
    },
    breadcrumbsChanged: !arrayEqual(prev.breadcrumbs, curr.breadcrumbs),
    visibleTextDelta,
  };
}

module.exports = {
  pageIdentityProbe,
  diffPageIdentity,
  normalizeRoute,
};
