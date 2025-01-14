const { expect } = require("@playwright/test");

class dealsAverageWidget {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getUsername: () => page.locator("id=i0116"),
      getPassword: () => page.locator("id=i0118"),
      getSalesTab: () => page.locator('text="Sales" >> nth=0'),
      getSalesFIOps: () => page.locator(':nth-match(:text("F&I Ops"),1)'),
      getSalesFIOpsDashboard: () =>
        page.locator(':nth-match(:text("F&I Ops Dashboard"),1)'),
      getSalesFILogNew: () => page.locator(':nth-match(:text("F&I Log"),1)'),
      getStoreSelector: () =>
        page.locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        ),
      getAllselector: () => page.locator(".allSelectorIndicator"),
      getSelectButton: () => page.locator("#storeSelector >> text=Select"),
      getBuick: () => page.locator('label:has-text("Troy Buick GMC")'),
      getMichigan: () =>
        page.locator(
          "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
        ),
      getFord: () => page.locator('label:has-text("Troy Ford")'),
      getMazda: () => page.locator('label:has-text("Troy Mazda")'),
      getSalesNewVehicle: () => page.locator('span:has-text("New Vehicle")'),
      getSalesNewInventoryDetail: () =>
        page.locator("text=New Inventory Detail"),
      getDetailTotals: () =>
        page.locator('//*[@id="tabstrip-1"]/div/div/span[2]'),
      getMichiganStore2: () =>
        page.locator('label:has-text("Farmington Hills CDJR")'),
      getSalesLoanerVehicleDetail: () =>
        page.locator(':nth-match(:text("Loaner Vehicle Detail"),1)'),
      getTotalRows: () => page.locator("tr"),
      getAlaska: () =>
        page.locator(
          "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
        ),
      getAnchorageCJD: () => page.locator('label:has-text("Anchorage CJD")'),
      getCanada: () =>
        page.locator(
          "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A",
        ),
      getThornhillHonda: () =>
        page.locator('label:has-text("Thornhill Honda")'),
      getMarkhamBMW: () => page.locator('label:has-text("Markham BMW Mini")'),
      getFlorida: () =>
        page.locator(
          "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
        ),
      getTampaFord: () => page.locator('label:has-text("Tampa Ford")'),
      getDTLAToyota: () => page.locator('label:has-text("Downtown LA Toyota")'),
      getCalifornia: () => page.locator("text=CALIFORNIA"),
      getFEAverageNew: () =>
        page.locator("//*[@id='AveragesTableTBody']/tr[1]/th[1]/a[1]/span[1]"),
      getFEAverageUsed: () =>
        page.locator("//*[@id='AveragesTableTBody']/tr[3]/th[1]/a[1]/span[1]"),
      getFIAverageNew: () =>
        page.locator("//*[@id='AveragesTableTBody']/tr[5]/th[1]/a[1]/span[1]"),
      getFIAverageUsed: () =>
        page.locator("//*[@id='AveragesTableTBody']/tr[7]/th[1]/a[1]/span[1]"),
      getDealAverage: () => page.locator("//*[@id='trView1']/th/a/span[1]"),
    };
  }

  async NavigateToSalesFIOpsDashboard() {
    await this.clickElement(this.locators.getSalesTab());
    await this.clickElement(this.locators.getSalesFIOps());
    await this.clickElement(this.locators.getSalesFIOpsDashboard());
  }

  async SelectStoresForRegression() {
    const storesToSelect = [
      "getMichigan",
      "getBuick",
      "getFord",
      "getMazda",
      "getAlaska",
      "getAnchorageCJD",
      "getCanada",
      "getThornhillHonda",
      "getMarkhamBMW",
      "getCalifornia",
      "getDTLAToyota",
      "getFlorida",
      "getTampaFord",
      "getMichiganStore2",
    ];

    await this.page.waitForLoadState("networkidle");
    await this.locators.getStoreSelector().nth(2).click();
    await this.locators.getAllselector().click();
    await this.locators.getAllselector().click();

    for (const store of storesToSelect) {
      await this.locators[store]().click();
    }

    await this.clickElement(this.locators.getSelectButton());
  }

  async goto(url) {
    await this.page.goto(url, { timeout: 0 });
    await this.page.waitForLoadState("networkidle");
  }

  async login() {
    await this.clickElement(this.locators.getUsername());
    await this.page.fill(
      this.locators.getUsername()._selector,
      "t_PerfDash_01@lithia.com",
    );
    await this.clickElement(this.page.locator("id=idSIButton9"));
    await this.clickElement(this.locators.getPassword());
    await this.page.fill(
      this.locators.getPassword()._selector,
      "GkCow**!#w#)4E#Sj3Rb8KS*TkGduz",
    );
    await this.clickElement(this.page.locator("text=Sign In"));
  }

  async twostepauthlogin() {
    await this.clickElement(this.page.locator("id=KmsiCheckboxField"));
    await this.clickElement(this.page.locator("id=idSIButton9"));
  }

  async ValidateUnits() {
    const BeforeXpath =
      "//body/div[1]/div[1]/form[1]/div[3]/div[6]/div[2]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[";
    const suffixes = [
      "td[3]/span[1]",
      "td[4]",
      "td[5]",
      "td[6]",
      "td[7]",
      "td[8]",
      "td[9]",
      "td[10]",
      "td[11]",
      "td[12]",
      "td[13]",
    ];
    let values = new Array(12).fill(null).map(() => []);

    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < suffixes.length; j++) {
        const actualXpath = `${BeforeXpath}${i}/${suffixes[j]}`;
        values[j].push(
          await this.getElementText(this.page.locator(actualXpath)),
        );
      }
    }

    await this.clickElement(this.locators.getSalesTab());
    await this.clickElement(this.locators.getSalesFIOps());
    await this.clickElement(this.locators.getSalesFILogNew());

    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);

    const FIBeforeXpath = "//*[@id='FISummary']/div[3]/table[1]/tbody[1]/tr[";
    const FIActualSuffixes = [
      "td[14]",
      "td[2]",
      "td[3]",
      "td[4]",
      "td[9]",
      "td[5]",
      "td[6]",
      "td[7]",
      "td[8]",
      "td[11]",
      "td[12]",
    ];
    let fiValues = new Array(12).fill(null).map(() => []);

    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < suffixes.length; j++) {
        const actualXpath = `${FIBeforeXpath}${i}/${FIActualSuffixes[j]}`;
        fiValues[j].push(
          await this.getElementText(this.page.locator(actualXpath)),
        );
      }
    }

    // Compare values
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        if (values[i][j] !== fiValues[i][j]) {
          console.log(
            `Mismatch found for values ${i + 1} for row ${j + 1}: ${values[i][j]} !== ${fiValues[i][j]}`,
          );
        }
      }
    }
  }

  async Navigations() {
    const elements = [
      "getFEAverageNew",
      "getFEAverageUsed",
      "getFIAverageNew",
      "getFIAverageUsed",
      "getDealAverage",
    ];

    for (const element of elements) {
      await this.clickElement(this.locators[element]());
      await this.page.goBack();
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(5000);
    }
  }

  // Helper Methods
  async getElementText(locator) {
    return (await locator.innerText()).replace(/,/g, "");
  }

  async getPageTotalValue(locator) {
    const text = await this.getElementText(locator);
    return parseInt(text.replace("1 - 100 of ", "").replace(" items", ""));
  }

  compareTotals(summaryValue, detailValue, message) {
    if (summaryValue !== detailValue) {
      console.log(`${message} ${summaryValue}:${detailValue}`);
    }
  }

  // Interactions with page elements
  async checkElementVisibility(locator) {
    try {
      await locator.waitFor({ state: "visible" });
    } catch (error) {
      throw new Error(
        `Locator '${locator}' failed to be visible: ${error.message}`,
      );
    }
  }

  async clickElement(locator) {
    try {
      await locator.click();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(
        `Clicking on locator '${locator}' failed: ${error.message}`,
      );
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locator = this.locators[key]();
      if (locator) {
        await locator.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }
}

module.exports = { dealsAverageWidget };
