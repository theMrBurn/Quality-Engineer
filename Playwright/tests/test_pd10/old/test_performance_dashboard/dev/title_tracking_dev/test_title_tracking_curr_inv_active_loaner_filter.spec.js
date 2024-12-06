// dependancies
const { test, expect } = require("@playwright/test");
const {
  TitleTracking,
} = require("./title_tracking_curr_inv_active_loaner_filter.js");
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
    await titletracking.validateVIN();
  });
});
