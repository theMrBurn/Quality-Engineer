// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopGrossProfitView } = require("./bodyShopOps_view");
const AtlasLogin = require("../../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe
  .serial("Atlas Web - Body Shop Operations Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Body Shop Operations and validate basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole('tab', { name: 'Body Shop Operations' }).click();
    await page.getByRole('menuitem', { name: 'Body Shop Gross Profit' }).click();
    await page.waitForLoadState("networkidle");

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "bodyShopGrossHeader",
      "customerPayGrossHeader",
      "internalGrossHeader",
      "assuredDealerServicesHeader",
      "partsGrossHeader",
      "allOtherGrossHeader",
      "totalRevenueHeader",
      "totalBodyShopGrossHeader",
      ...[
        "cpg2024AOPinput",
        "cpgPotentialInput",
        "cpgYoYcounter",
        "cpgPerformanceChart",
        "cpgInfoBox",
        "cpgUpdateButton",
      ],
      ...[
        "ig2024AOPinput",
        "igPotentialInput",
        "igYoYcounter",
        "igPerformanceChart",
        "igInfoBox",
        "igUpdateButton",
      ],
      ...[
        "ads2024AOPinput",
        "adsPotentialInput",
        "adsYoYcounter",
        "adsPerformanceChart",
        "adsInfoBox",
        "adsUpdateButton",
      ],
      ...[
        "pg2024AOPinput",
        "pgPotentialInput",
        "pgYoYcounter",
        "pgPerformanceChart",
        "pgInfoBox",
        "pgUpdateButton",
      ],
      ...[
        "aog2024AOPinput",
        "aogPotentialInput",
        "aogYoYcounter",
        "aogPerformanceChart",
        "aogInfoBox",
        "aogUpdateButton",
      ],
      ...[
        "tr2024AOPinput",
        "trPotentialInput",
        "trYoYcounter",
        "trPerformanceChart",
        "trInfoBox",
        "trUpdateButton",
      ],
      ...[
        "tbs2024AOP",
        "tbsPotential",
        "tbsYoYcounter",
        "tbsPerformanceChart",
        "tbsUpdateButton",
      ],
    ];

    for (const locatorName of locatorNames) {
      await bodyShopGrossProfitView.checkElementVisibility(locatorName);
    }
  });
});
