// dependancies
const { test, expect } = require("@playwright/test");
const { FI } = require("./md_mgr_performance.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/FI_mngr_performance_dev", () => {
  test("Manager performance - Main Dashboard ", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const iw = new FI(page);
    // We can use these two methods in case if the storage state doesnt work
    await iw.goto();
    await iw.login();
    await iw.twostepauthlogin();
    await iw.SelectTroyLandRover();
    await iw.ValidateTheUnits();
  });
});
