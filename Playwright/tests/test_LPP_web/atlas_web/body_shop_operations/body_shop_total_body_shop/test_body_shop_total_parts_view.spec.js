// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopTotalParts } = require("./total_parts.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Parts Operations, and validate Total Parts basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsTotalParts = new PartsTotalParts(page);
    await partsTotalParts.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Total Parts").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "totalParts",
      "totalPartsExpenseHeader",
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
      await partsTotalParts.checkElementVisibility(locatorName);
    }
  });
});
