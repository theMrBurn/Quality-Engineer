// this POM is for /Payroll
const { expect } = require("@playwright/test");

class CITSummary {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesSalesLog = page.locator(':nth-match(:text("Sales Log"),1)');
    this.getSalesCITSummary = page.locator(
      ':nth-match(:text("CIT Summary"),1)',
    );
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getMichigan = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getMichiganDropdownn = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc",
    );
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
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral HyundaiDoral KiaDoral VolkswagenFor",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator(
      "text=CALIFORNIA [+]Calabasas AudiCarson NissanClovis NissanCosta Mesa CJDRDowntown LA >> div",
    );
    this.getMichigan1 = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getPagedropdown = page.locator(
      "//*[@id='tabstrip-1']/div/div/span/span/span/span/span[1]",
    );
    this.getPAge500 = page.locator("//body/div[2]/div[1]/div[2]/ul[1]/li[3]");
    this.getVIN = page.locator(
      "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[11]/a[2]",
    );
  }
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.getCalifornia.nth(2).click();
    await this.getDTLAToyota.click();
    await this.getCanada.click();
    await this.getThornhillHonda.click();
    //await this.getMarkhamBMW.click();
    await this.getFlorida.click();
    await this.getTampaFord.click();
    await this.getMichigan1.nth(2).click();
    await this.getMichiganStore2.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToSalesCITSummary() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    await this.getSalesTab.click();
    await this.getSalesSalesLog.click();
    await this.getSalesCITSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeSchedulesSummary() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto("https://speuat.lithiainc.com/main/store", {
      timeout: 0,
    });
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

  async ValidateCountinCITSummary() {
    for (var i = 2; i < 7; i++) {
      var BeforeXpath = '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var AfterXpath1 = "]/td[2]";
      var AfterXpath2 = "]/td[6]";
      var AfterXpath3 = "]/td[10]";
      var AfterXpath4 = "]/td[14]";
      var AfterXpath5 = "]/td[18]";
      var Actual5Xpath = BeforeXpath + i + AfterXpath1;
      var Actual10Xpath = BeforeXpath + i + AfterXpath2;
      var Actual15Xpath = BeforeXpath + i + AfterXpath3;
      var Actual30Xpath = BeforeXpath + i + AfterXpath4;
      var Actual31Xpath = BeforeXpath + i + AfterXpath5;
      var a = await this.page.locator(Actual5Xpath).innerText();
      var b = parseInt(a);
      var c = await this.page.locator(Actual10Xpath).innerText();
      var d = parseInt(c);
      var e = await this.page.locator(Actual15Xpath).innerText();
      var f = parseInt(e);
      var g = await this.page.locator(Actual30Xpath).innerText();
      var h = parseInt(g);
      var k = await this.page.locator(Actual31Xpath).innerText();
      var l = parseInt(k);
      var sum = b + d + f + h + l;
      var StoreBeforeXpath = '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreXpath = StoreBeforeXpath + i + StoreAfterXpath;
      var a = await this.page.locator(StoreXpath).innerText();
      await this.page.locator(StoreXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getPagedropdown.click();
      await this.getPAge500.click();
      await this.page.waitForTimeout(5000);
      var detailsum = await this.getTotalRows.count();
      if (detailsum != sum) {
        console.log(
          "CIT Summary Report - The total count for store " +
            a +
            " is not matching between Summary And Detail Page . The summary page count is  " +
            sum +
            " and detail page count is " +
            detailsum,
        );
      } else {
        console.log(
          "CIT Summary Report - The total count for store " +
            a +
            " is  matching between Summary And Detail Page . The summary page count is  " +
            sum +
            " and detail page count is " +
            detailsum,
        );
      }
      await this.page.goBack();
    }
  }

  async ValidateDataPresent() {
    for (var i = 2; i < 7; i++) {
      var BeforeXpath = '//*[@id="citTable"]/div[3]/table[1]/tbody[1]/tr[';
      var AfterXpath1 = "]/td[2]";
      var AfterXpath2 = "]/td[6]";
      var AfterXpath3 = "]/td[10]";
      var AfterXpath4 = "]/td[14]";
      var AfterXpath5 = "]/td[18]";
      var AfterXpath6 = "]/td[3]";
      var Actual5Xpath = BeforeXpath + i + AfterXpath1;
      var Actual10Xpath = BeforeXpath + i + AfterXpath2;
      var Actual15Xpath = BeforeXpath + i + AfterXpath3;
      var Actual30Xpath = BeforeXpath + i + AfterXpath4;
      var Actual31Xpath = BeforeXpath + i + AfterXpath5;
      var ActualXpath = BeforeXpath + i + AfterXpath6;
      expect(this.page.locator(Actual5Xpath)).toBeVisible();
      expect(this.page.locator(Actual10Xpath)).toBeVisible();
      expect(this.page.locator(Actual15Xpath)).toBeVisible();
      expect(this.page.locator(Actual30Xpath)).toBeVisible();
      expect(this.page.locator(Actual31Xpath)).toBeVisible();
      expect(this.page.locator(ActualXpath)).toBeVisible();
    }
  }
  async ValidateDuplicateStore() {
    for (var i = 2; i < 6; i++) {
      var BeforeXPath =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      var AfterXpath = "]/td[1]/a[1]";
      var ActualXpath1 = BeforeXPath + i + AfterXpath;
      var ActualXpath2 = BeforeXPath + (1 + i) + AfterXpath;
      var g = await this.page.locator(ActualXpath1).innerText();
      var h = await this.page.locator(ActualXpath2).innerText();
      if (g == h) {
        console.log("The store " + g + " has duplicate store");
      }
    }
  }
  async ValidateDuplicateVIN() {
    await this.page.waitForLoadState("networkidle");
    const z = await this.getTotalRows.count();
    for (var i = 2; i < 7; i++) {
      var StoreBeforeXpath =
        "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      var StoreAfterXpath = "]/td[1]/a[1]";
      var StoreActualXpath = StoreBeforeXpath + i + StoreAfterXpath;
      this.getStoreName = this.page.locator(StoreActualXpath);
      var a = await this.getStoreName.innerText();
      await this.getStoreName.click();
      await this.page.waitForLoadState("networkidle");
      await this.getVIN.click();
      await this.page.waitForLoadState("networkidle");
      await this.page.locator("text=100select >> span").nth(2).click();
      await this.page
        .locator('li[role="option"]:has-text("500")')
        .nth(0)
        .click();
      await this.page.waitForTimeout(5000);
      var b = await this.getTotalRows.count();
      for (var i = b; i < b; i++) {
        var StockBeforeXpath =
          "//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
        var StockAfterXpath = "]/td[11]";
        var compareXpath1 = StockBeforeXpath + i + StockAfterXpath;
        var compareXpath2 = StockBeforeXpath + (i + 1) + StockAfterXpath;
        var b = await this.page.locator(compareXpath1).innerText();
        var c = await this.page.locator(compareXpath2).innerText();
        if (b == c) {
          console.log(
            "CIT Summary - The store" + a + " has duplicate VIN Numbers: " + b,
          );
        }
        await this.page.goBack();
      }
      return;
    }
  }
}
module.exports = { CITSummary };
