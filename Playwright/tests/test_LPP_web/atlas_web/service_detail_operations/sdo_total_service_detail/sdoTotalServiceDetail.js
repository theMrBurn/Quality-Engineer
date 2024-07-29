// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SDOTotalServiceDetail {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Total Service/Detail Elements
    this.locators = {
      //card headers
      totalServiceDetailExpenseHeader: () =>
        this.page.getByText("Total Service/Detail"),
      totalServiceExpenseHeader: () =>
        this.page.getByText("Total Service Expense"),
      totalServiceOperatingProfitHeader: () =>
        this.page.getByText("Total Service Operating Profit"),
      totalDetailExpenseHeader: () =>
        this.page.getByText("Total Detail Expense"),
      totalDetailOperatingProfitHeader: () =>
        this.page.getByText("Total Detail Operating Profit"),

      //Total Service Espense
      tseAOP2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      tsePotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      tseAOPYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tseAOP2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]',
        ),

      //Total Service Operating Profit
      tsopAOP2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      tsopPotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      tsopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tsop2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[2]',
        ),

      //Total Detail Expense
      tdeAOP2024input: () => this.page.locator('//*[@id="LOPS36400"]').first(),
      tdePotential2024input: () =>
        this.page.locator('//*[@id="LOPS36400"]').nth(1),
      tdeYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      tde2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[2]',
        ),

      tdeUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[1]/div[1]/div/button',
        ),

      //Total Detail Operating Profit
      topAOP2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      topPotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div/div/div/div[3]',
        ),
      topYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      top2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[2]',
        ),

      // complete
      completeButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[4]/div/button',
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
module.exports = { SDOTotalServiceDetail };
