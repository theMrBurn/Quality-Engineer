// dependancies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./md_regression.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/deals_tracking_regression", () => {
  test.fixme("This test is not needed anymore");
  test("Performance Tracking Widget - Main Dashboard - Bug 133051 ", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const iw = new InventoryWidget(page);
    // We can use these two methods in case if the storage state doesnt work
    await iw.goto();
    await iw.login();
    await iw.twostepauthlogin();
    await iw.SelectStoreForMarkhamBMW();
    await iw.ValidateUnitsForMarkhamBMW();
    await iw.SelectStoreForNewMarketAudi();
    await iw.ValidateUnitsForNewMarketAudi();
  });
});
