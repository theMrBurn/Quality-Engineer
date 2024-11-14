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
    this.getWholesaleFilter=page.locator('text=Show items with value that:Is equal toselectIs equal toIs not equal toStarts wit >> input[type="text"]');
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
      await this.page.waitForTimeout(9000);
      await this.getSalesTab.click();
      await this.getSalesLog.click();
      await this.getWholesaleAlog.click();
      await this.page.waitForLoadState('networkidle');
    }
  //Methods ot verify if the total number of vehicles in Driveway Sales LOg report between summary and detail pages.
 async VerifyTotalVehicle(){
    const a = await this.getTotalCount.innerText();
    const array = a.replace(',','');
    const totalcountsummary=parseInt(array);
    await this.getTotals.click();
    await this.page.waitForLoadState('networkidle');
    await this.getInventoryType.click();
    await this.getFilterSelect.nth(1).click();
    await this.getWholesaleFilter.first().fill('wholesale');
    await this.getFilterButton.press('Enter');
    const c =await this.getDetailTotals.innerText();
    const array3= c.replace('1 - 100 of ','');
    const array4=array3.replace(' items','');
    const detailtotal=parseInt(array4);
    if (totalcountsummary==detailtotal)
    console.log("Wholesale ALog Total Match");   
    else
    console.log("Wholesale ALog Total Mismatch");
    await this.page.goBack();
 }
 async ValidationTotalSumOfUnits(){
  await this.page.waitForTimeout(4000);
  var z= await this.getTotalRows.count();
  for (var i=1;i<(z-3);i++)
  {
      var BeforeXPath='//*[@id="wholesaleTable"]/div[3]/table[1]/tbody[1]/tr[';
      var AfterXPath=']/td[2]';
      var ActualXPath=BeforeXPath+i+AfterXPath;
      var g=await this.page.locator(ActualXPath).innerText();
      var k=parseInt(g);
      var h=0;
      h=h+k;
  }
  return h;
  var k=parseInt(await this.getSummation.innerText());
  if (k!=h)
  {
    console.log("Wholesale units - vertical row summation is a mismatch for the selected stores");
  }
 }
 }
module.exports = { WholesaleAlog };