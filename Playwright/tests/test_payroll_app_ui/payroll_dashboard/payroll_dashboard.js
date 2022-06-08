// this POM is for /Payroll
const { expect } = require("@playwright/test");

class PayrollDashboard {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // images
    this.mainLogo = page.locator(".logo");
    // headers
    this.headerContainer = page.locator("text=Payroll Dashboard");
    // links
    this.payrollLink = page.locator("text=Payroll Home");
    this.storeInputLink = page.locator("text=Store Input");
    this.adjustmentLink = page.locator("text=Adjustment");
    this.accrualLink = page.locator("text=Accrual");
    this.auditLink = page.locator("text=Audit");
    this.offCycleLink = page.locator("text=Off-Cycle Earnings");
    this.fileUploads = page.locator("text=File Upload");

    // page elements
    this.payrollDashboardText = page.locator(
      "body > div.container-fluid.body-content > div.button-row"
    );
    this.payCalendarDrop = page.locator(
      'text=Pay Calendar 2 >> [aria-label="select"]'
    );
    this.payPeriodDrop = page.locator(
      'text=Pay Period End Date 182 >> [aria-label="select"]'
    );
    this.monthPickerDrop = page.locator('[aria-label="select"] >> nth=3');
    this.payrollSetupBox = page.locator("text=Payroll Setup");
    this.dataLoadBox = page.locator("text=Data Load");
    this.inputSheetBox = page.locator("text=Input Sheet");
    this.payRunStatusBox = page.locator("text=Pay Run Status");
    this.notRunBox = page.locator("text=Not Run");
    this.prelimiaryBox = page.locator("text=Preliminary");
    this.errorBox = page.locator("text=Error");
    this.completeBox = page.locator("text=Complete");
    this.registerReviewBox = page.locator("text=Register Review");
    this.payrollBox = page.locator('label:has-text("Payroll")');
    this.companyBox = page.locator("text=Company");
    this.manualChecksBox = page.locator("text=Manual Checks");
    this.monthToDateBox = page.locator("#ManualChecksMonthToDateCount");
    this.monthToDateCounter = page.locator(
      '//*[@id="ManualChecksMonthToDateCount"]'
    );
    this.yearToDateBox = page.locator("#ManualChecksYearToDateCount");
    this.yearToDateCounter = page.locator(
      '//*[@id="ManualChecksYearToDateCount"]'
    );
    this.averagePerMonthBox = page.locator(
      "id=ManualChecksAveragePerMonthCount"
    );
    this.averagePerMonthCounter = page.locator(
      "#ManualChecksAveragePerMonthCount"
    );
  }

  // use goto() if you intend on starting the test on a particilar page in Allpay App
  async goto() {
    await this.page.goto("https://azwu2apweb-test.azurewebsites.net/Payroll");
  }

  // get elements
  async getAllPayLogo() {
    await expect(mainLogo).toBeVisible();
  }

  async getHeaderContainer() {
    await expect(this.headerContainer).toBeVisible();
  }

  async getPaycalendarDrop() {
    await expect(this.payCalendarDrop).toBeVisible();
  }

  async getPeriodDrop() {
    await expect(this.payPeriodDrop).toBeVisible();
  }

  async getMonthPickerDrop() {
    await expect(this.monthPickerDrop).toBeVisible();
  }

  async getpayrollSetupBox() {
    await expect(this.payrollSetupBox).toBeVisible();
  }

  async getDataLoadBox() {
    await expect(this.dataLoadBox).toBeVisible();
  }

  async getInputSheetBox() {
    await expect(this.inputSheetBox).toBeVisible();
  }

  async getPayRunStatusBox() {
    await expect(this.payRunStatusBox).toBeVisible();
  }

  async getNotRunBox() {
    await expect(this.notRunBox).toBeVisible();
  }

  async getPrelimiaryBox() {
    await expect(this.prelimiaryBox).toBeVisible();
  }

  async getErrorbox() {
    await expect(this.errorBox).toBeVisible();
  }

  async getCompleteBox() {
    await expect(this.completeBox).toBeVisible();
  }

  async getRegisterReviewBox() {
    await expect(this.registerReviewBox).toBeVisible();
  }

  async getPayrollBox() {
    await expect(this.payrollBox).toBeVisible();
  }

  async getCompanyBox() {
    await expect(this.companyBox).toBeVisible();
  }

  async getManualChecksBox() {
    await expect(this.manualChecksBox).toBeVisible();
  }

  async getMonthToDateBox() {
    await expect(this.monthToDateBox).toBeVisible();
  }

  async getMonthToDateCounter() {
    await expect(this.monthToDateCounter).toBeVisible();
  }

  async getyearToDateBox() {
    await expect(this.yearToDateBox).toBeVisible();
  }

  async getYearToDateCounter() {
    await expect(this.yearToDateCounter).toBeVisible();
  }

  async getAveragePerMonthBox() {
    await expect(this.averagePerMonthBox).toBeVisible();
  }

  async getAveragePerMonthCounter() {
    await expect(this.averagePerMonthCounter).toBeVisible();
  }

  // click elements
  async clickPayrollLink() {
    await this.payrollLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Regular"
    );
  }

  async clickStoreInputLink() {
    await this.storeInputLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/StoreInput"
    );
  }

  async clickAdjustmentLink() {
    await this.adjustmentLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Adjustment"
    );
  }

  async clickAccrualLink() {
    await this.accrualLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Accrual"
    );
  }

  async clickAuditLink() {
    await this.auditLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Audit"
    );
  }

  async clickOffCycleLink() {
    await this.offCycleLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/OffCycleEarnings"
    );
  }

  async clickFileUploadsLink() {
    await this.fileUploads.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Upload"
    );
  }
}

module.exports = { PayrollDashboard };
