const { expect } = require("@playwright/test");

class PerformanceTracking {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    // Centralized locators with parameters for flexibility
    this.locators = {
      multipleStores: (name) =>
        this.page
          .locator(
            `div:has-text("${name} Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")`,
          )
          .nth(2),
      specificStore: (storeLabel) =>
        this.page.locator(`label:has-text("${storeLabel}")`),
      selectStoreButton: () => this.page.getByText("Select Store"),
      locationText: (locationText) =>
        this.page.locator(`text=${locationText} >> div`).nth(2),
      performanceTracking: (index) =>
        this.page.locator(
          `#PerformanceTracking table tbody tr td:nth-child(${index})`,
        ),
    };
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  // Check element visibility
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      throw new Error(
        `Locator '${locatorName}' failed: ${originalError.message}`,
      );
    }
  }

  // Find first grid row
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

      await this.page.waitForTimeout(1000);
      await firstGridRow.click();
      await this.page.waitForLoadState("networkidle");
    } else {
      console.log("No grid rows found.");
    }
  }

  // Interact with elements
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

  async clickElement(locatorName, param) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction(param).first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      throw new Error(
        `Clicking on locator '${locatorName}' failed: ${originalError.message}`,
      );
    }
  }

  // Select store dynamically
  async selectStore(storeName, locationText, storeLabel) {
    await this.clickElement("multipleStores", storeName);
    await this.clickElement("locationText", locationText);
    await this.clickElement("specificStore", storeLabel);
    await this.clickElement("selectStoreButton");
  }

  // Validate units
  async validateUnits() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);

    const values = await Promise.all([
      this.locators.performanceTracking(2).innerText(),
      this.locators.performanceTracking(3).innerText(),
      this.locators.performanceTracking(4).innerText(),
    ]);

    const parsedValues = values.map((value) =>
      parseInt(value.replace(",", "")),
    );
    return parsedValues;
  }

  async validateWithDetailUnits() {
    const values = await this.validateUnits();
    const [newActual, usedActual, totalActual] = values;

    if (newActual !== usedActual) {
      console.log(
        `Mismatch between newActual and usedActual: ${newActual} !== ${usedActual}`,
      );
    }
    if (usedActual !== totalActual) {
      console.log(
        `Mismatch between usedActual and totalActual: ${usedActual} !== totalActual`,
      );
    }
  }
}

module.exports = { PerformanceTracking };
