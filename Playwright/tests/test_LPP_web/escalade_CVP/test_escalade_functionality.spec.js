// Escalade CVP

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeCVP } = require("./escalade_CVP.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe
  .serial("Escalade Centralized Vehicle Processing - Page Functionality @func", () => {
  test("Navigate to Escalade Centralized Vehicle Processing and validate Page element functionality", async ({
    browser,
    page,
  }) => {
    const escaladeCVP = new EscaladeCVP(page);
    await escaladeCVP.goto();

    //validate When clicked, the help and support Link lands where we expect
    await escaladeCVP.clickHelpSupportLink();

    //validate when clicked, the user guide link lands where we expect
    await escaladeCVP.clickUserGuideLink();
  });
});
