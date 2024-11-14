// this POM is for /Payroll
const { expect } = require("@playwright/test");
class NewVehicleInventory
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesNewVehicle=page.locator(':nth-match(:text("New Vehicle"),1)');
    this.getSalesNewInventoryDetail=page.locator('text="New Inventory Detail"');
    this.getNewInventorySummaryTotals=page.locator('text="Totals"');
    this.getNewInventoryExcess=page.locator(':nth-match(:text("Excess"),1)');
    this.getNVITotalINventory=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]');
    this.getNVIExcessTotals=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]');
    this.getNVIExcessTotals2=page.locator('span[class="k-pager-info k-label"]');
    this.getStoreSelector=page.locator('header >> text=Multiple Stores');
    this.getAllselector=page.locator('.allSelectorIndicator');    
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
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
 async NavigateToSalesNewInventoryDetail() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(7000);
    await this.page.waitForTimeout(5000);
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewInventoryDetail.first().click();
    await this.getNewInventoryExcess.click();
    await this.page.waitForLoadState('networkidle');
  }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
 async VerifyTotalVehicleTotal(){
  const c = await this.getNVITotalINventory.innerText();
  const array3 = c.replace(',','');
  const bucket3=parseInt(array3);
  const d =await this.getNVIExcessTotals.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getNVIExcessTotals2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array4=array2.replace(' items','');
  const bucket4=parseInt(array4);
  if (bucket3==bucket4)
  console.log("NVI - Totals in Excess Page match");   
  else
  console.log("NVI - Totals in Excess page mismatch");
}
async SelectStoresForRegression(){
   await this.page.waitForTimeout(5000);
   await this.getStoreSelector.click();
   await this.getAllselector.click();
   await this.getSelectButton.click();
   await this.page.waitForLoadState('networkidle');
  }
}
module.exports = { NewVehicleInventory };