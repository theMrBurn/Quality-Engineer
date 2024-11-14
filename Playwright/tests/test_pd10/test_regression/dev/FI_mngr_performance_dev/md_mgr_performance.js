// this POM is for /Payroll
const { expect } = require("@playwright/test");

class FI
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getTotalActual=page.locator('//*[@id="PerformanceTracking"]/table[1]/tbody[1]/tr[3]/td[2]');
    this.getTotalPacing=page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[3]/td[3]");
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getMichigan=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div');
    this.getMichiganStore2=page.locator('label:has-text("Troy Jaguar Land Rover")');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getTotalRows=page.locator('tr');
    this.getEmployerDropdown=page.locator("text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select");
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesFIOps=page.locator(':nth-match(:text("F&I Ops"),1)');
    this.getSalesFIManagerPerformance=page.locator(':nth-match(:text("F&I Manager Performance"),1)');
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
    };
    async twostepauthlogin(){
      await this.page.click('id=KmsiCheckboxField');
      await this.page.click('id=idSIButton9');
    };
    async SelectTroyLandRover(){
      await this.page.waitForLoadState('networkidle');
      await this.getStoreSelector.nth(2).click();
      await this.getAllselector.click();
      await this.getAllselector.click();
      await this.getMichigan.nth(2).click();
      await this.getMichiganStore2.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
    }
async ValidateTheUnits(){
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(9000);
    await this.getEmployerDropdown.selectOption('1');
    await this.page.locator('#empContainer2 >> text=Employee').click();    
    await this.page.waitForTimeout(5000);
    let a=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]").innerText();
    let b=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[4]").innerText();
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIManagerPerformance.click();    
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('//a[contains(@href, "FIManagerPerf?CoNo=427")]').click();
    await this.page.waitForLoadState('networkidle');
    let c=await this.page.locator("//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[7]/td[1]/p[1]/span[2]/span[1]").innerText();
    let d=await this.page.locator("//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[12]/td[1]/p[1]/span[2]/span[1]").innerText();
    if(a!=c){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance for Troy JLR Store : "+a+":"+c);
    }
    if(b!=d){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance for Troy JLR Store : "+b+":"+d);
    }
  }
}
module.exports = { FI };