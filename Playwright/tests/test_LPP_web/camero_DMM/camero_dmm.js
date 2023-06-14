// this POM is for /LPP portal
const { expect } = require("@playwright/test");

class CameroDMM {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.pageHeader = page.getByRole("heading", {
      name: "Dealership Management Web",
    });

    // grid columns

    // search and Filtering
    this.searchInput = page.getByPlaceholder("SEARCH");
    this.filterReset = page.getByRole("button", { name: "Reset Filters" });
    this.storeNameInnerFilter = page.getByText("Filter", { exact: true });

    // buttons and dropdowns
    this.newDealershipButton = page.getByRole("button", { name: "NEW" });

    // columns and rows
    this.selectFirstColumn = page.locator("td").first();

    this.actionColumn = page.getByRole("columnheader", {
      name: "ACTION ",
    });

    this.storeNumberColumn = page.getByRole("columnheader", {
      name: "STORE NUMBER ",
    });
    this.storeNameColumn = page.getByRole("columnheader", {
      name: "STORE NAME ",
    });

    this.dealerIDColumn = page.getByRole("columnheader", {
      name: "DEALER ID ",
    });
    this.bankAccountColumn = page.getByRole("columnheader", {
      name: "BANK ACCOUNT ",
    });
    this.groupColumn = page.getByRole("columnheader", { name: "GROUP " });
  }

  // Navigate to dealerships endpoint
  async goto() {
    await this.page.goto("/dealerships");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async getSearchInput() {
    await expect(this.searchInput, "Search not found").toBeVisible();
  }

  async getNewDealershipButton() {
    await expect(
      this.newDealershipButton,
      "New Dealership Button not found"
    ).toBeVisible();
  }

  async getPageHeader() {
    await expect(this.pageHeader, "Page header not found").toBeVisible();
  }

  async getSelectFirstColumn() {
    await expect(
      this.selectFirstColumn,
      "First Column 'Select' not found"
    ).toBeVisible();
  }

  async getActionColumn() {
    await expect(this.actionColumn, "Action column not found").toBeVisible();
  }

  async getStoreNumberColumn() {
    await expect(
      this.storeNumberColumn,
      "Store Number column not found"
    ).toBeVisible();
  }

  async getStoreNameColumn() {
    await expect(
      this.storeNameColumn,
      "Store Name column not found"
    ).toBeVisible();
  }

  async getDealerIDColumn() {
    await expect(
      this.dealerIDColumn,
      "Dealer ID column not found"
    ).toBeVisible();
  }

  async getBankAccountColumn() {
    await expect(
      this.bankAccountColumn,
      "Bank ID Column not found"
    ).toBeVisible();
  }

  async getGroupColumn() {
    await expect(this.groupColumn, "Group Column not found").toBeVisible();
  }

  async getFilterReset() {
    await expect(this.filterReset, "Filter Reset not found").toBeVisible();
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
    await this.getSearchInput();
    await this.searchInput.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async clearFilter() {
    await this.filterReset.click();
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
