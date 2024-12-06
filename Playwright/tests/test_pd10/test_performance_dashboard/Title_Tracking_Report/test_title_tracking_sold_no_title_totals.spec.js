// dependencies
const { test, expect } = require("@playwright/test");
const {
  MainStoreLogin,
} = require("../../test_spe_dashboard_login/login_spe/main_store_login.js");
const { TitleTracking } = require("./title_tracking");

test.describe.serial("/title_tracking_prod", () => {
  test.fixme(
    "the fix is to gut these tests after establishing better flow and use cases",
  );

  let titleTrackingLogin;
  let titleTracking;

  test.beforeEach(async ({ page }) => {
    titleTrackingLogin = new MainStoreLogin(page);
    titleTracking = new TitleTracking(page);
    await titleTrackingLogin.goto();
    await titleTrackingLogin.login();
    await titleTrackingLogin.twostepauthlogin();
  });

  // Test case for basic title tracking
  test("Title Tracking", async function ({ page }) {
    try {
      // Navigate to the initial page and wait for network to be idle
      await titleTracking.goto();

      // Load and verify different inventory types
      const inventoryTypes = ["NewInv", "All", "UsedInv"];
      for (const type of inventoryTypes) {
        await titleTracking.loadInventory(type);
        await page.waitForLoadState("networkidle");

        const summaryValue = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.total(),
        );
        await titleTracking.clickElement("getTotalHyperlink");
        await titleTracking.clickElement(`radioButtons.${type}`);

        const detailValue = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.detailPageTotal(),
        );
        titleTracking.compareTotals(
          summaryValue,
          detailValue,
          "Title Tracking Report - Sold No Title - Totals mismatch between summary and details page",
        );
      }
    } catch (error) {
      console.log(`Error in Title Tracking test: ${error.message}`);
      throw error;
    }
  });

  // Test case to validate store vehicle numbers
  test("Title Tracking - Sold No Title - Validate store vehicle numbers", async function ({
    page,
  }) {
    try {
      await titleTracking.goto();

      const inventoryTypes = ["UsedInv", "NewInv", "UsedInv"];
      for (const type of inventoryTypes) {
        await titleTracking.loadInventory(type);
        await page.waitForLoadState("networkidle");

        const summaryTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.getStoreTotal(),
        );
        await titleTracking.clickElement("getStore");

        await titleTracking.clickElement(`radioButtons.${type}`);

        const detailTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.getStoreTotalDetail(),
        );
        titleTracking.compareTotals(
          summaryTotal,
          detailTotal,
          "Title Tracking Report - Sold No Title - Summary and Detail for a store mismatches",
        );
      }
    } catch (error) {
      console.log(
        `Error in Title Tracking - Sold No Title - Validate store vehicle numbers test: ${error.message}`,
      );
      throw error;
    }
  });

  // Test case to validate totals between summary and detail in current inventory
  test("Title Tracking - Sold No Title - Validate totals between Summary and Detail", async function ({
    page,
  }) {
    try {
      await titleTracking.goto();

      const inventoryTypes = ["NewInv", "All", "UsedInv"];
      for (const type of inventoryTypes) {
        await titleTracking.loadInventory(type);
        await page.waitForLoadState("networkidle");

        const summaryTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.total(),
        );
        await titleTracking.clickElement("getTotalHyperlink");
        await titleTracking.clickElement(`radioButtons.${type}`);
        const detailTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.detailPageTotal(),
        );
        titleTracking.compareTotals(
          summaryTotal,
          detailTotal,
          "Title Tracking Report - Sold No Title - Totals mismatch between summary and details page",
        );
      }
    } catch (error) {
      console.log(
        `Error in Title Tracking - Sold No Title - Validate totals between Summary and Detail test: ${error.message}`,
      );
      throw error;
    }
  });

  test.afterEach(async ({ context }) => {
    await context.close();
    console.log("Cleaning up after test");
  });
});
