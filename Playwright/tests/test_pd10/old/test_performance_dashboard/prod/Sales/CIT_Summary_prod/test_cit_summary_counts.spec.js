// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { CITSummary } = require("./cit_summary_counts.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/CIT_Summary_prod", () => {
  test.fixme("this module is not part of SPE Dashboard anymore");
  test("Sales - CIT Summary", async function ({ browser, page }) {
    test.setTimeout(600000);
    const citsummary = new CITSummary(page);
    await citsummary.goto();
    await citsummary.login();
    await citsummary.twostepauthlogin();
    await citsummary.goto();
    await citsummary.SelectStoresForRegression();
    await citsummary.NavigateToSalesCITSummary();
    await citsummary.ValidateCountinCITSummary();
    await citsummary.ValidateDataPresent();
    await citsummary.ValidateDuplicateStore();
    await citsummary.ValidateDuplicateVIN();
  });
});
