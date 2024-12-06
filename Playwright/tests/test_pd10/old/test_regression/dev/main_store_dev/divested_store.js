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
    this.getSantaRosaCJD = page.locator("text=Santa Rosa CJD");
    this.getRosevilleChev = page.locator(
      ':nth-match(:text("Roseville Chevrolet"),1)',
    );
    this.getGardenaHonda = page.locator("text=Gardena Honda");
    this.getEurekaCJD = page.locator("text=Eureka CJD");
    this.getAbileneHonda = page.locator('label:has-text("Abilene Honda")');
    this.getTwinFallsChev = page.locator("text=Twin Falls Chevrolet");
    this.getGrandForksToyota = page.locator("text=Grand Forks Toyota");
    this.getMiamiMitsubishi = page.locator("text=Miami Mitsubishi");
    this.getCalifornia = page.locator("text=CALIFORNIA");
    this.getTexas = page.locator("text=TEXAS >> nth=0");
    this.getFlorida = page.locator("text=FLORIDA");
    this.getNorthDakota = page.locator("text=NORTH DAKOTA");
    this.getIdaho = page.locator("text=IDAHO >> nth=0");
  }
  async ValidateDivestedStore() {
    await this.getStoreSelector.nth(2).click();
    await this.getCalifornia.click();
    await expect(this.getSantaRosaCJD).not.toBeChecked();
    await expect(this.getRosevilleChev).not.toBeChecked();
    await expect(this.getGardenaHonda).not.toBeChecked();
    await expect(this.getEurekaCJD).not.toBeChecked();
    await this.getFlorida.click();
    await expect(this.getMiamiMitsubishi).not.toBeChecked();
    await this.getIdaho.click();
    await expect(this.getTwinFallsChev).not.toBeChecked();
    await this.getNorthDakota.click();
    await expect(this.getGrandForksToyota).not.toBeChecked();
    await this.getTexas.click();
    await expect(this.getAbileneHonda).not.toBeVisible();
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
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
