/// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopPersonnelExpense } = require("./bodyShopPSFFE_view");
const AtlasLogin = require("../../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe
  .serial("Atlas Web - Body Shop Personell Semi Fixed, Fixed Expense Page Elements @smoke", () => {
  let page;
  let bodyShopPersonnelExpense;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    //land on the Body Shop Personell Semi Fixed, Fixed Expense view, validate basic elements have loaded (big list)

    const locatorNames = [
      "personnelExpenseHeader",
      "semiFixedExpenseHeader",
      "fixedExpenseHeader",
      "peAOPinput",
      // "pePotentialInput", - no longer present on the app
      "peYoYcounter",
      "peInfoBox",
      "pePerformanceChart",
      "peUpdateButton",
      "sfeAOPinput",
      // "sfePotentialInput", - no longer present on the app
      "sfeYoYcounter",
      "sfePerformanceChart",
      "sfeInfobox",
      "sfeUpdateButton",
      "feAOPinput",
      // "fePotentialInput", - no longer present on the app
      "feYoYcounter",
      "fePerformanceChart",
      "feInfobox",
      "feUpdateButton",
      "bottomNextButton",
      "bottomPreviousButton",
      "topNextButton",
      "topPreviousButton",
    ];

    try {
      for (const locatorName of locatorNames) {
        await bodyShopPersonnelExpense.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
