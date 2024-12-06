// this POM is for /Payroll
const { expect } = require("@playwright/test");

class TitleTracking {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getOfficeTab = page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeTitleTracking = page.locator(
      ':nth-match(:text("Title Tracking Report"),1)',
    );
    this.getTotalNoTitle = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[13]",
    );
    this.getTotal015Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[5]",
    );
    this.getTotal1630Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[7]",
    );
    this.getTotal3160Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[9]",
    );
    this.getTotal61Days = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[11]",
    );
    this.getRadioUsedInv = page.locator('#radioGroup span:has-text("Used")');
    this.getRadioAll = page.locator('#radioGroup span:has-text("All")');
    this.getRadioNewInv = page.locator('#radioGroup span:has-text("New")');
    this.getCurrentInv = page.locator(':nth-match(:text("Current Inv"),1)');
    this.getStore = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getStoreNV = page.locator(
      'xpath=//*[@id="CurInvTitleTrackingTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[13]',
    );
    this.getStoreReceivedNV = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getStoreTotalNVDetail = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.getTotal = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getTotalReceived = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getDetailPageTotal = page.locator(
      'span[class="k-pager-info k-label"]',
    );
    this.get015DaysPercentage = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]",
    );
    this.get1630DaysPercentage = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]",
    );
    this.get3160DaysPErcentage = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]",
    );
    this.get61DaysPercentage = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[12]",
    );
    this.getTotalPercentage = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[14]",
    );
    this.getExportToExcel = page.locator(
      '//*[@id="CurInvTitleTrackingTable"]/div/a[6]',
    );
    this.getExportToPDF = page.locator(':nth-match(:text("Export to PDF"),3)');
    this.getExportToExcelDetail = page.locator(
      ':nth-match(:text("Export to Excel"),1)',
    );
    this.getExportToPDFDetail = page.locator(
      ':nth-match(:text("Export to PDF"),1)',
    );
    this.getTitleStatus = page.locator(
      "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[5]",
    );
    this.getDaysToReceive = page.locator(
      "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[6]",
    );
    this.getpage = page.locator(
      "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[4]",
    );
    this.getTitleIssue = page.locator(':nth-match(:text("Title Issue"),1)');
  }
  async goto() {
    await this.page.goto(
      "https://spedev.lithiainc.com/Reports/TitleTrackingSummary",
      { timeout: 0 },
    );
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
  async NavigateToOfficeTitleTracking() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    await this.getOfficeTab.click();
    await this.getOfficeTitleTracking.click();
    await this.getCurrentInv.click();
  }
  async LoadAllInventory() {
    await this.getCurrentInv.click();
    await this.getRadioAll.click();
    await this.page.waitForTimeout(20000);
  }
  async LoadUsedInv() {
    await this.getCurrentInv.click();
    await this.getRadioUsedInv.click();
    await this.page.waitForTimeout(20000);
  }
  async LoadNewInv() {
    await this.getCurrentInv.click();
    await this.getRadioNewInv.click();
    await this.page.waitForTimeout(20000);
  }
  async ValidateTotalslink() {
    const a = await this.getTotalReceived.innerText();
    const array1 = a.replace(",", "");
    const bucket1 = parseInt(array1);
    const b = await this.getTotalNoTitle.innerText();
    const array2 = b.replace(",", "");
    const bucket2 = parseInt(array2);
    const sum = bucket1 + bucket2;
    await this.getTotal.click();
    await this.page.waitForLoadState("networkidle");
    const c = await this.getDetailPageTotal.innerText();
    const array5 = c.replace("1 - 100 of ", "");
    const array4 = array5.replace(" items", "");
    const sum1 = parseInt(array4);
    if (sum != sum1)
      console.log(
        "Title Tracking Report - Current Inventory - Totals mismatch between summary and details page",
      );
  }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
  async VerifyTotalNoTitleVehicle() {
    await this.getCurrentInv.click();
    const b = await this.getTotal015Days.innerText();
    const array1 = b.replace(",", "");
    const bucket1 = parseInt(array1);
    const c = await this.getTotal1630Days.innerText();
    const array2 = c.replace(",", "");
    const bucket2 = parseInt(array2);
    const d = await this.getTotal3160Days.innerText();
    const array3 = d.replace(",", "");
    const bucket3 = parseInt(array3);
    const e = await this.getTotal61Days.innerText();
    const array4 = e.replace(",", "");
    const bucket4 = parseInt(array4);
    const a = await this.getTotalNoTitle.innerText();
    const array5 = a.replace(",", "");
    const totalnotitle = parseInt(array5);
    const sum = bucket1 + bucket2 + bucket3 + bucket4;
    if (sum != totalnotitle)
      console.log(
        "Title Tracking Report - Current Inventory - totals in no title Mismatch",
      );
  }
  async ValidateDetailAndSummaryForSelectedStore() {
    const a = await this.getStoreNV.innerText();
    const array = parseInt(a);
    const c = await this.getStoreReceivedNV.innerText();
    const array1 = parseInt(c);
    await this.getStore.click();
    await this.page.waitForLoadState("networkidle");
    const b = await this.getStoreTotalNVDetail.innerText();
    const array5 = b.replace("1 - 100 of ", "");
    const array4 = array5.replace(" items", "");
    const sum = parseInt(array4);
    const sum1 = array + array1;
    if (sum != sum1)
      console.log(
        "Title Tracking Report - Current Inv - Summary and Detail for a store mismatches",
      );
  }
  async validatepercentages() {
    await this.page.waitForTimeout(7000);
    await expect(this.get015DaysPercentage).toBeVisible();
    await expect(this.get1630DaysPercentage).toBeVisible();
    await expect(this.get3160DaysPErcentage).toBeVisible();
    await expect(this.get61DaysPercentage).toBeVisible();
    await expect(this.getTotalPercentage).toBeVisible();
  }
  async ExportToExcel() {
    await this.getExportToExcel.click();
    await this.getExportToPDF.click();
    await this.getStore.click();
    await this.page.waitForTimeout(7000);
    await this.getExportToExcelDetail.click();
    await this.getExportToPDFDetail.click();
  }
  async ValidateDaysToReceive() {
    await this.getStore.click();
    await this.page.waitForLoadState("networkidle");
    const a = await this.getTitleStatus.innerText();
    if (a == "Received") {
      await expect(this.getDaysToReceive).not.toBeEmpty();
      await expect(this.getpage).toBeEmpty();
    } else if (a == "Not In") {
      await expect(this.getDaysToReceive).toBeEmpty();
      await expect(this.getpage).not.toBeEmpty();
    }
  }
  async ValidateTitleIssue() {
    await this.page.waitForTimeout(4000);
    await expect(this.getTitleIssue).toBeVisible();
  }
}
module.exports = { TitleTracking };
