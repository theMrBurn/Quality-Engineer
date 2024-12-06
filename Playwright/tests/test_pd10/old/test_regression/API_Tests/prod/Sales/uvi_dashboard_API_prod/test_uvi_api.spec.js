// dependancies
const { test, expect } = require("@playwright/test");
const { UVI } = require("./uvi_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/uvi_dashboard_API_prod", () => {
  test("API tests for uvi dashboard And Links under it", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const uvi = new UVI(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvi.goto();
    await uvi.login();
    await uvi.twostepauthlogin();
    await uvi.ValidateAPIResponseUVIDashboard();
    await uvi.ValidateInnerLinks();
  });
});
