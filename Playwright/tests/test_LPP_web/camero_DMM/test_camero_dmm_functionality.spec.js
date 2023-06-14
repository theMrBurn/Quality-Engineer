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
  .serial("Camero Dealership Management Web - Page Elements @func", () => {
  test("Navigate to Dealership Management Web and validate Input Search renders result, and reset filter", async ({
    browser,
    page,
  }) => {
    const cameroDMM = new CameroDMM(page);
    await cameroDMM.goto();

    await cameroDMM.inputSearch("Medford CDJ");
    await cameroDMM.clearFilter();
  });

  test("Navigate to Dealership Management Web and validate inner collumn filtering works for Store Name column.", async ({
    browser,
    page,
  }) => {
    const cameroDMM = new CameroDMM(page);
    await cameroDMM.goto();

    await cameroDMM.inputStoreNameFilter("TEST");
    await cameroDMM.clearFilter();
  });

  test("Navigate to Dealership Management Web and validate inner collumn filtering works for Store Number column.", async ({
    browser,
    page,
  }) => {
    const cameroDMM = new CameroDMM(page);
    await cameroDMM.goto();

    await cameroDMM.inputStoreNumberFilter("1701");
    await cameroDMM.clearFilter();
  });
});
