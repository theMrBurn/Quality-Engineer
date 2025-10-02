// Atlas Web

// dependencies
const { test, expect } = require("@playwright/test");
const { TotalStoreView } = require("./total_store_view");
const AtlasLogin = require("../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

// Test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  let page;
  let totalStoreView;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Atlas Web, Total Store Operations, and validate Total Store basic elements have loaded as expected", async () => {
    // // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    // Start at dealership listing and navigate to plan details, then navigate to Total Store
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    // Landed on the total store view, validate basic elements have loaded
    const locatorNames = [
      "totalStoreHeader",
      "totalStoreGross",
      "totalStoreExpense",
      "additionalIncome",
      "netProfitBeforeTax",
      "aop",
      //"potential2024",
      "aopYoYcounter",
      "aopPerformanceChart",
      "tseAOP",
      //"tsePotential2024",
      "tseYoYcounter",
      "tsePerformanceChart",
      "aiAOPinput",
      //"aiPotentialInput",
      "aiYoYcounter",
      "aiPerformanceChart",
      "aiUpdateButton",
      "npbtAOP",
      //"npbtPotential2024",
      "npbtYoYcounter",
      "npbtPerformanceChart",
      "topCompleteButton",
      "bottomCompleteButton",
    ];

    try {
      for (const locatorName of locatorNames) {
        await totalStoreView.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
