// dependencies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./annual_operating_plan.js");

// test
test.describe.serial("/annual_operating_plan_dev @func", () => {
  test("Navigate to Sales/Annual Operating Plan and validate Current year is available via dropdown", async function ({
    browser,
    page,
  }) {
    const mainStore = new MainStore(page);
    const currentYear = new Date().getFullYear(); // Get the current year

    console.log(`Starting the test for Annual Operating Plan...`);
    console.log(`Current Year determined: ${currentYear}`);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Click on Main Tab
      console.log(`Clicking on Main Tab...`);
      await mainStore.clickElement("getMainTab");

      // Click on Annual Operating Plan
      console.log(`Clicking on Annual Operating Plan...`);
      await mainStore.clickElement("getMainAnnualOperatingPlan");
      await page.waitForLoadState("networkidle");

      // Click on Dropdown
      console.log(`Clicking on Dropdown...`);
      await mainStore.clickElement("getDropdown");

      // Check if Current Year is available in the dropdown dynamically
      console.log(
        `Checking if Current Year (${currentYear}) is available in the dropdown...`,
      );
      await mainStore.checkIfYearIsAvailable(currentYear);
      console.log(
        `Current Year (${currentYear}) is available in the dropdown.`,
      );

      // Click on Current Year after confirming it is available
      console.log(`Clicking on Current Year (${currentYear})...`);
      await mainStore.clickElement("getCurrentYear");

      console.log(`Successfully selected Current Year (${currentYear}).`);
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
