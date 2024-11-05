/// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const PerfDashAdmin = require("Playwright/tests/PD_2/test_PD_Admin/adminPD.js");

//test
test.describe.serial("Performance Dashboard - Admin App @smoke", () => {
  let page;
  let perfDashAdmin;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    perfDashAdmin = new PerfDashAdmin(page);
    await perfDashAdmin.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Admin App, upon page load, validate page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const perfDashAdmin = new PerfDashAdmin(page);
    await perfDashAdmin.goto();

    //upon page load, these page elements must be visible

    const locatorNames = ["perfDashMainHeader", "perfDashAdminKendoGrid"];
    
    try {
      for (const locatorName of locatorNames) {
        await perfDashAdmin.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
