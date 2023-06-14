// Denali Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { CameroDMM } = require("./camero_dmm.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe
  .serial("Camero Dealership Management Web - Page Elements @smoke", () => {
  test("Navigate to Dealership Management Web and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const cameroDMM = new CameroDMM(page);
    await cameroDMM.goto();

    //validate expected elements have loaded
    await cameroDMM.getPageHeader();
    // *** NOT AVAILABLE UNTIL RC w CHANGES MERGED TO TEST await cameroDMM.getActionColumn();
    await cameroDMM.getSelectFirstColumn();
    await cameroDMM.getStoreNumberColumn();
    await cameroDMM.getStoreNameColumn();
    await cameroDMM.getDealerIDColumn();
    await cameroDMM.getBankAccountColumn();
    await cameroDMM.getGroupColumn();

    await cameroDMM.getNewDealershipButton();
  });
});
