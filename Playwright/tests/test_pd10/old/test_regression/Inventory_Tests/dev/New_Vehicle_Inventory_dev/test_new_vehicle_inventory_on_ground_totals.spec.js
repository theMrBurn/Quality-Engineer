// dependancies
const { test, expect } = require("@playwright/test");
const {
  NewVehicleInventory,
} = require("./new_vehicle_inventory_on_ground_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/New_Vehicle_Inventory_dev", () => {
  test("login to SPE", async function ({ browser, page }) {
    const newvehicleinventory = new NewVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await newvehicleinventory.goto();

    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.ValidateDaySupply();
    await newvehicleinventory.VerifyTotalVehicleInTransit();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.VerifyTotalVehicle030Days();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.VerifyTotalVehicle3160Days();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.VerifyTotalVehicle6190Days();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.VerifyTotalVehicle91Days();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.VerifyTotalVehicleTotal();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.verifyTotalBetWeenSummaryandDetailPage();
  });
});
