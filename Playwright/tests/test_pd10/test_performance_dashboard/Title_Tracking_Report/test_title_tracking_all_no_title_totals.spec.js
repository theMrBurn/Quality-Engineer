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

  test.slow();

  let titleTrackingLogin;
  let titleTracking;

  test.beforeEach(async ({ page }) => {
    titleTrackingLogin = new MainStoreLogin(page);
    titleTracking = new TitleTracking(page);
    await titleTrackingLogin.goto();
    await titleTrackingLogin.login();
    await titleTrackingLogin.twostepauthlogin();
  });

  test("Title Tracking", async function ({ page }) {
    try {
      // Helper function to load inventory and validate totals link
      const loadInventoryAndValidate = async (type) => {
        await titleTracking.goto();
        await titleTracking.loadInventory(type);

        const sumPageTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.total(),
        );
        await titleTracking.clickElement("getTotalHyperlink");
        await titleTracking.clickElement(`radioButtons.${type}`);
        const detailPageSum = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.detailPageTotal(),
        );
        titleTracking.compareTotals(
          sumPageTotal,
          detailPageSum,
          "Title Tracking Report - Sold No Title - Totals mismatch between summary and details page",
        );
      };

      await loadInventoryAndValidate("NewInv");
      await loadInventoryAndValidate("All");
      await loadInventoryAndValidate("UsedInv");
    } catch (error) {
      console.error("Test failed with error:", error.message);
    }
  });

  test("Title Tracking - All No Title- Validate store vehicle numbers", async function ({
    page,
  }) {
    try {
      // Helper function to validate store vehicle numbers
      const validateStoreVehicleNumbers = async (type) => {
        await titleTracking.goto();
        await titleTracking.loadInventory(type);

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
      };

      await validateStoreVehicleNumbers("All");
      await validateStoreVehicleNumbers("UsedInv");
      await validateStoreVehicleNumbers("NewInv");
    } catch (error) {
      console.error("Test failed with error:", error.message);
    }
  });

  test("Title Tracking - All No Title- Validate totals between Summary and Detail", async function ({
    page,
  }) {
    try {
      // Helper function to validate totals between Summary and Detail
      const validateTotalsBetweenSummaryAndDetail = async (type) => {
        await titleTracking.goto();
        await titleTracking.loadInventory(type);

        const sumPageTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.total(),
        );
        await titleTracking.clickElement("getTotalHyperlink");
        await titleTracking.clickElement(`radioButtons.${type}`);
        const detailPageSum = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.detailPageTotal(),
        );
        titleTracking.compareTotals(
          sumPageTotal,
          detailPageSum,
          "Title Tracking Report - Sold No Title - Totals mismatch between summary and details page",
        );
      };

      await titleTracking.validateBanner();

      await validateTotalsBetweenSummaryAndDetail("All");
      await validateTotalsBetweenSummaryAndDetail("UsedInv");
      await validateTotalsBetweenSummaryAndDetail("NewInv");
    } catch (error) {
      console.error("Test failed with error:", error.message);
    }
  });

  test.afterEach(async ({ context }) => {
    await context.close();
    console.log("Cleaning up after test");
  });
});
