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
    this.getOfficeTitleTracking=page.locator(':nth-match(:text("Title Tracking Report"),1)');
    this.getCurrentInv=page.locator(':nth-match(:text("Current Inv"),1)');
    this.getStore=page.locator('//a[@href="/reports/CITTDetail?CoNo=152"]');
    this.getVIN1=page.locator('text="5N1DR3BA8NC236430"');
    this.getVIN2=page.locator('text="1N4BL4CV7NN359182"');
    this.getVIN3=page.locator('text="1N4BL4CVXNN362819"');
    this.getVIN4=page.locator('text="1N4BL4CV2NN364287"');
    this.getVIN5=page.locator('text="1N4BL4EVXNN401955"');
    this.getVIN6=page.locator('text="5N1DR3DGXNC266207"');
    this.getVIN7=page.locator('text="5N1DR3DGXNC263212"');
    this.getVIN8=page.locator('text="1N4BL4EW2NN403174"');
    this.getVIN9=page.locator('text="1N4BL4EVXNN405262"');
    this.getVIN10=page.locator('text="1N4BL4CV8NN407465"');
    this.getVIN11=page.locator('text="1N4BL4EV8NN422223"');
      }
async goto() {
    await this.page.goto('https://speuat.lithiainc.com/Reports/TitleTrackingSummary',{timeout:0});
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
  async NavigateToOfficeTitleTracking() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getOfficeTab.click();
    await this.getOfficeTitleTracking.click();
    await this.page.waitForLoadState('networkidle');
    await this.getCurrentInv.click();    
    await this.page.waitForLoadState('networkidle');
    await this.getStore.click();
    await this.page.waitForLoadState('networkidle');
  }  
 async validateVIN(){  
  await this.getCurrentInv.click();    
  await this.page.waitForLoadState('networkidle');
  await this.getStore.click();
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(7000);
  await expect(this.getVIN1).not.toBeVisible();
  await expect(this.getVIN2).not.toBeVisible();
  await expect(this.getVIN3).not.toBeVisible();
  await expect(this.getVIN4).not.toBeVisible();
  await expect(this.getVIN5).not.toBeVisible();
  await expect(this.getVIN6).not.toBeVisible();
  await expect(this.getVIN7).not.toBeVisible();
  await expect(this.getVIN8).not.toBeVisible();
  await expect(this.getVIN9).not.toBeVisible();
  await expect(this.getVIN10).not.toBeVisible();
  await expect(this.getVIN11).not.toBeVisible();
 }
 
}
module.exports = { TitleTracking };