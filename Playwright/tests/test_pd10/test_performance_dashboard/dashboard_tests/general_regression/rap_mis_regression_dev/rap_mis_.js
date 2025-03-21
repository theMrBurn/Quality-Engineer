const { expect } = require("@playwright/test");

class RapReport {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getSPELogo: () => page.locator("id=logo"),
      getServiceDashboard: () => page.locator(':nth-match(:text("Service"),1)'),
      getServiceRAPReport: () =>
        page.locator(':nth-match(:text("RAP Report"),1)'),
      getStoreSelector: () =>
        page.locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        ),
      getAllselector: () => page.locator(".allSelectorIndicator"),
      getVirginia: () =>
        page.locator(
          "text=VIRGINIA[+]Chantilly NissanChesapeake AcuraChesapeake ChevroletChesapeake HondaC >> div",
        ),
      getChesapeake: () => page.locator('label:has-text("Chesapeake Acura")'),
      getSelector: () => page.locator("#storeSelector >> text=Select"),
      getMainTab: () => page.locator(':nth-match(:text("Main"),1)'),
      getMainMIS: () => page.locator('text="MIS"'),
      getMainMIS1Standard: () =>
        page.locator(':nth-match(:text("MIS 1 (Standard)"),1)'),
      getServiceDetail: () => page.locator("//li[3]/span[2]/span[1]"),
    };
  }

  // navigation
  async goto() {
    await this.page.goto();
    await this.page.waitForLoadState("load");
  }

  // common test methods

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridElement); // Get handles for all grid rows

    // Check if any grid rows are found
    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      // Ensure the element is attached to the DOM
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      // Click on the first grid row
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

module.exports = { RapReport };
