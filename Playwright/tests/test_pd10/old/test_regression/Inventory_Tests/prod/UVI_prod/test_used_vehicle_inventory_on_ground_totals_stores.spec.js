// dependancies
const { test, expect } = require("@playwright/test");
const {
  UsedVehicleInventory,
} = require("./used_vehicle_inventory_on_ground_totals_stores.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/UVI_prod", () => {
  test("UVI - Total Rows", async function ({ browser, page }) {
    test.setTimeout(900000);
    const usedvehicleinventory = new UsedVehicleInventory(page);
    await usedvehicleinventory.goto();
    await usedvehicleinventory.login();
    await usedvehicleinventory.twostepauthlogin();
    await usedvehicleinventory.goto();
    await usedvehicleinventory.SelectStoresForRegression();
    await usedvehicleinventory.NavigateToSalesUsedInventoryDetail();
    await usedvehicleinventory.ValidateTotalsForAStore030Days();
    await usedvehicleinventory.ValidateTotalsForAStore3160Days();
    await usedvehicleinventory.ValidateTotalsForAStore6190Days();
    await usedvehicleinventory.ValidateTotalsForAStore91Days();
    await usedvehicleinventory.ValidateTotalsForAStoreTotal();
  });
});
