// this POM is for /Payroll
const { expect } = require("@playwright/test");

class NewStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getMultiStore = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllStores = page.locator(".allSelectorIndicator");
    this.getCanada = page.locator(
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A",
    );
    this.getThornHill = page.locator("#CANADA81");
    this.getThornhillReportName = page.locator(
      'h2:has-text("Thornhill Acura")',
    );
    this.getStoreSelector = page.locator("#storeSelector >> text=Select");
  }
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  async login() {
    await this.getUsername.click();
    await this.page.fill('input[id="i0116"]', "t_PerfDash_01@lithia.com"); //username
    await this.page.locator("id=idSIButton9").click();
    await this.getPassword.click();
    await this.page.fill(
      'input[name="passwd"]',
      "GkCow**!#w#)4E#Sj3Rb8KS*TkGduz",
    ); //pwd
    await this.page.click("text=Sign In");
  }
  async twostepauthlogin() {
    await this.page.click("id=KmsiCheckboxField");
    await this.page.click("id=idSIButton9");
  }
  async StoreSelector() {
    await this.page.waitForLoadState("networkidle");
    await this.getMultiStore.nth(2).click();
    await this.getAllStores.click();
    await this.getAllStores.click();
    await this.getCanada.click();
    await this.getThornHill.check();
    await this.getThornHill.check();
    await this.getStoreSelector.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getThornhillReportName).toBeVisible();
  }
}
module.exports = { NewStore };
