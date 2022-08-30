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
    //this.getMainStorePerformanceDashboard=page.locator('text=("Store Performance Dashboard"');
    //this.getMainStorePerformanceScorecardSPS=page.locator('text=("Store Performance Scorecard (SPS)"');
    this.getMainAnnualOperatingPlan=page.locator(':nth-match(:text("Annual Operating Plan"),1)');
    this.getMainRetailReadinessOmnichannel=page.locator(':nth-match(:text(" Retail Readiness (Omnichannel)"),1)');
    this.getMainStaffingAnalysis =page.locator(':nth-match(:text("Staffing Analysis "),1)');
    this.getMainMIS=page.locator(':nth-match(:text("MIS"),1)');
    this.getMainMIS1Standard=page.locator(':nth-match(:text("MIS 1 (Standard)"),3)');
    this.getMainMISComparison=page.locator(':nth-match(:text("MIS Comparison"),1)');
    this.getMainOperationalMIS=page.locator(':nth-match(:text("Operational MIS"),1');
    this.getMainStoreRosters=page.locator(':nth-match(:text("Store Rosters"),1)');
    this.getMainStoreLeadershipReport =page.locator(':nth-match(:text("Store Leadership Report"),1)');
    this.getMainStoreRosters=page.locator(':nth-match(:text("Store Rosters"),1)');
    
    //Sales Tab
    this.getSalesTab=page.locator(':nth-match(:text("Sales"),1)');
    this.getSalesNewVehicle=page.locator(':nth-match(:text("New Vehicle"),1)');
    this.getSalesNewVehicleDashboard=page.locator(':nth-match(:text("New Vehicle Dashboard"),1)');
    this.getSalesApprovabilityScorecard=page.locator('text="Approvability Scorecard"');
    this.getSalesNewInventoryDetail=page.locator(':nth-match(:text("New Inventory Detail"),1)');
    this.getSalesIncentiveLog=page.locator(':nth-match(:text("Incentive Log"),1)');
    this.getSalesRDRReconciliation=page.locator(':nth-match(:text("RDR Reconciliation"),1)');
    this.getSalesLoanerVehicleDetail=page.locator(':nth-match(:text("Loaner Vehicle Detail"),1)');
    //Used Vehicle
    this.getSalesUsedVehicle=page.locator(':nth-match(:text("Used Vehicle"),1)');
    this.getSalesUsedVehicleDashboard=page.locator(':nth-match(:text("Used Vehicle Dashboard"),1)');
    this.getSalesPurchaseLogTradeIn=page.locator(':nth-match(:text("Purchase Log / Trade-In"),1)');
    this.getSalesUsedInventoryDetail=page.locator(':nth-match(:text("Used Inventory Detail"),1)');
    this.getSalesInventoryAnalysisUVIA=page.locator(':nth-match(:text("Inventory Analysis (UVIA)"),1)');
    this.getSalesUsedVehicleReportCard=page.locator(':nth-match(:text("Used Vehicle Report Card"),1)');
    // F&I Ops 
    this.getSalesFIOps=page.locator(':nth-match(:text("F&I Ops"),1)');
    // I did change the locators until this.
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
    async NavigateToMainStorePerformanceDashboard() {
      await this.getMainTab.click();
      await this.getMainStorePerformanceDashboard.click();
      await this.page.waitForLoadState('networkidle');
        }
    async NavigateToMainStorePerformanceScorecardSPS() {
      await this.getMainTab.click();
        await this.getMainStorePerformanceScorecardSPS.click();
        await this.page.waitForLoadState('networkidle');
         }
    
    async NavigateToMainAnnualOperatingPlan() {
      await this.getMainTab.click();
      await this.getMainAnnualOperatingPlan.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainRetailReadinessOmnichannel() {
      await this.getMainTab.click();
      await this.getMainRetailReadinessOmnichannel.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainStaffingAnalysis() {
      await this.getMainTab.click();
      await this.getMainStaffingAnalysis.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainMIS() {
      await this.getMainTab.click();
      await this.getMainMIS.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainMIS1Standard() {
      await this.getMainTab.click();
      await this.getMainMIS.click();
      await this.getMainMIS1Standard.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainMISComparison() {
      await this.getMainTab.click();
      await this.getMainMIS.click();
      await this.getMainMISComparison.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainOperationalMIS() {
      await this.getMainTab.click();
      await this.getMainMIS.click();
      await this.getMainOperationalMIS.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainStoreRosters() {
      await this.getMainTab.click();
      await this.getMainStoreRosters.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToMainStoreLeadershipReport() {
      await this.getMainTab.click();
      await this.getMainStoreLeadershipReport.click();
      await this.page.waitForLoadState('networkidle');
    }
  
    async NavigateToMainStoreRosters() {
      await this.getMainTab.click();
      await this.getMainStoreRosters.click();
      await this.page.waitForLoadState('networkidle');
    }
  
    // Navigate to Sales Tab/ Performance Dashboard.
  
    async NavigateToSalesNewVehicle() {
      await this.getSalesTab.click();
      await this.getSalesNewVehicle.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesNewVehicleDashboard() {
      await this.getSalesTab.click();
      await this.getSalesNewVehicleDashboard.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesApprovabilityScorecard() {
      await this.getSalesTab.click();
      await this.getSalesApprovabilityScorecard.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesNewInventoryDetail() {
      await this.getSalesTab.click();
      await this.getSalesNewInventoryDetail.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesIncentiveLog() {
      await this.getSalesTab.click();
      await this.getSalesIncentiveLog.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesRDRReconciliation() {
      await this.getSalesTab.click();
      await this.getSalesRDRReconciliation.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesLoanerVehicleDetail() {
      await this.getSalesTab.click();
      await this.getSalesLoanerVehicleDetail.click();
      await this.page.waitForLoadState('networkidle');
    }
  
    // Sales/ Used Vehicle
  
    async NavigateToSalesUsedVehicle() {
      await this.getSalesTab.click();
      await this.getSalesUsedVehicle.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesUsedVehicleDashboard() {
      await this.getSalesTab.click();
      await this.getSalesUsedVehicleDashboard.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesPurchaseLogTradeIn() {
      await this.getSalesTab.click();
      await this.getSalesPurchaseLogTradeIn.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesUsedInventoryDetail() {
      await this.getSalesTab.click();
      await this.getSalesUsedInventoryDetail.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesInventoryAnalysisUVIA() {
      await this.getSalesTab.click();
      await this.getSalesInventoryAnalysisUVIA.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesUsedVehicleReportCard() {
      await this.getSalesTab.click();
      await this.getSalesUsedVehicleReportCard.click();
      await this.page.waitForLoadState('networkidle');
    }
    //Navigate to Sales/ F&I Ops 
  
    async NavigateToSalesFIOp() {
      await this.getSalesTab.click();
      await this.getSalesFIOps.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesFIOpsDashboard() {
      await this.getSalesTab.click();
      await this.getSalesFIOpsDashboard.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesFILog() {
      await this.getSalesTab.click();
      await this.getSalesFILog.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesFILogNew() {
      await this.getSalesTab.click();
      await this.getSalesFILogNew.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesFIPerformanceScorecard() {
      await this.getSalesTab.click();
      await this.getSalesFIPerformanceScorecard.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesFIManagerPerformance() {
      await this.getSalesTab.click();
      await this.getSalesFIManagerPerformance.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesFITopProducers() {
      await this.getSalesTab.click();
      await this.getSalesFITopProducers.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesFIBankLog() {
      await this.getSalesTab.click();
      await this.getSalesFIBankLog.click();
      await this.page.waitForLoadState('networkidle');
    }
    //Sales Log
    async NavigateToSalesSalesLog() {
      await this.getSalesTab.click();
      await this.getSalesSalesLog.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesRetailSalesLogALOG() {
      await this.getSalesTab.click();
      await this.getSalesRetailSalesLogALOG.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesWholesaleLogALOG() {
      await this.getSalesTab.click();
      await this.getSalesWholesaleLogALOG.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesCITSummary() {
      await this.getSalesTab.click();
      await this.getSalesCITSummary.click();
      await this.page.waitForLoadState('networkidle');
    }
  
    // Sales Log Report
    async NavigateToSalesBookedandPending() {
      await this.getSalesTab.click();
      await this.getSalesBookedandPending.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesSalesPersonnelPerformance() {
      await this.getSalesTab.click();
      await this.getSalesSalesPersonnelPerformance.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesWeekendMonthEndSummary() {
      await this.getSalesTab.click();
      await this.getSalesWeekendMonthEndSummary.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesSubmitaSummary() {
      await this.getSalesTab.click();
      await this.getSalesSubmitaSummary.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesViewReports() {
      await this.getSalesTab.click();
      await this.getSalesViewReports.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesWeekendSummary() {
      await this.getSalesTab.click();
      await this.getSalesWeekendSummary.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesMonthEndReport() {
      await this.getSalesTab.click();
      await this.getSalesMonthEndReport.click();
      await this.page.waitForLoadState('networkidle');
    }
    async NavigateToSalesSalesMgrTopProducers() {
      await this.getSalesTab.click();
      await this.getSalesSalesMgrTopProducers.click();
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
