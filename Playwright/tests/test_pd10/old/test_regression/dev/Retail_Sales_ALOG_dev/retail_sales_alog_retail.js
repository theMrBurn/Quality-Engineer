// this POM is for /Payroll
const { expect } = require("@playwright/test");

class RetailSalesAlog {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesLog = page.locator(':nth-match(:text("Sales Log"),1)');
    this.getRetailSalesAlog = page.locator(
      ':nth-match(:text("Retail Sales Log (ALOG)"),1)',
    );
    this.getTotals = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]",
    );
    this.getTotalNewVehicles = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]",
    );
    this.getTotalUsedVehicles = page.locator(
      "xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[7]",
    );
    this.getDetailTotals = page.locator('span[class="k-pager-info k-label"]');
    this.getStore = page.locator("#retailTable >> text=Vaughan Audi");
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getPfaffCheck = page.locator("text=PFAFF");
    this.getGoBUtton = page.locator('text="GO"');
    this.getSelect = page.locator("#storeSelector >> text=Select");
    this.getSelectGroup = page.locator(
      "text=12 Groups LITHIABAIERLDTLADAYPRESTIGECARBONEOTHERSUBURBANPFAFFAIRSTREAM",
    );
    this.getAllSelector = page.locator(".allSelectorIndicator");
    this.getTotalCountRows = page.locator("tr");
    this.getStockSort = page.locator("//tr[1]/th[18]/a[2]");
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
  async NavigateToSalesRetailSalesLogALOG() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(9000);
    await this.getStoreSelector.nth(2).click();
    await this.getSelectGroup.click();
    await this.getPfaffCheck.click();
    await this.page
      .locator(
        "text=12 Groups LITHIABAIERLDTLADAYPRESTIGECARBONEOTHERSUBURBANPFAFFAIRSTREAM",
      )
      .click();
    await this.getAllSelector.click();
    await this.getSelect.click();
    await this.page.waitForLoadState("networkidle");
    await this.getSalesTab.click();
    await this.getSalesLog.click();
    await this.getRetailSalesAlog.click();
    await this.page.waitForLoadState("networkidle");
  }
  async ValidateStockNumbers() {
    await this.getStore.click();
    await this.page.waitForLoadState("networkidle");
    const a = await this.getTotalCountRows.count();
    await this.getStockSort.click();
    for (var i = 1; i < a - 2; i++) {
      var beforeXpath = "//div[3]/table[1]/tbody[1]/tr[";
      var afterXpath = "]/td[18]";
      var compareXpath1 = beforeXpath + i + afterXpath;
      var compareXpath2 = beforeXpath + (i + 1) + afterXpath;
      var b = await this.page.locator(compareXpath1).innerText();
      var c = await this.page.locator(compareXpath2).innerText();
      if (b == c) {
        console.log(
          " Retail Sales Log - Vaughan Audi- The stock " +
            b +
            " is a duplicate",
        );
      }
    }
  }
}
module.exports = { RetailSalesAlog };
