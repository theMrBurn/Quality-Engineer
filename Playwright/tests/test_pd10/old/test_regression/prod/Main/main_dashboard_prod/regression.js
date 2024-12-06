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
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getGoBUtton = page.locator('text="GO"');
    this.getTotalRows = page.locator("tr");
    this.getUsedBryanCJDFiat = page.locator("#usedTable >> text=Anchorage CJD");
    this.getNewBryanCJDFiat = page.locator("#newTable >> text=Anchorage CJD");
    this.getSelectButton = page.locator("#storeSelector >> text=Select");
    this.getFlorida = page.locator(
      "text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div",
    );
    this.getDoralHyundai = page.locator('label:has-text("Doral Hyundai")');
    this.getStoreSelector = page.locator("header >> text=Multiple Stores");
    this.getAllselector = page.locator(".allSelectorIndicator");
    this.getUsedVehicleRetailUnits = page.locator(
      'a:has-text("Used Vehicle Retail Units")',
    );
    this.getNewVehicleRetailUnits = page.locator(
      'a:has-text("New Vehicle Retail Units")',
    );
    this.getEmployee = page.locator(
      "text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select",
    );
    this.getEdwin = page.locator("text=Edwin ");
  }
  async ValidateStorename() {
    await this.getUsedVehicleRetailUnits.click();
    await this.page.waitForLoadState("networkidle");
    await this.getUsedBryanCJDFiat.click();
    await this.page.waitForLoadState("networkidle");
    for (var i = 1; i < 5; i++) {
      const BeforeXpath =
        "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpath = "]/td[3]";
      const ActualXpath = BeforeXpath + i + AfterXpath;
      var a = await this.page.locator(ActualXpath).innerText();
      if (a == "test") {
        console.log(
          " the store name for Anchorage CJD - appearing in Performance Tracking Widget -> Used Retail Vehicle Units -> Select Store  is not correct",
        );
      }
    }
  }
  async ValidateEmpForDoralHyundaiStore() {
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector.click();
    await this.getAllselector.click();
    await this.getAllselector.click();
    await this.getFlorida.nth(2).click();
    await this.getDoralHyundai.click();
    await this.getSelectButton.click();
    await this.page.waitForTimeout(5000);
    await this.getEmployee.selectOption("5");
  }

  async ValidateOnGroundAge() {
    await this.getNewVehicleRetailUnits.click();
    await this.page.waitForLoadState("networkidle");
    await this.getNewBryanCJDFiat.click();
    await this.page.waitForLoadState("networkidle");
    for (var i = 1; i < 5; i++) {
      const BeforeXpath =
        "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      const AfterXpath = "]/td[24]";
      const ActualXpath = BeforeXpath + i + AfterXpath;
      var a = await this.page.locator(ActualXpath).innerText();
      if (a == "") {
        console.log(
          " the On Ground Age for Anchorage CJD - appearing in Performance Tracking Widget -> New Retail Vehicle Units -> Select Store  is empty",
        );
      }
    }
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
  }
}
module.exports = { InventoryWidget };
