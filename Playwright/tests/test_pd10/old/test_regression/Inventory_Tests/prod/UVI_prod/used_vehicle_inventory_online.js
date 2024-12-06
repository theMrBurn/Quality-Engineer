// this POM is for /Payroll
const { expect } = require("@playwright/test");

class UsedVehicleInventory {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesUsedVehicle = page.locator(
      ':nth-match(:text("Used Vehicle"),1)',
    );
    this.getSalesUsedInventoryDetail = page.locator(
      'text="Used Inventory Detail"',
    );
    this.getUsedInventorySummaryTotals = page.locator('text="Totals"');
    this.getUsedInventoryOnline = page.locator('text="Online"');
    this.getUsedInventoryVehicleOnlineTotalsCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/a[1]",
    );
    this.getUsedInventoryVehicleOnlineTotalsCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI0PicsTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]/a[1]",
    );
    this.getUVI0PicsTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI19PicsTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]",
    );
    this.getUVI19PicsTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI1021PicsTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[5]/a[1]",
    );
    this.getUVI1021PicsTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI21PicsTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/a[1]",
    );
    this.getUVI21PicsTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
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
  async NavigateToSalesUsedInventoryDetail() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(7000);
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedInventoryDetail.first().click();
    await this.getUsedInventoryOnline.click();
    await this.page.waitForLoadState("networkidle");
  }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
  async VerifyTotalVehicleOnlineCount() {
    const a = await this.getUsedInventoryVehicleOnlineTotalsCount1.innerText();
    const array = a.replace(",", "");
    await this.getUsedInventoryVehicleOnlineTotalsCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUsedInventoryVehicleOnlineTotalsCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array == array3) console.log("Online Count Totals  Match");
    else console.log("Online Count Totals  Mismatch");
  }
  async VerifyTotalVehicle0Pics() {
    const a = await this.getUVI0PicsTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI0PicsTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI0PicsTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array == array3) console.log("Online Count Totals iN 0 Pics Match");
    else console.log("Online Count Totals in 0 Pics Mismatch");
  }
  async VerifyTotalVehicle19Pics() {
    const a = await this.getUVI19PicsTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI19PicsTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI19PicsTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array == array3) console.log("Online Count 1 - 9 ( Pics) Totals match");
    else console.log("Online Count 1 - 9 ( Pics) Totals match");
  }
  async VerifyTotalVehicle1021Pics() {
    const a = await this.getUVI1021PicsTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI1021PicsTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI1021PicsTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array == array3) console.log("Online count 10-21 Pics Totals match");
    else console.log("Online Count 10-21 Pics Totals match");
  }
  async VerifyTotalVehicle21Pics() {
    const a = await this.getUVI21PicsTotalCount1.innerText();
    const array = a.replace(",", "");
    console.log(array);
    await this.getUVI21PicsTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI21PicsTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array == array3) console.log("Online count 21+ Pics Totals match");
    else console.log("Online count 21+ Pics Totals match");
  }
}
module.exports = { UsedVehicleInventory };
