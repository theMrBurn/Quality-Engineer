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
    this.getContractInTransitCountWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[2]/td[2]/span[1]",
    );
    this.getContractInTransitSARCount = page.locator(
      "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]",
    );
    this.getVehicleReceivablesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[3]/td[2]/span[1]",
    );
    this.getVehicleReceivablesSARSummaryCount = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[2]/td[11]',
    );
    this.getIncenttiveReceivablesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[4]/td[2]/span[1]",
    );
    this.getIncentiveReceivablesSARSummaryCount = page.locator(
      "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]",
    );
    this.getRebateReceivablesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[5]/td[2]/span[1]",
    );
    this.getRebateReceivablesSARSummaryCount = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[3]/td[11]',
    );
    this.getWarrantyReceivableCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[6]/td[2]/span[1]",
    );
    this.getWarrantyReceivableCountSARSummaryCOunt = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[8]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]',
    );
    this.getCashSalesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[7]/td[2]/span[1]",
    );
    this.getCashSalesSARSummaryCount = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[6]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[11]',
    );
    this.getOOCContractInTransitCountWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[2]/td[4]/span[1]",
    );
    this.getOOCContractInTransitSARCount = page.locator(
      "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]",
    );
    this.getOOCVehicleReceivablesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[3]/td[4]/span[1]",
    );
    this.getOOCVehicleReceivablesSARSummaryCount = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/table[1]/tbody[1]/tr[2]/td[9]',
    );
    this.getOOCIncenttiveReceivablesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[4]/td[4]/span[1]",
    );
    this.getOOCIncentiveReceivablesSARSummaryCount = page.locator(
      "//*[@id='summaryGrid']/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]",
    );
    this.getOOCRebateReceivablesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[5]/td[4]/span[1]",
    );
    this.getOOCRebateReceivablesSARSummaryCount = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[36]/td[2]/div[1]/table[1]/tbody[1]/tr[3]/td[9]',
    );
    this.getOOCWarrantyReceivableCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[6]/td[4]/span[1]",
    );
    this.getOOCWarrantyReceivableCountSARSummaryCOunt = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[8]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]',
    );
    this.getOOCCashSalesCountInWidget = page.locator(
      "//body/div[1]/main[1]/div[2]/section[4]/article[1]/table[1]/tbody[1]/tr[7]/td[4]/span[1]",
    );
    this.getOOCCashSalesSARSummaryCount = page.locator(
      '//*[@id="summaryGrid"]/table[1]/tbody[1]/tr[6]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[9]',
    );
    this.getStore = page.locator(
      '//*[@id="MainGrid"]/div/table/tbody/tr/td/a[1]',
    );
  }
  async SelectSToreForTHornhillHonda() {
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
        "text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div",
      )
      .nth(2)
      .click();
    await this.page.locator('label:has-text("Thornhill Honda")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
  }
  async SelectStoreForFHCJDR() {
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
  async SelectStoresForDTLA() {
    await this.page
      .locator(
        'div:has-text("Farmington Hills CDJR Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
      )
      .nth(2)
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator("text=CALIFORNIA").click();
    await this.page.locator('label:has-text("Downtown LA Toyota")').click();
    await this.page.locator("#storeSelector >> text=Select").click();
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
  async ValidateTotalCount() {
    await this.page.waitForLoadState("networkidle");
    const a1 = await this.getContractInTransitCountWidget.innerText();
    const b1 = await this.getVehicleReceivablesCountInWidget.innerText();
    const c1 = await this.getIncenttiveReceivablesCountInWidget.innerText();
    const d1 = await this.getRebateReceivablesCountInWidget.innerText();
    const e1 = await this.getWarrantyReceivableCountInWidget.innerText();
    const f1 = await this.getCashSalesCountInWidget.innerText();
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState("networkidle");
    await this.getStore.first().click();
    await this.page.waitForLoadState("networkidle");
    const g1 = await this.getContractInTransitSARCount.innerText();
    const h1 = await this.getVehicleReceivablesSARSummaryCount.innerText();
    const i1 = await this.getIncentiveReceivablesSARSummaryCount.innerText();
    const j1 = await this.getRebateReceivablesSARSummaryCount.innerText();
    const k1 = await this.getWarrantyReceivableCountSARSummaryCOunt.innerText();
    const l1 = await this.getCashSalesSARSummaryCount.innerText();
    if (a1 != g1) {
      console.log(
        " SAR Summary Widget - Mismatch in Total count for Contract in Transit",
      );
      console.log(" in Widget the count is " + a1);
      console.log("in SAR Summary detail page it is " + g1);
    }
    if (b1 != h1) {
      console.log(
        " SAR Summary Widget - Mismatch in Total count for Vehicle Receivables",
      );
      console.log(" in Widget the count is " + b1);
      console.log("in SAR Summary detail page it is " + h1);
    }
    if (c1 != i1) {
      console.log(
        " SAR Summary Widget - Mismatch in Total count for Incentive Receivables",
      );
      console.log(" in Widget the count is " + c1);
      console.log("in SAR Summary detail page it is " + i1);
    }
    if (d1 != j1) {
      console.log(
        " SAR Summary Widget - Mismatch in Total count for Rebate Receivables",
      );
      console.log(" in Widget the count is " + d1);
      console.log("in SAR Summary detail page it is " + j1);
    }
    if (e1 != k1) {
      console.log(
        " SAR Summary Widget - Mismatch in Total count for Warranty Receivables",
      );
      console.log(" in Widget the count is " + e1);
      console.log("in SAR Summary detail page it is " + k1);
    }
    if (f1 != l1) {
      console.log(
        " SAR Summary Widget - Mismatch in Total count for Cash Sales",
      );
      console.log(" in Widget the count is " + f1);
      console.log("in SAR Summary detail page it is " + l1);
    }
  }
  async ValidateTotalCountForOutOfCriteria() {
    await this.page.waitForLoadState("networkidle");
    const a = await this.getOOCContractInTransitCountWidget.innerText();
    const ae = parseInt(a);
    const b = await this.getOOCVehicleReceivablesCountInWidget.innerText();
    const be = parseInt(b);
    const c = await this.getOOCIncenttiveReceivablesCountInWidget.innerText();
    const ce = parseInt(c);
    const d = await this.getOOCRebateReceivablesCountInWidget.innerText();
    const de = parseInt(d);
    const e = await this.getOOCWarrantyReceivableCountInWidget.innerText();
    const ee = parseInt(e);
    const f = await this.getOOCCashSalesCountInWidget.innerText();
    const fe = parseInt(f);
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState("networkidle");
    await this.getStore.click();
    await this.page.waitForLoadState("networkidle");
    const g = await this.getOOCContractInTransitSARCount.innerText();
    const ge = parseInt(g);
    const h = await this.getOOCVehicleReceivablesSARSummaryCount.innerText();
    const he = parseInt(h);
    const i = await this.getOOCIncentiveReceivablesSARSummaryCount.innerText();
    const ie = parseInt(i);
    const j = await this.getOOCRebateReceivablesSARSummaryCount.innerText();
    const je = parseInt(j);
    const k =
      await this.getOOCWarrantyReceivableCountSARSummaryCOunt.innerText();
    const ke = parseInt(k);
    const l = await this.getOOCCashSalesSARSummaryCount.innerText();
    const le = parseInt(l);
    if (ae != ge) {
      console.log(
        " SAR Summary Widget - Out Of Criteria- Mismatch in Total count for Contract in Transit",
      );
      console.log(" in Widget the count is " + ae);
      console.log("in SAR Summary detail page it is " + ge);
    }
    if (be != he) {
      console.log(
        " SAR Summary Widget - Out Of Criteria- Mismatch in Total count for Vehicle Receivables",
      );
      console.log(" in Widget the count is " + be);
      console.log("in SAR Summary detail page it is " + he);
    }
    if (ce != ie) {
      console.log(
        " SAR Summary Widget  - Out Of Criteria- Mismatch in Total count for Incentive Receivables",
      );
      console.log(" in Widget the count is " + ce);
      console.log("in SAR Summary detail page it is " + ie);
    }
    if (de != je) {
      console.log(
        " SAR Summary Widget - Out Of Criteria- Mismatch in Total count for Rebate Receivables",
      );
      console.log(" in Widget the count is " + de);
      console.log("in SAR Summary detail page it is " + je);
    }
    if (ee != ke) {
      console.log(
        " SAR Summary Widget - Out Of Criteria- Mismatch in Total count for Warranty Receivables",
      );
      console.log(" in Widget the count is " + ee);
      console.log("in SAR Summary detail page it is " + ke);
    }
    if (fe != le) {
      console.log(
        " SAR Summary Widget - Out Of Criteria- Mismatch in Total count for Cash Sales",
      );
      console.log(" in Widget the count is " + fe);
      console.log("in SAR Summary detail page it is " + le);
    }
  }
}
module.exports = { SARSummary };
