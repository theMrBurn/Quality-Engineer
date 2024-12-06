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
  }
  async SelectStoreForMarkhamBMW() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      )
      .nth(2)
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page
      .locator(
        "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A >> div",
      )
      .nth(2)
      .click();
    await this.page.locator('label:has-text("Markham BMW Mini")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
  }
  async SelectStoreForNewMarketAudi() {
    await this.page
      .locator(
        'div:has-text("Markham BMW Mini Location Group VP Manufacturer Same Store 12 Groups LITHIABAIER")',
      )
      .nth(2)
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator('label:has-text("Newmarket Audi")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateUnitsForNewMarketAudi() {
    await this.page.waitForTimeout(5000);
    const TotalRetailUnits = await this.page
      .locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[3]/td[2]")
      .innerText();
    await this.page
      .locator(
        "text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select",
      )
      .selectOption("5");
    await this.page.waitForTimeout(5000);
    const totalunitsinwidget = await this.page
      .locator("//*[@id='eGrid2']/div[2]/table[1]/tbody[1]/tr[1]/td[3]")
      .innerText();
    if (TotalRetailUnits != totalunitsinwidget) {
      console.log(
        "For New Market Audi , the total retail units is not matching with total units from the widget : " +
          TotalRetailUnits +
          ":" +
          totalunitsinwidget,
      );
    }
    await this.page
      .locator(
        "text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select",
      )
      .selectOption("2");
    await this.page.waitForTimeout(5000);
    for (var i = 1; i < 8; i++) {
      const BeforeXpath = "//*[@id='eGrid2']/div[2]/table[1]/tbody[1]/tr[";
      const AfterXpath = "]/td[3]";
      var ActualXpath = BeforeXpath + i + AfterXpath;
      var a = await this.page.locator(ActualXpath).innerText();
      if (a == 0.0)
        console.log(
          " For New Market Audi , sales representative units are 0.0",
        );
    }
  }
  async ValidateUnitsForMarkhamBMW() {
    await this.page.waitForTimeout(5000);
    const TotalRetailUnits = await this.page
      .locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[3]/td[2]")
      .innerText();
    await this.page
      .locator(
        "text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select",
      )
      .selectOption("5");
    await this.page.waitForTimeout(5000);
    const totalunitsinwidget = await this.page
      .locator("//*[@id='eGrid2']/div[2]/table[1]/tbody[1]/tr[1]/td[3]")
      .innerText();
    if (TotalRetailUnits != totalunitsinwidget) {
      console.log(
        "For Markham BMW , the total retail units is not matching with total units from the widget : " +
          TotalRetailUnits +
          ":" +
          totalunitsinwidget,
      );
    }
    await this.page
      .locator(
        "text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select",
      )
      .selectOption("2");
    await this.page.waitForTimeout(5000);
    for (var i = 1; i < 8; i++) {
      const BeforeXpath = "//*[@id='eGrid2']/div[2]/table[1]/tbody[1]/tr[";
      const AfterXpath = "]/td[3]";
      var ActualXpath = BeforeXpath + i + AfterXpath;
      var a = await this.page.locator(ActualXpath).innerText();
      if (a == 0.0)
        console.log(" For Markham BMW , sales representative units are 0.0");
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
