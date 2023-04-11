// Sahara LPO /lienpayoff

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaLPO } = require("./sahara_LPO.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("Saraha Lein Payoff - Functionality @func", () => {
  test("Navigate to Saraha Lein Payoff and validate basic functional elements are working as expected", async ({
    browser,
    page,
  }) => {
    const saharaLPO = new SaharaLPO(page);
    await saharaLPO.goto();

    //validate expected text elements have loaded
    await saharaLPO.clickGroupsDropdown();
    await page.getByRole("option", { name: "ALL GROUPS" }).click();
    await saharaLPO.clickResetFiltersButton();
  });
});
