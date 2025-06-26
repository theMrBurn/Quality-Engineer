const { expect } = require("@playwright/test");

class FIM_Products {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      // Navigation Tabs
      storesTab: () => this.page.locator('[data-testid="nav-stores"]'),
      productsTab: () => this.page.locator('[data-testid="nav-products"]'),
      storesHeader: () =>
        this.page.locator("div").filter({ hasText: /^Stores$/ }),
      // Grids
      storesGrid: () =>
        this.page
          .getByTestId("stores-grid-wrapper")
          .locator("div")
          .filter({ hasText: "Store #Store" })
          .nth(1),
      productsGrid: () =>
        this.page.locator(
          "body > div > div.css-19nh8ml-ProductsPage-container > div.css-13dtgw9-ProductsPage-contentContainer",
        ),

      // Modal Related
      productsModal: () => this.page.locator("#modal-content"),
      selectProductsButton: () =>
        this.page.locator('[data-testid="select-products-button"]'),
      cancelButton: () => this.page.locator('[data-testid="cancel-button"]'),
      searchProducts: () =>
        this.page.getByRole("textbox", { name: "Search Products" }),
      xOutButton: () => this.page.getByRole("button", { name: "close" }),

      // Product Form Elements
      productNameLabel: () => this.page.locator("#product-name-label"),
      productNameInput: () =>
        this.page.locator('[data-testid="product-name-input"]'),
      categorySelectInput: () =>
        this.page.locator('[data-testid="category-select-input"]'),
      salesAmountInput: () =>
        this.page.locator('[data-testid="sales-amount-input"]'),
      costAmountInput: () =>
        this.page.locator('[data-testid="cost-amount-input"]'),
      grossAmountInput: () =>
        this.page.locator('[data-testid="gross-amount-input"]'),

      // Buttons
      addProductsButton: () => this.page.getByTestId("open-modal-button"),
      openModalButton: () =>
        this.page.locator('[data-testid="open-modal-button"]'),
      closeButton: () => this.page.locator('button[name="close"]'),
      clearSearchX: () =>
        this.page.getByTestId("clear-storeproduct-search-button"),
    };
  }

  // Navigation
  async goto() {
    await this.page.goto("/fim/products");
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

module.exports = { FIM_Products };
