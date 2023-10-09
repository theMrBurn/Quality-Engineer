// this POM is for /LPP portal
const { expect } = require("@playwright/test");

class CameroDMM {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    this.locators = {
      pageheader: () =>
        this.page.getByRole("heading", {
          name: "Dealership Management Web",
        }),
      searchInput: () => this.page.getByPlaceholder("SEARCH"),
      // search and Filtering

      filterReset: () =>
        this.page.getByRole("button", { name: "Reset Filters" }),
      storeNameInnerFilter: () =>
        this.page.getByText("Filter", { exact: true }),

      // buttons and dropdowns
      newDealershipButton: () => this.page.getByRole("button", { name: "NEW" }),

      // columns and rows
      selectFirstColumn: () => this.page.locator("td").first(),

      actionColumn: () =>
        this.page.getByRole("columnheader", {
          name: "ACTION ",
        }),

      storeNumberColumn: () =>
        this.page.getByRole("columnheader", {
          name: "STORE NUMBER ",
        }),
      storeNameColumn: () =>
        this.page.getByRole("columnheader", {
          name: "STORE NAME ",
        }),

      dealerIDColumn: () =>
        this.page.getByRole("columnheader", {
          name: "DEALER ID ",
        }),
      bankAccountColumn: () =>
        this.page.getByRole("columnheader", {
          name: "BANK ACCOUNT ",
        }),
      groupColumn: () =>
        this.page.getByRole("columnheader", { name: "GROUP " }),
    };
  }

  // Navigate to dealerships endpoint
  async goto() {
    await this.page.goto("/dealerships");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async checkElementVisibility(locatorName) {
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

  // interact with elements

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

      // Click on the first grid row
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

  // input elements and forms

  async inputSearch(text) {
    await this.page.waitForLoadState();
    await this.locators.searchInput().fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async clearFilter() {
    await this.locators.filterReset().click();
    await this.page.waitForLoadState("networkidle");
  }

  async inputStoreNameFilter(text) {
    await this.page
      .getByRole("columnheader", { name: "STORE NAME " })
      .locator("div span")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").nth(2).click();
    await this.page.getByRole("textbox").nth(2).fill(text);
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
    await this.page.waitForLoadState("networkidle");
  }

  async inputStoreNumberFilter(text) {
    await this.page
      .getByRole("columnheader", { name: "STORE NUMBER " })
      .locator("div span")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").nth(2).click();
    await this.page.getByRole("textbox").nth(2).fill(text);
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { CameroDMM };
