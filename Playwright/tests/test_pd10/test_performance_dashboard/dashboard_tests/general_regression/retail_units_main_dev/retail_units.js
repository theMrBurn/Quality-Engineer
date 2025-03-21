const { expect } = require("@playwright/test");

class RetailUnits {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getUsername: () => this.page.locator("id=i0116"),
      getPassword: () => this.page.locator("id=i0118"),
      getNewRetailUnits: () =>
        this.page.locator(':nth-match(:text("New Vehicle Retail Units"), 1)'),
      getUsedRetailUnits: () =>
        this.page.locator(':nth-match(:text("Used Vehicle Retail Units"), 1)'),
      getStoreNVI: () => this.page.locator("#newTable >> text=ABC Hyundai"),
      getStoreUVI: () => this.page.locator("#usedTable >> text=ABC Hyundai"),
      getTotalRows: () => this.page.locator("tr"),
    };
  }

  // navigation
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  async ValidateStoreNameForNewRetailUnits() {
    await this.clickElement("getNewRetailUnits");
    await this.page.waitForLoadState("networkidle");
    await this.checkElementVisibility("getStoreNVI");
    await this.locators.getStoreNVI().click();
    await this.page.waitForTimeout(5000);
    const totalRows = await this.locators.getTotalRows().count();

    for (let i = 1; i < totalRows - 2; i++) {
      const actualXpath = `//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`;
      await expect(this.page.locator(actualXpath)).toHaveText("ABC Hyundai");
    }
  }

  async ValidateStoreNameForUsedRetailUnits() {
    await this.clickElement("getUsedRetailUnits");
    await this.page.waitForLoadState("networkidle");
    await this.checkElementVisibility("getStoreUVI");
    await this.locators.getStoreUVI().click();
    await this.page.waitForTimeout(5000);
    const totalRows = await this.locators.getTotalRows().count();

    for (let i = 1; i < totalRows - 2; i++) {
      const actualXpath = `//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`;
      await expect(this.page.locator(actualXpath)).not.toHaveText("test");
      await expect(this.page.locator(actualXpath)).toHaveText("ABC Hyundai");
    }
  }

  // common test methods
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
}

module.exports = { RetailUnits };
