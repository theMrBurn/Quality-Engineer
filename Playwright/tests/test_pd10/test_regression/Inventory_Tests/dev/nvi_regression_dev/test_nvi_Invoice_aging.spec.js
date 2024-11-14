// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./nvi_invoice_aging.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/nvi_regression_dev", () => {
   test("login to SPE", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(600000);
       const newVehicleinventory = new NewVehicleInventory(page);
       // We can use these two methods in case if the storage state doesnt work
       await newVehicleinventory.goto();
       await newVehicleinventory.login();
       await newVehicleinventory.twostepauthlogin();
       await newVehicleinventory.NavigateToSalesNewInventoryDetail();
       await newVehicleinventory.validatePictureRule();
       await newVehicleinventory.ValidateStoreName();
       await newVehicleinventory.NavigateToSalesNewInventoryDetail1();
       await newVehicleinventory.ValidateInTransitColumn();
    });
});