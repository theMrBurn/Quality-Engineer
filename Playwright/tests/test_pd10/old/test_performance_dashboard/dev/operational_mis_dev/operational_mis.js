// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainOperationalMIS = page.locator(
      ':nth-match(:text("Operational MIS"),1)',
    );
  }
  //Navigate to Main Tab/ Performace Dashboard Report
  async NavigateToMainOperationalMIS() {
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainOperationalMIS.click();
    await this.page.waitForLoadState("networkidle");
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
  async ValidateDownloadAAChevyCadillac() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR CHEVROLET CADILLAC")').click(),
    ]);
  }
  async ValidateDownloadAACDJR() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR CDJR")').click(),
    ]);
  }
  async ValidateDownloadAACDJR() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR CDJR")').click(),
    ]);
  }
  async ValidateDownloadAABMW() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR BMW")').click(),
    ]);
  }
  async ValidateDownloadAAMerc() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR MERCEDES-BENZ")').click(),
    ]);
  }
  async ValidateDownloadGardenCityCDJR() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("GARDEN CITY CDJR")').click(),
    ]);
  }
}
module.exports = { MainStore };
