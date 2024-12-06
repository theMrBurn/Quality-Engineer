// this POM is for /Payroll
const { expect } = require("@playwright/test");

class UVD {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesUsedVehicle = page.locator(
      ':nth-match(:text("Used Vehicle"),1)',
    );
    this.getSalesUsedVehicleDashboard = page.locator(
      ':nth-match(:text("Used Vehicle Dashboard"),1)',
    );
    this.getSalesUsedInventoryDetail = page.locator(
      'a:has-text("Used Inventory Detail")',
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
    this.getCalifornia = page.locator("text=CALIFORNIA");
    this.getFooter = page.locator(
      "//*[@id='tabstrip-1']/div[1]/div[1]/span[2]",
    );
  }
  async Banner() {
    if (expect(this.page.locator("text=Continue")).toBeVisible()) {
      await this.page.locator("text=Continue");
    } else {
      return;
    }
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
  async SelectStoresForRegression() {
    await this.page.waitForLoadState("networkidle");
    await this.getStoreSelector.nth(2).click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getAlaska.nth(2).click();
    await this.getAnchorageCJD.click();
    await this.page.waitForTimeout(2000);
    await this.getCalifornia.click();
    await this.getDTLAToyota.click();
    await this.getCanada.first().click();
    await this.page.waitForTimeout(2000);
    await this.getFlorida.nth(2).click();
    await this.getTampaFord.click();
    await this.page.waitForTimeout(2000);
    await this.getMichigan.nth(2).click();
    await this.getMichiganStore2.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToSalesUsedVehicleDashboard() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.first().click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedVehicleDashboard.click();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateUnitsForAnchorageCJD() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(10000);
    var CIsum = 0;
    for (var i = 2; i <= 5; i++) {
      const BeforeCIXpath = "//*[@id='vSales']/table[1]/tbody[1]/tr[";
      const AfterCIXpath = "]/td[5]";
      var CIXpath = BeforeCIXpath + i + AfterCIXpath;
      var CITotal = await this.page.locator(CIXpath).innerText();
      var CITotal1 = parseInt(CITotal);
      CIsum = CIsum + CITotal1;
    }
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.first().click();
    await this.getSalesUsedInventoryDetail.first().click();
    await this.page.waitForLoadState("networkidle");
    var CI1 = await this.page
      .locator(
        "//*[@id='OnGroundAgingTable']/div[3]/table[1]/tbody[1]/tr[1]/td[12]",
      )
      .innerText();
    var CI = parseInt(CI1);
    if (CI != CIsum) {
      console.log(
        " Anchorage CJD - Used Vehicle Dashbard - Vehicle Type Performance - The data doesnt match with total for Current Inventory " +
          CI +
          ":" +
          CIsum,
      );
    }
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateUnitsForDTLA() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(10000);
    var CIsum = 0;
    for (var i = 7; i <= 10; i++) {
      const BeforeCIXpath = "//*[@id='vSales']/table[1]/tbody[1]/tr[";
      const AfterCIXpath = "]/td[5]";
      var CIXpath = BeforeCIXpath + i + AfterCIXpath;
      var CITotal = await this.page.locator(CIXpath).innerText();
      var CITotal1 = parseInt(CITotal);
      CIsum = CIsum + CITotal1;
    }
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.first().click();
    await this.getSalesUsedInventoryDetail.first().click();
    await this.page.waitForLoadState("networkidle");
    var CI1 = await this.page
      .locator(
        "//*[@id='OnGroundAgingTable']/div[3]/table[1]/tbody[1]/tr[2]/td[12]",
      )
      .innerText();
    var CI = parseInt(CI1);
    if (CI != CIsum) {
      console.log(
        " DTLA - Used Vehicle Dashbard - Vehicle Type Performance - The data doesnt match with total for Current Inventory " +
          CI +
          ":" +
          CIsum,
      );
    }
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateUnitsForFHCDJR() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(10000);
    var CIsum = 0;
    for (var i = 12; i <= 15; i++) {
      const BeforeCIXpath = "//*[@id='vSales']/table[1]/tbody[1]/tr[";
      const AfterCIXpath = "]/td[5]";
      var CIXpath = BeforeCIXpath + i + AfterCIXpath;
      var CITotal = await this.page.locator(CIXpath).innerText();
      var CITotal1 = parseInt(CITotal);
      CIsum = CIsum + CITotal1;
    }
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.first().click();
    await this.getSalesUsedInventoryDetail.first().click();
    await this.page.waitForLoadState("networkidle");
    var CI1 = await this.page
      .locator(
        "//*[@id='OnGroundAgingTable']/div[3]/table[1]/tbody[1]/tr[3]/td[12]",
      )
      .innerText();
    var CI = parseInt(CI1);
    if (CI != CIsum) {
      console.log(
        " FHCDJR - Used Vehicle Dashbard - Vehicle Type Performance - The data doesnt match with total for Current Inventory " +
          CI +
          ":" +
          CIsum,
      );
    }
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { UVD };
