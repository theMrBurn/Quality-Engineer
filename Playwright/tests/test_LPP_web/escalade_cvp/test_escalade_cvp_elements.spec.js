// Escalade CVP

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeCVP } = require("./escalade_CVP.js");

//test
test.describe.serial("Escalade CVP - Page Elements @smoke", () => {
  test("Navigate to Escalade CVP and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    //validate expected text elements have loaded
    const locatorNames = ["pageHeader", "salesTab", "inventoryTab", "vdtTab"];

    for (const locatorName of locatorNames) {
      await escaladeCVP.checkElementVisibility(locatorName);
    }
  });
});
