// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopTotalParts } = require("./body_shop_total_parts");
const AtlasLogin = require("../../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

// Test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  let page;
  let bodyShopTotalParts;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    bodyShopTotalParts = new BodyShopTotalParts(page);
    await bodyShopTotalParts.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Atlas Web, Body Shop Operations, and validate Total Parts basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopTotalParts = new BodyShopTotalParts(page);
    await bodyShopTotalParts.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Total Body Shop
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page.getByText("Total Body Shop").click();

    //landed on the body shop total parts view, validate basic elements have loaded

    const locatorNames = [
      "totalBodyShopExpense",
      "totalBodyShopOperatingProfit",
      "aop",
      "potential",
      "aopYoYcounter",
      "aopPerformanceChart",
      "tbsopAOP",
      "tbsopPotential",
      "tbsopYoYcounter",
      "tbsopPerformanceChart",
      "completeButton",
      "tbsopAOP",
      "tbsopPotential",
      "tbsopYoYcounter",
      "tbsopPerformanceChart",
    ];

    try {
      for (const locatorName of locatorNames) {
        await bodyShopTotalParts.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
