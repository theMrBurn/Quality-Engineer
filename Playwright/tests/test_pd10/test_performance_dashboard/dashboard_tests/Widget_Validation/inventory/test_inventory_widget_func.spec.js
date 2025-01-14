// dependencies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./inventory_widget");
const {
  MainStoreLogin,
} = require("../../../../test_spe_dashboard_login/login_spe/main_store_login.js");

// test
test.describe.serial("/main_dashboard_inventory_widget_dev", () => {
  // test.fixme(
  //   "this test is failing due to the missing locators in the InventoryWidget class, might work if fixed",
  // );
  // Combined and optimized test for Inventory Widget - Main Dashboard and Airstream Regression bugs

  test("Inventory Widget and Airstream Regression combined test", async ({
    browser,
    page,
  }) => {
    // perform mandatory login
    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();
    await mainStoreLogin.login();
    await mainStoreLogin.twostepauthlogin();

    const inventoryWidget = new InventoryWidget(page);
    await inventoryWidget.goto();

    //await inventoryWidget.goto();

    try {
      // Tests for FarmingtonCDJR
      await inventoryWidget.selectStore("FarmingtonCDJR");
      await inventoryWidget.validateAllUnits();

      // Tests for CentennialStore
      await inventoryWidget.selectStore("CentinnialStore");
      await inventoryWidget.validateAllUnits();
    } catch (error) {
      console.error("Error during test:", error.message);

      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    } finally {
      await browser.close();
    }
  });
});
