// this POM is for /Payroll
const { expect } = require("@playwright/test");
class NewVehicleInventory {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('span:has-text("Sales")');
    this.getSalesNewVehicle = page.locator('span:has-text("New Vehicle")');
    this.getSalesIncentiveLog = page.locator('a:has-text("Incentive Log")');
    this.getNewInventorySummaryTotals = page.locator('text="Totals"');
    this.getStoreSelector = page.locator("header >> text=Multiple Stores");
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getMichiganStore1 = page.locator(
      'label:has-text("Farmington Hills Audi")',
    );
    this.getMichiganStore2 = page.locator(
      'label:has-text("Farmington Hills CDJR")',
    );
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getTotalRows = page.locator("tr");
    this.getAlaska = page.locator(
      "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
    );
    this.getAnchorageCJD = page.locator('label:has-text("Anchorage CJD")');
    this.getCanada = page.locator(
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW = page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator(
      "text=CALIFORNIA [+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Nis >> div",
    );
    this.getMichigan1 = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
  }
  async SelectStoresForRegression() {
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector.click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getCalifornia.nth(2).click();
    await this.getDTLAToyota.click();
    await this.getCanada.click();
    await this.getThornhillHonda.click();
    //await this.getMarkhamBMW.click();
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.getMichigan1.nth(2).click();
    await this.getMichiganStore2.click();
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
    await this.page.waitForTimeout(5000);
  }
  async NavigateToSalesIncentiveLog() {
    await this.page.waitForTimeout(7000);
    await this.getSalesTab.first().click();
    await this.getSalesNewVehicle.first().click();
    await this.getSalesIncentiveLog.first().click();
    await this.page.waitForLoadState("networkidle");
  }
  // To Validate Duplicate VIN
  async ValidateDuplicateVIN() {
    for (var i = 2; i < 7; i++) {
      var StoreBeforeXpath =
        "//*[@id='divSubMain']/table[1]/tbody[1]/tr[1]/td[1]/a[";
      var StoreAfterXpath = "]";
      var StoreActualXpath = StoreBeforeXpath + i + StoreAfterXpath;
      this.getStoreName = this.page.locator(StoreActualXpath);
      var a = await this.getStoreName.innerText();
      await this.getStoreName.click();
      await this.page.waitForLoadState("networkidle");
      await this.page.locator('a:has-text("VIN")').click();
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      for (var j = b; j < b; j++) {
        var VINBeforeXpath =
          "//body/div[1]/form[1]/div[3]/div[3]/div[2]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[";
        var VINAfterXpath = "]/td[7]";
        var compareXpath1 = VINBeforeXpath + j + VINAfterXpath;
        var compareXpath2 = VINBeforeXpath + (j + 1) + VINAfterXpath;
        var b = await this.page.locator(compareXpath1).innerText();
        var c = await this.page.locator(compareXpath2).innerText();
        if (b == c) {
          console.log("Incentive Log The store" + a + " has duplicate VINS");
        }
      }
      await this.page.goBack();
    }
  }
  async ValidateDuplicateStock() {
    for (var i = 2; i < 7; i++) {
      var StoreBeforeXpath =
        "//*[@id='divSubMain']/table[1]/tbody[1]/tr[1]/td[1]/a[";
      var StoreAfterXpath = "]";
      var StoreActualXpath = StoreBeforeXpath + i + StoreAfterXpath;
      this.getStoreName = this.page.locator(StoreActualXpath);
      var a = await this.getStoreName.innerText();
      await this.getStoreName.click();
      await this.page.waitForLoadState("networkidle");
      await this.page.locator('a:has-text("Stock #")').click();
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      for (var j = b; j < b; j++) {
        var VINBeforeXpath =
          "//body/div[1]/form[1]/div[3]/div[3]/div[2]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[";
        var VINAfterXpath = "]/td[9]";
        var compareXpath1 = VINBeforeXpath + j + VINAfterXpath;
        var compareXpath2 = VINBeforeXpath + (j + 1) + VINAfterXpath;
        var b = await this.page.locator(compareXpath1).innerText();
        var c = await this.page.locator(compareXpath2).innerText();
        if (b == c) {
          console.log("Incentive Log The store" + a + " has duplicate Stocks");
        }
      }
      await this.page.goBack();
    }
  }
}
module.exports = { NewVehicleInventory };
