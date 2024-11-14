// dependancies
const { test, expect } = require("@playwright/test");
const { StoreLeadershipReport } = require("./store_leadership_report.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/store_leadership_report_prod", () => {
   test("Validate Elements in the page", async function ({
       browser, 
       page,
     }) {
      test.setTimeout(700000);
       const slr = new StoreLeadershipReport(page);
       // We can use these two methods in case if the storage state doesnt work
       await slr.goto();
       await slr.login();
       await slr.twostepauthlogin();
       await slr.NavigateToMainStoreLeadershipReport();      
       await slr.ExportToExcel();
       await slr.ValidateGVPField();
       await slr.ValidateGMField();
       await slr.ValidateBMField();
       //await slr.ValidateAGMAndMGMFields();
    });
});