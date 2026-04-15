/**
 * Hermetic tests for pageIdentityProbe.
 *
 * Every test drives Playwright against inline HTML via `page.setContent` —
 * no file:// fixtures, no network, no auth, no baseURL dependency. Safe to
 * run in any environment that already has Playwright installed.
 *
 * Invocation (from repo root):
 *
 *   npx playwright test \
 *     Playwright/helpers/telemetry/pageIdentityProbe.spec.js \
 *     --project=GenericPOC
 *
 * The --project flag can be any project defined in projects.json; the
 * probe doesn't use baseURL/storageState so it's immaterial which one.
 */

const { test, expect } = require("@playwright/test");
const {
  pageIdentityProbe,
  diffPageIdentity,
  normalizeRoute,
} = require("./pageIdentityProbe");

// ---------------------------------------------------------------------------
// normalizeRoute — pure unit tests, no browser needed
// ---------------------------------------------------------------------------

test.describe("normalizeRoute", () => {
  test("replaces numeric id path segments", () => {
    expect(normalizeRoute("https://example.com/dealership/12345")).toBe(
      "/dealership/:id",
    );
  });

  test("replaces multiple id segments", () => {
    expect(
      normalizeRoute("https://example.com/store/42/orders/789/items/12"),
    ).toBe("/store/:id/orders/:id/items/:id");
  });

  test("leaves single-digit segments alone (version numbers)", () => {
    expect(normalizeRoute("https://example.com/v1/api/ping")).toBe(
      "/v1/api/ping",
    );
  });

  test("normalizes ids inside the hash fragment (SPA hash routing)", () => {
    expect(
      normalizeRoute(
        "https://app.example.com/module#/section/entity/12345",
      ),
    ).toBe("/module#/section/entity/:id");
  });

  test("replaces UUID segments", () => {
    expect(
      normalizeRoute(
        "https://example.com/items/a3f7c2e1-9b4d-4e5f-8a1c-7d2e9f3b5a6c",
      ),
    ).toBe("/items/:uuid");
  });

  test("preserves slug-like segments containing letters", () => {
    expect(normalizeRoute("https://example.com/docs/getting-started")).toBe(
      "/docs/getting-started",
    );
  });

  test("non-http urls don't throw and return a stable string", () => {
    // about:blank parses but has no conventional pathname; we just
    // guarantee we return a string rather than throwing.
    expect(typeof normalizeRoute("about:blank")).toBe("string");
    // Genuinely broken input falls through the catch path verbatim.
    expect(normalizeRoute("not a url")).toBe("not a url");
  });

  test("handles root path", () => {
    expect(normalizeRoute("https://example.com/")).toBe("/");
  });
});

// ---------------------------------------------------------------------------
// pageIdentityProbe — driven against synthetic HTML via page.setContent
// ---------------------------------------------------------------------------

test.describe("pageIdentityProbe against synthetic pages", () => {
  test("dealer-style page with breadcrumbs, headings, and body text", async ({
    page,
  }) => {
    await page.setContent(`
      <html>
        <head><title>Demo App — Metrics Module</title></head>
        <body>
          <nav aria-label="Breadcrumb">
            <ol>
              <li><a href="/app">Demo</a></li>
              <li><a href="/app/metrics">Metrics</a></li>
              <li>Entity 12345</li>
            </ol>
          </nav>
          <h1>Entity 12345</h1>
          <section>
            <h2>Total Revenue</h2>
            <p>Month-to-date revenue for this entity.</p>
            <h2>Inventory</h2>
            <p>Active inventory counts by category.</p>
          </section>
        </body>
      </html>
    `);

    const identity = await pageIdentityProbe(page);

    expect(identity.title).toBe("Demo App — Metrics Module");
    expect(identity.headings.h1).toEqual(["Entity 12345"]);
    expect(identity.headings.h2).toEqual(["Total Revenue", "Inventory"]);
    expect(identity.breadcrumbs).toEqual([
      "Demo",
      "Metrics",
      "Entity 12345",
    ]);
    expect(identity.visibleTextChars).toBeGreaterThan(0);
  });

  test("login wall — title present, most fields empty, never throws", async ({
    page,
  }) => {
    await page.setContent(`
      <html>
        <head><title>Sign In</title></head>
        <body>
          <form>
            <input name="username" />
            <input name="password" type="password" />
            <button>Sign in</button>
          </form>
        </body>
      </html>
    `);

    const identity = await pageIdentityProbe(page);

    expect(identity.title).toBe("Sign In");
    expect(identity.headings.h1).toEqual([]);
    expect(identity.headings.h2).toEqual([]);
    expect(identity.breadcrumbs).toEqual([]);
    expect(identity.visibleTextChars).toBeGreaterThanOrEqual(0);
  });

  test("half-hydrated SPA — root div only, just returns title", async ({
    page,
  }) => {
    await page.setContent(`
      <html>
        <head><title>Loading…</title></head>
        <body><div id="root"></div></body>
      </html>
    `);

    const identity = await pageIdentityProbe(page);

    expect(identity.title).toBe("Loading…");
    expect(identity.headings.h1).toEqual([]);
    expect(identity.headings.h2).toEqual([]);
    expect(identity.breadcrumbs).toEqual([]);
  });

  test("breadcrumbs from .breadcrumb class container with no list children", async ({
    page,
  }) => {
    await page.setContent(`
      <html>
        <head><title>Demo App — Records</title></head>
        <body>
          <div class="breadcrumb">Demo › Records › Record 4242</div>
          <h1>Record 4242</h1>
        </body>
      </html>
    `);

    const identity = await pageIdentityProbe(page);

    expect(identity.breadcrumbs).toEqual(["Demo", "Records", "Record 4242"]);
    expect(identity.headings.h1).toEqual(["Record 4242"]);
  });

  test("caps heading lists at 10 entries to avoid flooding snapshot", async ({
    page,
  }) => {
    const many = Array.from(
      { length: 20 },
      (_, i) => `<h2>Item ${i + 1}</h2>`,
    ).join("");
    await page.setContent(`
      <html><head><title>Long</title></head>
      <body><h1>Head</h1>${many}</body></html>
    `);

    const identity = await pageIdentityProbe(page);

    expect(identity.headings.h1).toEqual(["Head"]);
    expect(identity.headings.h2).toHaveLength(10);
    expect(identity.headings.h2[0]).toBe("Item 1");
    expect(identity.headings.h2[9]).toBe("Item 10");
  });

  test("routeSignature reflects setContent's about:blank-like url", async ({
    page,
  }) => {
    // page.setContent runs on about:blank, which has no meaningful path.
    // The probe should still produce a non-throwing routeSignature string.
    await page.setContent(
      "<html><head><title>x</title></head><body></body></html>",
    );
    const identity = await pageIdentityProbe(page);
    expect(typeof identity.routeSignature).toBe("string");
  });
});

// ---------------------------------------------------------------------------
// diffPageIdentity — pure unit tests over hand-crafted identity objects
// ---------------------------------------------------------------------------

test.describe("diffPageIdentity", () => {
  const baseline = {
    title: "Demo App — Metrics",
    routeSignature: "/app#/metrics",
    headings: { h1: ["Home"], h2: ["Totals", "Trends"] },
    breadcrumbs: ["Demo", "Metrics"],
    visibleTextChars: 1000,
  };

  test("identical snapshots → no regression flags", () => {
    const d = diffPageIdentity(baseline, { ...baseline });
    expect(d.titleChanged).toBe(false);
    expect(d.routeSignatureChanged).toBe(false);
    expect(d.headings.h1.added).toEqual([]);
    expect(d.headings.h1.removed).toEqual([]);
    expect(d.headings.h2.added).toEqual([]);
    expect(d.headings.h2.removed).toEqual([]);
    expect(d.breadcrumbsChanged).toBe(false);
    expect(d.visibleTextDelta).toBe(0);
  });

  test("title drift", () => {
    const d = diffPageIdentity(baseline, { ...baseline, title: "Demo App v2" });
    expect(d.titleChanged).toBe(true);
  });

  test("routeSignature drift (big signal — wrong route landed)", () => {
    const d = diffPageIdentity(baseline, {
      ...baseline,
      routeSignature: "/login",
    });
    expect(d.routeSignatureChanged).toBe(true);
  });

  test("h2 heading add/remove shows up as set diffs", () => {
    const d = diffPageIdentity(baseline, {
      ...baseline,
      headings: { h1: ["Home"], h2: ["Totals", "Forecast"] },
    });
    expect(d.headings.h2.added).toEqual(["Forecast"]);
    expect(d.headings.h2.removed).toEqual(["Trends"]);
  });

  test("breadcrumbs order change is flagged", () => {
    const d = diffPageIdentity(baseline, {
      ...baseline,
      breadcrumbs: ["Metrics", "Demo"], // swapped
    });
    expect(d.breadcrumbsChanged).toBe(true);
  });

  test("visibleTextDelta reports relative change", () => {
    const d = diffPageIdentity(baseline, {
      ...baseline,
      visibleTextChars: 1200,
    });
    expect(d.visibleTextDelta).toBeCloseTo(0.2);
  });

  test("first capture returns firstCapture marker", () => {
    expect(diffPageIdentity(null, baseline)).toEqual({ firstCapture: true });
  });

  test("capture removed returns captureRemoved marker", () => {
    expect(diffPageIdentity(baseline, null)).toEqual({ captureRemoved: true });
  });

  test("both null returns null", () => {
    expect(diffPageIdentity(null, null)).toBeNull();
  });

  test("missing heading keys on one side are treated as empty", () => {
    const thin = { ...baseline, headings: { h1: [], h2: [] } };
    const d = diffPageIdentity(thin, baseline);
    expect(d.headings.h1.added).toEqual(["Home"]);
    expect(d.headings.h2.added).toEqual(["Totals", "Trends"]);
  });
});
