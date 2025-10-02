// Atlas Web

// Dependencies
const { test, expect } = require("@playwright/test");
const { PartsTotalParts } = require("./total_parts");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Parts Operations, and validate Total Parts basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsTotalParts = new PartsTotalParts(page);
    await partsTotalParts.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    // Start at dealership listing and navigate to plan details, then to Total Parts
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Total Parts" }).click();

    // Landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "totalParts",
      "totalPartsExpenseHeader",
      "totalSalesOpProfHeader",
      "aop",
      //"potential",
      "aopYoYcounter",
      "aopPerformanceChart",
      "tsopAOP",
      //"tsopPotential",
      "tsopYoYcounter",
      "tsopPerformanceChart",
      "completeButton",
      "tpdpAOP",
      "tpdpPotential",
      "tpdpYoYcounter",
      "tpdpPerformanceChart",
    ];

    try {
      for (const locatorName of locatorNames) {
        await partsTotalParts.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
