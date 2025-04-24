const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      getOffice: () => this.page.locator(':nth-match(:text("Office"),1)'),
      getOfficeCashARValidation: () =>
        this.page.locator(':nth-match(:text("Cash & AR Validation"),1)'),
      getStoreReport: () =>
        this.page.locator(
          '//*[@id="divSubMain"]/table[1]/tbody[1]/tr[1]/td[1]/a[1]',
        ),
    };
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  // common methods
  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement);
    const gridRowHandles = await this.page.$$(gridElement);

    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      await this.ensureElementIsConnected(firstGridRow);
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

  async ensureElementIsConnected(element) {
    const isConnected = await this.page.evaluate(
      (el) => el.isConnected,
      element,
    );
    if (!isConnected) {
      throw new Error("Element is not attached to the DOM");
    }
  }

  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");

    const locatorFunction = this.locators[locatorName];
    const element = await locatorFunction().first();

    try {
      await expect(element).toBeVisible();
    } catch (error) {
      throw new Error(
        `Locator '${locatorName}' is not visible: ${error.message}`,
      );
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
        } catch (error) {
          throw new Error(
            `Filling the form field with locator '${key}' failed: ${error.message}`,
          );
        }
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");

    const locatorFunction = this.locators[locatorName];
    const element = await locatorFunction().first();

    try {
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(
        `Clicking on locator '${locatorName}' failed: ${error.message}`,
      );
    }
  }
}
module.exports = { MainStore };
