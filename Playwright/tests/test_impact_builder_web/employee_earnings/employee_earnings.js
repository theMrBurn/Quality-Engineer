// this POM is for /Admin
const { expect } = require("@playwright/test");

class EmployeeEarnigs {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.employeeEarningsHeader = page.getByText("Employee Earnings");

    // unique component text
    this.descriptionRowText = page.getByRole("row", {
      name: "Description 2021 Average 3 Month Average Performance Objective",
    });
    this.twentyTwentyOneAverageText = page.getByRole("columnheader", {
      name: "2021 Average",
    });
    this.threeMonthAverageText = page
      .getByRole("row", {
        name: "Description 2021 Average 3 Month Average Performance Objective",
      })
      .getByRole("columnheader", { name: "3 Month Average" });
    this.performanceObjectiveText = page
      .getByRole("row", {
        name: "Description 2021 Average 3 Month Average Performance Objective",
      })
      .getByRole("columnheader", { name: "Performance Objective" });
    this.totalMonthlyPayText = page.getByRole("rowheader", {
      name: "Total Monthly Pay",
    });

    this.totalAnnualPayText = page.getByRole("rowheader", {
      name: "Total Annual Pay",
    });
    this.totalBiWeeklyPayText = page.getByRole("rowheader", {
      name: "Total Bi-Weekly Pay",
    });

    // buttons, dropdowns and input boxes

    // forms and grids

    // calendar elements
  }

  // Navigate to Impact Builder and pass PayPlan object
  async goto(text) {
    await this.page.goto(text), { waitUntil: "networkidle" };
  }

  // get page elements

  async getEmployeeEarningsHeader() {
    await expect(
      this.employeeEarningsHeader,
      "Employee Earnings header not found"
    ).toBeVisible();
  }

  async getDescriptionRowText() {
    await expect(
      this.descriptionRowText,
      "Description Row text not found"
    ).toBeVisible();
  }

  async getTwentyTwentyOneColumnText() {
    await expect(
      this.twentyTwentyOneAverageText,
      "2021 Average Column Text not found"
    ).toBeVisible();
  }

  async getThreeMonthAverageColumnText() {
    await expect(
      this.threeMonthAverageText,
      "3 Month Average Comlumn Text not found"
    ).toBeVisible();
  }

  async getPerformanceObjectiveText() {
    await expect(
      this.performanceObjectiveText,
      "Performance Objective Column Text not found"
    ).toBeVisible();
  }

  async getTotalMonthlyPayText() {
    await expect(
      this.totalMonthlyPayText,
      "Total Monthly Pay Text not found"
    ).toBeVisible();
  }

  async getTotalAnnualPayText() {
    await expect(
      this.totalAnnualPayText,
      "Total Annual Pay Text not found"
    ).toBeVisible();
  }

  async getTotalBiWeeklyPayText() {
    await expect(
      this.totalBiWeeklyPayText,
      "Total Annual Pay Text not found"
    ).toBeVisible();
  }

  // interact with elements

  async clickCategoryDropdown() {
    await this.getCategoryDropdown();
    await this.categoryDropdownTriangle.click();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms
}
module.exports = { EmployeeEarnigs };
