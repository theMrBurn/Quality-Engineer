const { test, expect } = require("@playwright/test");
const { flatratehrsReport } = require("./flat_rate_hrs_report.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/flat_rate_hrs_report_dev", () => {
  //NewReportsAdded - US103551
  test("Navigate to Flat Rate Hrs Report", async function ({ browser, page }) {
    test.setTimeout(300000);
    const flatratehrsreport = new flatratehrsReport(page);
    await flatratehrsreport.goto();
    await flatratehrsreport.login();
    await flatratehrsreport.twostepauthlogin();
    await flatratehrsreport.SelectStoresForRegression();
    await flatratehrsreport.NavigateToServiceFRHReport();
    await flatratehrsreport.ValidateDuplicateStore();
  });
});
