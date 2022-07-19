// this POM is for /Admin
const { expect } = require("@playwright/test");

class Admin {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.adminPageHeader = page.locator('h2:has-text("Legal Explanation")');

    // unique page text
    this.gridNameText = page.locator("text=Grid Name");
    this.categotyText = page.locator('label:has-text("Category")');
    this.legalExplanationText = page.locator("text=Legal Explanation Text");
    this.startDateText = page.locator('label:has-text("Start Date")');
    this.endDateText = page.locator('label:has-text("End Date")');

    // buttons, dropdowns and input boxes
    this.newLegalButton = page.locator("text=New Legal Explanation");
    this.categoryDropdownTriangle = page.locator(
      '[aria-label="select"] >> nth=0'
    );
    this.legalExplanationInput = page.locator('input[name="SearchTextBox"]');

    this.positionTypeDefinitions = page.locator(
      'li[role="option"]:has-text("Position Type Definitions")'
    );

    this.dataTypeDefinitions = page.locator(
      'li[role="option"]:has-text("Data Type Definitions")'
    );

    this.startDatePicker = page.locator('input[name="StartDatePicker"]');
    this.endDatePicker = page.locator('input[name="EndDatePicker"]');

    this.cancelButton = page.locator("text=Cancel");

    // forms and grids
    this.nameGridColumn = page.locator("text=Name");
    this.categoryGridColumn = page.locator('a:has-text("Category")');
    this.legalExplanationGridColumn = page.locator(
      '#LegalExplanationGrid div:has-text("New Legal Explanation")'
    );
    this.startDateGridColumn = page.locator('a:has-text("Start Date")');
    this.endDateGridColumn = page.locator('a:has-text("End Date")');
    this.startDateGridInput = page.locator('//*[@id="StartDate"]');
    this.endDateGridInput = page.locator('//*[@id="EndDate"]');
    this.gridNameInput = page.locator('input[name="Name"]');
    this.gridCategoryInput = page.locator('input[name="Category"]');

    // calendar elements
    this.startDateCalendar = this.expirationDateCalendar1 = page.locator(
      '[aria-label="select"] >> nth=1'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("https://azwu2apweb-test.azurewebsites.net/Admin");
  }

  // get page elements

  async getAdminPageHeader() {
    await expect(
      this.adminPageHeader,
      "Admin Page header not found"
    ).toBeVisible();
  }

  async getCategotyText() {
    await expect(this.categotyText, "Category Text not found").toBeVisible();
  }

  async getLegalExplanationText() {
    await expect(
      this.legalExplanationText,
      "Legal Explanation Text not found"
    ).toBeVisible();
  }

  async getStartDateText() {
    await expect(this.startDateText, "Start Date Text not found").toBeVisible();
  }

  async getEndDateText() {
    await expect(this.endDateText, "End Date Text not found").toBeVisible();
  }

  async getNewLegalButton() {
    await expect(
      this.newLegalButton,
      "New Legal Explanation Button not found "
    ).toBeVisible();
  }

  async getCategoryDropdown() {
    await expect(
      this.categoryDropdownTriangle,
      "Category Dropdown not found"
    ).toBeVisible();
  }

  async getLegalExplanationInput() {
    await expect(
      this.legalExplanationInput,
      "Legal Explanation Input not found"
    ).toBeVisible();
  }

  async getLegalExplanationGridColumn() {
    await expect(
      this.legalExplanationGridColumn,
      "Legal Explanation Grid Column not found"
    ).toBeVisible();
  }

  async getNameGridColumn() {
    await expect(
      this.nameGridColumn,
      "Name grid column not found"
    ).toBeVisible();
  }

  async getCategoryGridColumn() {
    await expect(
      this.categoryGridColumn,
      "Category Grid Column not found"
    ).toBeVisible();
  }

  async getStartDateGridColumn() {
    await expect(
      this.startDateGridColumn,
      "Start Date Grid column not found"
    ).toBeVisible();
  }

  async getEndDateGridColumn() {
    await expect(
      this.endDateGridColumn,
      "End Date Grid Column not found"
    ).toBeVisible();
  }

  async getPositionTypeDefinitionsOption() {
    await expect(
      this.positionTypeDefinitions,
      "Position Type Definitions drop down option not found"
    ).toBeVisible();
  }

  async getDataTypeDefinitionsOption() {
    await expect(
      this.dataTypeDefinitions,
      "Data Type Definitions drop down option not found"
    ).toBeVisible();
  }

  async getLegalExplanationInputBox() {
    await expect(
      this.legalExplanationInput,
      "Legal Explanation Input box not found"
    ).toBeVisible();
  }

  async getStartDateCalendar() {
    await expect(
      this.startDateCalendar,
      "Start Date Calendar not found"
    ).toBeVisible();
  }

  async getNameInputGrid() {
    await expect(
      this.gridNameInput,
      "Input Name on new Legal Explanation, not found"
    ).toBeVisible();
  }

  async getCategoryInputGrid() {
    await expect(
      this.gridCategoryInput,
      "Input Category on new Legal Explanation, not found"
    ).toBeVisible();
  }

  async getCancelButton() {
    await expect(this.cancelButton, "Cancel Button not found").toBeVisible();
  }

  async getStartDateGridInput() {
    await expect(
      this.startDateGridInput,
      "Start Date input on Grid, not found"
    ).toBeVisible();
  }

  async getEndDateGridInput() {
    await expect(
      this.endDateGridInput,
      "End Date input on Grid, not found"
    ).toBeVisible();
  }

  // interact with elements

  async clickCategoryDropdown() {
    await this.getCategoryDropdown();
    await this.categoryDropdownTriangle.click();
  }

  async clickPositionTypeDefinitions() {
    await this.getPositionTypeDefinitionsOption();
    await this.positionTypeDefinitions.click();
  }

  async clickDataTypeDefinitions() {
    await this.getDataTypeDefinitionsOption();
    await this.dataTypeDefinitions.click();
  }

  async clickStartDate() {
    await this.getStartDateCalendar();
    await this.startDateCalendar.click();
  }

  async clickNewLegalButton() {
    await this.getNewLegalButton();
    await this.newLegalButton.click();
  }

  async clickCancelButton() {
    await this.getCancelButton();
    await this.cancelButton.click();
  }

  // input elements and forms

  async inputLegalExplanation(text) {
    await this.getLegalExplanationInputBox();
    await this.legalExplanationInput.fill(text);
  }

  async inputStartDatePicker(text) {
    await this.getStartDateCalendar();
    await this.startDatePicker.fill(text);
  }

  async inputEndDatePicker(text) {
    await this.getStartDateCalendar();
    await this.endDatePicker.fill(text);
  }

  async inputNewName(text) {
    await this.getNameInputGrid();
    await this.gridNameInput.fill(text);
  }

  async inputNewCategory(text) {
    await this.getCategoryInputGrid();
    await this.gridCategoryInput.fill(text);
  }

  async inputStartDateGrid(text) {
    await this.getStartDateGridInput();
    await this.startDateGridInput.fill(text);
  }

  async inputEndDateGrid(text) {
    await this.getEndDateGridInput();
    await this.endDateGridInput.fill(text);
  }
}
module.exports = { Admin };
