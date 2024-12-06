// dependancies
const { test, expect } = require("@playwright/test");
const { WholesaleAlog } = require("./wholesale_alog_totals_store_duplicate.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Wholesale_Sales_ALOG_prod", () => {
  test("Wholesale Alog Total", async function ({ browser, page }) {
    test.setTimeout(900000);
    const wholesalealog = new WholesaleAlog(page);
    // We can use these two methods in case if the storage state doesnt work
    await wholesalealog.goto();
    await wholesalealog.login();
    await wholesalealog.twostepauthlogin();
    await wholesalealog.SelectStoresForRegression();
    await wholesalealog.NavigateToSalesWholesaleLogALOG();
    await wholesalealog.ValidateDuplicateStore();
    await wholesalealog.ValidateDuplicateStock();
  });
});
