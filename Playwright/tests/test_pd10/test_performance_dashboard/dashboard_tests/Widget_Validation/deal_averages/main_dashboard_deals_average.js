const { expect } = require("@playwright/test");

class DealsAverageWidget {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      getUsername: () => this.page.locator("id=i0116"),
      getPassword: () => this.page.locator("id=i0118"),
      getSalesTab: () => this.page.locator('text="Sales" >> nth=0'),
      getSalesFIOps: () => this.page.locator(':nth-match(:text("F&I Ops"),1)'),
      getSalesFIOpsDashboard: () =>
        this.page.locator(':nth-match(:text("F&I Ops Dashboard"),1)'),
      getSalesFILogNew: () =>
        this.page.locator(':nth-match(:text("F&I Log"),1)'),
      getStoreSelector: () =>
        this.page.locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        ),
      getAllselector: () => this.page.locator(".allSelectorIndicator"),
      getSelectButton: () => this.page.locator("#storeSelector >> text=Select"),
      getBuick: () => this.page.locator('label:has-text("Troy Buick GMC")'),
      getMichigan: () =>
        this.page.locator(
          "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
        ),
      getFord: () => this.page.locator('label:has-text("Troy Ford")'),
      getMazda: () => this.page.locator('label:has-text("Troy Mazda")'),
      getSalesNewVehicle: () =>
        this.page.locator('span:has-text("New Vehicle")'),
      getSalesNewInventoryDetail: () =>
        this.page.locator("text=New Inventory Detail"),
      getDetailTotals: () =>
        this.page.locator('//*[@id="tabstrip-1"]/div/div/span[2]'),
      getMichiganStore2: () =>
        this.page.locator('label:has-text("Farmington Hills CDJR")'),
      getSalesLoanerVehicleDetail: () =>
        this.page.locator(':nth-match(:text("Loaner Vehicle Detail"),1)'),
      getTotalRows: () => this.page.locator("tr"),
      getAlaska: () =>
        this.page.locator(
          "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
        ),
      getAnchorageCJD: () =>
        this.page.locator('label:has-text("Anchorage CJD")'),
      getCanada: () =>
        this.page.locator(
          "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A",
        ),
      getThornhillHonda: () =>
        this.page.locator('label:has-text("Thornhill Honda")'),
      getMarkhamBMW: () =>
        this.page.locator('label:has-text("Markham BMW Mini")'),
      getFlorida: () =>
        this.page.locator(
          "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
        ),
      getTampaFord: () => this.page.locator('label:has-text("Tampa Ford")'),
      getDTLAToyota: () =>
        this.page.locator('label:has-text("Downtown LA Toyota")'),
      getCalifornia: () => this.page.locator("text=CALIFORNIA"),
      getFEAverageNew: () =>
        this.page.locator(
          "//*[@id='AveragesTableTBody']/tr[1]/th[1]/a[1]/span[1]",
        ),
      getFEAverageUsed: () =>
        this.page.locator(
          "//*[@id='AveragesTableTBody']/tr[3]/th[1]/a[1]/span[1]",
        ),
      getFIAverageNew: () =>
        this.page.locator(
          "//*[@id='AveragesTableTBody']/tr[5]/th[1]/a[1]/span[1]",
        ),
      getFIAverageUsed: () =>
        this.page.locator(
          "//*[@id='AveragesTableTBody']/tr[7]/th[1]/a[1]/span[1]",
        ),
      getDealAverage: () =>
        this.page.locator("//*[@id='trView1']/th/a/span[1]"),
    };
  }

  // navigation
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  // Common test methods
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("networkidle");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }
}

module.exports = { DealsAverageWidget };
