// this POM is for /Payroll/Upload
const { expect } = require("@playwright/test");
const timecard = "Playwright/helpers/misc_test_helper_files/TIMECARD.csv";
class PayrollUpload {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    // locators array
    this.locators = {
      payrollUploadText: () => this.page.locator("text=Payroll File Upload"),
      payCalendarText: () =>
        this.page.locator('label:has-text("Pay Calendar")'),
      ppeDateUploadText: () =>
        this.page.locator("#fileUpload >> text=Pay Period End Date"),
      accountingMonthDate: () =>
        this.page.locator("text=Accounting Month Date"),
      uploadTimecardText: () => this.page.locator("text=Upload Timecard"),
      uploadButtonText: () =>
        this.page.locator("text=Select FileDrop files here to upload"),
      payrollProcessingTasksText: () =>
        this.page.locator("text=Payroll Processing Tasks"),
      taskText: () => this.page.locator('label:has-text("Task")'),
      paycalendarListDropdown: () =>
        this.page.locator('input[name="PayCalendarList_input"]'),
      ppeDateDropdown: () =>
        this.page.locator('input[name="PayPeriodEndDateList_input"]'),
      accountingMonthCalendar: () =>
        this.page
          .locator("#fileUpload")
          .getByRole("button", { name: "select" })
          .nth(2),
      accountingMonthDateDropdown: () =>
        this.page.locator('input[name="AccountingMonthDate"]'),
      payGroupRegionDropdown: () =>
        this.page.locator(
          'text=Pay Group Region Pay Period End Date Task Run >> [aria-label="select"] >> nth=0',
        ),
      ppeDateProcessingDropdown: () =>
        this.page.locator(
          'text=Pay Group Region Pay Period End Date Task Run >> [aria-label="select"] >> nth=1',
        ),
      tasksDropdown: () =>
        this.page.locator(
          "#payrollProcessing > div > div > div > div > div:nth-child(3) > span > span > input",
        ),
      deleteRegionEntry: () =>
        this.page
          .locator(
            "#payrollProcessing > .section > .row > .col-md-7 > .form-inline > div > .k-widget > .k-dropdown-wrap > span",
          )
          .first(),
      uploadButton: () => this.page.locator('input[name="file"]'),
    };
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/Upload");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /// interact with elements

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      await this.page.waitForLoadState("load");
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async uploadValidTimecard() {
    await this.locators
      .uploadButton()
      .setInputFiles(("input#file", timecard), "file upload failed");
  }
}
module.exports = { PayrollUpload };
