// Sahara LPO

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaNewLien } = require("./sahara_new_lein.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe
  .serial("Saraha Lein Payoff / NEW LIEN - Page Elements @smoke", () => {
  test("Navigate to Saraha New Lien and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const saharaNewLien = new SaharaNewLien(page);
    await saharaNewLien.goto();

    // validate expected page elements have loaded
    await saharaNewLien.getPageHeader();
    await saharaNewLien.getSecondaryHeader();
    await saharaNewLien.getThirdHeader();
    await saharaNewLien.getInputDealID();
    await saharaNewLien.getInputCustomerName();
    await saharaNewLien.getInputSalesStockNumber();
    await saharaNewLien.getInputSalesVIN();
    await saharaNewLien.getInputTradeStockNumber();
    await saharaNewLien.getInputTradeVIN();
    await saharaNewLien.getInputAccountNumberVIN();
    await saharaNewLien.getInputAdjustedPayoffAmount();
    await saharaNewLien.getInputMake();
    await saharaNewLien.getInputModel();
    await saharaNewLien.getInputYear();
    await saharaNewLien.getDropdownLPOAccountNum();
    await saharaNewLien.getStoreNumberDropdown();

    // validate Back Button url directs back to LP
    await saharaNewLien.getBackButton();
  });
});
