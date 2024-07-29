// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopTotalParts } = require("./body_shop_total_parts");
const AtlasLogin = require("../../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Body Shop Operations, and validate Total Parts basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopTotalParts = new BodyShopTotalParts(page);
    await bodyShopTotalParts.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Total Parts
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Total Body Shop").click();

    //landed on the body shop total parts view, validate basic elements have loaded

    const locatorNames = [
      "totalBodyShopExpense",
      "totalBodyShopOperatingProfit",
      "aop2024",
      "potential2024",
      "aopYoYcounter",
      "aop2024PerformanceChart",
      "tbsopAOP2024",
      "tbsopPotential2024",
      "tbsopYoYcounter",
      "tbsop2024PerformanceChart",
      "completeButton",
    ];

    for (const locatorName of locatorNames) {
      await bodyShopTotalParts.checkElementVisibility(locatorName);
    }
  });
});
