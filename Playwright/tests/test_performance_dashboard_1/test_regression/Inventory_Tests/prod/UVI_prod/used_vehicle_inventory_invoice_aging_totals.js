// this POM is for /Payroll
const { expect } = require("@playwright/test");

class UsedVehicleInventory
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesUsedVehicle=page.locator(':nth-match(:text("Used Vehicle"),1)');
    this.getSalesUsedInventoryDetail=page.locator('text="Used Inventory Detail"');
    this.getUsedInventorySummaryTotals=page.locator('text="Totals"');
    this.getUsedInventoryInvoiceAging=page.locator('text="Invoice Aging"');
    //this.getUsedInventoryVehicleTotalsCount1=page.locator("a[href^='/reports/UVIDetail?CoNo=-10507,-779,-773,-771,-770,-769,-768,-767,-766,-764,-762,-746,-713,-710,-709,-708,-707,-705,-703,-702,-701,-547,-542,-541,-538,-537,-536,-519,-518,-510,-508,-507,-504,-503,-502,-501,-499,-495,-494,-492,-491,-479,-477,-476,-475,-474,-473,-470,-469,-468,-467,-466,-465,-464,-463,-462,-461,-457,-456,-453,-452,-451,-449,-448,-447,-446,-445,-444,-443,-442,-437,-436,-435,-434,-433,-432,-431,-430,-429,-428,-427,-426,-425,-424,-423,-422,-421,-419,-418,-417,-416,-415,-414,-412,-411,-409,-408,-407,-406,-405,-403,-402,-401,-400,-399,-398,-396,-395,-394,-393,-392,-389,-388,-385,-384,-381,-379,-378,-377,-376,-375,-374,-373,-371,-368,-367,-365,-364,-363,-362,-361,-359,-358,-357,-356,-355,-354,-353,-352,-351,-349,-348,-347,-343,-342,-341,-340,-339,-337,-336,-335,-330,-327,-326,-324,-323,-319,-318,-317,-316,-311,-310,-309,-308,-307,-306,-304,-278,-258,-253,3,4,6,9,11,15,19,20,23,26,27,29,34,38,48,51,52,53,56,57,58,59,60,61,63,65,72,99,106,109,110,113,114,116,121,124,125,127,131,134,138,140,142,143,145,146,148,149,150,152,153,154,155,157,159,162,163,169,172,173,176,178,179,180,181,182,183,184,190,191,192,193,195,214,215,218,219,220,223,224,225,226,227,228,230,234,235,236,237,240,241,242,243,247,248,249,252,253,254,256,257,258,259,267,272,275,278,279,280,286,287,288,289,292,294,295,301,304,305,306,307,308,309,310,311,316,317,318,319,323,324,326,327,330,331,335,336,337,339,340,341,342,343,346,347,348,349,351,352,353,354,355,356,357,358,359,361,362,363,364,365,367,368,371,373,374,375,376,377,378,379,380,381,382,383,384,385,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,441,442,443,444,445,446,447,448,449,451,452,453,455,456,457,458,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,486,488,491,492,494,495,497,499,501,502,503,504,507,508,510,515,516,517,518,519,521,522,524,525,526,527,529,530,531,532,533,534,535,536,537,538,540,541,542,543,547,552,553,554,555,556,563,564,565,566,567,568,569,701,702,703,705,707,708,709,710,711,713,714,715,717,718,719,721,722,723,724,725,727,739,740,742,744,747,751,756,762,764,765,766,767,768,769,770,771,773,779,10507&Bucket=16']");
    //this.getUsedInventoryVehicleTotalsCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI030DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]');
    this.getUVI030DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI3160DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/a[1]');
    this.getUVI3160DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI6190DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]/a[1]');
    this.getUVI6190DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVI91DaysTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/a[1]');
    this.getUVI91DaysTotalCount2=page.locator('span[class="k-pager-info k-label"]');
    this.getUVITotalTotalCount1=page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[12]/a[1]');
    this.getUVITotalTotalCount2=page.locator('span[class="k-pager-info k-label"]');
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
  async NavigateToSalesUsedInventoryDetail() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(7000);
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedInventoryDetail.first().click();
    await this.getUsedInventoryInvoiceAging.click();
    await this.page.waitForLoadState('networkidle');
  }
  //To Check if DaysSupply field has value on it
  async ValidateDaySupply(){
   const BeforeDSXpath="//*[@id='AgingTable']/div[3]/table[1]/tbody[1]/tr[";
   const AfterDSXpath="]/td[15]";
   let a=await this.page.locator("tr").count();
   for(let i=1;i<(a-3);i++){
        let ActualDSXpath=BeforeDSXpath+i+AfterDSXpath;
        expect(this.page.locator(ActualDSXpath)).toBeTruthy();
      }
    }
  //Methods ot verify if the total number of vehicles in used inventory summary is equal to the total vehicles displayed after clicking totals hyperlink
 async VerifyTotalVehicle030Days(){
  await this.page.waitForLoadState('networkidle');
  const a = await this.getUVI030DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getUVI030DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getUVI030DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("Invoice - Aging Totals iN 0-30 Days Match");   
  else
  console.log("Invoice - Aging Totals in 0-30 Days Mismatch");
}
async VerifyTotalVehicle3160Days(){  
  await this.page.waitForLoadState('networkidle');
  const a = await this.getUVI3160DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getUVI3160DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getUVI3160DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("Invoice Aging 31 - 60 Days Totals match");   
  else
  console.log("Invoice Aging 31 - 60 Days Totals mismatch");
}
async VerifyTotalVehicle6190Days(){
  await this.page.waitForLoadState('networkidle');
  const a = await this.getUVI6190DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getUVI6190DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getUVI6190DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("Invoice Aging 61 - 90 Days Totals match");   
  else
  console.log("Invoice Aging 61 - 90 Days Totals mismatch");
}
async VerifyTotalVehicle91Days(){
  await this.page.waitForLoadState('networkidle');
  const a = await this.getUVI91DaysTotalCount1.innerText();
  const array = a.replace(',','');
  await this.getUVI91DaysTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const b =await this.getUVI91DaysTotalCount2.innerText();
  const array2= b.replace('1 - 100 of ','');
  const array3=array2.replace(' items','');
  if (array==array3)
  console.log("Invoice Aging 91+ Days Totals match");   
  else
  console.log("Invoice Aging 91+ Days Totals mismatch");
}

async VerifyTotalVehicleTotal(){
  await this.page.waitForLoadState('networkidle');
  const a = await this.getUVITotalTotalCount1.innerText();
  const array = a.replace(',','');
  const bucket1=parseInt(array);
  const b =await this.getUVI030DaysTotalCount1.innerText();
  const array2= b.replace(',','');
  const bucket2=parseInt(array2);
  const c =await this.getUVI3160DaysTotalCount1.innerText();
  const array3= c.replace(',','');
  const bucket3=parseInt(array3);
  const d =await this.getUVI6190DaysTotalCount1.innerText();
  const array4= d.replace(',','');
  const bucket4=parseInt(array4);
  const e =await this.getUVI91DaysTotalCount1.innerText();
  const array5=e.replace(',','');
  const bucket5=parseInt(array5);
  const sum= bucket2+bucket3+bucket4+bucket5;
  if (bucket1==sum)
  console.log("Invoice Aging - Total Totals match");   
  else
  console.log("Invoice Aging - Total Totals mismatch");
}
async verifyTotalBetWeenSummaryandDetailPage()
{
  await this.page.waitForLoadState('networkidle');
  const b =await this.getUVI030DaysTotalCount1.innerText();
  const  array2= b.replace(',','');
  const bucket1=parseInt(array2);
  const c =await this.getUVI3160DaysTotalCount1.innerText();
  const array3= c.replace(',','');
  const bucket2=parseInt(array3);
  const d =await this.getUVI6190DaysTotalCount1.innerText();
  const array4= d.replace(',','');
  const bucket3=parseInt(array4);
  const e =await this.getUVI91DaysTotalCount1.innerText();
  const array5=e.replace(',','');
  const bucket4=parseInt(array5);
  const sum= bucket1+bucket2+bucket3+bucket4;
  await this.getUVITotalTotalCount1.click();
  await this.page.waitForLoadState('networkidle');
  const a =await this.getUVITotalTotalCount2.innerText();
  const array= a.replace('1 - 100 of ','');
  const array7=array.replace(' items','');
  const tTotal=parseInt(array7);
  if (tTotal==sum)
  console.log("Invoice Aging - Total Totals match");   
  else
  console.log("Invoice Aging - Total Totals mismatch");
}
async SelectStoresForRegression(){
  await this.page.waitForTimeout(5000);
  await this.getStoreSelector.click();
  await this.getAllselector.click();
  await this.getSelectButton.click();
  await this.page.waitForLoadState('networkidle');
 }
}
module.exports = { UsedVehicleInventory };