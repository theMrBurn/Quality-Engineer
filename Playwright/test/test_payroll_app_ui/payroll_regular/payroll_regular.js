// this POM is for /Payroll/Regular
const { expect } = require("@playwright/test");

class PayrollRegular {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // images
    this.mainLogo = page.locator(".logo");
    // headers
    this.headerContainer = page.locator(".section");
    // links
    this.payrollgGrid = page.locator("id=PayrollGrid");
    // dropdowns
    this.payGroupListDropdown = page.locator(
      'input[name="PayGroupList_input"]'
    );
    this.payPeriodEndDateListDropdown = page.locator(
      'input[name="PayPeriodEndDateList_input"]'
    );
    this.payRegionListDropdown = page.locator(
      'input[name="PayRegionList_input"]'
    );
    this.payCalendarListDropdown = page.locator(
      'input[name="PayCalendarList_input"]'
    );
    this.payStatusListDropdown = page.locator(
      'input[name="PayrollStatusList_input"]'
    );
    this.payDataLoadListDropdown = page.locator(
      'input[name="DataLoadList_input"]'
    );
    this.payInputSheetListDropdown = page.locator(
      'input[name="InputSheetList_input"]'
    );
    this.payAdjustmentListDropdown = page.locator(
      'input[name="AdjustmentList_input"]'
    );
    this.payRegisterReviewPayrollDropdown = page.locator(
      'input[name="RegisterReviewPayrollList_input"]'
    );
    this.payRegisterReviewLocationDropdown = page.locator(
      'input[name="RegisterReviewLocationList_input"]'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Regular"
    );
  }

  // get elements
  async getAllPayLogo() {
    await expect(this.mainLogo).toBeVisible();
  }

  async getPayrollGrid() {
    await expect(this.payrollgGrid).toBeVisible();
  }

  async getPayrollGroupListDropdown() {
    await expect(this.payGroupListDropdown).toBeVisible();
  }

  async getPeriodEndDateListDropdown() {
    await expect(this.payPeriodEndDateListDropdown).toBeVisible();
  }

  async getPayRegionlistDropdown() {
    await expect(this.payRegionListDropdown).toBeVisible();
  }

  async getPayCalendarListDropdown() {
    await expect(this.payCalendarListDropdown).toBeVisible();
  }

  async getPayrollStatusListDropdown() {
    await expect(this.payStatusListDropdown).toBeVisible();
  }

  async getPayrollDataLoadListDropdown() {
    await expect(this.payDataLoadListDropdown).toBeVisible();
  }

  async getPayrollInputSheetListDropdown() {
    await expect(this.payInputSheetListDropdown).toBeVisible();
  }

  async getAdjustmentListDropdown() {
    await expect(this.payAdjustmentListDropdown).toBeVisible();
  }

  async getRegisterReviewPayrollDropdown() {
    await expect(this.payRegisterReviewPayrollDropdown).toBeVisible();
  }

  async getPayRegisterReviewLocationDropdown() {
    await expect(this.payRegisterReviewLocationDropdown).toBeVisible();
  }

  // click elements
  async clickPayrollLink() {
    await this.payrollLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/Regular"
    );
  }

  async clickPayrollGroupListDropdown() {
    await this.payGroupListDropdown.click();
  }

  async clickPeriodEndDateListDropdown() {
    await this.payPeriodEndDateListDropdown.click();
  }

  async clickPayRegionListDropdown() {
    await this.payRegionListDropdown.click();
  }

  async clickPayCalendarListDropdown() {
    await this.payCalendarListDropdown.click();
  }

  async clickPayrollStatusListDropdown() {
    await this.payStatusListDropdown.click();
  }

  async clickPayrollDataLoadListDropdown() {
    await this.payDataLoadListDropdown.click();
  }

  async clickAdjustmentListDropdown() {
    await this.payAdjustmentListDropdown.click();
  }

  async clickPayrollRegisterReviewPayrollDropdown() {
    await this.payRegisterReviewPayrollDropdown.click();
  }

  async clickPayRegisterReviewLocationDropdown() {
    await this.payRegisterReviewLocationDropdown.click();
  }

  // interact with elements

  async inputCompanyDropdown(text) {
    await this.payGroupListDropdown.click();
    await this.payGroupListDropdown.fill(text);
    await this.payGroupListDropdown.press("ArrowDown");
    await this.payGroupListDropdown.press("Enter");
    const medford = await this.page.innerText("text=Medford CJD (L0004)");
    expect(medford).toBe("Medford CJD (L0004)");
  }

  // this isn't working in Chromium for some reason, saying NO DATA
  // not occurring when using Chrome standard. Need to figure this out later

  // async inputPPEDateListDropdown(text) {
  // await this.payPeriodEndDateListDropdown.click();
  // await this.payPeriodEndDateListDropdown.fill(text);
  // await this.payPeriodEndDateListDropdown.press("Enter");

  // const ppeDate = await this.page.innerText("text=01/15/2022");
  // expect(ppeDate).toBe("01/15/2022");
  // }

  async inputPayRegionListDropdown(text) {
    await this.payRegionListDropdown.click();
    await this.payRegionListDropdown.fill(text);
    await this.payRegionListDropdown.press("ArrowDown");
    await this.payRegionListDropdown.press("Enter");

    // TEST env data doesn't have response from all PayGroups, so can't test that specifically yet
  }

  async inputPayCalendarListDropdown(text) {
    await this.payCalendarListDropdown.click();
    await this.payCalendarListDropdown.fill(text);
    await this.payCalendarListDropdown.press("ArrowDown");
    await this.payCalendarListDropdown.press("Enter");
  }

  async inputPayStatusListDropdown(text) {
    await this.payStatusListDropdown.click();
    await this.payStatusListDropdown.fill(text);
    await this.payStatusListDropdown.press("ArrowDown");
    await this.payStatusListDropdown.press("Enter");
  }
  async inputPayDataLoadListDropdown(text) {
    await this.payDataLoadListDropdown.click();
    await this.payDataLoadListDropdown.fill(text);
    await this.payDataLoadListDropdown.press("ArrowDown");
    await this.payDataLoadListDropdown.press("Enter");
  }

  async inputPayInputSheetListDropdown(text) {
    await this.payInputSheetListDropdown.click();
    await this.payInputSheetListDropdown.fill(text);
    await this.payInputSheetListDropdown.press("ArrowDown");
    await this.payInputSheetListDropdown.press("Enter");
  }

  async inputPayAdjustmentListDropdown(text) {
    await this.payAdjustmentListDropdown.click();
    await this.payAdjustmentListDropdown.fill(text);
    await this.payAdjustmentListDropdown.press("ArrowDown");
    await this.payAdjustmentListDropdown.press("Enter");
  }

  async inputPayRegisterReviewPayrollDropdown(text) {
    await this.payRegisterReviewPayrollDropdown.click();
    await this.payRegisterReviewPayrollDropdown.fill(text);
    await this.payRegisterReviewPayrollDropdown.press("ArrowDown");
    await this.payRegisterReviewPayrollDropdown.press("Enter");
  }

  async inputPayRegisterReviewLocationDropdown(text) {
    await this.payRegisterReviewLocationDropdown.click();
    await this.payRegisterReviewLocationDropdown.fill(text);
    await this.payRegisterReviewLocationDropdown.press("ArrowDown");
    await this.payRegisterReviewLocationDropdown.press("Enter");
  }
}
module.exports = { PayrollRegular };
