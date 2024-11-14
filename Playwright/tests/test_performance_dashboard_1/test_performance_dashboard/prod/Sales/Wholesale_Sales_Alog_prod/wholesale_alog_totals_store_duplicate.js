// this POM is for /Payroll
const { expect } = require("@playwright/test");

class WholesaleAlog
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesLog=page.locator(':nth-match(:text("Sales Log"),1)');
    this.getWholesaleAlog=page.locator(':nth-match(:text("Wholesale Log (ALOG)"),1)');
    this.getTotals=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]');
    this.getTotalCount=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]');
    this.getDetailTotals=page.locator('span[class="k-pager-info k-label"]');
    this.getInventoryType=page.locator('text=Column SettingsInventoryType >> span');
    this.getFilterSelect=page.locator('text=Apply filter >> span');
    this.getFilterButton=page.locator('button:has-text("Filter")');
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getMichigan=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div');
    this.getMichiganDropdownn=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc');
    this.getMichiganStore1=page.locator('label:has-text("Farmington Hills Audi")');
    this.getMichiganStore2=page.locator('label:has-text("Farmington Hills CDJR")');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getGoBUtton=page.locator('text="GO"');
    this.getTotalRows=page.locator('tr');
    this.getAlaska=page.locator('text=ALASKA[+]Anchorage BMW MiniAnchorage ChevroletAnchorage CJDAnchorage HyundaiAnch >> div');
    this.getAnchorageCJD=page.locator('label:has-text("Anchorage CJD")');
    this.getCanada=page.locator('text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruMarkham A');
    this.getThornhillHonda=page.locator('label:has-text("Thornhill Honda")');
    this.getMarkhamBMW=page.locator('label:has-text("Markham BMW Mini")');
    this.getFlorida=page.locator('text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral Hyundai GenesisDoral KiaDoral Volks >> div');
    this.getTampaFord=page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota=page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia=page.locator('text=CALIFORNIA [+]Bay Area Airstream AdventuresCalabasas AudiCarson NissanClovis Nis >> div');
    this.getMichigan1=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div');
    this.getStockAsc=page.locator('//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[18]/a[2]');
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
   await this.getCanada.click();
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
    async NavigateToSalesWholesaleLogALOG() {    
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(11000);
      await this.getSalesTab.click();
      await this.getSalesLog.click();
      await this.getWholesaleAlog.click();
      await this.page.waitForLoadState('networkidle');
    }
 // To Validate duplicate Store Data
 async ValidateDuplicateStore(){  
  await this.page.waitForLoadState('networkidle');
  const a= await this.getTotalRows.count();
  for(var i=1;i<(a-3);i++)
  {
    var beforeXpath="//*[@id='wholesaleTable']/div[3]/table[1]/tbody[1]/tr[";
    var afterXpath="]/td[1]/a[1]";
    var compareXpath1=beforeXpath+i+afterXpath;
    var compareXpath2=beforeXpath+(i+1)+afterXpath;
    var b=await this.page.locator(compareXpath1).innerText();
    var c=await this.page.locator(compareXpath2).innerText();
    if(b==c)
    {
     console.log("WholeSale Alog - The store name "+(await this.page.locator(compareXpath2).innerText())+" is a duplicate");
    }
    }return;
  }
// To Validate Duplicate Stock
async ValidateDuplicateStock(){  
  await this.page.waitForLoadState('networkidle');  
  const z= await this.getTotalRows.count();
  for(var i =1;i<(z-3);i++)
  {     
     var StoreBeforeXpath='//*[@id="wholesaleTable"]/div[3]/table[1]/tbody[1]/tr[';
     var StoreAfterXpath=']/td[1]/a[1]';
     var StoreActualXpath=StoreBeforeXpath+i+StoreAfterXpath;
     this.getStoreName=this.page.locator(StoreActualXpath);
     var a=await this.getStoreName.innerText();
     await this.getStoreName.click(); 
     await this.page.waitForLoadState('networkidle');
     await this.getStockAsc.click();
     await this.page.waitForLoadState('networkidle');
     await this.page.locator('text=100select >> span').nth(2).click();
     await this.page.locator('li[role="option"]:has-text("500")').click();
     await this.page.waitForTimeout(5000);
     var b =await this.getTotalRows.count(); 
     for(var i=b;i<b;i++){
     var StockBeforeXpath='//*[@id="AlogTable"]/div[3]/table[1]/tbody[1]/tr[';
     var StockAfterXpath=']/td[18]';
     var compareXpath1=StockBeforeXpath+i+StockAfterXpath;
     var compareXpath2=StockBeforeXpath+(i+1)+StockAfterXpath;
     var b=await this.page.locator(compareXpath1).innerText();
     var c=await this.page.locator(compareXpath2).innerText();
     if(b==c)
     {
        console.log("UVI - Online - The store"+a+" has duplicate Stock Numbers");
     }
     await this.page.goBack();
  }
  return;
}
  }
 }
module.exports = { WholesaleAlog };