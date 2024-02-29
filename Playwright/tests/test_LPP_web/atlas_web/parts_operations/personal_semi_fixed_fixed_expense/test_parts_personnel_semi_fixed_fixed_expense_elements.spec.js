// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PartsPersonnelExpense } = require("./partsOpsPSFFE");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Parts Operations, PSFFE basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Personnel, Semi-Fixed, &").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

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
      await partsPersonnelExpense.checkElementVisibility(locatorName);
    }
  });
});
