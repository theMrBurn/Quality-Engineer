// dependancies
const { test, expect } = require("@playwright/test");
const { TitleTracking } = require("./title_tracking_curr_inv_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/title_tracking_dev", () => {
  test("Title Tracking", async function ({ browser, page }) {
    test.setTimeout(900000);
    const titletracking = new TitleTracking(page);
    // We can use these two methods in case if the storage state doesnt work
    await titletracking.goto();
    await titletracking.login();
    await titletracking.twostepauthlogin();
    await titletracking.goto();
    await titletracking.LoadNewInv();
    await titletracking.VerifyTotalNoTitleVehicle();
    await titletracking.goto();
    await titletracking.LoadAllInventory();
    await titletracking.VerifyTotalNoTitleVehicle();
    await titletracking.goto();
    await titletracking.LoadUsedInv();
    await titletracking.VerifyTotalNoTitleVehicle();
  });
  test("Title Tracking Validate totals between Summary and Detail in Current Inv", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const titletracking = new TitleTracking(page);
    // We can use these two methods in case if the storage state doesnt work
    await titletracking.goto();
    await titletracking.login();
    await titletracking.twostepauthlogin();
    await titletracking.goto();
    await titletracking.LoadNewInv();
    await titletracking.ValidateTotalslink();
    await titletracking.goto();
    await titletracking.LoadAllInventory();
    await titletracking.ValidateTotalslink();
    await titletracking.goto();
    await titletracking.LoadUsedInv();
    await titletracking.ValidateTotalslink();
  });
  test("Title Tracking Validate store vehicle numbers", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const titletracking = new TitleTracking(page);
    // We can use the commented methods when more data is available around new inventory
    await titletracking.goto();
    await titletracking.login();
    await titletracking.twostepauthlogin();
    await titletracking.goto();
    await titletracking.LoadAllInventory();
    await titletracking.ValidateDetailAndSummaryForSelectedStore();
    await titletracking.goto();
    await titletracking.LoadUsedInv();
    await titletracking.ValidateDetailAndSummaryForSelectedStore();
    await titletracking.goto();
    await titletracking.LoadNewInv();
    await titletracking.ValidateDetailAndSummaryForSelectedStore();
  });
});
