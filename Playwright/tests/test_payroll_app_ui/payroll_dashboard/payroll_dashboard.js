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
    this.accrualLink = page.locator("#payrollMenuLevel2 > li:nth-child(5) > a");
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
      "body > div.container-fluid.body-content > div.grid-page-wide.dashboard > div.row.section > div.col-md-7 > div > div:nth-child(2) > span > span > input"
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
    await this.page.waitForLoadState("networkidle");
  }

  // get elements
  async getAllPayLogo() {
    await expect(mainLogo, "All Pay logo not found").toBeVisible();
  }

  async getHeaderContainer() {
    await expect(
      this.headerContainer,
      "Header container not found"
    ).toBeVisible();
  }

  async getPaycalendarDrop() {
    await expect(
      this.payCalendarDrop,
      "Pay Calendar Dropdown not found"
    ).toBeVisible();
  }

  async getPeriodDrop() {
    await expect(this.payPeriodDrop, "Period dropdown not found").toBeVisible();
  }

  async getMonthPickerDrop() {
    await expect(
      this.monthPickerDrop,
      "Month Picker dropdown not found"
    ).toBeVisible();
  }

  async getpayrollSetupBox() {
    await expect(
      this.payrollSetupBox,
      "Payroll Setup not found on page"
    ).toBeVisible();
  }

  async getDataLoadBox() {
    await expect(this.dataLoadBox, "Data Load not found on page").toBeVisible();
  }

  async getInputSheetBox() {
    await expect(
      this.inputSheetBox,
      "Input Sheet not found on page"
    ).toBeVisible();
  }

  async getPayRunStatusBox() {
    await expect(
      this.payRunStatusBox,
      "Pay Run Status not found on page"
    ).toBeVisible();
  }

  async getNotRunBox() {
    await expect(this.notRunBox, "Not Run, not found on page").toBeVisible();
  }

  async getPrelimiaryBox() {
    await expect(
      this.prelimiaryBox,
      "Preliminary not found on page"
    ).toBeVisible();
  }

  async getErrorbox() {
    await expect(this.errorBox, "Error box not found on page").toBeVisible();
  }

  async getCompleteBox() {
    await expect(this.completeBox, "Complete not found on page").toBeVisible();
  }

  async getRegisterReviewBox() {
    await expect(
      this.registerReviewBox,
      "Register Review not found on page"
    ).toBeVisible();
  }

  async getPayrollBox() {
    await expect(
      this.payrollBox,
      "Payroll box not found on page"
    ).toBeVisible();
  }

  async getCompanyBox() {
    await expect(
      this.companyBox,
      "Company box not found on page"
    ).toBeVisible();
  }

  async getManualChecksBox() {
    await expect(
      this.manualChecksBox,
      "Manual Checks not found on page"
    ).toBeVisible();
  }

  async getMonthToDateBox() {
    await expect(
      this.monthToDateBox,
      "Month to Date not found on page"
    ).toBeVisible();
  }

  async getMonthToDateCounter() {
    await expect(
      this.monthToDateCounter,
      "Month to Date Counter not found on page"
    ).toBeVisible();
  }

  async getyearToDateBox() {
    await expect(
      this.yearToDateBox,
      "Year to Date box not found on page"
    ).toBeVisible();
  }

  async getYearToDateCounter() {
    await expect(
      this.yearToDateCounter,
      "Year to Date Counter not found on page"
    ).toBeVisible();
  }

  async getAveragePerMonthBox() {
    await expect(
      this.averagePerMonthBox,
      "Average Per Month box not found on page"
    ).toBeVisible();
  }

  async getAveragePerMonthCounter() {
    await expect(
      this.averagePerMonthCounter,
      "Average Per Month Counter not found on page"
    ).toBeVisible();
  }

  // click elements
  async clickPayrollLink() {
    await this.payrollLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Regular"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async clickStoreInputLink() {
    await this.storeInputLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/StoreInput"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async clickAdjustmentLink() {
    await this.adjustmentLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Adjustment"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async clickAccrualLink() {
    await this.accrualLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Accrual"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async clickAuditLink() {
    await this.auditLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Audit"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async clickOffCycleLink() {
    await this.offCycleLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/OffCycleEarnings"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async clickFileUploadsLink() {
    await this.fileUploads.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Upload"
    );
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { PayrollDashboard };
