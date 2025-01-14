const { expect } = require("@playwright/test");

class SARSummary {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getOffice: () => page.locator(':nth-match(:text("Office"),1)'),
      getOfficeSchedules: () => page.locator(':nth-match(:text("Schedule"),1)'),
      getOfficeSchedulesSummary: () => page.locator('text="Schedules Summary"'),
      getContractInTransitCountWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[2]/td[2]/span[1]",
        ),
      getContractInTransitSARCount: () =>
        page.locator(
          "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]",
        ),
      getVehicleReceivablesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[3]/td[2]/span[1]",
        ),
      getVehicleReceivablesSARSummaryCount: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[2]/td[11]',
        ),
      getIncenttiveReceivablesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[4]/td[2]/span[1]",
        ),
      getIncentiveReceivablesSARSummaryCount: () =>
        page.locator(
          "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]",
        ),
      getRebateReceivablesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[5]/td[2]/span[1]",
        ),
      getRebateReceivablesSARSummaryCount: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[3]/td[11]',
        ),
      getWarrantyReceivableCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[6]/td[2]/span[1]",
        ),
      getWarrantyReceivableCountSARSummaryCOunt: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[8]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]',
        ),
      getCashSalesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[7]/td[2]/span[1]",
        ),
      getCashSalesSARSummaryCount: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[6]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]',
        ),
      getOOCContractInTransitCountWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[2]/td[4]/span[1]",
        ),
      getOOCContractInTransitSARCount: () =>
        page.locator(
          "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]",
        ),
      getOOCVehicleReceivablesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[3]/td[4]/span[1]",
        ),
      getOOCVehicleReceivablesSARSummaryCount: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[2]/td[9]',
        ),
      getOOCIncenttiveReceivablesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[4]/td[4]/span[1]",
        ),
      getOOCIncentiveReceivablesSARSummaryCount: () =>
        page.locator(
          "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]",
        ),
      getOOCRebateReceivablesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[5]/td[4]/span[1]",
        ),
      getOOCRebateReceivablesSARSummaryCount: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[3]/td[9]',
        ),
      getOOCWarrantyReceivableCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[6]/td[4]/span[1]",
        ),
      getOOCWarrantyReceivableCountSARSummaryCOunt: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[8]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]',
        ),
      getOOCCashSalesCountInWidget: () =>
        page.locator(
          "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[7]/td[4]/span[1]",
        ),
      getOOCCashSalesSARSummaryCount: () =>
        page.locator(
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[6]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]',
        ),
      getStore: () =>
        page.locator('//*[@id="MainGrid"]/div/table/tbody/tr/td/a[1]'),
    };
  }

  async selectStoreForThornhillHonda() {
    await this.clickElement(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      2,
    );
    await this.page.locator(".allSelectorIndicator").dblclick();
    await this.clickElement(
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner",
      2,
    );
    await this.clickElement('label:has-text("Thornhill Honda")');
    await this.clickElement("#storeSelector >> text=Select");
    await this.page.waitForLoadState("networkidle");
  }

  async selectStoreForFHCJDR() {
    await this.clickElement(
      'div:has-text("Thornhill Honda Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      2,
    );
    await this.page.locator(".allSelectorIndicator").dblclick();
    await this.clickElement(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc",
      2,
    );
    await this.clickElement('label:has-text("Farmington Hills CDJR")');
    await this.clickElement("#storeSelector >> text=Select");
    await this.page.waitForLoadState("networkidle");
  }

  async selectStoresForDTLA() {
    await this.clickElement(
      'div:has-text("Farmington Hills CDJR Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      2,
    );
    await this.page.locator(".allSelectorIndicator").dblclick();
    await this.clickElement("text=CALIFORNIA");
    await this.clickElement('label:has-text("Downtown LA Toyota")');
    await this.clickElement("#storeSelector >> text=Select");
    await this.page.waitForLoadState("networkidle");
  }

  async goto() {
    await this.page.goto("/", { timeout: 0 });
    await this.page.waitForLoadState("networkidle");
  }

  async validateCount(locatorNames) {
    const values = await this.validateUnits(locatorNames);
    await this.clickElement("getOffice");
    await this.clickElement("getOfficeSchedules");
    await this.clickElement("getOfficeSchedulesSummary");
    await this.page.waitForLoadState("networkidle");
    await this.clickElement("getStore");
    await this.page.waitForLoadState("networkidle");
    const sarValues = await this.validateUnits(
      locatorNames.map((name) => name.replace("Widget", "SARSummaryCount")),
    );
    return { values, sarValues };
  }

  async validateTotalCount() {
    const { values, sarValues } = await this.validateCount([
      "getContractInTransitCountWidget",
      "getVehicleReceivablesCountInWidget",
      "getIncenttiveReceivablesCountInWidget",
      "getRebateReceivablesCountInWidget",
      "getWarrantyReceivableCountInWidget",
      "getCashSalesCountInWidget",
    ]);
    if (
      values.getContractInTransitCountWidget !==
      sarValues.getContractInTransitSARSummaryCount
    ) {
      console.log("Mismatch in Contract in Transit");
    }
    // Add the rest of the errors checks...
  }

  async validateTotalCountForOutOfCriteria() {
    const { values, sarValues } = await this.validateCount([
      "getOOCContractInTransitCountWidget",
      "getOOCVehicleReceivablesCountInWidget",
      "getOOCIncenttiveReceivablesCountInWidget",
      "getOOCRebateReceivablesCountInWidget",
      "getOOCWarrantyReceivableCountInWidget",
      "getOOCCashSalesCountInWidget",
    ]);
    if (
      values.getOOCContractInTransitCountWidget !==
      sarValues.getOOCContractInTransitSARCount
    ) {
      console.log("Mismatch in Contract in Transit");
    }
    // Add the rest of the errors checks...
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

module.exports = { SARSummary };
