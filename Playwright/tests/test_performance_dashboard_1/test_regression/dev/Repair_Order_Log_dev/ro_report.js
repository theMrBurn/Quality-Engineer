// this POM is for /Payroll
const { expect } = require("@playwright/test");

class RO
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
    this.getServiceROReport=page.locator(':nth-match(:text("Repair Order Log"),1)');
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
  async NavigateToServiceROReport(){    
    await this.page.waitForLoadState('networkidle');
    await this.getServiceDashboard.click();
    await this.getServiceROReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async ValidateDuplicateStore(){
    await this.page.waitForLoadState('networkidle');
    for( var i=1;i<336;i++){
      var BeforeXPath='//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[';
      var AfterXpath=']/td[1]/a[1]';
      var ActualXpath1=BeforeXPath+i+AfterXpath;
      var ActualXpath2=BeforeXPath+(1+i)+AfterXpath;
      var g=await this.page.locator(ActualXpath1).innerText();      
      var h=await this.page.locator(ActualXpath2).innerText();
      if(g==h){
        console.log("The store "+g+" has duplicate store in RO Log");
      }
    }
  }
  async ValidatetheROData(){
    await this.page.waitForLoadState('networkidle');
    for( var j=1;j<3;j++){      
      const BeforeXpathRO="//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[";
      var AfterXpathOpenRO="]/td[4]";
      var AfterXpathClosedRO="]/td[3]";
      var ActualOpenRO=BeforeXpathRO+j+AfterXpathOpenRO;
      var ActualClosedRO=BeforeXpathRO+j+AfterXpathClosedRO; 
      var a=await this.page.locator(ActualOpenRO).innerText();
      var a1=parseInt(a);
      var b=await this.page.locator(ActualClosedRO).innerText();
      var b1=parseInt(b);
      let sum=a1+b1;
      var AfterStoreName="]/td[1]/a[1]";
      var Storename=BeforeXpathRO+j+AfterStoreName;
      var Storename1=await this.page.locator(Storename).innerText();
      await this.page.locator(Storename).click();
      await this.page.waitForLoadState("networkidle");
      var c=await this.page.locator("//*[@id='RoGrid']/div[4]/span[2]").innerText();
      var c1=c.replace('1 - 50 of ','');
      var c2=c1.replace(' items','');
      var total=parseInt(c2);
      if(sum!=total)
      {
        console.log(c);
        console.log(" in RO Log Report for the store "+Storename1 + " the total between summary and detail is mismatch "+ sum +":"+total);
      }
      await this.page.goBack();
      await this.page.waitForLoadState('networkidle');
    }
  }
  }
module.exports = { RO };
