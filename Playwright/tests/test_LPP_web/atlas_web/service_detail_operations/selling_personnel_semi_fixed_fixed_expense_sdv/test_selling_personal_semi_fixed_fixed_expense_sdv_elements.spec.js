// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PersonalSFFE } = require("./spsffe_sdo");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test.slow();
  test("Navigate to Atlas Web, Service Detail Operations View, SPSFFEE basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page
      .getByRole("tab", { name: "Service / Detail Operations" })
      .click();
    await page.getByRole('menuitem', { name: 'Personnel, Semi-Fixed, & Fixed Expense' }).click();
    await page.waitForLoadState("networkidle");

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

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page
      .getByRole("tab", { name: "Service / Detail Operations" })
      .click();
    await page.getByRole('menuitem', { name: 'Personnel, Semi-Fixed, & Fixed Expense' }).click();
    await page.waitForLoadState("networkidle");

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
