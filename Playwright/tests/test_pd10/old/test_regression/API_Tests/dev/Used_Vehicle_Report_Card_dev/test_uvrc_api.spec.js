// dependancies
const { test, expect } = require("@playwright/test");
const { UVRC } = require("./uvrc_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Used_Vehicle_Report_Card_dev", () => {
  test("API tests for API tests for Used Vehicle Report Card", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const uvi = new UVRC(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvi.goto();
    await uvi.login();
    await uvi.twostepauthlogin();
    await uvi.ValidateAPIResponseUVRC();
  });
});
