// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getBodyShop = page.locator('span:has-text("Body Shop")');
    this.getBodyShopReport = page.locator(
      ':nth-match(:text("Body Shop Report"),1)',
    );
    this.getMultiStore = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllStore = page.locator(".allSelectorIndicator");
    this.getAlaska = page.locator(
      "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
    );
    this.getSelect = page.locator("#storeSelector >> text=Select");
    this.getCustomerPayRevenue1 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]",
    );
    this.getCustomerPayRevenue2 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[5]",
    );
    this.getCustomerPayRevenue3 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]",
    );
    this.getWarrantyPayRevenue3 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[8]",
    );
    this.getInternalPayRevenue1 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[2]",
    );
    this.getInternalPayRevenue2 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[5]",
    );
    this.getInternalPayRevenue3 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[8]",
    );
    this.getPartsPayRevenue1 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[4]/td[2]",
    );
    this.getPartsPayRevenue2 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[4]/td[5]",
    );
    this.getPartsPayRevenue3 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[4]/td[8]",
    );
    this.getBSRevenue1 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[6]/td[2]",
    );
    this.getBSRevenue2 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[6]/td[5]",
    );
    this.getBSRevenue3 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[6]/td[8]",
    );
    this.getBSGross1 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[2]",
    );
    this.getBSGross2 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[5]",
    );
    this.getBSGross3 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[8]",
    );
    this.getTBSE1 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[11]/td[2]",
    );
    this.getTBSE2 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[11]/td[5]",
    );
    this.getTBSE3 = page.locator(
      "//body/div[1]/form[1]/div[3]/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[11]/td[8]",
    );
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainMIS1Standard = page.locator(
      ':nth-match(:text("MIS 1 (Standard)"),1)',
    );
    this.getbodyShopTab = page.locator("//li[5]/span[2]/span[1]");
    this.getMISCustomerPayRevenue1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[2]/td[6]",
    );
    this.getMISCustomerPayRevenue3 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[2]/td[13]",
    );
    this.getMISInternalPayRevenue1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[7]/td[6]",
    );
    this.getMISInternalPayRevenue3 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[7]/td[13]",
    );
    this.getMISPartsPayRevenue1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[28]/td[6]",
    );
    this.getMISPartsPayRevenue3 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[28]/td[13]",
    );
    this.getMISBSRevenue1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[39]/td[6]",
    );
    this.getMISBSRevenue3 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[39]/td[13]",
    );
    this.getMISBSGross1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[42]/td[6]",
    );
    this.getMISBSGross3 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[42]/td[13]",
    );
    this.getMISTBSE1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[77]/td[6]",
    );
    this.getMISTBSE3 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[5]/div[2]/table[1]/tbody[1]/tr[77]/td[13]",
    );
  }
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToBodyShop() {
    await this.page.waitForTimeout(5000);
    await this.getBodyShop.click();
    await this.getBodyShopReport.first().click();
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
  async SelectStores() {
    await this.getMultiStore.nth(2).click();
    await this.getAllStore.click();
    await this.getAllStore.click();
    await this.getAlaska.first().click();
    await this.getSelect.click();
    await this.page.waitForLoadState("networkidle");
  }

  async ValidateData() {
    const a = await this.getCustomerPayRevenue1.innerText();
    const c = await this.getCustomerPayRevenue3.innerText();
    const g = await this.getInternalPayRevenue1.innerText();
    const i = await this.getInternalPayRevenue3.innerText();
    const j = await this.getPartsPayRevenue1.innerText();
    const l = await this.getPartsPayRevenue3.innerText();
    const m = await this.getBSRevenue1.innerText();
    const o = await this.getBSRevenue3.innerText();
    const p = await this.getBSGross1.innerText();
    const r = await this.getBSGross3.innerText();
    const s = await this.getTBSE1.innerText();
    const u = await this.getTBSE3.innerText();
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();
    await this.getbodyShopTab.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    const a1 = await this.getMISCustomerPayRevenue1.innerText();
    const c1 = await this.getMISCustomerPayRevenue3.innerText();
    const g1 = await this.getMISInternalPayRevenue1.innerText();
    const i1 = await this.getMISInternalPayRevenue3.innerText();
    const j1 = await this.getMISPartsPayRevenue1.innerText();
    const l1 = await this.getMISPartsPayRevenue3.innerText();
    const m1 = await this.getMISBSRevenue1.innerText();
    const o1 = await this.getMISBSRevenue3.innerText();
    const p1 = await this.getMISBSGross1.innerText();
    const r1 = await this.getMISBSGross3.innerText();
    const s1 = await this.getMISTBSE1.innerText();
    const u1 = await this.getMISTBSE3.innerText();
    if (a1 != a) {
      console.log(
        " In Body Shop Report , The Customer Pay Revenue doesnt match with MIS Standard for Current Month",
      );
    }
    if (c1 != c) {
      console.log(
        " In Body Shop Report , The Customer Pay Revenue doesnt match with MIS Standard for Year To Date",
      );
    }
    if (j1 != j) {
      console.log(
        " In Body Shop Report , The Parts Pay Revenue doesnt match with MIS Standard for Current Month",
      );
    }
    if (l1 != l) {
      console.log(
        " In Body Shop Report , The Parts Pay Revenue doesnt match with MIS Standard for Year To Date",
      );
    }
    if (g1 != g) {
      console.log(
        " In Body Shop Report , The Internal Pay Revenue doesnt match with MIS Standard for Current Month",
      );
    }
    if (i1 != i) {
      console.log(
        " In Body Shop Report , The Internal Pay Revenue doesnt match with MIS Standard for Year To Date",
      );
    }
    if (m1 != m) {
      console.log(
        " In Body Shop Report , The Body Shop Revenue doesnt match with MIS Standard for Current Month",
      );
    }
    if (o1 != o) {
      console.log(
        " In Body Shop Report , The Body Shop Revenue doesnt match with MIS Standard for Year To Date",
      );
    }
    if (p1 != p) {
      console.log(
        " In Body Shop Report , The Body Shop Gross doesnt match with MIS Standard for Current Month",
      );
    }
    if (r1 != r) {
      console.log(
        " In Body Shop Report , The Body Shop Gross doesnt match with MIS Standard for Year To Date",
      );
    }
    if (s1 != s) {
      console.log(
        " In Body Shop Report , The Total Body Shop Gross doesnt match with MIS Standard for Current Month",
      );
    }
    if (u1 != u) {
      console.log(
        " In Body Shop Report , The Total Body Shop Gross match with MIS Standard for Year To Date",
      );
    }
  }
}
module.exports = { MainStore };
