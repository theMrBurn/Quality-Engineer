// Performance Dashboard - Loaner Summary

// dependencies
const { test, expect } = require("@playwright/test");
const { LoanerSummary } = require("./loaner_summary.js");

// test
test.describe.serial("/loaner_summary_dev", () => {
  test("Sales New Inventory - Loaner Summary", async function ({ page }) {
    const loanerSummary = new LoanerSummary(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Select stores for regression
      await page.waitForLoadState("networkidle");

      // Array of locators to click
      const storeSelectors = [
        loanerSummary.getStoreSelector.nth(2),
        loanerSummary.getAllselector,
        loanerSummary.getAllselector, // Clicking twice as per original code
        loanerSummary.getAlaska.nth(2),
        loanerSummary.getAnchorageCJD,
        loanerSummary.getCalifornia.nth(2),
        loanerSummary.getDTLAToyota,
        loanerSummary.getCanada.nth(2),
        loanerSummary.getThornhillHonda,
        loanerSummary.getFlorida.nth(2),
        loanerSummary.getTampaFord,
        loanerSummary.getMichigan1.nth(2),
        loanerSummary.getMichiganStore2,
      ];

      // Click each selector and handle the select button
      for (const selector of storeSelectors) {
        await selector.click();
      }

      await loanerSummary.getSelectButton.click();
      await loanerSummary.page.waitForLoadState("networkidle");

      // Navigate to Sales Loaner Vehicle Detail
      await loanerSummary.getSalesTab.click();
      await loanerSummary.getSalesNewVehicle.click();
      await loanerSummary.getSalesLoanerVehicleDetail.click();
      await loanerSummary.page.waitForLoadState("networkidle");
      await expect(loanerSummary.getSPELogo).toBeVisible();

      // Validate duplicate stores
      await loanerSummary.validateDuplicateStores();

      // Validate duplicate VINs
      await loanerSummary.validateDuplicateVINs();

      // Validate total count for each store
      await loanerSummary.validateTotalCountForEachStore();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
