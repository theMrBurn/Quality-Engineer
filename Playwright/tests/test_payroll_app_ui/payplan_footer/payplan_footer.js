// this POM is for /Payplan/PayplanFooter
const { expect } = require("@playwright/test");

class PayplanFooter {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      payplanHeader: () => page.locator("text=Pay Plan Footer"),
      editPayPlanHeader: () => page.locator("text=Edit Pay Plan Footer"),
      footerNameText: () => page.locator('label:has-text("Footer Name")'),
      experationDateText: () => page.locator("text=Expiration Date"),
      footerNameColumnText: () => page.locator('a:has-text("Footer Name")'),
      effectiveDateText: () => page.locator("text=Effective Date"),
      payRateTypeColumnText: () => page.locator("text=Pay Rate Type"),
      updatedByColumnText: () => page.locator("text=Updated By"),
      updatedOnColumnText: () => page.locator("text=Updated On"),

      //
      saveConfirmationAlert: () => page.locator("#divSuccessHolder"),
      addFooterButton: () => page.locator('#grid div:has-text("Add Footer")'),
      clearFiltersButton: () => page.locator("text=Clear Filters"),
      editButton: () => page.locator("text=Edit"),
      saveButton: () => page.locator("text=Save"),
      backButton: () => page.locator("text=Back"),
      dropdownTriangle: () => page.locator('[aria-label="select"] >> nth=0'),
      footerNameInput: () => page.locator('input[name="NameList_input"]'),
    };
  }

  // Navigation
  async goto() {
    await this.page.goto("/PayPlan/PayPlanFooter");
    await this.page.waitForLoadState("networkidle");
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
      await this.page.waitForLoadState("networkidle");
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("load");
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

module.exports = { PayplanFooter };
