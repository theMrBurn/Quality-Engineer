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
    this.getAdmin = page.locator('text="Admin"');
    this.getAdminTrackingDashboard = page.locator('text=" Tracking Dashboard"');
    this.getEmployeeSearch = page.locator("//li[1]/div[1]/input[2]");
    this.getEmployeeSelect = page.locator("//li[1]/div[1]/ul[1]/li[1]");
    this.getImpersonate = page.locator(
      '//span[contains(@class, "impersonate")]',
    );
    this.getGVPTab = page.locator('text="GVP Materials"');
    this.getPayrollAndProductivity = page.locator(
      'text="Payroll and Productivity"',
    );
  }
  //Navigate to Main Tab/ Performace Dashboard Report
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  // get elements of all locators
  async NavigateToAdminEmployeeLookup() {
    await this.page.goto("https://spedev.lithiainc.com/Admin/EmployeeLookup");
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
  async impersonate() {
    await this.getEmployeeSearch.fill("Thomas Dobry");
    await this.page.keyboard.press("Enter");
    await this.getEmployeeSelect.click();
    await this.getImpersonate.click();
    await this.page.waitForLoadState("networkidle");
    await this.getGVPTab.click();
    await this.getPayrollAndProductivity.click();
  }
}
module.exports = { MainStore };
