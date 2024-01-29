// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class TotalSalesExpenseView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Selling Personal Semi Fixed Expense Elements
    this.locators = {
      //card headers
      totalSalesExpenseHeader: () => this.page.getByText("Total Sales"),
      totalSalesOpProfHeader: () =>
        this.page.getByText("Total Sales Operating Profit"),

      //Total Sales Expense
      aop2024: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div[1]/div/div/p',
          )
          .first(),
      potential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      aopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      aop2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/div[1]',
        ),
      aop2024PerfTrendChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/div[2]/div',
        ),

      //Total Sales Operating Profit
      tsopAOP2024: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[1]/div',
          )
          .first(),
      tsopPotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[3]',
        ),
      tsopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tsop2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[2]/div[1]/div/canvas',
        ),
      tsop2024PerfTrendChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[2]/div[2]/div/div',
        ),

      // complete
      completeButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/button',
        ),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/atlas");
    await this.page.waitForLoadState("load");
  }

  // get page elements

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

  /// interact with elements

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
}
module.exports = { TotalSalesExpenseView };
