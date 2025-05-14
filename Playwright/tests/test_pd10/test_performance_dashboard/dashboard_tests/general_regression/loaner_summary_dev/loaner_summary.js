// this POM is for PDash Loaner Summary
const { expect } = require("@playwright/test");

class LoanerSummary {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");

    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesNewVehicle = page.locator(
      ':nth-match(:text("New Vehicle"),1)',
    );
    this.getSalesLoanerVehicleDetail = page.locator(
      ':nth-match(:text("Loaner Vehicle Detail"),1)',
    );
    this.getTotalRows = page.locator("tr");
    this.getVINAsc = page.locator(
      "//body/div[1]/div[2]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[15]/a[2]",
    );
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getAlaska = page.locator(
      "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
    );
    this.getAnchorageCJD = page.locator('label:has-text("Anchorage CJD")');
    this.getCanada = page.locator(
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator(
      "text=CALIFORNIA[+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Niss >> div",
    );
    this.getMichigan1 = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getMichiganStore2 = page.locator(
      'label:has-text("Farmington Hills CDJR")',
    );
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
  }

  // Method to validate duplicate stores
  async validateDuplicateStores() {
    const totalStoreRows = await this.getTotalRows.count();
    for (let i = 1; i < totalStoreRows - 1; i++) {
      const storeName1 = await this.page
        .locator(
          `//*[@id='PLSummary']/div[3]/table[1]/tbody[1]/tr[${i}]/td[1]/a[1]`,
        )
        .innerText();
      const storeName2 = await this.page
        .locator(
          `//*[@id='PLSummary']/div[3]/table[1]/tbody[1]/tr[${i + 1}]/td[1]/a[1]`,
        )
        .innerText();
      if (storeName1 === storeName2) {
        console.log(
          `Loaner Summary Report - The store name ${storeName2} is a duplicate`,
        );
      }
    }
  }

  // Method to validate duplicate VINs
  async validateDuplicateVINs() {
    const totalVINRows = await this.getTotalRows.count();
    await this.page.waitForTimeout(5000);
    for (let i = 1; i < totalVINRows - 2; i++) {
      const storeNameXPath = `//*[@id="PLSummary"]/div[3]/table[1]/tbody[1]/tr[${i}]/td[1]/a[1]`;
      const storeName = await this.page.locator(storeNameXPath).innerText();

      await this.page.locator(storeNameXPath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getVINAsc.click();

      const totalVINs = await this.getTotalRows.count();
      for (let j = 1; j < totalVINs - 1; j++) {
        const VIN1 = await this.page
          .locator(
            `//*[@id="PLDetail"]/div[3]/table[1]/tbody[1]/tr[${j}]/td[15]`,
          )
          .innerText();
        const VIN2 = await this.page
          .locator(
            `//*[@id="PLDetail"]/div[3]/table[1]/tbody[1]/tr[${j + 1}]/td[15]`,
          )
          .innerText();
        if (VIN1 === VIN2) {
          console.log(
            `Loaner Summary Detail - The store ${storeName} has duplicate VINs`,
          );
        }
      }
      await this.page.goBack();
    }
  }

  // Method to validate total count for each store
  async validateTotalCountForEachStore() {
    await this.page.waitForLoadState("load");
    const totalCounts = await this.getTotalRows.count();
    for (let i = 1; i < totalCounts - 2; i++) {
      const storeActualXpath = `//*[@id="PLSummary"]/div[3]/table[1]/tbody[1]/tr[${i}]/td[1]/a[1]`;
      const actualXpath = `//*[@id="PLSummary"]/div[3]/table[1]/tbody[1]/tr[${i}]/td[2]`;

      const storeName = await this.page.locator(storeActualXpath).innerText();
      const expectedCount = await this.page.locator(actualXpath).innerText();

      await this.page.locator(storeActualXpath).click();
      await this.page.waitForLoadState("networkidle");
      const detailCount = await this.getTotalRows.count();

      if (expectedCount != detailCount - 2) {
        console.log(
          `The loaner summary mismatch for store: ${storeName} in detail page it is: ${detailCount}, in summary page it is ${expectedCount}`,
        );
      }
      await this.page.goBack();
    }
  }
}

module.exports = { LoanerSummary };
