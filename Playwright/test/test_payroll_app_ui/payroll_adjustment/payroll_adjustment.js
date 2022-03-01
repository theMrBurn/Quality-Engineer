// this POM is for /Payroll/Adjustment
const { expect } = require("@playwright/test");

class PayrollAdjustment {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.adjustmentHeader = page.locator('h2:has-text("Adjustment")');
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

    // forms and grids
    /// this one is having issues, need a data-test tag
    //this.adjustmentGridDiv = page.locator('text=Add AdjustmentAdjustment Sheet Data IdEmployeeSource SystemSource FieldCalculati >> div')
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Adjustment"
    );
  }

  // get page elements

  async getAdjustmentHeader() {
    await expect(this.adjustmentHeader).toBeVisible();
  }

  async getInstructionsText() {
    await expect(this.instructionsText).toBeVisible();
  }

  async getPayrollText() {
    await expect(this.payrollText).toBeVisible();
  }

  async getCompanyText() {
    await expect(this.companyText).toBeVisible();
  }

  async getPPEdateText() {
    await expect(this.ppeDateText).toBeVisible();
  }

  async getStatusText() {
    await expect(this.statusText).toBeVisible();
  }

  async getPayrollTypeListDropdown() {
    await expect(this.payrollTypeListDropdown).toBeVisible();
  }

  async getPayGroupDropdown() {
    await expect(this.payGroupListDropdown).toBeVisible();
  }

  async getPPEdateDropdown() {
    await expect(this.ppeDateDropdown).toBeVisible();
  }

  async getStatusInput() {
    await expect(this.statusInputBox).toBeVisible();
  }

  async getLoadButton() {
    await expect(this.loadButton).toBeVisible();
  }

  async getLoadButtonNotVisible() {
    await expect(this.loadButton).toBeHidden();
  }

  async getAddAdjustmentButton() {
    await expect(this.addAdjustmentButton).toBeVisible();
  }

  // click elements
  async clickPayrollLink() {
    await this.payrollLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/adjustment"
    );
  }

  async clickPayrollTypeListDropdown() {
    await this.payrollTypeListDropdown.click();
  }

  async clickPaygroupListDropdown() {
    await this.payGroupListDropdown.click();
  }

  async clickPPEdateDropdown() {
    await this.ppeDateDropdown.click();
  }

  async clickLoadButton() {
    await this.loadButton.click();
  }

  // interact with elements

  async inputPayTypeDropdown(text) {
    await this.payrollTypeListDropdown.click();
    await this.payrollTypeListDropdown.fill(text);
    await this.payrollTypeListDropdown.press("ArrowDown");
    await this.payrollTypeListDropdown.press("Enter");
  }

  async inputCompanyDropdown(text) {
    await this.payGroupListDropdown.click();
    await this.payGroupListDropdown.fill(text);
    await this.payGroupListDropdown.press("ArrowDown");
    await this.payGroupListDropdown.press("Enter");
    const medford = await this.page.innerText("text=Medford CJD (L0004)");
    expect(medford).toBe("Medford CJD (L0004)");
  }

  async inputPPEdateDropdown(text) {
    await this.ppeDateDropdown.click();
    await this.ppeDateDropdown.fill(text);
    await this.ppeDateDropdown.press("ArrowDown");
    await this.ppeDateDropdown.press("Enter");
  }

  async inputStatusBox(text) {
    await this.statusInputBox.click();
    await this.statusInputBox.fill(text);
  }
}
module.exports = { PayrollAdjustment };
