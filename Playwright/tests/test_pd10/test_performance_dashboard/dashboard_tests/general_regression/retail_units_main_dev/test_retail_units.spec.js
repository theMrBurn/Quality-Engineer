// dependencies
const { test, expect } = require("@playwright/test");
const { RetailUnits } = require("./retail_units.js");

// user to be implemented in future, hence commenting it until future implementation.
// test.use({ storageState: "helpers/spe_auth_testenv.json" });

// test
test.describe.serial("/retail_units_main_dev", () => {
  test.slow();
  test("Store Name - Retail Units - Regression bugs", async function ({
    browser,
    page,
  }) {
    const retailunits = new RetailUnits(page);

    // Start by navigating to the main store page
    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Validate Store Name for New Retail Units
      await retailunits.locators.getNewRetailUnits().click(); // Click on New Vehicle Retail Units
      await page.waitForLoadState("networkidle");

      const storeNVI = await retailunits.locators.getStoreNVI(); // Get the locator for the store
      await storeNVI.click(); // Click on the store name
      await page.waitForLoadState("networkidle");

      const totalRows = await retailunits.locators.getTotalRows().count(); // Count total rows in the table
      for (let i = 1; i < totalRows - 2; i++) {
        const actualXpath = `//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`;
        await expect(page.locator(actualXpath)).toHaveText("ABC Hyundai"); // Validate store name
      }

      await retailunits.goto(); // Return to the main page

      // Validate Store Name for Used Retail Units
      await retailunits.locators.getUsedRetailUnits().click(); // Click on Used Vehicle Retail Units
      await page.waitForLoadState("networkidle");

      const storeUVI = await retailunits.locators.getStoreUVI(); // Get the locator for the store
      await storeUVI.click(); // Click on the store name
      await page.waitForLoadState("networkidle");

      const usedTotalRows = await retailunits.locators.getTotalRows().count(); // Count total rows in the table
      for (let i = 1; i < usedTotalRows - 2; i++) {
        const actualXpath = `//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`;
        await expect(page.locator(actualXpath)).not.toHaveText("test"); // Ensure it does not have text "test"
        await expect(page.locator(actualXpath)).toHaveText("ABC Hyundai"); // Validate store name
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
