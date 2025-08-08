// BMD Web

// Import the required dependencies
const { browser, test, expect } = require("@playwright/test");
const { BMDMainPage } = require("./bmd_main_page.js");
const { BMDTableDetailsPage } = require("./bmd_table_details_page.js");


test.describe
  .serial("Navigation tests between BMD pages", () => {
  test.slow();

  test("Navigation to and from Table Details page", async ({ browser, page }) => {
    const testTableId = "BMD_BENCHMARKS";
    const testTableName = "Benchmarks";

    const bmdMainPage = new BMDMainPage(page);
    const bmdDetailsPage = new BMDTableDetailsPage(page, testTableId);
    await bmdMainPage.goto();

    try {

      const tableLink = page.locator(`[data-id=${testTableId}] a`);

      await expect(tableLink).toBeVisible();
      await tableLink.click();

      await bmdDetailsPage.checkElementVisibility("tableName");

      await bmdDetailsPage.clickElement("backToMainPageButton");

      await bmdMainPage.checkElementVisibility("mainTitle");      

    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

});

