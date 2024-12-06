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
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesNewVehicle = page.locator(
      ':nth-match(:text("New Vehicle"),1)',
    );
    this.getSalesNewInventoryDetail = page.locator(
      ':nth-match(:text("New Inventory Detail"),1)',
    );
    this.getExcess = page.locator(':nth-match(:text("Excess"),1)');
    this.getColumn = page.locator("text=Column SettingsMake >> span");
    this.getChooseColumn = page.locator("text=Choose columns");
    this.getCompanyName = page.locator("text=Company Name");
    this.getPageLoad = page.locator("#NewDetailTable div >>nth=2");
    this.getPictureColumn = page.locator("text=Picture");
    this.getTotalRows = page.locator("tr");
    this.getGoBUtton = page.locator('text="GO"');
    this.getTotalRows = page.locator("tr");
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
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
      "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
    );
    this.getThornhillHonda = page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW = page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
    );
    this.getTampaFord = page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota = page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia = page.locator(
      "text=CALIFORNIA[+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Niss >> div",
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
    await this.getCanada.nth(2).click();
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
    await this.page.waitForNavigation();
  }
  async twostepauthlogin() {
    await this.page.click("id=KmsiCheckboxField");
    await this.page.click("id=idSIButton9");
  }
  async NavigateToSalesNewInventoryDetail() {
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewInventoryDetail.click();
    await this.getExcess.click();
    await this.page.waitForLoadState("networkidle");
  }

  //If Total Picture Column count is above 0, then Picture column should always be Y
  async validatePictureRule() {
    for (var j = 1; j < 6; j++) {
      var StorebeforeXpath1 =
        '//*[@id="ExcessTable"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreEndxpath = "]/td[1]/a[1]";
      var StoreXpath = StorebeforeXpath1 + j + StoreEndxpath;
      await this.page.locator(StoreXpath).click();
      await this.page.waitForTimeout(5000);
      await this.getColumn.click();
      await this.getChooseColumn.click();
      await this.getPictureColumn.nth(0).click();
      await this.getPageLoad.click();
      var beforeXpath = "//tr[";
      var Afterpath = "]/td[20]";
      var beforexpath1 = "//tr[";
      var afterxpath2 = "]/td[19]/div[1]";
      var z = await this.getTotalRows.count();
      for (var i = 3; i < z - 3; i++) {
        var dactualxpath = beforeXpath + i + Afterpath;
        var c = await this.page.locator(dactualxpath).innerText();
        var g = parseInt(c);
        var actual = beforexpath1 + i + afterxpath2;
        this.getFlag = this.page.locator(actual);
        if (g > 0) {
          await expect(this.getFlag).toHaveText("Y");
        } else if (g == 0) {
          await expect(this.getFlag).toHaveText("N");
        }
      }
      await this.page.goBack();
      await this.getExcess.click();
      await this.page.waitForLoadState("networkidle");
    }
  }
}
module.exports = { NewVehicleInventory };
