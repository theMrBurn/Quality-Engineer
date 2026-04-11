# Telemetry probe — integration notes

This directory ships a standalone page-identity telemetry probe plus its
own minimal Playwright config. Nothing in this directory is wired into
the existing sweep or regressionWriter pipelines. That's deliberate: the
baseTest/regressionWriter files are currently in `Playwright/base/`, which
is in-flight / untracked work, and this POC avoids touching them.

When you're ready to integrate the probe into the sweep pipeline, there
are **exactly two additive edits** to make. Both are backwards-compatible:
tests that don't opt in get byte-identical behavior to today.

---

## Running the probe tests standalone (no integration needed)

```sh
# From the repo root:
npx playwright test --config=Playwright/helpers/telemetry/telemetry.config.js
```

This uses the co-located `telemetry.config.js`, which defines exactly one
test project with no `baseURL`, no `storageState`, no auth. It doesn't
touch `projects.json` and isn't picked up by any `npx playwright test`
invocation that doesn't pass `--config`.

First run on a fresh machine may need:

```sh
npx playwright install chromium
```

Current state: **24 tests, all green.**

---

## Integration Edit #1 — `Playwright/base/baseTest.js`

The sweep fixture currently has the signature `sweepFn = async (url) => { ... }`.
Add an opt-in second argument:

```js
// In baseTest.js, at the top of the file, alongside the existing requires:
const { pageIdentityProbe } = require("../helpers/telemetry/pageIdentityProbe");
```

Then change the `sweepFn` declaration and add the probe call. The diff
against the current baseTest.js is:

```diff
- const sweepFn = async (url) => {
+ const sweepFn = async (url, opts = {}) => {
    // reset intercepted requests to prevent cross-test contamination
    NetworkInterceptor.interceptedRequests = [];

    // ... existing code unchanged through the scrape + touch loop ...

    // wait for any API calls triggered by interactions to settle
    await page.waitForLoadState("networkidle").catch(() => null);

    // collect API calls from interceptor
    const apiCalls = NetworkInterceptor.interceptedRequests.map((r) => ({
      url: r.request.url,
      method: r.request.method,
      status: r.response?.status ?? null,
    }));

+   // Optional page-identity telemetry — captured only if the caller
+   // opts in via opts.telemetry.pageIdentity. Null-safe probe, never throws.
+   let identity = null;
+   if (opts.telemetry && opts.telemetry.pageIdentity) {
+     identity = await pageIdentityProbe(page);
+   }

    // build run snapshot
    const snapshot = {
      timestamp: new Date().toISOString(),
      url: page.url(),
      locatorMap: Object.fromEntries(locatorMap),
      interactions: { touched, skipped },
      apiCalls,
+     ...(identity ? { telemetry: { pageIdentity: identity } } : {}),
    };

    // ... rest unchanged ...
  };
```

**Contract this preserves:**

- `await sweep(url)` with one arg works exactly as before — `opts`
  defaults to `{}`, the probe is never called, the snapshot has no
  `telemetry` key.
- `await sweep(url, { telemetry: { pageIdentity: true } })` adds a
  `telemetry.pageIdentity` key to the snapshot.
- The snapshot spread only adds the telemetry key when identity is
  truthy, so old JSON consumers that walk `Object.keys(snapshot)`
  don't see phantom keys.

**Per-test opt-in example:**

```js
const { baseTest: test } = require("../../base/baseTest");

test("Atlas sales sweep with identity telemetry", async ({ sweep }) => {
  const result = await sweep("/atlas#/sales", {
    telemetry: { pageIdentity: true },
  });
  // result.diff.telemetry will be present after the second run.
});
```

---

## Integration Edit #2 — `Playwright/base/regressionWriter.js`

Add a conditional `telemetry` bucket to `computeDiff`. The diff shape for
existing non-telemetry tests stays exactly 3 buckets; the new bucket only
appears when either the previous or current snapshot has a
`telemetry.pageIdentity` field.

```js
// In regressionWriter.js, at the top of the file:
const { diffPageIdentity } = require("../helpers/telemetry/pageIdentityProbe");
```

Then change `computeDiff` and `appendAndDiff`'s empty-diff fallback:

```diff
  function computeDiff(previous, current) {
    const prevLocators = new Set(Object.keys(previous.locatorMap));
    const currLocators = new Set(Object.keys(current.locatorMap));

    const prevApis = new Set(
      previous.apiCalls.map((c) => `${c.method}:${c.url}`),
    );
    const currApis = new Set(
      current.apiCalls.map((c) => `${c.method}:${c.url}`),
    );

    const prevSkipped = new Set(previous.interactions.skipped);
    const currSkipped = new Set(current.interactions.skipped);

-   return {
+   const diff = {
      locators: {
        added: [...currLocators].filter((k) => !prevLocators.has(k)),
        removed: [...prevLocators].filter((k) => !currLocators.has(k)),
      },
      apiCalls: {
        added: [...currApis].filter((k) => !prevApis.has(k)),
        removed: [...prevApis].filter((k) => !currApis.has(k)),
      },
      interactions: {
        newlySkipped: [...currSkipped].filter((k) => !prevSkipped.has(k)),
        newlyTouched: [...previous.interactions.skipped].filter(
          (k) => !currSkipped.has(k),
        ),
      },
    };
+
+   // Telemetry bucket is additive. Only present when either snapshot
+   // carries a telemetry.pageIdentity capture — tests that never opt
+   // in get the exact 3-bucket diff shape they get today.
+   const prevIdentity = previous.telemetry && previous.telemetry.pageIdentity;
+   const currIdentity = current.telemetry && current.telemetry.pageIdentity;
+   if (prevIdentity || currIdentity) {
+     diff.telemetry = { pageIdentity: diffPageIdentity(prevIdentity, currIdentity) };
+   }
+
+   return diff;
  }
```

The fallback empty-diff object in `appendAndDiff` (returned on first run
when no previous snapshot exists) does NOT need a telemetry bucket —
first-run identity is captured but there's nothing to diff against. The
next run will produce a `telemetry.pageIdentity.firstCapture = true`
marker automatically.

**Contract this preserves:**

- Old snapshots in `regression-data/*.json` that lack a `telemetry` field
  still load and diff correctly — `previous.telemetry && ...` short-
  circuits to falsy and no bucket is added.
- Tests that don't opt into telemetry get the exact 3-bucket diff shape
  they get today — the `if (prevIdentity || currIdentity)` gate skips
  the bucket entirely.
- First-run behavior unchanged — the fallback empty diff in
  `appendAndDiff` is never reached when telemetry is opted in on the
  first run, because `computeDiff` isn't called on first run anyway
  (look at the `previousRun ? computeDiff(...) : null` pattern).

---

## Rolling it back

Removal is clean:

```sh
rm -rf Playwright/helpers/telemetry/
```

Plus revert the two edits above — each is a handful of lines in one
file, no touching of `projects.json`, no touching of `package.json`, no
touching of `playwright.config.js`.

---

## What the probe captures

```js
{
  title: "Atlas — Sales Operations",               // page.title()
  routeSignature: "/atlas#/sales/dealership/:id",   // URL path+hash, IDs normalized
  headings: {
    h1: ["Dealership 12345"],                       // visible h1 text, capped at 10
    h2: ["Total Sales", "Inventory"],               // visible h2 text, capped at 10
  },
  breadcrumbs: ["Atlas", "Sales", "Dealership 12345"], // first matching breadcrumb pattern
  visibleTextChars: 2847,                           // document.body.innerText.length
}
```

And the diff it produces:

```js
{
  titleChanged: false,
  routeSignatureChanged: false,  // ← the big one; catches "we landed on /login"
  headings: {
    h1: { added: [], removed: [] },
    h2: { added: ["Forecast"], removed: ["Trends"] },
  },
  breadcrumbsChanged: false,
  visibleTextDelta: 0.2,   // percentage change (0.2 = +20%)
}
```

Or one of these markers on edge cases:

```text
{ firstCapture: true }    // current has a capture, previous doesn't
{ captureRemoved: true }  // previous had a capture, current doesn't
null                      // neither side has a capture
```

---

## Zero-dependency guarantee

The probe is pure Playwright DOM reads. No new npm packages. No
`@mozilla/readability`, no `jsdom`, no network calls, no dynamic code
injection beyond the `page.evaluate` that your existing sweep already
uses. All output stays in-process and flows through the existing
`regression-data/*.json` files — nothing phones home. Safe for
enterprise-intranet-behind-VPN deployment.
