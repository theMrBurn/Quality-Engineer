// this POM is for /Payplans/Dashboard
const { expect } = require("@playwright/test");

class PayplanEmployee {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.employeePlansHeader = page.locator("text=Employee Pay Plans");

    // text and lables
    this.employeeText = page.locator('label:has-text("Employee")');
    this.companyText = page.locator('label:has-text("Company")');
    this.jobText = page.locator('label:has-text("Job")');
    this.statusText = page.locator('label:has-text("Status")');
    this.departmentText = page.locator('label:has-text("Department")');
    this.effectiveDatesText = page.locator('label:has-text("Effective Dates")');
    this.isPayPlanExpiredText = page.locator(
      'label:has-text("Is Pay Plan Expired")'
    );
    this.tagsText = page.locator('label:has-text("Tags")');
    this.filtersText = page.locator("text=Clear Filters");

    // page elements
    this.employeeDropdown = page.locator('input[name="EmployeeList_input"]');
    // this.companyDropdown = page.locator('//*[@id="PayGroupList_taglist"]');
    this.companyDropdown = page.locator(
      'text=Company Anchorage CJD (L0106)Anchorage Hyundai (L0127)Anchorage BMW (L0154)Ancho >> div[role="listbox"]'
    );
    //this.jobDropdown = page.locator('input[name="JobList_taglist"]');
    this.jobDropdown = page.locator(
      'text=Job Accessory Sales Manager (90143)Accountant (51001)Accountant Associate (50001 >> input[role="listbox"]'
    );
    this.statusDropdown = page.locator('input[name="StatusList_taglist"]');
    this.departmentDropdown = page.locator('input[name="DepartmentList"]');
    this.effectiveDatesInput1 = page.locator(
      'input[name="EffectiveStartDate"]'
    );
    this.effectiveDatesInput2 = page.locator('input[name="EffectiveEndDate"]');

    this.complianceRiskExceptionCount = page.locator(
      '//*[@id="ComplianceRiskExceptionCount"]'
    );

    this.tagsDropdown = page.locator('input[name="TagList_taglist"]');
    this.exportExcelButton = page.locator("text=Export to Excel");
    this.addPlanButton = page.locator("text=Add Plan");

    this.grid = page.locator('//*[@id="grid"]');

    // inputs

    this.expirationDateInput = page.locator(
      'input[name="PlanStatusMonthPicker"]'
    );

    this.isPayPlanExpiredInput = page.locator(
      'input[id="IsPayPlanExpiredList_listbox"]'
    );
  }

  // Navigation
  async goto() {
    await this.page.goto("/PayPlan/PayPlanEmployee");
  }

  /// get elements
  async getEmployeePlansHeader() {
    await expect(
      this.employeePlansHeader,
      "Employee Plans Header not found"
    ).toBeVisible();
  }

  async getEmployeeDropdownText() {
    await expect(
      this.employeeText,
      "Employee Dropdown text not found"
    ).toBeVisible();
  }

  async getEmployeeDropdown() {
    await expect(
      this.employeeDropdown,
      "Employee Dropdown not found"
    ).toBeVisible();
  }

  async getCompanyText() {
    await expect(this.companyText, "Company text not found").toBeVisible();
  }

  async getCompanyDropdownHidden() {
    await expect(
      this.companyDropdown,
      "Company Dropdown is visible when it should be hidden"
    ).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getJobText() {
    await expect(this.jobText, "Job text not found").toBeVisible();
  }

  async getJobDropdownHidden() {
    await expect(
      this.jobDropdown,
      "Job Dropdown is visible when it should be hidden"
    ).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getStatusText() {
    await expect(this.statusText, "Status text not found").toBeVisible();
  }

  async getStatusDropdownHidden() {
    await expect(
      this.statusDropdown,
      "Status Dropdown visible when it should be hidden"
    ).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getDepartmentText() {
    await expect(
      this.departmentText,
      "Department text not found"
    ).toBeVisible();
  }

  async getDepartmentDropdownHidden() {
    await expect(
      this.departmentDropdown,
      "Department Dropdown visible when it should be hidden"
    ).toBeHidden();
  }

  async getEffectiveDatesText() {
    await expect(
      this.effectiveDatesText,
      "Effective Dates text not found"
    ).toBeVisible();
  }

  async getEffectiveStartDateInput() {
    await expect(
      this.effectiveDatesInput1,
      "Effective Start Date input not found"
    ).toBeVisible();
  }

  async getEffectiveEndDateInput() {
    await expect(
      this.effectiveDatesInput2,
      "Effective Date Input not found"
    ).toBeVisible();
  }

  async getIsPayPlanExpiredText() {
    await expect(
      this.isPayPlanExpiredText,
      "Is Payplan Expired text not found"
    ).toBeVisible();
  }

  async getIsPayPlanExpiredInput() {
    await expect(
      this.isPayPlanExpiredInput,
      "Is Pay Plan Expiried is visible should be hidden"
    ).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getTagsText() {
    await expect(this.tagsText, "Tags text not found").toBeVisible();
  }

  async getTagsDropdown() {
    await expect(
      this.tagsDropdown,
      "Tags dropdown is visible, should be hidden"
    ).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getClearFilters() {
    await expect(this.filtersText, "Clear Filters not found").toBeVisible();
  }

  async getExportExcelButton() {
    await expect(
      this.exportExcelButton,
      "Export Excel Button not found"
    ).toBeVisible();
  }

  async getAddPlanButton() {
    await expect(this.addPlanButton, "Add Plan Button not found").toBeVisible();
  }

  async getPageGrid() {
    await expect(this.grid, "Page Grid not found").toBeVisible();
  }

  // input elements

  async inputEmployeeDropdown(text) {
    await this.getEmployeeDropdown();
    await this.employeeDropdown.click();
    await this.employeeDropdown.fill(text);
  }

  async inputCompanyDropdown() {
    await this.companyDropdown.click();
  }

  async inputJobDropdown() {
    await this.jobDropdown.click();
  }

  async inputExpirationDate1(month, year) {
    await this.expirationDateInput.click();
    await this.expirationDateInput.fill(month);
    await this.expirationDateInput.fill(year);
  }

  async inputExpirationDate2(month, year) {
    await this.expirationDateInput.click();
    await this.expirationDateInput.fill(month);
    await this.expirationDateInput.fill(year);
  }

  async inputEffectiveDate(month, year) {
    await this.expirationDateInput.click();
    await this.expirationDateInput.fill(month);
    await this.expirationDateInput.fill(year);
  }

  async inputPayCalendarDropdown(text) {
    await this.payCalendarInput.click();
    await this.payCalendarInput.fill(text);
    await this.payCalendarInput.press("ArrowDown");
    await this.payCalendarInput.press("Enter");
  }

  async inputPPEdateDropdown(text) {
    await this.ppeDateInput.click();
    await this.ppeDateInput.fill(text);
    await this.ppeDateInput.press("ArrowDown");
    await this.ppeDateInput.press("Enter");
  }

  async inputIsPayPlanExpiredDropdown() {
    await this.isPayPlanExpiredInput.click();
  }

  // click elements
  async clickEmployeesLink() {
    await this.employeesLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanEmployee"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async clickClearFilters() {
    await this.filtersText.click();
  }

  async clickExportExcelButton() {
    await this.exportExcelButton.click();
  }

  async clickAddPlanButton() {
    await this.addPlanButton.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PlanDetails?id=0&payPlanUsage=Employee"
    );
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { PayplanEmployee };
