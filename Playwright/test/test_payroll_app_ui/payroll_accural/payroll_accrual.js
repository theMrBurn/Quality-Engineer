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
    this.accrualInputPPEdate = page.locator(
      'input[name="PayPeriodEndDateList_input"]'
    );
    this.accrualInputPayFrequency = page.locator(
      'input[name="PayFrequencyList_input"]'
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

  async inputCompanyDropdown(text) {
    await this.accrualInputCompany.click();
    await this.accrualInputCompany.fill(text);
    await this.accrualInputCompany.press("ArrowDown");
    await this.accrualInputCompany.press("ArrowDown");
    await this.accrualInputCompany.press("Enter");
  }

  async inputPPEDateDropdown(text) {
    await this.accrualInputPPEdate.click();
    await this.accrualInputPPEdate.fill(text);
    await this.accrualInputPPEdate.press("ArrowDown");
    await this.accrualInputPPEdate.press("ArrowDown");
    await this.accrualInputPPEdate.press("Enter");
  }

  async inputPayFrequencyDropdown(text) {
    await this.accrualInputPayFrequency.click();
    await this.accrualInputPayFrequency.fill(text);
    await this.accrualInputPayFrequency.press("ArrowDown");
    await this.accrualInputPayFrequency.press("Enter");
  }
}

module.exports = { PayrollAccrual };
