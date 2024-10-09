// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class BodyShopGrossProfitView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Body Shop                                                                                                                                          Operations page elements
    this.locators = {
      //column header
      bodyShopGrossHeader: () => this.page.getByText("Body Shop Gross Profit"),

      //card headers
      customerPayGrossHeader: () => this.page.getByText("Customer Pay Gross"),
      internalGrossHeader: () => this.page.getByText("Internal Gross"),
      assuredDealerServicesHeader: () =>
        this.page.getByText("Assured Dealer Services"),
      partsGrossHeader: () => this.page.getByText("Parts Gross"),
      allOtherGrossHeader: () => this.page.getByText("All Other Gross"),
      totalRevenueHeader: () => this.page.getByText("Total Revenue"),
      totalBodyShopGrossHeader: () =>
        this.page.getByText("Total Body Shop Gross"),

      //customer pay gross card locators
      cpg2024AOPinput: () => this.page.locator("#LOPS50205").first(),
      cpgPotentialInput: () => this.page.locator("#LOPS50205").nth(1),
      cpgYoYcounter: () =>
        this.page
          .locator(
            ".MuiGrid-root > div > div > div > div > div:nth-child(2) > div",
          )
          .first(),
      cpgPerformanceChart: () => this.page.locator("canvas").first(),
      cpgInfoBox: () => this.page.locator(".MuiAlert-message").first(),

      cpgUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/button',
        ),

      //internal gross card locators
      ig2024AOPinput: () => this.page.locator("#LOPS50305").first(),
      igPotentialInput: () => this.page.locator("#LOPS50305").nth(1),
      igYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      igPerformanceChart: () =>
        this.page
          .locator(
            "div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div > .MuiBox-root > canvas",
          )
          .first(),
      igInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div[2]/div/div/div/div/div/div[2]/div',
        ),

      igUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div[1]/div/button',
        ),

      //Assured Dealer Service Locators card locators
      ads2024AOPinput: () => this.page.locator("#LOPS50405").first(),
      adsPotentialInput: () => this.page.locator("#LOPS50405").nth(1),
      adsYoYcounter: () =>
        this.page.locator(
          "div:nth-child(4) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div",
        ),
      adsPerformanceChart: () =>
        this.page
          .locator("div:nth-child(4) > div:nth-child(2) > div:nth-child(2)")
          .first(),
      adsInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[1]/div[2]/div/div/div/div/div/div[2]',
        ),

      adsUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[1]/div[1]/div/button',
        ),

      //Parts Gross card locators
      pg2024AOPinput: () => this.page.locator("#LOPS50805").first(),
      pgPotentialInput: () => this.page.locator("#LOPS50805").nth(1),
      pgYoYcounter: () =>
        this.page.locator(
          "div:nth-child(5) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div",
        ),
      pgPerformanceChart: () =>
        this.page
          .locator(
            "div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div > .MuiBox-root > canvas",
          )
          .first(),
      pgInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div[2]/div/div/div/div/div/div[2]/div',
        ),

      pgUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div[1]/div/button',
        ),

      //All Other Gross card locators
      aog2024AOPinput: () => this.page.locator("#BodyShopMultiple").first(),
      aogPotentialInput: () => this.page.locator("#BodyShopMultiple").nth(1),
      aogYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[2]/div[1]/div[1]/div/div/div[2]',
        ),
      aogPerformanceChart: () =>
        this.page
          .locator(
            "div:nth-child(6) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div",
          )
          .first(),
      aogInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[2]/div[1]/div[2]/div/div/div/div/div/div[2]',
        ),

      aogUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[2]/div[1]/div[1]/div/button',
        ),

      //Total Revenue card locators
      tr2024AOPinput: () => this.page.locator("#LOPS55600").first(),
      trPotentialInput: () => this.page.locator("#LOPS55600").nth(1),
      trYoYcounter: () =>
        this.page.locator(
          "div:nth-child(7) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div",
        ),
      trPerformanceChart: () =>
        this.page
          .locator(
            "div:nth-child(7) > div:nth-child(2) > div:nth-child(2) > div > .MuiBox-root > canvas",
          )
          .first(),
      trInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[7]/div[2]/div[1]/div[2]/div/div/div/div/div/div[2]',
        ),

      trUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[7]/div[2]/div[1]/div[1]/div/button',
        ),

      //Total Body Shop Gross card locators
      tbs2024AOP: () => this.page.locator("#LOPS55600").first(),
      tbsPotential: () => this.page.locator("#LOPS55600").nth(1),
      tbsYoYcounter: () =>
        this.page.locator(
          "div:nth-child(7) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div",
        ),
      tbsPerformanceChart: () =>
        this.page.locator(
          "div:nth-child(7) > div:nth-child(2) > div:nth-child(2) > div > .MuiBox-root > canvas",
        ),

      tbsUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[7]/div[2]/div[1]/div[1]/div/button',
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
module.exports = { BodyShopGrossProfitView };
