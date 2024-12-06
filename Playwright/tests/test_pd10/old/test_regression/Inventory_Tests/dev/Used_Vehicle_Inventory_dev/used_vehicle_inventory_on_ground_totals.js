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
      ':nth-match(:text("Used Inventory Detail"),1)',
    );
    this.getUsedInventorySummaryTotals = page.locator('text="Totals"');
    this.getUsedInventoryVehicleTotalsCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/a[1]",
    );
    this.getUsedInventoryVehicleTotalsCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI015DaysTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]",
    );
    this.getUVI015DaysTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI1630DaysTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/a[1]",
    );
    this.getUVI1630DaysTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI3145DaysTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]/a[1]",
    );
    this.getUVI3145DaysTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI4660DaysTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/a[1]",
    );
    this.getUVI4660DaysTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI6175DaysTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[12]/a[1]",
    );
    this.getUVI6175DaysTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVI76DaysTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[14]/a[1]",
    );
    this.getUVI76DaysTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getUVITotalTotalCount1 = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[16]/a[1]",
    );
    this.getUVITotalTotalCount2 = page.locator(
      'span[class="k-pager-info k-label"]',
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
  async NavigateToSalesUsedInventoryDetail() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedInventoryDetail.click();
    await this.page.waitForLoadState("networkidle");
  }
  //To Check if DaysSupply field has value on it
  async ValidateDaySupply() {
    const BeforeDSXpath =
      "//*[@id='OnGroundAgingTable']/div[3]/table[1]/tbody[1]/tr[";
    const AfterDSXpath = "]/td[15]";
    let a = await this.page.locator("tr").count();
    for (let i = 1; i < a - 3; i++) {
      let ActualDSXpath = BeforeDSXpath + i + AfterDSXpath;
      expect(this.page.locator(ActualDSXpath)).toBeTruthy();
    }
  }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
  async VerifyTotalVehicleInTransit() {
    const a = await this.getUsedInventoryVehicleTotalsCount1.innerText();
    const array = a.replace(",", "");
    await this.getUsedInventoryVehicleTotalsCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUsedInventoryVehicleTotalsCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array != array3) {
      console.log("On - Ground Aging Totals in In-transit Mismatch");
    }
  }
  async VerifyTotalVehicle015Days() {
    const a = await this.getUVI015DaysTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI015DaysTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI015DaysTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array != array3) {
      console.log("On Ground - Aging Totals in 0-15 Days Mismatch");
    }
  }
  async VerifyTotalVehicle1630Days() {
    const a = await this.getUVI1630DaysTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI1630DaysTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI1630DaysTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array != array3) {
      console.log("On - Ground 16 - 30 Days Totals mismatch");
    }
  }
  async VerifyTotalVehicle3145Days() {
    const a = await this.getUVI3145DaysTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI3145DaysTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI3145DaysTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array != array3) {
      console.log("On - Ground 31 - 45 Days Totals mismatch");
    }
  }
  async VerifyTotalVehicle4660Days() {
    const a = await this.getUVI4660DaysTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI4660DaysTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI4660DaysTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array != array3) {
      console.log("On - Ground 46 - 60 Days Totals mismatch");
    }
  }
  async VerifyTotalVehicle6175Days() {
    const a = await this.getUVI6175DaysTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI6175DaysTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI6175DaysTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array != array3) {
      console.log("On - Ground 61 - 75 Days Totals mismatch");
    }
  }
  async VerifyTotalVehicle76Days() {
    const a = await this.getUVI76DaysTotalCount1.innerText();
    const array = a.replace(",", "");
    await this.getUVI76DaysTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getUVI76DaysTotalCount2.innerText();
    const array2 = b.replace("1 - 100 of ", "");
    const array3 = array2.replace(" items", "");
    if (array != array3) {
      console.log("On - Ground 76+ Days Totals mismatch");
    }
  }
  async VerifyTotalVehicleTotal() {
    const a = await this.getUVITotalTotalCount1.innerText();
    const array = a.replace(",", "");
    const bucket1 = parseInt(array);
    const b = await this.getUVI015DaysTotalCount1.innerText();
    const array2 = b.replace(",", "");
    const bucket2 = parseInt(array2);
    const c = await this.getUVI1630DaysTotalCount1.innerText();
    const array3 = c.replace(",", "");
    const bucket3 = parseInt(array3);
    const d = await this.getUVI3145DaysTotalCount1.innerText();
    const array4 = d.replace(",", "");
    const bucket4 = parseInt(array4);
    const e = await this.getUVI4660DaysTotalCount1.innerText();
    const array5 = e.replace(",", "");
    const bucket5 = parseInt(array5);
    const f = await this.getUVI6175DaysTotalCount1.innerText();
    const array6 = f.replace(",", "");
    const bucket6 = parseInt(array6);
    const g = await this.getUVI6175DaysTotalCount1.innerText();
    const array7 = g.replace(",", "");
    const bucket7 = parseInt(array7);
    const sum = bucket2 + bucket3 + bucket4 + bucket5 + bucket6 + bucket7;
    if (bucket1 != sum) {
      console.log("On - Ground - Total Totals mismatch");
    }
  }
  async verifyTotalBetWeenSummaryandDetailPage() {
    const b = await this.getUVI015DaysTotalCount1.innerText();
    const array2 = b.replace(",", "");
    const bucket1 = parseInt(array2);
    const c = await this.getUVI1630DaysTotalCount1.innerText();
    const array3 = c.replace(",", "");
    const bucket2 = parseInt(array3);
    const d = await this.getUVI3145DaysTotalCount1.innerText();
    const array4 = d.replace(",", "");
    const bucket3 = parseInt(array4);
    const e = await this.getUVI4660DaysTotalCount1.innerText();
    const array5 = e.replace(",", "");
    const bucket4 = parseInt(array5);
    const f = await this.getUVI6175DaysTotalCount1.innerText();
    const array6 = f.replace(",", "");
    const bucket6 = parseInt(array6);
    const g = await this.getUVI76DaysTotalCount1.innerText();
    const array7 = g.replace(",", "");
    const bucket7 = parseInt(array7);
    const h = await this.getUsedInventoryVehicleTotalsCount1.innerText();
    const array8 = h.replace(",", "");
    const bucket8 = parseInt(array8);
    const sum = bucket1 + bucket2 + bucket3 + bucket4 + bucket6 + bucket7;
    await this.getUVITotalTotalCount1.click();
    await this.page.waitForLoadState("networkidle");
    const a = await this.getUVITotalTotalCount2.innerText();
    const array = a.replace("1 - 100 of ", "");
    const array9 = array.replace(" items", "");
    const tTotal = parseInt(array9);
    if (tTotal != sum) {
      console.log("On - Ground - Total Totals mismatch");
    }
  }
}
module.exports = { UsedVehicleInventory };
