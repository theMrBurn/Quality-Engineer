// this POM is for /Payroll/Adjustment
const { expect } = require("@playwright/test");

class PayrollAudit {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.auditHeader = page.locator('h2:has-text("Audit")');
    // unique page text

    this.companyText = page.locator('a:has-text("Company")');
    this.ppeDateText = page.locator('a:has-text("Pay Period End Date")');

    // dropdowns & inputs
    this.companyDropdown = page.locator('input[name="PayGroupList_input"]');

    this.payPPEdateDropdown = page.locator(
      'input[name="PayPeriodEndDateList_input"]'
    );

    // forms and grids
    this.dataLoadGridLabel = page.locator("text=Data Load");

    this.runDateGridLabel = page.locator("text=Run Date");

    this.completeDateGridLabel = page.locator("text=Complete Date");

    // this.runButtonGridColumn = page.locator('[id="68ecca09-20f3-4435-83f4-fa572af70b27"] .k-link'); -- needs data test tag

    this.auditDateGridLabel = page.locator("text=Audit Date");

    this.reportGridLabel = page.locator(
      'th[role="columnheader"]:has-text("Report")'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Audit"
    );
  }

  // get page elements

  async getAuditHeader() {
    await expect(this.auditHeader).toBeVisible();
  }

  async getCompanyText() {
    await expect(this.companyText).toBeVisible();
  }

  async getPPEdateText() {
    await expect(this.ppeDateText).toBeVisible();
  }

  async getCompanyDropdown() {
    await expect(this.companyDropdown).toBeVisible();
  }

  async getPPEDateDropdown() {
    await expect(this.payPPEdateDropdown).toBeVisible();
  }

  async getDataLoadGridLabel() {
    await expect(this.dataLoadGridLabel).toBeVisible();
  }

  async getRunDateGridLabel() {
    await expect(this.runDateGridLabel).toBeVisible();
  }

  async getCompleteDateGridLabel() {
    await expect(this.completeDateGridLabel).toBeVisible();
  }

  // async getRunButtonGridColumn() {
  //   await expect(this.runButtonGridColumn).toBeVisible();
  // }

  async getAuditDateGridLabel() {
    await expect(this.auditDateGridLabel).toBeVisible();
  }

  async getReportGridLabel() {
    await expect(this.reportGridLabel).toBeVisible();
  }

  // click elements
  async clickCompanyDropdown() {
    await this.companyDropdown.click();
  }

  async clickPPEdateDropdown() {
    await this.payPPEdateDropdown.click();
  }

  // interact with elements

  async inputCompanyDropdown(text) {
    await this.companyDropdown.click();
    await this.companyDropdown.fill(text);
    await this.companyDropdown.press("ArrowDown");
    await this.companyDropdown.press("Enter");
  }

  async inputPPEdateDropdown(text) {
    await this.payPPEdateDropdown.click();
    await this.payPPEdateDropdown.fill(text);
    await this.payPPEdateDropdown.press("ArrowDown");
    await this.payPPEdateDropdown.press("Enter");
  }
}
module.exports = { PayrollAudit };
