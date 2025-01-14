const { expect } = require("@playwright/test");

class InventoryWidget {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  static locators = {
    storeSelector: (page) =>
      page.locator(
        'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      ),
    allSelector: (page) => page.locator(".allSelectorIndicator"),
    selectButton: (page) => page.locator("#storeSelector >> text=Select"),
    nevada: (page) =>
      page.locator(
        "text=NEVADA[+]ABC HyundaiCentennial HyundaiDesert CDJRHenderson HyundaiLas Vegas CDRL",
      ),
    centinnialhyundai: (page) =>
      page.locator('label:has-text("Centennial Hyundai")'),
    michigan: (page) => page.locator("text=MICHIGAN"),
    farmingtonCDJR: (page) =>
      page.locator('label:has-text("Farmington Hills CDJR")'),
    newTotalLink: (page) => page.locator("#newTotalLink >> text=Total:"),
    usedTotalLink: (page) => page.locator("#usedTotalLink >> text=Total:"),
    newTotal: (page) =>
      page.locator("//div[1]/table[3]/tbody[1]/tr[3]/td[3]/span[1]"),
    usedTotal: (page) =>
      page.locator("//div[1]/table[7]/tbody[1]/tr[3]/td[3]/span[1]"),
    nvi6074Total: (page) =>
      page.locator("//table[5]/tbody[1]/tr[1]/td[3]/span[1]"),
    nvi75Total: (page) =>
      page.locator("//div[1]/table[1]/tbody[1]/tr[2]/td[3]/span[1]"),
    uvi6074Total: (page) =>
      page.locator("//div[1]/table[5]/tbody[1]/tr[1]/td[3]/span[1]"),
    uvi75Total: (page) =>
      page.locator("//div[1]/table[5]/tbody[1]/tr[2]/td[3]/span[1]"),
  };

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  async checkElementVisibility(locator) {
    await this.page.waitForLoadState("networkidle");
    const element = locator(this.page);

    try {
      await expect(element.first()).toBeVisible();
    } catch (error) {
      throw new Error(`Locator failed: ${error.message}`);
    }
  }

  async clickElement(locator) {
    const element = locator(this.page);

    try {
      await element.first().click();
    } catch (error) {
      throw new Error(`Clicking on locator failed: ${error.message}`);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = InventoryWidget.locators[key];
      if (locatorFunction) {
        await locatorFunction(this.page).fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async selectStore(storeName) {
    await this.page.waitForTimeout(5000);
    this.page.locator(`div:has-text("${storeName}")`).nth(2).click();
    await InventoryWidget.locators.allSelector(this.page).click();
    await InventoryWidget.locators.allSelector(this.page).click();

    if (storeName === "FarmingtonCDJR") {
      await InventoryWidget.locators.michigan(this.page).click();
      await InventoryWidget.locators.farmingtonCDJR(this.page).click();
    } else if (storeName === "CentinnialStore") {
      await InventoryWidget.locators.nevada(this.page).click();
      await InventoryWidget.locators.centinnialhyundai(this.page).click();
    }

    await InventoryWidget.locators.selectButton(this.page).click();
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("#displayTotal").check();
  }

  async validateUnits(totalLocator, totalLinkLocator) {
    await this.page.waitForLoadState("load");
    const totalText = await totalLocator(this.page).innerText();
    const totalUnits = parseInt(totalText.slice(1, -6));
    const [page2] = await Promise.all([
      this.page.waitForEvent("popup"),
      totalLinkLocator(this.page).click(),
    ]);
    await page2.waitForLoadState("networkidle");
    await page2.locator("//span[1]/span[1]/span[1]/span[2]/span[1]").click();
    await page2.locator('li[role="option"]:has-text("500")').click();
    const rowCount = (await page2.locator("tr").count()) - 1;

    if (rowCount !== totalUnits) {
      console.log(`Units count mismatch for ${totalLinkLocator}`);
      console.log(`Dashboard count: ${totalUnits}`);
      console.log(`Detail page count: ${rowCount}`);
    }

    await this.page.bringToFront();
  }

  async validateAllUnits() {
    await this.validateUnits(
      InventoryWidget.locators.nvi6074Total,
      InventoryWidget.locators.newTotalLink,
    );
    await this.validateUnits(
      InventoryWidget.locators.nvi75Total,
      InventoryWidget.locators.newTotalLink,
    );
    await this.validateUnits(
      InventoryWidget.locators.uvi6074Total,
      InventoryWidget.locators.usedTotalLink,
    );
    await this.validateUnits(
      InventoryWidget.locators.uvi75Total,
      InventoryWidget.locators.usedTotalLink,
    );
    await this.validateUnits(
      InventoryWidget.locators.newTotal,
      InventoryWidget.locators.newTotalLink,
    );
    await this.validateUnits(
      InventoryWidget.locators.usedTotal,
      InventoryWidget.locators.usedTotalLink,
    );
  }
}

module.exports = { InventoryWidget };
