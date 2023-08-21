// Saraha Lienholder Management Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaLHMweb } = require("./sahara_lhm.js");

//test
test.describe
  .serial("Saraha Lienholder Management Web - Page Elements @smoke", () => {
  test("Navigate to Saraha Lienholder Management Web and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();

    const locatorNames = [
      "searchBar",
      "codeColumn",
      "eligibleColumn",
      "nameColumn",
      "addressColumn1",
      "addressColumn2",
      "citycolumn",
      "stateColumn",
      "zipColumn",
      "countryColumn",
      "bankAccountColumn",
      "routingNumberColumn",
      "paymentTypeColumn",
      "checkMailColumn",
      "entryDescriptionColumn",
      "exportGridDataButton",
      "newButton",
    ];

    for (const locatorName of locatorNames) {
      await saharaLHM.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Saraha Lienholder Management Web, click a row and validate Modal elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();

    await page.getByRole("button", { name: "NEW" }).click();
    const locatorNames = [
      "newLHHeader",
      "inputCode",
      "inputName",
      "inputAdd1",
      "inputAdd2",
      "inputCity",
      "inputState",
      "inputZip",
      "inputCountry",
      "inputBankAccount",
      "inputRoutingNumber",
      "atEligible",
      "cancelButton",
    ];

    for (const locatorName of locatorNames) {
      await saharaLHM.checkElementVisibility(locatorName);
    }
    // click Cancel to close modal
    await saharaLHM.locators.cancelButton().click();
  });
});
