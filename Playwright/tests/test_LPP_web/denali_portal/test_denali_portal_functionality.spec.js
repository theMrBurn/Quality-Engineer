// Denali Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { DenaliPortal } = require("./denaliPortal.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("Denali Portal - Functionality @func", () => {
  test("Navigate to Denali Portal and validate when LPO Launch is clicked, valid destination URL reached as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //click LPO Launch button, validate landing URL contains "/lienpayoff"
    await denaliPortal.clickLeinPayoffLaunch();
  });

  test("Navigate to Denali Portal and validate when Flooring Launch is clicked, valid destination URL reached as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //click LPO Launch button, validate landing URL contains "/lienpayoff"
    await denaliPortal.clickFlooringLaunch();
  });

  test("Navigate to Denali Portal and validate when Lienholder Management Launch is clicked, valid destination URL reached as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //click LPO Launch button, validate landing URL contains "/lienpayoff"
    await denaliPortal.clickLHMlaunch();
  });

  test("Navigate to Denali Portal and validate when Central Vehicle Processing Launch is clicked, valid destination URL reached as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //click LPO Launch button, validate landing URL contains "/lienpayoff"
    await denaliPortal.clickDIMSLaunch();
  });
});
