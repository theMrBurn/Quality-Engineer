// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminStoreView } = require("./atlas_web.js");
const AtlasLogin = require("../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Dealership Listing and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    const locatorNames = [
      "heading1",
      "heading2",
      "searchBar",
      "submitButton",
      "resetFiltersButton",
      "newUnitsColumn",
      "usedUnitsColumn",
      "salesGrossColumn",
      "afterSalesGrossColumn",
      "storeNetColumn",
    ];

    try {
      for (const locatorName of locatorNames) {
        await adminStoreView.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
