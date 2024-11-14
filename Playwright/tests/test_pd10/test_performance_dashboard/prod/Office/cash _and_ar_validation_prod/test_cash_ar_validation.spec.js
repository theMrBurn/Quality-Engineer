const { test, expect } = require("@playwright/test");
const { MainStore } = require("./cash_ar_validation.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

test.describe.serial("/cash_and_ar_validation_prod", () => {
       test("Navigate to Cash and AR Validation", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(600000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToOfficeCashARValidation();
      });
});
