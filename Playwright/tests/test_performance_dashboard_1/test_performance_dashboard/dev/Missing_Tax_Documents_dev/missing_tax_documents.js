// this POM is for /Payroll
const { expect } = require("@playwright/test");

class TitleTracking
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getOfficeTab=page.locator('text="Office" >> nth=0');
    this.getOfficeMIssingTaxDocument=page.locator(':nth-match(:text("Missing Tax Documents"),1)');
  }
async goto() {
    await this.page.goto('https://spedev.lithiainc.com/main/store',{timeout:0});
 // Pause for 10 seconds, to see what's going on.
 await this.page.waitForLoadState('networkidle');
 }
 async login() {
    await this.getUsername.click();
    await this.page.fill('input[id="i0116"]', 't_PerfDash_01@lithia.com'); //username
    await this.page.locator('id=idSIButton9').click();
    await this.getPassword.click();
    await this.page.fill('input[name="passwd"]', 'GkCow**!#w#)4E#Sj3Rb8KS*TkGduz'); //pwd
    await this.page.click('text=Sign In');
    }
    async twostepauthlogin(){
      await this.page.click('id=KmsiCheckboxField');
      await this.page.click('id=idSIButton9');
    }
  async NavigateToOfficeMissingTaxDocument() {
    await this.getOfficeTab.click();
    await this.getOfficeMIssingTaxDocument.click();
    await this.page.waitForLoadState('networkidle');
    //assert on url;
  }
}
module.exports = { TitleTracking };