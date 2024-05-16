// this POM is for /Impact Builder

const { expect } = require("@playwright/test");

class ImpactSearchPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Atlas landing page elements
    this.locators = {
      impactBuilderAnalysisHeader: () =>
        this.page.getByText("Impact Builder Analyses"),

      /// page elements
      searchInput: () => this.page.getByLabel("Search"),
      searchInputIcon: () => this.page.getByTestId("SearchIcon"),
      applyButton: () => this.page.getByRole("button", { name: "Apply" }),
      removeFiltersButton: () =>
        this.page.getByRole("button", { name: "REMOVE FILTERS" }),
      newAnalysisButton: () =>
        this.page.getByRole("button", { name: "New Analysis" }),
      searchResultsGrid: () =>
        this.page.locator('//*[@id="root"]/div/div[2]/div/div/div[3]/div/div'),

      // Role Assignments
      roleAssignmentsColumn: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Role Assignments$/ })
          .first(),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/Search");
    await this.page.waitForLoadState("load");
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

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridElement); // Get handles for all grid rows

    // Check if any grid rows are found
    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      // Ensure the element is attached to the DOM
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      // Add an extra wait for the element to be visible. Adjust time as needed.
      await this.page.waitForTimeout(1000);

      // Click on the first grid row
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");

      // Wait for any possible navigation to complete
      await this.page.waitForLoadState("networkidle");
    } else {
      console.log("No grid rows found.");
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

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async findGridRows(gridSelector) {
    await this.page.waitForSelector(gridSelector); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridSelector); // Get handles for all grid rows
    return gridRowHandles;
  }
}
module.exports = { ImpactSearchPage };
