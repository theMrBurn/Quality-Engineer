// dependancies
const { test, expect } = require("@playwright/test");
const { CITSummary } = require("./cit_summary_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/cit_summary_dev", () => {
  test("API tests for CIT Summary And Detail", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const uvi = new CITSummary(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvi.goto();
    await uvi.login();
    await uvi.twostepauthlogin();
    await uvi.ValidateAPIResponseCITSummary();
    await uvi.ValidateAPiResponseDetailForAStore();
  });
});
