// this POM is for /Payplans/Dashboard
const { expect } = require("@playwright/test");

class PayplanDashboard {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.payplanHeader = page.locator("text=Pay Plan Dashboard");

    // links
    this.payplanLink = page.locator("text=Pay Plans");

    this.employeesLink = page.locator("text=Employees");

    this.footersLink = page.locator("text=Footers");

    this.templatesLink = page.locator('//*[@id="payPlanMenuLevel2"]/li[4]/a');

    this.templatesLinkText = page.locator("text=Templates");

    this.formulasLink = page.locator("text=Formulas");

    this.gridsLink = page.locator("text=Grids");

    // page elements
    this.expirationDateText = page.locator("text=Expiration Date >> nth=0");

    this.expirationDateText2 = page.locator("text=Expiration Date >> nth=1");

    this.paycalendarText = page.locator('label:has-text("Pay Calendar")');

    this.effectiveDateText = page.locator("text=Effective Date");

    this.ppeDateText = page.locator("text=Pay Period End Date");

    this.planStatusText = page.locator("text=Plan Status");

    this.planstatusExpiring = page.locator('//*[@id="PlanStatusExpiredCount"]');

    this.planstatusSuspended = page.locator(
      '//*[@id="PlanStatusSuspendedCount"]'
    );

    this.planstatusPending = page.locator('//*[@id="PlanStatusPendingCount"]');

    this.positionChangesText = page.locator(
      "text=New Hires / Rehires / Transfers / Position Changes"
    );

    this.noPlanCreatedCount = page.locator(
      '//*[@id="NewHiresNoPlanCreatedCount"]'
    );

    this.newHiresPendingCount = page.locator('//*[@id="NewHiresPendingCount"]');

    this.newHiresNoActiveStatusCount = page.locator(
      '//*[@id="NewHiresNoActiveStatusCount"]'
    );

    this.complianceRiskText = page.locator("text=Compliance / Risk");

    this.complianceRiskExceptionCount = page.locator(
      '//*[@id="ComplianceRiskExceptionCount"]'
    );

    this.complainceRiskExipredCount = page.locator(
      '//*[@id="ComplianceRiskExpiredCount"]'
    );
    this.metricsText = page.locator("text=Metrics");

    this.metricsCreatedCount = page.locator(
      '//*[@id="MetricsPlansCreatedCount"]'
    );

    this.metricsActiveCount = page.locator(
      '//*[@id="MetricsPlansActiveCount"]'
    );

    this.averagePerMonthBox = page.locator(
      '//*[@id="MetricsReturnRatePercent"]'
    );

    // inputs

    this.expirationDateInput = page.locator(
      'input[name="PlanStatusMonthPicker"]'
    );

    this.expirationDateCalendar1 = page.locator(
      '[aria-label="select"] >> nth=0'
    );

    this.expirationDateCalendar2 = page.locator(
      '[aria-label="select"] >> nth=3'
    );

    this.payCalendarInput = page.locator('input[name="PayCalendarList_input"]');

    this.ppeDateInput = page.locator('input[name="PayPeriodList_input"]');

    this.experitationDateInput2 = page.locator(
      'input[id="ComplianceRiskMonthPicker"]'
    );

    this.effectiveDateInput = page.locator('input[id="MetricsMonthPicker"]');

    this.effectiveDateCalendar = page.locator('[aria-label="select"] >> nth=4');
  }

  // Navigation
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/Dashboard"
    );
  }

  /// get elements
  async getPayPlanHeader() {
    await expect(this.payplanHeader).toBeVisible();
  }

  async getPayplanLink() {
    await expect(this.payplanLink).toBeVisible();
  }

  async getEmployeesLink() {
    await expect(this.payplanLink).toBeVisible();
  }

  async getFootersLink() {
    await expect(this.footersLink).toBeVisible();
  }

  async getTemplatesLink() {
    await expect(this.templatesLink).toBeVisible();
  }

  async getFormulasLink() {
    await expect(this.formulasLink).toBeVisible();
  }

  async getGridsLink() {
    await expect(this.gridsLink).toBeVisible();
  }

  async getExpirationDateText() {
    await expect(this.expirationDateText).toBeVisible();
  }

  async getExpirationDateText2() {
    await expect(this.expirationDateText2).toBeVisible();
  }

  async getPaycalendarText() {
    await expect(this.paycalendarText).toBeVisible();
  }

  async getEffectiveDateText() {
    await expect(this.effectiveDateText).toBeVisible();
  }

  async getPPPEdateText() {
    await expect(this.ppeDateText).toBeVisible();
  }

  async getPlanStatusText() {
    await expect(this.planStatusText).toBeVisible();
  }

  async getPlanStatusExpiring() {
    await expect(this.planstatusExpiring).toBeVisible();
  }

  async getPlanStatusSuspended() {
    await expect(this.planstatusSuspended).toBeVisible();
  }

  async getPlanStatusPending() {
    await expect(this.planstatusPending).toBeVisible();
  }

  async getPositionChangesText() {
    await expect(this.positionChangesText).toBeVisible();
  }

  async getNoPlanCreatedCount() {
    await expect(this.noPlanCreatedCount).toBeVisible();
  }

  async getNewHiresPendingCount() {
    await expect(this.newHiresPendingCount).toBeVisible();
  }

  async getNewHiresNoActiveStatusCount() {
    await expect(this.newHiresNoActiveStatusCount).toBeVisible();
  }

  async getComplianceRiskText() {
    await expect(this.complianceRiskText).toBeVisible();
  }

  async getComplianceRiskExceptionCount() {
    await expect(this.complianceRiskExceptionCount).toBeVisible();
  }

  async getComplainceRiskExipredCount() {
    await expect(this.complainceRiskExipredCount).toBeVisible();
  }

  async getMetricsText() {
    await expect(this.metricsText).toBeVisible();
  }

  async getMetricsCreatedCount() {
    await expect(this.metricsCreatedCount).toBeVisible();
  }

  async getMetricsActiveCount() {
    await expect(this.metricsActiveCount).toBeVisible();
  }

  async getAveragePerMonthBox() {
    await expect(this.averagePerMonthBox).toBeVisible();
  }

  // input elements

  async clickExpirationDate1() {
    await this.expirationDateCalendar1.click();
  }

  async inputExperationDate1(text) {
    await this.expirationDateInput.click();
    await this.expirationDateInput.fill(text);
  }

  async clickExpirationDate2() {
    await this.expirationDateCalendar2.click();
  }

  async inputExpirationDate2(month, year) {
    await this.expirationDateInput.click();
    await this.expirationDateInput.fill(month);
    await this.expirationDateInput.fill(year);
  }

  async clickEffectiveDate() {
    await this.effectiveDateCalendar.click();
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

  // click elements
  async clickEmployeesLink() {
    await this.employeesLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanEmployee"
    );
  }

  async clickFootersLink() {
    await this.footersLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanFooter"
    );
  }

  async clickTemplatesLink() {
    await this.templatesLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanTemplate"
    );
  }

  async clickFormulasLink() {
    await this.formulasLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/FormulaBlock"
    );
  }

  async clickGridsLink() {
    await this.gridsLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/Grids"
    );
  }
}

module.exports = { PayplanDashboard };
