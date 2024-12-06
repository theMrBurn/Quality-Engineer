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
    this.getOfficeTab = page.locator(':nth-match(:text("Office"),1)');
    this.getBDR = page.locator(':nth-match(:text("Bad Debt Reserve"),1)');
    this.getDTLaPorsche = page.locator(
      "//*[@id='ContentPlaceHolder1_divSubMain']/table[1]/tbody[1]/tr[1]/td[4]/a[1]",
    );
    this.getTampatFord = page.locator(
      "//*[@id='ContentPlaceHolder1_divSubMain']/table[1]/tbody[1]/tr[1]/td[11]/a[23]",
    );
    this.getExportToExcel = page.locator(
      "//*[@id='wrap']/main[1]/div[1]/div[1]/a[1]",
    );
  }
  //Navigate to Main Tab/ Performace Dashboard Report - Bad Debt Report
  async NavigateToBadDebtReserve() {
    await this.getOfficeTab.click();
    await this.getBDR.click();
    await this.page.waitForLoadState("networkidle");
    await this.getDTLaPorsche.click();
    await this.page.waitForLoadState("networkidle");
    await this.getExportToExcel.click();
    await this.page.goBack();
    await this.getTampatFord.click();
    await this.page.waitForLoadState("networkidle");
    await this.getExportToExcel.click();
    await this.page.goBack();
  }
  async goto() {
    await this.page.goto("https://speuat.lithiainc.com/main/store", {
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
