// this POM is for Admin/Employee
const { expect } = require("@playwright/test");

class AdminEmployee {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.employeeDetailsHeader = page.locator(
      'h2:has-text("Employee Details")'
    );

    // text and lables
    this.employeeText = page.locator('label:has-text("Employee")');
    this.companyText = page.locator('label:has-text("Company")');
    this.statusText = page.locator("text=Status >> nth=0");
    this.jobText = page.locator('label:has-text("Job")');
    this.payPlanStatusText = page.locator('label:has-text("Pay Plan Status")');
    this.departmentText = page.locator('label:has-text("Department")');
    this.activeText = page.locator('label:has-text("Active")');
    this.payPlanCalculationText = page.locator("text=Pay Plan Calculation");
    this.serviceDateText = page.locator('label:has-text("Service Date")');

    /// page elements
    // inputs
    this.companyInput = page.locator('input[name="PayGroupList_input"]');
    this.statusListInput = page.locator('input[name="StatusList_input"]');
    this.jobsListInput = page.locator('input[name="JobList_input"]');
    this.payPlanStatusInput = page.locator('input[role="listbox"]');
    this.employeeInput = page.locator(
      'text=Company Employee Service Date to >> [aria-label="select"] >> nth=1'
    );
    this.departmentInput = page.locator('input[name="DepartmentList_input"]');
    this.activeInput = page.locator(
      'input[name="PayPlanCalculationList_input"]'
    );
    this.payPlanCalculationInput = page.locator(
      'input[name="PayPlanCalculationList_input"]'
    );

    // dropdowns
    this.companyDropdown = page.locator(
      'text=Company Employee Service Date to >> [aria-label="select"] >> nth=0'
    );
    this.statusDropdown = page.locator(
      'text=Status Department >> [aria-label="select"] >> nth=0'
    );
    this.jobDropdown = page.locator(
      'text=Job Active >> [aria-label="select"] >> nth=0'
    );
    this.departmentDropdown = page.locator(
      'text=Status Department >> [aria-label="select"] >> nth=1'
    );
    this.activeDropdown = page.locator(
      'text=Job Active >> [aria-label="select"] >> nth=1'
    );
    this.payPlanCalculationDropdown = page.locator(
      "div:nth-child(4) > div:nth-child(2) > div > .k-widget > .k-dropdown-wrap > .k-select"
    );
  }

  // Navigation
  async goto() {
    await this.page.goto("/Admin/EmployeeDetails");
  }

  /// get elements
  async getEmployeeDetailsHeader() {
    await expect(this.employeeDetailsHeader, "Header Not found").toBeVisible();
  }

  async getCompanyText() {
    await expect(this.companyText, "Company text not found").toBeVisible();
  }

  async getStatusText() {
    await expect(this.statusText, "Status text not found").toBeVisible();
  }

  async getJobText() {
    await expect(this.jobText, "Job text not found").toBeVisible();
  }

  async getPayPlanStatusText() {
    await expect(
      this.payPlanStatusText,
      "Pay Plan Status text not found"
    ).toBeVisible();
  }

  async getEmployeeText() {
    await expect(this.employeeText, "Employee text not found").toBeVisible();
  }

  async getDepartmentText() {
    await expect(
      this.departmentText,
      "Department text not found"
    ).toBeVisible();
  }

  async getPayPlanCalculationText() {
    await expect(
      this.payPlanCalculationText,
      "Pay Plan Calculation Text not found"
    ).toBeVisible();
  }

  async getServiceDateText() {
    await expect(
      this.serviceDateText,
      "Service Date  Text not found"
    ).toBeVisible();
  }

  async getComapanyInput() {
    await expect(this.companyInput, "Company input not found").toBeVisible();
  }

  async getStatusInput() {
    await expect(this.statusListInput, "Status input not found").toBeVisible();
  }

  async getJobInput() {
    await expect(this.jobsListInput, "Job input not found").toBeVisible();
  }

  async getPayPlanStatusInput() {
    await expect(
      this.payPlanStatusInput,
      "PayPlan Status input not found"
    ).toBeVisible();
  }

  async getEmployeeInputHidden() {
    await expect(
      this.employeeInput,
      "This should be hidden, but isn't"
    ).toBeHidden();
  }

  async getEmployeeInput() {
    await expect(
      this.employeeInput,
      "This should be visible, but isn't"
    ).toBeVisible();
  }

  async getDepartmentInput() {
    await expect(
      this.departmentInput,
      "Department input not found"
    ).toBeVisible();
  }

  async getActiveInput() {
    await expect(this.activeInput, "Active input not found").toBeVisible();
  }

  async getPayPlanCalculationInput() {
    await expect(
      this.payPlanCalculationInput,
      "PayPlan Calculation input not found"
    ).toBeVisible();
  }

  async getCompanyDropdown() {
    await expect(
      this.companyDropdown,
      "Company dropdown not found"
    ).toBeVisible();
  }

  async getStatusDropdown() {
    await expect(
      this.statusDropdown,
      "Status dropdown not found"
    ).toBeVisible();
  }

  async getJobDropdown() {
    await expect(this.jobDropdown, "Job dropdown Not found").toBeVisible();
  }

  async getDepartmentDropdown() {
    await expect(
      this.departmentDropdown,
      "Department dropdown not found"
    ).toBeVisible();
  }

  async getActiveDropdown() {
    await expect(
      this.activeDropdown,
      "Active yes/no dropdown not found"
    ).toBeVisible();
  }

  // input elements

  async clickCompanyDropdown() {
    await this.getCompanyDropdown();
    await this.companyDropdown.click();
  }

  async clickStatusDropdown() {
    await this.getStatusDropdown();
    await this.statusDropdown.click();
  }

  async clickJobDropdown() {
    await this.getJobDropdown();
    await this.jobDropdown.click();
  }

  async clickDepartmentDropdown() {
    await this.getDepartmentDropdown();
    await this.departmentDropdown.click();
  }

  async inputCompany(text) {
    await this.getEmployeeDropdown();
    await this.employeeDropdown.click();
    await this.employeeDropdown.fill(text);
  }

  // click elements
  async clickEmployeesLink() {
    await this.employeesLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanEmployee"
    );
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { AdminEmployee };
