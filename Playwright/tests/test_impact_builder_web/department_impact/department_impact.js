// this POM is for /Admin
const { expect } = require("@playwright/test");

class DepartmentImpact {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.departmentImpactHeader = page.getByText("Department Impact");

    // unique page text
    this.serviceAdvisorText = page.getByRole("columnheader", {
      name: "Service Advisor",
    });
    this.personalExpenseText = page.getByRole("rowheader", {
      name: "Personnel Expense",
    });
    this.expensePercentGrossText = page.getByRole("rowheader", {
      name: "Expense as % of Gross",
    });
    this.expenseGuideText = page.getByRole("rowheader", {
      name: "Expense Guide",
    });

    // buttons, dropdowns and input boxes

    // forms and grids

    // calendar elements
    this.closingMonthCalendar = page.locator('//*[@id="mui-1"]');
  }

  // Navigate to Impact Builder and pass PayPlan object
  async goto(text) {
    await this.page.goto(text), { waitUntil: "networkidle" };
  }

  // get page elements

  async getServiceAdvisorText() {
    await expect(
      this.serviceAdvisorText,
      "Service Advisor Text not found"
    ).toBeVisible();
  }

  async getPersonalExpenseText() {
    await expect(
      this.personalExpenseText,
      "Personal Expense Text not found"
    ).toBeVisible();
  }

  async getExpensePercentGrossText() {
    await expect(
      this.expensePercentGrossText,
      "Expense as % of Gross Text not found"
    ).toBeVisible();
  }

  async getExpenseGuideText() {
    await expect(
      this.expenseGuideText,
      "Expense Guide Text not found"
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
module.exports = { DepartmentImpact };
