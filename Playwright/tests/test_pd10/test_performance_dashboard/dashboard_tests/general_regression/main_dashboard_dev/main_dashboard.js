// this POM is for /Payroll
const { expect } = require("@playwright/test");

class InventoryWidget {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getGoBUtton = page.locator('text="GO"');
    this.getTotalRows = page.locator("tr");
    this.getTexas = page.locator("text=TEXAS");
    this.getBryanCJDFiat = page.locator('label:has-text("Bryan CJD Fiat")');
  }
  async SelectBryanCJDFiat() {
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getTexas.click();
    await this.getBryanCJDFiat.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async goto() {
    await this.page.goto();
    await this.page.waitForLoadState("networkidle");
  }

  async ValidatefilteredUnits() {
    await this.page.waitForTimeout(7000);
    const a = await this.page
      .locator(
        "//body/div[1]/main[1]/div[2]/section[1]/article[1]/div[1]/div[3]/article[1]/table[1]/tbody[1]/tr[2]/td[2]",
      )
      .innerText();
    const b = await this.page
      .locator(
        "//body/div[1]/main[1]/div[2]/section[1]/article[1]/div[1]/div[3]/article[1]/table[1]/tbody[1]/tr[1]/td[2]",
      )
      .innerText();
    if (a > b) {
      console.log(
        "For Bryan CJD Store , the filtered picture count is bigger than the total online units for used inventory." +
          a +
          ":" +
          b,
      );
    }
    // expect(this.page.locator("//*[@id='newOnline']/table[1]/tbody[1]/tr[1]/td[1]")).toHaveText("Vehicles Online - Driveway");
    expect(
      this.page.locator("//*[@id='oldOnline']/table[1]/tbody[1]/tr[1]/td[1]"),
    ).toHaveText("Vehicles Online - Driveway");
    const c = await this.page
      .locator("//*[@id='newOnline']/table[1]/tbody[1]/tr[2]/td[2]")
      .innerText();
    const d = await this.page
      .locator("//*[@id='newOnline']/table[1]/tbody[1]/tr[1]/td[2]")
      .innerText();
    if (c > d) {
      console.log(
        "For Bryan CJD Store , the filtered picture count is bigger than the total online units for New Inventories ." +
          a +
          ":" +
          b,
      );
    }
  }
}
module.exports = { InventoryWidget };
