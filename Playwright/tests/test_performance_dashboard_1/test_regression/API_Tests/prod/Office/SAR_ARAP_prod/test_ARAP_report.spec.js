// dependancies
const { test, expect } = require("@playwright/test");
const { ARAP } = require("./ARAP_report.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/SAR_ARAP_prod", () => {
  test.fixme("this module is not part of SPE Dashboard anymore");
   test("API tests for ARAPReport", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const uvi = new ARAP(page);
       // We can use these two methods in case if the storage state doesnt work
       await uvi.goto();
       await uvi.login();
       await uvi.twostepauthlogin();
       await uvi.ValidateAPIResponseARAP();
    });
});