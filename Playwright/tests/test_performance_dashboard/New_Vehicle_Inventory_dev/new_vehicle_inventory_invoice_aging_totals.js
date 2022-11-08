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
    this.getSalesNewInventoryDetail=page.locator(':nth-match(:text("New Inventory Detail"),1)');
    this.getNewInventorySummaryTotals=page.locator('text="Totals"');
    this.getNewInventoryInvoiceAging=page.locator('text="Invoice Aging"');
    this.getNVI030DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]');
    this.getNVI030DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getNVI3160DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/a[1]');
    this.getNVI3160DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getNVI6190DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]/a[1]');
    this.getNVI6190DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getNVI91DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/a[1]');
    this.getNVI91DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getNVITotalTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[12]/a[1]');
    this.getNVITotalTotalCount2=page.locator('span[class="k-pager-info k-label"]');
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
    await this.page.waitForNavigation();
    }
    async twostepauthlogin(){
      await this.page.click('id=KmsiCheckboxField');
      await this.page.click('id=idSIButton9');
    }
  async NavigateToSalesNewInventoryDetail() {
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewInventoryDetail.click();
    await this.getNewInventoryInvoiceAging.click();
    await this.page.waitForLoadState('networkidle');
  }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
 async VerifyTotalVehicle030Days(){
  const a = await this.getNVI030DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getNVI030DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getNVI030DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("NVI - Invoice - Aging Totals iN 0-30 Days Match");   
  else
  console.log("NVI - Invoice - Aging Totals in 0-30 Days Mismatch");
}
async VerifyTotalVehicle3160Days(){
  const a = await this.getNVI3160DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getNVI3160DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getNVI3160DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("NVI - Invoice Aging 31 - 60 Days Totals match");   
  else
  console.log("NVI - Invoice Aging 31 - 60 Days Totals mismatch");
}
async VerifyTotalVehicle6190Days(){
  const a = await this.getNVI6190DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getNVI6190DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getNVI6190DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("NVI - Invoice Aging 61 - 90 Days Totals match");   
  else
  console.log("NVI - Invoice Aging 61 - 90 Days Totals mismatch");
}
async VerifyTotalVehicle91Days(){
  const a = await this.getNVI91DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getNVI91DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getNVI91DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("NVI - Invoice Aging 91+ Days Totals match");   
  else
  console.log("NVI - Invoice Aging 91+ Days Totals mismatch");
}

async VerifyTotalVehicleTotal(){
  const a = await this.getNVITotalTotalCount1.innerText();
  const array = a.replace(',','');
  const bucket1=parseInt(array);
  const b =await this.getNVI030DaysTotalCount1.innerText();
  const array2= b.replace(',','');
  const bucket2=parseInt(array2);
  const c =await this.getNVI3160DaysTotalCount1.innerText();
  const array3= c.replace(',','');
  const bucket3=parseInt(array3);
  const d =await this.getNVI6190DaysTotalCount1.innerText();
  const array4= d.replace(',','');
  const bucket4=parseInt(array4);
  const e =await this.getNVI91DaysTotalCount1.innerText();
  const array5=e.replace(',','');
  const bucket5=parseInt(array5);
  const sum= bucket2+bucket3+bucket4+bucket5;
  if (bucket1==sum)
  console.log("NVI - Invoice Aging - Total Totals match");   
  else
  console.log("NVI - Invoice Aging - Total Totals mismatch");
}
async verifyTotalBetWeenSummaryandDetailPage()
{
  const b =await this.getNVI030DaysTotalCount1.innerText();
  const  array2= b.replace(',','');
  const bucket1=parseInt(array2);
  const c =await this.getNVI3160DaysTotalCount1.innerText();
  const array3= c.replace(',','');
  const bucket2=parseInt(array3);
  const d =await this.getNVI6190DaysTotalCount1.innerText();
  const array4= d.replace(',','');
  const bucket3=parseInt(array4);
  const e =await this.getNVI91DaysTotalCount1.innerText();
  const array5=e.replace(',','');
  const bucket4=parseInt(array5);
  const sum= bucket1+bucket2+bucket3+bucket4;
  await this.getNVITotalTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const a =await this.getNVITotalTotalCount2.innerText();
  const array= a.replace('1 - 100 of ','');
  const array7=array.replace(' items','');
  const tTotal=parseInt(array7);
  if (tTotal==sum)
  console.log("NVI - Invoice Aging - Total Totals match");   
  else
  console.log("NVI - Invoice Aging - Total Totals mismatch");
}

}
module.exports = { NewVehicleInventory };