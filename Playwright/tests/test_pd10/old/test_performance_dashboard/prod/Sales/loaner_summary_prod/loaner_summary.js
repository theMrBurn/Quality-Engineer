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
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesNewVehicle = page.locator(
      ':nth-match(:text("New Vehicle"),1)',
    );
    this.getSalesLoanerVehicleDetail = page.locator(
      ':nth-match(:text("Loaner Vehicle Detail"),1)',
    );
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getMichigan1 = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getMichiganDropdownn = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc",
    );
    this.getMichiganStore2 = page.locator(
      'label:has-text("Farmington Hills CDJR")',
    );
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getGoBUtton = page.locator('text="GO"');
    this.getTotalRows = page.locator("tr");
    this.getAlaska = page.locator(
      "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
    );
    this.getAnchorageCJD = page.locator('label:has-text("Anchorage CJD")');
    this.getCanada = page.locator(
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A  >> div",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW = page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator("text=CALIFORNIA");
    this.getSummation = page.locator(
      '//*[@id="tabstrip-1"]/div/div/div/table/tbody/tr/td[2]',
    );
    this.getPagedropdown = page.locator(
      "//*[@id='tabstrip-1']/div/div/span/span/span/span/span[1]",
    );
    this.getPAge500 = page.locator("//body/div[2]/div[1]/div[2]/ul[1]/li[3]");
    this.getTotalRows = page.locator("tr");
    this.getVINAsc = page.locator(
      "//body/div[1]/div[2]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[15]/a[2]",
    );
  }
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.page.waitForTimeout(2000);
    await this.getCalifornia.click();
    await this.getDTLAToyota.click();
    await this.page.waitForTimeout(2000);
    await this.getCanada.first().click();
    await this.page.waitForTimeout(2000);
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.page.waitForTimeout(2000);
    await this.getMichigan1.nth(2).click();
    await this.getMichiganStore2.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToSalesLoanerVehicleDetail() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(11000);
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesLoanerVehicleDetail.click();
    await this.page.waitForLoadState("networkidle");
  }
  async goto() {
    await this.page.goto("https://speuat.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  async twostepauthlogin() {
    await this.page.click("id=KmsiCheckboxField");
    await this.page.click("id=idSIButton9");
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

  async ValidateDuplicateStore() {
    await this.page.waitForLoadState("networkidle");
    const a = await this.getTotalRows.count();
    for (var i = 1; i < a - 1; i++) {
      var beforeXpath = "//*[@id='PLSummary']/div[3]/table[1]/tbody[1]/tr[";
      var afterXpath = "]/td[1]/a[1]";
      var compareXpath1 = beforeXpath + i + afterXpath;
      var compareXpath2 = beforeXpath + (i + 1) + afterXpath;
      var b = await this.page.locator(compareXpath1).innerText();
      var c = await this.page.locator(compareXpath2).innerText();
      if (b == c) {
        console.log(
          "Loaner Summary - The store name " +
            (await this.page.locator(compareXpath2).innerText()) +
            " is a duplicate",
        );
      }
    }
    return;
  }
  async ValidateDuplicateVIN() {
    const z = await this.getTotalRows.count();
    await this.page.waitForTimeout(5000);
    for (var i = 1; i < z - 1; i++) {
      var StoreBeforeXpath =
        '//*[@id="PLSummary"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreActualXpath = StoreBeforeXpath + i + StoreAfterXpath;
      this.getStoreName = this.page.locator(StoreActualXpath);
      var a = await this.getStoreName.innerText();
      await this.getStoreName.click();
      await this.page.waitForLoadState("networkidle");
      await this.getVINAsc.click();
      var b = await this.getTotalRows.count();
      for (var i = b; i < b; i++) {
        var VINBeforeXpath = '//*[@id="PLDetail"]/div[3]/table[1]/tbody[1]/tr[';
        var VINAfterXpath = "]/td[15]";
        var VINActualXpath = "";
        var compareXpath1 = VINBeforeXpath + i + VINAfterXpath;
        var compareXpath2 = VINBeforeXpath + (i + 1) + VINAfterXpath;
        var b = await this.page.locator(compareXpath1).innerText();
        var c = await this.page.locator(compareXpath2).innerText();
        if (b == c) {
          console.log(
            "Loaner Summary Detail - The store" + a + " has duplicate VINS",
          );
        }
        await this.page.goBack();
      }
      return;
    }
  }
  async ValidateTotalCountForEachStore() {
    await this.page.waitForTimeout(5000);
    var BeforeXpath = '//*[@id="PLSummary"]/div[3]/table[1]/tbody[1]/tr[';
    var AfterXpath = "]/td[2]";
    const a = await this.getTotalRows.count();
    var StoreBeforeXpath = '//*[@id="PLSummary"]/div[3]/table[1]/tbody[1]/tr[';
    var StoreAfterXpath = "]/td[1]/a[1]";
    for (var i = 1; i < a - 1; i++) {
      var StoreActualXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var ActualXpath = BeforeXpath + i + AfterXpath;
      var Storename = await this.page.locator(StoreActualXpath).innerText();
      var b = await this.page.locator(ActualXpath).innerText();
      await this.page.locator(StoreActualXpath).click();
      await this.page.waitForLoadState("networkidle");
      var h = await this.getTotalRows.count();
      if (b != h - 2) {
        console.log(
          " the loaner summary mismatch for store: " +
            Storename +
            " In detail page it is :" +
            h +
            " IN Summary page it is " +
            b,
        );
      }
      await this.page.goBack();
    }
  }
}
module.exports = { MainStore };
