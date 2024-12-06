// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./nvi_on_ground_picture_rule.js");
// new to be implemented in future, hence commenting it until future implementation.
//test.new{ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/uvi_regression_dev", () => {
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(600000);
    const newvehicleinventory = new NewVehicleInventory(page);
    // We can newthese two methods in case if the storage state doesnt work
    await newvehicleinventory.goto();
    await newvehicleinventory.login();
    await newvehicleinventory.twostepauthlogin();
    await newvehicleinventory.goto();
    await newvehicleinventory.SelectStoresForRegression();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.validatePictureRule();
  });
});
