const { test, expect } = require("@playwright/test");
const { RO } = require("./ro_report.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Repair_Order_Log_prod", () => {
  test("Navigate to RO Log Report", async function ({ browser, page }) {
    test.setTimeout(600000);
    const ro = new RO(page);
    await ro.goto();
    await ro.login();
    await ro.twostepauthlogin();
    await ro.NavigateToServiceROReport();
    await ro.ValidateDuplicateStore();
    await ro.SelectStoresForRegression();
    await ro.ValidatetheROData();
  });
});
