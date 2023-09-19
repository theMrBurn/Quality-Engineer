// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { AtlasWeb } = require("./atlas_web.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Dealership Listing and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const atlasWeb = new AtlasWeb(page);
    await atlasWeb.goto();

    const locatorNames = [
      "heading1",
      "heading2",
      "searchBar",
      "submitButton",
      "resetFiltersButton",
      "newButton",
    ];

    for (const locatorName of locatorNames) {
      await atlasWeb.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, click on first Dealership Listing and validate Plan Details Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const atlasWeb = new AtlasWeb(page);
    await atlasWeb.goto();

    await page.getByRole("gridcell", { name: "1", exact: true }).click();

    const locatorNames = [
      "heading1",
      "heading2",
      "searchBar",
      "submitButton",
      "resetFiltersButton",
      "newButton",
    ];

    for (const locatorName of locatorNames) {
      await atlasWeb.checkElementVisibility(locatorName);
    }
  });
});
