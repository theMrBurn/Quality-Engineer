// this POM is for /Admin
const { expect } = require("@playwright/test");

class ImpactBuilder {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.ImpactBuilderHeader = page.getByRole("heading", {
      name: "Impact Builder",
    });

    // unique page text
    this.employeeName = page.getByLabel("Employee");
    this.companyName = page.getByLabel("Company");
    this.jobName = page.getByLabel("Job");
    this.newAveragePay = page.locator(
      "div:nth-child(2) > div:nth-child(4) > .MuiInputBase-root > .MuiInputBase-input"
    );
    this.currentAveragePay = page
      .locator("div:nth-child(4) > .MuiInputBase-root > .MuiInputBase-input")
      .first();

    // buttons, dropdowns and input boxes
    this.reasonTypeDropdown = page.locator('//*[@id="mui-1"]');
    this.monthlyAverageDropdown = page.locator('//*[@id="mui-2"]'); //need data-test-id in order to properly automate choosing the various options

    // forms and grids

    // calendar elements
    this.closingMonthCalendar = page.locator('//*[@id="mui-1"]');
  }

  // Navigate to Impact Builder and pass PayPlan object *** this isn't working right now for some reason, must use direct page.goto() on test file
  async goto(text) {
    await this.page.goto(text), { waitUntil: "networkidle" };
  }

  // get page elements

  async getImpactBuilderHeader() {
    await expect(
      this.ImpactBuilderHeader,
      "Impact Builder Page header not found"
    ).toBeVisible();
  }

  async getReasonTypeDropdown() {
    await expect(
      this.reasonTypeDropdown,
      "Reason Type Dropdown not found"
    ).toBeVisible();
  }

  async getdClosingMonthCalendarInput() {
    await expect(
      this.closingMonthCalendar,
      "Closing Month Calendar not found"
    ).toBeVisible();
  }

  async getMonthlyAverageDropdown() {
    await expect(
      this.monthlyAverageDropdown,
      "Monthly Average Dropdown not found"
    ).toBeVisible();
  }

  async getEmployeeName() {
    await expect(this.employeeName, "Employee Name not found").toBeVisible();
  }

  async getCompanyName() {
    await expect(this.companyName, "Company Name not found").toBeVisible();
  }

  async getJobName() {
    await expect(this.jobName, "Job Name not found").toBeVisible();
  }

  async getNewAveragePay() {
    await expect(this.newAveragePay, "New Average Pay not found").toBeVisible();
  }

  async getCurrentAveragePay() {
    await expect(
      this.currentAveragePay,
      "Current Average Pay not found"
    ).toBeVisible();
  }

  // interact with elements

  async clickCategoryDropdown() {
    await this.getCategoryDropdown();
    await this.categoryDropdownTriangle.click();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms

  async inputLegalExplanation(text) {
    await this.getLegalExplanationInputBox();
    await this.legalExplanationInput.fill(text);
  }
}
module.exports = { ImpactBuilder };
