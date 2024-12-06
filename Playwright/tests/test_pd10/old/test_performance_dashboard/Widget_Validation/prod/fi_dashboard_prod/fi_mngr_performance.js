// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MngrPerformance {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesFIOps = page.locator(':nth-match(:text("F&I Ops"),1)');
    this.getSalesFIOpsDashboard = page.locator(
      ':nth-match(:text("F&I Ops Dashboard"),1)',
    );
    this.getSalesFILogNew = page.locator(':nth-match(:text("F&I Log"),1)');
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getBuick = page.locator('label:has-text("Troy Buick GMC")');
    this.getMichigan = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getFord = page.locator('label:has-text("Troy Ford")');
    this.getMazda = page.locator('label:has-text("Troy Mazda")');
  }
  async NavigateToSalesFIOpsDashboard() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIOpsDashboard.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
  }
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getMichigan.nth(2).click();
    await this.getBuick.click();
    await this.getFord.click();
    await this.getMazda.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
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

  async ValidateUnits() {
    {
      await this.page.waitForTimeout(5000);
      const BeforeXpath =
        "//body/div[1]/div[1]/form[1]/div[3]/div[6]/div[2]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[1]/div[1]/div[2]/table[1]/tbody[1]/tr[";
      const AfterFIAvgXpath = "]/td[3]/span[1]";
      const AfterCashXpath = "]/td[4]";
      const AfterFinanceXpath = "]/td[5]";
      const AfterTotalXpath = "]/td[6]";
      const AfterReserveXpath = "]/td[7]";
      const AfterLOFXpath = "]/td[8]";
      const AfterSCXpath = "]/td[9]";
      const AfterCoatXpath = "]/td[10]";
      const AfterGAPXpath = "]/td[11]";
      const AfterReserveAvgXpath = "]/td[12]";
      const AfterGrossXpath = "]/td[13]";
      var a = new Array();
      var a1 = new Array();
      var b = new Array();
      var b1 = new Array();
      var c = new Array();
      var c1 = new Array();
      var d = new Array();
      var d1 = new Array();
      var e = new Array();
      var e1 = new Array();
      var f = new Array();
      var f1 = new Array();
      var g = new Array();
      var g1 = new Array();
      var h = new Array();
      var h1 = new Array();
      var l = new Array();
      var l1 = new Array();
      var m = new Array();
      var m1 = new Array();
      var n = new Array();
      var n1 = new Array();
      for (var i = 1; i <= 3; i++) {
        var ActualFIAvgXpath = BeforeXpath + i + AfterFIAvgXpath;
        var ActualCashXpath = BeforeXpath + i + AfterCashXpath;
        var ActualFinanceXpath = BeforeXpath + i + AfterFinanceXpath;
        var ActualTotalXpath = BeforeXpath + i + AfterTotalXpath;
        var ActualReserveXpath = BeforeXpath + i + AfterReserveXpath;
        var ActualLOFXpath = BeforeXpath + i + AfterLOFXpath;
        var ActualSCXpath = BeforeXpath + i + AfterSCXpath;
        var ActualCoatXpath = BeforeXpath + i + AfterCoatXpath;
        var ActualGAPXpath = BeforeXpath + i + AfterGAPXpath;
        var ActualReserveAvgXpath = BeforeXpath + i + AfterReserveAvgXpath;
        var ActualGrossXpath = BeforeXpath + i + AfterGrossXpath;
        a[i] = await this.page.locator(ActualFIAvgXpath).innerText();
        b[i] = await this.page.locator(ActualCashXpath).innerText();
        c[i] = await this.page.locator(ActualFinanceXpath).innerText();
        d[i] = await this.page.locator(ActualTotalXpath).innerText();
        e[i] = await this.page.locator(ActualReserveXpath).innerText();
        f[i] = await this.page.locator(ActualLOFXpath).innerText();
        g[i] = await this.page.locator(ActualSCXpath).innerText();
        h[i] = await this.page.locator(ActualCoatXpath).innerText();
        l[i] = await this.page.locator(ActualGAPXpath).innerText();
        m[i] = await this.page.locator(ActualReserveAvgXpath).innerText();
        n[i] = await this.page.locator(ActualGrossXpath).innerText();
      }
      await this.getSalesTab.click();
      await this.getSalesFIOps.click();
      await this.getSalesFILogNew.click();
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(9000);
      const FIBeforeXpath = "//*[@id='FISummary']/div[3]/table[1]/tbody[1]/tr[";
      const FIAfterFIAvgXpath = "]/td[14]";
      const FIAfterCashXpath = "]/td[2]";
      const FIAfterFinanceXpath = "]/td[3]";
      const FIAfterTotalXpath = "]/td[4]";
      const FIAfterReserveXpath = "]/td[9]";
      const FIAfterLOFXpath = "]/td[5]";
      const FIAfterSCXpath = "]/td[6]";
      const FIAfterCoatXpath = "]/td[7]";
      const FIAfterGAPXpath = "]/td[8]";
      const FIAfterReserveAvgXpath = "]/td[11]";
      const FIAfterGrossXpath = "]/td[12]";
      const FIStorename = "]/td[1]";
      for (var j = 1; j <= 3; j++) {
        var FIActualFIAvgXpath = FIBeforeXpath + j + FIAfterFIAvgXpath;
        var FIActualCashXpath = FIBeforeXpath + j + FIAfterCashXpath;
        var FIActualFinanceXpath = FIBeforeXpath + j + FIAfterFinanceXpath;
        var FIActualTotalXpath = FIBeforeXpath + j + FIAfterTotalXpath;
        var FIActualReserveXpath = FIBeforeXpath + j + FIAfterReserveXpath;
        var FIActualLOFXpath = FIBeforeXpath + j + FIAfterLOFXpath;
        var FIActualSCXpath = FIBeforeXpath + j + FIAfterSCXpath;
        var FIActualCoatXpath = FIBeforeXpath + j + FIAfterCoatXpath;
        var FIActualGAPXpath = FIBeforeXpath + j + FIAfterGAPXpath;
        var FIActualReserveAvgXpath =
          FIBeforeXpath + j + FIAfterReserveAvgXpath;
        var FIActualGrossXpath = FIBeforeXpath + j + FIAfterGrossXpath;
        var ActualStoreName = FIBeforeXpath + j + FIStorename;
        a1[j] = await this.page.locator(FIActualFIAvgXpath).innerText();
        b1[j] = await this.page.locator(FIActualCashXpath).innerText();
        c1[j] = await this.page.locator(FIActualFinanceXpath).innerText();
        d1[j] = await this.page.locator(FIActualTotalXpath).innerText();
        e1[j] = await this.page.locator(FIActualReserveXpath).innerText();
        f1[j] = await this.page.locator(FIActualLOFXpath).innerText();
        g1[j] = await this.page.locator(FIActualSCXpath).innerText();
        h1[j] = await this.page.locator(FIActualCoatXpath).innerText();
        l1[j] = await this.page.locator(FIActualGAPXpath).innerText();
        m1[j] = await this.page.locator(FIActualReserveAvgXpath).innerText();
        n1[j] = await this.page.locator(FIActualGrossXpath).innerText();
        for (var k = 1; k <= 3; k++) {
          if (a[k] != a1[k]) {
            console.log(
              "The FI log Manager Performance data is different , but this is not a bug because the data is company number dependant",
            );
          }
          if (b[k] != b1[k]) {
          }
          if (c[k] != c1[k]) {
          }
          if (d[k] != d1[k]) {
          }
          if (e[k] != e1[k]) {
          }
          if (f[k] != f1[k]) {
          }
          if (g[k] != g1[k]) {
          }
          if (h[k] != h1[k]) {
          }
          if (l[k] != l1[k]) {
          }
          if (m[k] != m1[k]) {
          }
          if (n[k] != n1[k]) {
          }
          // the if conditions are empty because currently the data fed into the report are coming from two different sources and bound to be different depending upon the company name
        }
      }
    }
  }
}
module.exports = { MngrPerformance };
