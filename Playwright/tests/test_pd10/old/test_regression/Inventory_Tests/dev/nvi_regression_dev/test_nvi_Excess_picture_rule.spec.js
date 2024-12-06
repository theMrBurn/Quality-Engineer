// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./nvi_excess_picture_rule.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/nvi_regression_dev", () => {
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(600000);
    const newinventory = new NewVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await newinventory.goto();
    await newinventory.login();
    await newinventory.twostepauthlogin();
    await newinventory.goto();
    await newinventory.SelectStoresForRegression();
    await newinventory.NavigateToSalesNewInventoryDetail();
    await newinventory.validatePictureRule();
  });
});
