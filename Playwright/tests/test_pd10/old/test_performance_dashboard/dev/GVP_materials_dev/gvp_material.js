// this POM is for /Payroll
const { expect } = require("@playwright/test");

class gvp {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getgvpmaterial = page.locator(':nth-match(:text("GVP Materials"),1)');
    this.getPayrollRegional = page.locator(
      ':nth-match(:text("Payroll - Regional"),1)',
    );
    this.getPP = page.locator('text="Payroll Opportunities"');
    this.getBanner = page.locator(
      "//body/div[1]/main[1]/div[1]/section[1]/div[3]",
    );
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
  async Validate() {
    await this.getgvpmaterial.click();
    await expect(this.getPP).not.toBeVisible();
    await this.getPayrollRegional.click();
  }
}
module.exports = { gvp };
