// this POM is for /Payroll
const { expect } = require("@playwright/test");

class PriceToMarket
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getPriceToMarket=page.locator(':nth-match(:text("Price To Market"),1)');
    this.getReportName=page.locator(':nth-match(:text("National Price to Market Summary"),1)');
    this.getReportTab=page.locator(':nth-match(:text("National Price to Market"),1)');
    this.getBanner=page.locator('text="Includes current inventory units + sold units determined by date selector"');
    this.getStartDate=page.locator('#StartDate');
    this.getEndDate=page.locator('#EndDate');
    this.getSubmitDate=page.locator('text=select select Submit >> div');
    this.getNPTM=page.locator('text=NPTM');
    this.get85=page.locator('text=< 85%');
    this.get8590=page.locator('text=85% - 90%');
    this.get9095=page.locator('text=90% - 95%');
    this.get95100=page.locator('text=95% - 100%');
    this.get100105=page.locator('text=100% - 105%');
    this.get105=page.locator('text=> 105%');
    this.getTotal=page.locator('text=totals');
    this.getExportToExcel=page.locator('//*[@title="Export to Excel"]');
    this.getExportToPDF=page.locator('//*[@title="Export to PDF"]');
    this.getTotalStores=page.locator('tr');
    this.getTotal85Units=page.locator('//div[1]/table[1]/tbody[1]/tr[1]/td[3]');
    this.getTotal8590Units=page.locator('//div[1]/table[1]/tbody[1]/tr[1]/td[5]');
    this.getTotal9095Units=page.locator('//div[1]/table[1]/tbody[1]/tr[1]/td[7]');
    this.getTotal95100Units=page.locator('//div[1]/table[1]/tbody[1]/tr[1]/td[9]');
    this.getTotal100105Units=page.locator('//div[1]/table[1]/tbody[1]/tr[1]/td[11]');
    this.getTotal105Units=page.locator('//div[1]/table[1]/tbody[1]/tr[1]/td[13]');
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
  async NavigateToSalesPriceToMarketNational() {
    await this.getSalesTab.click();
    await this.getPriceToMarket.click();
    await this.page.waitForLoadState('networkidle');
  }
  async ValidateElementsInSummaryPage(){
    await expect(this.getReportName).toBeVisible();
    await expect(this.getReportTab).toBeVisible(); 
    await expect(this.getBanner).toBeVisible();
    await expect(this.getStartDate).toBeVisible();
    await expect(this.getEndDate).toBeVisible();
    await expect(this.getSubmitDate).toBeVisible();
    await expect(this.getNPTM).toBeVisible();
    await expect(this.get85).toBeVisible();
    await expect(this.get8590).toBeVisible();
    await expect(this.get9095).toBeVisible();
    await expect(this.get95100).toBeVisible();
    await expect(this.get100105).toBeVisible();
    await expect(this.get105).toBeVisible();
    await expect(this.getTotal).toBeVisible();
  }

  async ValidateExport(){
    await this.getExportToExcel.click();
    await this.getExportToPDF.click();
  }
  async Validate85Units(){
    const a= await this.getTotalStores.count();   
    var sum=0;
    for ( var i=1;i<=(a-3);i++)
    { 
     var beforeXpath85="//*[@id='NationalPTMTable']/div[3]/table[1]/tbody[1]/tr[";
     var afterXpath85="]/td[3]";
     var actualXpath85=beforeXpath85+i+afterXpath85;
     var b=await this.page.locator(actualXpath85).innerText();
     var c=parseInt(b);
     sum =sum+c;
    }
    const g= await this.getTotal85Units.innerText();
    const sum1=parseInt(g);
    if(sum==sum1)
    {
      console.log(" National Price To Market 85 Bucket Units Summation matches");
    }
    else 
    {
      console.log(" National Price To Market 85 Bucket Units Summation mismatches");
    }
  }
  async Validate8590Units(){
    const a= await this.getTotalStores.count();   
    var sum=0;
    for ( var i=1;i<=(a-3);i++)
    { 
     var beforeXpath85="//*[@id='NationalPTMTable']/div[3]/table[1]/tbody[1]/tr[";
     var afterXpath85="]/td[5]";
     var actualXpath85=beforeXpath85+i+afterXpath85;
     var b=await this.page.locator(actualXpath85).innerText();
     var c=parseInt(b);
     sum =sum+c;
    }
    const g= await this.getTotal8590Units.innerText();
    const sum1=parseInt(g);
    if(sum==sum1)
    {
      console.log(" National Price To Market 85-90 Bucket Units Summation matches");
    }
    else 
    {
      console.log(" National Price To Market 85-90 Bucket Units Summation mismatches");
    }
  }
  async Validate9095Units(){
    const a= await this.getTotalStores.count();   
    var sum=0;
    for ( var i=1;i<=(a-3);i++)
    { 
     var beforeXpath85="//*[@id='NationalPTMTable']/div[3]/table[1]/tbody[1]/tr[";
     var afterXpath85="]/td[7]";
     var actualXpath85=beforeXpath85+i+afterXpath85;
     var b=await this.page.locator(actualXpath85).innerText();
     var c=parseInt(b);
     sum =sum+c;
    }
    const g= await this.getTotal9095Units.innerText();
    const sum1=parseInt(g);
    if(sum==sum1)
    {
      console.log(" National Price To Market 90-95 Bucket Units Summation matches");
    }
    else 
    {
      console.log(" National Price To Market 90-95 Bucket Units Summation mismatches");
    }
  }
  async Validate95100Units(){
    const a= await this.getTotalStores.count();   
    var sum=0;
    for ( var i=1;i<=(a-3);i++)
    { 
     var beforeXpath85="//*[@id='NationalPTMTable']/div[3]/table[1]/tbody[1]/tr[";
     var afterXpath85="]/td[9]";
     var actualXpath85=beforeXpath85+i+afterXpath85;
     var b=await this.page.locator(actualXpath85).innerText();
     var c=parseInt(b);
     sum =sum+c;
    }
    const g= await this.getTotal95100Units.innerText();
    const sum1=parseInt(g);
    if(sum==sum1)
    {
      console.log(" National Price To Market 90-100 Bucket Units Summation matches");
    }
    else 
    {
      console.log(" National Price To Market 90-100 Bucket Units Summation mismatches");
    }
  }
  async Validate100105Units(){
    const a= await this.getTotalStores.count();   
    var sum=0;
    for ( var i=1;i<=(a-3);i++)
    { 
     var beforeXpath85="//*[@id='NationalPTMTable']/div[3]/table[1]/tbody[1]/tr[";
     var afterXpath85="]/td[11]";
     var actualXpath85=beforeXpath85+i+afterXpath85;
     var b=await this.page.locator(actualXpath85).innerText();
     var c=parseInt(b);
     sum =sum+c;
    }
    const g= await this.getTotal100105Units.innerText();
    const sum1=parseInt(g);
    if(sum==sum1)
    {
      console.log(" National Price To Market 100-105 Bucket Units Summation matches");
    }
    else 
    {
      console.log(" National Price To Market 100-105 Bucket Units Summation mismatches");
    }
  }
  async Validate105Units(){
    const a= await this.getTotalStores.count();   
    var sum=0;
    for ( var i=1;i<=(a-3);i++)
    { 
     var beforeXpath85="//*[@id='NationalPTMTable']/div[3]/table[1]/tbody[1]/tr[";
     var afterXpath85="]/td[13]";
     var actualXpath85=beforeXpath85+i+afterXpath85;
     var b=await this.page.locator(actualXpath85).innerText();
     var c=parseInt(b);
     sum =sum+c;
    }
    const g= await this.getTotal105Units.innerText();
    const sum1=parseInt(g);
    if(sum==sum1)
    {
      console.log(" National Price To Market 105 Bucket Units Summation matches");
    }
    else 
    {
      console.log(" National Price To Market 105 Bucket Units Summation mismatches");
    }
  }

}
module.exports = { PriceToMarket };