const { expect } = require("@playwright/test");

class FILog {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      getSalesTab: () => this.page.locator('text="Sales" >> nth=0'),
      getFIOps: () => this.page.locator(':nth-match(:text("F&I Ops"), 1)'),
      getFIlog: () => this.page.locator(':nth-match(:text("F&I Log"), 1)'),
      getCash: () =>
        this.page.locator(
          "xpath=//body/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/div[1]",
        ),
      getFin: () =>
        this.page.locator(
          "xpath=//body/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]/div[1]",
        ),
      getTotals: () =>
        this.page.locator(
          "xpath=//body/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/div[1]",
        ),
      getTotalStores: () => this.page.locator("tr"),
      getStoreSelector: () =>
        this.page.locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        ),
      getAllselector: () => this.page.locator(".allSelectorIndicator"),
      getCanada: () =>
        this.page.locator(
          "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
        ),
      getSelectButton: () => this.page.locator("#storeSelector >> text=Select"),
      getGoBUtton: () => this.page.locator('text="GO"'),
    };
  }

  //navigation
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  async NavigateToSalesFILog() {
    await this.clickElement("getSalesTab");
    await this.clickElement("getFIOps");
    await this.clickElement("getFIlog");
    await this.page.waitForLoadState("networkidle");
  }

  async SelectAllStores() {
    await this.page.waitForLoadState("networkidle");
    await this.locators.getStoreSelector().nth(2).click();
    await this.clickElement("getAllselector");
    await this.clickElement("getSelectButton");
    await this.page.waitForLoadState("networkidle");
  }

  async VerifyTotalVehicle() {
    const totalcash = parseInt(await this.locators.getCash().innerText()) || 0;
    const totalfin = parseInt(await this.locators.getFin().innerText()) || 0;
    const sum = totalcash + totalfin;
    const ttotal = parseInt(await this.locators.getTotals().innerText()) || 0;

    if (ttotal === sum) console.log("FI Log Total Match");
    else console.log("FI Log Total Mismatch");
  }

  async ValidateTotalCountForAStore() {
    const totalStores = await this.locators.getTotalStores().count();
    for (let i = 1; i <= totalStores - 3; i++) {
      const storeName = await this.page
        .locator(
          `//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[1]/a[1]`,
        )
        .innerText();

      const cash =
        parseInt(
          await this.page
            .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[2]`)
            .innerText(),
        ) || 0;
      const fin =
        parseInt(
          await this.page
            .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`)
            .innerText(),
        ) || 0;
      const count =
        parseInt(
          await this.page
            .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[4]`)
            .innerText(),
        ) || 0;

      const sum = cash + fin;
      if (sum === count) {
        console.log(`The FI Log - total for a store ${storeName} matches`);
      } else {
        console.log(`The FI Log - total for a store ${storeName} mismatches`);
      }
    }
  }

  async ValidateTotalCash() {
    const totalStores = await this.locators.getTotalStores().count();
    let cashSum = 0;

    for (let i = 1; i <= totalStores - 3; i++) {
      const cash =
        parseInt(
          await this.page
            .locator(
              `//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[${i}]/td[2]`,
            )
            .innerText(),
        ) || 0;
      cashSum += cash;
    }

    const totalCash = parseInt(await this.locators.getCash().innerText()) || 0;
    if (cashSum === totalCash) {
      console.log("The FI Log - total Cash Count matches");
    } else {
      console.log("The FI Log - total Cash Count mismatches");
    }
  }

  async ValidateTotalFin() {
    const totalStores = await this.locators.getTotalStores().count();
    let finSum = 0;

    for (let i = 1; i <= totalStores - 3; i++) {
      const fin =
        parseInt(
          await this.page
            .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[3]`)
            .innerText(),
        ) || 0;
      finSum += fin;
    }

    const totalFin = parseInt(await this.locators.getFin().innerText()) || 0;
    if (finSum === totalFin) {
      console.log("The FI Log - total Fin Count matches");
    } else {
      console.log("The FI Log - total Fin Count mismatches");
    }
  }

  async ValidateTotalCount() {
    const totalStores = await this.locators.getTotalStores().count();
    let countSum = 0;

    for (let i = 1; i <= totalStores - 3; i++) {
      const count =
        parseInt(
          await this.page
            .locator(`//div[3]/table[1]/tbody[1]/tr[${i}]/td[4]`)
            .innerText(),
        ) || 0;
      countSum += count;
    }

    const totalCount =
      parseInt(await this.locators.getTotals().innerText()) || 0;
    if (countSum === totalCount) {
      console.log("The FI Log - total Count matches");
    } else {
      console.log("The FI Log - total Count mismatches");
    }
  }

  // common test methods
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];
    const element = await locatorFunction().first();

    try {
      await expect(element).toBeVisible();
    } catch (error) {
      throw new Error(
        `Locator '${locatorName}' is not visible: ${error.message}`,
      );
    }
  }

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement);
    const gridRowHandles = await this.page.$$(gridElement);

    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];
      await this.ensureElementIsConnected(firstGridRow);
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
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
        } catch (error) {
          throw new Error(
            `Filling the form field with locator '${key}' failed: ${error.message}`,
          );
        }
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];
    const element = await locatorFunction().first();

    try {
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(
        `Clicking on locator '${locatorName}' failed: ${error.message}`,
      );
    }
  }
}

module.exports = { FILog };
