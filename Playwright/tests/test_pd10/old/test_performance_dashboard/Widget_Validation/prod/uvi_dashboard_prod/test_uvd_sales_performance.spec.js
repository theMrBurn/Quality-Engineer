// dependancies
const { test, expect } = require("@playwright/test");
const { UVD } = require("./uvd_sales_performance.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/uvi_dashboard_prod", () => {
  test("Used Vehicle Dashboard- Sales Vehicle Performance Widget - Actual and Pacing Validations", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const uvd = new UVD(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvd.goto();
    await uvd.login();
    await uvd.twostepauthlogin();
    //await uvd.Banner();
    await uvd.SelectStoresForRegression();
    await uvd.NavigateToSalesUsedVehicleDashboard();
    await uvd.ValidateUnitsForAnchorageCJD();
    await uvd.ValidateUnitsForDTLA();
    await uvd.ValidateUnitsForFHCDJR();
  });
});
