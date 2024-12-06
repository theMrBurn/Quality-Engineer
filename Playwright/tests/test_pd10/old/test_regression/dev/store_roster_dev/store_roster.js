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
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainStoreRosters = page.locator(
      ':nth-match(:text("Store Rosters"),1)',
    );
    this.getMainStoreRosters2 = page.locator(
      ':nth-match(:text("Store Rosters"),2)',
    );
  }
  async NavigateToMainStoreRosters() {
    await this.getMainTab.click();
    await this.getMainStoreRosters.click();
    await this.getMainStoreRosters2.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
    await this.page.locator("text=SHERMAN OAKS BMW").click();
    await this.page.waitForLoadState("networkidle");
  }
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
  async ValidateMoonTownshipData() {
    await this.getMainTab.click();
    await this.getMainStoreRosters.click();
    await this.getMainStoreRosters2.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("text=MOON TOWNSHIP SUBARU").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.page.locator("text=Brian Wilkinson").click();
    await this.page.locator("text=Maureen Bailey").click();
    await this.page.locator("text=Robert Turzillo").click();
    await this.page.locator("text=Anthony Vincent").click();
    await this.page.locator("text=James Azzaro").click();
    await this.page.locator("text=James Lasky").click();
    await this.page.locator("text=Chateisha Jones-Mossett").click();
    await this.page.locator("text=June Saulen").click();
    await this.page.locator("text=Brandon Koishal").click();
    await this.page.locator("text=Christopher Tressler").click();
    await this.page.locator("text=David Ganser").click();
    await this.page.locator("text=Ernesto Ahumada").click();
    await this.page.locator("text=Isaac McHirella").click();
    await this.page.locator("text=Jonathan Shotter").click();
    await this.page.locator("text=Joseph Birmingham").click();
    await this.page.locator("text=Matthew Tate").click();
    await this.page.locator("text=Michael Smith").click();
    await this.page.locator("text=Richard Donaldson").click();
    await this.page.locator("text=Ryan Bartolomeo").click();
    await this.page.locator("text=Scott Kime").click();
    await this.page.locator("text=William Bacon").click();
    await this.page.locator("text=Niko Santarelli").click();
  }
}
module.exports = { MainStore };
