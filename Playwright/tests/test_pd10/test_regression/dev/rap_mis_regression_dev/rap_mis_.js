// this POM is for /Payroll
const { expect } = require("@playwright/test");

class RapReport
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo=page.locator("id=logo");
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getServiceDashboard=page.locator(':nth-match(:text("Service"),1)');
    this.getServiceRAPReport=page.locator(':nth-match(:text("RAP Report"),1)');
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getVirginia=page.locator('text=VIRGINIA[+]Chantilly NissanChesapeake AcuraChesapeake ChevroletChesapeake HondaC >> div');
    this.getChesapeake=page.locator('label:has-text("Chesapeake Acura")');
    this.getSelector=page.locator('#storeSelector >> text=Select');
    this.getMainTab=page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS=page.locator('text="MIS"');
    this.getMainMIS1Standard=page.locator(':nth-match(:text("MIS 1 (Standard)"),1)');
    this.getServiceDetail=page.locator('//li[3]/span[2]/span[1]');
  }
  async SelectStoresForRegression(){
   await this.page.waitForLoadState('networkidle');
   await this.getStoreSelector.nth(2).click();
   await this.getAllselector.click();
   await this.getAllselector.click();
   await this.getVirginia.nth(2).click();
   await this.getChesapeake.click();
   await this.getSelector.click();
   await this.page.waitForTimeout(7000);
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
  async NavigateToServiceRAPReport(){    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getServiceDashboard.click();
    await this.getServiceRAPReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async ValidateData(){
    await this.page.locator("//*[@id='listView']/li/a[1]").click();
    await this.page.waitForTimeout(5000);
    const c=await this.page.locator("//*[@id='detailView']/div[3]/table[1]/tbody[1]/tr[10]/td[2]/div[1]/table[1]/tbody[1]/tr[1]/td[6]").innerText();
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();
    await this.page.waitForLoadState('networkidle');
    await this.getServiceDetail.click();
    await this.page.waitForTimeout(5000);
    const a=await this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[3]/div[2]/table[1]/tbody[1]/tr[20]/td[6]").innerText();
    if(a!=c){
      console.log(" The total CP cost is not matching: "+a+":"+c);
    }
  }
  }
module.exports = { RapReport };
