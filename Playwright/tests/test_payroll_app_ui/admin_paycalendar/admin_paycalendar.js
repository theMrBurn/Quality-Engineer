const { expect } = require("@playwright/test");
class AdminPayCalendar {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      payCalendarPageHeader: () =>
        this.page.locator('h2:has-text("Pay Calendar")'),
      companyText: () => this.page.locator("text=Company"),
      companyNumberText: () =>
        this.page.locator('label:has-text("Company Number")'),
      companyGridColumnText: () => this.page.locator("text=Company >> nth=2"),
      companyNumberGridColumnText: () =>
        this.page.locator('a:has-text("Company Number")'),
      calendarGridText: () =>
        this.page.locator(
          'th[role="columnheader"]:has-text("Calendar") >> nth=1',
        ),
      ppeBeginDateGridText: () =>
        this.page.locator("text=Pay PeriodBegin Date"),
      ppeEndDateGridText: () => this.page.locator("text=Pay PeriodEnd Date"),
      payDayDateGridText: () => this.page.locator("text=Pay DayDate"),
      accountingMonthGridText: () =>
        this.page.locator("text=AccountingMonth >> nth=0"),
      accountingMonthBeginDateGridText: () =>
        this.page.locator("text=AccountingMonth Begin Date"),
      accountingMonthEndDateGridText: () =>
        this.page.locator("text=AccountingMonth End Date"),
      commissionMonthBeginDateGridText: () =>
        this.page.locator("text=CommissionMonth Begin Date"),
      commissionMonthEndDateGridText: () =>
        this.page.locator("text=CommissionMonth End Date"),
      calculationPeriodTypeGridText: () =>
        this.page.locator("text=Calculation Period Types"),
      calendarInputBox: () =>
        this.page.locator('input[name="PayCalendarList_input"]'),
      calendarInputDropdown: () =>
        this.page.locator('[aria-label="select"] >> nth=0'),
      newCalendarButton: () => this.page.locator("text=New Pay Calendar"),
      gridEditButton: () =>
        this.page.locator(
          '//*[@id="PayCalendarGrid"]/table/tbody/tr[1]/td[15]/a[1]',
        ),
      gridDeleteButton: () =>
        this.page.locator(
          '//*[@id="PayCalendarGrid"]/table/tbody/tr[1]/td[15]/a[2]',
        ),
      gridUpdateButton: () => this.page.locator("text=Update"),
      gridCancelButton: () => this.page.locator("text=Cancel"),
      startDateGridInput: () => this.page.locator('//*[@id="StartDate"]'),
      companyGridInput: () =>
        this.page.locator(
          'tbody[role="rowgroup"] span[role="listbox"] [aria-label="select"] span',
        ),
    };
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/Admin/PayCalendar");
    await this.page.waitForLoadState("load");
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
}

module.exports = { AdminPayCalendar };
