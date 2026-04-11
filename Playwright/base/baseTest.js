const { test } = require("@playwright/test");
const NetworkInterceptor = require("../helpers/utils/network_interceptor");
const {
  scrapeInteractiveElements,
} = require("../helpers/utils/scrapeUtils");
const { appendAndDiff } = require("./regressionWriter");
const path = require("path");

function resolveProjectName(testInfo) {
  return testInfo.project.name;
}

const baseTest = test.extend({
  sweep: async ({ page }, use, testInfo) => {
    const projectName = resolveProjectName(testInfo);

    const sweepFn = async (url) => {
      // reset intercepted requests to prevent cross-test contamination
      NetworkInterceptor.interceptedRequests = [];

      // start interceptor
      await NetworkInterceptor.interceptRequests(page);

      // navigate only if a URL is passed and differs from current page
      const currentUrl = page.url();
      if (url && url !== currentUrl && !currentUrl.endsWith(url)) {
        await page.goto(url);
        await page.waitForLoadState("networkidle");
      }

      // scrape
      const { results, locatorMap } = await scrapeInteractiveElements(page);

      // touch all interactables — soft sweep, never fails the test
      const touched = [];
      const skipped = [];

      for (const [key, selector] of locatorMap.entries()) {
        try {
          const el = page.locator(selector).first();
          const tagName = await el
            .evaluate((e) => e.tagName.toLowerCase())
            .catch(() => null);
          const role = await el.getAttribute("role").catch(() => null);
          const inputType = await el.getAttribute("type").catch(() => null);

          if (!tagName) {
            skipped.push(key);
            continue;
          }

          if (
            tagName === "button" ||
            role === "button" ||
            role === "menuitem"
          ) {
            await el.hover({ timeout: 2000 }).catch(() => null);
            await el.click({ timeout: 2000 }).catch(() => null);
          } else if (tagName === "input" && inputType !== "checkbox") {
            await el.fill("__baseline__", { timeout: 2000 }).catch(() => null);
            await el.fill("", { timeout: 2000 }).catch(() => null);
          } else if (tagName === "input" && inputType === "checkbox") {
            await el.check({ timeout: 2000 }).catch(() => null);
            await el.uncheck({ timeout: 2000 }).catch(() => null);
          } else if (tagName === "select" || role === "combobox") {
            await el
              .selectOption({ index: 0 }, { timeout: 2000 })
              .catch(() => null);
          } else if (tagName === "a" || role === "link") {
            await el.hover({ timeout: 2000 }).catch(() => null);
          } else {
            skipped.push(key);
            continue;
          }
          touched.push(key);
        } catch {
          skipped.push(key);
        }
      }

      // wait for any API calls triggered by interactions to settle
      await page.waitForLoadState("networkidle").catch(() => null);

      // collect API calls from interceptor
      const apiCalls = NetworkInterceptor.interceptedRequests.map((r) => ({
        url: r.request.url,
        method: r.request.method,
        status: r.response?.status ?? null,
      }));

      // build run snapshot
      const snapshot = {
        timestamp: new Date().toISOString(),
        url: page.url(),
        locatorMap: Object.fromEntries(locatorMap),
        interactions: { touched, skipped },
        apiCalls,
      };

      // write and diff against previous run
      const outputPath = path.resolve(
        __dirname,
        "../regression-data",
        `${projectName}.json`
      );
      const diff = await appendAndDiff(outputPath, snapshot);

      return { locatorMap, apiCalls, diff };
    };

    await use(sweepFn);
  },
});

module.exports = { baseTest };
