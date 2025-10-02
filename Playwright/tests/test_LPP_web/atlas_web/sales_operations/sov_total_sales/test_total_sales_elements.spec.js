// Atlas Web

// dependencies
const { test, expect } = require("@playwright/test");
const { TotalSalesExpenseView } = require("./sovTotalSales.js");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

// test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, choose Plan 0, validate Total Sales Expense elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const totalSalesExpenseView = new TotalSalesExpenseView(page);
    await totalSalesExpenseView.goto();
    await page.waitForLoadState("networkidle");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    // start at dealership listing and navigate to plan details, then to navigate to SPSFFEE
    await page.getByText("STORE", { exact: true }).click();

    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Sales Operations" }).click();
    await page.getByRole("menuitem", { name: "Total Sales" }).click();

    const locatorNames = [
      "totalSalesHeader",
      "totalSalesOpProfHeader",
      "aop",
      "potential",
      "aopYoYcounter",
      "aopPerformanceChart",
      "tsopAOP",
      // "tsopPotential2024",
      "tsopYoYcounter",
      "tsopPerformanceChart",
      "completeButton",
      "todpCardTitle",
      "todpAOPTotal",
      "todpYOY",
      "todpPotential",
      "todpPerformanceChart",
    ];

    for (const locatorName of locatorNames) {
      await totalSalesExpenseView.checkElementVisibility(locatorName);
    }
  });
});
