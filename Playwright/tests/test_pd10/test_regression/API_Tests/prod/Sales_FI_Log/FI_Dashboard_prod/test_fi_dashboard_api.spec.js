// dependancies
const { test, expect } = require("@playwright/test");
const { FI } = require("./fi_dashboard_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/FI_Dashboard_prod", () => {
   test("API tests for FI dashboard And Links under it", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const fi = new FI(page);
       // We can use these two methods in case if the storage state doesnt work
       await fi.goto();
       await fi.login();
       await fi.twostepauthlogin();
       await fi.ValidateAPIResponseFIDashboard();
       await fi.ValidateBankLogLink();
    });
});