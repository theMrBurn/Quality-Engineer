// dependancies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./md_pt_pages.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/main_dashboard_performance_tracking_widget_prod", () => {
  test.fixme(
    "There is bug existing in Backlog for this, hence disabling teh test until the bug is fixed",
  );
  test("Performance Tracking Widget - Main Dashboard - Validate across three pages", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const iw = new InventoryWidget(page);
    // We can use these two methods in case if the storage state doesnt work
    await iw.goto();
    await iw.login();
    await iw.twostepauthlogin();
    await iw.SelectSToreForTHornhillHonda();
    console.log("Thornhill Honda");
    await iw.ValidateWithDetailUnits();
    await iw.goto();
    await iw.SelectStoreForFHCJDR();
    console.log("FH CDJR");
    await iw.ValidateWithDetailUnits();
    await iw.goto();
    await iw.SelectStoreForMarkhamBMW();
    console.log("Markham BMW");
    await iw.ValidateWithDetailUnits();
    // Activate the below tests to collect data
    /* await iw.goto();
         await iw.SelectStoresForDTLA();
         console.log("DT LA");
         await iw.ValidateWithDetailUnits();
         await iw.goto();
         await iw.SelectStoresForTroyHighLine();
         console.log(" Troy JLR");
         await iw.ValidateWithDetailUnits();
         */
  });
});
