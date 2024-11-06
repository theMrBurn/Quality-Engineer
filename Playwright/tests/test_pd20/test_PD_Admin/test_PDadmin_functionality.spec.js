// PD 2.0 Admin App

// POMs have to live in the same directory as the test,
// for now we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependencies
const { test, expect } = require("@playwright/test");
const { PerfDashAdmin } = require("./adminPD.js");

test.describe
  .serial("Performance Dashboard 2.0 - Admin Page load @func", () => {
  // Runs before each test in the suite
  test.beforeEach(async ({ page }) => {
    console.log("Starting a new test...");
  });

  test("Navigate to Admin/ and validate when Delete Clicked, functionality is as expected", async ({
    browser,
    page,
  }) => {
    const perfDashAdmin = new PerfDashAdmin(page);
    await perfDashAdmin.goto();

    try {
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  // Runs after each test in the suite
  test.afterEach(async ({ page }) => {
    // Any teardown logic after each test can be added here
    // For example, you can clear cookies or reset the state
    console.log("Test completed.");
  });
});
