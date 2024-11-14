// dependancies
const { test, expect } = require("@playwright/test");
const { FILog } = require("./fi_log_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/FI_LOG_prod", () => {
   test("F&I log Total", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const filog = new FILog(page);
       // We can use these two methods in case if the storage state doesnt work
       await filog.goto();
       await filog.login();
       await filog.twostepauthlogin();
       await filog.NavigateToSalesFILog();       
       await filog.SelectAllStores();
       await filog.VerifyTotalVehicle();
       await filog.ValidateTotalCountForAStore();
       await filog.ValidateTotalCash();
       await filog.ValidateTotalFin();
       await filog.ValidateTotalCount();
    });
});