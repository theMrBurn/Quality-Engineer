const { expect } = require("@playwright/test");

class EmployeeImpact {
  constructor(page) {
    this.page = page;
    this.locators = {
      impactBuilderAnalysisHeader: () => this.page.getByText("Impact Analysis"),
      reasonTypeDropdown: () => this.page.locator('//*[@id="menu-"]/div[3]/ul'),
      // other locators...
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/Reports/28");
    await this.page.waitForLoadState("domcontentloaded");
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

  // find first grid row
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

  // interact with elements
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

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      throw new Error(
        `Clicking on locator '${locatorName}' failed: ${originalError.message}`,
      );
    }
  }
}

module.exports = { EmployeeImpact };
