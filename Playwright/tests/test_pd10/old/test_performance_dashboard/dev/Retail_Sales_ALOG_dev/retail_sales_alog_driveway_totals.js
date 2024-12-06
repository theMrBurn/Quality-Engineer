// this POM is for /Payroll
const { expect } = require("@playwright/test");

class RetailSalesAlog {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesLog = page.locator(':nth-match(:text("Sales Log"),1)');
    this.getRetailSalesAlog = page.locator(
      ':nth-match(:text("Retail Sales Log (ALOG)"),1)',
    );
    this.getDrivewaySalesLog = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/ul[1]/li[2]/span[2]",
    );
    this.getTotals = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getTotalNewVehicles = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]",
    );
    this.getTotalUsedVehicles = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[7]",
    );
    this.getDetailTotals = page.locator('span[class="k-pager-info k-label"]');
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
  async NavigateToSalesRetailSalesLogALOG() {
    await this.getSalesTab.click();
    await this.getSalesLog.click();
    await this.getRetailSalesAlog.click();
    await this.page.waitForLoadState("networkidle");
    await this.getDrivewaySalesLog.click();
    await this.page.waitForLoadState("networkidle");
  }
  //Methods ot verify if the total number of vehicles in Driveway Sales LOg report between summary and detail pages.
  async VerifyTotalVehicle() {
    const a = await this.getTotalNewVehicles.innerText();
    const array = a.replace(",", "");
    const newtotalvehicle = parseInt(array);
    const b = await this.getTotalUsedVehicles.innerText();
    const array2 = b.replace(",", "");
    const usedtotalvehicle = parseInt(array2);
    const sum = newtotalvehicle + usedtotalvehicle;
    await this.getTotals.click();
    await this.page.waitForLoadState("networkidle");
    const c = await this.getDetailTotals.innerText();
    const array3 = c.replace("1 - 100 of ", "");
    const array4 = array3.replace(" items", "");
    const detailtotal = parseInt(array4);
    if (sum == detailtotal) console.log("Retail Sales ALog Total Match");
    else console.log("Retail Sales ALog Total Mismatch");
  }
}
module.exports = { RetailSalesAlog };
