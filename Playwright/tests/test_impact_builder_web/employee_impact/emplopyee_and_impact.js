// this POM is for /Admin
const { expect } = require("@playwright/test");

class EmployeeAndImpact {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.employeeAndImpact = page.locator(
      '//*[@id="root"]/div/div[3]/div/div[1]/div/div[1]/div/label'
    );

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
    this.reasonTypeDropdown = page.getByRole("button", {
      name: "Reason Type Pay Plan Change",
    });
    this.monthlyAverageDropdown = page.locator('//*[@id="mui-2"]'); //need data-test-id in order to properly automate choosing the various options
    this.impactBuilderButton = page.getByRole("button", {
      name: " Impact Builder",
    });

    // forms and grids

    // calendar elements
    this.closingMonthCalendar = page.locator('//*[@id="mui-1"]');
  }

  // Navigate to Impact Builder and pass PayPlan object
  async goto(text) {
    await this.page.goto(text), { waitUntil: "networkidle" };
  }

  // get page elements

  async getEmployeeAndImpactHeader() {
    await expect(
      this.employeeAndImpact,
      "Employee And Impact component header not found"
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

  async clickImpactBuilderButton() {
    await this.impactBuilderButton.click();
    await this.page.getByRole("button", { name: " Impact Builder" }).click();
  }

  async clickReasonTypeDropdownInput() {
    await this.getReasonTypeDropdown();
    await this.reasonTypeDropdown.click();
  }

  // input elements and forms

  // Navigate to Impact Builder from Employee payplan
}
module.exports = { EmployeeAndImpact };
