// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { TotalStoreView } = require("./total_store_view");
const AtlasLogin = require("../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Parts Operations, and validate Total Parts basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();

    //landed on the body shop total parts view, validate basic elements have loaded

    const locatorNames = [
      "totalStoreHeader",
      "totalStoreGross",
      "totalStoreExpense",
      "additionalIncome",
      "netProfitBeforeTax",
      "aop2024",
      "potential2024",
      "aopYoYcounter",
      "aop2024PerformanceChart",
      "tseAOP2024",
      "tsePotential2024",
      "tseYoYcounter",
      "tse2024PerformanceChart",
      "ai2024AOPinput",
      "aiPotentialInput",
      "aiYoYcounter",
      "aiPerformanceChart",
      "aiUpdateButton",
      "npbtAOP2024",
      "npbtPotential2024",
      "npbtYoYcounter",
      "npbt2024PerformanceChart",
      "topCompleteButton",
      "bottomCompleteButton",
    ];

    for (const locatorName of locatorNames) {
      await totalStoreView.checkElementVisibility(locatorName);
    }
  });
});
