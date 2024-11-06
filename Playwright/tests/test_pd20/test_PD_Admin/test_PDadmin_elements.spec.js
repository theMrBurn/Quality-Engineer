// PD 2.0 Admin App

// POMs have to live in the same directory as the test,
// for now we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependencies
const { test, expect } = require("@playwright/test");
const { PerfDashAdmin } = require("./adminPD.js");

test.describe
  .serial("Performance Dashboard 2.0 - Admin Page load @smoke", () => {
  // Runs before each test in the suite
  test.beforeEach(async ({ page }) => {
    console.log("Starting a new test...");
  });

  test("Navigate to Admin/ and validate Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const perfDashAdmin = new PerfDashAdmin(page);
    await perfDashAdmin.goto();

    const locatorNames = ["heading1", "kGridLocator", "deleteAdminButton"];

    try {
      for (const locatorName of locatorNames) {
        await perfDashAdmin.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test.beforeEach(async ({ page }) => {
    console.log("Starting a new test...");
  });

  test("Navigate to Admin/ and validate ENV is expressed accurately from YukonAppBarProps", async ({
    browser,
    page,
  }) => {
    const perfDashAdmin = new PerfDashAdmin(page);
    await perfDashAdmin.goto();

    // The YukonAppBarProps should show you the env you're operating in, if local dev, develop, test or UAT (prod if Prod of course, but we're not testing prod)
    const displayedENV = page.locator(
      'body > div > header > div > header > div > div.MuiBox-root.css-voneje > div.MuiBox-root.css-0 > div > div > p',
    );

    try {
      // Get the text content of the displayed environment
      const envText = await displayedENV.textContent();

      // Get the current URL
      const currentURL = page.url();
      let expectedENV = "";

      // Determine expected environment based on the URL
      if (currentURL.includes("localhost")) {
        expectedENV = "LOCAL";
      } else if (currentURL.includes("dev")) {
        expectedENV = "DEVELOP";
      } else if (currentURL.includes("uat")) {
        expectedENV = "UAT";
      } else {
        throw new Error(
          "The current URL does not match any expected environments.",
        );
      }

      // Compare the displayed environment with the expected environment
      expect(envText).toBe(expectedENV);

      // Log environments in case of an error
      console.log(`Displayed ENV: ${envText}`);
      console.log(`Expected ENV: ${expectedENV}`);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  // Runs after each test in the suite
  test.afterEach(async ({ page }) => {
    // Any teardown logic after each test can be added here
    // For example, you can clear cookies or reset the state
    console.log("Test completed.");
  });
});
