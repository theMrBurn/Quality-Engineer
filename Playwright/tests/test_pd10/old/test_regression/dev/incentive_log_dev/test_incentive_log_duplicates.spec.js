// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./incentive_log_duplicates.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/incentive_log_dev", () => {
  test("Incentive Log", async function ({ browser, page }) {
    test.setTimeout(900000);
    const newvehicleinventory = new NewVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await newvehicleinventory.goto();
    await newvehicleinventory.login();
    await newvehicleinventory.twostepauthlogin();
    await newvehicleinventory.goto();
    await newvehicleinventory.SelectStoresForRegression();
    await newvehicleinventory.NavigateToSalesIncentiveLog();
    await newvehicleinventory.ValidateDuplicateVIN();
    await newvehicleinventory.ValidateDuplicateStock();
  });
});
