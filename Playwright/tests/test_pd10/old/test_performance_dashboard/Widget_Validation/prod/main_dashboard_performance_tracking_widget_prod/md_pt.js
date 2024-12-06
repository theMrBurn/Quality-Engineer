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
  async ValidateTheUnits() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    const a = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[1]/td[2]')
      .innerText();
    const ae = parseInt(a);
    const b = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[1]/td[3]')
      .innerText();
    const be = parseInt(b);
    const c = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const ce = parseInt(c);
    const d = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[2]/td[2]')
      .innerText();
    const de = parseInt(d);
    const e = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[2]/td[3]')
      .innerText();
    const ee = parseInt(e);
    const f = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[2]/td[4]')
      .innerText();
    const fe = parseInt(f);
    const g = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[3]/td[2]')
      .innerText();
    const ge = parseInt(g);
    const h = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[3]/td[3]')
      .innerText();
    const he = parseInt(h);
    const i = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[3]/td[4]')
      .innerText();
    const ie = parseInt(i);
    const j = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[5]/td[2]')
      .innerText();
    const jj = j.replace(",", "");
    const je = parseInt(jj);
    const k = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[5]/td[3]')
      .innerText();
    const kj = k.replace(",", "");
    const ke = parseInt(kj);
    const l = await this.page
      .locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[5]/td[4]')
      .innerText();
    const lj = l.replace(",", "");
    const le = parseInt(lj);
    await this.page
      .locator(
        '//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[1]/td[1]/a[1]',
      )
      .click();
    await this.page.waitForTimeout(5000);
    const a1 = await this.page
      .locator('//*[@id="newTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[2]')
      .innerText();
    const a1e = parseInt(a1);
    const b1 = await this.page
      .locator('//*[@id="newTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[3]')
      .innerText();
    const b1e = parseInt(b1);
    const c1 = await this.page
      .locator('//*[@id="newTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const c1e = parseInt(c1);
    await this.page.locator("text=Used Vehicle Retail Units").click();
    await this.page.waitForTimeout(5000);
    const d1 = await this.page
      .locator('//*[@id="usedTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[2]')
      .innerText();
    const d1e = parseInt(d1);
    const e1 = await this.page
      .locator('//*[@id="usedTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[3]')
      .innerText();
    const e1e = parseInt(e1);
    const f1 = await this.page
      .locator('//*[@id="usedTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const f1e = parseInt(f1);
    await this.page.locator("text=Total Retail Units").click();
    await this.page.waitForTimeout(5000);
    const g1 = await this.page
      .locator('//*[@id="totalTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[2]')
      .innerText();
    const g1e = parseInt(g1);
    const h1 = await this.page
      .locator('//*[@id="totalTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[3]')
      .innerText();
    const h1e = parseInt(h1);
    const i1 = await this.page
      .locator('//*[@id="totalTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const i1e = parseInt(i1);
    await this.page.locator("text=Flat Rate Hours").nth(2).click();
    await this.page.waitForTimeout(5000);
    const j1 = await this.page
      .locator('//*[@id="hoursTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[2]')
      .innerText();
    const j1e = parseInt(j1);
    const k1 = await this.page
      .locator('//*[@id="hoursTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[3]')
      .innerText();
    const k1e = parseInt(k1);
    const l1 = await this.page
      .locator('//*[@id="hoursTable"]/div[3]/table[1]/tbody[1]/tr[1]/td[4]')
      .innerText();
    const l1e = parseInt(l1);
    // Comparing units for new retail units link on the main dashboard
    if (a1e != ce) {
      console.log(
        " the new retail units - actual - is a mismatch between main dashboard and the new retail units detail page " +
          a1e +
          " " +
          ce,
      );
    }
    if (b1e != be) {
      console.log(
        " the new retail units - pacing - is a mismatch between main dashboard and the new retail units detail page " +
          b1e +
          " " +
          be,
      );
    }
    if (c1e != ae) {
      console.log(
        " the new retail units - planned - is a mismatch between main dashboard and the new retail units detail page " +
          c1e +
          " " +
          ae,
      );
    }
    // comparing units for used retail units on the main dashboard
    if (f1e != de) {
      console.log(
        " the used retail units - actual - is a mismatch between main dashboard and the new retail units detail page " +
          f1e +
          " " +
          de,
      );
    }
    if (e1e != ee) {
      console.log(
        " the used retail units - pacing - is a mismatch between main dashboard and the new retail units detail page " +
          e1e +
          " " +
          ee,
      );
    }
    if (d1e != fe) {
      console.log(
        " the used retail units - planned - is a mismatch between main dashboard and the new retail units detail page " +
          d1e +
          " " +
          fe,
      );
    }
    // comparing units for total retail units on the main dashboard
    if (g1e != ie) {
      console.log(
        " the total retail units - actual - is a mismatch between main dashboard and the new retail units detail page " +
          g1e +
          " " +
          ie,
      );
    }
    if (h1e != he) {
      console.log(
        " the total retail units - pacing - is a mismatch between main dashboard and the new retail units detail page " +
          h1e +
          " " +
          he,
      );
    }
    if (i1e != ge) {
      console.log(
        " the total retail units - planned - is a mismatch between main dashboard and the new retail units detail page " +
          i1e +
          " " +
          ge,
      );
    }
    // comparing units for flat rate hrs on the main dashboard
    if (j1e * 1000 != le) {
      console.log(
        " the flat rate hrs - actual - is a mismatch between main dashboard and the new retail units detail page " +
          j1e * 1000 +
          " " +
          le,
      );
    }
    if (k1e * 1000 != ke) {
      console.log(
        " the flat rate hrs- pacing - is a mismatch between main dashboard and the new retail units detail page " +
          k1e * 1000 +
          " " +
          ke,
      );
    }
    if (l1e * 1000 != je) {
      console.log(
        " the flat rate hrs - planned - is a mismatch between main dashboard and the new retail units detail page " +
          l1e * 1000 +
          " " +
          je,
      );
    }
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
