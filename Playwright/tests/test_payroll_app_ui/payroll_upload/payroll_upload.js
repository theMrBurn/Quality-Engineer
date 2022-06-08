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
    this.ppeDateText = page.locator("text=Pay Period End Date");
    this.accountingMonthDate = page.locator("text=Accounting Month Date");
    this.uploadTimecardText = page.locator("text=Upload Timecard");
    this.uploadButtonText = page.locator(
      "text=Select FileDrop files here to upload"
    );

    // dropdowns
    this.paycalendarListDropdown = page.locator(
      'input[name="PayCalendarList_input"]'
    );
    this.ppeDateDropdown = page.locator(
      'input[name="PayPeriodEndDateList_input"]'
    );

    this.accountingMonthCalendar = page.locator(
      '[aria-label="select"] >> nth=2'
    );

    this.accountingMonthDateDropdown = page.locator(
      'input[name="AccountingMonthDate"]'
    );

    // calendar pop out - without data test tags, this is nearly impossible
    // this.aMonthCalendarModal = page.locator(':nth-match([aria-label="select"], 3)');

    // buttons
    this.uploadButton = page.locator('input[name="file"]');
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("https://azwu2apweb-test.azurewebsites.net/Upload");
  }

  // get elements
  async getPayrollUploadText() {
    await expect(this.payrollUploadText).toBeVisible();
  }

  async getPayCalendarText() {
    await expect(this.payCalendarText).toBeVisible();
  }

  async getPPEdateText() {
    await expect(this.ppeDateText).toBeVisible();
  }

  async getAccountingMonthDateText() {
    await expect(this.accountingMonthDate).toBeVisible();
  }

  async getUploadTimecardText() {
    await expect(this.uploadTimecardText).toBeVisible();
  }

  async getUploadButtonText() {
    await expect(this.uploadButtonText).toBeVisible();
  }

  async getUploadButton() {
    await expect(this.uploadButton).toBeVisible();
  }

  // get Dropdowns

  async getpayCalendarDropdown() {
    await expect(this.paycalendarListDropdown).toBeVisible();
  }

  async getPPEDateDropdown() {
    await expect(this.ppeDateDropdown).toBeVisible();
  }

  async getAccountingMonthDateDropdown() {
    await expect(this.accountingMonthDateDropdown).toBeVisible();
  }

  // interact with elements

  async inputPayCalendarDropdown(text) {
    await this.paycalendarListDropdown.click();
    await this.paycalendarListDropdown.fill(text);
    await this.paycalendarListDropdown.press("ArrowDown");
    await this.paycalendarListDropdown.press("Enter");
  }

  async clickAccountingMonthCalendar() {
    await this.accountingMonthCalendar.click();
  }

  async inputPPEdateDropdown(text) {
    await this.ppeDateDropdown.click();
    await this.ppeDateDropdown.fill(text);
    await this.ppeDateDropdown.press("ArrowDown");
    await this.ppeDateDropdown.press("Enter");
  }

  async inputAccountingDate(text) {
    await this.accountingMonthDateDropdown.click();
    await this.accountingMonthDateDropdown.fill(text);
    await this.accountingMonthDateDropdown.press("ArrowDown");
    await this.accountingMonthDateDropdown.press("Enter");
  }

  // calendar pop out - without data test tags, this is nearly impossible

  // async clickAccountingMonthCalendar() {
  // // Click :nth-match([aria-label="select"], 3)
  // await this.aMonthCalendarModal.click(':nth-match([aria-label="select"], 3)');
  // // Click text=Jul
  // await this.aMonthCalendarModal.click('text=July');
  // }

  async uploadValidTimecard() {
    await this.uploadButton.setInputFiles(
      ("input#file", timecard),
      "file upload failed"
    );
  }
}
module.exports = { PayrollUpload };
