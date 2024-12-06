const { test, expect } = require("@playwright/test");
const { RapReport } = require("./rap_report.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/RAP_report_dev", () => {
  //NewReportsAdded - US103551
  test("Navigate to RAP Report", async function ({ browser, page }) {
    test.setTimeout(600000);
    const rapreport = new RapReport(page);
    await rapreport.goto();
    await rapreport.login();
    await rapreport.twostepauthlogin();
    await rapreport.SelectStoresForRegression();
    await rapreport.NavigateToServiceRAPReport();
    await rapreport.ValidateDuplicateStore();
    await rapreport.ValidatetheRAPReport();
  });
});
