// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactSearchPage } = require("./impact_builder_search.js");

//test
test.describe.serial("Impact Builder Search - Page Elements @smoke", () => {
  test("Navigate to Impact Builder Search and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactSearchPage = new ImpactSearchPage(page);
    await impactSearchPage.goto();

    //validate expected text elements have loaded
    const locatorNames = [
      "impactBuilderAnalysisHeader",
      "searchInput",
      "searchInputIcon",
      "applyButton",
      "removeFiltersButton",
      "newAnalysisButton",
      "searchResultsGrid",
    ];

    for (const locatorName of locatorNames) {
      await impactSearchPage.checkElementVisibility(locatorName);
    }
  });
});
