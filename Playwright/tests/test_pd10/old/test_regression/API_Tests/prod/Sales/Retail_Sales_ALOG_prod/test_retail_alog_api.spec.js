// dependancies
const { test, expect } = require("@playwright/test");
const { RetailSalesAlog } = require("./retail_alog_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Retail_Sales_ALOG_prod", () => {
  test("API tests for Retail Sales Alog Summary And Detail", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const uvi = new RetailSalesAlog(page);
    // We can use these two methods in case if the storage state doesnt work
    await uvi.goto();
    await uvi.login();
    await uvi.twostepauthlogin();
    await uvi.ValidateAPIResponseRetailAlog();
    await uvi.ValidateAPiResponseDetailForAStore();
  });
});
