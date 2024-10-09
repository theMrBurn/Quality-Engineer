// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will parameterize the storageState with other .json for each userLogin, if necessary

// Dependencies
const { test, expect } = require("@playwright/test");
const { ImpactSearchPage } = require("./impact_builder_search.js");

// Test
test.describe.serial("Impact Builder - Search Page Elements @func", () => {
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

  test("Navigate to Impact Builder - Search, enter text, click Apply, validate Page elements have loaded as expected", async () => {
    try {
      // Perform the search
      await impactSearchPage.fillForm({ searchInput: "Medford Body Shop" });

      // Click the apply button to perform the search
      await impactSearchPage.clickElement("applyButton");

      // Get all rows in the grid
      const rows = await impactSearchPage.findGridRows(
        '[data-test="kendo-data-grid"]',
      );

      // Assert that there is exactly one row
      expect(rows.length).toBe(1);

      // Click on the grid cell with the name 'Medford Body Shop | Body'
      await page
        .getByRole("gridcell", { name: "(Medford Body Shop | Body" })
        .nth(1)
        .click();

      // Verify that the URL includes "/Reports/16"
      expect(page.url()).toContain("/Reports/27");

      // Fetch the text content of the element
      const searchResult = await page.textContent(
        '//*[@id="root"]/div/div[2]/div/div[1]/div/div/div[1]/span[2]/b',
      );

      // Assert that the element contains the expected text 'Medford Body Shop'
      expect(searchResult).toContain("Body Shop Advisor");
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Search, search for L0023 and validate search option Remove Filters works as expected", async () => {
    await impactSearchPage.goto();

    // Your existing test steps
    await page.getByLabel("Search").click();
    await page.getByLabel("Search").fill("L0023");
    await page.getByRole("button", { name: "Apply" }).click();
    await page.getByRole("button", { name: "Remove Filters" }).click();
  });

  test("Navigate to Impact Builder - Search, scroll to bottom, click to validate pagination options", async () => {
    try {
      await impactSearchPage.goto();

      // find NEXT pagination button and click
      await page.getByRole("link", { name: "" }).click();

      // Wait for the element to be visible
      const items = await page.getByRole("link", { name: "" });

      await expect(items).toBeVisible();

      // Validate the element text
      const textContent1Element = await page.locator(
        '//*[@id="root"]/div/div[2]/div/div/div[3]/div/div/div[3]/div[2]',
      );
      const textContent1 = await textContent1Element.textContent();

      const expectedTextPattern1 = /-\s*\d+\s*of\s*\d+\s*items/;
      await expect(textContent1).toMatch(expectedTextPattern1);

      // find BACK pagination button and click
      await page.getByRole("link", { name: "1", exact: true }).click();
      await page.waitForLoadState("networkidle");

      // Validate the pagination has returned to the first page as expected
      const textContent2Element = await page.locator(
        '//*[@id="root"]/div/div[2]/div/div/div[3]/div/div/div[3]/div[2]',
      );
      const textContent2 = await textContent2Element.textContent();

      const expectedTextPattern2 = /-\s*\d+\s*of\s*\d+\s*items/;
      await expect(textContent2).toMatch(expectedTextPattern2);
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });
});
