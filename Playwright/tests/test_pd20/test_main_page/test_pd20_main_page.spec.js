const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const { PD20MainPage } = require("./pd20_main_page");
const { scrapeInteractiveElements } = require("../../../helpers/utils/scrapeUtils");

const TEST_PARAMS_PATH = path.resolve(
  __dirname,
  "../../../helpers/utils/pd20_test_params.json"
);

let allTestParams = {};
try {
  allTestParams = JSON.parse(fs.readFileSync(TEST_PARAMS_PATH, "utf8"));
} catch (e) {
  console.warn(`[${new Date().toISOString()}] Failed to load test parameters: ${e.message}`);
}

const TEST_PARAMS_KEY = process.env.TEST_PARAMS || "default";

/**
 * No UI login helper call here — rely on storageState specified in projects.json.
 */
async function maybePerformLogin(page, projectConfig) {
  if (!projectConfig.use.storageState) {
    console.warn(`[${new Date().toISOString()}] No storageState defined in project config.`);
  } else {
    console.log(`[${new Date().toISOString()}] StorageState detected, skipping UI login.`);
  }
}

/**
 * Interact with scraped elements, mapping to PO locators if possible.
 */
async function performBasicInteraction(page, elInfo, pd20Page, testParams) {
  try {
    if (elInfo.selector.includes("apply-bookmark")) {
      console.log(`[${new Date().toISOString()}] Clicking applyBookmarkButton`);
      await pd20Page.clickElement("applyBookmarkButton");
    } else if (/inputField/i.test(elInfo.selector)) {
      for (const key of Object.keys(pd20Page.locators)) {
        if (
          key.toLowerCase().includes("input") &&
          elInfo.selector.toLowerCase().includes(key.toLowerCase().replace("input", ""))
        ) {
          const val = testParams.inputs?.[key] || "test";
          console.log(`[${new Date().toISOString()}] Filling ${key} with value '${val}'`);
          await pd20Page.fillInput(key, val);
          break;
        }
      }
    } else if (elInfo.tagName === "button" || elInfo.tagName === "a") {
      console.log(`[${new Date().toISOString()}] Clicking element with selector '${elInfo.selector}'`);
      const locator = page.locator(elInfo.selector);
      await locator.waitFor({ state: "visible", timeout: 15000 });
      await locator.click();
      await page.waitForLoadState("networkidle");
    } else {
      console.log(`[${new Date().toISOString()}] Skipping interaction for ${elInfo.selector} (${elInfo.tagName})`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Failed interaction for ${elInfo.selector}: ${err.message}`);
    return false;
  }
}

test.describe.serial(
  "PD20 Base Interaction Test with Power BI iframe and WaitForLoadState",
  () => {
    test(
      "should load, verify login, test drill-through, scrape & interact",
      async ({ page }, testInfo) => {
        const testParams = allTestParams[TEST_PARAMS_KEY] || allTestParams.default || {};
        const baseUrl =
          testInfo.project.use.baseURL ||
          testParams.urls?.mainPage ||
          "/";
        if (!baseUrl) {
          console.log(`[${new Date().toISOString()}] Missing baseURL - skipping test`);
          test.skip(true, "Missing baseURL");
          return;
        }

        const pd20Page = new PD20MainPage(page, testParams);

        console.log(`[${new Date().toISOString()}] Starting test - verifying auth/session`);
        await maybePerformLogin(page, testInfo.project);

        console.log(`[${new Date().toISOString()}] Navigating to base URL: ${baseUrl}`);
        await pd20Page.goto(baseUrl);

        console.log(`[${new Date().toISOString()}] Waiting for logged-in app indicator`);
        const loggedInIndicator = pd20Page.locators.appHeader();
        await loggedInIndicator.waitFor({ state: "visible", timeout: 15000 });
        console.log(`[${new Date().toISOString()}] Logged-in indicator visible.`);

        try {
          // Power BI slicer dropdowns inside iframe
          const monthSlicer = await pd20Page.locators.monthSlicerDropdown();
          const yearSlicer = await pd20Page.locators.yearSlicerDropdown();

          console.log(`[${new Date().toISOString()}] Waiting for month slicer`);
          await monthSlicer.waitFor({ state: "visible", timeout: 30000 });
          console.log(`[${new Date().toISOString()}] Selecting month: ${testParams.drillthrough?.month || "March"}`);
          await monthSlicer.selectOption({ label: testParams.drillthrough?.month || "March" });

          console.log(`[${new Date().toISOString()}] Waiting for year slicer`);
          await yearSlicer.waitFor({ state: "visible", timeout: 30000 });
          console.log(`[${new Date().toISOString()}] Selecting year: ${testParams.drillthrough?.year || "2023"}`);
          await yearSlicer.selectOption({ label: testParams.drillthrough?.year || "2023" });

          console.log(`[${new Date().toISOString()}] Waiting for network idle after slicer selections`);
          await page.waitForLoadState("networkidle");

          const repeatCount = testParams.drillthrough?.repeatCount || 3;
          const expectedUrlContains = testParams.drillthrough?.urlContains || "sales-log";

          for (let i = 0; i < repeatCount; i++) {
            console.log(`[${new Date().toISOString()}] Drill-through iteration ${i + 1} - waiting for drill-through link`);
            const drillLink = await pd20Page.locators.drillThroughLink();

            await drillLink.first().waitFor({ state: "visible", timeout: 30000 });
            console.log(`[${new Date().toISOString()}] Drill-through iteration ${i + 1} - clicking drill-through link`);
            await drillLink.first().click();

            const reportContainer = await pd20Page.locators.reportContainer();
            console.log(`[${new Date().toISOString()}] Drill-through iteration ${i + 1} - waiting for report container`);
            await reportContainer.waitFor({ state: "visible", timeout: 30000 });

            console.log(`[${new Date().toISOString()}] Drill-through iteration ${i + 1} - verifying URL contains '${expectedUrlContains}'`);
            expect(page.url()).toContain(expectedUrlContains);

            console.log(`[${new Date().toISOString()}] Drill-through iteration ${i + 1} - navigating back`);
            await page.goBack();
            await page.waitForLoadState("load");
          }

          console.log(`[${new Date().toISOString()}] Applying bookmark`);
          await pd20Page.clickElement("applyBookmarkButton");
          await page.waitForLoadState("networkidle");

          for (let i = 0; i < repeatCount; i++) {
            console.log(`[${new Date().toISOString()}] Drill-through post-bookmark iteration ${i + 1} - waiting for drill-through link`);
            const drillLink = await pd20Page.locators.drillThroughLink();

            await drillLink.first().waitFor({ state: "visible", timeout: 30000 });
            console.log(`[${new Date().toISOString()}] Drill-through post-bookmark iteration ${i + 1} - clicking drill-through link`);
            await drillLink.first().click();

            const reportContainer = await pd20Page.locators.reportContainer();
            console.log(`[${new Date().toISOString()}] Drill-through post-bookmark iteration ${i + 1} - waiting for report container`);
            await reportContainer.waitFor({ state: "visible", timeout: 30000 });

            console.log(`[${new Date().toISOString()}] Drill-through post-bookmark iteration ${i + 1} - verifying URL contains '${expectedUrlContains}'`);
            expect(page.url()).toContain(expectedUrlContains);

            console.log(`[${new Date().toISOString()}] Drill-through post-bookmark iteration ${i + 1} - navigating back`);
            await page.goBack();
            await page.waitForLoadState("load");
          }

          console.log(`[${new Date().toISOString()}] Checking visibility of all known locators`);
          for (const locatorName of Object.keys(pd20Page.locators)) {
            try {
              await pd20Page.checkElementVisibility(locatorName);
              console.log(`[${new Date().toISOString()}] Locator '${locatorName}' is visible.`);
            } catch (err) {
              console.warn(`[${new Date().toISOString()}] Locator '${locatorName}' not visible or missing: ${err.message}`);
            }
          }

          console.log(`[${new Date().toISOString()}] Starting dynamic scrape and interaction`);
          const interactiveElements = await scrapeInteractiveElements(page);
          if (interactiveElements.length > 0) {
            let successCount = 0;
            for (const elInfo of interactiveElements) {
              if (await performBasicInteraction(page, elInfo, pd20Page, testParams))
                successCount++;
            }
            console.log(`[${new Date().toISOString()}] Interacted with ${successCount} / ${interactiveElements.length} elements.`);
          } else {
            console.warn(`[${new Date().toISOString()}] No interactive elements found during dynamic scrape.`);
          }

          console.log(`[${new Date().toISOString()}] Checking bookmarkStatus text`);
          const bookmarkText = await pd20Page.getText("bookmarkStatus").catch(() => "");
          if (bookmarkText && testParams.expectedTexts?.bookmarkApplied) {
            expect(bookmarkText).toContain(testParams.expectedTexts.bookmarkApplied);
          }

          console.log(`[${new Date().toISOString()}] Test completed successfully.`);
        } catch (error) {
          console.error(`[${new Date().toISOString()}] Test error: ${error.message}`);
          throw new Error(`Test failed with error: ${error.message}`);
        }
      }
    );
  }
);