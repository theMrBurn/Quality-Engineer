// this POM is for /Payroll
const { expect } = require("@playwright/test");

class UVD
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');    
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesUsedVehicle=page.locator(':nth-match(:text("Used Vehicle"),1)');
    this.getSalesUsedVehicleDashboard=page.locator(':nth-match(:text("Used Vehicle Dashboard"),1)');
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getMichigan1=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div');
    this.getMichiganDropdownn=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc');
    this.getMichiganStore2=page.locator('label:has-text("Farmington Hills CDJR")');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getGoBUtton=page.locator('text="GO"');
    this.getTotalRows=page.locator('tr');
    this.getAlaska=page.locator('text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div');
    this.getAnchorageCJD=page.locator('label:has-text("Anchorage CJD")');
    this.getCanada=page.locator('text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A  >> div');
    this.getThornhillHonda=page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW=page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida=page.locator('text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div');
    this.getTampaFord=page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota=page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia=page.locator('text=CALIFORNIA');
    this.getRetailInventoryTotal=page.locator("//*[@id='isGrid']/div[1]/table[1]/tbody[1]/tr[1]/td[3]");
    this.getRetailInventoryLink=page.locator("//*[@id='isGrid']/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]");    
    this.getWSInventoryTotal=page.locator("//*[@id='isGrid']/div[1]/table[1]/tbody[1]/tr[2]/td[3]");
    this.getWSInventoryLink=page.locator("//*[@id='isGrid']/div[1]/table[1]/tbody[1]/tr[2]/td[1]/a[1]");  
    this.getIncomingTotal=page.locator("//*[@id='isGrid']/div[1]/table[1]/tbody[1]/tr[3]/td[3]");
    this.getIncoming=page.locator("//*[@id='isGrid']/div[1]/table[1]/tbody[1]/tr[3]/td[1]/a[1]");
    this.getTotal=page.locator("//*[@id='isGrid']/div[1]/table[1]/tfoot[1]/tr[1]/td[3]");
    this.getTotalLink=page.locator("//*[@id='isGrid']/div[1]/table[1]/tfoot[1]/tr[1]/td[1]/a[1]");
    this.getFooter=page.locator("//*[@id='tabstrip-1']/div[1]/div[1]/span[2]");
  } 
  async Banner(){
    if(expect(this.page.locator("text=Continue")).toBeVisible())
    {
      await this.page.locator("text=Continue");
    }
    else{
      return;
    }
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
    }
    async twostepauthlogin(){
      await this.page.click('id=KmsiCheckboxField');
      await this.page.click('id=idSIButton9');
    }
    async SelectStoresForRegression(){
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      await this.getStoreSelector.nth(2).click();
      await this.getAllselector.click();
      await this.getAllselector.click();
      await this.getAlaska.nth(2).click();
      await this.getAnchorageCJD.click();
      await this.page.waitForTimeout(2000);
      await this.getCalifornia.click();
      await this.getDTLAToyota.click();  
      await this.page.waitForTimeout(2000);   
      await this.getCanada.first().click();   
      await this.page.waitForTimeout(2000);
      await this.getFlorida.nth(2).click();
      await this.getTampaFord.click();
      await this.page.waitForTimeout(2000);
      await this.getMichigan1.nth(2).click();
      await this.getMichiganStore2.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
     }
     async NavigateToSalesUsedVehicleDashboard() {
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(9000);
      await this.getSalesTab.first().click();
      await this.getSalesUsedVehicle.click();
      await this.getSalesUsedVehicleDashboard.click();
      await this.page.waitForLoadState('networkidle');
    }
     async ValidateUnits(){      
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(10000);
        const a=await this.getRetailInventoryTotal.innerText();
        const b=await this.getWSInventoryTotal.innerText();
        const c=await this.getIncomingTotal.innerText();
        const d=await this.getTotal.innerText();
        await this.getRetailInventoryLink.click();
        await this.page.waitForLoadState('networkidle');
        const e=await this.getFooter.innerText();
        const ee=e.slice(10,-5);
        await this.page.goBack();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000);
        await this.getWSInventoryLink.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000);
        const f=await this.getFooter.innerText();
        const fe=f.slice(10,-5);
        await this.page.goBack();
        await this.getIncoming.click();
        await this.page.waitForLoadState('networkidle');
        const g=await this.getFooter.innerText();
        const ge=g.slice(10,-5);
        await this.page.goBack();
        await this.getTotalLink.click();
        await this.page.waitForLoadState('networkidle');
        const i=await this.getFooter.innerText();
        const ie=i.slice(10,-5);
        await this.page.goBack();
        if(a!=ee){
          console.log(" Used Vehicle Dahsboard - Inventory sales Widget - Retail Inventory units are not matching between widget and detail page.");
        }
        if(b!=fe){
          console.log(" Used Vehicle Dahsboard - Inventory sales Widget - W/S Inventory units are not matching between widget and detail page.");
        }
        if(c!=ge){
          console.log(" Used Vehicle Dahsboard - Inventory sales Widget - Incoming units are not matching between widget and detail page.");
        }        
        if(d!=ie){
          console.log(" Used Vehicle Dahsboard - Inventory sales Widget - Total units are not matching between widget and detail page.");
        }
     }

 }
module.exports = { UVD };