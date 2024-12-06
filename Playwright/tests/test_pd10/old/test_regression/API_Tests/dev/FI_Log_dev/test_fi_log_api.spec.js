// dependancies
const { test, expect } = require("@playwright/test");
const { FILog } = require("./fi_log_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/FI_Log_dev", () => {
  test("API tests for Fi Log  Report", async function ({ browser, page }) {
    test.setTimeout(900000);
    const uvi = new FILog(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvi.goto();
    await uvi.login();
    await uvi.twostepauthlogin();
    await uvi.ValidateAPIResponseFILog();
  });
});
