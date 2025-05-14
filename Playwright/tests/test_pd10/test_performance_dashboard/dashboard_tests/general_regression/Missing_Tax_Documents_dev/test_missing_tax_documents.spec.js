// dependancies
const { test, expect } = require("@playwright/test");
const { TitleTracking } = require("./missing_tax_documents.js");

//test
test.describe.serial("/Missing_Tax_Documents_dev", () => {
  test("Missing Tax Document Navigation", async function ({ browser, page }) {
    const titletracking = new TitleTracking(page);

    await page.goto("/main/store");
    ///  page.getByText('Continue').click(); ETL DOWN ALERT
    await page.waitForLoadState("load");

    try {
      await titletracking.NavigateToOfficeMissingTaxDocument();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
