// this POM is for /Payplans/Dashboard
const { expect } = require("@playwright/test");

class PayplanDashboard {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    // locators array
    this.locators = {
      payplanHeader: () => page.locator("text=Pay Plan Dashboard"),
      payplanLink: () => page.locator("text=Pay Plans"),
      employeesLink: () => page.locator("text=Employees"),
      footersLink: () => page.locator("text=Footers"),
      templatesLink: () => page.locator('//*[@id="payPlanMenuLevel2"]/li[4]/a'),
      templatesLinkText: () => page.locator("text=Templates"),
      formulasLink: () => page.locator("text=Formulas"),
      gridsLink: () => page.locator("text=Grids"),
      expirationDateText: () => page.locator("text=Expiration Date >> nth=0"),
      expirationDateText2: () => page.locator("text=Expiration Date >> nth=1"),
      paycalendarText: () => page.locator('label:has-text("Pay Calendar")'),
      effectiveDateText: () => page.locator("text=Effective Date"),
      ppeDateText: () => page.locator("text=Pay Period End Date"),
      planStatusText: () => page.locator("text=Plan Status"),
      planstatusExpiring: () =>
        page.locator('//*[@id="PlanStatusExpiredCount"]'),
      planstatusSuspended: () =>
        page.locator('//*[@id="PlanStatusSuspendedCount"]'),
      planstatusPending: () =>
        page.locator('//*[@id="PlanStatusPendingCount"]'),
      positionChangesText: () =>
        page.locator("text=New Hires / Rehires / Transfers / Position Changes"),
      noPlanCreatedCount: () =>
        page.locator('//*[@id="NewHiresNoPlanCreatedCount"]'),
      newHiresPendingCount: () =>
        page.locator('//*[@id="NewHiresPendingCount"]'),
      newHiresNoActiveStatusCount: () =>
        page.locator('//*[@id="NewHiresNoActiveStatusCount"]'),
      complianceRiskText: () => page.locator("text=Compliance / Risk"),
      complianceRiskExceptionCount: () =>
        page.locator('//*[@id="ComplianceRiskExceptionCount"]'),
      complainceRiskExipredCount: () =>
        page.locator('//*[@id="ComplianceRiskExpiredCount"]'),
      metricsText: () => page.locator("text=Metrics"),
      metricsCreatedCount: () =>
        page.locator('//*[@id="MetricsPlansCreatedCount"]'),
      metricsActiveCount: () =>
        page.locator('//*[@id="MetricsPlansActiveCount"]'),
      averagePerMonthBox: () =>
        page.locator('//*[@id="MetricsReturnRatePercent"]'),
      expirationDateInput: () =>
        page.locator('input[name="PlanStatusMonthPicker"]'),
      expirationDateCalendar1: () =>
        page.getByRole("button", { name: "select" }).first(),
      expirationDateCalendar2: () =>
        page.getByRole("button", { name: "select" }).nth(3),
      payCalendarInput: () =>
        page.locator('input[name="PayCalendarList_input"]'),
      ppeDateInput: () => page.locator('input[name="PayPeriodList_input"]'),
      experitationDateInput2: () =>
        page.locator('input[id="ComplianceRiskMonthPicker"]'),
      effectiveDateInput: () =>
        page.getByRole("button", { name: "select" }).nth(4),
      effectiveDateCalendar: () =>
        page.locator('[aria-label="select"] >> nth=4'),
      payCallendarDropTriangle: () =>
        page.locator("span").filter({ hasText: "2" }).getByLabel("select"),
      ppeDateDropdownTriangle: () =>
        page.locator(
          "body > div.container-fluid.body-content > div.grid-page-wide.dashboard > div.row.section > div:nth-child(2) > div > div:nth-child(2) > span > span > span.k-select",
        ),
    };
  }

  // Navigation
  async goto() {
    await this.page.goto("/PayPlan/Dashboard");
  }

  /// new interactive methods

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
      await this.page.waitForLoadState("networkidle");
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("load");
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
}

module.exports = { PayplanDashboard };
