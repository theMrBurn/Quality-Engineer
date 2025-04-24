const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getMainTab: () => this.page.locator(':nth-match(:text("Main"), 1)'),
      getMainAnnualOperatingPlan: () =>
        this.page.locator(':nth-match(:text("Annual Operating Plan"), 1)'),
      getDropdown: () =>
        this.page.locator(
          '//*[@id="ctl00_ContentPlaceHolder1_qDDL"]/table/tbody/tr/td/input[1]',
        ),
      getCurrentYear: () =>
        this.page.locator("#ctl00_ContentPlaceHolder1_qDDL_Input"),
    };
  }

  async NavigateToMainAnnualOperatingPlan() {
    await this.clickElement("getMainTab");
    await this.clickElement("getMainAnnualOperatingPlan");
    await this.page.waitForLoadState("networkidle");
    await this.clickElement("getDropdown");

    const currentYear = new Date().getFullYear(); // Get the current year
    await this.checkIfYearIsAvailable(currentYear);
    await this.clickElement("getCurrentYear");
  }

  async checkIfYearIsAvailable(year) {
    const yearText = String(year);
    const yearLocator = this.page.locator(`text=${yearText}`); // Create a locator for the year

    await this.page.waitForLoadState("networkidle");

    try {
      await expect(yearLocator).toBeVisible();
    } catch (error) {
      throw new Error(
        `Current Year '${yearText}' is not available in the dropdown: ${error.message}`,
      );
    }
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

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
