// Sahara LPO

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeCVP } = require("./escalade_CVP.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("Escalade CVP - Page Elements @smoke", () => {
  test("Navigate to Escalade CVP and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    // validate expected page elements have loaded
    await escaladeCVP.getPageHeader();
    await escaladeCVP.getSalesTab();
    await escaladeCVP.getInventoryTab();
    await escaladeCVP.clickVDTTab();
  });
});
