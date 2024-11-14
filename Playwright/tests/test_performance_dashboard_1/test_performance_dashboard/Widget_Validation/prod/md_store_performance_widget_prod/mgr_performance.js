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
    this.getCalifornia=page.locator('text=CALIFORNIA [+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Nis >> div');
    this.getOxnard=page.locator('label:has-text("Oxnard Honda")');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getTotalRows=page.locator('tr');
    this.getEmployerDropdown=page.locator("text=Employee Performance Sales RepresentativeSales ManagerF&I Manager >> select");
    this.getSalesTab=page.locator('text="Sales" >> nth=0');    
    this.getSalesFIOps=page.locator(':nth-match(:text("F&I Ops"),1)');
    this.getSalesFIOpsDashboard=page.locator(':nth-match(:text("F&I Ops Dashboard"),1)');
    this.getDTLA1=page.locator('div:has-text("Oxnard Honda Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERLDTL")');
    this.getDTLA2=page.locator('label:has-text("Downtown LA Toyota")');
    this.getMainTab=page.locator(':nth-match(:text("Main"),1)');
    this.getMainStorePerformanceDashboard=page.locator(':nth-match(:text("Store Performance Dashboard"),1)');
    } 
 async goto() {
    await this.page.goto('https://speuat.lithiainc.com/main/store',{timeout:0});
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
    async SelectOxnardHonda(){
      await this.page.waitForLoadState('networkidle');      
      await this.page.waitForTimeout(9000);
      await this.getStoreSelector.nth(2).click();
      await this.getAllselector.click();
      await this.getAllselector.click();
      await this.getCalifornia.nth(2).click();
      await this.getOxnard.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
    }
    async SelectDTLA(){   
      await this.page.waitForLoadState('networkidle')   ;
      await this.page.waitForTimeout(9000);
      await this.getMainTab.click();
      await this.getMainStorePerformanceDashboard.click();
      await this.page.waitForLoadState('networkidle');
      await this.getDTLA1.nth(2).click();     
      await this.getAllselector.click();
      await this.getAllselector.click();      
      await this.getCalifornia.nth(2).click();
      await this.getDTLA2.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
    }
async ValidateTheUnitsForOxnardHonda(){
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(9000);
    await this.getEmployerDropdown.selectOption('1');
    await this.page.locator('#empContainer2 >> text=Employee').click();    
    await this.page.waitForTimeout(9000);
    let a=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]").innerText();
    let b=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[4]").innerText();
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIOpsDashboard.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(9000);
    let d=await this.page.locator("//*[@id='ctl00_ContentPlaceHolder1_FIMPgrid_ctl00__0']/td[3]/span[1]").innerText();
    let e=await this.page.locator("//*[@id='ctl00_ContentPlaceHolder1_FIMPgrid_ctl00__1']/td[3]/span[1]").innerText();
    if(a!=d){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance widget for Oxnard Honda Store : "+a+":"+d);
    }
    if(b!=e){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance widget for Oxnard Honda : "+b+":"+e);
    }
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }
  async ValidateTheUnitsForDTLA(){
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(9000);
    await this.getEmployerDropdown.selectOption('1');
    await this.page.locator('#empContainer2 >> text=Employee').click();    
    await this.page.waitForTimeout(5000);
    let a=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]").innerText();
    let b=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[2]/td[4]").innerText();
    let c=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[3]/td[4]").innerText();
    let d=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[4]/td[4]").innerText();
    let e=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[5]/td[4]").innerText();
    let f=await this.page.locator("//body/div[1]/main[1]/div[1]/section[3]/article[2]/div[1]/div[2]/div[2]/table[1]/tbody[1]/tr[6]/td[4]").innerText();
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIOpsDashboard.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(9000);
    let a1=await this.page.locator("//*[@id='ctl00_ContentPlaceHolder1_FIMPgrid_ctl00__0']/td[3]/span[1]").innerText();
    let b1=await this.page.locator("//*[@id='ctl00_ContentPlaceHolder1_FIMPgrid_ctl00__1']/td[3]/span[1]").innerText();
    let c1=await this.page.locator("//*[@id='ctl00_ContentPlaceHolder1_FIMPgrid_ctl00__2']/td[3]/span[1]").innerText();
    let d1=await this.page.locator("//*[@id='ctl00_ContentPlaceHolder1_FIMPgrid_ctl00__3']/td[3]/span[1]").innerText();
    let e1=await this.page.locator("//*[@id='ctl00_ContentPlaceHolder1_FIMPgrid_ctl00__4']/td[3]/span[1]").innerText();
    if(a!=a1){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance widget for DTLA Store : "+a+":"+a1);
    }
    if(b!=b1){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance widget for DTLA : "+b+":"+b1);
    }
    if(c!=c1){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance widget for DTLA : "+c+":"+c1);
    }
    if(d!=d1){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance widget for DTLA Store : "+d+":"+d1);
    }
    if(e!=e1){
      console.log(" The employer performance from Employer widget in main dashboard doesnt match with FI manager performance widget for DTLA : "+e+":"+e1);
    }
  }
}
module.exports = { FI };