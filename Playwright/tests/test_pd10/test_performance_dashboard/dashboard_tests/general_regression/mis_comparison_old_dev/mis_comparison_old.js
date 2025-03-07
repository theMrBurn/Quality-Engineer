// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      speLogo: "id=logo",
      mainTab: ':nth-match(:text("Main"),1)',
      mainMIS: 'text="MIS"',
      mainMIScomp: "role=link[name='MIS Comparison']",
      storeSelector: '//*[@id="misStoreSelect"]/div[1]',
      getSelectStore1: "text=ALABAMA[+] >> div",
      getSelectStore2: "text=ALASKA[+] >> div",
      getSelectStore3: "text=CALIFORNIA[+] >> div",
      getSelectStoresButton: "#js-mask",
      getSubmit: '//input[@value="Submit"]',
    };
  }

  async goto() {
    await this.page.goto();
    await this.page.waitForLoadState("networkidle");
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

  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorString = this.locators[locatorName];

    try {
      const element = await this.page.locator(locatorString).first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorString = this.locators[key];
      if (locatorString) {
        try {
          await this.page.waitForLoadState("networkidle");
          const inputElement = await this.page.locator(locatorString);
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

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorString = this.locators[locatorName];

    try {
      const element = await this.page.locator(locatorString).first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = { MainStore };
