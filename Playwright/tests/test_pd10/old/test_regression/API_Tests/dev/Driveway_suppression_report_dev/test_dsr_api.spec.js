// dependancies
const { test, expect } = require("@playwright/test");
const { DSR } = require("./dsr_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Driveway_suppression_report_dev", () => {
  test("API tests for Driveway Suppression Report", async function ({
    browser,
    page,
  }) {
    test.setTimeout(600000);
    const uvi = new DSR(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvi.goto();
    await uvi.login();
    await uvi.twostepauthlogin();
    await uvi.ValidateAPIResponseDSR();
  });
});
