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
    //Main Tb
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainMIS1Standard = page.locator(
      ':nth-match(:text("MIS 1 (Standard)"),1)',
    );
    this.getMainMISComparison = page.locator(
      ':nth-match(:text("MIS Comparison"),1)',
    );
    this.getStoreSelector = page.locator('//*[@id="misStoreSelect"]/div[1]');
    this.getSelectStore1 = page.locator("text=FLORIDA[+] >> div");
    this.getSelectStore2 = page.locator("text=ARIZONA[+] >> div");
    this.getSelectStoresBUtton = page.locator("#js-mask");
    this.getDepartment = page.locator(
      "//*[@id='main_section']/div/div/span/span/span[2]",
    );
    this.get3MonthRolling = page.locator(
      "//*[@id='departments_listbox']/li[2]",
    );
    this.getSubmit = page.locator('//input[contains(@value, "Submit")]');
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
    await this.getSelectStore1.first().click();
    await this.getSelectStoresBUtton.click();
    await this.page.waitForTimeout(2000);
    await this.getSubmit.click();
    await this.page.waitForTimeout(5000);
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto(
      "https://speuat.lithiainc.com/Main/Storecomparisonnewversion",
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
  async ValidateGMRule() {
    await this.page.waitForTimeout(7000);
    for (var i = 3; i < 13; i++) {
      const beforeXpath = "#row1 > td:nth-child(";
      const AfterXpath = ")";
      var actualXpath = beforeXpath + i + AfterXpath;
      await this.page.waitForTimeout(2000);
      var a = await this.page.locator(actualXpath).innerText();
      if (a == "") console.log(" GM field is empty in MIS Comparison Report");
    }
  }
}
module.exports = { MainStore };
