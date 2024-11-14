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
    this.getServiceDashboard=page.locator(':nth-match(:text("Service"),1)');
    this.getServiceAdvisorReport=page.locator('text="Advisor Report"');
    this.getStore=page.locator('a:has-text("Anchorage Chevrolet")');
    this.getCarrot=page.locator('//*[@id="ExpandAll"]/div[1]');
    this.getTotalEmployees=page.locator('tr');
    this.getInnerRows=page.locator('tr');
    this.getTotalReports=page.locator('li');
    this.getTotalRows=page.locator('tr');
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getMichiganDropdownn=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc');
    this.getMichiganStore1=page.locator('label:has-text("Farmington Hills Audi")');
    this.getMichiganStore2=page.locator('label:has-text("Farmington Hills CDJR")');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getGoBUtton=page.locator('text="GO"');
    this.getTotalRows=page.locator('tr');
    this.getAlaska=page.locator('text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div');
    this.getAnchorageCJD=page.locator('label:has-text("Anchorage CJD")');
    this.getCanada=page.locator('text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div');
    this.getThornhillHonda=page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW=page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida=page.locator('text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral HyundaiDoral KiaDoral VolkswagenFor >> div');
    this.getTampaFord=page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota=page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia=page.locator('text=CALIFORNIA[+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Niss >> div');
    this.getMichigan1=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div');
  }
  async SelectStoresForRegression(){
   await this.page.waitForLoadState('networkidle');
   await this.getStoreSelector.nth(2).click();
   await this.getAllselector.click();
   await this.getAllselector.click();
   await this.getAlaska.nth(2).click();
   await this.getAnchorageCJD.click();
   await this.getCalifornia.nth(2).click();
   await this.getDTLAToyota.click();
   await this.getCanada.nth(2).click();
   await this.getThornhillHonda.click();
   //await this.getMarkhamBMW.click();
   await this.getFlorida.nth(2).click();
   await this.getTampaFord.click();
   await this.getMichigan1.nth(2).click();
   await this.getMichiganStore2.click();
   await this.getSelectButton.click();
   await this.page.waitForLoadState('networkidle');
  }  
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
     await this.page.goto('https://spedev.lithiainc.com/main/store',{timeout:0});
  // Pause for 10 seconds, to see what's going on.
  await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceAdvisorReport(){
    await this.getServiceDashboard.click();
    await this.getServiceAdvisorReport.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.getSPELogo).toBeVisible();
  }
  async ValidateDuplicateStore(){
    await this.page.waitForLoadState('networkidle');
    for( var i=1;i<5;i++){
      var BeforeXPath='//*[@id="retailTable"]/div[3]/table[1]/tbody[1]/tr[';
      var AfterXpath=']/td[1]/a[1]';
      var ActualXpath1=BeforeXPath+i+AfterXpath;
      var ActualXpath2=BeforeXPath+(1+i)+AfterXpath;
      var g=await this.page.locator(ActualXpath1).innerText();      
      var h=await this.page.locator(ActualXpath2).innerText();
      if(g==h){
        console.log("The store "+g+" has duplicate store");
      }
    }
  }
  async ValidateThePresenceOfData(){
    for(var i=1;i<5;i++){
    var BeforeXPath='//*[@id="retailTable"]/div[3]/table[1]/tbody[1]/tr[';
    var AfterXpath=']/td[1]/a[1]';
    var ActualXpath1=BeforeXPath+i+AfterXpath;
    await this.page.locator(ActualXpath1).click();
    await this.page.waitForLoadState('networkidle');
    var a=await this.getTotalEmployees.count();
    await this.getCarrot.click();
    await this.page.waitForTimeout(6000);
    var b=await this.getInnerRows.count();
    for (var i=1;i<=a;i+=2)
    {
      var beforeXpath='//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[';
      var afterxpath=']/td[1]/p[1]/span[2]/span[1]';
      var ActualXpath=beforeXpath+(i)+afterxpath;
      expect(this.page.locator(ActualXpath)).toBeTruthy();
      for (var j=1;j<4;j++)
      {
        var InnerbeforeXpath='//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[';
        var Innerafterxpath=']/td[4]';
        var InnerActualXpath=InnerbeforeXpath+j+Innerafterxpath;
        await expect(this.page.locator(InnerActualXpath)).toBeTruthy();
      }
    } await this.page.goBack();   
  }return;
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

 }
module.exports = { MainStore };
