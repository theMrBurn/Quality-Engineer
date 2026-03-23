const { test, expect } = require("@playwright/test");
const { PD20MainPage } = require("./pd20_main_page");
const { scrapeInteractiveElements } = require("../../../helpers/utils/scrapeUtils");

const TEST_PARAMS_KEY = process.env.TEST_PARAMS || "default";

function haveElementsChanged(oldElements, newElements) {
  if (!oldElements || oldElements.length !== newElements.length) return true;
  const oldKeys = oldElements.map((el) => el.key).sort();
  const newKeys = newElements.map((el) => el.key).sort();
  return oldKeys.some((key, idx) => key !== newKeys[idx]);
}

async function getPowerBIFrameWithRetry(pd20Page, retries = 5, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const frame = await pd20Page.locators.getPowerBIFrame();
      if (frame) return frame;
    } catch {
      // ignored
    }
    await new Promise(res => setTimeout(res, delayMs));
  }
  throw new Error("Unable to get stable Power BI iframe after retries");
}

async function waitForReportReady(frame) {
 // await frame.waitForSelector("#report-container", { timeout });
}

test.describe.serial("PD20 Drill-Through Bug Repro Test - Baseline Working Version", () => {
  let previousScrapedElements = null;

  test("should verify drill-through reliably with iframe reloads and navigation", async ({ page }) => {
    const pd20Page = new PD20MainPage(page, TEST_PARAMS_KEY);

    // Navigate & scrape outside try block
    await pd20Page.goto();

    const { results, locatorMap } = await scrapeInteractiveElements(page);
    console.log(`[${new Date().toISOString()}] Scraped ${results.length} interactive elements.`);

    if (haveElementsChanged(previousScrapedElements, results)) {
      console.log(`[${new Date().toISOString()}] Interactive elements changed, updating POM locators...`);
      pd20Page.updateLocatorsFromScrape(locatorMap);
      previousScrapedElements = results;
    } else {
      console.log(`[${new Date().toISOString()}] Interactive elements unchanged.`);
    }

    try {
      await page.waitForSelector('iframe[src*="powerbi.com"]', { state: 'visible', timeout: 30000 });

      // Select Year slicer using codegen style interaction, reacquire frame after each step
      let frame = await getPowerBIFrameWithRetry(pd20Page);
      await waitForReportReady(frame);

      const yearCombo = frame.getByRole('combobox', { name: 'CURRENT_YEAR' });
      await yearCombo.locator('i').click();

      frame = await getPowerBIFrameWithRetry(pd20Page);
      const yearOption = frame.getByText('2025', { exact: true });
      await yearOption.waitFor({ state: 'visible', timeout: 15000 });
      await yearOption.click();

      frame = await getPowerBIFrameWithRetry(pd20Page);
      await waitForReportReady(frame);

      // Select Month slicer similarly
      const monthCombo = frame.getByRole('combobox', { name: 'CURRENT_MONTH' });
      await monthCombo.locator('i').click();

      frame = await getPowerBIFrameWithRetry(pd20Page);
      const monthOption = frame.getByText('October', { exact: false });
      await monthOption.waitFor({ state: 'visible', timeout: 15000 });
      await monthOption.click();

      frame = await getPowerBIFrameWithRetry(pd20Page);
      await waitForReportReady(frame);

      // Assert selected slicer values by visible text elements inside iframe
      const yearSelectedLocator = frame.locator('css=div[aria-label="CURRENT_YEAR"] span.selected-text, div[aria-label="CURRENT_YEAR"] .selected-value');
      const monthSelectedLocator = frame.locator('css=div[aria-label="CURRENT_MONTH"] span.selected-text, div[aria-label="CURRENT_MONTH"] .selected-value');

      await yearSelectedLocator.first().waitFor({ state: 'visible', timeout: 15000 });
      await monthSelectedLocator.first().waitFor({ state: 'visible', timeout: 15000 });

      const selectedYear = (await yearSelectedLocator.first().textContent())?.trim();
      const selectedMonth = (await monthSelectedLocator.first().textContent())?.trim();

      expect(selectedYear).toBe('2025');
      expect(selectedMonth).toBe('October');

      console.log(`Selected Year after setting: ${selectedYear}`);
      console.log(`Selected Month after setting: ${selectedMonth}`);

      // Navigate away via UI buttons and links
      await page.getByRole('button', { name: 'Aftersales' }).click();
      await page.getByRole('link', { name: 'Service Dashboard' }).click();
      await page.getByRole('button', { name: 'Resources' }).click();
      await page.getByRole('link', { name: 'Store Roster' }).click();

      // Navigate back to Sales Log
      await page.getByRole('button', { name: 'Sales', exact: true }).click();
      await page.getByRole('link', { name: 'Sales Log' }).click();

      await page.waitForLoadState('load');

      frame = await getPowerBIFrameWithRetry(pd20Page);
      await waitForReportReady(frame);

      await yearSelectedLocator.first().waitFor({ state: 'visible', timeout: 15000 });
      await monthSelectedLocator.first().waitFor({ state: 'visible', timeout: 15000 });

      const selectedYearAfterNav = (await yearSelectedLocator.first().textContent())?.trim();
      const selectedMonthAfterNav = (await monthSelectedLocator.first().textContent())?.trim();

      expect(selectedYearAfterNav).toBe('2025');
      expect(selectedMonthAfterNav).toBe('October');

      console.log(`Selected Year after navigation back: ${selectedYearAfterNav}`);
      console.log(`Selected Month after navigation back: ${selectedMonthAfterNav}`);

      console.log(`[${new Date().toISOString()}] Drill-through test passed successfully.`);

    } catch (error) {
      console.error(`[${new Date().toISOString()}] Test step failed: ${error.message}`);
      throw error;
    }
  });
});