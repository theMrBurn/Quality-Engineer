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
    this.getDetailTotals=page.locator('//*[@id="tabstrip-1"]/div/div/span[2]');
    this.getMichigan=page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div');
    this.getMichiganStore2=page.locator('label:has-text("Farmington Hills CDJR")');
    this.getSalesLoanerVehicleDetail=page.locator(':nth-match(:text("Loaner Vehicle Detail"),1)');
    this.getTotalRows=page.locator('tr');
    } 
    async SelectSToreForTHornhillHonda(){
      await this.page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")').nth(2).click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div').nth(2).click();
      await this.page.locator('label:has-text("Thornhill Honda")').click();
      await this.page.locator('#storeSelector >> text=Select').click();
      await this.page.waitForLoadState('networkidle');
    }
    async SelectStoreForFHCJDR(){
      await this.page.locator('div:has-text("Thornhill Honda Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")').nth(2).click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div').nth(2).click();
      await this.page.locator('label:has-text("Farmington Hills CDJR")').click();
      await this.page.locator('#storeSelector >> text=Select').click();
      await this.page.waitForLoadState('networkidle');
     }
     async SelectStoreForMarkhamBMW(){
      await this.page.locator('div:has-text("Farmington Hills CDJR Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")').nth(2).click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div').nth(2).click();
      await this.page.locator('label:has-text("Markham BMW Mini")').click();
      await this.page.locator('#storeSelector >> text=Select').click();
      await this.page.waitForLoadState('networkidle');
    }
    async SelectStoresForDTLA(){
      await this.page.locator('div:has-text("Markham BMW Mini Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")').nth(2).click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('text=CALIFORNIA').click();
      await this.page.locator('label:has-text("Downtown LA Toyota")').click();
      await this.page.locator('#storeSelector >> text=Select').click();
      await this.page.waitForLoadState('networkidle');
    }
    async SelectStoresForTroyHighLine(){
      await this.page.locator('div:has-text("Downtown LA Toyota Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")').nth(2).click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('.allSelectorIndicator').click();
      await this.page.locator('text=MICHIGAN[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn Arbor Merc >> div').nth(2).click();
      await this.page.locator('label:has-text("Troy High Line")').click();
      await this.page.locator('#storeSelector >> text=Select').click();
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
    };
    async twostepauthlogin(){
      await this.page.click('id=KmsiCheckboxField');
      await this.page.click('id=idSIButton9');
    };
    async ValidateLoanerCount(){
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      var countfromMain=await this.page.locator('//body/div[1]/main[1]/div[2]/section[2]/article[1]/div[2]').innerText();
      var totaldollarsfromMain=await this.page.locator('//body/div[1]/main[1]/div[2]/section[2]/article[1]/div[4]').innerText();
      var d=totaldollarsfromMain.replace('$','');
      await this.getSalesTab.nth(0).click();
      await this.getSalesNewVehicle.nth(0).click();
      await this.getSalesLoanerVehicleDetail.nth(0).click();
      await this.page.waitForLoadState('networkidle');
      const TotalActualXpath='//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]';
      var g= await this.page.locator(TotalActualXpath).innerText();
      const BalanceActualXpath='//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[3]';
      var ce=await this.page.locator(BalanceActualXpath).innerText();
      var de=ce.replace('$','');
    if(g!=countfromMain)
    {
      console.log( " For the regression set of stores , the loaner summary count doesnt match between main dashboard widget to the loaner summary report.");
      console.log(" From main dashboard - loaner widget total count is : "+ countfromMain);
      console.log(" the loaner summary report total is : "+g);
    }
    if(de!=d)
    {
      console.log( " For the regression set of stores , the loaner summary balance total doesnt match between main dashboard widget to the loaner summary report.");
      console.log(" From main dashboard - loaner widget total balance is : "+ d);
      console.log(" the loaner summary report total balance is : "+de);
    }
  }
  
}
module.exports = { InventoryWidget };