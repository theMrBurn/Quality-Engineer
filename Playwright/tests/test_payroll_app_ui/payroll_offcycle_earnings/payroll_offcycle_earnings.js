// this POM is for /Payroll/Offcycleearnings
const { expect } = require("@playwright/test");

class PayrollOffCycleEarnings {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.offcycleHeader = page.locator('h2:has-text("Off-Cycle Earnings")');

    // unique page text
    this.companyText = page.locator('label:has-text("Company")');
    this.statusText = page.locator('label:has-text("Status")');
    this.employeeText = page.locator('label:has-text("Employee")');
    this.ppeDateText = page.locator('label:has-text("Pay Period End Date")');
    this.costCenterText = page.locator(
      'label:has-text("Cost Center (Department)")'
    );
    this.offCycleInfoText = page.locator(
      "text=Specify an Employee to create an off-cycle check Search"
    );

    // dropdowns & inputs
    this.companyDropdown = page.locator('input[name="PayGroupList_input"]');

    this.employeeDropdown = page.locator('input[name="EmployeeList_input"]');

    this.payFrequencyDropdown = page.locator(
      'input[name="PayCalendarList_input"]'
    );

    this.ppeDateDropdown = page.locator('input[name="PayCalendarPeriodList"]');

    this.jobTitleDropdown = page.locator('input[name="JobList_input"]');

    this.costCenterDropdown = page.locator(
      'input[name="DepartmentList_input"]'
    );

    this.statusDropdown = page.locator('input[name="StatusList_input"]');

    this.typeDropdown = page.locator('input[name="TypeList_input"]');

    // buttons
    this.searchButton = page.locator(
      'button[role="button"]:has-text("Search")'
    );

    this.ppeDateDropdownTriangle = page.locator(
      'text=Pay Frequency Pay Period End Date >> [aria-label="select"] >> nth=1'
    );

    // forms and grids
    this.dataLoadGridLabel = page.locator("text=Data Load");

    this.reportGridLabel = page.locator(
      'th[role="columnheader"]:has-text("Report")'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/OffCycleEarnings"
    );
    await this.page.waitForLoadState("networkidle");
  }

  /// get page elements

  // get text lables
  async getOffcycleHeader() {
    await expect(
      this.offcycleHeader,
      "Off Cycle header not found"
    ).toBeVisible();
  }

  async getCompanyText() {
    await expect(
      this.companyText,
      "Company text not found on page"
    ).toBeVisible();
  }

  async getStatusText() {
    await expect(
      this.statusText,
      "Status text not found on page"
    ).toBeVisible();
  }

  async getEmployeeText() {
    await expect(
      this.employeeText,
      "Employee text not found on page"
    ).toBeVisible();
  }

  async getPPEdateText() {
    await expect(
      this.ppeDateText,
      "PPE Date text not found on page"
    ).toBeVisible();
  }

  async getCostCenterText() {
    await expect(
      this.costCenterText,
      "Cost Center text not found on page"
    ).toBeVisible();
  }

  async getOffCycleInfoText() {
    await expect(
      this.offCycleInfoText,
      "Off Cycle info text not found on page"
    ).toBeVisible();
  }

  // get dropdowns
  async getCompanyDropdown() {
    await expect(
      this.companyDropdown,
      "Company dropdown not found"
    ).toBeVisible();
  }

  async getPayFrequencyDropdown() {
    await expect(
      this.payFrequencyDropdown,
      "Pay Frequency Dropdown not found"
    ).toBeVisible();
  }

  async getEmployeeDropdown() {
    await expect(
      this.employeeDropdown,
      "Employee Dropdown not found"
    ).toBeVisible();
  }

  async getPPEdateDropdownHidden() {
    await expect(
      this.ppeDateDropdown,
      "PPE Date Dropdown found, when it should be hidden"
    ).toBeHidden();
  } // use this in element validation test

  async getPPEdateDropdown() {
    await expect(
      this.ppeDateDropdown,
      "PPE Date Dropdown not found"
    ).toBeVisible();
  } // use this in functional smoke check when PPE date has been entered in a previous test step

  async getPPEdateDropdownTriangle() {
    await expect(
      this.ppeDateDropdownTriangle,
      "PPE Date Dropdown triangle not found"
    ).toBeVisible();
  }

  async getJobTitleDropdown() {
    await expect(
      this.jobTitleDropdown,
      "Job Title dropdown not found"
    ).toBeVisible();
  }

  async getStatusDropdown() {
    await expect(
      this.statusDropdown,
      "Status Dropdown not found"
    ).toBeVisible();
  }

  async getCostCenterDropdown() {
    await expect(
      this.costCenterDropdown,
      "Cost Center Dropdown not found"
    ).toBeVisible();
  }

  async getTypeDropdown() {
    await expect(this.typeDropdown, "Type Dropdown").toBeVisible();
  }

  // get buttons
  async getSearchButton() {
    await expect(this.searchButton, "Search Button").toBeVisible();
  }

  // interact with elements

  async inputCompanyDropdown(text) {
    await this.getCompanyDropdown();
    await this.companyDropdown.click();
    await this.companyDropdown.fill(text);
    await this.companyDropdown.click();
  }

  async clickPPEDateDropdown() {
    await this.getPPEdateDropdownTriangle();
    await this.ppeDateDropdownTriangle.click();
  }

  async clickSearchButton() {
    await this.getSearchButton();
    await this.searchButton.click();
  }

  async inputEmployeeDropdown(text) {
    await this.getEmployeeDropdown();
    await this.employeeDropdown.click();
    await this.employeeDropdown.fill(text);
    await this.employeeDropdown.click(text);
  }

  async inputPayFrequencyDropdown(text) {
    await this.getPayFrequencyDropdown();
    await this.payFrequencyDropdown.click();
    await this.payFrequencyDropdown.fill(text);
    await this.payFrequencyDropdown.press("ArrowDown");
    await this.payFrequencyDropdown.press("Enter");
  }

  async inputPPEdateDropdown(text) {
    await this.getPPEdateDropdown();
    await this.ppeDateDropdown.click();
    await this.ppeDateDropdown.fill(text);
    await this.ppeDateDropdown.press("ArrowDown");
    await this.ppeDateDropdown.press("Enter");
  }

  async inputJobTitleDropdown(text) {
    await this.getJobTitleDropdown();
    await this.jobTitleDropdown.click();
    await this.jobTitleDropdown.fill(text);
    await this.jobTitleDropdown.press("ArrowDown");
    await this.jobTitleDropdown.press("Enter");
  }

  async inputCostCenterDropdown(text) {
    await this.getCostCenterDropdown();
    await this.costCenterDropdown.click();
    await this.costCenterDropdown.fill(text);
    await this.costCenterDropdown.press("ArrowDown");
    await this.costCenterDropdown.press("Enter");
  }

  async inputStatusDropdown(text) {
    await this.getStatusDropdown();
    await this.statusDropdown.click();
    await this.statusDropdown.fill(text);
    await this.statusDropdown.press("ArrowDown");
    await this.statusDropdown.press("Enter");
  }

  async inputTypeDropdown(text) {
    await this.getTypeDropdown();
    await this.typeDropdown.click();
    await this.typeDropdown.fill(text);
    await this.typeDropdown.press("ArrowDown");
    await this.typeDropdown.press("Enter");
  }
}
module.exports = { PayrollOffCycleEarnings };
