// dependancies
const { test, expect } = require("@playwright/test");
const { PurchaseLog } = require("./purchase_log_summary_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/purchase_log_dev", () => {
   test("Purchase Log - Summary -Totals Validation", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(600000);
       const pl = new PurchaseLog(page);
       // We can use these two methods in case if the storage state doesnt work
       await pl.goto();
       await pl.login();
       await pl.twostepauthlogin();
       await pl.NavigateToSalesPurchaseLogTradeIn();
       await pl.VerifyTotalVehicleTotal();
       await pl.TotalsvalidationSummaryVsDetail();
       
    });
});