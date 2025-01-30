// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./nvi_invoice_aging_ptm.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/New_Vehicle_Inventory_prod", () => {
  test("login to SPE", async function ({ browser, page }) {
    const newVehicleinventory = new NewVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await newVehicleinventory.goto();
    await newVehicleinventory.NavigateToSalesNewInventoryDetail();
    await newVehicleinventory.validatePTM();
  });
});
