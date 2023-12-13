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
      newRetailUnitsHeader: () =>
      this.page.getByText('New Retail Units'),
      frontEndAverageHeader: () => this.page.getByText('Front-End Average - New'),
      fiAverageHeader: () => this.page.getByText('F&I Average - New'),
      usedRetailUnitsHeader: () => this.page.getByText('Used Retail Units (Including Driveway)'),
      frontEndAverageUsed: () => this.page.getByText('Front-End Average - Used'),
      fiAverageUsedHeader: () => this.page.getByText('F&I Average - Used'),
      fleetGrossHeader: () => this.page.getByText('Fleet Gross'),
      wholesaleGrossHeader: () => this.page.getByText('Wholesale Gross'),
      docFeeHeader: () => this.page.getByText('Doc Fee & EVR Income (Per Unit)'),
      fiCancelsHeader: () => this.page.getByText('F&I Cancels (Under and Over 180)'),
      allOtherGrossHeader: () => this.page.getByText('All Other Gross'),
      memoDrivewayUnitsHeader: () => this.page.getByText('Memo: Driveway Units (New and Used)'),
      totalSalesGross: () => this.page.getByText('Total Sales Gross'),

      //new retail units card locators
      nru2024AOPinput: () => this.page.locator('#LOPS10860').first(),
      nruPotentialInput: () => this.page.getByRole('textbox', { name: 'Retail Units' }).first(),
      nruYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div/h4'),
      nruPerformanceChart: () => this.page.locator('canvas').first(),
      nruSalesEfficiencyChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/div[2]/div'),
      nruUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[1]/div/div[2]/div/button'),

      //front-end-average NEW card locators
      fraN2024AOPinput: () => this.page.locator('//*[@id="LOPS10865"]'),
      fraNPotentialInput: () => this.page.locator('#LOPS10865').nth(1),
      fraNYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div'),
      fraNPerformanceChart: () => this.page.locator('div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div > .MuiBox-root > canvas'),
      fraNUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[1]/div/div[2]/div/button'),

      //F&I Average NEW card locators
      fiaN2024AOPinput: () => this.page.locator('#LOPS15295').first(),
      fiaNPotentialInput: () => this.page.locator('#LOPS15295').nth(1),
      fiaNYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div'),
      fiaNPerformanceChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[4]/div[2]/div[2]/div[1]/div/canvas'),
      fiaNUsedToNewChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/div[2]/div'),
      fiaNUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[3]/div[1]/div/div[2]/div/button'),

      //Used Retail Units (Including Driveway)
      uru2024AOPinput: () => this.page.locator('#LOPS15150').first(),
      uruPotentialInput: () => this.page.locator('//*[@id="LOPS15150"]'),
      uruYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div'),
      uruPerformanceChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[2]/div[1]/div/canvas'),
      uruUsedToNewChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[2]/div[2]/div'),
      uru2024Ratio: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/div[2]/div/div/div/div/h5'),
      uruUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[5]/div[1]/div/div[2]/div/button'),
      
      //Front-End Average - Used
      feauAOPinput: () => this.page.locator('#LOPS15395').first(),
      feauPotentialInput: () => this.page.locator('//*[@id="LOPS15395"]'),
      feauYoYcounter: () => this.page.locator('div:nth-child(7) > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2)'),
      feauPerformanceChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[2]'),
      feauInfoBox: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[2]/div[1]/div[2]/div/div/div/div/div[2]'),
      feauUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[7]/div[1]/div/div[2]/div/button'),

      //Fleet Gross
      fGrossAOPinput: () => this.page.locator('#LOPS10875').first(),
      fGrossPotentialInput: () => this.page.locator('//*[@id="LOPS10875"]'),
      fGrossYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div'),
      fGrossPerformanceChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[2]/div[1]/div/canvas'),
      fGrossInfoBox: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[1]/div[2]/div/div/div/div/div[2]'),
      fGrossPerfTrendGraph: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[2]/div[2]/div[2]/div'),
      fGrossUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[8]/div[1]/div/div[2]/div/button'),

      //Wholesale Gross
      wGrossAOPinput: () => this.page.locator('#LOPS15165').first(),
      wGrossPotentialInput: () => this.page.locator('//*[@id="LOPS15165"]'),
      wGrossYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[9]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]'),
      wGrossPerformanceChart: () => this.page.locator('div:nth-child(9) > div:nth-child(2) > div:nth-child(2) > div > .MuiBox-root > canvas'),
      wGrossInfoBox: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[9]/div[2]/div[1]/div[2]/div/div/div/div/div[2]'),
      wGrossPerfTrendGraph: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[9]/div[2]/div[2]/div[2]/div'),
      wGrossUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[9]/div[1]/div/div[2]/div/button'),

      //Doc Fee & EVR Income (Per Unit)
      dFeeAOPinput: () => this.page.locator('#LOPS15570').first(),
      dFeePotentialInput: () => this.page.locator('//*[@id="LOPS15570"]'),
      dFeeYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]'),
      dFeePerformanceChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[2]'),
      dFeeInfoBox: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[1]/div[2]/div/div/div/div/div[2]'),
      dFeePerfTrendGraph: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[2]/div[2]/div'),
      dFeeUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[1]/div/div[2]/div/button'),

      //Doc Fee & EVR Income (Per Unit)
      dFeeAOPinput: () => this.page.locator('#LOPS15570').first(),
      dFeePotentialInput: () => this.page.locator('//*[@id="LOPS15570"]'),
      dFeeYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]'),
      dFeePerformanceChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[2]'),
      dFeeInfoBox: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[1]/div[2]/div/div/div/div/div[2]'),
      dFeePerfTrendGraph: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[2]/div[2]/div[2]/div'),
      dFeeUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[10]/div[1]/div/div[2]/div/button'),

      //F&I Cancels (Under and Over 180)
      fiCanAOPinput: () => this.page.locator('#FICancels').first(),
      fiCanPotentialInput: () => this.page.locator('//*[@id="FICancels"]'),
      fiCanYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[11]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]'),
      fiCanPerformanceChart: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[11]/div[2]/div[2]/div[1]/div/canvas'),
      fiCanInfoBox: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[11]/div[2]/div[1]/div[2]/div/div/div/div/div[2]'),
      dfiCanPerfTrendGraph: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[11]/div[2]/div[2]/div[2]/div'),
      fiCanUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[11]/div[1]/div/div[2]/div/button'),

      //All Other Gross
      aogAOPinput: () => this.page.locator('#SalesMultiple').first(),
      aogPotentialInput: () => this.page.locator('//*[@id="SalesMultiple"]'),
      aogYoYcounter: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[12]/div[2]/div[1]/div[1]/div/div[2]/div/div[2]'),
      aogPerformanceChart: () => this.page.locator('div:nth-child(12) > div:nth-child(2) > div:nth-child(2) > div > .MuiBox-root > canvas'),
      aogInfoBox: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[12]/div[2]/div[1]/div[2]/div/div/div/div/div[2]'),
      aogUpdateButton: () => this.page.locator('//*[@id="root"]/div/div[3]/div/div[2]/div/div[2]/div[12]/div[1]/div/div[2]/div/button'),
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
module.exports = { SalesGrossProfitView };
