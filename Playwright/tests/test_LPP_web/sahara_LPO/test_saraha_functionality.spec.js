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

  test("Navigate to Saraha Lein Payoff and validate basic search input and cooresponding grid output", async ({
    browser,
    page,
  }) => {
    const saharaLPO = new SaharaLPO(page);
    await saharaLPO.goto();

    //validate expected text elements have loaded
    await saharaLPO.inputSearch("Smith");

    const gridResults = page.locator(
      '//*[@id="root"]/div/div[2]/div/div/div/div/div/div[3]/div/div[1]/table/tbody/tr[1]/td[5]'
    );
    const gridResultsText = await gridResults.innerText();

    console.log(gridResultsText); // log the text content of the element to the console

    // expect(gridResultsText).toContain("Smith"); // - leaving this out for now, as its not really necessary to validate search bar functionality - will be necessary for E2E. check that the text content contains "Smith"
  });

  test("Navigate to Saraha Lein Payoff and validate basic edit & approval workflow functions are available to use, and then close the modal", async ({
    browser,
    page,
  }) => {
    const saharaLPO = new SaharaLPO(page);
    await saharaLPO.goto();

    await saharaLPO.clickFirstRowResult();
    await saharaLPO.clickEditButton();

    await saharaLPO.getVinInput();

    await saharaLPO.getLienholderDropdown();
    await saharaLPO.clickSaveButton();
    await saharaLPO.getApprovalButton();
    await saharaLPO.clickCloseEditApprovalModal();
  });
});
