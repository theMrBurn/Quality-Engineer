// this POM is for /Payroll
const { expect } = require("@playwright/test");

class UsedVehicleInventory {
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
    this.getSalesUsedInventoryDetail = page.locator(
      ':nth-match(:text("Used Inventory Detail"),1)',
    );
    this.getInvoiceAging = page.locator(':nth-match(:text("Invoice Aging"),1)');
    this.getStore = page.locator(
      '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[4]/td[1]/a[1]',
    );
    this.getPTMRegional = page.locator(':nth-match(:text("PTM Regional %"),1)');
    this.getPTMNational = page.locator(':nth-match(:text("PTM National %"),1)');
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
    await this.page.waitForNavigation();
  }
  async twostepauthlogin() {
    await this.page.click("id=KmsiCheckboxField");
    await this.page.click("id=idSIButton9");
  }
  async NavigateToSalesUsedInventoryDetail() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedInventoryDetail.click();
    await this.getInvoiceAging.click();
    await this.page.waitForLoadState("networkidle");
    await this.getStore.click();
  }
  //Validate if PTM is present and visible in NVI-Invoice Aging
  async validatePTM() {
    //await expect(this.getPTMRegional).toBeVisible();
    //await expect(this.getPTMNational).toBeVisible();
    var beforeRegionalXpath = "//tr[";
    var AfterRegionalXpath = "]/td[11]";
    var beforeNationalXpath = "//tr[";
    var AfterNationalxpath = "]/td[12]";
    for (var i = 1; i < 100; i++) {
      var actualRegionalXpath = beforeRegionalXpath + i + AfterRegionalXpath;
      var actualNationalXpath = beforeNationalXpath + i + AfterNationalxpath;
      this.getRegional = this.page.locator(actualRegionalXpath);
      this.getNational = this.page.locator(actualNationalXpath);
      await expect(this.getRegional).toBeVisible();
      await expect(this.getNational).toBeVisible();
    }
  }
}
module.exports = { UsedVehicleInventory };
