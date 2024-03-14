// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class PersonalSFFE {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Selling Personal Semi Fixed Expense Elements
    this.locators = {
      //card headers
      personnelExpenseHeader: () => this.page.getByText("Personnel Expense"),
      semiFixedExpenseHeader: () => this.page.getByText("Semi-Fixed Expense"),
      fixedExpenseHeader: () => this.page.getByText("Fixed Expense"),

      //Personnel Expense
      peAOPinput: () => this.page.locator('//*[@id="LOPS25850"]').first(),
      pePotentialInput: () => this.page.locator('//*[@id="LOPS25850"]').nth(1),
      peYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      pePerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]',
        ),
      peInfobox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      peUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div[2]/div/button',
        ),

      //Semi-Fixed Expense
      sfeAOPinput: () => this.page.locator('//*[@id="LOPS26130"]').first(),
      sfePotentialInput: () => this.page.locator('//*[@id="LOPS26130"]').nth(1),
      sfeYoYCounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div[1]/div/div[2]/div',
        ),
      sfePerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[2]',
        ),
      sfeInfobox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      sfeUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[1]/div/div[2]/div/button',
        ),

      //Fixed Expense
      feAOPinput: () => this.page.locator('//*[@id="LOPS26300"]').first(),
      fePotentialInput: () => this.page.locator('//*[@id="LOPS26300"]').nth(1),
      feYoYCounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[1]/div/div[2]/div',
        ),
      fePerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[2]',
        ),
      feInfobox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      feUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[1]/div/div[2]/div/button',
        ),

      //nav buttons previous | next
      bottomNextButton: () =>
        this.page.getByRole("button", { name: "Next" }).nth(1),
      bottomPreviousButton: () =>
        this.page.getByRole("button", { name: "Prev" }).nth(1),

      topNextButton: () =>
        this.page.getByRole("button", { name: "Next" }).first(),
      topPreviousButton: () =>
        this.page.getByRole("button", { name: "Prev" }).first(),
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
    const element = await locatorFunction().first();
    try {
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(`Locator '${locatorName}' failed: ${error.message}`);
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
module.exports = { PersonalSFFE };
