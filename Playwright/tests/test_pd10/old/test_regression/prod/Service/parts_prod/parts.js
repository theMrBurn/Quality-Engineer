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
    this.getParts = page.locator('span:has-text("Parts")');
    this.getPartsReport = page.locator(':nth-match(:text("Parts Report"),1)');
    this.getMultiStore = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllStore = page.locator(".allSelectorIndicator");
    this.getAlaska = page.locator(
      "text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div",
    );
    this.getSelect = page.locator("#storeSelector >> text=Select");
    this.getPartsRevenue1 = page.locator(
      "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[6]/td[2]",
    );
    this.getPartsRevenue2 = page.locator(
      "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[6]/td[8]",
    );
    this.getPartsGross1 = page.locator(
      "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[2]",
    );
    this.getPartsGross2 = page.locator(
      "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[8]",
    );
    this.getPartsExpense1 = page.locator(
      "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[11]/td[2]",
    );
    this.getPartsExpense2 = page.locator(
      "//body/div[1]/form[1]/*/main[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[11]/td[8]",
    );
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainMIS1Standard = page.locator(
      ':nth-match(:text("MIS 1 (Standard)"),1)',
    );
    this.getPartsTab = page.locator("//li[4]/span[2]/span[1]");
    this.getMISPartsRevenue1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[84]/td[6]",
    );
    this.getMISPartsRevenue2 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[84]/td[13]",
    );
    this.getMISPartsGross1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[87]/td[6]",
    );
    this.getMISPartsGross2 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[87]/td[13]",
    );
    this.getMISPartsExpense1 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[126]/td[6]",
    );
    this.getMISPartsExpense2 = page.locator(
      "//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr[126]/td[13]",
    );
  }
  async goto() {
    await this.page.goto("https://speuat.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToParts() {
    await this.page.waitForTimeout(5000);
    await this.getParts.click();
    await this.getPartsReport.first().click();
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
  async SelectStores() {
    await this.getMultiStore.nth(2).click();
    await this.getAllStore.click();
    await this.getAllStore.click();
    await this.getAlaska.first().click();
    await this.getSelect.click();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateData() {
    const a = await this.getPartsRevenue1.innerText();
    const b = await this.getPartsRevenue2.innerText();
    const c = await this.getPartsGross1.innerText();
    const d = await this.getPartsGross2.innerText();
    const e = await this.getPartsExpense1.innerText();
    const f = await this.getPartsExpense2.innerText();
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();
    await this.page.waitForTimeout(5000);
    await this.getPartsTab.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    const a1 = await this.getMISPartsRevenue1.innerText();
    const b1 = await this.getMISPartsRevenue2.innerText();
    const c1 = await this.getMISPartsGross1.innerText();
    const d1 = await this.getMISPartsGross2.innerText();
    const e1 = await this.getMISPartsExpense1.innerText();
    const f1 = await this.getMISPartsExpense2.innerText();
    if (a1 != a) {
      console.log(
        " In Parts Report , The Parts Revenue doesnt match with MIS Standard for Current Month",
      );
    }
    if (b1 != b) {
      console.log(
        " In Parts Report , The Parts Revenue doesnt match with MIS Standard for Year To Date",
      );
    }
    if (c1 != c) {
      console.log(
        " In Parts Report , The Parts Gross doesnt match with MIS Standard for Current Month",
      );
    }
    if (d1 != d) {
      console.log(
        " In Parts Report , The Parts Gross doesnt match with MIS Standard for Year To Date",
      );
    }
    if (e1 != e) {
      console.log(
        " In Parts Report , The Total Parts Expense doesnt match with MIS Standard for Current Month",
      );
    }
    if (f1 != f) {
      console.log(
        " In Parts Report , The Total Parts Expense doesnt match with MIS Standard for Year To Date",
      );
    }
  }
}
module.exports = { MainStore };
