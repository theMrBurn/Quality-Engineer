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
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainMISComparison = page.locator(
      ':nth-match(:text("MIS Comparison"),2)',
    );
    this.getStoreSelector = page.locator('//*[@id="misStoreSelect"]/div[1]');
    this.getSelectStore1 = page.locator("text=ALABAMA[+] >> div");
    this.getSelectStore2 = page.locator("text=ALASKA[+] >> div");
    this.getSelectStore3 = page.locator("text=CALIFORNIA[+] >> div");
    this.getSelectStoresBUtton = page.locator("#js-mask");
    this.getSubmit = page.locator('//input[@value="Submit"]');
  }
  async NavigateToMainMISComparison() {
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMISComparison.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async SelectStoreToCompareReports() {
    await this.getStoreSelector.click();
    await this.getSelectStore2.first().click();
    await this.getSelectStore3.first().click();
    await this.getSelectStoresBUtton.click();
    await this.getSubmit.click();
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto(
      "https://spedev.lithiainc.com/Main/Storecomparisonnewversion",
      { timeout: 0 },
    );
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
