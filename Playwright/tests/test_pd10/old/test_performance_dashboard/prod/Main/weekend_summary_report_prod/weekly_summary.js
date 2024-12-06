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
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesWeekendMonthEndSummary = page.locator(
      ':nth-match(:text("Weekend/Month End Summary"),1)',
    );
    this.getSalesViewReports = page.locator(
      ':nth-match(:text("View Reports"),1)',
    );
    this.getSalesWeekendSummary = page.locator(
      ':nth-match(:text("Weekend Summary"),1)',
    );
    this.getBaierlTotal = page.locator("text='Baierl Total'");
    this.getCarboneTotal = page.locator("text='Carbone Total'");
    this.getDTLATotal = page.locator("text=DTLA Total");
    this.getLithiaTotal = page.locator("text=Lithia Total");
    this.getPFaffTotal = page.locator("text=PFAFF CDK Total");
    this.getPfaffDvTotal = page.locator("text=PFAFF DV Total");
    this.getHawaiinTotal = page.locator("text=Hawaii Total");
  }
  async NavigateToSalesWeekendSummary() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesWeekendMonthEndSummary.click();
    await this.getSalesViewReports.click();
    await this.getSalesWeekendSummary.click();
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
  async ValidateGroupName() {
    expect(this.getBaierlTotal).not.toBeVisible();
    expect(this.getCarboneTotal).not.toBeVisible();
    expect(this.getDTLATotal).not.toBeVisible();
    expect(this.getHawaiinTotal).not.toBeVisible();
    expect(this.getLithiaTotal).not.toBeVisible();
    expect(this.getPfaffDvTotal).not.toBeVisible();
    expect(this.getPFaffTotal).not.toBeVisible();
  }
}
module.exports = { MainStore };
