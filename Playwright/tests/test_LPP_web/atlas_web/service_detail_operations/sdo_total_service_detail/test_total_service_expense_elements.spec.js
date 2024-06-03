// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SDOTotalServiceDetail } = require("./sdoTotalServiceDetail");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");


//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, choose Plan 0, validate Total Sales Expense elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const sdoTotalServiceDetail = new SDOTotalServiceDetail(page);
    await sdoTotalServiceDetail.goto();
    await page.waitForLoadState("networkidle");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Total Service/Detail").click();
    await page.waitForLoadState("networkidle");

    const locatorNames = [
      "totalServiceDetailExpenseHeader",
      "totalServiceExpenseHeader",
      "totalServiceOperatingProfitHeader",
      "totalDetailExpenseHeader",
      "totalDetailOperatingProfitHeader",
      "tseAOP2024",
      "tsePotential2024",
      "tseAOPYoYcounter",
      "tseAOP2024PerformanceChart",
      "tsopAOP2024",
      "tsopPotential2024",
      "tsopYoYcounter",
      "tsop2024PerformanceChart",
      "tdeAOP2024input",
      "tdePotential2024input",
      "tdeYoYcounter",
      "tde2024PerformanceChart",
      "topAOP2024",
      "topPotential2024",
      "topYoYcounter",
      "top2024PerformanceChart",
      "completeButton",
    ];

    for (const locatorName of locatorNames) {
      await sdoTotalServiceDetail.checkElementVisibility(locatorName);
    }
  });
});
