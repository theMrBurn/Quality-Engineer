// dependancies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./regression.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/main_dashboard_prod", () => {
  test("Main Dashboard- Regression Bugs", async function ({ browser, page }) {
    test.setTimeout(600000);
    const iw = new InventoryWidget(page);
    // We can use these two methods in case if the storage state doesnt work
    await iw.goto();
    await iw.login();
    await iw.twostepauthlogin();
    // following method will be uncommentd when the bug 110897 is resolved
    /* await iw.ValidateOnGroundAge();
       await iw.goto();*/
    await iw.ValidateStorename();
    await iw.goto();
    await iw.ValidateEmpForDoralHyundaiStore();
  });
});
