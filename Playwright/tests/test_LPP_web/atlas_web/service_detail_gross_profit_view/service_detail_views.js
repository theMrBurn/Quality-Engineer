// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class ServiceDetailstView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Atlas landing page elements
    this.locators = {
      //card headers
      serviceDetailsGrossProfitHeader: () =>
        this.page.getByText("Service/Detail Gross Profit"),
      customerPayGrossHeader: () => this.page.getByText("Customer Pay Gross"),
      warrentyGrossHeader: () => this.page.getByText("Warranty Gross"),
      internalGrossHeader: () => this.page.getByText("Internal Gross"),
      allOtherGrossHeader: () => this.page.getByText("All Other Gross"),
      totalDetailGrossHeader: () => this.page.getByText("Total Detail Gross"),
      totalServiceGrossHeader: () => this.page.getByText("Total Service Gross"),

      //Flat Rate Hours card locators
      frh2024AOPinput: () => this.page.locator("#ServiceTHRS").first(),
      frhPotentialInput: () =>
        this.page.getByRole("textbox", { name: "Retail Units" }),
      frhYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      frhPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/div/div/canvas',
          )
          .first(),
      frhUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div[2]/div/button',
        ),

      //Customer Pay Gross card locators
      cpg2024AOPinput: () => this.page.locator("#LOPS20205").first(),
      cpgPotentialInput: () => this.page.locator("#LOPS20205").nth(1),
      cpgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      cpgPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[2]/div/div/canvas ',
          )
          .first(),
      cpgInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      cpgUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[1]/div/div[2]/div/button',
        ),

      //Warrenty Gross card locators
      warg2024AOPinput: () => this.page.locator("#LOPS20305").first(),
      wargPotentialInput: () => this.page.locator("#LOPS20305").nth(1),
      wargYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      wargPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[2]',
          )
          .first(),
      wargInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      wargUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[1]/div/div[2]/div/button',
        ),

      //Internal Gross card locators
      ig2024AOPinput: () => this.page.locator("#LOPS20405").first(),
      igPotentialInput: () => this.page.locator("#LOPS20405").nth(1),
      igYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      igPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[2]',
          )
          .first(),
      igInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      igUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[1]/div/div[2]/div/button',
        ),

      //All Other Gross card locators
      aog2024AOPinput: () => this.page.locator("#ServiceMultiple").first(),
      aogPotentialInput: () => this.page.locator("#ServiceMultiple").nth(1),
      aogYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      aogPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[2]/div[2]',
          )
          .first(),
      aogInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      aogUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[6]/div[1]/div/div[2]/div/button',
        ),

      //Total Detail Gross card locators
      tdg2024AOPinput: () => this.page.locator("#LOPS35605").first(),
      tdgPotentialInput: () => this.page.locator("#LOPS35605").nth(1),
      tdgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      tdgPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[2]',
          )
          .first(),
      tdgInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[1]/div[2]/div/div/div/div/div[2]',
        ),
      tdgUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[1]/div/div[2]/div/button',
        ),

      //Total Serivce Gross card locators
      tsg2024AOPinput: () => this.page.locator("#LOPS35605").first(),
      tsgPotentialInput: () => this.page.locator("#LOPS35605").nth(1),
      tsgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]',
        ),
      tsgPerformanceChart: () =>
        this.page
          .locator(
            '//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[2]/div/div/canvas',
          )
          .first(),

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
module.exports = { ServiceDetailstView };
