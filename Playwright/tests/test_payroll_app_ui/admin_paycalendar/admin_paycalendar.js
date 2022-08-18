// this POM is for /Admin/Paycycle
const { expect } = require("@playwright/test");

class AdminPayCalendar {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.payCalendarPageHeader = page.locator('h2:has-text("Pay Calendar")');

    // unique page text
    this.companyText = page.locator("text=Company >> nth=0");
    this.companyNumberText = page.locator('label:has-text("Company Number")');
    this.companyGridColumnText = page.locator("text=Company >> nth=2");
    this.companyNumberGridColumnText = page.locator(
      'a:has-text("Company Number")'
    );
    this.calendarGridText = page.locator(
      'th[role="columnheader"]:has-text("Calendar") >> nth=1'
    );
    this.ppeBeginDateGridText = page.locator("text=Pay PeriodBegin Date");
    this.ppeEndDateGridText = page.locator("text=Pay PeriodEnd Date");
    this.payDayDateGridText = page.locator("text=Pay DayDate");
    this.accountingMonthGridText = page.locator(
      "text=AccountingMonth >> nth=0"
    );
    this.accountingMonthBeginDateGridText = page.locator(
      "text=AccountingMonth Begin Date"
    );
    this.accountingMonthEndDateGridText = page.locator(
      "text=AccountingMonth End Date"
    );
    this.commissionMonthBeginDateGridText = page.locator(
      "text=CommissionMonth Begin Date"
    );
    this.commissionMonthEndDateGridText = page.locator(
      "text=CommissionMonth End Date"
    );
    this.calculationPeriodTypeGridText = page.locator(
      "text=Calculation Period Types"
    );

    // buttons, dropdowns and input boxes
    this.calendarInputBox = page.locator('input[name="PayCalendarList_input"]');
    this.calendarInputDropdown = page.locator('[aria-label="select"] >> nth=0');
    this.newCalendarButton = page.locator("text=New Pay Calendar");
    this.gridEditButton = page.locator(
      '//*[@id="PayCalendarGrid"]/table/tbody/tr[1]/td[13]/a[1]'
    );
    this.gridDeleteButton = page.locator(
      '//*[@id="PayCalendarGrid"]/table/tbody/tr[1]/td[13]/a[2]'
    );
    this.gridUpdateButton = page.locator("text=Update");
    this.gridCancelButton = page.locator("text=Cancel");

    // forms and grids
    this.startDateGridInput = page.locator('//*[@id="StartDate"]');
    this.companyGridInput = page.locator(
      'tbody[role="rowgroup"] span[role="listbox"] [aria-label="select"] span'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Admin/PayCalendar"
    );
  }

  // get page elements

  async getPayCalendarPageHeader() {
    await expect(
      this.payCalendarPageHeader,
      "Admin PayCalendar Page header not found"
    ).toBeVisible();
  }

  async getCalendarDropdown() {
    await expect(
      this.calendarInputDropdown,
      "Calendar Dropdown not found"
    ).toBeVisible();
  }

  async getCalendarInputBox() {
    await expect(
      this.calendarInputBox,
      "Calendar Input box not found"
    ).toBeVisible();
  }

  async getNewPayCalendarButton() {
    await expect(
      this.newCalendarButton,
      "New Pay Calendar button not found"
    ).toBeVisible();
  }

  async getCalendarGridText() {
    await expect(
      this.calendarGridText,
      "Calendar grid column not found"
    ).toBeVisible();
  }

  async getPPEBeginDateGridText() {
    await expect(
      this.ppeBeginDateGridText,
      "Pay Period Begin Date grid column not found"
    ).toBeVisible();
  }

  async getPPEEndDateGridText() {
    await expect(
      this.ppeEndDateGridText,
      "Pay Period End Date grid column not found"
    ).toBeVisible();
  }

  async getPayDayDateGridText() {
    await expect(
      this.payDayDateGridText,
      "Pay Day Date grid column not found"
    ).toBeVisible();
  }

  async getAccountingMonthGridText() {
    await expect(
      this.accountingMonthGridText,
      "Accounting Month grid column not found"
    ).toBeVisible();
  }

  async getAccountingMonthBeginDateGridText() {
    await expect(
      this.accountingMonthBeginDateGridText,
      "Accounting Month Begin Date grid column not found"
    ).toBeVisible();
  }

  async getAccountingMonthEndDateGridText() {
    await expect(
      this.accountingMonthEndDateGridText,
      "Accounting Month End Date grid column not found"
    ).toBeVisible();
  }

  async getCommissionMonthBeginDateGridText() {
    await expect(
      this.commissionMonthBeginDateGridText,
      "Commission Month Begin Date grid column not found"
    ).toBeVisible();
  }

  async getCommissionMonthEndDateGridText() {
    await expect(
      this.commissionMonthEndDateGridText,
      "Commission Month End Date grid column not found"
    ).toBeVisible();
  }

  async getCalcPeriodTypesGridText() {
    await expect(
      this.calculationPeriodTypeGridText,
      "Calculation Period Types grid text not found"
    ).toBeVisible();
  }

  async getGridEditButton() {
    await expect(
      this.gridEditButton,
      "Edit button not found on Grid"
    ).toBeVisible();
  }

  async getGridDeleteButton() {
    await expect(
      this.gridDeleteButton,
      "Delete button not found on Grid"
    ).toBeVisible();
  }

  async getGridCancelButton() {
    await expect(
      this.gridCancelButton,
      "Cancel Button not found on Row"
    ).toBeVisible();
  }

  async getGridUpdateButton() {
    await expect(
      this.gridUpdateButton,
      "Update button not found on Row"
    ).toBeVisible();
  }

  // interact with elements

  async clickCalendarInputDropdown() {
    await this.getCalendarDropdown();
    await this.calendarInputDropdown.click();
  }

  async clickNewCalendarButton() {
    await this.getNewPayCalendarButton();
    await this.newCalendarButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickGridCancelButton() {
    await this.getGridCancelButton();
    await this.gridCancelButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickGridUpdateButton() {
    await this.getGridUpdateButton();
    await this.gridUpdateButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms

  async inputCalendar(text) {
    await this.getCalendarInputBox();
    await this.calendarInputBox.fill(text);
    await this.page.keyboard.press("Enter");
  }
}
module.exports = { AdminPayCalendar };
