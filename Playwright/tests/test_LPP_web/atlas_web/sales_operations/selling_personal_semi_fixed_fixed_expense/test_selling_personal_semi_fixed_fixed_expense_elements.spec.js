// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SellingPersonalExpense } = require("./spsffee.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Sales Gross Profit View, SPSFFEE basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
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

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    //landed on the sales gross profit view, validate basic elements have loaded

    const locatorNames = [
      "seAOPinput",
      "sePotentialInput",
      "seYoYcounter",
      "sePerformanceChart",
      "sePerfTrendChart",
      "seUpdateButton",
      "peAOPinput",
      "pePotentialInput",
      "pePerformanceChart",
      "pePerfTrendChart",
      "peInfobox",
      "peUpdateButton",
      "sfeAOPinput",
      "sfePotentialInput",
      "sfePerformanceChart",
      "sfePerfTrendChart",
      "sfeInfobox",
      "sfeUpdateButton",
      "feAOPinput",
      "fePotentialInput",
      "fePerformanceChart",
      "fePerfTrendChart",
      "feInfobox",
      "feUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await sellingPersonalExpense.checkElementVisibility(locatorName);
    }
  });
});
