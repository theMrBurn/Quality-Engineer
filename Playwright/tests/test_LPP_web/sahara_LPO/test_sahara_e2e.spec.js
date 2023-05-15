// Sahara LPO /lienpayoff

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaLPO } = require("./sahara_LPO.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("Saraha Lein Payoff - Functionality @e2e", () => {
  test("Navigate to Saraha Lein Payoff and validate basic edit & approval workflow functions, as well as unapproving the approval", async ({
    browser,
    page,
  }) => {
    const saharaLPO = new SaharaLPO(page);
    await saharaLPO.goto();

    await saharaLPO.clickFirstRowResult();
    await saharaLPO.clickEditButton();

    await saharaLPO.inputVinNumber("123456789zxtvg");

    await saharaLPO.clickLienholdersDropdown();
    await page.getByRole("option", { name: "FTB - 5TH/3RD BANK" }).click();

    await saharaLPO.clickSaveButton();
    await saharaLPO.clickApprovalButton();

    // now unapprove the approval that just happened
    await saharaLPO.clickUnapproveButton();
    await saharaLPO.clickCloseEditApprovalModal();
  });
});
