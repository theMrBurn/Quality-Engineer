// dependancies
const { test, expect } = require("@playwright/test");
const { StoreLeadershipReport } = require("./store_roster_report.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/store_roster_dev", () => {
  test("Validate Elements in the page", async function ({ browser, page }) {
    test.setTimeout(600000);
    const slr = new StoreLeadershipReport(page);
    // We can use these two methods in case if the storage state doesnt work
    await slr.goto();
    await slr.login();
    await slr.twostepauthlogin();
    await slr.NavigateToMainStoreRosterReport();
  });
});
