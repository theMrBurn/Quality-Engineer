// dependancies
const { test, expect } = require("@playwright/test");
const { UsedVehicleInventory } = require("./uvi_on_ground_picture_rule.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/uvi_regression_dev", () => {
   test("login to SPE", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const usedvehicleinventory = new UsedVehicleInventory(page);
       // We can use these two methods in case if the storage state doesnt work
       await usedvehicleinventory.goto();
       await usedvehicleinventory.login();
       await usedvehicleinventory.twostepauthlogin();
       await usedvehicleinventory.goto();
       await usedvehicleinventory.SelectStoresForRegression();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
       await usedvehicleinventory.validatePictureRule();
    });
});