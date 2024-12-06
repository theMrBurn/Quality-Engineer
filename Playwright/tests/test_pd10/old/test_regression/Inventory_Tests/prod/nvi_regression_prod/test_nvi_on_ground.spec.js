// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./nvi_on_ground.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/nvi_regression_prod", () => {
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(600000);
    const newvehicleinventory = new NewVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await newvehicleinventory.goto();
    await newvehicleinventory.login();
    await newvehicleinventory.twostepauthlogin();
    await newvehicleinventory.goto();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.validatePictureRule();
    await newvehicleinventory.ValidateStoreName();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail1();
    await newvehicleinventory.ValidateInTransitColumn();
  });
});
