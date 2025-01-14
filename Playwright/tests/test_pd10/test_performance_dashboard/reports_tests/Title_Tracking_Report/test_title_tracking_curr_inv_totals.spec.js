// dependencies
const { test, expect } = require("@playwright/test");
const {
  MainStoreLogin,
} = require("../../../test_spe_dashboard_login/login_spe/main_store_login.js");
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
      await titleTracking.goto();
      const inventoryTypes = ["UsedInv", "All", "NewInv"];
      for (const type of inventoryTypes) {
        await titleTracking.loadInventory(type);
        await page.waitForLoadState("networkidle");
      }
    } catch (error) {
      console.log(`Error in Title Tracking test: ${error.message}`);
      throw error;
    }
  });

  test("Title Tracking Validate totals between Summary and Detail in Current Inv", async function ({
    page,
  }) {
    try {
      await titleTracking.goto();

      const validateTotalsBetweenSummaryAndDetail = async (type) => {
        await titleTracking.loadInventory(type);
        const sumPageTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.total(),
        );
        await titleTracking.clickElement(
          titleTracking.locators.getTotalHyperlink,
        );
        await titleTracking.clickElement(
          titleTracking.locators.radioButtons[type],
        );
        const detailPageSum = await titleTracking.getPageTotalValue(
          titleTracking.locators.summaryPageLocators.detailPageTotal(),
        );
        titleTracking.compareTotals(
          sumPageTotal,
          detailPageSum,
          "Title Tracking Report - Sold No Title - Totals mismatch between summary and details page",
        );
      };

      const inventoryTypes = ["UsedInv", "All", "NewInv"];
      for (const type of inventoryTypes) {
        await validateTotalsBetweenSummaryAndDetail(type);
      }
    } catch (error) {
      console.log(
        `Error in Validate totals between Summary and Detail in Current Inv test: ${error.message}`,
      );
      throw error;
    }
  });

  test("Title Tracking Validate store vehicle numbers", async function ({
    page,
  }) {
    try {
      await titleTracking.goto();

      const validateStoreVehicleNumbers = async (type) => {
        await titleTracking.loadInventory(type);
        const summaryTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.getStoreTotal(),
        );
        await titleTracking.clickElement(titleTracking.locators.getStore);
        await titleTracking.clickElement(
          titleTracking.locators.radioButtons[type],
        );
        const detailTotal = await titleTracking.getPageTotalValue(
          titleTracking.locators.getStoreTotalDetail(),
        );
        titleTracking.compareTotals(
          summaryTotal,
          detailTotal,
          "Title Tracking Report - Sold No Title - Summary and Detail for a store mismatches",
        );
      };

      const inventoryTypes = ["UsedInv", "NewInv"];
      for (const type of inventoryTypes) {
        await validateStoreVehicleNumbers(type);
      }
    } catch (error) {
      console.log(
        `Error in Validate store vehicle numbers test: ${error.message}`,
      );
      throw error;
    }
  });

  test.afterEach(async ({ context }) => {
    await context.close();
    console.log("Cleaning up after test");
  });
});
