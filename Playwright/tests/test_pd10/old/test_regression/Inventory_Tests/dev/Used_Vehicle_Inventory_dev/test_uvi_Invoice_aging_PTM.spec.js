// dependancies
const { test, expect } = require("@playwright/test");
const { UsedVehicleInventory } = require("./uvi_invoice_aging_ptm.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Used_Vehicle_Inventory_prod", () => {
  test.fixme("This test will be implemented later");
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(6000000);
    const usedVehicleinventory = new UsedVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await usedVehicleinventory.goto();
    await usedVehicleinventory.login();
    await usedVehicleinventory.twostepauthlogin();
    await usedVehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedVehicleinventory.validatePTM();
  });
});
