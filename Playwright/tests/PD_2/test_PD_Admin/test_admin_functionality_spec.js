/// PD 2.0 Admin App

// dependancies
const { test, expect } = require("@playwright/test");
const PerfDashAdmin = require("Playwright/tests/PD_2/test_PD_Admin/adminPD.js");

//test
test.describe.serial("Performance Dashboard - Admin App @func", () => {
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

  test("Navigate to PD2.0 /Admin and validate Delete Button Functionality", async ({
    browser,
    page,
  }) => {
    const perfDashAdmin = new PerfDashAdmin(page);
    await perfDashAdmin.goto();

    await page.waitForLoadState("domcontentloaded");

    try {

      await perfDashAdmin.clickElement("deleteAdminButton");

    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});