const { expect } = require("@playwright/test");

class FIM {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      fimPageHeader: () =>
        this.page.locator("div").filter({ hasText: /^F&I Management$/ }),
      fimPageLogo: () =>
        this.page.locator('body > div > div.ea-header-wrapper > header > div:nth-child(1) > a > svg > path:nth-child(1)'),
      fimPageText: () => this.page.getByText("This is the Stores page"),
      fimUserTag: () => this.page.locator('body > div > div.ea-header-wrapper > header > div.css-zprd3r-EA_Header-rightContent > div.css-4pr1xf-EA_Header-user > p'),
      fimUserTagSignOut: () => this.page.getByTestId("user-menu"),
      fimPageFooter: () => this.page.locator("body > div > div.ea-footer-wrapper > div"),
      fimPageSupportLink: () =>
        this.page.getByRole('link', { name: 'Support' }),
      fimPageSupportLinkText: () => this.page.getByText("Support"),
      fimStoresHeader: () => this.page.getByRole("heading", { name: "Stores" }),
    };
  }

  // navigation
  async goto() {
    await this.page.goto("/fim/stores");
    await this.page.waitForLoadState("networkidle");
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

module.exports = { FIM };
