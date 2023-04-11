// Denali Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { DenaliPortal } = require("./denaliPortal.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("Denali Portal - Page Elements @smoke", () => {
  test("Navigate to Denali Portal and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //validate expected text elements have loaded
    await denaliPortal.getPageHeader();
  });
});
