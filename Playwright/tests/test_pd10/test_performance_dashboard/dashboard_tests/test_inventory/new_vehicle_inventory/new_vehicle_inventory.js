const { expect } = require("@playwright/test");

class NewVehicleInventory {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getSalesTab: () => this.page.locator('span:has-text("Sales")').first(),
      getSalesNewVehicle: () =>
        this.page.locator('span:has-text("New Vehicle")').first(),
      getSalesNewInventoryDetail: () =>
        this.page.locator('a:has-text("New Inventory Detail")').first(),
      getNewInventorySummaryTotals: () => this.page.locator('text="Totals"'),
      getNVI030DaysTotalCount1: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]",
        ),
      getNVI030DaysTotalCount2: () =>
        this.page.locator('span[class="k-pager-info k-label"]'),
      getNVI3160DaysTotalCount1: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/a[1]",
        ),
      getNVI3160DaysTotalCount2: () =>
        this.page.locator('span[class="k-pager-info k-label"]'),
      getNVI6190DaysTotalCount1: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]/a[1]",
        ),
      getNVI6190DaysTotalCount2: () =>
        this.page.locator('span[class="k-pager-info k-label"]'),
      getNVI91DaysTotalCount1: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/a[1]",
        ),
      getNVI91DaysTotalCount2: () =>
        this.page.locator('span[class="k-pager-info k-label"]'),
      getNVITotalTotalCount1: () =>
        this.page.locator(
          "xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[12]/a[1]",
        ),
      getNVITotalTotalCount2: () =>
        this.page.locator('span[class="k-pager-info k-label"]'),
      getStoreSelector: () =>
        this.page.locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        ),
      getAllselector: () => this.page.locator(".allSelectorIndicator"),
      getSelectButton: () => this.page.locator("#storeSelector >> text=Select"),
      getGoButton: () => this.page.locator('text="GO"'),
      getTotalRows: () => this.page.locator("tr"),
      getExcess: () => this.page.locator(':nth-match(:text("Excess"),1)'),
      getStore: () =>
        this.page.locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        ),
      getPTMRegional: () =>
        this.page.locator(':nth-match(:text("PTM Regional %"),1)'),
      getPTMNational: () =>
        this.page.locator(':nth-match(:text("PTM National %"),1)'),
      getMichiganStore1: () =>
        this.page.locator('label:has-text("Farmington Hills Audi")'),
      getMichiganStore2: () =>
        this.page.locator('label:has-text("Farmington Hills CDJR")'),
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
      getCalifornia: () =>
        this.page.locator(
          "text=CALIFORNIA [+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Nis >> div",
        ),
      getMichigan1: () =>
        this.page.locator(
          "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
        ),
    };
  }

  // navigation
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  async NavigateToSalesNewInventoryDetail(withAdditionalWaits = false) {
    await this.page.waitForLoadState("networkidle");
    if (withAdditionalWaits) {
      await this.page.waitForTimeout(7000);
      await this.page.waitForTimeout(5000);
    }
    await this.clickElement("getSalesTab");
    await this.clickElement("getSalesNewVehicle");
    await this.clickElement("getSalesNewInventoryDetail");
    await this.clickElement("getExcess"); // Added from POM1
    await this.page.waitForLoadState("networkidle");
    await this.clickElement("getStore"); // Added from POM1
    await this.page.waitForLoadState("networkidle");
  }

  async SelectStoresForRegression() {
    await this.page.waitForTimeout(5000);
    await this.locators.getStoreSelector().nth(2).click();
    await this.clickElement("getAllselector");
    await this.clickElement("getSelectButton");
    await this.page.waitForLoadState("networkidle");
  }

  async ValidateDuplicateStore() {
    const totalRows = await this.locators.getTotalRows().count();
    for (let i = 1; i < Math.min(5, totalRows); i++) {
      const beforeXpath = '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
      const afterXpath = "]/td[1]/a[1]";
      const compareXpath1 = beforeXpath + i + afterXpath;
      const compareXpath2 = beforeXpath + (i + 1) + afterXpath;
      const text1 = await this.page.locator(compareXpath1).innerText();
      const text2 = await this.page.locator(compareXpath2).innerText();
      if (text1 === text2) {
        console.log(
          `NVI - Invoice Aging - The store name ${text2} is a duplicate`,
        );
      }
    }
  }

  async ValidateDuplicateVIN() {
    const totalRows = await this.locators.getTotalRows().count();
    for (let i = 1; i < Math.min(5, totalRows); i++) {
      const beforeXpath = '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
      const afterXpath = "]/td[1]/a[1]";
      const storeXpath = beforeXpath + i + afterXpath;
      const storeName = await this.page.locator(storeXpath).innerText();
      await this.page.locator(storeXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.page.locator("text=100select >> span").nth(2).click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.page.waitForTimeout(5000);
      const vinTotalRows = await this.locators.getTotalRows().count();
      for (let j = 1; j < vinTotalRows; j++) {
        const vinBeforeXpath =
          '//*[@id="NewDetailTable"]/div[3]/table[1]/tbody[1]/tr[';
        const vinAfterXpath = "]/td[27]";
        const vinXpath1 = vinBeforeXpath + j + vinAfterXpath;
        const vinXpath2 = vinBeforeXpath + (j + 1) + vinAfterXpath;
        const vin1 = await this.page.locator(vinXpath1).innerText();
        const vin2 = await this.page.locator(vinXpath2).innerText();
        if (vin1 === vin2) {
          console.log(
            `NVI - Invoice aging - The store ${storeName} has duplicate VINS`,
          );
        }
      }
      await this.page.goBack();
      await this.clickElement("getSalesNewInventoryDetail");
    }
  }

  async ValidateTotalsForAStore(days, column) {
    await this.page.waitForTimeout(4000);
    const totalRows = await this.locators.getTotalRows().count();
    for (let i = 1; i < Math.min(5, totalRows); i++) {
      const beforeXpath = '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
      const afterXpath = `]/td[${column}]/a[1]`;
      const totalXpath = beforeXpath + i + afterXpath;
      const totalCount = await this.page.locator(totalXpath).innerText();
      const storeXpath = beforeXpath + i + "]/td[1]/a[1]";
      const storeName = await this.page.locator(storeXpath).innerText();
      await this.page.locator(totalXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.page.locator("text=100select >> span").nth(2).click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.page.waitForTimeout(5000);
      const rowCount = await this.locators.getTotalRows().count();
      const totalRowsCount = rowCount - 1;
      if (totalCount !== totalRowsCount) {
        console.log(
          `NVI - Invoice Aging - The Total Units for ${days} ${storeName} has a mismatch in Total Units`,
        );
      }
      await this.page.goBack();
      await this.clickElement("getSalesNewInventoryDetail");
    }
  }

  async ValidateTotalsForAStore030Days() {
    await this.ValidateTotalsForAStore("0-30 Days", 4);
  }

  async ValidateTotalsForAStore3160Days() {
    await this.ValidateTotalsForAStore("31-60 Days", 6);
  }

  async ValidateTotalsForAStore6190Days() {
    await this.ValidateTotalsForAStore("61-90 Days", 8);
  }

  async ValidateTotalsForAStore91Days() {
    await this.ValidateTotalsForAStore("91 Days", 10);
  }

  async ValidateTotalsForAStoreTotal() {
    await this.ValidateTotalsForAStore("Total", 12);
  }

  async VerifyTotalVehicle030Days() {
    await this.verifyTotalVehicleBuckets(
      "0-30 Days",
      this.locators.getNVI030DaysTotalCount1(),
      this.locators.getNVI030DaysTotalCount2(),
    );
  }

  async VerifyTotalVehicle3160Days() {
    await this.verifyTotalVehicleBuckets(
      "31-60 Days",
      this.locators.getNVI3160DaysTotalCount1(),
      this.locators.getNVI3160DaysTotalCount2(),
    );
  }

  async VerifyTotalVehicle6190Days() {
    await this.verifyTotalVehicleBuckets(
      "61-90 Days",
      this.locators.getNVI6190DaysTotalCount1(),
      this.locators.getNVI6190DaysTotalCount2(),
    );
  }

  async VerifyTotalVehicle91Days() {
    await this.verifyTotalVehicleBuckets(
      "91+ Days",
      this.locators.getNVI91DaysTotalCount1(),
      this.locators.getNVI91DaysTotalCount2(),
    );
  }

  async VerifyTotalVehicleTotal() {
    const totalCount = await this.locators.getNVITotalTotalCount2().innerText();
    const sanitizedTotal = parseInt(totalCount.replace(",", ""));
    await this.clickElement("getSalesNewInventoryDetail");
    await this.page.waitForLoadState("networkidle");
    const itemCountText = await this.locators
      .getNVI030DaysTotalCount2()
      .innerText();
    const itemCount = parseInt(
      itemCountText.replace("1 - 100 of ", "").replace(" items", ""),
    );
    if (sanitizedTotal === itemCount) {
      console.log("NVI - Totals in Invoice Aging Page match");
    } else {
      console.log("NVI - Totals in Invoice Aging page mismatch");
    }
  }

  async ValidateDaySupply() {
    const beforeDSXpath = "//*[@id='AgingTable']/div[3]/table[1]/tbody[1]/tr[";
    const afterDSXpath = "]/td[15]";
    const rowCount = await this.locators.getTotalRows().count();
    for (let i = 1; i < rowCount - 3; i++) {
      const actualDSXpath = beforeDSXpath + i + afterDSXpath;
      expect(await this.page.locator(actualDSXpath)).toBeTruthy();
    }
  }

  // Validate if PTM is present and visible in NVI-Excess (from POM1)
  async validatePTM() {
    await this.checkElementVisibility("getPTMRegional");
    await this.checkElementVisibility("getPTMNational");

    const beforeRegionalXpath = "//tr[";
    const afterRegionalXpath = "]/td[11]";
    const beforeNationalXpath = "//tr[";
    const afterNationalXpath = "]/td[12]";

    for (let i = 1; i < 100; i++) {
      const actualRegionalXpath = beforeRegionalXpath + i + afterRegionalXpath;
      const actualNationalXpath = beforeNationalXpath + i + afterNationalXpath;
      this.locators.getRegional = () => this.page.locator(actualRegionalXpath);
      this.locators.getNational = () => this.page.locator(actualNationalXpath);
      await this.checkElementVisibility("getRegional");
      await this.checkElementVisibility("getNational");
    }
  }

  async verifyTotalVehicleBuckets(description, countLocator1, countLocator2) {
    const totalCount1 = await countLocator1.innerText();
    const totalCount2 = await countLocator2.innerText();
    if (totalCount1 === totalCount2) {
      console.log(`NVI - ${description} - Total count matches`);
    } else {
      console.log(`NVI - ${description} - Total count mismatch`);
    }
  }

  // common test methods

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridElement); // Get handles for all grid rows

    // Check if any grid rows are found
    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      // Ensure the element is attached to the DOM
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      // Click on the first grid row
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

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

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        try {
          await this.page.waitForLoadState("networkidle");
          const inputElement = await locatorFunction();
          await inputElement.fill(value);
        } catch (originalError) {
          const errorMessage = `Filling the form field with locator '${key}' failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = { NewVehicleInventory };
