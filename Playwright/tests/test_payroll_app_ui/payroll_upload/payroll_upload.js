// this POM is for /Payroll/Upload
const { expect } = require("@playwright/test");
const timecard = "Playwright/helpers/TIMECARD.csv";
class PayrollUpload {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // text
    this.payrollUploadText = page.locator("text=Payroll File Upload");
    this.payCalendarText = page.locator('label:has-text("Pay Calendar")');
    this.ppeDateUploadText = page.locator(
      "#fileUpload >> text=Pay Period End Date"
    );
    this.accountingMonthDate = page.locator("text=Accounting Month Date");
    this.uploadTimecardText = page.locator("text=Upload Timecard");
    this.uploadButtonText = page.locator(
      "text=Select FileDrop files here to upload"
    );

    this.payrollProcessingTasksText = page.locator(
      "text=Payroll Processing Tasks"
    );

    this.taskText = page.locator('label:has-text("Task")');

    // dropdowns
    this.paycalendarListDropdown = page.locator(
      'input[name="PayCalendarList_input"]'
    );
    this.ppeDateDropdown = page.locator(
      'input[name="PayPeriodEndDateList_input"]'
    );

    this.accountingMonthCalendar = page
      .locator("#fileUpload")
      .getByRole("button", { name: "select" })
      .nth(2);

    this.accountingMonthDateDropdown = page.locator(
      'input[name="AccountingMonthDate"]'
    );

    this.payGroupRegionDropdown = page.locator(
      'text=Pay Group Region Pay Period End Date Task Run >> [aria-label="select"] >> nth=0'
    );

    this.ppeDateProcessingDropdown = page.locator(
      'text=Pay Group Region Pay Period End Date Task Run >> [aria-label="select"] >> nth=1'
    );

    this.tasksDropdown = page.locator(
      "#payrollProcessing > div > div > div > div > div:nth-child(3) > span > span > input"
    );

    this.deleteRegionEntry = page
      .locator(
        "#payrollProcessing > .section > .row > .col-md-7 > .form-inline > div > .k-widget > .k-dropdown-wrap > span"
      )
      .first();

    // buttons
    this.uploadButton = page.locator('input[name="file"]');
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/Upload");
    await this.page.waitForLoadState("networkidle");
  }

  // get elements
  async getPayrollUploadText() {
    await expect(
      this.payrollUploadText,
      "Payroll Upload not found"
    ).toBeVisible();
  }

  async getPayCalendarText() {
    await expect(this.payCalendarText, "Pay Calendar not found").toBeVisible();
  }

  async getPPEdateUploadText() {
    await expect(this.ppeDateUploadText, "PPE date not found").toBeVisible();
  }

  async getAccountingMonthDateText() {
    await expect(
      this.accountingMonthDate,
      "Accounting Month Date not found"
    ).toBeVisible();
  }

  async getUploadTimecardText() {
    await expect(
      this.uploadTimecardText,
      "Upload Timecard option not found"
    ).toBeVisible();
  }

  async getUploadButtonText() {
    await expect(
      this.uploadButtonText,
      "Upload button Text not found"
    ).toBeVisible();
  }

  async getUploadButton() {
    await expect(this.uploadButton, "Upload button not found").toBeVisible();
  }

  async getPayrollProcText() {
    await expect(
      this.payrollProcessingTasksText,
      "Payroll Processing Tasks header not found"
    ).toBeVisible();
  }

  async getTasksText() {
    await expect(this.taskText, "Tasks text not found").toBeVisible();
  }

  // get Dropdowns

  async getpayCalendarDropdown() {
    await expect(
      this.paycalendarListDropdown,
      "PayCalendar list dropdown not found"
    ).toBeVisible();
  }

  async getPPEDateDropdown() {
    await expect(
      this.ppeDateDropdown,
      "PPE Date dropdown not found"
    ).toBeVisible();
  }

  async getAccountingMonthDateDropdown() {
    await expect(
      this.accountingMonthDateDropdown,
      "Accounting Month Dropdown not found"
    ).toBeVisible();
  }

  async getPayGroupRegionDropdown() {
    await expect(
      this.payGroupRegionDropdown,
      "Pay Group Region dropdown not found"
    ).toBeVisible();
  }

  async getPPEDateProcessingDropdown() {
    await expect(
      this.ppeDateProcessingDropdown,
      "Processing PPE Date dropdown not found"
    ).toBeVisible();
  }

  async getTasksDropdown() {
    await expect(this.tasksDropdown, "Tasks dropdown not found").toBeVisible();
  }

  // interact with elements

  async inputPayCalendarDropdown(text) {
    await this.getpayCalendarDropdown();
    await this.paycalendarListDropdown.click();
    await this.paycalendarListDropdown.fill(text);
    await this.paycalendarListDropdown.press("ArrowDown");
    await this.paycalendarListDropdown.press("Enter");
  }

  async clickAccountingMonthCalendar() {
    await this.getAccountingMonthDateDropdown();
    await this.accountingMonthCalendar.click();
  }

  async clickPayGroupRegionDropdown() {
    await this.getPayGroupRegionDropdown();
    await this.payGroupRegionDropdown.click();
  }

  async clickTasksDropdown() {
    await this.getTasksDropdown();
    await this.tasksDropdown.click();
  }

  async inputPPEdateDropdown(text) {
    await this.getPPEDateDropdown();
    await this.ppeDateDropdown.click();
    await this.ppeDateDropdown.fill(text);
    await this.ppeDateDropdown.press("ArrowDown");
    await this.ppeDateDropdown.press("Enter");
  }

  async inputAccountingDate(text) {
    await this.getAccountingMonthDateDropdown();
    await this.accountingMonthDateDropdown.click();
    await this.accountingMonthDateDropdown.fill(text);
    await this.accountingMonthDateDropdown.press("ArrowDown");
    await this.accountingMonthDateDropdown.press("Enter");
  }

  async clickPPEDateProcessingDropdown() {
    await this.getPPEDateProcessingDropdown();
    await this.ppeDateProcessingDropdown.click();
  }

  async paygroupRegionDelete() {
    await this.deleteRegionEntry.click();
  }

  async uploadValidTimecard() {
    await this.uploadButton.setInputFiles(
      ("input#file", timecard),
      "file upload failed"
    );
  }
}
module.exports = { PayrollUpload };
