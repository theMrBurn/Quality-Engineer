const { test, expect } = require("@playwright/test");
const { PD20MainPage } = require("./pd20_main_page");
const { scrapeInteractiveElements } = require("../../../helpers/utils/scrapeUtils");

const TEST_PARAMS_KEY = process.env.TEST_PARAMS || "default";

/**
 * Helper to check if two arrays of element keys differ (simple comparison)
 */
function haveElementsChanged(oldElements, newElements) {
  if (!oldElements || oldElements.length !== newElements.length) return true;
  const oldKeys = oldElements.map((el) => el.key).sort();
  const newKeys = newElements.map((el) => el.key).sort();
  return oldKeys.some((key, idx) => key !== newKeys[idx]);
}

test.describe.serial("PD20 Drill-Through Bug Repro Test", () => {
  let previousScrapedElements = null;

  test("should verify drill-through opens reliably after scraping elements", async ({ page }, testInfo) => {
    const pd20Page = new PD20MainPage(page, TEST_PARAMS_KEY);

    // NAVIGATION & SCRAPE OUTSIDE TRY CATCH
    await pd20Page.goto();

    // Scrape interactive elements on page (top-level only)
    const { results /*, locatorMap*/ } = await scrapeInteractiveElements(page);
    console.log(`[${new Date().toISOString()}] Scraped ${results.length} interactive elements.`);

    // Compare with previous scrape to decide if update needed
    if (haveElementsChanged(previousScrapedElements, results)) {
      console.log(`[${new Date().toISOString()}] Interactive elements changed, updating POM locators...`);
      // If you have a method to update locators dynamically, call it here, e.g.:
      // pd20Page.updateLocatorsFromScrape(locatorMap);

      // For now, just store scraped results for next comparison
      previousScrapedElements = results;
    } else {
      console.log(`[${new Date().toISOString()}] Interactive elements unchanged, no update needed.`);
    }

    // MAIN TEST STEPS INSIDE TRY CATCH
    try {
      // Wait for frame ready
      await page.waitForLoadState("networkidle");
      const frame = await pd20Page.locators.getPowerBIFrame();
      if (!frame) throw new Error("Power BI iframe not found");

      // Set year slicer (and optionally month slicer if stable; skip month if flaky)
      const yearCombo = frame.getByRole("combobox", { name: /year/i });
      await yearCombo.locator("i").click();
      await frame.getByText(pd20Page.testParams.drillthrough.year).click();

      const monthCombo = frame.getByRole("combobox", { name: /month/i });
      await monthCombo.locator("i").click();
      await frame.getByText(pd20Page.testParams.drillthrough.month).click();

      // Confirm selections
      await expect(yearCombo).toHaveText(pd20Page.testParams.drillthrough.year);
      await expect(monthCombo).toHaveText(pd20Page.testParams.drillthrough.month);

      // Navigate away and back using POM helper
      await pd20Page.navigateToReportSection("Aftersales", "Service Dashboard");
      await pd20Page.navigateToReportSection("Sales", "Sales Log");

      // Wait for iframe reload
      await page.waitForLoadState("networkidle");
      const salesLogFrame = await pd20Page.locators.getPowerBIFrame();
      if (!salesLogFrame) throw new Error("Power BI iframe missing on sales-log report");

      // Repeat drill-through to verify bug fix
      const drillLink = await salesLogFrame.locator(".drillthrough-link").first();
      const repeatCount = pd20Page.testParams.drillthrough.repeatCount || 3;
      const expectedUrlContains = pd20Page.testParams.drillthrough.urlContains || "sales-log";

      for (let i = 0; i < repeatCount; i++) {
        console.log(`[${new Date().toISOString()}] Drill-through attempt ${i + 1}`);
        await drillLink.click();

        await page.waitForLoadState("networkidle");
        expect(page.url()).toContain(expectedUrlContains);

        await page.goBack();
        await page.waitForLoadState("networkidle");
      }

      console.log(`[${new Date().toISOString()}] Drill-through test passed successfully.`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test step failed: ${error.message}`);
      throw error;
    }
  });
});