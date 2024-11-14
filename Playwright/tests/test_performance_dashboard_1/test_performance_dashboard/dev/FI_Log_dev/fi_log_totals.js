// this POM is for /Payroll
const { expect } = require("@playwright/test");

class FILog
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getFIOps=page.locator(':nth-match(:text("F&I Ops"),1)');
    this.getFIlog=page.locator(':nth-match(:text("F&I Log"),1)');
    this.getCash=page.locator('xpath=//body/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/div[1]');
    this.getFin=page.locator('xpath=//body/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[3]/div[1]');
    this.getTotals=page.locator('xpath=//body/div[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/div[1]');
    this.getTotalStores=page.locator('tr');
    this.getStoreSelector=page.locator('div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")');
    this.getAllselector=page.locator('.allSelectorIndicator');
    this.getCanada=page.locator('text=CANADA[+]Concord Wholesale PartsConcord Wholesale VehiclesGuelph SubaruKitchner  >> div');
    this.getSelectButton=page.locator('#storeSelector >> text=Select');
    this.getGoBUtton=page.locator('text="GO"');
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
    async NavigateToSalesFILog() {
      await this.getSalesTab.click();
      await this.getFIOps.click();
      await this.getFIlog.click();
      await this.page.waitForLoadState('networkidle');
    }
    async SelectAllStores(){
      await this.page.waitForLoadState('networkidle');
      await this.getStoreSelector.nth(2).click();
      await this.getAllselector.click();
      await this.getSelectButton.click();
      await this.page.waitForLoadState('networkidle');
    }
 async VerifyTotalVehicle(){
    const a = await this.getCash.innerText();
    const totalcash=parseInt(a);
    const b = await this.getFin.innerText();
    const totalfin=parseInt(b);
    const sum=totalcash+totalfin;
    const total=await this.getTotals.innerText();
    const ttotal=parseInt(total);
    if (ttotal==sum)
    console.log("FI Log Total Match");   
    else
    console.log("FI Log  Total Mismatch");
 }
 async ValidateTotalCountForAStore(){
  const a= await this.getTotalStores.count();  
  for ( var i=1;i<=(a-3);i++)
  { 
   var beforeXpath="//div[3]/table[1]/tbody[1]/tr[";
   var afterXpathCash="]/td[2]";
   var afterXpathFin="]/td[3]";
   var afterXpathCount="]/td[4]";
   var beforeXpathStore="//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
   var afterXpathStore="]/td[1]/a[1]";
   var ActualStoreNameXpath=beforeXpathStore+i+afterXpathStore;
   var ActualXpathCash=beforeXpath+i+afterXpathCash;
   var ActualXpathFin=beforeXpath+i+afterXpathFin;
   var ActualXpathCount=beforeXpath+i+afterXpathCount;
   var j=await this.page.locator(ActualStoreNameXpath).innerText();
   var b=await this.page.locator(ActualXpathCash).innerText();
   if(b.length==0)
   {
    b=0;
   }
   var e=parseInt(b);
   var c=await this.page.locator(ActualXpathFin).innerText();
   if(c.length==0)
   {
    c=0;
   }
   var f=parseInt(c);
   var d=await this.page.locator(ActualXpathCount).innerText();
   if(d.length==0)
   {
    d=0;
   }
   var g=parseInt(d);
   var sum=e+f;
   if(sum==g)
   {
    console.log("The FI Log - total for a store "+ j + " matches");
   }
   else{
    console.log("The FI Log - total for a store "+ j +" mismatches");
   }}}
   async ValidateTotalCash(){
    const a= await this.getTotalStores.count();  
    var sum=0;
    for ( var i=1;i<=(a-3);i++)
    { 
     var beforeXpath="//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[";
     var afterXpathCash="]/td[2]";
     var ActualXpathCash=beforeXpath+i+afterXpathCash;
     var b=await this.page.locator(ActualXpathCash).innerText();
     if(b.length==0)
     {
      b=0;
     }
     var e=parseInt(b);
     sum= sum+e;
    }
    var c=await this.getCash.innerText();
    var g=parseInt(c);
     if(sum==g)
     {
      console.log("The FI Log -total Cash Count matches");
     }
     else{
      console.log("The FI Log -total Cash Count mismatches");
     }}
     async ValidateTotalFin(){
      const a= await this.getTotalStores.count();  
      var sum=0;
      for ( var i=1;i<=(a-3);i++)
      { 
       var beforeXpath="//div[3]/table[1]/tbody[1]/tr[";
       var afterXpathFin="]/td[3]";
       var ActualXpathFin=beforeXpath+i+afterXpathFin;
       var b=await this.page.locator(ActualXpathFin).innerText();
       if(b.length==0)
       {
        b=0;
       }
       var e=parseInt(b);
       sum= sum+e;
      }
      var c=await this.getFin.innerText();
      var g=parseInt(c);
       if(sum==g)
       {
        console.log("The FI Log -total Fin Count matches");
       }
       else{
        console.log("The FI Log -total Fin Count mismatches");
       }}
       async ValidateTotalCount(){
        const a= await this.getTotalStores.count();  
        var sum=0;
        for ( var i=1;i<=(a-3);i++)
        { 
         var beforeXpath="//div[3]/table[1]/tbody[1]/tr[";
         var afterXpathFin="]/td[4]";
         var ActualXpathFin=beforeXpath+i+afterXpathFin;
         var b=await this.page.locator(ActualXpathFin).innerText();
         if(b.length==0)
         {
          b=0;
         }
         var e=parseInt(b);
         sum= sum+e;
        }
        var c=await this.getTotals.innerText();
        var g=parseInt(c);
         if(sum==g)
         {
          console.log("The FI Log -total Count matches");
         }
         else{
          console.log("The FI Log -total Count mismatches");
         }}
 }
module.exports = { FILog };