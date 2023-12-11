// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class AdminStoreView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Atlas landing page elements
    this.locators = {
      heading1: () =>
        this.page.getByRole("heading", {
          name: "2024 Store Potential and Annual Operating Plan",
        }),
      heading2: () =>
        this.page.getByRole("heading", { name: "Dealership Listings" }),
      searchBar: () => this.page.getByPlaceholder("SEARCH"),
      submitButton: () => this.page.getByRole("button", { name: "Submit" }),
      resetFiltersButton: () =>
        this.page.getByRole("button", { name: "Reset Filters" }),
      codeColumn: () =>
        (this.codeColumn = page
          .getByRole("columnheader", { name: "CODE " })
          .locator("span")
          .nth(1)),

      /// Plan Details page elements
      // Role Assignments
      roleAssignmentsColumn: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Role Assignments$/ })
          .first(),
      salesOperationsHeading: () =>
        this.page.getByRole("heading", { name: "Sales Operations" }).first(),
      assignEmployeeSalesOps: () =>
        this.page
          .getByRole("button", { name: "Assign employee to department" })
          .first(),
      usedSalesOperations: () =>
        this.page.getByRole("heading", { name: "Used Sales Operations" }),
      assignButton1: () =>
        this.page
          .getByRole("button", { name: "Assign employee to department" })
          .nth(1),
      infobox1: () =>
        this.page.getByText(
          "This is an optional assignment. If no user is assigned, it will fall under Sales",
        ),
      serviceDetailOperations1: () =>
        this.page
          .getByRole("heading", { name: "Service / Detail Operations" })
          .first(),
      assignButton2: () =>
        this.page
          .getByRole("button", { name: "Assign employee to department" })
          .nth(2),
      partsOperations1: () =>
        this.page.getByRole("heading", { name: "Parts Operations" }).first(),
      assignButton3: () =>
        this.page
          .getByRole("button", { name: "Assign employee to department" })
          .nth(3),
      bodyshopOperations1: () =>
        this.page
          .getByRole("heading", { name: "Body Shop Operations" })
          .first(),
      assignButton4: () =>
        this.page
          .getByRole("button", { name: "Assign employee to department" })
          .nth(4),

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
    await this.page.goto("/atlas");
    await this.page.waitForLoadState("load");
  }

  // get page elements

  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];
    const element = await locatorFunction().first();
    try {
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(`Locator '${locatorName}' failed: ${error.message}`);
    }
  }

  /// interact with elements

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
module.exports = { AdminStoreView };
