// this POM is for /Payroll
const { expect } = require("@playwright/test");

class InventoryWidget {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('span:has-text("Sales")');
    this.getSalesNewVehicle = page.locator('span:has-text("New Vehicle")');
    this.getSalesNewInventoryDetail = page.locator("text=New Inventory Detail");
    this.getDetailTotals = page.locator(
      '//*[@id="tabstrip-1"]/div/div/span[2]',
    );
    this.getMichigan = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
    );
    this.getMichiganStore2 = page.locator(
      'label:has-text("Farmington Hills CDJR")',
    );
    this.getSalesLoanerVehicleDetail = page.locator(
      ':nth-match(:text("Loaner Vehicle Detail"),1)',
    );
    this.getTotalRows = page.locator("tr");
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getMichigan = page.locator(
      "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
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
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW = page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator("text=CALIFORNIA");
    this.getFEAverageNew = page.locator(
      "//*[@id='AveragesTableTBody']/tr[1]/th[1]/a[1]/span[1]",
    );
    this.getFEAverageUsed = page.locator(
      "//*[@id='AveragesTableTBody']/tr[3]/th[1]/a[1]/span[1]",
    );
    this.getFIAverageNew = page.locator(
      "//*[@id='AveragesTableTBody']/tr[5]/th[1]/a[1]/span[1]",
    );
    this.getFIAverageUsed = page.locator(
      "//*[@id='AveragesTableTBody']/tr[7]/th[1]/a[1]/span[1]",
    );
    this.getDealAverage = page.locator("//*[@id='trView1']/th/a/span[1]");
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
    await this.getCalifornia.click();
    await this.getDTLAToyota.click();
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.getMichigan.nth(2).click();
    await this.getMichiganStore2.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
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
  async Navigations() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getFEAverageNew.click();
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getFEAverageUsed.click();
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getFIAverageNew.click();
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getFIAverageUsed.click();
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getDealAverage.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
  }
}
module.exports = { InventoryWidget };
