// this POM is for /Payplan/PayplanTemplate
const { expect } = require("@playwright/test");

class PayplanTemplate {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.payplanTemplateHeader = page.locator("text=Pay Plan Templates");
    this.editTemplatePageHeader = page.locator("text=Edit Pay Plan Template");

    // page elements
    this.footerNameText = page.locator('label:has-text("Footer Name")');
    this.jobText = page.locator('label:has-text("Job")');
    this.departmentText = page.locator('label:has-text("Department")');
    this.stateText = page.locator('label:has-text("State")');
    this.positionTypeText = page.locator("text=Position Type");
    this.payplanTypeText = page.locator('label:has-text("Plan Type")');
    this.templateNameText = page.locator('label:has-text("Template Name")');
    this.payRateTypeText = page.locator('label:has-text("Pay Rate Type")');

    // grid elements
    this.gridAddTemplateElement = page.locator(
      '#grid div:has-text("Add Template")'
    );
    this.gridPayPlanIDColumn = page.locator("text=Plan Id");
    this.gridTemplateNameColumn = page.locator('a:has-text("Template Name")');
    this.gridJobColumn = page.locator("text=Job >> nth=3");
    this.gridEmpStatusColumn = page.locator("text=Emp. Status >> nth=1");
    this.gridDepartmentColumn = page.locator("text=Department >> nth=2");
    this.gridStateColumn = page.locator('a:has-text("State")');
    this.gridPositionTypeColumn = page.locator("text=Postion Type");
    this.gridPlanTypesColumn = page.locator("text=Plan Types");
    this.gridPayRateTypeColumn = page.locator('a:has-text("Pay Rate Type")');
    this.gridPortableColumn = page.locator("text=Proratable");
    this.gridUpdatedByColumn = page.locator("text=Updated By");
    this.gridUpdatedOnColumn = page.locator("text=Updated On");

    // page alerts
    this.saveConfirmationAlert = page.locator("#divSuccessHolder");

    // buttons
    this.addTemplateButton = page.locator("text=Add Template");
    this.clearFiltersButton = page.locator("text=Clear Filters");
    this.editButton = page.locator("text=Edit");
    this.saveButton = page.locator("text=Save");
    this.deleteButton = page.locator("text=Delete");
    this.backButton = page.locator("text=Back");
    this.deleteInput = page.locator('[aria-label="delete"]');

    // inputs
    this.jobInput = page.locator('input[aria-describedby="JobList_taglist"]');
    this.departmentInput = page.locator(
      'input[aria-describedby="DepartmentList_taglist"]'
    );
    this.stateInput = page.locator(
      'input[aria-describedby="StateList_taglist"]'
    );

    //position type
    this.positionTypeDropdown = page.locator(
      'input[name="PositionTypeList_input"]'
    );
    this.positionTypeTriangle = page.locator('[aria-label="select"] >> nth=0');
    this.positionTypeDelete = page.locator(
      ".k-dropdown-wrap .k-icon.k-clear-value"
    );

    //plan type
    this.planTypeDropdown = page.locator('input[name="PlanTypeList_input"]');
    this.planTypeDropdownTriangle = page
      .locator('[aria-label="select"]')
      .nth(1);
    this.planTypeDelete = page.locator(
      ".k-dropdown-wrap.k-state-default.k-state-focused .k-icon.k-clear-value"
    );

    //template name
    this.templateNameDropdown = page.locator('input[name="NameList_input"]');

    //pay rate type
    this.payRateTypeDropdown = page.locator(
      'input[name="PayRateTypeList_input"]'
    );

    this.payRateTypeDropdownTriangle = page
      .locator('[aria-label="select"]')
      .nth(3);

    this.payRateTypeDelete = page.locator(
      ".k-dropdown-wrap.k-state-default.k-state-focused .k-icon.k-clear-value"
    );
  }

  // Navigation
  async goto() {
    await this.page.goto("/PayPlan/PayPlanTemplate");
    await this.page.waitForLoadState("networkidle");
  }

  /// get elements
  async getPayPlanTemplateHeader() {
    await expect(this.payplanTemplateHeader).toBeVisible();
  }

  async getGridIsVisible() {
    await expect(this.gridAddTemplateElement).toBeVisible();
  }

  async getJobText() {
    await expect(this.jobText).toBeVisible();
  }

  async getDepartmentText() {
    await expect(this.departmentText).toBeVisible();
  }

  async getStateText() {
    await expect(this.stateText).toBeVisible();
  }

  async getPositionTypeText() {
    await expect(this.positionTypeText).toBeVisible();
  }

  async getPayPlanTypeText() {
    await expect(this.payplanTypeText).toBeVisible();
  }

  async getTemplateNameText() {
    await expect(this.templateNameText).toBeVisible();
  }

  async getPayRateTypeText() {
    await expect(this.payRateTypeText).toBeVisible();
  }

  async getGridPlanID() {
    await expect(this.gridPayPlanIDColumn).toBeVisible();
  }

  async getGridTemplateNameColumn() {
    await expect(this.gridTemplateNameColumn).toBeVisible();
  }

  async getGridJobColumn() {
    await expect(this.gridJobColumn).toBeVisible();
  }

  async getGridEmpStatusColumn() {
    await expect(this.gridEmpStatusColumn).toBeVisible();
  }

  async getGridDepartmentColumn() {
    await expect(this.gridDepartmentColumn).toBeVisible();
  }

  async getGridStateColumn() {
    await expect(this.gridStateColumn).toBeVisible();
  }

  async getGridPositionTypeColumn() {
    await expect(this.gridPositionTypeColumn).toBeVisible();
  }

  async getGridPlanTypesColumn() {
    await expect(this.gridPlanTypesColumn).toBeVisible();
  }

  async getGridPayRateTypeColumn() {
    await expect(this.gridPayRateTypeColumn).toBeVisible();
  }

  async getGridPortableColumn() {
    await expect(this.gridPortableColumn).toBeVisible();
  }

  async getGridUpdatedByColumn() {
    await expect(this.gridUpdatedByColumn).toBeVisible();
  }

  async getGridUpdatedOnColumn() {
    await expect(this.gridUpdatedOnColumn).toBeVisible();
  }

  async getSaveConfirmationAlert() {
    await expect(this.saveConfirmationAlert).toBeVisible();
  }

  async getAddTemplateButton() {
    await expect(this.addTemplateButton).toBeVisible();
  }

  async getClearFiltersButton() {
    await expect(this.clearFiltersButton).toBeVisible();
  }

  async getEditButton() {
    await expect(this.editButton).toBeVisible();
  }

  async getSaveButton() {
    await expect(this.saveButton).toBeVisible();
  }

  async getDeleteButton() {
    await expect(this.deleteButton).toBeVisible();
  }

  async getBackButton() {
    await expect(this.backButton).toBeVisible();
  }

  async getJobInput() {
    await expect(this.jobInput).toBeVisible();
  }

  async getDepartmentInput() {
    await expect(this.departmentInput).toBeVisible();
  }

  async getStateInput() {
    await expect(this.stateInput).toBeVisible();
  }

  async getPositionTypeDropdown() {
    await expect(this.positionTypeDropdown).toBeVisible();
  }

  async getPlanTypeDropdown() {
    await expect(this.planTypeDropdown).toBeVisible();
  }

  async getTemplateNameDropdown() {
    await expect(this.templateNameDropdown).toBeVisible();
  }

  async getPayRateTypeDropdown() {
    await expect(this.payRateTypeDropdown).toBeVisible();
  }

  async getDeleteInput() {
    await expect(
      this.deleteInput,
      "Delete Input from Dropdown not found"
    ).toBeVisible();
  }

  // input elements

  async inputJob(text) {
    await this.getJobInput();
    await this.jobInput.click();
    await this.jobInput.fill(text);
    await this.jobInput.fill("Arrow Down");
    await this.jobInput.press("Enter");
  }

  async inputDepartment(text) {
    await this.getDepartmentInput();
    await this.departmentInput.click();
    await this.departmentInput.fill(text);
    await this.departmentInput.fill("Arrow Down");
    await this.departmentInput.press("Enter");
  }

  async inputState(text) {
    await this.getStateInput();
    await this.stateInput.click();
    await this.stateInput.fill(text);
    await this.stateInput.fill("Arrow Down");
    await this.stateInput.press("Enter");
  }

  async inputPositionTypeDropdown() {
    await this.getPositionTypeDropdown();
    await this.positionTypeTriangle.first().click();
  }

  async deletePositionTypeDropdown() {
    await this.getPositionTypeDropdown();
    await this.positionTypeDelete.first().click();
  }

  async inputPlanTypeDropdown() {
    await this.getPlanTypeDropdown();
    await this.planTypeDropdownTriangle.first().click();
  }

  async deletePlanTypeDropdown() {
    await this.getPlanTypeDropdown();
    await this.planTypeDelete.first().click();
  }

  async inputTemplateNameDropdown(text) {
    await this.getTemplateNameDropdown();
    await this.templateNameDropdown.click();
    await this.templateNameDropdown.fill(text);
  }

  async deleteTemplateNameDropdown() {
    await this.getTemplateNameDropdown();
    await this.templateNameDelete.first().click();
  }

  async inputPayRateTypeDropdown(text) {
    await this.getPayRateTypeDropdown();
    await this.templateNameDropdown.click();
    await this.templateNameDropdown.fill(text);
  }

  async inputPayRateTypeTriangle() {
    await this.getPayRateTypeDropdown();
    await this.payRateTypeDropdownTriangle.first().click();
  }

  async deletePayRateType() {
    await this.getPayRateTypeDropdown();
    await this.payRateTypeDelete.click();
  }

  async clickDeleteInput() {
    await this.getDeleteInput();
    await this.deleteInput.click();
  }

  // click elements
  async clickEditButton() {
    await this.getEditButton();
    await this.editButton.click();
  }

  async clickSaveButton() {
    await this.getSaveButton();
    await this.saveButton.click();
  }

  async clickBackButton() {
    await this.getBackButton();
    await this.backButton.click();
  }

  async clickAddTemplate() {
    // Click text=Add Template
    await this.getAddTemplateButton();
    await this.addTemplateButton.click();
  }
}

module.exports = { PayplanTemplate };
