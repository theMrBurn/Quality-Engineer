// dependencies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./main_dashboard.js");

// test
test.describe.serial("/main_dashboard_dev @func", () => {
  test("Inventory Widget - Main Dashboard - Filtered units validation", async function ({
    browser,
    page,
  }) {
    const iw = new InventoryWidget(page);
    // We can use these two methods in case if the storage state doesn't work
    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      await iw.SelectBryanCJDFiat();
      await iw.ValidatefilteredUnits();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
