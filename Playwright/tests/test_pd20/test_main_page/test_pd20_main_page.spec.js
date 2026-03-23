const { test, expect } = require("@playwright/test");
const { PD20MainPage } = require("./pd20_main_page");
const { scrapeInteractiveElements } = require("../../../helpers/utils/scrapeUtils");

/**
 * Retry helper to acquire a stable Power BI iframe content frame
 * AND verify SDK handshake (window.powerbi.getReports().length > 0) inside frame before returning.
 *
 * @param {PD20MainPage} pdPage
 * @param {number} retries
 * @param {number} delayMs
 * @returns {Promise<import('playwright').Frame>}
 */
async function getPowerBIContentFrameWithRetry(pdPage, retries = 5, delayMs = 1000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const frame = await pdPage.getPowerBIFrame();
      if (frame) {
        // Confirm SDK handshake inside iframe before return
        const sdkReady = await frame.evaluate(() => 
          window.powerbi &&
          typeof window.powerbi.getReports === "function" &&
          window.powerbi.getReports().length > 0
        ).catch(() => false);

        if (sdkReady) {
          return frame;
        }
      }
    } catch {
      // Possibly detached or transient errors, ignore and retry
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  throw new Error("Failed to acquire Power BI iframe with active SDK handshake after retries");
}

test.describe.serial("PD20 Inventory Pagination - Visibility-First Toggle Validation", () => {
  let previousScrapedElements = null;
  const TEST_PARAMS_KEY = process.env.TEST_PARAMS || "default";

  test("Should toggle 'Used' and 'New' inventory pages and validate CURRENT_YEAR slicer persists", async ({ page }) => {
    const pdPage = new PD20MainPage(page, TEST_PARAMS_KEY);

    // Navigate main page
    await pdPage.goto();

    // Passive async scraper (non-blocking)
    scrapeInteractiveElements(page).then(({ results, locatorMap }) => {
      if (!previousScrapedElements || previousScrapedElements.length !== results.length) {
        pdPage.updateLocatorsFromScrape(locatorMap);
        previousScrapedElements = results;
      }
    });

    // Step 1: Navigate Sales → Used Vehicle Inventory (outside iframe)
    await pdPage.locators.salesButton().click();
    await pdPage.locators.navLinkByName("Used Vehicle Inventory").click();

    // Wait for iframe element presence as replacement for waitForLoadState('networkidle')
    await page.locator(pdPage.locators.powerBIFrameSelector).waitFor();

    // Re-acquire iframe + confirm SDK handshake
    let frame = await getPowerBIContentFrameWithRetry(pdPage);

    // Click the "Used Vehicle Inventory" text inside iframe - Playwright auto-waits for element visible & actionable
    await frame.getByText("Used Vehicle Inventory").click();

    // Step 2: Navigate Sales → New Vehicle Inventory (outside iframe)
    await pdPage.locators.salesButton().click();
    await pdPage.locators.navLinkByName("New Vehicle Inventory").click();

    // Wait for iframe element presence (replaces banned waitForLoadState)
    await page.locator(pdPage.locators.powerBIFrameSelector).waitFor();

    // Re-acquire iframe + confirm SDK handshake again
    frame = await getPowerBIContentFrameWithRetry(pdPage);

    // Click the "New Vehicle Inventory" text inside iframe
    await frame.getByText("New Vehicle Inventory").click();

    // Validate CURRENT_YEAR slicer preserves "2025" selection
    await page.locator(pdPage.locators.powerBIFrameSelector).waitFor();
    frame = await getPowerBIContentFrameWithRetry(pdPage);

    const currentYearSlicer = frame.getByRole("combobox", { name: "CURRENT_YEAR" });
    // No explicit waitFor visible or timeout - rely on Playwright auto-wait on click
    await currentYearSlicer.locator("i").click();

    await page.locator(pdPage.locators.powerBIFrameSelector).waitFor();
    frame = await getPowerBIContentFrameWithRetry(pdPage);

    await frame.getByText("2025", { exact: true }).click();

    // Final reacquire to check selected year text
    await page.locator(pdPage.locators.powerBIFrameSelector).waitFor();
    frame = await getPowerBIContentFrameWithRetry(pdPage);

    const selectedYear = frame.locator('div[aria-label="CURRENT_YEAR"] span.selected-text, div[aria-label="CURRENT_YEAR"] .selected-value');
    // Let Playwright auto-wait for visibility on textContent
    const selectedYearText = (await selectedYear.first().textContent())?.trim();

    expect(selectedYearText).toBe("2025");
  });
});