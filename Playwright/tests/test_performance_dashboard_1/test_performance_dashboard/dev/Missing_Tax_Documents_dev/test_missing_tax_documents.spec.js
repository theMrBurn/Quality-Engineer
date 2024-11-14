// dependancies
const { test, expect } = require("@playwright/test");
const { TitleTracking } = require("./missing_tax_documents.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Missing_Tax_Documents_dev", () => {
  test("MIssing Tax Document Navigation", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(600000);
       const titletracking = new TitleTracking(page);
       // We can use these two methods in case if the storage state doesnt work
       await titletracking.goto();
       await titletracking.login();
       await titletracking.twostepauthlogin();
       await titletracking.NavigateToOfficeMissingTaxDocument();
    });
   });