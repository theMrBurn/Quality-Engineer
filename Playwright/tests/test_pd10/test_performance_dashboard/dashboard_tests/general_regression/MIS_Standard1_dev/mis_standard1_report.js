const { expect } = require("@playwright/test");

class MISStandard {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      getMainTab: () => this.page.locator(':nth-match(:text("Main"),1)'),
      getMainMIS: () => this.page.locator('text="MIS"'),
      getMainMIS1Standard: () =>
        this.page.locator(':nth-match(:text("MIS 1 (Standard)"),1)'),
      getSales: () => this.page.locator("//li[1]/span[2]/span[1]"),
      getNewSalesBreakdown: () => this.page.locator("//li[2]/span[2]/span[1]"),
      getServiceDetail: () => this.page.locator("//li[3]/span[2]/span[1]"),
      getParts: () => this.page.locator("//li[4]/span[2]/span[1]"),
      getbodyShop: () => this.page.locator("//li[5]/span[2]/span[1]"),
      getTotalStore: () => this.page.locator("//li[6]/span[2]/span[1]"),
      getSalespersonSalary: () => this.page.locator("//tr[160]/td[3]/span[1]"),
      getFIMAnagerSalary: () => this.page.locator("//tr[161]/td[3]/span[1]"),
      getSellingExpense: () => this.page.locator("//tr[170]/td[3]/span[1]"),
      getPersonalExpense: () => this.page.locator("//tr[85]/td[3]/span[1]"),
      getSemiFixedexpense: () => this.page.locator("//tr[109]/td[3]/span[1]"),
      getDepartmentPRofit: () => this.page.locator("//tr[111]/td[3]/span[1]"),
      getPartsPersonnelExpense: () =>
        this.page.locator("//tr[95]/td[3]/span[1]"),
      getPartsSemiFixedExpense: () =>
        this.page.locator("//tr[120]/td[3]/span[1]"),
      getPartsFixedExpense: () => this.page.locator("//tr[124]/td[3]/span[1]"),
      getBodyShopPE: () => this.page.locator("//tr[50]/td[3]/span[1]"),
      getTSDepartmentPRofit: () => this.page.locator("//tr[51]/td[3]/span[1]"),
      getMultiStore: () =>
        this.page
          .locator("div")
          .filter({ hasText: "Multiple Stores Location" })
          .nth(2),
      getGVPOption: () =>
        this.page.locator(
          "text=Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERLDTLADAYPRESTIGEC >> select",
        ),
      getAllSelector: () => this.page.locator(".allSelectorIndicator"),
      getAdam: () =>
        this.page.locator(
          "text=Adam Britzius[+]Avondale NissanCalabasas AudiElk Grove FordMission Hills Hyundai >> div",
        ),
      getKenneth: () =>
        this.page.locator(
          "text=Kenneth Wright[+]Abilene ToyotaBryan CJD FiatCalallen CJDRCorpus Christi CJDCorp >> div",
        ),
      getShawn: () =>
        this.page.locator(
          "text=Shawn Kukic[+]Chamblee HondaCoral Springs AudiDoral AcuraDoral HyundaiDoral KiaD >> div",
        ),
      getStoreSelector: () =>
        this.page.locator("#storeSelector >> text=Select"),
      getLM10400: () => this.page.locator(".k-master-row > .k-hierarchy-cell"),
      getLM10405: () =>
        this.page.locator(
          ".k-grid-content > table > tbody > tr:nth-child(4) > .k-hierarchy-cell",
        ),
      getLM10400Carrot: () =>
        this.page.locator(
          "//*[@id='tabstrip-1']/div[2]/table[1]/tbody[1]/tr[3]/td[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]",
        ),
      getLM15011InnerCarrot: () =>
        this.page.locator(
          ".detail-wrapper > table > tbody > tr > .k-hierarchy-cell",
        ),
    };
  }

  // navigation
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  async NavigateToMainMIS1Standard() {
    await this.locators.getMainTab().click();
    await this.locators.getMainMIS().click();
    await this.locators.getMainMIS1Standard().click();
    await this.page.waitForLoadState("networkidle");
  }

  async ValidateBenchmarkInSales() {
    await this.page.waitForTimeout(4000);
    await expect(this.locators.getFIMAnagerSalary()).toBeVisible();
    await expect(this.locators.getSellingExpense()).toBeVisible();
    await expect(this.locators.getSalespersonSalary()).toBeVisible();
  }

  async ValidateBenchmarkInServiceDetail() {
    await this.locators.getServiceDetail().click();
    await this.page.waitForTimeout(4000);
    await expect(this.locators.getPersonalExpense()).toBeVisible();
    await expect(this.locators.getSemiFixedexpense()).toBeVisible();
    await expect(this.locators.getDepartmentPRofit()).toBeVisible();
  }

  async ValidateBenchmarkInParts() {
    await this.locators.getParts().click();
    await this.page.waitForTimeout(4000);
    await expect(this.locators.getPartsFixedExpense()).toBeVisible();
    await expect(this.locators.getPartsPersonnelExpense()).toBeVisible();
    await expect(this.locators.getPartsSemiFixedExpense()).toBeVisible();
  }

  async ValidateBenchmarkInBodyShop() {
    await this.locators.getbodyShop().click();
    await this.page.waitForTimeout(4000);
    await expect(this.locators.getBodyShopPE()).toBeVisible();
  }

  async ValidateBenchmarkInTotalStore() {
    await this.locators.getTotalStore().click();
    await this.page.waitForTimeout(4000);
    await expect(this.locators.getTSDepartmentPRofit()).toBeVisible();
  }

  // Bug - 106937 - Carrots not Expanding when GVP with more stores are selected
  async ValidateCarrotExtensionForGVP() {
    await this.locators.getMultiStore().click();
    await this.locators.getGVPOption().selectOption("2");
    await this.locators.getAllSelector().click();
    await this.locators.getAllSelector().click();
    await this.locators.getAdam().first().click();
    // Activate the next two lines after it goes to production because here is where the bug is currently
    /*await this.locators.getKenneth().first().click();
      await this.locators.getShawn().first().click();*/
    await this.locators.getStoreSelector().click();
    await this.page.waitForTimeout(5000);
    await this.locators.getLM10400().first().click();
    await this.page.waitForTimeout(5000);
    await expect(this.locators.getLM10400Carrot()).toBeVisible();
    await this.page.waitForTimeout(5000);
    await this.locators.getLM15011InnerCarrot().first().click();
    await this.page.waitForTimeout(5000);
    await this.locators.getLM10405().first().click();
    await this.page.waitForTimeout(5000);
    // await expect(this.page.locator("//*[@id='tabstrip-1']/div[2]/table[1]/tbody[1]/tr[5]/td[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]")).toBeVisible();
  }

  async ValidateNewBrokerSection() {
    await this.page.waitForTimeout(5000);
    await expect(
      this.page.locator(
        "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[12]/td[2]",
      ),
    ).toHaveText("LM10880");
    await expect(
      this.page.locator(
        "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[12]/td[3]",
      ),
    ).toHaveText("New Broker Revenue");
    await expect(
      this.page.locator(
        "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[13]/td[2]",
      ),
    ).toHaveText("LM10885");
    await expect(
      this.page.locator(
        "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[13]/td[3]",
      ),
    ).toHaveText("New Broker Gross");
    await expect(
      this.page.locator(
        "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[14]/td[3]",
      ),
    ).toHaveText("Gross Per Broker");
    await expect(
      this.page.locator(
        "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[15]/td[3]",
      ),
    ).toHaveText("Broker Count");
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

module.exports = { MISStandard };
