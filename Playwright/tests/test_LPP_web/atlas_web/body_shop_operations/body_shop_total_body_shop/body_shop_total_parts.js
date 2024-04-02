// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class BodyShopTotalParts {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Selling Personal Semi Fixed Expense Elements
    this.locators = {
      //page header

      //card headers
      totalBodyShopExpense: () =>
        this.page.getByText("Total Body Shop Expense"),
      totalBodyShopOperatingProfit: () =>
        this.page.getByText("Total Body Shop Operating Profit"),

      //Total Parts Expense
      aop2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[1]',
        ),
      potential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      aopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[2]',
        ),
      aop2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]',
        ),

      //Total Body Shop Operating Profit
      tbsopAOP2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      tbsopPotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      tbsopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tbsop2024PerformanceChart: () =>
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
}
module.exports = { BodyShopTotalParts };
