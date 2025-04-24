const { test, expect } = require("@playwright/test");
const { MainStore } = require("./cash_ar_validation.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

test.describe.serial("/cash_and_ar_validation_dev @func", () => {
  test("Navigate to Cash and AR, validate report loads as expected", async function ({
    browser,
    page,
  }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      await page.goto("/Sub/AR.aspx");
      await mainStore.locators.getStoreReport().click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
