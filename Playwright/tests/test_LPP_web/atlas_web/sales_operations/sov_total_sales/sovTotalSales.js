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
      totalSalesHeader: () =>
        this.page.getByRole("heading", { name: "Total Sales" }),
      totalSalesOpProfHeader: () =>
        this.page.getByText("Total Sales Operating Profit"),

      //Total Sales Expense
      aop: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[1]/div',
          )
          .first(),
      potential: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      aopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      aopPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]',
        ),

      //Total Sales Operating Profit
      tsopAOP: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div/div/div/div[1]/div',
          )
          .first(),
      tsopPotential: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      tsopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tsopPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[2]',
        ),

      // total sales dept profit
      todpCardTitle: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Total Sales Department Profit$/ })
          .nth(3),
      todpAOPTotal: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      todpYOY: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      todpPotential: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      todpPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]',
        ),

      // complete
      completeButton: () =>
        this.page.getByRole("button", { name: "Complete" }).first(),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/atlas");
    await this.page.waitForLoadState("load");
  }

  // get page elements

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
