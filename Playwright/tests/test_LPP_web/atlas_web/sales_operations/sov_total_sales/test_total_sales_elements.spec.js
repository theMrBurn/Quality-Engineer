// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { TotalSalesExpenseView } = require("./sovTotalSales.js");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, choose Plan 0, validate Total Sales Expense elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const totalSalesExpenseView = new TotalSalesExpenseView(page);
    await totalSalesExpenseView.goto();
    await page.waitForLoadState("networkidle");

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to total service detail ops
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Total Sales").click();
    await page.waitForLoadState("networkidle");

    const locatorNames = [
      "totalSalesExpenseHeader",
      "totalSalesOpProfHeader",
      "aop2024",
      "potential2024",
      "aopYoYcounter",
      "aop2024PerformanceChart",
      "tsopAOP2024",
      "tsopPotential2024",
      "tsopYoYcounter",
      "tsop2024PerformanceChart",
      "completeButton",
    ];

    for (const locatorName of locatorNames) {
      await totalSalesExpenseView.checkElementVisibility(locatorName);
    }
  });
});
