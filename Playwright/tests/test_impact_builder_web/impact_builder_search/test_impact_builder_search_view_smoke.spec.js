// Dependencies
const { test } = require("@playwright/test");
const { ImpactSearchPage } = require("./impact_builder_search.js");

// Test
test.describe.serial("Impact Builder Search - Page Elements @smoke", () => {
  let page;
  let impactSearchPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    impactSearchPage = new ImpactSearchPage(page);
    await impactSearchPage.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Impact Builder Search and validate Page elements have loaded as expected", async () => {
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
