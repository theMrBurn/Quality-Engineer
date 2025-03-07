// Performance Dashboard - Main Store

// dependencies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./mis_comparison_old.js");

// test
test.describe.serial("MIS Comparison - Functional Test @func", () => {
  test("Navigate to MIS Comparison Report - Validate basic functionality, once navigated to, is available", async function ({
    browser,
    page,
    request,
  }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Navigate to Main MIS Comparison
      await mainStore.clickElement("mainTab"); // Click on the Main Tab
      await mainStore.clickElement("mainMIS"); // Click on the Main MIS
      await mainStore.clickElement("mainMIScomp"); // Click on the MIS Comparison link
      await page.waitForLoadState("networkidle");
      await mainStore.checkElementVisibility("speLogo"); // Check that the SPE Logo is visible

      // Define the store selection actions
      const storeSelectionSteps = [
        { action: "storeSelector", description: "Click on the Store Selector" },
        { action: "getSelectStore2", description: "Select store 2 (ALASKA)" },
        {
          action: "getSelectStore3",
          description: "Select store 3 (CALIFORNIA)",
        },
        {
          action: "getSelectStoresButton",
          description: "Click the Store Selection button",
        },
        { action: "getSubmit", description: "Click Submit" },
      ];

      // Loop through the store selection steps and perform actions
      for (const step of storeSelectionSteps) {
        await mainStore.clickElement(step.action);
        console.log(step.description); // Log the step description
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
