// this POM is for /Payroll
const { expect } = require("@playwright/test");

class RetailUnits {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getNewRetailUnits = page.locator(
      ':nth-match(:text("New Vehicle Retail Units"),1)',
    );
    this.getUsedRetailUnits = page.locator(
      ':nth-match(:text("Used Vehicle Retail Units"),1)',
    );
    this.getStoreNVI = page.locator("#newTable >> text=ABC Hyundai");
    this.getStoreUVI = page.locator("#usedTable >> text=ABC Hyundai");
    this.gettotalrows = page.locator("tr");
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
  async ValidateStoreNameForNewRetailUnits() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    this.getNewRetailUnits.click();
    await this.page.waitForLoadState("networkidle");
    const g = await this.getStoreNVI.innerText();
    await this.getStoreNVI.click();
    await this.page.waitForTimeout(5000);
    const a = await this.gettotalrows.count();
    for (var i = 1; i < a - 2; i++) {
      var beforeXpath =
        "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      var afterXpath = "]/td[3]";
      var actualXpath = beforeXpath + i + afterXpath;
      await expect(this.page.locator(actualXpath)).toHaveText("ABC Hyundai");
    }
  }
  async ValidateStoreNameForUsedRetailUnits() {
    this.getUsedRetailUnits.click();
    await this.page.waitForLoadState("networkidle");
    const g = await this.getStoreUVI.innerText();
    await this.getStoreUVI.click();
    await this.page.waitForTimeout(5000);
    const a = await this.gettotalrows.count();
    for (var i = 1; i < a - 2; i++) {
      var beforeXpath =
        "//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
      var afterXpath = "]/td[3]";
      var actualXpath = beforeXpath + i + afterXpath;
      await expect(this.page.locator(actualXpath)).not.toHaveText("test");
      await expect(this.page.locator(actualXpath)).toHaveText("ABC Hyundai");
    }
  }
}
module.exports = { RetailUnits };
