// this POM is for /Payroll
const { expect } = require("@playwright/test");

class TitleTracking
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getOfficeTab=page.locator('text="Office" >> nth=0');
    this.getOfficeTitleTracking=page.locator(':nth-match(:text("Title Tracking Report"),1)');
    this.getTotal015Days=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]');
    this.getTotal1630Days=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]');
    this.getTotal3160Days=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]');
    this.getTotal61Days=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]');
    this.getTotal=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]');
    this.getRadioSaleDate=page.locator('#radioGroupNoSold span:has-text("Sale Date")');
    this.getRadioPurchaseDate=page.locator('#radioGroupNoSold span:has-text("Purchase Date")');
    this.getSoldNoTitle=page.locator(':nth-match(:text("Sold - No Title"),1)');
    this.getStore=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]');
    this.getStoreTotal=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[3]/td[10]');
    this.getStoreTotalDetail=page.locator('span[class="k-pager-info k-label"]');
    this.getTotalHyperlink=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]');
    this.getDetailPageTotal=page.locator('span[class="k-pager-info k-label"]');
    this.get015DaysPercentage=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]');
    this.get1630DaysPercentage=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[5]');
    this.get3160DaysPErcentage=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[7]');
    this.get61DaysPercentage=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[9]');
    this.getTotalPercentage=page.locator('//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[11]');
    this.getExportToExcel=page.locator(':nth-match(:text("Export to Excel"),2)');
    this.getExportToPDF=page.locator(':nth-match(:text("Export to PDF"),2)');
    this.getExportToExcelDetail=page.locator(':nth-match(:text("Export to Excel"),1)');
    this.getExportToPDFDetail=page.locator(':nth-match(:text("Export to PDF"),1)');
    this.getRadioUsedInv=page.locator('#radioGroup span:has-text("Used")');
    this.getRadioAll=page.locator('#radioGroup span:has-text("All")');
    this.getRadioNewInv=page.locator('#radioGroup span:has-text("New")');
  }
  async LoadAllInventory(){
    await this.page.waitForLoadState('networkidle');
    await this.getRadioAll.click();
    await this.page.waitForLoadState('networkidle');
  }
  async LoadUsedInv(){
    await this.page.waitForLoadState('networkidle');
    await this.getRadioUsedInv.click();
    await this.page.waitForLoadState('networkidle');
  }
  async LoadNewInv(){
    await this.page.waitForLoadState('networkidle');
    await this.getRadioNewInv.click();
    await this.page.waitForLoadState('networkidle');
  }
async goto() {
    await this.page.goto('https://speuat.lithiainc.com/Reports/TitleTrackingSummary',{timeout:0});
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
  async NavigateToOfficeTitleTracking() {    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.getOfficeTab.click();
    await this.getOfficeTitleTracking.click();
    await this.getSoldNoTitle.click();    
    await this.page.waitForLoadState('networkidle');
  }
  async LoadSaleDate(){
    await this.getSoldNoTitle.click();    
    await this.page.waitForLoadState('networkidle');
    await this.getRadioSaleDate.click();
    await this.page.waitForLoadState('networkidle');
  }
  async LoadPurchaseDate(){
    await this.getSoldNoTitle.click();    
    await this.page.waitForLoadState('networkidle');
    await this.getRadioPurchaseDate.click();
    await this.page.waitForLoadState('networkidle');
  }
  async ValidateTotalslinkAll(){
   await this.page.waitForLoadState('networkidle');
   await this.page.waitForTimeout(15000);
   const a= await this.getTotal.innerText();
   const array=a.replace(',','');
   const bucket1=parseInt(array);
   await this.getTotalHyperlink.click();
   await this.page.waitForLoadState('networkidle');
   await this.getRadioAll.click();   
   await this.page.waitForTimeout(20000);
   const c=await this.getDetailPageTotal.innerText();
   const array5=c.replace('1 - 100 of ','');
   const array4=array5.replace(' items','');
   const sum1=parseInt(array4);
   if (bucket1!=sum1)
   console.log("Title Tracking Report - Sold No Title - Totals mismatch between summary and details page "+bucket1+":"+sum1);
  }
  async ValidateTotalslinkNew(){
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(20000);
    const a= await this.getTotal.innerText();
    const array=a.replace(',','');
    const bucket2=parseInt(array);
    await this.getTotalHyperlink.click();
    await this.page.waitForLoadState('networkidle');
    await this.getRadioNewInv.click();   
    await this.page.waitForTimeout(15000);
    const c=await this.getDetailPageTotal.innerText();
    const array5=c.replace('1 - 100 of ','');
    const array4=array5.replace(' items','');
    const sum2=parseInt(array4);
    if (bucket2!=sum2)
    console.log("Title Tracking Report - Sold No Title - Totals mismatch between summary and details page "+bucket2+":"+sum2);
   }
   async ValidateTotalslinkUsed(){
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(15000);
    const a= await this.getTotal.innerText();
    const array=a.replace(',','');
    const bucket1=parseInt(array);
    await this.getTotalHyperlink.click();
    await this.page.waitForLoadState('networkidle');
    await this.getRadioUsedInv.click();   
    await this.page.waitForTimeout(15000);
    const c=await this.getDetailPageTotal.innerText();
    const array5=c.replace('1 - 100 of ','');
    const array4=array5.replace(' items','');
    const sum1=parseInt(array4);
    if (bucket1!=sum1)
    console.log("Title Tracking Report - Sold No Title - Totals mismatch between summary and details page "+bucket1+":"+sum1);
   }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
  async VerifyTotalNoTitleVehicle(){
    await this.getSoldNoTitle.click();
    const b =await this.getTotal015Days.innerText();
    const array1=b.replace(',','');
    const bucket1=parseInt(array1);
    const c =await this.getTotal1630Days.innerText();
    const array2=c.replace(',','');
    const bucket2=parseInt(array2);
    const d =await this.getTotal3160Days.innerText();
    const array3=d.replace(',','');
    const bucket3=parseInt(array3);
    const e =await this.getTotal61Days.innerText();
    const array4=e.replace(',','');
    const bucket4=parseInt(array4);
    const a = await this.getTotal.innerText();
    const array5=a.replace(',','');
    const totalnotitle=parseInt(array5);
    const sum=bucket1+bucket2+bucket3+bucket4;
    if (sum!=totalnotitle)
    console.log("Title Tracking Report - Sold No TItle - totals in no title Mismatch "+sum+":"+totalnotitle);
 }

 async ValidateDetailAndSummaryForSelectedStoreUsed(){
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(15000);
  const a=await this.getStoreTotal.innerText();
  const array=parseInt(a);
  await this.getStore.click();
  await this.page.waitForTimeout(15000);
  await this.getRadioUsedInv.click();
  await this.page.waitForTimeout(7000);
  const b=await this.getStoreTotalDetail.innerText();
  const array5=b.replace('1 - 100 of ','');
  const array4=array5.replace(' items','');
  const sum=parseInt(array4);
  if(array!=sum)
  console.log("Title Tracking Report - Sold No Title - Summary and Detail for a store mismatches "+array+":"+sum);
}
async ValidateDetailAndSummaryForSelectedStoreNew(){
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(15000);
  const a=await this.getStoreTotal.innerText();
  const array=parseInt(a);
  await this.getStore.click();
  await this.page.waitForTimeout(15000);
  await this.getRadioNewInv.click();
  await this.page.waitForTimeout(7000);
  const b=await this.getStoreTotalDetail.innerText();
  const array5=b.replace('1 - 100 of ','');
  const array4=array5.replace(' items','');
  const sum=parseInt(array4);
  if(array!=sum)
  console.log("Title Tracking Report - Sold No Title - Summary and Detail for a store mismatches "+array+":"+sum);
}
async ValidateDetailAndSummaryForSelectedStoreAll(){
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(15000);
  const a=await this.getStoreTotal.innerText();
  const array=parseInt(a);
  await this.getStore.click();
  await this.page.waitForTimeout(15000);
  await this.getRadioAll.click();
  await this.page.waitForTimeout(7000);
  const b=await this.getStoreTotalDetail.innerText();
  const array5=b.replace('1 - 100 of ','');
  const array4=array5.replace(' items','');
  const sum=parseInt(array4);
  if(array!=sum)
  console.log("Title Tracking Report - Sold No Title - Summary and Detail for a store mismatches "+array+":"+sum);
}
 async validatepercentages(){
  await this.page.waitForTimeout(7000);
  await expect(this.get015DaysPercentage).toBeVisible();
  await expect(this.get1630DaysPercentage).toBeVisible();
  await expect(this.get3160DaysPErcentage).toBeVisible();
  await expect(this.get61DaysPercentage).toBeVisible();
  await expect(this.getTotalPercentage).toBeVisible();
 }
 async ExportToExcel(){
  await this.getExportToExcel.click();
  await this.getExportToPDF.click();
  await this.getStore.click();
  await this.page.waitForTimeout(7000);
  await this.getExportToExcelDetail.click();
  await this.getExportToPDFDetail.click();
 }
}
module.exports = { TitleTracking };