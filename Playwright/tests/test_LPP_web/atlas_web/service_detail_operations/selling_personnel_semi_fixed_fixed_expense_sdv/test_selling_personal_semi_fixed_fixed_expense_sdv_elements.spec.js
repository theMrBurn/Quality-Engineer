// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PersonalSFFE } = require("./spsffe_sdo");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Service Detail Operations View, SPSFFEE basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Personnel, Semi-Fixed, & Fixed Expense").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "personnelExpenseHeader",
      "semiFixedExpenseHeader",
      "fixedExpenseHeader",
      "topPreviousButton",
      "topNextButton",
      "bottomPreviousButton",
      "bottomNextButton",
    ];

    for (const locatorName of locatorNames) {
      await personalSFFE.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Service Detail Operations View, SPSFFEE specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Personnel, Semi-Fixed, & Fixed Expense").click();

    //landed on the sales gross profit view, validate basic elements have loaded

    const locatorNames = [
      "peAOPinput",
      "pePotentialInput",
      "peYoYcounter",
      "pePerformanceChart",
      "peInfobox",
      "peUpdateButton",
      "sfeAOPinput",
      "sfePotentialInput",
      "sfePerformanceChart",
      "sfeInfobox",
      "sfeUpdateButton",
      "feAOPinput",
      "fePotentialInput",
      "fePerformanceChart",
      "feInfobox",
      "feUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await personalSFFE.checkElementVisibility(locatorName);
    }
  });
});
