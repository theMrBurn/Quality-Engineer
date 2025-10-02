// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SellingPersonalExpense } = require("./spsffee.js");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Sales Gross Profit View, SPSFFEE basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Sales Operations" }).click();
    await page
      .getByRole("menuitem", {
        name: "Selling, Personnel, Semi-Fixed, & Fixed Expense",
      })
      .click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "sellingExpenseHeader",
      "personnelExpenseHeader",
      "semiFixedExpenseHeader",
      "fixedExpenseHeader",
      "topPreviousButton",
      "topNextButton",
      "bottomPreviousButton",
      "bottomNextButton",
    ];

    for (const locatorName of locatorNames) {
      await sellingPersonalExpense.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Selling Expense specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Sales Operations" }).click();
    await page
      .getByRole("menuitem", {
        name: "Selling, Personnel, Semi-Fixed, & Fixed Expense",
      })
      .click();

    //landed on the sales gross profit view, validate basic elements have loaded

    const locatorNames = [
      "seAOPinput",
      //"sePotentialInput",
      "seYoYcounter",
      "sePerformanceChart",
      "seUpdateButton",
      "peAOPinput",
      "pePerformanceChart",
      "peYOYcounter",
      "peInfobox",
      "peUpdateButton",
      "sfeAOPinput",
      //"sfePotentialInput",
      "sfePerformanceChart",
      "sfeYOYcounter",
      "sfeInfobox",
      "sfeUpdateButton",
      "feAOPinput",
      //"fePotentialInput",
      "fePerformanceChart",
      "feYOYcounter",
      "feInfobox",
      "feUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await sellingPersonalExpense.checkElementVisibility(locatorName);
    }
  });
});
