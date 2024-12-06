// dependancies
const { test, expect } = require("@playwright/test");
const { PurchaseLog } = require("./purchase_log_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Purchase_log_prod", () => {
  test("API tests for Purchase Log Summary And Detail", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const purchaseLog = new PurchaseLog(page);
    // We can use these two methods in case if the storage state doesnt work
    await purchaseLog.goto();
    await purchaseLog.login();
    await purchaseLog.twostepauthlogin();
    await purchaseLog.ValidateAPIResponsePLSummary();
    await purchaseLog.ValidateAPiResponsePLDetailForAStore();
  });
});
