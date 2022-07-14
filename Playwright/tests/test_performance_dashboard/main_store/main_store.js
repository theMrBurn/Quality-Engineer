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
    this.getdrivewaytab=page.locator(':nth-match(:text("Driveway"),1)');
    this.getdrivewaysuppressionreport=page.locator('text="Driveway Suppression Report"');
    this.getusername=page.locator('id=i0116');
    this.getpassword=page.locator('id=i0118');
    this.getbodyshop=page.locator('text=" Body Shop"');
    this.getbodyshopreport =page.locator('text="Body Shop Report"');
    this.getServiceDashboard=page.locator(':nth-match(:text("Service"),1)');
    this.getServiceDashboardreport =page.locator('text=Service Dashboard');
    this.getServiceRepairOrderLogreport =page.locator('text="Repair Order Log"');
    this.getServiceFlatRateHrsreport=page.locator(':nth-match(:text("Flat Rate Hours"),2)');
    this.getServiceAdvisorreport=page.locator('text="Advisor Report"');
    this.getServicePDELMobilereport=page.locator('text="PDEL/Mobile Reports"');
    this.getServiceTechnicianPerformancereport=page.locator('text="Technician Performance"');
    this.getParts=page.locator('text="Parts "');
    this.getPartsreport=page.locator('text="Parts Report"');
    this.getAdmin=page.locator('text="Admin"');
    this.getAdmintrackingDashboard=page.locator('text="Tracking Dashboard"');
    this.getAdminJobLauncher=page.locator('text="Job Launcher"');
    this.getAdminEmployeeLookUp=page.locator('text="Employee Lookup"');
    this.getAdminSiteAlert=page.locator('text="Site Alert"');
  }

  // use goto() if you intend on starting the test on a particilar page.
  async goto() {
     await this.page.goto('https://spedev.lithiainc.com/main/store');
  // Pause for 10 seconds, to see what's going on.
  await this.page.waitForTimeout(10000);
  }

  // get elements
  async NavigateToDriveway() {
   await this.getdrivewaytab.click();
   await this.getdrivewaysuppressionreport.click();
   await this.page.waitForLoadState('networkidle');
  }

  async NavigateToBodyShop(){
    await this.getbodyshop.click();
    await this.getbodyshopreport.click();
    await this.page.waitForLoadState('networkidle');
  }

  async NavigateToServiceDashboard(){
    await this.getServiceDashboard.click();
    await this.getServiceDashboardreport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceRepairOrderLog(){
    await this.getServiceDashboard.click();
    await this.getServiceRepairOrderLogreport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceFlateRateHrs(){
    await this.getServiceDashboard.click();
    await this.getServiceFlatRateHrsreport.click();
    await this.page.waitForLoadState('networkidle');

  }
  async NavigateToServiceAdvisorreport(){
    await this.getServiceDashboard.click();
    await this.getServiceAdvisorreport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServicePDELMobilereport(){
    await this.getServiceDashboard.click();
    await this.getServicePDELMobilereport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceTechnicianPerformancereport(){
    await this.getServiceDashboard.click();
    await this.getServiceTechnicianPerformancereport.click();
    await this.page.waitForLoadState('networkidle');
  }

  async NavigateToPartsreport(){
    await this.getParts.click();
    await this.getPartsreport.click();
    await this.page.waitForLoadState('networkidle');
  }

  async NavigateToAdminTrackingDashboardreport(){
    await this.getAdmin.click();
    await this.getAdmintrackingDashboard.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NAvigateToAdminJobLauncher(){
    await this.getAdmin.click();
    await this.getAdminJobLauncher.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NAvigateToAdminEmployeeLookup(){
    await this.getAdmin.click();
    await this.getAdminEmployeeLookUp.click();
    await this.page.waitForLoadState('networkidle');
  }

  async NavigateToAdminSiteAlert(){
    await this.getAdmin.click();
    await this.getAdminSiteAlert.click();
    await this.page.waitForLoadState('networkidle');
  }

  // click elements
  async login() {
  await this.getusername.click();
  await this.page.fill('input[id="i0116"]', 'SamJazayerli@lithia.com'); //username
  await this.page.locator('id=idSIButton9').click();
  await this.getpassword.click();
  await this.page.fill('input[name="passwd"]', 'Janet@1van'); //pwd
  await this.page.click('text=Sign In');
  await this.page.waitForNavigation();
  }
  async twostepauthlogin(){
    await this.page.click('id=KmsiCheckboxField');
    await this.page.click('id=idSIButton9');
  }
}
module.exports = { MainStore };
