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
  async SelectSToreForTHornhillHonda() {
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
    await this.page.locator('label:has-text("Thornhill Honda")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
  }
  async SelectStoreForFHCJDR() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        'div:has-text("Thornhill Honda Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      )
      .nth(2)
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page
      .locator(
        "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
      )
      .nth(2)
      .click();
    await this.page.locator('label:has-text("Farmington Hills CDJR")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
  }
  async SelectStoreForMarkhamBMW() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        'div:has-text("Farmington Hills CDJR Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
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
  async SelectStoresForDTLA() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        'div:has-text("Markham BMW Mini Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      )
      .nth(2)
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page
      .locator(
        "text=CALIFORNIA [+]Calabasas AudiCarson NissanClovis NissanCosta Mesa CJDRDowntown LA >> div",
      )
      .nth(2)
      .click();
    await this.page.locator('label:has-text("Downtown LA Toyota")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
  }
  async SelectStoresForTroyHighLine() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        'div:has-text("Downtown LA Toyota Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      )
      .nth(2)
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page
      .locator(
        "text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div",
      )
      .nth(2)
      .click();
    await this.page.locator('label:has-text("Troy High Line")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
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
  async ValidateWithDetailUnits() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    const a2 = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[1]/td[2]')
      .innerText();
    const a2e = parseInt(a2);
    const d2 = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[2]/td[2]')
      .innerText();
    const d2e = parseInt(d2);
    const g2 = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[3]/td[2]')
      .innerText();
    const g2e = parseInt(g2);
    await this.page
      .locator(
        '//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[1]/td[1]/a[1]',
      )
      .click();
    await this.page.waitForTimeout(5000);
    const c2 = await this.page
      .locator('//*[@id="newTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const c2e = parseInt(c2);
    await this.page.locator("text=Used Vehicle Retail Units").click();
    await this.page.waitForTimeout(5000);
    const f2 = await this.page
      .locator('//*[@id="usedTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const f2e = parseInt(f2);
    await this.page.locator("text=Total Retail Units").click();
    await this.page.waitForTimeout(5000);
    const i2 = await this.page
      .locator('//*[@id="totalTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const i2e = parseInt(i2);
    await this.page.locator("text=New Vehicle Retail Units").click();
    await this.page
      .locator('//*[@id="newTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]')
      .click();
    await this.page.waitForTimeout(6000);
    const z1 = await this.page.locator("tr").count();
    if (a2 == c2e && z1 - 2 != c2e) {
      console.log(
        " the new retail units is not matching between wdiget and the detail page " +
          a2 +
          " " +
          c2e +
          " " +
          (z1 - 2),
      );
    }
    await this.page.goBack();
    await this.page.locator("text=Used Vehicle Retail Units").click();
    await this.page
      .locator('//*[@id="usedTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]')
      .click();
    await this.page.waitForTimeout(6000);
    const z2 = await this.page.locator("tr").count();
    if (d2 == f2e && z2 - 2 != f2e) {
      console.log(
        " the used retail units is not matching between wdiget and the detail page" +
          d2 +
          " " +
          f2e +
          " " +
          (z2 - 2),
      );
    }
    await this.page.goBack();
    await this.page.locator("text=Total Retail Units").click();
    await this.page
      .locator(
        '//*[@id="totalTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/a[1]',
      )
      .click();
    await this.page.waitForTimeout(6000);
    const z3 = await this.page.locator("tr").count();
    if (g2 == i2e && z3 - 2 != i2e) {
      console.log(
        " the total retail units is not matching between wdiget and the detail page" +
          g2 +
          " " +
          i2e +
          " " +
          (z3 - 2),
      );
    }
  }
}
module.exports = { InventoryWidget };
