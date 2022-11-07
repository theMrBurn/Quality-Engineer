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
    this.companyDropdownTriangle = page.locator(".k-select >> nth=0");
    this.ppeDateDropdownTriangle = page.locator(".k-select >> nth=1");
    this.expandAuditView = page.locator(
      '//*[@id="PayrollGrid"]/table/tbody/tr[1]/td[1]/a'
    );
    this.collapseAuditView = page.locator(
      '//*[@id="PayrollGrid"]/table/tbody/tr[1]/td[1]/a'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/Payroll/Regular");
    await this.page.waitForLoadState("networkidle");
  }

  // get elements

  async getPayrollGrid() {
    await expect(this.payrollgGrid, "Payroll Grid not found").toBeVisible();
  }

  async getPayrollGroupListDropdown() {
    await expect(
      this.payGroupListDropdown,
      "Paygrood List Dropdown not found"
    ).toBeVisible();
  }

  async getPeriodEndDateListDropdown() {
    await expect(
      this.payPeriodEndDateListDropdown,
      "Period End Date list dropdown not found"
    ).toBeVisible();
  }

  async getPayRegionlistDropdown() {
    await expect(
      this.payRegionListDropdown,
      "Pay Region List dropdown not found"
    ).toBeVisible();
  }

  async getPayCalendarListDropdown() {
    await expect(
      this.payCalendarListDropdown,
      "Pay Calendar List dropdown not found"
    ).toBeVisible();
  }

  async getPayrollStatusListDropdown() {
    await expect(
      this.payStatusListDropdown,
      "Payroll Status List dropdown not found"
    ).toBeVisible();
  }

  async getPayrollDataLoadListDropdown() {
    await expect(this.payDataLoadListDropdown).toBeVisible();
  }

  async getPayrollInputSheetListDropdown() {
    await expect(
      this.payInputSheetListDropdown,
      "Payroll Input Sheet List dropdown not found"
    ).toBeVisible();
  }

  async getAdjustmentListDropdown() {
    await expect(
      this.payAdjustmentListDropdown,
      "Adjustment List Dropdown"
    ).toBeVisible();
  }

  async getRegisterReviewPayrollDropdown() {
    await expect(
      this.payRegisterReviewPayrollDropdown,
      "Register Review Payroll dropdown not found"
    ).toBeVisible();
  }

  async getPayRegisterReviewLocationDropdown() {
    await expect(
      this.payRegisterReviewLocationDropdown,
      "Pay Register Review Location dropdown not found"
    ).toBeVisible();
  }

  async getCompanyDropdown() {
    await expect(
      this.companyDropdownTriangle,
      "Company Dropdown triangle not found"
    ).toBeVisible();
  }

  async getPPEdateDropdownTriangle() {
    await expect(
      this.ppeDateDropdownTriangle,
      "PPE Date dropdown triangle not found"
    ).toBeVisible();
  }

  async getExpandAuditView() {
    await expect(
      this.expandAuditView,
      "Unable to find Expand Audit View"
    ).toBeVisible();
  }

  async getCollapseAuditView() {
    await expect(
      this.collapseAuditView,
      "Unable to find Collapse Audit View"
    ).toBeVisible();
  }

  // click elements

  async clickPayrollGroupListDropdown() {
    await this.getCompanyDropdownTriangle();
    await this.companyDropdownTriangle.click();
  }

  async clickPeriodEndDateListDropdown() {
    await this.getPeriodEndDateListDropdown();
    await this.payPeriodEndDateListDropdown.click();
  }

  async clickPayRegionListDropdown() {
    await this.getPayRegionlistDropdown();
    await this.payRegionListDropdown.click();
  }

  async clickPayCalendarListDropdown() {
    await this.getPayCalendarListDropdown();
    await this.payCalendarListDropdown.click();
  }

  async clickPayrollStatusListDropdown() {
    await this.getPayrollStatusListDropdown();
    await this.payStatusListDropdown.click();
  }

  async clickPayrollDataLoadListDropdown() {
    await this.getPayrollDataLoadListDropdown();
    await this.payDataLoadListDropdown.click();
  }

  async clickAdjustmentListDropdown() {
    await this.getAdjustmentListDropdown();
    await this.payAdjustmentListDropdown.click();
  }

  async clickPayrollRegisterReviewPayrollDropdown() {
    await this.getRegisterReviewPayrollDropdown();
    await this.payRegisterReviewPayrollDropdown.click();
  }

  async clickPayRegisterReviewLocationDropdown() {
    await this.getPayRegisterReviewLocationDropdown();
    await this.payRegisterReviewLocationDropdown.click();
  }

  async clickExpandAuditView() {
    await this.getExpandAuditView();
    await this.expandAuditView.click();
  }

  async clickCollapseAuditView() {
    await this.getCollapseAuditView();
    await this.collapseAuditView.click();
  }

  // interact with elements

  async clickInputCompanyDropdown() {
    await this.getCompanyDropdown();
    await this.companyDropdownTriangle.click();
  }

  async clickPeriodEndDateListDropdown() {
    await this.getPPEdateDropdownTriangle();
    await this.ppeDateDropdownTriangle.click();
  }

  async inputCompanyDropdown(text) {
    await this.getPayrollGroupListDropdown();
    await this.payGroupListDropdown.click();
    await this.payGroupListDropdown.fill(text);
    await this.payGroupListDropdown.press("ArrowDown");
    await this.payGroupListDropdown.press("Enter");
    const medford = await this.page.innerText("text=Medford CJD (L0004)");
    expect(medford).toBe("Medford CJD (L0004)");
  }

  async inputPayRegionListDropdown(text) {
    await this.getPayRegionlistDropdown();
    await this.payRegionListDropdown.click();
    await this.payRegionListDropdown.fill(text);
    await this.payRegionListDropdown.press("ArrowDown");
    await this.payRegionListDropdown.press("Enter");

    // TEST env data doesn't have response from all PayGroups, so can't test that specifically yet
  }

  async inputPayCalendarListDropdown(text) {
    await this.getPayCalendarListDropdown();
    await this.payCalendarListDropdown.click();
    await this.payCalendarListDropdown.fill(text);
    await this.payCalendarListDropdown.press("ArrowDown");
    await this.payCalendarListDropdown.press("Enter");
  }

  async inputPayStatusListDropdown(text) {
    await this.getPayrollStatusListDropdown();
    await this.payStatusListDropdown.click();
    await this.payStatusListDropdown.fill(text);
    await this.payStatusListDropdown.press("ArrowDown");
    await this.payStatusListDropdown.press("Enter");
  }
  async inputPayDataLoadListDropdown(text) {
    await this.getPayrollDataLoadListDropdown();
    await this.payDataLoadListDropdown.click();
    await this.payDataLoadListDropdown.fill(text);
    await this.payDataLoadListDropdown.press("ArrowDown");
    await this.payDataLoadListDropdown.press("Enter");
  }

  async inputPayInputSheetListDropdown(text) {
    await this.getPayrollInputSheetListDropdown();
    await this.payInputSheetListDropdown.click();
    await this.payInputSheetListDropdown.fill(text);
    await this.payInputSheetListDropdown.press("ArrowDown");
    await this.payInputSheetListDropdown.press("Enter");
  }

  async inputPayAdjustmentListDropdown(text) {
    await this.getAdjustmentListDropdown();
    await this.payAdjustmentListDropdown.click();
    await this.payAdjustmentListDropdown.fill(text);
    await this.payAdjustmentListDropdown.press("ArrowDown");
    await this.payAdjustmentListDropdown.press("Enter");
  }

  async inputPayRegisterReviewPayrollDropdown(text) {
    await this.getPayRegisterReviewLocationDropdown();
    await this.payRegisterReviewPayrollDropdown.click();
    await this.payRegisterReviewPayrollDropdown.fill(text);
    await this.payRegisterReviewPayrollDropdown.press("ArrowDown");
    await this.payRegisterReviewPayrollDropdown.press("Enter");
  }

  async inputPayRegisterReviewLocationDropdown(text) {
    await this.getPayRegisterReviewLocationDropdown();
    await this.payRegisterReviewLocationDropdown.click();
    await this.payRegisterReviewLocationDropdown.fill(text);
    await this.payRegisterReviewLocationDropdown.press("ArrowDown");
    await this.payRegisterReviewLocationDropdown.press("Enter");
  }
}
module.exports = { PayrollRegular };
