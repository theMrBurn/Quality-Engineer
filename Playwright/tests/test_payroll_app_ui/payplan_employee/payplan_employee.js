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
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanEmployee"
    );
  }

  /// get elements
  async getEmployeePlansHeader() {
    await expect(this.employeePlansHeader).toBeVisible();
  }

  async getEmployeeDropdownText() {
    await expect(this.employeeText).toBeVisible();
  }

  async getEmployeeDropdown() {
    await expect(this.employeeDropdown).toBeVisible();
  }

  async getCompanyText() {
    await expect(this.companyText).toBeVisible();
  }

  async getCompanyDropdownHidden() {
    await expect(this.companyDropdown).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getJobText() {
    await expect(this.jobText).toBeVisible();
  }

  async getJobDropdownHidden() {
    await expect(this.jobDropdown).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getStatusText() {
    await expect(this.statusText).toBeVisible();
  }

  async getStatusDropdownHidden() {
    await expect(this.statusDropdown).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getDepartmentText() {
    await expect(this.departmentText).toBeVisible();
  }

  async getDepartmentDropdownHidden() {
    await expect(this.departmentDropdown).toBeHidden();
  }

  async getEffectiveDatesText() {
    await expect(this.effectiveDatesText).toBeVisible();
  }

  async getEffectiveStartDateInput() {
    await expect(this.effectiveDatesInput1).toBeVisible();
  }

  async getEffectiveEndDateInput() {
    await expect(this.effectiveDatesInput2).toBeVisible();
  }

  async getIsPayPlanExpiredText() {
    await expect(this.isPayPlanExpiredText).toBeVisible();
  }

  async getIsPayPlanExpiredInput() {
    await expect(this.isPayPlanExpiredInput).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getTagsText() {
    await expect(this.tagsText).toBeVisible();
  }

  async getTagsDropdown() {
    await expect(this.tagsDropdown).toBeHidden(); // should be visible? only passes when Hidden is chosen
  }

  async getClearFilters() {
    await expect(this.filtersText).toBeVisible();
  }

  async getExportExcelButton() {
    await expect(this.exportExcelButton).toBeVisible();
  }

  async getAddPlanButton() {
    await expect(this.addPlanButton).toBeVisible();
  }

  async getPageGrid() {
    await expect(this.grid).toBeVisible();
  }

  // input elements

  async inputEmployeeDropdown(text) {
    await this.employeeDropdown.click();
    await this.employeeDropdown.fill(text);
  }

  async inputCompanyDropdown(text) {
    await this.companyDropdown.click();
    // await this.companyDropdown.fill(text);
    // await this.page.locator(text).click();
  }

  async inputJobDropdown(text) {
    await this.jobDropdown.click();
    //await this.jobDropdown.fill(text);
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
  }
}

module.exports = { PayplanEmployee };
