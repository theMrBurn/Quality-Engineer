// dependancies
const { test, expect } = require("@playwright/test");
const {
  UsedVehicleInventory,
} = require("./used_vehicle_inventory_on_ground_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Used_Vehicle_Inventory_dev", () => {
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(900000);
    const usedvehicleinventory = new UsedVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await usedvehicleinventory.goto();
    await usedvehicleinventory.login();
    await usedvehicleinventory.twostepauthlogin();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.ValidateDaySupply();
    await usedvehicleinventory.VerifyTotalVehicleInTransit();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.VerifyTotalVehicle015Days();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.VerifyTotalVehicle1630Days();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.VerifyTotalVehicle3145Days();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.VerifyTotalVehicle4660Days();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.VerifyTotalVehicle6175Days();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.VerifyTotalVehicle76Days();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.VerifyTotalVehicleTotal();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.verifyTotalBetWeenSummaryandDetailPage();
  });
});
