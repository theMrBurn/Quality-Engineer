// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PlanDetailsView } = require("./atlas_plan_details.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, Role Assignments column elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // await page.getByLabel("Plan Details (0)").locator("path").click();
    // await page.waitForURL("atlas/plan/0");

    const locatorNames = [
      "roleAssignmentsColumn",
      "salesOperationsHeading",
      "assignEmployeeSalesOps",
      "usedSalesOperations",
      "assignButton1",
      "infobox1",
      "serviceDetailOperations1",
      "assignButton2",
      "partsOperations1",
      "assignButton3",
      "bodyshopOperations1",
    ];

    for (const locatorName of locatorNames) {
      await planDetailsView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, Plan Progress column elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    const locatorNames = [
      "planProgress",
      "salesOperations",
      "serviceDetailOperations2",
      "partsOperations2",
      "bodyshopOperations2",
      "totalStoreOps",
    ];

    for (const locatorName of locatorNames) {
      await planDetailsView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, Store Performance column elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    const locatorNames = [
      "storePerformance",
      "aopByMonth",
      "viewAOPButton",
      "viewSeasonValuesCalcd",
      "actualValues2023ByMonth",
      "viewDataButton1",
      "currentYearDownload",
      "mbmActual2022",
      "viewDataButton2",
      "historicalDownload",
      "trendAnalyzer",
      "viewTrends",
      "compareAOP",
    ];

    for (const locatorName of locatorNames) {
      await planDetailsView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, validate Store Performance URLs match expected destination string - Trend Analyzer", async ({
    browser,
    page,
  }) => {
    test.skip("need to see if doing an API test of this will work instead");

    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    const viewTrends = await page.getByRole("button", { name: "View Trends" });

    // Get the "href" attribute of the button (replace "href" with the actual attribute)
    const hrefAttribute = await viewTrends.getAttribute("href");

    // Define the expected URL
    const expectedURL = "/atlas/plan/0/analyzer";

    // Validate that the "href" attribute contains the expected URL
    expect(hrefAttribute).toContain(expectedURL);
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, validate Store Performance URLs match expected destination string - 2022 Actual by Month", async ({
    browser,
    page,
  }) => {
    test.skip("need to see if doing an API test of this will work instead");

    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    const viewData = await page
      .getByRole("button", { name: "View Data" })
      .nth(1);

    // Get the "href" attribute of the button (replace "href" with the actual attribute)
    const hrefAttribute = await viewData.getAttribute("href");

    // Define the expected URL
    const expectedURL = "/atlas/MisHistory/L0000-2022.pdf";

    // Validate that the "href" attribute contains the expected URL
    expect(hrefAttribute).toContain(expectedURL);
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, validate Store Performance URLs match expected destination string - 2023 Actual/Forecast by Month", async ({
    browser,
    page,
  }) => {
    test.skip("need to see if doing an API test of this will work instead");

    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    const viewData = await page
      .getByRole("button", { name: "View Data" })
      .first();

    // Get the "href" attribute of the button (replace "href" with the actual attribute)
    const hrefAttribute = await viewData.getAttribute("href");

    // Define the expected URL
    const expectedURL = "/atlas/MisHistory/L0000-2023.pdf";

    // Validate that the "href" attribute contains the expected URL
    expect(hrefAttribute).toContain(expectedURL);
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, validate Store Performance URLs match expected destination string - 2024 AOP By Month", async ({
    browser,
    page,
  }) => {
    test.skip("need to see if doing an API test of this will work instead");

    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    const viewData = await page.getByRole("button", { name: "View AOP" });

    // Get the "href" attribute of the button (replace "href" with the actual attribute)
    const hrefAttribute = await viewData.getAttribute("href");

    // Define the expected URL
    const expectedURL = "/atlas/plan/0";

    // Validate that the "href" attribute contains the expected URL
    expect(hrefAttribute).toContain(expectedURL);
  });
});
