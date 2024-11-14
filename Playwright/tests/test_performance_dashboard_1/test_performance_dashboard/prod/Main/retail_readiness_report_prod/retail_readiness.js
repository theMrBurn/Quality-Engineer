// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo=page.locator("id=logo");
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    //Main Tb 
    this.getMainTab=page.locator(':nth-match(:text("Main"),1)');
    this.getConsumerOptionalityStore=page.locator(':nth-match(:text("ABC Hyundai"),2)');
    this.getMainRetailReadinessOmnichannel=page.locator(':nth-match(:text(" Retail Readiness (Omnichannel)"),1)');
    this.getMainConsumerOptionality=page.locator(':nth-match(:text(" Consumer Optionality"),1)');
  } 
     async NavigatetoMainConsumerOptionality() {      
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      await this.getMainTab.click();
      await this.getMainConsumerOptionality.click();
      await this.page.waitForLoadState('networkidle');
      await this.getConsumerOptionalityStore.click();
    }
    async NavigateToMainRetailReadinessOmnichannel() {
      await this.getMainTab.click();
      await this.getMainRetailReadinessOmnichannel.click();
      await this.page.waitForLoadState('networkidle');
      await expect(this.getSPELogo).toBeVisible();
    }
    // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
     await this.page.goto('https://speuat.lithiainc.com/main/store',{timeout:0});
  // Pause for 10 seconds, to see what's going on.
  await this.page.waitForLoadState('networkidle');
  }
   // Login
  async login() {
  await this.getUsername.click();
  await this.page.fill('input[id="i0116"]', 't_PerfDash_01@lithia.com'); //username
  await this.page.locator('id=idSIButton9').click();
  await this.getPassword.click();
  await this.page.fill('input[name="passwd"]', 'GkCow**!#w#)4E#Sj3Rb8KS*TkGduz'); //pwd
  await this.page.click('text=Sign In');
  await this.page.waitForNavigation();
  }
  async twostepauthlogin(){
    await this.page.click('id=KmsiCheckboxField');
    await this.page.click('id=idSIButton9');
  }
  async ValidateDownloadAAChevyCadillac(){
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('a:has-text("ANN ARBOR CHEVROLET CADILLAC")').click()
    ]);
  }
  async ValidateDownloadAACDJR(){
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('a:has-text("ANN ARBOR CDJR")').click()
    ]);
  }
  async ValidateDownloadAACDJR(){
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('a:has-text("ANN ARBOR CDJR")').click()
    ]);
  }
  async ValidateDownloadAABMW(){
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('a:has-text("ANN ARBOR BMW")').click()
    ]);
  }
  async ValidateDownloadAAMerc(){
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('a:has-text("ANN ARBOR MERCEDES-BENZ")').click()
    ]);
  }
  async ValidateDownloadGardenCityCDJR(){
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('a:has-text("GARDEN CITY CDJR")').click()
    ]);
  }
 }
module.exports = { MainStore };
