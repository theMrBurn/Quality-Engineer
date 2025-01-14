const { expect } = require("@playwright/test");

class StorePerformance {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getTotalActual: () =>
        this.page.locator(
          '//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[3]/td[2]',
        ),
      getTotalPacing: () =>
        this.page.locator(
          "//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[3]/td[3]",
        ),
      getStoreSelector: () =>
        this.page.locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        ),
      getAllselector: () => this.page.locator(".allSelectorIndicator"),
      getCalifornia: () => this.page.locator("text=CALIFORNIA"),
      getSelectButton: () => this.page.locator("#storeSelector >> text=Select"),
      getTotalRows: () => this.page.locator("tr"),
      getEmployerDropdown: () =>
        this.page.locator(
          "text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select",
        ),
      getSalesTab: () => this.page.locator('text="Sales" >> nth=0'),
      getSalesFIOps: () => this.page.locator(':nth-match(:text("F&I Ops"),1)'),
      getSalesFIOpsDashboard: () =>
        this.page.locator(':nth-match(:text("F&I Ops Dashboard"),1)'),
      getMainTab: () => this.page.locator(':nth-match(:text("Main"),1)'),
      getMainStorePerformanceDashboard: () =>
        this.page.locator(':nth-match(:text("Store Performance Dashboard"),1)'),
      getOffice: () => this.page.locator(':nth-match(:text("Office"),1)'),
      getOfficeSchedules: () =>
        this.page.locator(':nth-match(:text("Schedule"),1)'),
      getOfficeSchedulesSummary: () =>
        this.page.locator('text="Schedules Summary"'),
      getStoreOrder: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[1]/div[1]/table[1]/thead[1]/tr[1]/th[1]/a[1]",
        ),
      getAnchorageCJDActual: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[2]",
        ),
      getAchorageCJDPacing: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[3]",
        ),
      getAnchorageCJDPlan: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]",
        ),
      getDTLAActual: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[2]",
        ),
      getDTLAPacing: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[3]",
        ),
      getDTLAPlan: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[4]",
        ),
      getFHCDJRActual: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[3]/td[2]",
        ),
      getFHCDJRPacing: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[3]/td[3]",
        ),
      getFHCDJRPlan: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[3]/td[4]",
        ),
      getOxnard: () => this.page.locator('label:has-text("Oxnard Honda")'),
      getDTLA1: () =>
        this.page.locator(
          'div:has-text("Oxnard Honda Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERLDTL")',
        ),
      getDTLA2: () => this.page.locator('label:has-text("Downtown LA Toyota")'),
    };
  }

  async goto() {
    await this.page.goto("/", {
      timeout: 0,
    });
    await this.page.waitForLoadState("networkidle");
  }

  // Check element visibility
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      throw new Error(
        `Locator '${locatorName}' failed: ${originalError.message}`,
      );
    }
  }

  // Find first grid row
  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement);
    const gridRowHandles = await this.page.$$(gridElement);

    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      await this.page.waitForTimeout(1000);
      await firstGridRow.click();
      await this.page.waitForLoadState("networkidle");
    } else {
      console.log("No grid rows found.");
    }
  }

  // Interact with elements
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

  async clickElement(locatorName, param) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction(param).first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      throw new Error(
        `Clicking on locator '${locatorName}' failed: ${originalError.message}`,
      );
    }
  }

  // Validate unit values
  async validateUnits(locatorNames) {
    const values = {};
    for (const name of locatorNames) {
      const text = await this.locators[name]().innerText();
      values[name] = parseInt(text);
    }
    return values;
  }
}

module.exports = { StorePerformance };
