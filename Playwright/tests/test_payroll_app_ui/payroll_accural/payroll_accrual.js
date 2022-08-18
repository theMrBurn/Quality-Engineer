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
    await this.page.waitForLoadState("networkidle");
  }

  // get elements

  async getAccrualHeader() {
    await expect(this.accuralHeader, "Accrual Header not found").toBeVisible();
  }

  async getAccrualInputCompany() {
    await expect(
      this.accrualInputCompany,
      "Accrual Input Company not found"
    ).toBeVisible();
  }

  async getAccrualInputPPEdate() {
    await expect(
      this.accrualInputPPEdate,
      "Accrual Input PPE Date not found"
    ).toBeVisible();
  }

  async getAccrualInputPayFrequency() {
    await expect(
      this.accrualInputPayFrequency,
      "Accrual Input Pay Frequency not found"
    ).toBeVisible();
  }

  async getAccrualRunButton1() {
    await expect(
      this.accrualRunButton1,
      "Accrual Run button not found"
    ).toBeVisible();
  }

  async getDeltePayFrequency() {
    await expect(
      this.deletePayFrequency,
      "Delete Pay Frequency not found"
    ).toBeVisible();
  }

  async getStoreInputCompany() {
    await expect(
      this.storeInputCompany,
      "Company Store Input not found"
    ).toBeVisible();
  }

  async getPayFrequencyDropdown() {
    await expect(
      this.accrualInputPayFrequency,
      "Pay Frequency Dropdown not found"
    ).toBeVisible();
  }

  async getCompanyDropdown() {
    await expect(
      this.accrualInputCompany,
      "Company Dropdown not found"
    ).toBeVisible();
  }

  // click elements
  async clickStoreInputCompany() {
    await this.getStoreInputCompany();
    await this.storeInputCompany.click();
  }

  async clickAccrualInputCompany() {
    await this.getCompanyDropdown();
    await this.accrualInputCompany.click();
  }

  async clickAccrualInputPPEdate() {
    await this.getAccrualInputPPEdate();
    await this.accrualInputPPEdate.click();
  }

  async clickAccrualInputPayFrequency() {
    await this.getPayFrequencyDropdown();
    await this.accrualInputPayFrequency.click();
  }

  // interact with elements

  async clickCompanyDropdown() {
    await this.getCompanyDropdown();
    await this.inputCompanyTriangle.first().click();
  }

  async inputCompanyDropdownText(text) {
    await this.getCompanyDropdown();
    await this.accrualInputCompany.click();
    await this.accrualInputCompany.fill(text);
  }

  async clickPPEdateDropdown() {
    await this.getPPEdateDropdown();
    await this.inputPPEDateDropdownTriangle.first().click();
  }

  async inputPPEDateDropdown(text) {
    await this.getAccrualInputPPEdate();
    await this.accrualInputPPEdate.click();
    await this.accrualInputPPEdate.fill(text);
  }

  async clickPayFrequencyDropdown() {
    await this.getPayFrequencyDropdown();
    await this.inputPayFrequencyDropdownTriangle.first().click();
  }
  async inputPayFrequencyDropdown(text) {
    await this.getPayFrequencyDropdown();
    await this.accrualInputPayFrequency.click();
    await this.accrualInputPayFrequency.fill(text);
    await this.accrualInputPayFrequency.press("ArrowDown");
    await this.accrualInputPayFrequency.press("Enter");
  }

  async clickDeletePayFrequency() {
    await this.getDeltePayFrequency();
    await this.deletePayFrequency.click();
  }
}

module.exports = { PayrollAccrual };
