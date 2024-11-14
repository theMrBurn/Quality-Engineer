// this POM is for /Payroll
const { expect } = require("@playwright/test");

class InventoryWidget
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('span:has-text("Sales")');
    this.getSalesNewVehicle=page.locator('span:has-text("New Vehicle")');
    this.getSalesNewInventoryDetail=page.locator('text=New Inventory Detail');
    this.getNewInventorySummaryTotals=page.locator('text="Totals"');
    this.getNewInventoryExcess=page.locator('#excess >> text=Excess');
    this.getUVITotalINventory=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]');
    this.getUVIExcessTotals=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]');
    this.getUVIExcessTotals2=page.locator('span[class="k-pager-info k-label"]');
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
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
    this.getCalifornia=page.locator('text=CALIFORNIA[+]Calabasas AudiCarson NissanClovis NissanCosta Mesa CJDRDowntown LA  >> div');
    this.getSummation=page.locator('//*[@id="tabstrip-1"]/div/div/div/table/tbody/tr/td[2]');
    this.getStockAsc=page.locator('//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[18]/a[2]');
    this.getNevada=page.locator('text=NEVADA[+]ABC HyundaiCentennial HyundaiDesert CDJRHenderson HyundaiLas Vegas CDRL');
    this.getCentinnialhyundai=page.locator('label:has-text("Centennial Hyundai")');
    this.getNVI6074Units=page.locator('#newAgeTable >> text=60-74');
    this.getNVI75Units=page.locator('#newAgeTable >> text=75+');
    this.getUVI6074Units=page.locator('#usedAgeTable >> text=60-74');
    this.getUVI75Units=page.locator('#usedAgeTable td:has-text("75+")');
    this.getNVI6074Total=page.locator('//table[5]/tbody[1]/tr[1]/td[3]/span[1]');
    this.getNVI75Total=page.locator('//div[1]/table[1]/tbody[1]/tr[2]/td[3]/span[1]');
    this.getUVI6074Total=page.locator('//div[1]/table[5]/tbody[1]/tr[1]/td[3]/span[1]');
    this.getUVI75Total=page.locator('//div[1]/table[5]/tbody[1]/tr[2]/td[3]/span[1]');
    this.getDetailTotals=page.locator('//*[@id="tabstrip-1"]/div/div/span[2]');
    this.getMichigan=page.locator('text=MICHIGAN');
    this.getFarmingtonCDJR=page.locator('label:has-text("Farmington Hills CDJR")');
    } 
    async SelectCentinnialStore(){
      await this.page.waitForTimeout(5000);
      await this.page.locator('div:has-text("Farmington Hills CDJR Location Group VP Manufacturer Same Store 12 Groups LITHIA")').nth(2).click();
      await this.getAllselector.click();
      await this.getAllselector.click();
      await this.getNevada.click();
      await this.getCentinnialhyundai.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.locator('#displayAge').check();
     }
     async SelectFarmingtonCDJR(){
      await this.getStoreSelector.nth(2).click();
      await this.getAllselector.click();
      await this.getAllselector.click();
      await this.getMichigan.click();
      await this.getFarmingtonCDJR.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.locator('#displayAge').check();
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
async ValidateNVIUnits6074(){
  await this.page.waitForTimeout(5000);
    var g = await this.getNVI6074Total.innerText();
    var h=g.slice(1,-6);
    var NVI74total=parseInt(h);       
    const [page2] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('#newAgeTable >> text=60-74').click(),      
  ]);
  await page2.waitForLoadState('networkidle');
  const a=await page2.locator('tr').count();
    if((a-1)!=NVI74total)
    {
    console.log(" In Main dashboard under Inventory Widget - Invoice Aging - New - Days - 60-74 units count is not matching with detail page when clicked on the hyperlink of (60-74)");
    console.log(" The count in dashboard for new - 60-74 : " + NVI74total);
    console.log(" The count in detail page for new - 60-74 : "+(a-1));
    }
    await this.page.bringToFront();
}
async ValidateNVIUnits75(){
  await this.page.waitForTimeout(5000);
    var g = await this.getNVI75Total.innerText();
    var h=g.slice(1,-6);
    var NVI75total=parseInt(h);       
    const [page2] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('#newAgeTable >> text=75+').click(),      
  ]);
  await page2.waitForLoadState('networkidle');
  const a=await page2.locator('tr').count();
    if((a-1)!=NVI75total)
    {
    console.log(" In Main dashboard under Inventory Widget - Invoice Aging - New - Days - 75+ units count is not matching with detail page when clicked on the hyperlink of 75+");
    console.log(" The count in dashboard for used - 75+ : " + NVI75total);
    console.log(" The count in detail page for used - 75+ : "+(a-1));
    }
    await this.page.bringToFront();
}
async ValidateUVIUnits6074(){
  await this.page.waitForTimeout(5000);
    var g = await this.getUVI6074Total.innerText();
    var h=g.slice(1,-6);
    var UVI74total=parseInt(h);       
    const [page2] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('#usedAgeTable >> text=60-74').click(),      
  ]);
  await page2.waitForLoadState('networkidle');
  const a=await page2.locator('tr').count();
    if((a-1)!=UVI74total)
    {
      console.log(" In Main dashboard under Inventory Widget - Invoice Aging - Used - Days - 60-74 units count is not matching with detail page when clicked on the hyperlink of (60-74)");
      console.log(" The count in dashboard for new - 60-74 : " + UVI74total);
      console.log(" The count in detail page for new - 60-74 : "+(a-1));
    }
    await this.page.bringToFront();
}
async ValidateUVIUnits75(){
  await this.page.waitForTimeout(5000);
    var g = await this.getUVI75Total.innerText();
    var h=g.slice(1,-6);
    var UVI75total=parseInt(h);       
    const [page2] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('#usedAgeTable >> text=75+').click(),      
  ]);
  await page2.waitForLoadState('networkidle');
  const a=await page2.locator('tr').count();
    if((a-1)!=UVI75total)
    {
      console.log(" In Main dashboard under Inventory Widget - Invoice Aging - Used - Days - 75+ units count is not matching with detail page when clicked on the hyperlink of 75+");
      console.log(" The count in dashboard for used - 75+ : " + UVI75total);
      console.log(" The count in detail page for used - 75+ : "+(a-1));
    }
    await this.page.bringToFront();
}
 }
module.exports = { InventoryWidget };