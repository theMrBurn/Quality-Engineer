// this POM is for /Payroll
const { expect } = require("@playwright/test");

class UsedVehicleInventory
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('span:has-text("Sales")');
    this.getSalesUsedVehicle=page.locator('span:has-text("Used Vehicle")');
    this.getSalesUsedInventoryDetail=page.locator('a:has-text("Used Inventory Detail")');
    this.getUsedInventorySummaryTotals=page.locator('text="Totals"');
    this.getUsedInventoryOnline=page.locator(':nth-match(:text("Online"),1)');
    this.getUsedInventoryVehicleOnlineTotalsCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/a[1]');
    this.getUsedInventoryVehicleOnlineTotalsCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI0PicsTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]/a[1]');
    this.getUVI0PicsTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI19PicsTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]');
    this.getUVI19PicsTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI1021PicsTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[5]/a[1]');
    this.getUVI1021PicsTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI21PicsTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/a[1]');
    this.getUVI21PicsTotalCount2=page.locator('span[class="k-pager-info k-label"]');
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
    this.getFlorida=page.locator('text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div');
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
      await this.page.waitForTimeout(5000);
    }
  async NavigateToSalesUsedInventoryDetail() {
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.first().click();
    await this.getSalesUsedVehicle.first().click();
    await this.getSalesUsedInventoryDetail.first().click();
    await this.getUsedInventoryOnline.click();
    await this.page.waitForLoadState('networkidle');
  }
    // To Validate duplicate Store Data
async ValidateDuplicateStore(){  
   await this.page.waitForLoadState('networkidle');
   const a= await this.getTotalRows.count();
   for(var i=1;i<4;i++)
   {
     var beforeXpath="//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
     var afterXpath="]/td[1]/a[1]";
     var compareXpath1=beforeXpath+i+afterXpath;
     var compareXpath2=beforeXpath+(i+1)+afterXpath;
     var b=await this.page.locator(compareXpath1).innerText();
     var c=await this.page.locator(compareXpath2).innerText();
     if(b==c)
     {
      console.log("NVI - Online - The store name "+(await this.page.locator(compareXpath2).innerText())+" is a duplicate");
     }
     }return;
   }
 // To Validate Duplicate VIN
 async ValidateDuplicateVIN(){  
   await this.page.waitForLoadState('networkidle');  
   const z= await this.getTotalRows.count();
   for(var i =1;i<4;i++)
   {     
      var StoreBeforeXpath='//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[';
      var StoreAfterXpath=']/td[1]/a[1]';
      var StoreActualXpath=StoreBeforeXpath+i+StoreAfterXpath;
      this.getStoreName=this.page.locator(StoreActualXpath);
      var a=await this.getStoreName.innerText();
      await this.getStoreName.click(); 
      await this.page.waitForLoadState('networkidle');
      await this.page.locator('text=100select >> span').nth(2).click();
      await this.page.locator('li[role="option"]:has-text("500")').click();
      await this.page.waitForTimeout(5000);
      var b =await this.getTotalRows.count(); 
      for(var i=b;i<b;i++){
      var VINBeforeXpath='//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[';
      var VINAfterXpath=']/td[6]';
      var VINActualXpath='';
      var compareXpath1=VINBeforeXpath+i+VINAfterXpath;
      var compareXpath2=VINBeforeXpath+(i+1)+VINAfterXpath;
      var b=await this.page.locator(compareXpath1).innerText();
      var c=await this.page.locator(compareXpath2).innerText();
      if(b==c)
      {
         console.log("UVI - Online - The store"+a+" has duplicate VINS");
      }
      await this.page.goBack();
   }
   return;
 }
   }
 }
module.exports = { UsedVehicleInventory };