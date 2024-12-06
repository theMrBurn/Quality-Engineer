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
    this.getMainAnnualOperatingPlan = page.locator(
      ':nth-match(:text("Annual Operating Plan"),1)',
    );
    this.getDropdown = page.locator(
      '//*[@id="ctl00_ContentPlaceHolder1_qDDL"]/table/tbody/tr/td/input[1]',
    );
    this.getCurrentYear = page.locator('text="2023"');
  }
  //Navigate to Main Tab/ Performace Dashboard Report
  async NavigateToMainAnnualOperatingPlan() {
    await this.getMainTab.click();
    await this.getMainAnnualOperatingPlan.click();
    await this.page.waitForLoadState("networkidle");
    await this.getDropdown.click();
    await expect(this.getCurrentYear).toBeVisible();
    await this.getCurrentYear.click();
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
}
module.exports = { MainStore };
