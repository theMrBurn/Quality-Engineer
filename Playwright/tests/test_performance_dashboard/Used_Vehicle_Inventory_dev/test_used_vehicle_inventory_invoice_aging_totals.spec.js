// dependancies
const { test, expect } = require("@playwright/test");
const { UsedVehicleInventory } = require("./used_vehicle_inventory_invoice_aging_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Used_Vehicle_Inventory_dev", () => {
   test("login to SPE", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(6000000);
       const usedvehicleinventory = new UsedVehicleInventory(page);
       // We can use these two methods in case if the storage state doesnt work
       await usedvehicleinventory.goto();
       await usedvehicleinventory.login();
       await usedvehicleinventory.twostepauthlogin();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
       await usedvehicleinventory.VerifyTotalVehicle030Days();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
       await usedvehicleinventory.VerifyTotalVehicle3160Days();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
       await usedvehicleinventory.VerifyTotalVehicle6190Days();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
       await usedvehicleinventory.VerifyTotalVehicle91Days();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
       await usedvehicleinventory.VerifyTotalVehicleTotal();
       await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
       await usedvehicleinventory.verifyTotalBetWeenSummaryandDetailPage();
    });
});