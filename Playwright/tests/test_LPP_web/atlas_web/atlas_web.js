// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class AtlasWeb {
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

  /// columns have specific filter options

  async inputContractDateColumnFilter(text) {
    await this.getGridColumnContractDate();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").click();
    await this.page.getByRole("textbox").fill("01/01/2001");
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
  }

  // filter
  async inputColumnFilter(text) {
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").first().click();
    await this.page.getByRole("textbox").first().fill("test");
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("button", { name: "Clear" }).click();
  }
}
module.exports = { AtlasWeb };
