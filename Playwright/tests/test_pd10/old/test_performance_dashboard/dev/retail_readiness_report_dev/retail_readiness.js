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
    //Main Tb
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getConsumerOptionalityStore = page.locator(
      ':nth-match(:text("ABC Hyundai"),2)',
    );
    this.getMainRetailReadinessOmnichannel = page.locator(
      ':nth-match(:text(" Retail Readiness (Omnichannel)"),1)',
    );
    this.getMainConsumerOptionality = page.locator(
      ':nth-match(:text(" Consumer Optionality"),1)',
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
    this.getTotalReports = page.locator("li");
    this.getTotalRows = page.locator("tr");
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
  async NavigatetoMainConsumerOptionality() {
    await this.getMainTab.click();
    await this.getMainConsumerOptionality.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToMainRetailReadinessOmnichannel() {
    await this.getMainTab.click();
    await this.getMainRetailReadinessOmnichannel.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
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
    await this.page.waitForNavigation();
  }
  async twostepauthlogin() {
    await this.page.click("id=KmsiCheckboxField");
    await this.page.click("id=idSIButton9");
  }
  async ValidateDownloadAAChevyCadillac() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR CHEVROLET CADILLAC")').click(),
    ]);
  }
  async ValidateDownloadAACDJR() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR CDJR")').click(),
    ]);
  }
  async ValidateDownloadAACDJR() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR CDJR")').click(),
    ]);
  }
  async ValidateDownloadAABMW() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR BMW")').click(),
    ]);
  }
  async ValidateDownloadAAMerc() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("ANN ARBOR MERCEDES-BENZ")').click(),
    ]);
  }
  async ValidateDownloadGardenCityCDJR() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator('a:has-text("GARDEN CITY CDJR")').click(),
    ]);
  }
}
module.exports = { MainStore };
