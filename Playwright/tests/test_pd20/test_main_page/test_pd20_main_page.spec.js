const { test, expect } = require("@playwright/test");
const { PD20MainPage } = require("./pd20_main_page");
const { scrapeInteractiveElements } = require("../../../helpers/utils/scrapeUtils");

const TEST_PARAMS_KEY = process.env.TEST_PARAMS || "default";

/**
 * Session reuse via storageState, no manual UI login helper.
 */
async function maybePerformLogin(page, projectConfig) {
  if (!projectConfig.use.storageState) {
    console.warn(`[${new Date().toISOString()}] No storageState defined in project config.`);
  } else {
    console.log(`[${new Date().toISOString()}] StorageState detected, skipping UI login.`);
  }
}

/**
 * Basic interaction on scraped elements with fallback to PO locators.
 */
async function performBasicInteraction(page, elInfo, pd20Page, testParams) {
  try {
    if (elInfo.selector.includes("apply-bookmark")) {
      await pd20Page.clickElement("applyBookmarkButton");
      return true;
    }
    
    if (/inputField/i.test(elInfo.selector)) {
      for (const key of Object.keys(pd20Page.locators)) {
        if (
          key.toLowerCase().includes("input") &&
          elInfo.selector.toLowerCase().includes(key.toLowerCase().replace("input", ""))
        ) {
          const val = testParams.inputs?.[key] || "test";
          await pd20Page.fillInput(key, val);
          return true;
        }
      }
      return false;
    }

    if (elInfo.tagName === "button" || elInfo.tagName === "a") {
      const locator = page.locator(elInfo.selector);
      await locator.waitFor({ state: "visible", timeout: 15000 });
      await locator.click();
      await page.waitForLoadState("networkidle");
      return true;
    }

    console.log(`[${new Date().toISOString()}] Skipping interaction for ${elInfo.selector} (${elInfo.tagName})`);
    return false;
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Interaction failed for ${elInfo.selector}: ${err.message}`);
    return false;
  }
}

test.describe.serial("PD20 Base Interaction Test with Drill-Through Verification", () => {
  test("should load, verify login, do drill-through, scrape & interact", async ({ page }, testInfo) => {
    const pd20Page = new PD20MainPage(page, TEST_PARAMS_KEY);
    const testParams = pd20Page.getTestParams();

    await maybePerformLogin(page, testInfo.project);

    console.log(`[${new Date().toISOString()}] Navigating to main app page`);
    await pd20Page.goto();

    const loggedInIndicator = pd20Page.locators.appHeader();
    await loggedInIndicator.waitFor({ state: "visible", timeout: 15000 });
    console.log(`[${new Date().toISOString()}] Logged-in indicator visible.`);

    try {
      // Select slicers inside Power BI iframe with robust waits
      const monthSlicer = await pd20Page.locators.monthSlicerDropdown();
      const yearSlicer = await pd20Page.locators.yearSlicerDropdown();

      await monthSlicer.selectOption({ label: testParams.drillthrough?.month || "March" });
      await yearSlicer.selectOption({ label: testParams.drillthrough?.year || "2023" });

      await page.waitForLoadState("networkidle");

      // Use parameterized getter for slicer values
      const initialMonth = await pd20Page.getSelectedOption("monthSlicerDropdown");
      const initialYear = await pd20Page.getSelectedOption("yearSlicerDropdown");

      expect(initialMonth).toBe(testParams.drillthrough.month);
      expect(initialYear).toBe(testParams.drillthrough.year);
      console.log(`[${new Date().toISOString()}] Verified initial slicer selections.`);

      const repeatCount = testParams.drillthrough?.repeatCount || 3;
      const expectedUrlContains = testParams.drillthrough?.urlContains || "sales-log";

      for (let i = 0; i < repeatCount; i++) {
        console.log(`[${new Date().toISOString()}] Drill-through iteration ${i + 1}`);
        const drillLink = await pd20Page.locators.drillThroughLink();
        await drillLink.first().click();

        const reportContainer = await pd20Page.locators.reportContainer();
        await reportContainer.waitFor({ state: "visible", timeout: 30000 });

        expect(page.url()).toContain(expectedUrlContains);

        const monthAfterDrill = await pd20Page.getSelectedOption("monthSlicerDropdown");
        const yearAfterDrill = await pd20Page.getSelectedOption("yearSlicerDropdown");
        expect(monthAfterDrill).toBe(testParams.drillthrough.month);
        expect(yearAfterDrill).toBe(testParams.drillthrough.year);
        console.log(`[${new Date().toISOString()}] Verified slicer selections after drill-through iteration ${i + 1}.`);

        await page.goBack();
        await page.waitForLoadState("load");
      }

      await pd20Page.clickElement("applyBookmarkButton");
      await page.waitForLoadState("networkidle");

      const monthAfterBookmark = await pd20Page.getSelectedOption("monthSlicerDropdown");
      const yearAfterBookmark = await pd20Page.getSelectedOption("yearSlicerDropdown");
      expect(monthAfterBookmark).toBe(testParams.drillthrough.month);
      expect(yearAfterBookmark).toBe(testParams.drillthrough.year);
      console.log(`[${new Date().toISOString()}] Verified slicer selections after applying bookmark.`);

      for (let i = 0; i < repeatCount; i++) {
        console.log(`[${new Date().toISOString()}] Drill-through post-bookmark iteration ${i + 1}`);
        const drillLink = await pd20Page.locators.drillThroughLink();
        await drillLink.first().click();

        const reportContainer = await pd20Page.locators.reportContainer();
        await reportContainer.waitFor({ state: "visible", timeout: 30000 });

        expect(page.url()).toContain(expectedUrlContains);

        const monthAfterDrillBookmark = await pd20Page.getSelectedOption("monthSlicerDropdown");
        const yearAfterDrillBookmark = await pd20Page.getSelectedOption("yearSlicerDropdown");
        expect(monthAfterDrillBookmark).toBe(testParams.drillthrough.month);
        expect(yearAfterDrillBookmark).toBe(testParams.drillthrough.year);
        console.log(`[${new Date().toISOString()}] Verified slicer selections after drill-through post-bookmark iteration ${i + 1}.`);

        await page.goBack();
        await page.waitForLoadState("load");
      }

      // Validate all known locators visibility (log but continue on failure)
      let visibleSuccessCount = 0;
      let visibleFailCount = 0;
      for (const locatorName of Object.keys(pd20Page.locators)) {
        try {
          await pd20Page.checkElementVisibility(locatorName);
          visibleSuccessCount++;
          console.log(`[${new Date().toISOString()}] Locator '${locatorName}' is visible.`);
        } catch (err) {
          visibleFailCount++;
          console.warn(`[${new Date().toISOString()}] Locator '${locatorName}' missing or invisible: ${err.message}`);
        }
      }
      console.log(`[${new Date().toISOString()}] Locator visibility check: Success=${visibleSuccessCount}, Fail=${visibleFailCount}`);

      // Dynamic scrape and interaction
      const interactiveElements = await scrapeInteractiveElements(page);
      let interactionSuccessCount = 0;
      let interactionFailCount = 0;

      for (const elInfo of interactiveElements) {
        const interacted = await performBasicInteraction(page, elInfo, pd20Page, testParams);
        if (interacted) interactionSuccessCount++;
        else interactionFailCount++;
      }
      console.log(`[${new Date().toISOString()}] Dynamic interaction results: Success=${interactionSuccessCount}, Fail=${interactionFailCount}`);

      // Validate bookmark status text
      const bookmarkText = await pd20Page.getText("bookmarkStatus").catch(() => "");
      if (bookmarkText && testParams.expectedTexts?.bookmarkApplied) {
        expect(bookmarkText).toContain(testParams.expectedTexts.bookmarkApplied);
        console.log(`[${new Date().toISOString()}] Bookmark status text validated.`);
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test failed: ${error.message}`);
      throw error;
    }
  });
});