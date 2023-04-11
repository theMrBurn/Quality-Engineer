// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SaharaLPO {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.pageHeader = page.getByRole("heading", {
      name: "Liens Approval Center",
      exact: true,
    });

    // unique page text

    // search, buttons, dropdowns and input boxes
    this.searchBar = page.getByPlaceholder("SEARCH");
    this.groupDropdown = page.getByRole("button", { name: "ALL GROUPS" });

    // forms and grids
    this.approvedColumn = page.getByText("APPROVED");
    this.idColumn = page.getByText("ID");
    this.storeNumberColumn = page.getByText("STORE #");
    this.groupColumn = page.getByText("GROUP", { exact: true });
    this.customerColumn = page.getByText("CUSTOMER");
    this.salesStockNumberColumn = page.getByText("SALES STOCK #");
    this.tradeVINColumn = page.getByText("TRADE VIN");

    // unique elements
    this.resetFiltersButton = page.getByRole("button", {
      name: "Reset Filters",
    });
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/lienpayoff");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page header not found").toBeVisible();
  }

  async getSearchBar() {
    await expect(this.searchBar, "Search Bar not found").toBeVisible();
  }

  async getGroupDropdown() {
    await expect(this.groupDropdown, "Group dropdown not Found").toBeVisible();
  }

  async getApprovedColumn() {
    await expect(
      this.approvedColumn,
      "Approved Column not found"
    ).toBeVisible();
  }

  async getIDColumn() {
    await expect(this.idColumn, "ID Column not found").toBeVisible();
  }

  async getStoreNumberColumn() {
    await expect(
      this.storeNumberColumn,
      "Store Number Column not found"
    ).toBeVisible();
  }

  async getCustomerColumn() {
    await expect(
      this.customerColumn,
      "Customer Column not found"
    ).toBeVisible();
  }

  async getSalesStockNumColumn() {
    await expect(
      this.salesStockNumberColumn,
      "Sales Stock Number Column not found"
    ).toBeVisible();
  }

  async getTradeVINColumn() {
    await expect(
      this.tradeVINColumn,
      "Trade VIN Column not found"
    ).toBeVisible();
  }

  async getResetFiltersButton() {
    await expect(
      this.resetFiltersButton,
      "Reset Filters Button not visible"
    ).toBeVisible();
  }

  // interact with elements

  async clickGroupsDropdown() {
    await this.getGroupDropdown();
    await this.groupDropdown.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickResetFiltersButton() {
    await this.getResetFiltersButton();
    await this.resetFiltersButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms

  async inputSearch(text) {
    await this.getSearchBar();
    await this.searchBar.click();
    await this.searchBar.fill(text);
  }
}
module.exports = { SaharaLPO };
