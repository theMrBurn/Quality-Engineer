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
    async ValidateWithDetailUnits(){
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(9000);
      const newactual=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[1]/td[2]").innerText();
      const newpacing=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[1]/td[3]").innerText();
      const newplan=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[1]/td[5]").innerText();
      const newplan2=newplan.replace("●"," ●");
      const usedactual=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[2]/td[2]").innerText();
      const usedpacing=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[2]/td[3]").innerText();
      const usedplan=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[2]/td[5]").innerText();
      const usedplan2=usedplan.replace("●"," ●");
      const salesgrossplan=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[4]/td[5]").innerText();
      const salesgrossplan2=salesgrossplan.replace("●"," ●");
      const servicegrossplan=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[6]/td[5]").innerText();
      const servicegrossplan2=servicegrossplan.replace("●"," ●");
      const detailgrossplan=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[7]/td[5]").innerText();
      const detailgrossplan2=detailgrossplan.replace("●"," ●");
      const partsgrossplan=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[8]/td[5]").innerText();
      const partsgrossplan2=partsgrossplan.replace("●"," ●");
      const totalstoregrossplan=await this.page.locator("//*[@id='PerformanceTracking']/table[1]/tbody[1]/tr[10]/td[5]").innerText();
      const totalgrossplan2=totalstoregrossplan.replace("●"," ●");
      await this.page.locator("//*[@id='Panel1']/h3[1]/span[2]/a[1]").click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(5000);
      const newactual1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[4]").nth(0).innerText();
      const newpacing1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[5]").nth(0).innerText();
      const newplan1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[6]").nth(0).innerText();
      const usedactual1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[7]").nth(0).innerText();
      const usedpacing1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[8]").nth(0).innerText();
      const usedplan1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[9]").nth(0).innerText();
      const salesgrossplan1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[12]").nth(0).innerText();
      const servicegrossplan1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[15]").nth(0).innerText();
      const detailgrossplan1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[18]").nth(0).innerText();
      const partsgrossplan1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[21]").nth(0).innerText();
      const totalstoregrossplan1=await this.page.locator("//*[@id='performanceGridTable']/div/table/tbody/tr/td[24]").nth(0).innerText();
      if(newactual!=newactual1){
        console.log(" The Performance tracking widget New vehicle actual units mismatch in details link");
      }
      if(newplan2!=newplan1){
        console.log(" The Performance tracking widget New vehicle plan % mismatch in details link"+newplan2+":"+newplan1);
      }
      if(newpacing!=newpacing1){
        console.log(" The Performance tracking widget New vehicle pacing units mismatch in details link");
      }
      if(usedactual!=usedactual1){
        console.log(" The Performance tracking widget used vehicle actual units mismatch in details link");
      }
      if(usedplan2!=usedplan1){
        console.log(" The Performance tracking widget used vehicle plan % mismatch in details link"+usedplan2+":"+usedplan1);
      }
      if(usedpacing!=usedpacing1){
        console.log(" The Performance tracking widget used vehicle pacing units mismatch in details link");
      }
      if(salesgrossplan2!=salesgrossplan1){
        console.log(" The Performance tracking widget sales gross plan % mismatch in details link");
      }
      if(servicegrossplan2!=servicegrossplan1){
        console.log(" The Performance tracking widget service gross plan % mismatch in details link");
      }
      if(detailgrossplan2!=detailgrossplan1){
        console.log(" The Performance tracking widget detail gross plan % mismatch in details link");
      }
      if(partsgrossplan2!=partsgrossplan1){
        console.log(" The Performance tracking widget parts gross plan % mismatch in details link");
      }
      if(totalgrossplan2!=totalstoregrossplan1){
        console.log(" The Performance tracking widget total store gross plan % mismatch in details link");
      }      
}
}
module.exports = { InventoryWidget };