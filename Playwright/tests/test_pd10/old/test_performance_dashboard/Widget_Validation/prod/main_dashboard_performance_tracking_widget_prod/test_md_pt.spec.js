// dependancies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./md_pt.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/main_dashboard_performance_tracking_widget_prod", () => {
  test("Performance Tracking Widget - Main Dashboard ", async function ({
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
    await iw.ValidateTheUnits();
    await iw.goto();
    await iw.SelectStoreForFHCJDR();
    console.log("FH CDJR");
    await iw.ValidateTheUnits();
    await iw.goto();
    await iw.SelectStoreForMarkhamBMW();
    console.log("Markham BMW");
    await iw.ValidateTheUnits();
    // Activate the below tests to collect data
    /*await iw.goto();
       await iw.SelectStoresForDTLA();
       console.log("DT LA");
       await iw.ValidateTheUnits();
       await iw.goto();
       await iw.SelectStoresForTroyHighLine();
       console.log(" Troy JLR");
       await iw.ValidateTheUnits();*/
  });
});
