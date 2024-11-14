// this POM is for /Payroll
const { expect } = require("@playwright/test");

class Retail
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
    this.getRetail=page.locator(':nth-match(:text("Retail Sales Log (ALOG)"),1)');
    this.getTotals=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]');
    this.getTotalCount=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]');
    this.getDetailTotals=page.locator('span[class="k-pager-info k-label"]');
    this.getInventoryType=page.locator('text=Column SettingsInventoryType >> span');
    this.getFilterSelect=page.locator('text=Apply filter >> span');
    this.getRetailFilter=page.locator('text=Show items with value that:Is equal toselectIs equal toIs not equal toStarts wit >> input[type="text"]');
    this.getFilterButton=page.locator('button:has-text("Filter")');
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getCanada=page.locator('text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner >> div');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getTotalRows=page.locator('tr');
    
  }
  async SelectStoresForRegression(){
   await this.page.waitForLoadState('networkidle');
   await this.getStoreSelector.nth(2).click();
   await this.getAllselector.click();
   await this.getAllselector.click();
   await this.getCanada.first().click();
   await this.getSelectButton.click();
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
    }
  async twostepauthlogin(){
      await this.page.click('id=KmsiCheckboxField');
      await this.page.click('id=idSIButton9');
  }
  async NavigateToSalesRetailLogALOG() {      
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      await this.getSalesTab.click();
      await this.getSalesLog.click();
      await this.getRetail.click();
      await this.page.waitForLoadState('networkidle');
  }
  async ValidateTotalForStores(){
    let array1=new Array();
    let array2=new Array();   
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    for (let i=1;i<=16;i++)
    {
      const beforeSummaryXpath="//*[@id='retailTable']/div[3]/table[1]/tbody[1]/tr[";
      const AfterSummaryXpath="]/td[11]";
      var ActualSummaryXpath=beforeSummaryXpath+i+AfterSummaryXpath;
      array1[i]=await this.page.locator(ActualSummaryXpath).innerText();
      array2[i]=parseInt(array1[i]);
    }     
    let array3=new Array();
    let array4=new Array();
    let array5=new Array();
    for(let j=1;j<=16;j++){
      const beforeStoreNameXpath="//*[@id='retailTable']/div[3]/table[1]/tbody[1]/tr[";
      const AfterStoreNameXpath="]/td[1]/a[1]";
      let ActualStoreName=beforeStoreNameXpath+j+AfterStoreNameXpath;
      array5[j]=await this.page.locator(ActualStoreName).innerText();
      await this.page.locator(ActualStoreName).click();      
      await this.page.waitForLoadState('networkidle');
      await this.getInventoryType.click();
      await this.getFilterSelect.nth(1).click();
      await this.getRetailFilter.first().fill('Retail');
      await this.getFilterButton.press('Enter');          
      await this.page.waitForLoadState('networkidle');    
      array3[j]=await this.getTotalRows.count();
      array4[j]=array3[j]-1;
      await this.page.goBack();
      await this.page.waitForLoadState('networkidle');
    }
    for(let k=1;k<16;k++){
      if(array2[k]!=(array4[k]-1))
      {
        console.log("The totals for a pfaff store for Inventory Type Retail is not matching between summary and detail page for the store "+array5[k]+" : "+ array2[k]+" :"+ (array4[k]-1));
      }
    }
  }

 }
module.exports = { Retail };