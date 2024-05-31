// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class PartsTotalParts {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Selling Personal Semi Fixed Expense Elements
    this.locators = {
      //page header
      totalParts: () => this.page.getByText("Total Parts"),

      //card headers
      totalPartsExpenseHeader: () => this.page.getByText("Total Parts Expense"),
      totalSalesOpProfHeader: () =>
        this.page.getByText("Total Parts Operating Profit"),

      //Total Parts Expense
      aop2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
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
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]',
        ),

      //Total Parts Operating Profit
      tsopAOP2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      tsopPotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      tsopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tsop2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[2]',
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
    await this.page.goto("/atlas/");
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
}
module.exports = { PartsTotalParts };
