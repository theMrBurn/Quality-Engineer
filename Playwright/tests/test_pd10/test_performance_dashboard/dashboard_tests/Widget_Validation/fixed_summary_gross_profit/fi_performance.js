const { expect } = require("@playwright/test");

class MngrPerformance {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  locators = {
    getUsername: () => this.page.locator("id=i0116"),
    getPassword: () => this.page.locator("id=i0118"),
    getSalesTab: () => this.page.locator('text="Sales" >> nth=0'),
    getSalesFIOps: () => this.page.locator(':nth-match(:text("F&I Ops"),1)'),
    getSalesFIOpsDashboard: () =>
      this.page.locator(':nth-match(:text("F&I Ops Dashboard"),1)'),
    getSalesFILogNew: () => this.page.locator(':nth-match(:text("F&I Log"),1)'),
    getStoreSelector: () =>
      this.page.locator(
        'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      ),
    getAllselector: () => this.page.locator(".allSelectorIndicator"),
    getSelectButton: () => this.page.locator("#storeSelector >> text=Select"),
    getBuick: () => this.page.locator('label:has-text("Troy Buick GMC")'),
    getMichigan: () =>
      this.page.locator(
        "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
      ),
    getFord: () => this.page.locator('label:has-text("Troy Ford")'),
    getMazda: () => this.page.locator('label:has-text("Troy Mazda")'),
  };

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  // Common test methods
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("networkidle");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }
}

module.exports = { MngrPerformance };
