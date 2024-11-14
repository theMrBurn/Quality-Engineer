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
    this.getOnline=page.locator(':nth-match(:text("Excess"),1)');
    this.getStore=page.locator('//*[@id="ExcessTable"]/div[3]/table[1]/tbody[1]/tr[7]/td[1]/a[1]');
    this.getStore1=page.locator('//*[@id="ExcessTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]');
    this.getColumn=page.locator('text=Column SettingsMake >> span');
    this.getChooseColumn=page.locator('text=Choose columns');
    this.getCompanyName= page.locator('text=Company Name');
    this.getPageLoad=page.locator('#NewDetailTable div >>nth=2');
    this.getPictureColumn= page.locator('text=Picture');
    this.getTotalRows=page.locator('tr');
    this.getStoreSelector=page.locator('header >> text=Multiple Stores');
    this.getAllselector=page.locator('.allSelectorIndicator');    
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
  }
  async SelectStoresForRegression(){
    await this.page.waitForTimeout(5000);
    await this.getStoreSelector.click();
    await this.getAllselector.click();
    await this.getSelectButton.click();
    await this.page.waitForLoadState('networkidle');
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
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewInventoryDetail.first().click();
    await this.page.waitForLoadState('networkidle');
    await this.getOnline.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToSalesNewInventoryDetail1() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(7000);
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewInventoryDetail.first().click();
    await this.page.waitForLoadState('networkidle');
    await this.getOnline.click();
    await this.page.waitForLoadState('networkidle');
  }
 //If Total Picture Column count is above 0, then Picture column should always be Y
async validatePictureRule(){
await this.page.waitForLoadState('networkidle');
await this.getColumn.click();
await this.getChooseColumn.click();
await this.getPictureColumn.nth(0).click();
await this.getPageLoad.click();
var z=await this.getTotalRows.count();
var beforeXpath="//tr[";
var Afterpath="]/td[23]";
var beforexpath1="//tr[";
var afterxpath2="]/td[22]/div[1]";
for(var i=3;i<(z-3);i++)
{
var dactualxpath=beforeXpath+i+Afterpath;
var c=await this.page.locator(dactualxpath).innerText();
var g=parseInt(c);
var actual=beforexpath1+i+afterxpath2;
this.getFlag=this.page.locator(actual);
  if(g>0){
await expect(this.getFlag).toHaveText('Y');
}
else if(g==0)
{
await expect(this.getFlag).toHaveText('N');
}}}
//have store name displayed in column, never blank.
async ValidateStoreName(){
await this.getStore.click();
await this.page.waitForLoadState('networkidle');
await this.getColumn.click();
await this.getChooseColumn.click();
await this.getCompanyName.click();
await this.getPageLoad.click();
await this.page.waitForTimeout(5000);
var z=await this.getTotalRows.count();
for ( var i=3;i<(z-3);i++)
{
  var beforXpath="//tr[";
  var afterXpath="]/td[3]";
  var actualXpath=beforXpath+i+afterXpath;
  this.getCompanyName=this.page.locator(actualXpath);
  await expect(this.getCompanyName).toBeVisible();
}
}
async  ValidateInTransitColumn(){  
  await this.getStore1.click();
  await this.page.waitForLoadState('networkidle');
  var a="//tr[";
  var b="]/td[32]";
  var c="//tr[";
  var d="]/td[18]";
  var j="//tr[";
  var k="]/td[19]";
  var z=await this.getTotalRows.count();
  for(var i=3;i<(z-3);i++){
  var actualXpathONGround=c+i+d;
  var actualXpathInTransit=a+i+b;
  var actualXpathInvoiceAge=j+i+k;
  var e= await this.page.locator(actualXpathONGround).innerText();
  var h=parseInt(e);
  var f=await this.page.locator(actualXpathInTransit).innerText();
  var jk=await this.page.locator(actualXpathInvoiceAge).innerText();
  var lm=parseInt(jk);
  if( h==0 && lm==0 && f!='On-Ground'){
    console.log('New Inventory - Excess - Onground Aging In transit logic fail');
  }
  else if( h > 0 && f=='On-Ground'){
  }
  else if (e=='IT' && lm >0 && f!='In-Tansit'){
  console.log('New Inventory -Excess- Onground Aging In transit logic fail');
  }
  else (h>0 && lm >0 &&f!='On-Ground')
  {
  console.log('New Inventory -Excess- Onground Aging In transit logic fail');
  }
}}
}
module.exports = { NewVehicleInventory };