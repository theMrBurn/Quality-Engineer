// Denali Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { CameroDMM } = require("./camero_dmm.js");

//test
test.describe
  .serial("Camero Dealership Management Web - Page Elements @smoke", () => {
  test("Navigate to Dealership Management Web and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const cameroDMM = new CameroDMM(page);
    await cameroDMM.goto();

    const locatorNames = [
      "pageheader",
      "searchInput",
      "filterReset",
      "newDealershipButton",
      "selectFirstColumn",
      "storeNumberColumn",
      "storeNameColumn",
      "dealerIDColumn",
      "bankAccountColumn",
      "groupColumn",
    ];

    for (const locatorName of locatorNames) {
      await cameroDMM.checkElementVisibility(locatorName);
    }
  });
});
