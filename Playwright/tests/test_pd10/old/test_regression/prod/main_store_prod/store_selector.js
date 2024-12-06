// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllSelector = page.locator(".allSelectorIndicator");
    this.getGVpSelector = page.locator(
      "text=Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERLDTLADAYPRESTIGEC >> select",
    );
    this.getMichaelCavanaugh = page.locator(
      "text=Michael Cavanaugh[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn A >> div",
    );
    this.getTimMuzyka = page.locator(
      "text=Tim Muzyka[+]Downtown LA AudiDowntown LA FordDowntown LA InfinitiDowntown LA Mer >> div",
    );
    this.getKennethColson = page.locator(
      "text=Kenneth Colson[+]Carson NissanFontana HondaMission Valley HondaRiverside SubaruS >> div",
    );
  }
  async ValidateStore() {
    await this.getStoreSelector.nth(2).click();
    await this.getGVpSelector.selectOption("2");
    await this.getAllSelector.click();
    await this.getAllSelector.click();
    await this.getMichaelCavanaugh.nth(2).click();
    await this.page
      .locator('label:has-text("Farmington Hills Volkswagen")')
      .click();
    await this.page.locator('label:has-text("Farmington Hills Mazda")').click();
    await this.page
      .locator('label:has-text("Farmington Hills Porsche")')
      .click();
    await this.getTimMuzyka.nth(2).click();
    await this.page
      .locator('label:has-text("Downtown LA Mercedes-Benz")')
      .click();
    await this.page.locator('label:has-text("Downtown LA Volkswagen")').click();
    await this.page.locator('label:has-text("Downtown LA Audi")').click();
    await this.page.locator('label:has-text("Downtown LA Porsche")').click();
    await this.page.locator('label:has-text("Downtown LA Toyota")').click();
    await this.page.locator('label:has-text("Downtown LA Nissan")').click();
    await this.page.locator('label:has-text("Sherman Oaks Audi")').click();
    await this.getKennethColson.nth(2).click();
    await this.page.locator('label:has-text("Carson Nissan")').click();
    await this.page.locator('label:has-text("Fontana Honda")').click();
    await this.page.locator('label:has-text("Temecula Honda")').click();
    await this.page.locator('label:has-text("Temecula Kia")').click();
    await this.page.locator('label:has-text("Mission Valley Honda")').click();
    await this.page.locator('label:has-text("Riverside Subaru")').click();
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto("https://speuat.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  // Login
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
}
module.exports = { MainStore };
