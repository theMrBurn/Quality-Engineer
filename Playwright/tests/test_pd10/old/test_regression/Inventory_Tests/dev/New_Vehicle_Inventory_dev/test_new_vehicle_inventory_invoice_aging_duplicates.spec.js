// dependancies
const { test, expect } = require("@playwright/test");
const {
  NewVehicleInventory,
} = require("./new_vehicle_inventory_invoice_aging_duplicates.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/New_Vehicle_Inventory_dev", () => {
  test("login to SPE", async function ({ browser, page }) {
    const newvehicleinventory = new NewVehicleInventory(page);

    // We can use these two methods in case if the storage state doesnt work
    await newvehicleinventory.goto();
    await newvehicleinventory.SelectStoresForRegression();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    //The below method is only used for conversion stores testing.
    //await newvehicleinventory.SelectStoresForConversion();
    await newvehicleinventory.ValidateDuplicateVIN();
    await newvehicleinventory.NavigateToSalesNewInventoryDetail();
    await newvehicleinventory.ValidateDuplicateStore();
  });
});
