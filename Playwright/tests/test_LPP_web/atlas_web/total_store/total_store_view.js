// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class TotalStoreView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// locators
    this.locators = {
      //page header
      totalStoreHeader: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[1]/div[2]/h4',
        ),

      //card headers
      totalStoreGross: () => this.page.getByText("Total Store Gross"),
      totalStoreExpense: () => this.page.getByText("Total Store Expense"),
      additionalIncome: () => this.page.getByText("Additional Income"),
      netProfitBeforeTax: () => this.page.getByText("Net Profit Before Tax"),

      //Total Store Gross
      aop2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      potential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[3]',
        ),
      aopYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      aop2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/div/div/canvas',
        ),

      //Total Store Expense
      tseAOP2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[1]',
        ),
      tsePotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      tseYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tse2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[2]',
        ),

      //Additional Income
      ai2024AOPinput: () => this.page.locator("#LOPS86410").first(),
      aiPotentialInput: () => this.page.locator("#LOPS86410").nth(1),
      aiYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[1]/div/div[2]/div',
        ),
      aiPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[2]',
          )
          .first(),
      aiUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[1]/div/div[2]/div/button',
        ),

      //Net Profit Before Tax
      npbtAOP2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div/div/div/div[1]/div',
        ),
      npbtPotential2024: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div/div/div/div[3]/div',
        ),
      npbtYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      npbt2024PerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[2]',
        ),

      // complete buttons
      topCompleteButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[1]/div[3]/button',
        ),
      bottomCompleteButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[2]/button',
        ),
      completeSectionModal: () =>
        this.page.getByRole("heading", { name: "Complete Section" }),
      cancelComplete: () => this.page.getByRole("button", { name: "Cancel" }),
      finalComplete: () => this.page.getByRole("button", { name: "complete" }),
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
module.exports = { TotalStoreView };
