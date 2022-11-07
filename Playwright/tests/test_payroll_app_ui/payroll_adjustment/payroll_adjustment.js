// this POM is for /Payroll/Adjustment
const { expect } = require("@playwright/test");
const partialSuccess = "Playwright/helpers/ADJ L0026 08.15 Partial Success.csv";
const successTest = "Playwright/helpers/ADJ L0026 08.15 Success.csv";
const empNameMissing =
  "Playwright/helpers/ADJ L0023 10.01 Employee Name Missing.csv";
class PayrollAdjustment {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.adjustmentHeader = page.locator('h2:has-text("Adjustment")');
    this.uploadAdjustmentHeader = page.locator("text=Upload Adjustment Data");
    // unique page text
    this.instructionsText = page.locator(
      "text=Payroll Type Company Pay Period End Date Status Specify Payroll Type, Company an"
    );
    this.payrollText = page.locator('strong:has-text("Payroll Type")'); //need the 'strong:has' since there are no data-test tags
    this.companyText = page.locator('strong:has-text("Company")');
    this.ppeDateText = page.locator("text=Pay Period End Date");
    this.statusText = page.locator("text=Status");

    // buttons
    this.loadButton = page.locator('button[role="button"]:has-text("Load")');
    this.addAdjustmentButton = page.locator("text=Add Adjustment");
    this.importButton = page.locator('[data-testid="Import"]');
    this.selectFilesButton = page.locator('[data-testid="fileUpload"]');

    // dropdowns & inputs
    this.payrollTypeListDropdown = page.locator(
      'input[name="PayrollTypeList_input"]'
    );
    this.payGroupListDropdown = page.locator(
      'input[name="PayGroupList_input"]'
    );
    this.ppeDateDropdown = page.locator(
      'input[name="PayCalendarPeriodList_input"]'
    );
    this.statusInputBox = page.locator('input[name="AdjustmentSheetStatus"]');

    this.payrollTypeListDropdownTriangle = page.locator(
      "body > div.container-fluid.body-content > div.section > div:nth-child(3) > div > div > div:nth-child(1) > div > span > span > span.k-select"
    );
    this.payGroupListDropdownTriangle = page.locator(
      "body > div.container-fluid.body-content > div.section > div:nth-child(3) > div > div > div:nth-child(2) > div > span > span > span.k-select"
    );
    this.ppeDateDropdownTriangle = page.locator(
      "body > div.container-fluid.body-content > div.section > div:nth-child(3) > div > div > div:nth-child(3) > div > span > span > span.k-select"
    );

    //import files
    this.importFilesButton = page.locator('[data-testid="ImportFile"]');
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/Payroll/Adjustment");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async getAdjustmentHeader() {
    await expect(
      this.adjustmentHeader,
      "Adjustment header not found"
    ).toBeVisible();
  }

  async getInstructionsText() {
    await expect(
      this.instructionsText,
      "Instructions text not found"
    ).toBeVisible();
  }

  async getPayrollText() {
    await expect(this.payrollText, "Payroll text not found").toBeVisible();
  }

  async getCompanyText() {
    await expect(this.companyText, "Company text not found").toBeVisible();
  }

  async getPPEdateText() {
    await expect(this.ppeDateText, "PPE Date text not found").toBeVisible();
  }

  async getStatusText() {
    await expect(this.statusText, "Status text not found").toBeVisible();
  }

  async getPayrollTypeListDropdown() {
    await expect(
      this.payrollTypeListDropdown,
      "Payroll Type List not found"
    ).toBeVisible();
  }

  async getPayGroupDropdown() {
    await expect(
      this.payGroupListDropdown,
      "Paygroup Dropdown not found"
    ).toBeVisible();
  }

  async getPPEdateDropdown() {
    await expect(
      this.ppeDateDropdown,
      "PPE Date dropdown not found"
    ).toBeVisible();
  }

  async getStatusInput() {
    await expect(this.statusInputBox, "Status Input not found").toBeVisible();
  }

  async getLoadButton() {
    await expect(this.loadButton, "Load button not found").toBeVisible();
  }

  async getLoadButtonNotVisible() {
    await expect(
      this.loadButton,
      "Load Button found, should be hidden"
    ).toBeHidden();
  }

  async getAddAdjustmentButton() {
    await expect(
      this.addAdjustmentButton,
      "Adjustment button not found"
    ).toBeVisible();
  }

  async getImportButton() {
    await expect(
      this.importButton,
      "Bulk Import button not found"
    ).toBeVisible();
  }

  async getUploadAdjustmentHeader() {
    await expect(
      this.uploadAdjustmentHeader,
      "Upload Adjustment Data header not found"
    ).toBeVisible();
  }

  async getSelectFilesButton() {
    await expect(
      this.selectFilesButton,
      "Select Files button not found"
    ).toBeVisible();
  }

  async getImportFilesButton() {
    await expect(
      this.importFilesButton,
      "Import Files button not found."
    ).toBeVisible();
  }

  // click elements
  async clickPayrollTypeListDropdown() {
    await this.getPayrollTypeListDropdown();
    await this.payrollTypeListDropdownTriangle.click();
  }

  async clickPaygroupListDropdown() {
    await this.getPayGroupDropdown();
    await this.payGroupListDropdownTriangle.click();
  }

  async clickPPEdateDropdown() {
    await this.getPPEdateDropdown();
    await this.ppeDateDropdownTriangle.click();
  }

  async clickLoadButton() {
    await this.getLoadButton();
    await this.loadButton.click();
  }

  async clickImportButton() {
    await this.getImportButton();
    await this.importButton.click();
  }

  async clickImportFilesButton() {
    await this.getImportFilesButton();
    await this.importFilesButton.click();
  }

  // interact with elements

  async inputPayTypeDropdown(text) {
    await this.getPayrollTypeListDropdown();
    await this.payrollTypeListDropdown.click();
    await this.payrollTypeListDropdown.fill(text);
    await this.payrollTypeListDropdown.press("ArrowDown");
    await this.payrollTypeListDropdown.press("Enter");
  }

  async inputCompanyDropdown(text) {
    await this.getPayGroupDropdown();
    await this.payGroupListDropdown.click();
    await this.payGroupListDropdown.fill(text);
    await this.payGroupListDropdown.press("ArrowDown");
    await this.payGroupListDropdown.press("Enter");
  }

  async inputPPEdateDropdown(text) {
    await this.getPPEdateDropdown();
    await this.ppeDateDropdown.click();
    await this.ppeDateDropdown.fill(text);
    await this.ppeDateDropdown.press("ArrowDown");
    await this.ppeDateDropdown.press("Enter");
  }

  async inputStatusBox(text) {
    await this.getStatusInput();
    await this.statusInputBox.click();
    await this.statusInputBox.fill(text);
  }

  //upload methods

  async uploadPartialSuccessAdjustment() {
    await this.selectFilesButton.setInputFiles(
      ("input#file", partialSuccess),
      "Partial Success CSV, file upload failed"
    );
  }

  async uploadSuccessAdjustment() {
    await this.selectFilesButton.setInputFiles(
      ("input#file", successTest),
      "Success Test CSV, file upload failed"
    );
  }

  async uploadEmpNameMissingAdjustment() {
    await this.selectFilesButton.setInputFiles(
      ("input#file", empNameMissing),
      "Employee Name Missing CSV, file upload failed"
    );
  }
}
module.exports = { PayrollAdjustment };
