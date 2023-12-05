// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminStoreView } = require("./atlas_web.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Dealership Listing and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const adminStoreView = new AdminStoreView(page);
    await adminStoreView.goto();

    const locatorNames = [
      "heading1",
      "heading2",
      "searchBar",
      "submitButton",
      "resetFiltersButton",
      //"newButton",
    ];

    for (const locatorName of locatorNames) {
      await adminStoreView.checkElementVisibility(locatorName);
    }
  });
});
