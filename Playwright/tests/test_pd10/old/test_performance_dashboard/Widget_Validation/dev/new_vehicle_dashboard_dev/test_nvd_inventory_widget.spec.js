// dependancies
const { test, expect } = require("@playwright/test");
const { NVD } = require("./nvd_inventory_widget.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/new_vehicle_dashboard_dev", () => {
  test("booked and pending ", async function ({ browser, page }) {
    test.setTimeout(600000);
    const nvd = new NVD(page);
    // We can use these two methods in case if the storage state doesnt work
    await nvd.goto();
    await nvd.login();
    await nvd.twostepauthlogin();
    await nvd.SelectStoresForRegression();
    await nvd.NavigateToSalesNewVehicleDashboard();
    await nvd.ValidateUnits();
  });
});
