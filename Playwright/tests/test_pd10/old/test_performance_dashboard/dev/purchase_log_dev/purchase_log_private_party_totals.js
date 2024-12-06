// this POM is for /Payroll
const { expect } = require("@playwright/test");

class PurchaseLog {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesPurchaseLogTradeIn = page.locator(
      ':nth-match(:text("Purchase Log / Trade-In"),1)',
    );
    this.getSalesUsedVehicle = page.locator(
      ':nth-match(:text("Used Vehicle"),1)',
    );
    this.getPrivatePartyTab = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/ul[1]/li[2]/span[2]/span[1]",
    );
    this.getTotalColumn = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]",
    );
    this.getTotalCentralizedVehicleProcurement = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getTotalCVP = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]",
    );
    this.getTotalDriveway = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getTotalPrivateParty = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]",
    );
    this.getTotalDetail = page.locator('span[class="k-pager-info k-label"]');
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
  async NavigateToSalesPurchaseLogTradeIn() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesPurchaseLogTradeIn.click();
    await this.getPrivatePartyTab.click();
    await this.page.waitForLoadState("networkidle");
  }
  //commented code will be reused later.
  async VerifyTotalVehicleTotal() {
    const a = await this.getTotalColumn.innerText();
    //const array = a.replace(',','');
    const totalcolumn = parseInt(a);
    //const b =await this.getTotalCentralizedVehicleProcurement.innerText();
    //const bucket1=parseInt(b);
    //const c =await this.getTotalCVP.innerText();
    //const bucket2=parseInt(c);
    const d = await this.getTotalDriveway.innerText();
    const bucket3 = parseInt(d);
    const e = await this.getTotalPrivateParty.innerText();
    //const array5=e.replace(',','');
    const bucket4 = parseInt(e);
    //const sum=bucket1+bucket2+bucket3+bucket4;
    const sum = bucket3 + bucket4;
    if (totalcolumn == sum)
      console.log(
        "Purchase Log - Private Party - Totals match between data buckets",
      );
    else
      console.log(
        "Purchase Log - Private Party - Totals mismatch between data buckets",
      );
  }
}
module.exports = { PurchaseLog };
