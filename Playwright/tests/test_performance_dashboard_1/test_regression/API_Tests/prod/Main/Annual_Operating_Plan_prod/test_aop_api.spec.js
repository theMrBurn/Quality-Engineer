// dependancies
const { test, expect } = require("@playwright/test");
const { AOP } = require("./aop_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Annual_Operating_Plan_prod", () => {
   test("API tests for API tests for AOP Report", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const uvi = new AOP(page);
       // We can use these two methods in case if the storage state doesnt work
       await uvi.goto();
       await uvi.login();
       await uvi.twostepauthlogin();
       await uvi.ValidateAPIResponseAOP();
    });
});