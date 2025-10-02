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
      tseAOP: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      tsePotential: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      tseAOPYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tseAOPPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]',
        ),

      //Total Service Operating Profit
      tsopAOP: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
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

      //Total Detail Expense
      tdeAOPinput: () => this.page.locator('//*[@id="LOPS36400"]').first(),
      tdePotentialinput: () => this.page.getByRole("textbox", { name: "AOP" }),
      tdeYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      tdePerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[2]',
        ),

      tdeUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div[1]/div/button',
        ),

      //Total Detail Operating Profit
      tseAOP: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      tsePotential: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[3]',
        ),
      tseYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tsePerformanceChart: () =>
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
