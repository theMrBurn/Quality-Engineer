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
    //Sales Tab
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesSalesMgrTopProducers=page.locator(':nth-match(:text("Sales Mgr Top Producers"),1)');
    this.getImport=page.locator('text="Import"');
    this.getDomestic=page.locator('text="Domestic"');
    this.getHighLine=page.locator('text="Highline"');
    this.getSalesAnalysis=page.locator('text="Sales Analysis"');
    this.getImportColumn=page.locator('//div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]');
    this.getHighlineColumn=page.locator('//div[3]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]');
    this.getDomesticColumn=page.locator('//div[2]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]');
    this.getSalesAnalysisColumn=page.locator('//div[4]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]');
 } 
    async NavigateToSalesSalesMgrTopProducers() {
      await this.getSalesTab.click();
      await expect(this.getSalesSalesMgrTopProducers).not.toBeVisible();
    }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
     await this.page.goto('https://spedev.lithiainc.com/main/store',{timeout:0});
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
  }
  async twostepauthlogin(){
    await this.page.click('id=KmsiCheckboxField');
    await this.page.click('id=idSIButton9');
  }

  // add validations to navigate with four tabs and also add validations on one of the columns to be visible in a loop
  async ValildateIfDataisPresent(){
    await this.getImport.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.getImportColumn).toBeVisible();
    await this.getDomestic.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.getDomesticColumn).toBeVisible();
    await this.getHighLine.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.getHighlineColumn).toBeVisible();
    await this.getSalesAnalysis.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.getSalesAnalysisColumn).toBeVisible();
  }
  }
module.exports = { MainStore };
