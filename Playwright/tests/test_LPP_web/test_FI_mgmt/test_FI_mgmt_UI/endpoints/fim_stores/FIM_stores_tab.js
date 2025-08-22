const { expect } = require("@playwright/test");

class FIM_Stores {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      storesTab: () => this.page.locator('[data-testid="nav-stores"]'),
      storesHeader: () =>
        this.page.locator("div").filter({ hasText: /^Stores$/ }),
      productsTab: () => this.page.locator('[data-testid="nav-products"]'),
      storesGrid: () =>
        this.page
          .getByTestId("stores-grid-wrapper")
          .locator("div")
          .filter({ hasText: "Store #Store" })
          .nth(1),
      productsGrid: () =>
        this.page.locator("#«r42»-role-element-id > div.k-grid-header"),

      // grid column headers
      storeNameColumn: () =>
        this.page
          .getByRole("columnheader", { name: "Store Name" })
          .locator("span")
          .nth(1),
      addressColumn: () =>
        this.page
          .getByRole("columnheader", { name: "Address" })
          .locator("span")
          .nth(1),
      cityColumn: () =>
        this.page
          .getByRole("columnheader", { name: "City" })
          .locator("span")
          .nth(1),
      stateColumn: () =>
        this.page
          .getByRole("columnheader", { name: "State" })
          .locator("span")
          .nth(1),
      zipColumn: () =>
        this.page
          .getByRole("columnheader", { name: "Zip" })
          .locator("span")
          .nth(1),
      storeNumberColumn: () =>
        this.page
          .getByRole("columnheader", { name: "Store #" })
          .locator("span")
          .nth(1),

      // add products modal
      addProductsButton: () =>
        this.page.getByTestId("open-add-store-products-modal-button"),

      //pagination locators
      itemsPerPage: () => this.page.getByText("10Items per page123456Items 1"),
      accessibilityId: () => this.page.locator('[id="«r5j»-accessibility-id"]'),
      itemsPerPageText: () => this.page.getByText("Items per page"),
      itemsRangeText: () => this.page.getByText("Items 1 - 10 of"),
      selectButton: () => this.page.getByRole("button", { name: "select" }),
      option15: () => this.page.getByRole("option", { name: "15" }),
      items1To15: () => this.page.getByText("Items 1 - 15 of"),
    };
  }

  // Navigation
  async goto() {
    await this.page.goto("/fim/stores");
    await this.page.waitForLoadState("load");
  }

  // Common test methods
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

module.exports = { FIM_Stores };
