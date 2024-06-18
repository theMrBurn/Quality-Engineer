// this POM is for /Admin
const { expect } = require("@playwright/test");

class Admin {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    ///Locators
    this.locators = {
      // headers
      adminPageHeader: () =>
        this.page.getByRole("heading", { name: "Legal Explanation" }),

      // unique page text
      gridNameText: () => this.page.locator("text=Grid Name"),
      categoryText: () => this.page.locator('label:has-text("Category")'),
      legalExplanationText: () =>
        this.page.locator("text=Legal Explanation Text"),
      startDateText: () => this.page.locator('label:has-text("Start Date")'),
      endDateText: () => this.page.locator('label:has-text("End Date")'),

      // buttons, dropdowns and input boxes
      newLegalButton: () => this.page.locator("text=New Legal Explanation"),
      categoryDropdownTriangle: () =>
        this.page.locator('[aria-label="select"] >> nth=0'),
      legalExplanationInput: () =>
        this.page.locator('input[name="SearchTextBox"]'),

      positionTypeDefinitions: () =>
        this.page.locator(
          'li[role="option"]:has-text("Position Type Definitions")',
        ),

      dataTypeDefinitions: () =>
        this.page.locator(
          'li[role="option"]:has-text("Data Type Definitions")',
        ),

      startDatePicker: () => this.page.locator('input[name="StartDatePicker"]'),
      endDatePicker: () => this.page.locator('input[name="EndDatePicker"]'),

      cancelButton: () => this.page.locator("text=Cancel"),

      // forms and grids
      nameGridColumn: () => this.page.locator("text=Name"),
      categoryGridColumn: () => this.page.locator('a:has-text("Category")'),
      legalExplanationGridColumn: () =>
        this.page.locator(
          '#LegalExplanationGrid div:has-text("New Legal Explanation")',
        ),
      startDateGridColumn: () => this.page.locator('a:has-text("Start Date")'),
      endDateGridColumn: () => this.page.locator('a:has-text("End Date")'),
      startDateGridInput: () => this.page.locator('//*[@id="StartDate"]'),
      endDateGridInput: () => this.page.locator('//*[@id="EndDate"]'),
      gridNameInput: () => this.page.locator('input[name="Name"]'),
      gridCategoryInput: () => this.page.locator('input[name="Category"]'),

      // calendar elements
      startDateCalendar: () =>
        this.page.locator('[aria-label="select"] >> nth=1'),
    };
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/Admin");
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
module.exports = { Admin };
