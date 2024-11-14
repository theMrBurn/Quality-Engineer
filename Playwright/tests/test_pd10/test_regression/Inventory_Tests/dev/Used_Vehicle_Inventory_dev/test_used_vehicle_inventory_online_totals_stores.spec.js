// dependancies
const { test, expect } = require("@playwright/test");
const { UsedVehicleInventory } = require("./used_vehicle_inventory_online_stores.js");
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
       await usedvehicleinventory.ValidateTotalsForAStoreOnlineCount();
       await usedvehicleinventory.ValidateTotalsForAStore0Pics();
       await usedvehicleinventory.ValidateTotalsForAStore1021Pics();
       await usedvehicleinventory.ValidateTotalsForAStore19Pics();
       await usedvehicleinventory.ValidateTotalsForAStore21Pics();
    });
});