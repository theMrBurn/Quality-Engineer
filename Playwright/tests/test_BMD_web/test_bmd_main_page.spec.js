// BMD Web

// Import the required dependencies
const { browser, test, expect } = require("@playwright/test");
const { BMDMainPage } = require("./bmd_main_page.js");


test.describe
  .serial("Hello world for the BMD app tests", () => {
  test.slow();

  test("Hello World", async ({ browser, page }) => {
    const bmdMainPage = new BMDMainPage(page);
    await bmdMainPage.goto();

    try {
      await expect(page.locator('h4.MuiTypography-h4:first-child')).toContainText('Data Tables');
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
