// dependancies
const { test, expect } = require("@playwright/test");
const { UsedVehicleInventory } = require("./used_vehicle_inventory_on_ground_totals_stores.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Used_Vehicle_Inventory_dev", () => {
    test("UVI - Total Rows", async function ({
      browser, 
      page,
    }) {
       test.setTimeout(900000);
       const usedvehicleinventory = new UsedVehicleInventory(page);   
       await usedvehicleinventory.goto();
       await usedvehicleinventory.login();
       await usedvehicleinventory.twostepauthlogin();
       await usedvehicleinventory.goto();
       await usedvehicleinventory.SelectStoresForRegression();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();   
       //The below method is only used for conversion stores testing.
       //await newvehicleinventory.SelectStoresForConversion(); 
       await usedvehicleinventory.ValidateTotalsForAStore015Days();
       await usedvehicleinventory.ValidateTotalsForAStore1630Days();
       await usedvehicleinventory.ValidateTotalsForAStore3145Days();
       await usedvehicleinventory.ValidateTotalsForAStore4660Days();       
       await usedvehicleinventory.ValidateTotalsForAStore6175Days();
       await usedvehicleinventory.ValidateTotalsForAStore76Days();
       await usedvehicleinventory.ValidateTotalsForAStoreTotal();
    });
});