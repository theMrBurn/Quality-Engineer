// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore
 {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo=page.locator("id=logo");    
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getSalesTab=page.locator('text="Sales" >> nth=0');
    this.getSalesWeekendMonthEndSummary=page.locator(':nth-match(:text("Weekend/Month End Summary"),1)');
    this.getSalesSubmitaSummary=page.locator(':nth-match(:text("Submit a Summary"),1)');
    this.getSalesViewReports=page.locator(':nth-match(:text("View Reports"),1)');
    this.getSalesMonthEndReport=page.locator(':nth-match(:text("Month End Report"),1)');
    this.getHistorical1=page.locator('text="Pittsburgh Subaru-Historical"');
    this.getHistorical2=page.locator('text="Wexford Honda-Historical"');
    this.getHistorical3=page.locator('text=Wexford Cadillac-Historical');
    this.getHistorical4=page.locator('text=Wexford Chevrolet-Historical');
    this.getHistorical5=page.locator('text=Wexford Acura-Historical');
    this.getHistorical6=page.locator('text=Cranberry Township Toyota-Historical');
    this.getHistorical7=page.locator('text=Zelienople Ford-Historical');
    this.getRollUp1=page.locator('text="Sterling Rolls-Royce"');
    this.getRollup2=page.locator('text="Sterling Lamborghini"');
    this.getRollup3=page.locator('text="Sterling McLaren"');    
    this.getRollup4=page.locator('text="Sterling MINI")');
    this.getRollup5=page.locator('text="Sterling BMW"');
 }     
 async NavigateToSalesMonthEndReport() {
      await this.getSalesTab.click();
      await this.getSalesWeekendMonthEndSummary.click();
      await this.getSalesViewReports.click();
      await this.getSalesMonthEndReport.click();
      await this.page.waitForLoadState('networkidle');
      await expect(this.getSPELogo).toBeVisible();
    }
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
     await this.page.goto('https://speuat.lithiainc.com/main/store',{timeout:0});
  // Pause for 10 seconds, to see what's going on.
  await this.page.waitForLoadState('networkidle');
  }
  // Login
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
  async ValidateTheHistoricalStores(){
    await this.page.waitForLoadState('networkidle');    
    await expect(this.getHistorical1).not.toBeVisible();
    await expect(this.getHistorical2).not.toBeVisible();
    await expect(this.getHistorical3).not.toBeVisible();
    await expect(this.getHistorical4).not.toBeVisible();
    await expect(this.getHistorical5).not.toBeVisible();
    await expect(this.getHistorical6).not.toBeVisible();
    await expect(this.getHistorical7).not.toBeVisible();
    await expect(this.getRollUp1).not.toBeVisible();
    await expect(this.getRollup2).not.toBeVisible();
    await expect(this.getRollup3).not.toBeVisible();
    await expect(this.getRollup4).not.toBeVisible();
    await expect(this.getRollup5).not.toBeVisible();
  }
  }
module.exports = { MainStore };
