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
    await this.page.goto("/PayPlan/Dashboard");
  }

  /// get elements
  async getPayPlanHeader() {
    await expect(this.payplanHeader, "Pay Plan Header not found").toBeVisible();
  }

  async getPayplanLink() {
    await expect(this.payplanLink, "PayPlan link not found").toBeVisible();
  }

  async getEmployeesLink() {
    await expect(this.payplanLink, "Employees Link not found").toBeVisible();
  }

  async getFootersLink() {
    await expect(this.footersLink, "Footers Link not found").toBeVisible();
  }

  async getTemplatesLink() {
    await expect(this.templatesLink, "Templates Link not found").toBeVisible();
  }

  async getFormulasLink() {
    await expect(this.formulasLink, "Formulas link not found").toBeVisible();
  }

  async getGridsLink() {
    await expect(this.gridsLink, "Grids Link text not found").toBeVisible();
  }

  async getExpirationDateText() {
    await expect(
      this.expirationDateText,
      "Experation Date Text not found"
    ).toBeVisible();
  }

  async getExpirationDateText2() {
    await expect(
      this.expirationDateText2,
      "Experation Date Text 2 not found"
    ).toBeVisible();
  }

  async getPaycalendarText() {
    await expect(
      this.paycalendarText,
      "Pay Calendar Text not found"
    ).toBeVisible();
  }

  async getEffectiveDateText() {
    await expect(
      this.effectiveDateText,
      "Effective Date Text not found"
    ).toBeVisible();
  }

  async getPPPEdateText() {
    await expect(this.ppeDateText, "PPE Date Text not found").toBeVisible();
  }

  async getPlanStatusText() {
    await expect(
      this.planStatusText,
      "Plan Status Text not found"
    ).toBeVisible();
  }

  async getPlanStatusExpiring() {
    await expect(
      this.planstatusExpiring,
      "Plan Status Expiring not found"
    ).toBeVisible();
  }

  async getPlanStatusSuspended() {
    await expect(
      this.planstatusSuspended,
      "Plan Status Suspended not found"
    ).toBeVisible();
  }

  async getPlanStatusPending() {
    await expect(
      this.planstatusPending,
      "Plan Status Pending not found"
    ).toBeVisible();
  }

  async getPositionChangesText() {
    await expect(
      this.positionChangesText,
      "Position Changes Text not found"
    ).toBeVisible();
  }

  async getNoPlanCreatedCount() {
    await expect(
      this.noPlanCreatedCount,
      "No Plan Created Count not found"
    ).toBeVisible();
  }

  async getNewHiresPendingCount() {
    await expect(
      this.newHiresPendingCount,
      "New Hires Pending Count not found"
    ).toBeVisible();
  }

  async getNewHiresNoActiveStatusCount() {
    await expect(
      this.newHiresNoActiveStatusCount,
      "New Hires No Active Status count not found"
    ).toBeVisible();
  }

  async getComplianceRiskText() {
    await expect(
      this.complianceRiskText,
      "Compliance Risk Text not found"
    ).toBeVisible();
  }

  async getComplianceRiskExceptionCount() {
    await expect(
      this.complianceRiskExceptionCount,
      "Compliance Risk Exception count not found"
    ).toBeVisible();
  }

  async getComplainceRiskExipredCount() {
    await expect(
      this.complainceRiskExipredCount,
      "Compiance Risk Expired count not found"
    ).toBeVisible();
  }

  async getMetricsText() {
    await expect(this.metricsText, "Metrics Text not found").toBeVisible();
  }

  async getMetricsCreatedCount() {
    await expect(
      this.metricsCreatedCount,
      "Metrics Created Count not found"
    ).toBeVisible();
  }

  async getMetricsActiveCount() {
    await expect(
      this.metricsActiveCount,
      "Metrics Active Count not found"
    ).toBeVisible();
  }

  async getAveragePerMonthBox() {
    await expect(
      this.averagePerMonthBox,
      "Average Per Month Box not found"
    ).toBeVisible();
  }

  async getPPEdateInputBox() {
    await expect(
      this.ppeDateInput,
      "PPE Date Input box not found"
    ).toBeVisible();
  }

  async getPayCalendarDropdown() {
    await expect(
      this.payCalendarInput,
      "Pay Calendar Input Box Dropdown not found"
    ).toBeVisible();
  }

  async getExperationDateCalendar1() {
    await expect(
      this.expirationDateInput,
      "Exp Date Calendar 1 not found"
    ).toBeVisible();
  }

  async getExperationDateCalendar2() {
    await expect(
      this.experitationDateInput2,
      "Exp Date Calendar 2 not found"
    ).toBeVisible();
  }

  // input elements

  async clickExpirationDate1() {
    await this.getExperationDateCalendar1();
    await this.expirationDateCalendar1.click();
  }

  async clickExpirationDate2() {
    await this.getExperationDateCalendar2();
    await this.expirationDateCalendar2.click();
  }

  async clickEffectiveDate() {
    await this.getEffectiveDateText();
    await this.effectiveDateCalendar.click();
  }

  async inputPayCalendarDropdown(text) {
    await this.getPayCalendarDropdown();
    await this.payCalendarInput.click();
    await this.payCalendarInput.fill(text);
    await this.payCalendarInput.press("ArrowDown");
    await this.payCalendarInput.press("Enter");
  }

  async inputPPEdateDropdown(text) {
    await this.getPPEdateInputBox();
    await this.ppeDateInput.click();
    await this.ppeDateInput.fill(text);
    await this.ppeDateInput.press("ArrowDown");
    await this.ppeDateInput.press("Enter");
  }

  // click elements
  async clickEmployeesLink() {
    await this.getEmployeesLink();
    await this.employeesLink.click();
    await expect(this.page).toHaveURL("/PayPlan/PayPlanEmployee");
    await this.page.waitForLoadState("networkidle");
  }

  async clickFootersLink() {
    await this.getFootersLink();
    await this.footersLink.click();
    await expect(this.page).toHaveURL("/PayPlan/PayPlanFooter");
    await this.page.waitForLoadState("networkidle");
  }

  async clickTemplatesLink() {
    await this.getTemplatesLink();
    await this.templatesLink.click();
    await expect(this.page).toHaveURL("/PayPlan/PayPlanTemplate");
    await this.page.waitForLoadState("networkidle");
  }

  async clickFormulasLink() {
    await this.getFormulasLink();
    await this.formulasLink.click();
    await expect(this.page).toHaveURL("/PayPlan/FormulaBlock");
    await this.page.waitForLoadState("networkidle");
  }

  async clickGridsLink() {
    await this.getGridsLink();
    await this.gridsLink.click();
    await expect(this.page).toHaveURL("/PayPlan/Grids");
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { PayplanDashboard };
