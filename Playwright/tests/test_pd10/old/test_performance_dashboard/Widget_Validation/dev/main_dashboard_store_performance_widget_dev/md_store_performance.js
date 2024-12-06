// this POM is for /Payroll
const { expect } = require("@playwright/test");

class SARSummary {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getOffice = page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeSchedules = page.locator(':nth-match(:text("Schedule"),1)');
    this.getOfficeSchedulesSummary = page.locator('text="Schedules Summary"');
    this.getStoreOrder = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[1]/div[1]/table[1]/thead[1]/tr[1]/th[1]/a[1]",
    );
    this.getAnchorageCJDActual = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getAchorageCJDPacing = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[3]",
    );
    this.getAnchorageCJDPlan = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]",
    );
    this.getDTLAActual = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[2]",
    );
    this.getDTLAPacing = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[3]",
    );
    this.getDTLAPlan = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[4]",
    );
    this.getFHCDJRActual = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[3]/td[2]",
    );
    this.getFHCDJRPacing = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[3]/td[3]",
    );
    this.getFHCDJRPlan = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[3]/td[4]",
    );
    this.getMarkhamBMWActual = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[4]/td[2]",
    );
    this.getMarkhamBMWPacing = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[4]/td[3]",
    );
    this.getMarkhamBMWPlan = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[4]/td[4]",
    );
    this.getTampaFordActual = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[5]/td[2]",
    );
    this.getTampaFordPacing = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[5]/td[3]",
    );
    this.getTampaFordPlan = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[5]/td[4]",
    );
    this.getThornHillHondaActual = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[6]/td[2]",
    );
    this.getThornHillHondaPacing = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[6]/td[3]",
    );
    this.getThornhillHondaPlan = page.locator(
      "//body/div[1]/main[1]/div[1]/section[3]/article[1]/div[2]/div[2]/table[1]/tbody[1]/tr[6]/td[4]",
    );
    this.getTotalActual = page.locator(
      '//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[3]/td[2]',
    );
    this.getTotalPacing = page.locator(
      "//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[3]/td[3]",
    );
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
  async ValidateTheUnits() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    const a = await this.getAnchorageCJDActual.innerText();
    const ae = parseInt(a);
    const b = await this.getAchorageCJDPacing.innerText();
    const be = parseInt(b);
    const c = await this.getAnchorageCJDPlan.innerText();
    const ce = parseInt(c);
    const d = await this.getDTLAActual.innerText();
    const de = parseInt(d);
    const e = await this.getDTLAPacing.innerText();
    const ee = parseInt(e);
    const f = await this.getDTLAPlan.innerText();
    const fe = parseInt(f);
    const g = await this.getMarkhamBMWActual.innerText();
    const ge = parseInt(g);
    const h = await this.getMarkhamBMWPacing.innerText();
    const he = parseInt(h);
    const i = await this.getMarkhamBMWPlan.innerText();
    const ie = parseInt(i);
    const j = await this.getThornHillHondaActual.innerText();
    const je = parseInt(j);
    const k = await this.getThornHillHondaPacing.innerText();
    const ke = parseInt(k);
    const l = await this.getThornhillHondaPlan.innerText();
    const le = parseInt(l);
    const m = await this.getTampaFordActual.innerText();
    const me = parseInt(m);
    const n = await this.getTampaFordPacing.innerText();
    const ne = parseInt(n);
    const o = await this.getTampaFordPlan.innerText();
    const oe = parseInt(o);
    const p = await this.getFHCDJRActual.innerText();
    const pe = parseInt(p);
    const q = await this.getFHCDJRPacing.innerText();
    const qe = parseInt(q);
    const r = await this.getFHCDJRPlan.innerText();
    const re = parseInt(r);
    const totalActual = ae + de + ge + je + me + pe;
    const totalPacing = be + ee + he + ke + ne + qe;
    const TotalActual1 = await this.getTotalActual.innerText();
    const TotalActual2 = TotalActual1.replace(",", "");
    const TotalPacing1 = await this.getTotalPacing.innerText();
    const TotalPacing2 = TotalPacing1.replace(",", "");
    if (totalActual != TotalActual2) {
      console.log(
        "The total Actual units vehicles  in main dahsboard store performance widget is not matching" +
          TotalActual2 +
          " : " +
          totalActual,
      );
    }
    if (totalPacing != TotalPacing2) {
      console.log(
        "The total Pacing units vehicles  in main dahsboard store performance widget is not matching" +
          TotalPacing2 +
          " : " +
          totalPacing,
      );
    }
  }
}
module.exports = { SARSummary };
