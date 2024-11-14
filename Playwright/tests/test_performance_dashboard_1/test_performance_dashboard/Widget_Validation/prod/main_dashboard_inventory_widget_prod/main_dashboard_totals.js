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
    this.getFlorida=page.locator('text=FLORIDA[+]Coral Springs AudiDoral AcuraDoral HyundaiDoral KiaDoral VolkswagenFor >> div');
    this.getTampaFord=page.locator('label:has-text("Tampa Ford")');
    this.getDTLAToyota=page.locator('label:has-text("Downtown LA Toyota")');
    this.getCalifornia=page.locator('text=CALIFORNIA[+]Calabasas AudiCarson NissanClovis NissanCosta Mesa CJDRDowntown LA  >> div');
    this.getSummation=page.locator('//*[@id="tabstrip-1"]/div/div/div/table/tbody/tr/td[2]');
    this.getStockAsc=page.locator('//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/section[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/th[18]/a[2]');
    this.getNevada=page.locator('text=NEVADA[+]ABC HyundaiCentennial HyundaiDesert CDJRHenderson HyundaiLas Vegas CDRL');
    this.getCentinnialhyundai=page.locator('label:has-text("Centennial Hyundai")');
    this.getMichigan=page.locator('text=MICHIGAN');
    this.getFarmingtonCDJR=page.locator('label:has-text("Farmington Hills CDJR")');
    this.getNewTotalLink=page.locator('#newTotalLink >> text=Total:');
    this.getUsedTOtalLink=page.locator('#usedTotalLink >> text=Total:');
    this.getNewTotal=page.locator('//div[1]/table[3]/tbody[1]/tr[3]/td[3]/span[1]');
    this.getUsedTotal=page.locator('//div[1]/table[7]/tbody[1]/tr[3]/td[3]/span[1]');
    } 
     async SelectCentinnialStore(){
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      await this.page.locator('div:has-text("Farmington Hills CDJR Location Group VP Manufacturer Same Store 12 Groups LITHIA")').nth(2).click();
      await this.getAllselector.click();
      await this.getAllselector.click();
      await this.getNevada.click();
      await this.getCentinnialhyundai.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.locator('#displayTotal').check();
     }
     async SelectFarmingtonCDJR(){
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      await this.getStoreSelector.nth(2).click();
      await this.getAllselector.click();
      await this.getAllselector.click();
      await this.getMichigan.click();
      await this.getFarmingtonCDJR.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.locator('#displayTotal').check();
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
async ValidateNVIUnits(){
  await this.page.waitForTimeout(5000);
    var g = await this.getNewTotal.innerText();
    var h=g.slice(1,-6);
    var NVItotal=parseInt(h);       
    const [page2] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('#newTotalLink >> text=Total:').click()
    ]);
  await page2.waitForLoadState('networkidle');
  await this.page.waitForTimeout(10000);
  await page2.locator('//*[@id="tabstrip-1"]/div/div/span/span/span/span/span[1]').click();
  await page2.locator('li[role="option"]:has-text("500")').click();
  const a=await page2.locator('tr').count();
    if((a-1)!=NVItotal)
    {
    console.log(" In Main dashboard under Inventory Widget - Totals -  New - Days - Units count is not matching with detail page when clicked on the hyperlink");
    console.log(" The count in dashboard for new -Totals : " + NVItotal);
    console.log(" The count in detail page for new -Totals : "+(a-1));
    }
    await this.page.bringToFront();
}
async ValidateUVIUnits(){
  await this.page.waitForTimeout(5000);
    var g = await this.getUsedTotal.innerText();
    var h=g.slice(1,-6);
    var UVItotal=parseInt(h);       
    const [page2] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('#usedTotalLink >> text=Total:').click()
    ]);
  await page2.waitForLoadState('networkidle');
  await this.page.waitForTimeout(10000);
  await page2.locator('//*[@id="tabstrip-1"]/div/div/span/span/span/span/span[1]').click();
  await page2.locator('li[role="option"]:has-text("500")').click();
  const a=await page2.locator('tr').count();
    if((a-1)!=UVItotal)
    {
    console.log(" In Main dashboard under Inventory Widget - Totals - Used - Days -Uits count is not matching with detail page when clicked on the hyperlink ");
    console.log(" The count in dashboard for used -Totals : " + UVItotal);
    console.log(" The count in detail page for used -Totals : "+(a-1));
    }
    await this.page.bringToFront();
}
 }
module.exports = { InventoryWidget };