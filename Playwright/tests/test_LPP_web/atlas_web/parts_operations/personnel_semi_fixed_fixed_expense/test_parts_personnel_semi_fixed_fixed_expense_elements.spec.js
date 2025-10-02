// Atlas Web

// Dependencies
const { test, expect } = require("@playwright/test");
const { PartsPersonnelExpense } = require("./partsOpsPSFFE");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  let page;
  let partsPersonnelExpense;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });
  test("Navigate to Atlas Web, Parts Operations, PSFFE basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "personnelExpenseHeader",
      "semiFixedExpenseHeader",
      "fixedExpenseHeader",
      "peAOPinput",
      // "pePotentialInput", - no longer used
      "peYoYcounter",
      "peInfoBox",
      "pePerformanceChart",
      "peUpdateButton",
      "sfeAOPinput",
      // "sfePotentialInput", - no longer used
      "sfeYoYcounter",
      "sfePerformanceChart",
      "sfeInfobox",
      "sfeUpdateButton",
      "feAOPinput",
      // "fePotentialInput", - no longer used
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
