// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MISStandard
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getMainTab=page.locator(':nth-match(:text("Main"),1)');
    this.getMainMIS=page.locator('text="MIS"');
    this.getMainMIS1Standard=page.locator(':nth-match(:text("MIS 1 (Standard)"),1)');
    this.getSales=page.locator('//li[1]/span[2]/span[1]');
    this.getNewSalesBreakdown=page.locator('//li[2]/span[2]/span[1]');
    this.getServiceDetail=page.locator('//li[3]/span[2]/span[1]');
    this.getParts=page.locator('//li[4]/span[2]/span[1]');
    this.getbodyShop=page.locator('//li[5]/span[2]/span[1]');
    this.getTotalStore=page.locator('//li[6]/span[2]/span[1]');
    this.getSalespersonSalary=page.locator('//tr[160]/td[3]/span[1]');
    this.getFIMAnagerSalary=page.locator('//tr[161]/td[3]/span[1]');
    this.getSellingExpense=page.locator('//tr[170]/td[3]/span[1]');
    this.getPersonalExpense=page.locator('//tr[85]/td[3]/span[1]');
    this.getSemiFixedexpense=page.locator('//tr[109]/td[3]/span[1]');
    this.getDepartmentPRofit=page.locator('//tr[111]/td[3]/span[1]');
    this.getPartsPersonnelExpense=page.locator('//tr[95]/td[3]/span[1]');
    this.getPartsSemiFixedExpense=page.locator('//tr[120]/td[3]/span[1]');
    this.getPartsFixedExpense=page.locator('//tr[124]/td[3]/span[1]');
    this.getBodyShopPE=page.locator('//tr[50]/td[3]/span[1]');
    this.getTSDepartmentPRofit=page.locator('//tr[51]/td[3]/span[1]');
    this.getMultiStore=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getGVPOption=page.locator('text=Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERLDTLADAYPRESTIGEC >> select');
    this.getAllSelector=page.locator('.allSelectorIndicator');
    this.getAdam=page.locator('text=Adam Britzius[+]Avondale NissanCalabasas AudiElk Grove FordMission Hills Hyundai >> div');
    this.getKenneth=page.locator('text=Kenneth Wright[+]Abilene ToyotaBryan CJD FiatCalallen CJDRCorpus Christi CJDCorp >> div');
    this.getShawn=page.locator('text=Shawn Kukic[+]Chamblee HondaCoral Springs AudiDoral AcuraDoral HyundaiDoral KiaD >> div');
    this.getStoreSelector=page.locator('#storeSelector >> text=Select');
    this.getLM10400=page.locator('.k-master-row > .k-hierarchy-cell');
    this.getLM10405=page.locator('.k-grid-content > table > tbody > tr:nth-child(4) > .k-hierarchy-cell');
    this.getLM10400Carrot=page.locator("//*[@id='tabstrip-1']/div[2]/table[1]/tbody[1]/tr[3]/td[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]");
    this.getLM15011InnerCarrot =page.locator('.detail-wrapper > table > tbody > tr > .k-hierarchy-cell');
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
    async NavigateToMainMIS1Standard() {
      await this.getMainTab.click();
      await this.getMainMIS.click();
      await this.getMainMIS1Standard.click();
      await this.page.waitForLoadState('networkidle');
    }
    async ValidateBenchmarkInSales(){
      await this.page.waitForTimeout(4000);
      await expect(this.getFIMAnagerSalary).toBeVisible();
      await expect(this.getSellingExpense).toBeVisible();
      await expect(this.getSalespersonSalary).toBeVisible();
    }
    async ValidateBenchmarkInServiceDetail(){
      await this.getServiceDetail.click();
      await this.page.waitForTimeout(4000);
      await expect(this.getPersonalExpense).toBeVisible();
      await expect(this.getSemiFixedexpense).toBeVisible();
      await expect(this.getDepartmentPRofit).toBeVisible();
    }
    async ValidateBenchmarkInParts(){
      await this.getParts.click();
      await this.page.waitForTimeout(4000);
      await expect(this.getPartsFixedExpense).toBeVisible();
      await expect(this.getPartsPersonnelExpense).toBeVisible();
      await expect(this.getPartsSemiFixedExpense).toBeVisible();
    }
    async ValidateBenchmarkInBodyShop(){
      await this.getbodyShop.click();
      await this.page.waitForTimeout(4000);
      await expect(this.getBodyShopPE).toBeVisible();
    }
    async ValidateBenchmarkInTotalStore(){
      await this.getTotalStore.click();
      await this.page.waitForTimeout(4000);
      await expect(this.getTSDepartmentPRofit).toBeVisible();
    }
// Bug - 106937 - Carrots not Expanding when GVP with more stores are selected
    async ValidateCarrotExtensionForGVP(){
      await this.getMultiStore.nth(2).click();
      await this.getGVPOption.selectOption('2');
      await this.getAllSelector.click();
      await this.getAllSelector.click();
      await this.getAdam.first().click();
      //Activate the next two lines after it goes to production because here is whee the bug is currently
      /*await this.getKenneth.first().click();
      await this.getShawn.first().click();*/
      await this.getStoreSelector.click();
      await this.page.waitForTimeout(5000);
      await this.getLM10400.first().click();
      await this.page.waitForTimeout(5000);
      await expect(this.getLM10400Carrot).toBeVisible();      
      await this.page.waitForTimeout(5000);
      await this.getLM15011InnerCarrot.first().click();      
      await this.page.waitForTimeout(5000);
      await this.getLM10405.first().click();
      await this.page.waitForTimeout(5000);
      //await expect(this.page.locator("//*[@id='tabstrip-1']/div[2]/table[1]/tbody[1]/tr[5]/td[2]/div[2]/table[1]/tbody[1]/tr[1]/td[4]")).toBeVisible();
    }    
    async ValidateNewBrokerSection(){
      await this.page.waitForTimeout(5000);
      await expect(this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[12]/td[2]")).toHaveText("LM10880");
      await expect(this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[12]/td[3]")).toHaveText("New Broker Revenue");
      await expect(this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[13]/td[2]")).toHaveText("LM10885");
      await expect(this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[13]/td[3]")).toHaveText("New Broker Gross");
      await expect(this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[14]/td[3]")).toHaveText("Gross Per Broker");
      await expect(this.page.locator("//body/div[1]/main[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[15]/td[3]")).toHaveText("Broker Count");
    }
 }
module.exports = { MISStandard };