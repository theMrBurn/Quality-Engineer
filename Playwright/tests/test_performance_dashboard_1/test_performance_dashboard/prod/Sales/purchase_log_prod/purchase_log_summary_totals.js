// this POM is for /Payroll
const { expect } = require("@playwright/test");

class PurchaseLog
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesPurchaseLogTradeIn=page.locator(':nth-match(:text("Purchase Log / Trade-In"),1)');
    this.getSalesUsedVehicle=page.locator(':nth-match(:text("Used Vehicle"),1)');
    this.getSummaryTab=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/ul[1]/li[1]/span[2]/span[1]');
    this.getTotalColumn=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[20]');
    this.getTotalAuction=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]');
    this.getTotalRentalCompany=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]');
    this.getTotalPrivateParty=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]');
    this.getTotalOtherDealer=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]');
    this.getTotalWholesaler=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]');
    this.getTotalServiceLoaner=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[12]');
    this.getTotalOffLease=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[14]');
    this.getTotalTradeIn=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[16]');
    this.getTotalUnknown=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[18]');
    this.getTotalDetail=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[1]/div[1]/span[2]');
    this.getTotalHyperLink=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]');
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
    async NavigateToSalesPurchaseLogTradeIn() {
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      await this.getSalesTab.click();
      await this.getSalesUsedVehicle.click();
      await this.getSalesPurchaseLogTradeIn.click();
      await this.getSummaryTab.click();
      await this.page.waitForLoadState('networkidle');
    }
  //Methods ot verify if the total number of vehicles in purchase log - summary is equal to the total vehicles displayed after clicking totals hyperlink
async VerifyTotalVehicleTotal(){
  const a = await this.getTotalColumn.innerText();
  const array = a.replace(',','');
  const totalcolumn=parseInt(array);
  const b =await this.getTotalAuction.innerText();
  const array1 = b.replace(',','');
  const bucket1=parseInt(array1);
  const c =await this.getTotalRentalCompany.innerText();
  const bucket2=parseInt(c);
  const d =await this.getTotalPrivateParty.innerText();
  const array3 = d.replace(',','');
  const bucket3=parseInt(array3);
  const e =await this.getTotalOtherDealer.innerText();
  const bucket4=parseInt(e);
  const f =await this.getTotalWholesaler.innerText();
  const bucket5=parseInt(f);
  const g =await this.getTotalServiceLoaner.innerText();
  const bucket6=parseInt(g);
  const h =await this.getTotalOffLease.innerText();
  const array7 = h.replace(',','');
  const bucket7=parseInt(array7);  
  const i =await this.getTotalTradeIn.innerText();
  const array8 = i.replace(',','');
  const bucket8=parseInt(array8);
  const j =await this.getTotalUnknown.innerText();
  const bucket9=parseInt(j);
  const sum=bucket1+bucket2+bucket3+bucket4+bucket5+bucket6+bucket7+bucket8+bucket9;
  if (totalcolumn==sum)
  console.log("Purchase Log - Private Party - Totals match between data buckets");   
  else
  console.log("Purchase Log - Private Party - Totals mismatch between data buckets");
}

async TotalsvalidationSummaryVsDetail(){
  const a = await this.getTotalColumn.innerText();
  const array = a.replace(',','');
  const totalcolumn=parseInt(array);
  await this.getTotalHyperLink.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getTotalDetail.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  const totaldetail=parseInt(array3);
  if(totalcolumn==totaldetail)
  console.log("Purchase Log - Summary Tab - Total Matches between summary and Details");
  else 
  console.log("Purchase Log - Summary Tab - Total mismatch between summary and Details");
}

}
module.exports = {PurchaseLog};