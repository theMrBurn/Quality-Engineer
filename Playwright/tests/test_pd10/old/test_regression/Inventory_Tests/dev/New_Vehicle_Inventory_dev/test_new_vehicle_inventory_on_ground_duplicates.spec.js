// dependancies
const { test, expect } = require("@playwright/test");
const {
  NewVehicleInventory,
} = require("./new_vehicle_inventory_on_ground_duplicates.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/New_Vehicle_Inventory_dev", () => {
  test("login to SPE", async function ({ browser, page }) {
    await newvehicleinventory.goto();
    await newvehicleinventory.SelectStoresForRegression();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    //The below method is only used for conversion stores testing.
    //await newvehicleinventory.SelectStoresForConversion();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.ValidateDuplicateVIN();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.ValidateDuplicateStore();
  });
});
