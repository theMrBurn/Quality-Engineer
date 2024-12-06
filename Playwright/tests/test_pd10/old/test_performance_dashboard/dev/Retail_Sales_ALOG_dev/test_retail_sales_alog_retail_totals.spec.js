// dependancies
const { test, expect } = require("@playwright/test");
const { RetailSalesAlog } = require("./retail_sales_alog_retail_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Retail_Sales_ALOG_dev", () => {
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(600000);
    const retailsalesalog = new RetailSalesAlog(page);
    // We can use these two methods in case if the storage state doesnt work
    await retailsalesalog.goto();
    await retailsalesalog.login();
    await retailsalesalog.twostepauthlogin();
    await retailsalesalog.NavigateToSalesRetailSalesLogALOG();
    await retailsalesalog.VerifyTotalVehicle();
  });
});
