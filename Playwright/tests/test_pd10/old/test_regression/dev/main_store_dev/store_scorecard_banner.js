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
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getCasperFord = page.locator('label:has-text("Casper Ford")');
    this.getWyoming = page.locator("text=WYOMING");
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainMIS1Standard = page.locator(
      ':nth-match(:text("MIS 1 (Standard)"),1)',
    );
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainStorePerformanceDashboard = page.locator(
      ':nth-match(:text("Store Performance Dashboard"),1)',
    );
  }
  async ValidateTheBanner() {
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getWyoming.click();
    await this.getCasperFord.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getMainTab.click();
    await this.getMainStorePerformanceDashboard.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await expect(
      this.page.locator(
        'text="Store Performance Scorecard for January 2032 is available for your store"',
      ),
    ).not.toBeVisible();
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
