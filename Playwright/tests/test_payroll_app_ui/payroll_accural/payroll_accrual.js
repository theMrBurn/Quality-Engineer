// this POM is for /Payroll/Accrual

const { expect } = require("@playwright/test");
class PayrollAccrual {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // header
    this.accuralHeader = page.locator('h2:has-text("Accrual")');
    // dropdowns
    this.accrualInputCompany = page.locator('input[name="PayGroupList_input"]');

    this.inputCompanyTriangle = page.locator('[aria-label="select"]');

    this.inputPPEDateDropdownTriangle = page
      .locator('[aria-label="select"]')
      .nth(1);

    this.accrualInputPPEdate = page.locator(
      'input[name="PayPeriodEndDateList_input"]'
    );

    this.inputPayFrequencyDropdownTriangle = page
      .locator('[aria-label="select"]')
      .nth(2);

    this.accrualInputPayFrequency = page.locator(
      'input[name="PayFrequencyList_input"]'
    );
    this.deletePayFrequency = page.locator(
      ".k-dropdown-wrap.k-state-default.k-state-focused > .k-icon.k-clear-value"
    );

    // Accrual Grid items
    this.accrualRunButton1 = page.locator(
      ':nth-match(td[role="gridcell"]:has-text("Run"), 2)'
    );
  }

  // Navigate to /Payroll/Accrual endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Accrual"
    );
  }

  // get elements

  async getAccrualHeader() {
    await expect(this.accuralHeader).toBeVisible();
  }

  async getAccrualInputCompany() {
    await expect(this.accrualInputCompany).toBeVisible();
  }

  async getAccrualInputPPEdate() {
    await expect(this.accrualInputPPEdate).toBeVisible();
  }

  async getAccrualInputPayFrequency() {
    await expect(this.accrualInputPayFrequency).toBeVisible();
  }

  async getAccrualRunButton1() {
    await expect(this.accrualRunButton1).toBeVisible();
  }

  // click elements
  async clickStoreInputCompany() {
    await this.storeInputCompany.click();
  }

  async clickAccrualInputCompany() {
    await this.accrualInputCompany.click();
  }

  async clickAccrualInputPPEdate() {
    await this.accrualInputPPEdate.click();
  }

  async clickAccrualInputPayFrequency() {
    await this.accrualInputPayFrequency.click();
  }

  // interact with elements

  async clickCompanyDropdown() {
    await this.inputCompanyTriangle.first().click();
  }

  async inputCompanyDropdownText(text) {
    await this.accrualInputCompany.click();
    await this.accrualInputCompany.fill(text);
  }

  async clickPPEdateDropdown() {
    await this.inputPPEDateDropdownTriangle.first().click();
  }

  async inputPPEDateDropdown(text) {
    await this.accrualInputPPEdate.click();
    await this.accrualInputPPEdate.fill(text);
  }

  async clickPayFrequencyDropdown() {
    await this.inputPayFrequencyDropdownTriangle.first().click();
  }
  async inputPayFrequencyDropdown(text) {
    await this.accrualInputPayFrequency.click();
    await this.accrualInputPayFrequency.fill(text);
    await this.accrualInputPayFrequency.press("ArrowDown");
    await this.accrualInputPayFrequency.press("Enter");
  }

  async clickDeletePayFrequency() {
    await this.deletePayFrequency.click();
  }
}

module.exports = { PayrollAccrual };
