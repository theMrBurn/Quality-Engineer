// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SalesGrossProfitView {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Atlas landing page elements
    this.locators = {
      //card headers
      newRetailUnitsHeader: () => this.page.getByText("New Retail Units"),
      frontEndAverageHeader: () =>
        this.page.getByText("Front-End Average - New"),
      fiAverageHeader: () => this.page.getByText("F&I Average - New"),
      usedRetailUnitsHeader: () =>
        this.page.getByText("Used Retail Units (Including Driveway)"),
      frontEndAverageUsed: () =>
        this.page.getByText("Front-End Average - Used"),
      fiAverageUsedHeader: () => this.page.getByText("F&I Average - Used"),
      fleetGrossHeader: () => this.page.getByText("Fleet Gross"),
      wholesaleGrossHeader: () => this.page.getByText("Wholesale Gross"),
      docFeeHeader: () =>
        this.page.getByText("Doc Fee & EVR Income (Per Unit)"),
      fiCancelsHeader: () =>
        this.page.getByText("F&I Cancels (Under and Over 180)"),
      allOtherGrossHeader: () => this.page.getByText("All Other Gross"),
      memoDrivewayUnitsHeader: () =>
        this.page.getByText("Memo: Driveway Units (New and Used)"),
      totalSalesGross: () => this.page.getByText("Total Sales Gross"),

      //new retail units card locators
      nru2024AOPinput: () => this.page.locator("#LOPS10860").first(),
      nruPotentialInput: () =>
        this.page.getByRole("textbox", { name: "Retail Units" }).first(),
      nruYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      nruPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]',
        ),
      nruSalesEfficiencyChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]',
        ),
      nruUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div[1]/div/button',
        ),

      //front-end-average NEW card locators
      fraN2024AOPinput: () => this.page.locator('//*[@id="LOPS10865"]').first(),
      fraNPotentialInput: () => this.page.locator("#LOPS10865").nth(1),
      fraNYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      fraNPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[2]',
        ),
      fraNUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[3]/div[2]/div[1]/div[1]/div/button',
        ),

      //F&I Average NEW card locators
      fiaN2024AOPinput: () => this.page.locator("#LOPS15295").first(),
      fiaNPotentialInput: () => this.page.locator("#LOPS15295").nth(1),
      fiaNYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      fiaNPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[2]',
        ),
      fiaNUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[4]/div[2]/div[1]/div[1]/div/button',
        ),

      //Used Retail Units (Including Driveway)
      uru2024AOPinput: () => this.page.locator("#LOPS15150").first(),
      uruPotentialInput: () => this.page.locator('//*[@id="LOPS15150"]').nth(1),
      uruYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      uruPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[2]',
        ),
      uruUsedToNewChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[2]/div[2]',
        ),
      uruUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[5]/div[2]/div[1]/div[1]/div/button',
        ),

      //Front-End Average - Used
      feauAOPinput: () => this.page.locator("#LOPS15155").first(),
      feauPotentialInput: () => this.page.locator("#LOPS15155").nth(1),
      feauYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      feauPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[2]/div[2]',
        ),
      feauInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[2]/div[1]/div[2]/div/div/div/div/div',
        ),
      feauUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[6]/div[2]/div[1]/div[1]/div/button',
        ),

      //F&I Average Used card locators
      fiau2024AOPinput: () => this.page.locator("#LOPS15395").first(),
      fiauPotentialInput: () => this.page.locator("#LOPS15395").nth(1),
      fiauYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[7]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      fiauPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[7]/div[2]/div[2]',
        ),
      fiauUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[7]/div[2]/div[1]/div[1]/div/button',
        ),

      //Fleet Gross
      fGrossAOPinput: () => this.page.locator("#LOPS10875").first(),
      fGrossPotentialInput: () =>
        this.page.locator('//*[@id="LOPS10875"]').nth(1),
      fGrossYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[8]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      fGrossPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[8]/div[2]/div[2]',
        ),
      fGrossInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[8]/div[2]/div[1]/div[2]/div/div/div/div',
        ),

      fGrossUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[8]/div[2]/div[1]/div[1]/div/button',
        ),

      //Wholesale Gross
      wGrossAOPinput: () => this.page.locator("#LOPS15165").first(),
      wGrossPotentialInput: () =>
        this.page.locator('//*[@id="LOPS15165"]').nth(1),
      wGrossYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[9]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      wGrossPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[9]/div[2]/div[2]',
        ),
      wGrossInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[9]/div[2]/div[1]/div[2]/div/div/div/div',
        ),
      wGrossPerfTrendGraph: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[9]/div[2]/div[2]/div[2]',
        ),
      wGrossUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[9]/div[2]/div[1]/div[1]/div/button',
        ),

      //Doc Fee & EVR Income (Per Unit)
      dFeeAOPinput: () => this.page.locator("#LOPS15570").first(),
      dFeePotentialInput: () => this.page.locator("#LOPS15570").nth(1),
      dFeeYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[10]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      dFeePerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[10]/div[2]/div[2]',
        ),
      dFeeInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[10]/div[2]/div[1]/div[2]/div/div/div/div',
        ),
      dFeePerfTrendGraph: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[10]/div[2]/div[2]/div[2]/div',
        ),
      dFeeUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[10]/div[2]/div[1]/div[1]/div/button',
        ),

      //F&I Cancels (Under and Over 180)
      fiCanAOPinput: () => this.page.locator("#FICancels").first(),
      fiCanPotentialInput: () =>
        this.page.locator('//*[@id="FICancels"]').nth(1),
      fiCanYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[11]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      fiCanPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[11]/div[2]/div[2]',
        ),
      fiCanInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[11]/div[2]/div[1]/div[2]/div/div/div/div',
        ),
      dfiCanPerfTrendGraph: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[11]/div[2]/div[2]/div[2]/div',
        ),
      fiCanUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[11]/div[2]/div[1]/div[1]/div/button',
        ),

      //All Other Gross
      aogAOPinput: () => this.page.locator("#SalesMultiple").first(),
      aogPotentialInput: () =>
        this.page.locator('//*[@id="SalesMultiple"]').nth(1),
      aogYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[12]/div[2]/div[1]/div[1]/div/div/div[2]/div',
        ),
      aogPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[12]/div[2]/div[2]',
        ),
      aogInfoBox: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[12]/div[2]/div[1]/div[2]/div/div/div/div',
        ),
      aogUpdateButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[12]/div[2]/div[1]/div[1]/div/button',
        ),

      //Total Sales Gross
      tsgAOP: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[13]/div[2]/div[1]/div/div/div/div[1]',
        ),
      tsgPotential: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[13]/div[2]/div[1]/div/div/div/div[3]',
        ),
      tsgYoYcounter: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[13]/div[2]/div[1]/div/div/div/div[2]',
        ),
      tsgPerformanceChart: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[13]/div[2]/div[2]',
        ),

      //nav buttons previous | next
      bottomNextButton: () =>
        this.page.getByRole("button", { name: "Next" }).nth(1),
      bottomPreviousButton: () =>
        this.page.getByRole("button", { name: "Previous" }).nth(1),

      topNextButton: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[4]/div/button',
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
module.exports = { SalesGrossProfitView };
