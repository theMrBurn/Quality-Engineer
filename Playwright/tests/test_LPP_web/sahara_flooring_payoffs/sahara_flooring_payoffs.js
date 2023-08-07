// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SaharaFlooringPayoffs {
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
      "UPLOADGL POWER POSTEXPORT ZIPNEWEXPORT GRID DATA"
    );
    this.uploadsButton = page.locator("div").filter({ hasText: /^UPLOAD$/ });
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
    this.gridColumnDealNum = page.getByText("DEAL #", { exact: true });
    this.gridColumnStockNum = page.getByText("STOCK #", { exact: true });
    this.gridColumnVIN = page.getByText("VIN", { exact: true });
    this.gridColumnAccount = page.getByText("ACCOUNT", { exact: true });
    this.gridColumnRequiredPay = page.getByText("REQUIRED PAY", {
      exact: true,
    });
    this.gridColumnAmount = page.getByText("AMOUNT", { exact: true });
    this.gridColumnContractDate = page.getByText("CONTRACT DATE", {
      exact: true,
    });
    this.gridColumnCriteria = page.getByText("CRITERIA", { exact: true });

    // unique elements
    this.resetFiltersButton = page.getByRole("button", {
      name: "Reset Filters",
    });
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/flooring/payoffs");
    await this.page.waitForLoadState("load");
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

  async getUploadsButton() {
    await expect(this.uploadsButton, "Uploads Button not found").toBeVisible();
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

  async getGridDealNum() {
    await expect(this.gridColumnDealNum, "Deal Number not found").toBeVisible();
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

  async getGridColumnRequiredPay() {
    await expect(
      this.gridColumnRequiredPay,
      "Required Pay column not found"
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

  async getGridColumnCriteria() {
    await expect(
      this.gridColumnCriteria,
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

  async uploadFiles() {
    await this.uploadsButton.click();
    await this.page
      .getByTestId("file-input")
      .setInputFiles([
        "Playwright/helpers/payoffs_uploads/073123 Chrysler.csv",
        "Playwright/helpers/payoffs_uploads/073123 Ford.csv",
        "Playwright/helpers/payoffs_uploads/073123 Hyundai.csv",
        "Playwright/helpers/payoffs_uploads/073123 US Bank.csv",
        "Playwright/helpers/payoffs_uploads/GM Financial 073123.csv",
        "Playwright/helpers/payoffs_uploads/Lithia Airstream ALL Units 073123.csv",
      ]);
    await this.page.getByRole("button", { name: "Accept" }).click();
  }

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
  async inputCriteriaColumnFilter(text) {
    await this.getGridColumnCriteria();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.getByText("Filter").click();
    await this.page
      .getByRole("listbox")
      .filter({ hasText: "(All)" })
      .locator("span")
      .nth(2)
      .click();
    await this.page.getByRole("option", { name: "Pay", exact: true }).click();
    await this.page
      .getByRole("listbox")
      .filter({ hasText: "Pay" })
      .locator("span")
      .nth(2)
      .click();
    await this.page.getByRole("option", { name: "Not Pay" }).click();
    await this.page.getByRole("button", { name: "Clear" }).click();
  }

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

  async removeFPOrecords() {
    await this.page.goto("https://test.lpp.lithia.com/flooring/admin");

    // Check if the "FPO Application: LOCKED" element is visible
    const lockedButton = await this.page.isVisible(
      'text="FPO Application: LOCKED"'
    );

    if (lockedButton) {
      // If locked, click "FPO Application: UNLOCKED" to unlock
      await this.page.evaluate(() => {
        const lockedElement = document.querySelector(
          'text="FPO Application: LOCKED"'
        );
        if (lockedElement) {
          lockedElement.click();
        }
      });
    }
    await wait(5000); //
    // Proceed with the rest of the steps
    await this.page.getByRole("button", { name: "Remove FPO Records" }).click();
    await this.page
      .getByRole("button", { name: "Remove Todays Records" })
      .click();

    const message = this.page.getByText(
      "Removing todays records. Please check back in a few minutes."
    );
    await expect(message).toBeVisible();
    await wait(5000); //
    await this.page.goto("/flooring/payoffs");

    async function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }

  async amokTime(text) {
    // Set up the mock date and time within the browser context
    await this.page.evaluate(() => {
      // Replace the Date object's constructor to always return the desired date
      class MockDate extends Date {
        constructor() {
          super(text);
        }
      }
      globalThis.Date = MockDate;
    });
  }

  async uploadButtonIsUnavailable() {
    const uploadButtonSelector =
      '//*[@id="root"]/div[2]/div[2]/div[2]/div/div/div/div/div[1]/div/div/div/div/button';
    const gridElementSelector =
      '//*[@id="root"]/div[2]/div[2]/div[2]/div/div/div/div';
    await this.page.waitForLoadState("networkidle");
    // Wait for the upload button to be visible and fully loaded
    await this.page.waitForSelector(uploadButtonSelector, { state: "visible" });

    // Wait for the grid elements to be visible (indicating the grid is populated)
    try {
      await this.page.waitForSelector(gridElementSelector, {
        state: "visible",
      });
    } catch (error) {
      // If the grid elements are not found, it indicates the grid is not populated,
      // so the upload button is still available
      return false;
    }

    // If the grid elements are found, it indicates the grid is populated and the upload button is unavailable
    return true;
  }
}
module.exports = { SaharaFlooringPayoffs };
