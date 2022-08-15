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
    this.getDrivewayTab=page.locator(':nth-match(:text("Driveway"),1)');
    this.getDrivewaySuppressionReport=page.locator('text="Driveway Suppression Report"');
    this.getUsername=page.locator('id=i0116');
    this.getPassword=page.locator('id=i0118');
    this.getBodyShop=page.locator('text=" Body Shop"');
    this.getBodyShopReport =page.locator('text="Body Shop Report"');
    this.getServiceDashboard=page.locator(':nth-match(:text("Service"),1)');
    this.getServiceDashboardReport =page.locator('text=Service Dashboard');
    this.getServiceRepairOrderLogReport =page.locator('text="Repair Order Log"');
    this.getServiceFlatRateHrsReport=page.locator(':nth-match(:text("Flat Rate Hours"),2)');
    this.getServiceAdvisorReport=page.locator('text="Advisor Report"');
    this.getServicePDELMobileReport=page.locator('text="PDEL/Mobile Reports"');
    this.getServiceTechnicianPerformanceReport=page.locator('text="Technician Performance"');
    this.getParts=page.locator('text="Parts "');
    this.getPartsReport=page.locator('text="Parts Report"');
    this.getAdmin=page.locator('text="Admin"');
    this.getAdminTrackingDashboard=page.locator('text=" Tracking Dashboard"');
    this.getAdminSiteAlert=page.locator('text=" Site Alert"');
    this.getOffice=page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeCashARVAlidationLOg=page.locator('text="Cash & AR Validation Log"');
    this.getVehicleDocTracking=page.locator('text="Vehicle Doc Tracking (VDT)"');
    this.getPopupCloseVehicleDocTracking=page.locator('text="Close"');
    this.getInventoryNotInFirstLook=page.locator('text="Inventory not in Firstlook"');
    this.getBankOfHawaii=page.locator('text="Bank of Hawaii"');
    this.getAssuredServiceContractSalesSummary=page.locator('text="Assured Service Contract Sales Summary"');
    this.getOfficeSchedules=page.locator(':nth-match(:text("Schedule"),1)');
    this.getOfficeSchedulesSummary=page.locator('text="Schedules Summary"');
    this.getOfficeSchedulesArAP=page.locator('text="AR AP"');
    this.getOfficeSchedulesSARExceptionRequest=page.locator('text="SAR - Exception Request"');
    this.getOfficesSchedulesSARExceptionApproval=page.locator('text="SAR - Exception Approval"');
    this.getOfficeSchedulesSARAdministration=page.locator('text="SAR - Administration"');
    this.getOfficeMonthEndReview=page.locator('text="Month End Review"');
    this.getOfficeMonthEndSubmittal=page.locator('text="Month End - Submittal"');
    this.getOfficeMonthEndReadOnly=page.locator('text="Month End - Read Only"');
    this.getOfficeMonthEndApproval=page.locator('text="Month End - Approval"');
    this.getOfficeMonthEndAdmin=page.locator('text="Month End - Admin"');
    this.getOfficeMonthEndAudit=page.locator('text="Month End - Audit"');
    this.getOfficeFabSoft=page.locator('text="Fabsoft"');
    this.getOfficeFabSoftProductionLog=page.locator('text="Production Log"');
    this.getOfficeFabSoftScanLog=page.locator('text="Scan Log"');
    this.getOfficeFabSoftJournal=page.locator('text="Journal 79 JVs not in SharePoint"');
    this.getOfficeDealProcessing=page.locator('text="Deal Processing"');
    this.getOfficeDealAutomationProductLog=page.locator('text="Deal Automation Prod Log"');
    this.getOfficeOTIServiceDriveSales=page.locator('text="OTI Service Drive Sales"');
    this.getOfficeOTiTableViewer=page.locator('text="OTI Table Viewer"');
    this.getOfficeShipper=page.locator('text="Shippers"');
    //Main Tb 
    this.getMainTab=page.locator(':nth-match(:text("Main"),1)');
    this.getMainStorePerformanceDashboard=page.locator('text=("Store Performance Dashboard"');
    this.getMainStorePerformanceScorecardSPS=page.locator('text=("Store Performance Scorecard (SPS)"');
    this.getMainAnnualOperatingPlan=page.locator('text=("Annual Operating Plan"');
    this.getMainRetailReadinessOmnichannel=page.locator('text=(" Retail Readiness (Omnichannel)"');
    this.getMainStaffingAnalysis =page.locator('text=("Staffing Analysis "');
    this.getMainMIS=page.locator(':nth-match(:text("MIS"),1)');
    this.getMainMIS1Standard=page.locator('text=("MIS 1 (Standard)"');
    this.getMainMISComparison=page.locator('text=("MIS Comparison"');
    this.getMainOperationalMIS=page.locator('text=("Operational MIS"');
    this.getMainStoreRosters=page.locator('text=("Store Rosters"');
    this.getMainStoreLeadershipReport =page.locator('text=("Store Leadership Report"');
    this.getMainStoreRosters=page.locator('text=("Store Rosters"');
    
    //Sales Tab
    this.getSalesTab=page.locator(':nth-match(:text("Sales"),1)');
    this.getSalesNewVehicle=page.locator('text="New Vehicle"');
    this.getSalesNewVehicleDashboard=page.locator('text="New Vehicle Dashboard"');
    this.getSalesApprovabilityScorecard=page.locator('text="Approvability Scorecard"');
    this.getSalesNewInventoryDetail=page.locator('text="New Inventory Detail"');
    this.getSalesIncentiveLog=page.locator('text="Incentive Log"');
    this.getSalesRDRReconciliation=page.locator('text=("RDR Reconciliation"');
    this.getSalesLoanerVehicleDetail=page.locator('text=("Loaner Vehicle Detail"');
    //Used Vehicle
    this.getSalesUsedVehicle=page.locator('text="Used Vehicle"');
    this.getSalesUsedVehicleDashboard=page.locator('text="Used Vehicle Dashboard"');
    this.getSalesPurchaseLogTradeIn=page.locator('text="Purchase Log / Trade-In"');
    this.getSalesUsedInventoryDetail=page.locator('text="Used Inventory Detail"');
    this.getSalesInventoryAnalysisUVIA=page.locator('text="Inventory Analysis (UVIA)"');
    this.getSalesUsedVehicleReportCard=page.locator('text="Used Vehicle Report Card"');
    // F&I Ops 
    this.getSalesFIOps=page.locator('text="F&I Ops"');
    this.getSalesFIOpsDashboard=page.locator('text="F&I Ops Dashboard"');
    this.getSalesFILog=page.locator('text="F&I Log"');
    this.getSalesFILogNew=page.locator('text="F&I Log - New"');
    this.getSalesFIPerformanceScorecard=page.locator('text="F&I Performance Scorecard"');
    this.getSalesFIManagerPerformance=page.locator('text="F&I Manager Performance"');
    this.getSalesFITopProducers=page.locator('text="F&I Top Producers"');
    this.getSalesFIBankLog=page.locator('text="F&I Bank Log"');
   //Sales Log
   this.getSalesSalesLog=page.locator('text="Sales Log"');
   this.getSalesRetailSalesLogALOG=page.locator('text="Retail Sales Log (ALOG)"');
   this.getSalesWholesaleLogALOG=page.locator('text="Wholesale Log (ALOG"');
   this.getSalesCITSummary=page.locator('text="CIT Summary"');
    //
    this.getSalesBookedandPending=page.locator('text="Booked and Pending"');
    this.getSalesSalesPersonnelPerformance=page.locator('text="Sales Personnel Performance"');
    this.getSalesWeekendMonthEndSummary=page.locator('text="Weekend/Month End Summary"');
    this.getSalesSubmitaSummary=page.locator('text="Submit a Summary"');
    this.getSalesViewReports=page.locator('text="View Reports"');
    this.getSalesWeekendSummary=page.locator('text="Weekend Summary"');
    this.getSalesMonthEndReport=page.locator('text="Month End Report"');
    this.getSalesSalesMgrTopProducers=page.locator('text="Sales Mgr Top Producers"');
    
  } 
  //Navigate to Main Tab/ Performace Dashboard Report
      async NavigateToMain() {
        await this.getMainTab.click();
        await this.getMainStorePerformanceDashboard.click();
        await this.page.waitForLoadState('networkidle');
      }
    // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
     await this.page.goto('https://spedev.lithiainc.com/main/store',{timeout:0});
  // Pause for 10 seconds, to see what's going on.
  await this.page.waitForLoadState('networkidle');
  }
  // get elements of all locators
  async NavigateToDriveway() {
   await this.getDrivewayTab.click();
   await this.getDrivewaySuppressionReport.click();
   await this.page.waitForLoadState('networkidle');
  }
  async NavigateToBodyShop(){
    await this.getBodyShop.click();
    await this.getBodyShopReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceDashboard(){
    await this.getServiceDashboard.click();
    await this.getServiceDashboardReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceRepairOrderLog(){
    await this.getServiceDashboard.click();
    await this.getServiceRepairOrderLogReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceFlateRateHrs(){
    await this.getServiceDashboard.click();
    await this.getServiceFlatRateHrsReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceAdvisorReport(){
    await this.getServiceDashboard.click();
    await this.getServiceAdvisorReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServicePDELMobileReport(){
    await this.getServiceDashboard.click();
    await this.getServicePDELMobileReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToServiceTechnicianPerformanceReport(){
    await this.getServiceDashboard.click();
    await this.getServiceTechnicianPerformanceReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToPartsReport(){
    await this.getParts.click();
    await this.getPartsReport.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToAdminTrackingDashboardReport(){
    await this.getAdmin.click();
    await this.getAdminTrackingDashboard.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NAvigateToAdminJobLauncher(){
    await this.page.goto('https://spedev.lithiainc.com/Admin/Jobs.aspx');;
    await this.page.waitForLoadState('networkidle');
  }
  async NAvigateToAdminEmployeeLookup(){
    await this.page.goto('https://spedev.lithiainc.com/Admin/EmployeeLookup');
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToAdminSiteAlert(){
    await this.getAdmin.click();
    await this.getAdminSiteAlert.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToCashARValidationLog(){
    await this.getOffice.click();
    await this.getOfficeCashARVAlidationLOg.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToVehicleDocTracking()
  {
    await this.getOffice.click();
    await this.getVehicleDocTracking.click();
    await this.page.waitForLoadState('networkidle');
    await this.getPopupCloseVehicleDocTracking.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigatetoInventoryNotInFirstLook(){
    await this.getOffice.click();
    await this.getInventoryNotInFirstLook.click();
  }
  async NavigatetoBankofHawaii(){
    await this.getOffice.click();
    await this.getBankOfHawaii.click();
  }
  async NavigateToAssuredServiceContractSalesSummary(){
    await this.getOffice.click();
    await this.getAssuredServiceContractSalesSummary.click();
  }
  async NavigateToOfficeSchedulesSummary(){
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeSchedulesARAP(){
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesArAP.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeSchedulesSARExceptionRequest(){
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSARExceptionRequest.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeSchedulesSARExceptionApproval(){
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficesSchedulesSARExceptionApproval.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeSchedulesSARAdministration(){
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSARAdministration.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeMonthEndSubmittal(){
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndSubmittal.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeMonthEndReadOnly(){
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndReadOnly.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeMonthEndApproval(){
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndApproval.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeMonthEndAdmin(){
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndAdmin.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeMonthEndAudit(){
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndAudit.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigateToOfficeFabsoftProductionLog(){
    await this.getOffice.click();
    await this.getOfficeFabSoft.click();
    await this.getOfficeFabSoftProductionLog.click();
  }
  async NavigateToOfficeFabsoftJournal(){
    await this.getOffice.click();
    await this.getOfficeFabSoft.click();
    await this.getOfficeFabSoftJournal.click();
  }
  async NavigatetoOfficeDealAutomationProductionLog()
  {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeDealAutomationProductLog.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigatetoOfficeOTIServiceDriveSales()
  {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeOTIServiceDriveSales.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigatetoOfficeOTITableViewer()
  {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeOTiTableViewer.click();
    await this.page.waitForLoadState('networkidle');
  }
  async NavigatetoOfficeShipper()
  {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeShipper.click();
    await this.page.waitForLoadState('networkidle');
  }
  // click elements
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
}
module.exports = { MainStore };
