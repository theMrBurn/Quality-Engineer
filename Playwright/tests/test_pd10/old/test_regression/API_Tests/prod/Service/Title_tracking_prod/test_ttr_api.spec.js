// dependancies
const { test, expect } = require("@playwright/test");
const { TTR } = require("./ttr_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Title_tracking_prod", () => {
  test("API tests for Title Tracking Report", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const ttr = new TTR(page);
    // We can use these two methods in case if the storage state doesnt work
    await ttr.goto();
    await ttr.login();
    await ttr.twostepauthlogin();
    await ttr.ValidateAPIResponseTTRDashboard();
    await ttr.ValidateAPIResponseForDetail();
  });
});
