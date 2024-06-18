// this POM is for Admin/Employee
const { expect } = require("@playwright/test");

class AdminEmployee {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      // headers
      employeeDetailsHeader: () =>
        page.locator('h2:has-text("Employee Details")'),

      // text and labels
      employeeText: () => page.locator('label:has-text("Employee")'),
      companyText: () => page.locator('label:has-text("Company")'),
      statusText: () => page.locator("text=Status >> nth=0"),
      jobText: () => page.locator('label:has-text("Job")'),
      payPlanStatusText: () =>
        page.locator('label:has-text("Pay Plan Status")'),
      departmentText: () => page.locator('label:has-text("Department")'),
      activeText: () => page.locator('label:has-text("Active")'),
      payPlanCalculationText: () => page.locator("text=Pay Plan Calculation"),
      serviceDateText: () => page.locator('label:has-text("Service Date")'),

      // page elements
      // inputs
      companyInput: () => page.locator('input[name="PayGroupList_input"]'),
      statusListInput: () => page.locator('input[name="StatusList_input"]'),
      jobsListInput: () => page.locator('input[name="JobList_input"]'),
      payPlanStatusInput: () => page.locator('input[role="listbox"]'),
      employeeInput: () =>
        page.locator(
          'text=Company Employee Service Date to >> [aria-label="select"] >> nth=1',
        ),
      departmentInput: () => page.locator('input[name="DepartmentList_input"]'),
      activeInput: () =>
        page.locator('input[name="PayPlanCalculationList_input"]'),
      payPlanCalculationInput: () =>
        page.locator('input[name="PayPlanCalculationList_input"]'),

      // dropdowns
      companyDropdown: () =>
        page.locator(
          'text=Company Employee Service Date to >> [aria-label="select"] >> nth=0',
        ),
      statusDropdown: () =>
        page.locator(
          'text=Status Department >> [aria-label="select"] >> nth=0',
        ),
      jobDropdown: () =>
        page.locator('text=Job Active >> [aria-label="select"] >> nth=0'),
      departmentDropdown: () =>
        page.locator(
          'text=Status Department >> [aria-label="select"] >> nth=1',
        ),
      activeDropdown: () =>
        page.locator('text=Job Active >> [aria-label="select"] >> nth=1'),
      payPlanCalculationDropdown: () =>
        page.locator(
          "div:nth-child(4) > div:nth-child(2) > div > .k-widget > .k-dropdown-wrap > .k-select",
        ),
    };
  }

  // Navigation
  async goto() {
    await this.page.goto("/Admin/EmployeeDetails");
  }

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

module.exports = { AdminEmployee };
