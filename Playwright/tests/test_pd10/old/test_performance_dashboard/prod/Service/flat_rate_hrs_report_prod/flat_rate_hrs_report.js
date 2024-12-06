// this POM is for /Payroll
const { expect } = require("@playwright/test");

class flatratehrsReport {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getServiceDashboard = page.locator(':nth-match(:text("Service"),1)');
    this.getServiceFlatRateHrsReport = page.locator(
      ':nth-match(:text("Flat Rate Hours"),2)',
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
    this.getGoBUtton = page.locator('text="GO"');
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
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.getMichigan1.nth(2).click();
    await this.getMichiganStore2.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
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
  async NavigateToServiceFRHReport() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getServiceDashboard.click();
    await this.getServiceFlatRateHrsReport.click();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateDuplicateStore() {
    await this.page.waitForLoadState("networkidle");
    for (var i = 1; i < 5; i++) {
      var BeforeXPath = '//*[@id="frhGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var AfterXpath = "]/td[1]";
      var ActualXpath1 = BeforeXPath + i + AfterXpath;
      var ActualXpath2 = BeforeXPath + (1 + i) + AfterXpath;
      var g = await this.page.locator(ActualXpath1).innerText();
      var h = await this.page.locator(ActualXpath2).innerText();
      if (g == h) {
        console.log("The store " + g + " has duplicate store");
      }
    }
    for (var i = 1; i < 5; i++) {
      var BeforeXPath = '//*[@id="frhGrid"]/div[3]/table[1]/tbody[1]/tr[';
      var AfterXpath = "]/td[2]";
      var ActualXpath1 = BeforeXPath + i + AfterXpath;
      var ActualXpath2 = BeforeXPath + (1 + i) + AfterXpath;
      var g = await this.page.locator(ActualXpath1).innerText();
      var h = await this.page.locator(ActualXpath2).innerText();
      if (g == h) {
        console.log("The store " + g + " has duplicate company number");
      }
    }
  }
}
module.exports = { flatratehrsReport };
