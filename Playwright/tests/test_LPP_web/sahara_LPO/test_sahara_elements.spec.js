// Sahara LPO

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaLPO } = require("./sahara_LPO.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("Saraha Lein Payoff - Page Elements @smoke", () => {
  test("Navigate to Saraha Lein Payoff and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const saharaLPO = new SaharaLPO(page);
    await saharaLPO.goto();

    //validate expected page elements have loaded
    await saharaLPO.getPageHeader();
    await saharaLPO.getSearchBar();
    await saharaLPO.getGroupDropdown();
    await saharaLPO.getApprovedColumn();
    await saharaLPO.getIDColumn();
    await saharaLPO.getStoreNumberColumn();
    await saharaLPO.getCustomerColumn();
    await saharaLPO.getSalesStockNumColumn();
    await saharaLPO.getTradeVINColumn();
  });
});
