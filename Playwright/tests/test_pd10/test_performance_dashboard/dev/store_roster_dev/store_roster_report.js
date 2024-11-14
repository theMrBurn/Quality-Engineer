// this POM is for /Payroll
const { expect } = require("@playwright/test");

class StoreLeadershipReport
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getMainTab=page.locator(':nth-match(:text("Main"),1)');
    this.getMainStoreRosters1=page.locator(':nth-match(:text("Store Rosters"),1)');
    this.getMainStoreRosters2=page.locator(':nth-match(:text("Store Rosters"),2)');
    this.getStore=page.locator("//body/div[1]/form[1]/div[3]/div[3]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[10]");
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
    async NavigateToMainStoreRosterReport() {
      await this.page.waitForLoadState('networkidle');
      await this.getMainTab.click();
      await this.getMainStoreRosters1.click();
      await this.getMainStoreRosters2.click();
      await this.page.waitForLoadState('networkidle');
      await this.getStore.click();
      await this.page.waitForLoadState('networkidle');
    }
  }
module.exports = { StoreLeadershipReport };