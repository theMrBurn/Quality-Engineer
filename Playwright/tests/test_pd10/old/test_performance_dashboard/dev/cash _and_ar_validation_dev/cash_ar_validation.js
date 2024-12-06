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
    this.getOffice = page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeCashARValidation = page.locator(
      ':nth-match(:text("Cash & AR Validation"),1)',
    );
    this.getStoreReport = page.locator(
      '//*[@id="divSubMain"]/table[1]/tbody[1]/tr[1]/td[1]/a[1]',
    );
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
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToOfficeCashARValidation() {
    await this.page.waitForTimeout(5000);
    await this.page.goto("https://spedev.lithiainc.com/Sub/AR.aspx");
    await this.getStoreReport.click();
  }
}
module.exports = { MainStore };
