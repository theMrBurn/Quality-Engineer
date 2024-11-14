// dependancies
const { test, expect } = require("@playwright/test");
const { WholesaleAlog } = require("./wholesale_log_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/WholeSale_Log_Prod", () => {
   test("API tests for Wholesale Sales Alog Summary And Detail", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const uvi = new WholesaleAlog(page);
       // We can use these two methods in case if the storage state doesnt work
       await uvi.goto();
       await uvi.login();
       await uvi.twostepauthlogin();
       await uvi.ValidateAPIResponseWholesaleAlog();
       await uvi.ValidateAPiResponseDetailForAStore();
    });
});