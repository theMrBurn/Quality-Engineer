// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class PerfDashAdmin {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Atlas landing page elements
    this.locators = {
      heading1: () => this.page.locator("body > div > main > div > h1"),

      // kendo Grid elements
      kGridLocator: () => this.page.locator('//*[@id=":R4kvaj6:"]'),

      // buttons
      deleteAdminButton: () => this.page.locator('body > div > main > div > div:nth-child(1) > button'),
      
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
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
module.exports = { PerfDashAdmin };
