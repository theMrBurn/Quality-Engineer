// Escalade CVP

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeDIMS } = require("./escalade_dims.js");

//test
test.describe.serial("Escalade DIMS - Page Elements @smoke", () => {
  test("Navigate to Escalade DIMS and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const escaladeDIMS = new EscaladeDIMS(page);
    await escaladeDIMS.goto();

    //validate expected text elements have loaded
    const locatorNames = ["pageHeader", "salesTab", "inventoryTab"];

    try {
      for (const locatorName of locatorNames) {
        await escaladeDIMS.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
