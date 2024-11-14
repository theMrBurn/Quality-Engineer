// this POM is for /Payroll
const { expect } = require("@playwright/test");

class BP
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getBP=page.locator(':nth-match(:text("Booked and Pending"),1)');
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
    this.getTotalCountRows=page.locator("tr");
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
    async NavigateToSalesBookedandPending() {     
      await this.page.waitForLoadState('networkidle'); 
      await this.page.waitForTimeout(9000);
      await this.getSalesTab.click();
      await this.getBP.click();
      await this.page.waitForLoadState('networkidle');
    }
async ValidateDealNumbers(){  
  await this.page.waitForLoadState('networkidle');  
  const d= await this.getTotalCountRows.count();
  for(var i=1;i<5;i++){
    const StoreBeforeXpath="//*[@id='BPSummary']/div[3]/table[1]/tbody[1]/tr[";
    const StoreAfterXpath="]/td[1]/a[1]";
    var StoreActualXpath=StoreBeforeXpath+i+StoreAfterXpath;
    var StoreName=await this.page.locator(StoreActualXpath).innerText();
    await this.page.locator(StoreActualXpath).click();
    await this.page.waitForLoadState('networkidle');
    const a= await this.getTotalCountRows.count();
    for(var j=1;j<(a-2);j++)
    {
      var beforeXpath="//*[@id='BPDetailTable']/div[3]/table[1]/tbody[1]/tr[";
      var afterXpath="]/td[5]";
      var compareXpath1=beforeXpath+j+afterXpath;
      var compareXpath2=beforeXpath+(j+1)+afterXpath;
      var b=await this.page.locator(compareXpath1).innerText();
      var c=await this.page.locator(compareXpath2).innerText();
      if(b==c)
      {
        console.log(" Booked and Pending for"+StoreName+" has duplicate Deal : "+b);
      }
      }
      await this.page.goBack();
      await this.page.waitForLoadState();
    }
}
 }
module.exports = { BP };