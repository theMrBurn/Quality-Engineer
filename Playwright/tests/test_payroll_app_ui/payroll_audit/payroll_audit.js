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

    this.ppeDateDropdownTriangle = page.locator(
      '[aria-label="select"] >> nth=1'
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

  // Navigate
  async goto() {
    await this.page.goto("/Payroll/Audit");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async getAuditHeader() {
    await expect(this.auditHeader, "Audit header not found").toBeVisible();
  }

  async getCompanyText() {
    await expect(this.companyText, "Company text not found").toBeVisible();
  }

  async getPPEdateText() {
    await expect(this.ppeDateText, "PPE Date text not found").toBeVisible();
  }

  async getCompanyDropdown() {
    await expect(
      this.companyDropdown,
      "Company dropdown not found"
    ).toBeVisible();
  }

  async getPPEDateDropdown() {
    await expect(
      this.payPPEdateDropdown,
      "PPE Date dropdown not found"
    ).toBeVisible();
  }

  async getDataLoadGridLabel() {
    await expect(
      this.dataLoadGridLabel,
      "Data Load grid label not found"
    ).toBeVisible();
  }

  async getRunDateGridLabel() {
    await expect(
      this.runDateGridLabel,
      "Run Date grid label not found"
    ).toBeVisible();
  }

  async getCompleteDateGridLabel() {
    await expect(
      this.completeDateGridLabel,
      "Complete Date grid label not found"
    ).toBeVisible();
  }

  async getAuditDateGridLabel() {
    await expect(
      this.auditDateGridLabel,
      "Audit Date grid label not found"
    ).toBeVisible();
  }

  async getReportGridLabel() {
    await expect(
      this.reportGridLabel,
      "Report grid label not found"
    ).toBeVisible();
  }

  // click elements
  async clickCompanyDropdown() {
    await this.getCompanyDropdown();
    await this.companyDropdown.click();
  }

  async clickPPEdateDropdown() {
    await this.getPPEDateDropdown();
    await this.ppeDateDropdownTriangle.click();
  }

  // interact with elements

  async inputCompanyDropdown(text) {
    await this.getCompanyDropdown();
    await this.companyDropdown.click();
    await this.companyDropdown.fill(text);
  }

  async inputPPEdateDropdown(text) {
    await this.getPPEDateDropdown();
    await this.clickPPEdateDropdown();
    await this.payPPEdateDropdown.fill(text);
  }
}
module.exports = { PayrollAudit };
