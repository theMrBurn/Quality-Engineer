// dependancies
const { test, expect } = require("@playwright/test");
const { MEA } = require("./mea_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Month_End_Audit_dev", () => {
  test("API tests for Month End Audit Report", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const uvi = new MEA(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvi.goto();
    await uvi.login();
    await uvi.twostepauthlogin();
    await uvi.ValidateAPIResponseMEA();
  });
});
