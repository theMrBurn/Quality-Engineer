const { expect } = require("@playwright/test");

/**
 * Base Page Object Model — all feature POMs extend this.
 * Provides common interaction methods that reference this.page and this.locators.
 * Subclasses define this.locators in their constructor after calling super(page).
 */
class BasePOM {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {};
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

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

  async checkElementText(locatorName, expectedText) {
    await this.page.waitForLoadState("networkidle");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toContainText(expectedText);
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
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
        try {
          await this.page.waitForLoadState("networkidle");
          const inputElement = await locatorFunction();
          await inputElement.fill(value);
        } catch (originalError) {
          const errorMessage = `Filling the form field with locator '${key}' failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement);
    const gridRowHandles = await this.page.$$(gridElement);

    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }
}

module.exports = { BasePOM };
