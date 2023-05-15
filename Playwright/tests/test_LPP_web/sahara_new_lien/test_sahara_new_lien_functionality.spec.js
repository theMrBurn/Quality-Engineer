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
  .serial("Saraha Lein Payoff / NEW LIEN - Page Elements @func", () => {
  test("Navigate to Saraha New Lien and validate Page all input elements can be interacted with", async ({
    browser,
    page,
  }) => {
    const saharaNewLien = new SaharaNewLien(page);
    await saharaNewLien.goto();

    // enter text in available text boxes
    await saharaNewLien.dealIDtext("test");
    await saharaNewLien.customerNameInput("customer name");
    await saharaNewLien.tradeInStockNumberInput("stockNumber12345");
    await saharaNewLien.tradeVINinput("12345678901234567");
    await saharaNewLien.accountNumVINinput("some fake number 1234");
    await saharaNewLien.adjustedPayoffAmountInput("22000");
  });

  test("Navigate to Saraha New Lien and validate Page all Dropdown elements can be interacted with", async ({
    browser,
    page,
  }) => {
    const saharaNewLien = new SaharaNewLien(page);
    await saharaNewLien.goto();

    await saharaNewLien.clickStoreNumberDropdown();
    await page.getByRole("option", { name: "15 - (GRANTS PASS CJD)" }).click();

    await saharaNewLien.clickDropdownLPOAccountNum();
    await page.getByRole("option", { name: "30100" }).click();

    await saharaNewLien.clickLienholdersDropdown();
    await page.getByRole("option", { name: "FTB - 5TH/3RD BANK" }).click();

    // finish by entering the now visible input boxes
    await saharaNewLien.makeInput("jeep");
    await saharaNewLien.modelInput("wrangler");
    await saharaNewLien.yearInput("2022");
  });

  test("Navigate to Saraha New Lien and validate Save alerts all the approperiate alerts on the page if Form not filled out as expected", async ({
    browser,
    page,
  }) => {
    const saharaNewLien = new SaharaNewLien(page);
    await saharaNewLien.goto();

    await saharaNewLien.clickSaveButton();

    const saveAlert = await page.getByText(
      "Please fill out all required fields below."
    );

    // nothing has been filled out, so we need to be prompted by the alert
    await expect(saveAlert).toBeVisible();
  });
});
