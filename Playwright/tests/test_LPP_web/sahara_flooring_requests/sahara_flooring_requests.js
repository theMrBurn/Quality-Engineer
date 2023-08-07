// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SaharaFlooringRequests {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers, tabs
    this.pageHeader = page.getByRole("heading", {
      name: "Flooring Center",
      exact: true,
    });
    this.payoffsTab = page.getByRole("tab", { name: "payoffs" });
    this.requestsTab = page.getByRole("tab", { name: "requests" });
    this.forecastTab = page.getByRole("tab", { name: "forecast" });

    // unique page text

    // search, buttons, dropdowns and input boxes
    this.buttonRow = page.getByText(
      "GL POWER POSTEXPORT ZIPNEWEXPORT GRID DATA"
    );
    this.buttonGLPOWERPOST = page.locator(
      '//*[@id="root"]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div/div/button[1]'
    );

    // forms and grids
    this.grid = page.locator(".MuiGrid-root > .MuiGrid-root");

    this.gridColumnBank = page.getByText("BANK", { exact: true });
    this.gridColumnStoreNum = page.getByText("STORE #", { exact: true });
    this.gridColumnDealerCode = page.getByText("DEALER CODE", { exact: true });
    this.gridColumnLogon = page.getByText("LOGON", { exact: true });
    this.gridColumnBankDDA = page.getByText("BANK DDA", { exact: true });
    this.gridColumnStockNum = page.getByText("STOCK #", { exact: true });
    this.gridColumnVIN = page.getByText("VIN", { exact: true });
    this.gridColumnAccount = page
      .getByRole("columnheader", { name: "AMOUNT " })
      .locator("div span");
    this.gridColumnAmount = page.getByText("AMOUNT", { exact: true });
    this.gridColumnContractDate = page.getByText("CONTRACT DATE", {
      exact: true,
    });

    // unique elements
    this.resetFiltersButton = page.getByRole("button", {
      name: "Reset Filters",
    });
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/flooring/requests");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page header not found").toBeVisible();
  }

  async getPayoffsTab() {
    await expect(this.payoffsTab, "Payoffs Tab not found").toBeVisible();
  }

  async getRequestsTab() {
    await expect(this.requestsTab, "Requests Tab not found").toBeVisible();
  }

  async getForecastTab() {
    await expect(this.forecastTab, "Forecast Tab not found").toBeVisible();
  }

  async getButtonRow() {
    await expect(this.buttonRow, "Button row not found").toBeVisible();
  }

  async getButtonGLP() {
    await expect(
      this.buttonGLPOWERPOST,
      "GL POWER POST Button not found"
    ).toBeVisible();
  }

  async getGrid() {
    await expect(this.grid, "Grid not found").toBeVisible();
  }

  async getGridColumnStoreNum() {
    await expect(
      this.gridColumnStoreNum,
      "Store # Column not found"
    ).toBeVisible();
  }

  async getGridColumnDealerCode() {
    await expect(
      this.gridColumnDealerCode,
      "Dealer Code Column not found"
    ).toBeVisible();
  }

  async getGridLogon() {
    await expect(this.gridColumnLogon, "LOGON Column not found").toBeVisible();
  }

  async getGridBankDDA() {
    await expect(this.gridColumnBankDDA, "Bank DDA not found").toBeVisible();
  }

  async getGridStockNum() {
    await expect(
      this.gridColumnStockNum,
      "Stock Number not found"
    ).toBeVisible();
  }

  async getGridColumnVIN() {
    await expect(
      this.gridColumnVIN,
      "VIN Number column not found"
    ).toBeVisible();
  }

  async getGridColumnAccount() {
    await expect(
      this.gridColumnAccount,
      "Account column not found"
    ).toBeVisible();
  }

  async getGridColumnAmount() {
    await expect(
      this.gridColumnAmount,
      "Amount column not found"
    ).toBeVisible();
  }

  async getGridColumnContractDate() {
    await expect(
      this.gridColumnContractDate,
      "Contract Date column not found"
    ).toBeVisible();
  }

  async getResetFiltersButton() {
    await expect(
      this.resetFiltersButton,
      "Reset Filters Button not visible"
    ).toBeVisible();
  }

  // interact with elements

  async clickPayoffsTab() {
    await this.getPayoffsTab();
    await this.payoffsTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickRequestsTab() {
    await this.getRequestsTab();
    await this.requestsTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickForecastsTab() {
    await this.getForecastTab();
    await this.forecastTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickResetFiltersButton() {
    await this.getResetFiltersButton();
    await this.resetFiltersButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickUnapproveButton() {
    await this.getUnapproveButton();
    await this.unapproveButton.click();
    await this.page.getByRole("button", { name: "Unapprove" }).click();

    const confirmUnapprove = this.page.getByText(
      "Removed Lien Payoff Approval"
    );
    await expect(confirmUnapprove).toBeVisible();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms

  async inputSearch(text) {
    await this.getSearchBar();
    await this.searchBar.click();
    await this.searchBar.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  async inputVinNumber(text) {
    await this.getVinInput();
    await this.inputVin.click();
    await this.inputVin.fill(text);
  }

  // filter
  async inputColumnFilter(text) {
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
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

  /// columns have specific filter options

  async inputContractDateColumnFilter(text) {
    await this.getGridColumnContractDate();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").click();
    await this.page.getByRole("textbox").fill("01/01/2001");
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
  }
}
module.exports = { SaharaFlooringRequests };
