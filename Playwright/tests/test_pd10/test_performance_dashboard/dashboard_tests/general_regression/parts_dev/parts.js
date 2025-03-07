const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getSPELogo: () => this.page.locator("id=logo"),
      getParts: () => this.page.locator('span:has-text("Parts")'),
      getPartsReport: () =>
        this.page.locator(':nth-match(:text("Parts Report"),1)'),
      getMultiStore: () =>
        this.page.locator("div").filter({
          hasText:
            "Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL",
        }),
      getAllStore: () => this.page.locator(".allSelectorIndicator"),
      getAlaska: () =>
        this.page.locator(
          "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
        ),
      getSelect: () => this.page.locator("#storeSelector >> text=Select"),
      getPartsRevenue1: () =>
        this.page.locator(
          "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[6]/td[2]",
        ),
      getPartsRevenue2: () =>
        this.page.locator(
          "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[6]/td[8]",
        ),
      getPartsGross1: () =>
        this.page.locator(
          "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[2]",
        ),
      getPartsGross2: () =>
        this.page.locator(
          "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[8]",
        ),
      getPartsExpense1: () =>
        this.page.locator(
          "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[11]/td[2]",
        ),
      getPartsExpense2: () =>
        this.page.locator(
          "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[11]/td[8]",
        ),
      getMainTab: () => this.page.locator(':nth-match(:text("Main"),1)'),
      getMainMIS: () => this.page.locator('text="MIS"'),
      getMainMIS1Standard: () =>
        this.page.locator(':nth-match(:text("MIS 1 (Standard)"),1)'),
      getPartsTab: () => this.page.locator("//li[4]/span[2]/span[1]"),
      getMISPartsRevenue1: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[84]/td[6]",
        ),
      getMISPartsRevenue2: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[84]/td[13]",
        ),
      getMISPartsGross1: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[87]/td[6]",
        ),
      getMISPartsGross2: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[87]/td[13]",
        ),
      getMISPartsExpense1: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[126]/td[6]",
        ),
      getMISPartsExpense2: () =>
        this.page.locator(
          "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[126]/td[13]",
        ),
    };
  }

  async goto() {
    await this.page.goto();
    await this.page.waitForLoadState("networkidle");
  }

  async NavigateToParts() {
    await this.checkElementVisibility("getParts");
    await this.clickElement("getParts");
    await this.clickElement("getPartsReport");
    await this.page.waitForLoadState("networkidle");
  }

  async SelectStores() {
    await this.clickElement("getMultiStore", 2);
    await this.clickElement("getAllStore");
    await this.clickElement("getAlaska");
    await this.clickElement("getSelect");
    await this.page.waitForLoadState("networkidle");
  }

  async ValidateData() {
    const revenue1 = await this.locators.getPartsRevenue1().innerText();
    const revenue2 = await this.locators.getPartsRevenue2().innerText();
    const gross1 = await this.locators.getPartsGross1().innerText();
    const gross2 = await this.locators.getPartsGross2().innerText();
    const expense1 = await this.locators.getPartsExpense1().innerText();
    const expense2 = await this.locators.getPartsExpense2().innerText();

    await this.clickElement("getMainTab");
    await this.clickElement("getMainMIS");
    await this.clickElement("getMainMIS1Standard");
    await this.page.waitForTimeout(5000);
    await this.clickElement("getPartsTab");
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);

    const revenue1MIS = await this.locators.getMISPartsRevenue1().innerText();
    const revenue2MIS = await this.locators.getMISPartsRevenue2().innerText();
    const gross1MIS = await this.locators.getMISPartsGross1().innerText();
    const gross2MIS = await this.locators.getMISPartsGross2().innerText();
    const expense1MIS = await this.locators.getMISPartsExpense1().innerText();
    const expense2MIS = await this.locators.getMISPartsExpense2().innerText();

    if (revenue1MIS !== revenue1) {
      console.log(
        "In Parts Report: The Parts Revenue doesn't match with MIS Standard for Current Month",
      );
    }
    if (revenue2MIS !== revenue2) {
      console.log(
        "In Parts Report: The Parts Revenue doesn't match with MIS Standard for Year To Date",
      );
    }
    if (gross1MIS !== gross1) {
      console.log(
        "In Parts Report: The Parts Gross doesn't match with MIS Standard for Current Month",
      );
    }
    if (gross2MIS !== gross2) {
      console.log(
        "In Parts Report: The Parts Gross doesn't match with MIS Standard for Year To Date",
      );
    }
    if (expense1MIS !== expense1) {
      console.log(
        "In Parts Report: The Total Parts Expense doesn't match with MIS Standard for Current Month",
      );
    }
    if (expense2MIS !== expense2) {
      console.log(
        "In Parts Report: The Total Parts Expense doesn't match with MIS Standard for Year To Date",
      );
    }
  }

  // common test methods

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

  async clickElement(locatorName, nth = 0) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().nth(nth);
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = { MainStore };
