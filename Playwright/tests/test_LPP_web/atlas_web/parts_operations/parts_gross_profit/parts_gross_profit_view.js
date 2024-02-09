// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class PartsGrossProfitView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Parts Operations page elements
    this.locators = {
      //card headers
      customerPayGrossHeader: () => this.page.getByText("Customer Pay Gross"),
      warrantyGrossHeader: () => this.page.getByText("Warranty Gross"),
      internalGrossHeader: () => this.page.getByText("Internal Gross"),
      wholesaleGrossHeader: () => this.page.getByText("Wholesale Gross"),
      allOtherGrossHeader: () => this.page.getByText("All Other Gross"),
      totalRevenueHeader: () => this.page.getByText("Total Revenue"),
      totalPartsGrossHeader: () => this.page.getByText("Total Parts Gross"),

      //customer pay gross card locators
      cpg2024AOPinput: () => this.page.locator("#LOPS40205").first(),
      cpgPotentialInput: () => this.page.locator("#LOPS40205").nth(1),
      cpgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      cpgPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]',
          )
          .first(),
      cpgInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),

      cpgUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div[2]/div/button',
        ),

      //warrenty gross card locators
      wg2024AOPinput: () => this.page.locator("#LOPS40305").first(),
      wgPotentialInput: () => this.page.locator("#LOPS40305").nth(1),
      wgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      wgPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[2]',
          )
          .first(),
      wgInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),

      wgUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[1]/div/div[2]/div/button',
        ),

      //warrenty gross card locators
      ig2024AOPinput: () => this.page.locator("#LOPS40405").first(),
      igPotentialInput: () => this.page.locator("#LOPS40405").nth(1),
      igYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      igPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[2]',
          )
          .first(),
      igInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),

      igUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[1]/div/div[2]/div/button',
        ),

      //wholesale gross card locators
      wsg2024AOPinput: () => this.page.locator("#LOPS40505").first(),
      wsgPotentialInput: () => this.page.locator("#LOPS40505").nth(1),
      wsgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      wsgPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[2]',
        ),
      wsgInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      wsgUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[1]/div/div[2]/div/button',
        ),

      //all other gross card locators
      aog2024AOPinput: () => this.page.locator("#PartsMultiple").first(),
      aogPotentialInput: () => this.page.locator("#PartsMultiple").nth(1),
      aogYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      aogPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[2]/div[2]',
        ),
      aogInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[2]/div[1]/div[2]/div/div/div/div',
        ),
      aogUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[1]/div/div[2]/div/button',
        ),

      //Total Revenue card locators
      tr2024AOPinput: () => this.page.locator("#LOPS45600").first(),
      trPotentialInput: () => this.page.locator("#LOPS45600").nth(1),
      trYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      trPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[2]',
        ),
      trInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      trUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[1]/div/div[2]/div/button',
        ),

      //Total Revenue card locators
      tpg2024AOP: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[1]/div/div/div/div[1]/div',
          )
          .first(),
      tpgPotential: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[1]/div/div/div/div[3]/div',
          )
          .nth(1),
      tpgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[1]/div/div/div/div[2]/div',
        ),
      tpgPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[2]',
        ),

      //nav buttons previous | next
      bottomNextButton: () =>
        this.page.getByRole("button", { name: "Next" }).nth(1),
      bottomPreviousButton: () =>
        this.page.getByRole("button", { name: "Previous" }).nth(1),

      topNextButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[1]/div[3]/button',
        ),
      topPreviousButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[1]/div[1]/button',
        ),

      //nav buttons previous | next
      bottomNextButton: () =>
        this.page.getByRole("button", { name: "Next" }).nth(1),
      bottomPreviousButton: () =>
        this.page.getByRole("button", { name: "Previous" }).nth(1),

      topNextButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[1]/div[3]/button',
        ),
      topPreviousButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[1]/div[1]/button',
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
module.exports = { PartsGrossProfitView };
