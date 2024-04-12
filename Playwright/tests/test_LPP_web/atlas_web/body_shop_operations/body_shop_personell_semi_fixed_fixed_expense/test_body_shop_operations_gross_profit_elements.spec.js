// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopPersonnelExpense } = require("./bodyShopPSFFE_view");
const AtlasLogin = require("../../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe
  .serial("Atlas Web - Body Shop Personell Semi Fixed, Fixed Expense Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Body Shop PSFFE and validate basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .getByRole("paragraph")
      .click();

    //land on the Body Shop Personell Semi Fixed, Fixed Expense view, validate basic elements have loaded (big list)

    const locatorNames = [
      "personnelExpenseHeader",
      "semiFixedExpenseHeader",
      "fixedExpenseHeader",
      "peAOPinput",
      "pePotentialInput",
      "peYoYcounter",
      "peInfoBox",
      "pePerformanceChart",
      "peUpdateButton",
      "sfeAOPinput",
      "sfePotentialInput",
      "sfeYoYcounter",
      "sfePerformanceChart",
      "sfeInfobox",
      "sfeUpdateButton",
      "feAOPinput",
      "fePotentialInput",
      "feYoYcounter",
      "fePerformanceChart",
      "feInfobox",
      "feUpdateButton",
      "bottomNextButton",
      "bottomPreviousButton",
      "topNextButton",
      "topPreviousButton",
    ];

    for (const locatorName of locatorNames) {
      await bodyShopPersonnelExpense.checkElementVisibility(locatorName);
    }
  });
});
