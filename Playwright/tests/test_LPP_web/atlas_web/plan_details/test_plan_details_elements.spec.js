// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PlanDetailsView } = require("./atlas_plan_details.js");
const AtlasLogin = require("../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test.slow();
  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, Role Assignments column elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();

    // // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    // await page.getByLabel("Plan Details (0)").locator("path").click();
    // await page.waitForURL("atlas/plan/0");

    const locatorNames = [
      "assignEmployeesColumn",
      "salesOperationsHeading",
      //"assignEmployeeSalesOps",
      "usedSalesOperations",
      "infobox1",
      "serviceDetailOperations1",
      "partsOperations1",
      "bodyshopOperations1",
    ];

    try {
      await page.waitForLoadState("load");

      for (const locatorName of locatorNames) {
        await planDetailsView.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
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

    try {
      for (const locatorName of locatorNames) {
        await planDetailsView.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
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

    try {
      for (const locatorName of locatorNames) {
        await planDetailsView.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
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

    try {
      const viewTrends = await page.getByRole("button", {
        name: "View Trends",
      });

      // Get the "href" attribute of the button (replace "href" with the actual attribute)
      const hrefAttribute = await viewTrends.getAttribute("href");

      // Define the expected URL
      const expectedURL = "/atlas/plan/0/analyzer";

      // Validate that the "href" attribute contains the expected URL
      expect(hrefAttribute).toContain(expectedURL);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, validate Store Performance URLs match expected destination string - 2022 Actual by Month", async ({
    browser,
    page,
  }) => {
    test.skip("need to see if doing an API test of this will work instead");

    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    try {
      const viewData = await page
        .getByRole("button", { name: "View Data" })
        .nth(1);

      // Get the "href" attribute of the button (replace "href" with the actual attribute)
      const hrefAttribute = await viewData.getAttribute("href");

      // Define the expected URL
      const expectedURL = "/atlas/MisHistory/L0000-2022.pdf";

      // Validate that the "href" attribute contains the expected URL
      expect(hrefAttribute).toContain(expectedURL);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, validate Store Performance URLs match expected destination string - 2023 Actual/Forecast by Month", async ({
    browser,
    page,
  }) => {
    test.skip("need to see if doing an API test of this will work instead");

    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    try {
      const viewData = await page
        .getByRole("button", { name: "View Data" })
        .first();

      // Get the "href" attribute of the button (replace "href" with the actual attribute)
      const hrefAttribute = await viewData.getAttribute("href");

      // Define the expected URL
      const expectedURL = "/atlas/MisHistory/L0000-2023.pdf";

      // Validate that the "href" attribute contains the expected URL
      expect(hrefAttribute).toContain(expectedURL);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, choose Plan 0, validate Plan Details Page, validate Store Performance URLs match expected destination string - 2024 AOP By Month", async ({
    browser,
    page,
  }) => {
    test.skip("need to see if doing an API test of this will work instead");

    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    try {
      const viewData = await page.getByRole("button", { name: "View AOP" });

      // Get the "href" attribute of the button (replace "href" with the actual attribute)
      const hrefAttribute = await viewData.getAttribute("href");

      // Define the expected URL
      const expectedURL = "/atlas/plan/0";

      // Validate that the "href" attribute contains the expected URL
      expect(hrefAttribute).toContain(expectedURL);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
