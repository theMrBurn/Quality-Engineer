const { expect } = require("@playwright/test");

class PlanDetailsView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Atlas landing page elements
    this.locators = {
      /// Plan Details page elements

      // Role Assignments
      roleAssignmentsColumn: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Role Assignments$/ })
          .first(),
      salesOperationsHeading: () =>
        this.page.getByRole("heading", { name: "Sales Operations" }).first(),
      assignEmployeeSalesOps: () => this.page.locator("#mui-3"),
      usedSalesOperations: () => this.page.locator("#mui-5"),
      assignButton1: () => this.page.locator("#mui-7"),
      infobox1: () =>
        this.page.getByText(
          "This is an optional assignment. If no user is assigned, it will fall under Sales",
        ),
      serviceDetailOperations1: () =>
        this.page
          .getByRole("heading", { name: "Service / Detail Operations" })
          .first(),
      assignButton2: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[3]/div/div[2]/button',
        ),
      partsOperations1: () =>
        this.page.getByRole("heading", { name: "Parts Operations" }).first(),
      assignButton3: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[4]/div/div[2]/button',
        ),
      bodyshopOperations1: () =>
        this.page
          .getByRole("heading", { name: "Body Shop Operations" })
          .first(),
      assignButton4: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[1]/div/div/div[2]/div/div[5]/div/div[2]/button',
        ),
      cancelButton: () => this.page.getByRole("button", { name: "Cancel" }),

      // Plan Progress
      planProgress: () => this.page.getByText("Plan Progress"),
      salesOperations: () =>
        this.page.getByRole("heading", { name: "Sales Operations" }).nth(2),
      serviceDetailOperations2: () =>
        this.page.getByRole("heading", { name: "Service / Detail Operations" }),
      partsOperations2: () =>
        this.page.getByRole("heading", { name: "Parts Operations" }).nth(1),
      bodyshopOperations2: () =>
        this.page.getByRole("heading", { name: "Body Shop Operations" }).nth(1),
      totalStoreOps: () =>
        this.page.getByRole("heading", { name: "Total Store Operations" }),

      bodyShopPlanProgress: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[2]/div/div/div[2]/div/div[4]/div/div[2]/div/div[2]',
        ),
      partsOpsPlanDetails: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[2]/div/div/div[2]/div/div[3]/div/div[2]',
        ),

      serviceDetailsOpsPlanDetails: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[2]/div/div[2]',
        ),

      salesOpsPlanDetails: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/div[2]/div/div[2]',
        ),

      // Store Performance
      storePerformance: () => this.page.getByText("Store Performance"),
      aopByMonth: () =>
        this.page.getByRole("heading", { name: "2024 AOP by Month" }),
      viewAOPButton: () => this.page.getByRole("button", { name: "View AOP" }),
      viewSeasonValuesCalcd: () =>
        this.page.getByText(
          "View the seasonalized values calculated for the 2024 AOP",
        ),
      actualValues2023ByMonth: () =>
        this.page.getByRole("heading", {
          name: "2023 Actual/Forecast by Month",
        }),
      viewDataButton1: () =>
        this.page.getByRole("button", { name: "View Data" }).first(),
      currentYearDownload: () =>
        this.page.getByText(
          "Download the historical performance of the dealership for the current year",
        ),
      mbmActual2022: () =>
        this.page.getByRole("heading", { name: "2022 Actual by Month" }),
      viewDataButton2: () =>
        this.page.getByRole("button", { name: "View Data" }).nth(1),
      historicalDownload: () =>
        this.page.getByText(
          "Download the historical performance of the dealership for the year 2022",
        ),
      trendAnalyzer: () =>
        this.page.getByRole("heading", { name: "Trend Analyzer" }),
      viewTrends: () => this.page.getByRole("button", { name: "View Trends" }),
      compareAOP: () =>
        this.page.getByText(
          "Compare the entered AOP values to the prior two years for select categories",
        ),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/atlas/plan/0");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /// interact with elements

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      await this.page.waitForLoadState("load");
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }
}
module.exports = { PlanDetailsView };
