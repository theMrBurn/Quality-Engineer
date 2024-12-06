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
    this.getSalesNewInventoryDetail = page.locator(
      'text="New Inventory Detail"',
    );
    this.getInvoiceAging = page.locator(':nth-match(:text("Invoice Aging"),1)');
    this.getColumn = page.locator("text=Column SettingsMake >> span");
    this.getChooseColumn = page.locator("text=Choose columns");
    this.getCompanyName = page.locator("text=Company Name");
    this.getPageLoad = page.locator("#NewDetailTable div >>nth=2");
    this.getPagedropdown = page.locator(
      "//*[@id='tabstrip-1']/div/div/span/span/span/span/span[1]",
    );
    this.getPAge500 = page.locator("//body/div[2]/div[1]/div[2]/ul[1]/li[3]");
    this.getTotalRows = page.locator("tr");
    this.getStoreSelector = page.locator("header >> text=Multiple Stores");
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
    this.getPictureColumn = page.locator("text=Picture");
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
  async NavigateToSalesNewInventoryDetail() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(7000);
    await this.getSalesTab.first().click();
    await this.getSalesNewVehicle.first().click();
    await this.getSalesNewInventoryDetail.first().click();
    await this.getInvoiceAging.click();
    await this.page.waitForLoadState("networkidle");
  }

  //If Total Picture Column count is above 0, then Picture column should always be Y
  async validatePictureRule() {
    for (var j = 1; j < 5; j++) {
      var StorebeforeXpath1 =
        '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
      var StoreEndxpath = "]/td[1]/a[1]";
      var StoreXpath = StorebeforeXpath1 + j + StoreEndxpath;
      await this.page.locator(StoreXpath).click();
      await this.page.waitForTimeout(5000);
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
      await this.getInvoiceAging.click();
      await this.page.waitForLoadState("networkidle");
    }
  }
}
module.exports = { NewVehicleInventory };
