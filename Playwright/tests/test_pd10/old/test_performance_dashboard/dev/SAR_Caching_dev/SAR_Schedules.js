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
    this.getOffice = page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeSchedules = page.locator(':nth-match(:text("Schedule"),1)');
    this.getOfficeSchedulesSummary = page.locator('text="Schedules Summary"');
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
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW = page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral HyundaiDoral KiaDoral VolkswagenFor >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator(
      "text=CALIFORNIA[+]Calabasas AudiCarson NissanClovis NissanCosta Mesa CJDRDowntown LA  >> div",
    );
    this.getExpandall = page.locator('//*[@id="ExpandAll"]/div[1]');
  }
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  // get elements of all locators
  async NavigateToOfficeSchedulesSummary() {
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
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
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.page.waitForTimeout(2000);
    await this.getCanada.nth(2).click();
    await this.getThornhillHonda.click();
    await this.getMarkhamBMW.click();
    await this.getCalifornia.nth(2).click();
    await this.getDTLAToyota.click();
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.getMichigan.nth(2).click();
    await this.getMichiganStore2.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateFordataToBePresent() {
    var a = await this.getTotalRows.count();
    for (var i = 1; i < a - 2; i++) {
      const BeforexPath =
        "//body/div[1]/main[1]/section[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpath = "]/td[1]/a[1]";
      var ActualXpath = BeforexPath + i + AfterXpath;
      await this.page.locator(ActualXpath).click();
      await this.page.waitForLoadState("networkidle");
      await this.getExpandall.click();
      var b = this.getTotalRows.count();
      for (var k = 1; k < b - 1; k++) {
        var PreviewBeforeXpath = '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[';
        var PreviewAfterXpath = "]/td[7]";
        var PreviewActualXpath = PreviewBeforeXpath + k + PreviewAfterXpath;
        expect(this.page.locator(PreviewActualXpath)).toBeTruthy();
        expect(this.page.locatot(PreviewActualXpath)).toBeVisible();
      }
      for (var j = 1; j < b - 1; j++) {
        var CriteriaBeforeXpath =
          '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[';
        var CriteriaAfterXpath = "]/td[7]";
        var CriteriaActualXpath = CriteriaBeforeXpath + j + CriteriaAfterXpath;
        expect(this.page.locator(CriteriaActualXpath)).toBeTruthy();
        expect(this.page.locatot(CriteriaActualXpath)).toBeVisible();
      }
      await this.page.goBack();
    }
  }
}
module.exports = { MainStore };
