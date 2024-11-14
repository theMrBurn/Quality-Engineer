// dependancies
const { test, expect } = require("@playwright/test");
const { StaffingAnalysis } = require("./sa_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Staffing_Analysis_prod", () => {
   test("API tests for API tests for Staffing Analysis Report", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const uvi = new StaffingAnalysis(page);
       // We can use these two methods in case if the storage state doesnt work
       await uvi.goto();
       await uvi.login();
       await uvi.twostepauthlogin();
       await uvi.ValidateAPIResponseStaffingAnalysis();
    });
});