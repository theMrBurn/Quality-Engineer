// this POM is for /Payroll
const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSPELogo = page.locator("id=logo");
    this.getDrivewayTab = page.locator(':nth-match(:text("Driveway"),1)');
    this.getDrivewayTab1 = page.locator(
      "xpath=//body/div[1]/header[1]/nav[1]/div[1]/ul[1]/li[3]/span[1]",
    );
    this.getDrivewaySuppressionReport = page.locator(
      ':nth-match(:text("Driveway Suppression Report"),1)',
    );
    this.getDFC = page.locator(':nth-match(:text("DFC"),1)');
    this.getDFCDrivewayFinanceCorpScorecard = page.locator(
      'text="Driveway Finance Corp Scorecard"',
    );
    this.getStoreDrivewayScorecard = page.locator(
      ':nth-match(:text("Store Driveway Scorecard"),1)',
    );
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getBodyShop = page.locator(':nth-match(:text("Body Shop"),1)');
    this.getBodyShop1 = page.locator('text=" Body Shop"');
    this.getBodyShopReport = page.locator('text="Body Shop Report"');
    this.getServiceDashboard = page.locator(':nth-match(:text("Service"),1)');
    this.getServiceDashboardReport = page.locator("text=Service Dashboard");
    this.getServiceRepairOrderLogReport = page.locator(
      'text="Repair Order Log"',
    );
    this.getServiceFlatRateHrsReport = page.locator(
      ':nth-match(:text("Flat Rate Hours"),2)',
    );
    this.getServiceAdvisorReport = page.locator('text="Advisor Report"');
    this.getServicePDELMobileReport = page.locator(
      'text="PDEL/Mobile Reports"',
    );
    this.getServiceTechnicianPerformanceReport = page.locator(
      'text="Technician Performance"',
    );
    this.getParts = page.locator(':nth-match(:text("Parts"),1)');
    this.getPartsReport = page.locator('text="Parts Report"');
    this.getAdmin = page.locator('text="Admin"');
    this.getAdminTrackingDashboard = page.locator('text=" Tracking Dashboard"');
    this.getAdminSiteAlert = page.locator('text=" Site Alert"');
    this.getOffice = page.locator(':nth-match(:text("Office"),1)');
    this.getOfficeCashARVAlidationLOg = page.locator(
      'text="Cash & AR Validation Log"',
    );
    this.getVehicleDocTracking = page.locator(
      'text="Vehicle Doc Tracking (VDT)"',
    );
    this.getPopupCloseVehicleDocTracking = page.locator('text="Close"');
    this.getInventoryNotInFirstLook = page.locator(
      'text="Inventory not in Firstlook"',
    );
    this.getBankOfHawaii = page.locator('text="Bank of Hawaii"');
    this.getAssuredServiceContractSalesSummary = page.locator(
      'text="Assured Service Contract Sales Summary"',
    );
    this.getOfficeSchedules = page.locator(':nth-match(:text("Schedule"),1)');
    this.getOfficeSchedulesSummary = page.locator('text="Schedules Summary"');
    this.getOfficeSchedulesArAP = page.locator('text="AR AP"');
    this.getOfficeSchedulesSARExceptionRequest = page.locator(
      'text="SAR - Exception Request"',
    );
    this.getOfficesSchedulesSARExceptionApproval = page.locator(
      'text="SAR - Exception Approval"',
    );
    this.getOfficeSchedulesSARAdministration = page.locator(
      'text="SAR - Administration"',
    );
    this.getOfficeMonthEndReview = page.locator('text="Month End Review"');
    this.getOfficeMonthEndSubmittal = page.locator(
      'text="Month End - Submittal"',
    );
    this.getOfficeMonthEndReadOnly = page.locator(
      'text="Month End - Read Only"',
    );
    this.getOfficeMonthEndApproval = page.locator(
      'text="Month End - Approval"',
    );
    this.getOfficeMonthEndAdmin = page.locator('text="Month End - Admin"');
    this.getOfficeMonthEndAudit = page.locator('text="Month End - Audit"');
    this.getOfficeFabSoft = page.locator('text="Fabsoft"');
    this.getOfficeFabSoftProductionLog = page.locator('text="Production Log"');
    this.getOfficeFabSoftScanLog = page.locator('text="Scan Log"');
    this.getOfficeFabSoftJournal = page.locator(
      'text="Journal 79 JVs not in SharePoint"',
    );
    this.getOfficeDealProcessing = page.locator('text="Deal Processing"');
    this.getOfficeDealAutomationProductLog = page.locator(
      'text="Deal Automation Prod Log"',
    );
    this.getOfficeOTIServiceDriveSales = page.locator(
      'text="OTI Service Drive Sales"',
    );
    this.getOfficeOTiTableViewer = page.locator('text="OTI Table Viewer"');
    this.getOfficeShipper = page.locator('text="Shippers"');
    //Main Tb
    this.getMainTab = page.locator(':nth-match(:text("Main"),1)');
    this.getMainStorePerformanceDashboard = page.locator(
      ':nth-match(:text("Store Performance Dashboard"),1)',
    );
    this.getMainStorePerformanceScorecardSPS = page.locator(
      ':nth-match(:text("Store Performance Scorecard (SPS)"),1)',
    );
    this.getMainAnnualOperatingPlan = page.locator(
      ':nth-match(:text("Annual Operating Plan"),1)',
    );
    this.getMainRetailReadinessOmnichannel = page.locator(
      ':nth-match(:text(" Retail Readiness (Omnichannel)"),1)',
    );
    this.getMainStaffingAnalysis = page.locator(
      ':nth-match(:text("Staffing Analysis "),1)',
    );
    this.getMainMIS = page.locator('text="MIS"');
    this.getMainMIS1Standard = page.locator(
      ':nth-match(:text("MIS 1 (Standard)"),1)',
    );
    this.getMainMISComparison = page.locator(
      ':nth-match(:text("MIS Comparison"),1)',
    );
    this.getMainOperationalMIS = page.locator(
      ':nth-match(:text("Operational MIS"),1)',
    );
    this.getMainStoreRosters = page.locator(
      ':nth-match(:text("Store Rosters"),1)',
    );
    this.getMainStoreLeadershipReport = page.locator(
      ':nth-match(:text("Store Leadership Report"),1)',
    );
    this.getMainStoreRosters2 = page.locator(
      ':nth-match(:text("Store Rosters"),2)',
    );
    //Sales Tab
    this.getSalesTab = page.locator('text="Sales" >> nth=0');
    this.getSalesNewVehicle = page.locator(
      ':nth-match(:text("New Vehicle"),1)',
    );
    this.getSalesNewVehicleDashboard = page.locator(
      ':nth-match(:text("New Vehicle Dashboard"),1)',
    );
    this.getSalesApprovabilityScorecard = page.locator(
      'text="Approvability Scorecard"',
    );
    this.getSalesNewInventoryDetail = page.locator(
      ':nth-match(:text("New Inventory Detail"),1)',
    );
    this.getSalesIncentiveLog = page.locator(
      ':nth-match(:text("Incentive Log"),1)',
    );
    this.getSalesRDRReconciliation = page.locator(
      ':nth-match(:text("RDR Reconciliation"),1)',
    );
    this.getSalesLoanerVehicleDetail = page.locator(
      ':nth-match(:text("Loaner Vehicle Detail"),1)',
    );
    //Used Vehicle
    this.getSalesUsedVehicle = page.locator(
      ':nth-match(:text("Used Vehicle"),1)',
    );
    this.getSalesUsedVehicleDashboard = page.locator(
      ':nth-match(:text("Used Vehicle Dashboard"),1)',
    );
    this.getSalesPurchaseLogTradeIn = page.locator(
      ':nth-match(:text("Purchase Log / Trade-In"),1)',
    );
    this.getSalesUsedInventoryDetail = page.locator(
      ':nth-match(:text("Used Inventory Detail"),1)',
    );
    this.getSalesInventoryAnalysisUVIA = page.locator(
      ':nth-match(:text("Inventory Analysis (UVIA)"),1)',
    );
    this.getSalesUsedVehicleReportCard = page.locator(
      ':nth-match(:text("Used Vehicle Report Card"),1)',
    );
    // F&I Ops
    this.getSalesFIOps = page.locator(':nth-match(:text("F&I Ops"),1)');
    this.getSalesFIOpsDashboard = page.locator(
      ':nth-match(:text("F&I Ops Dashboard"),1)',
    );
    this.getSalesFILog = page.locator(':nth-match(:text("F&I Log"),1)');
    this.getSalesFILogNew = page.locator(
      ':nth-match(:text("F&I Log - New"),1)',
    );
    this.getSalesFIPerformanceScorecard = page.locator(
      'text="F&I Performance Scorecard"',
    );
    this.getSalesFIManagerPerformance = page.locator(
      ':nth-match(:text("F&I Manager Performance"),1)',
    );
    this.getSalesFITopProducers = page.locator(
      ':nth-match(:text("F&I Top Producers"),1)',
    );
    this.getSalesFIBankLog = page.locator(
      ':nth-match(:text("F&I Bank Log"),1)',
    );
    //Sales Log
    this.getSalesSalesLog = page.locator(':nth-match(:text("Sales Log"),1)');
    this.getSalesRetailSalesLogALOG = page.locator(
      ':nth-match(:text("Retail Sales Log (ALOG)"),1)',
    );
    this.getSalesWholesaleLogALOG = page.locator(
      ':nth-match(:text("Wholesale Log (ALOG"),1)',
    );
    this.getSalesCITSummary = page.locator(
      ':nth-match(:text("CIT Summary"),1)',
    );
    this.getSalesBookedandPending = page.locator(
      ':nth-match(:text("Booked and Pending"),1)',
    );
    this.getSalesSalesPersonnelPerformance = page.locator(
      ':nth-match(:text("Sales Personnel Performance"),1)',
    );
    this.getSalesWeekendMonthEndSummary = page.locator(
      ':nth-match(:text("Weekend/Month End Summary"),1)',
    );
    this.getSalesSubmitaSummary = page.locator(
      ':nth-match(:text("Submit a Summary"),1)',
    );
    this.getSalesViewReports = page.locator(
      ':nth-match(:text("View Reports"),1)',
    );
    this.getSalesWeekendSummary = page.locator(
      ':nth-match(:text("Weekend Summary"),1)',
    );
    this.getSalesMonthEndReport = page.locator(
      ':nth-match(:text("Month End Report"),1)',
    );
    this.getSalesSalesMgrTopProducers = page.locator(
      ':nth-match(:text("Sales Mgr Top Producers"),1)',
    );
    //NewStuff
    this.getServiceFlatRateHrsPDF = page.locator(
      ':nth-match(:text("Flat Rate Hours (pdf)"),1)',
    );
    this.getServiceContractSalesSummary = page.locator(
      ':nth-match(:text("Contract Sales"),1)',
    );
    this.getServiceRAPReport = page.locator(
      ':nth-match(:text("RAP Report"),1)',
    );
    this.getServiceLOCCycleTime = page.locator(
      ':nth-match(:text("LOF Cycle Time"),1)',
    );
    this.getOfficeDealershipAccountingscorecard = page.locator(
      ':nth-match(:text("Dealership Accounting Scorecard"),1)',
    );
    this.getOfficeCashARValidation = page.locator(
      ':nth-match(:text("Cash & AR Validation"),1)',
    );
    this.getMArketLADBudget = page.locator(':nth-match(:text("LAD Budget"),1)');
    this.getMarketVistaDash = page.locator(':nth-match(:text("VistaDash"),1)');
    this.getMarketMArketingCreative = page.locator(
      ':nth-match(:text("Marketing Creative"),1)',
    );
    this.getReferencePayrollProcessingCalendar = page.locator(
      ':nth-match(:text("Payroll Processing Calendars"),1)',
    );
    this.getReferenceManagementFeeSummary = page.locator(
      ':nth-match(:text("Management Fee Summary"),1)',
    );
    this.getReferenceFixedOpsGrossTools = page.locator(
      ':nth-match(:text("Fixed Ops Gross Tools"),1)',
    );
    this.getReferenceVariableGrossTools = page.locator(
      ':nth-match(:text("Variable Gross Tools"),1)',
    );
    this.getMarket = page.locator('text="Market"');
    this.getReference = page.locator(':nth-match(:text("Reference"),1)');
    this.getParts1 = page.locator('text="Parts "');
  }
  //Navigate to Main Tab/ Performace Dashboard Report
  async NavigateToMainStorePerformanceDashboard() {
    await this.getMainTab.click();
    await this.getMainStorePerformanceDashboard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainStorePerformanceScorecardSPS() {
    await this.getMainTab.click();
    await this.getMainStorePerformanceScorecardSPS.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainAnnualOperatingPlan() {
    await this.getMainTab.click();
    await this.getMainAnnualOperatingPlan.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainRetailReadinessOmnichannel() {
    await this.getMainTab.click();
    await this.getMainRetailReadinessOmnichannel.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainStaffingAnalysis() {
    await this.getMainTab.click();
    await this.getMainStaffingAnalysis.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainMIS1Standard() {
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMIS1Standard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainMISComparison() {
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainMISComparison.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainOperationalMIS() {
    await this.getMainTab.click();
    await this.getMainMIS.click();
    await this.getMainOperationalMIS.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToMainStoreLeadershipReport() {
    await this.getMainTab.click();
    await this.getMainStoreRosters.click();
    await this.getMainStoreLeadershipReport.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToMainStoreRosters() {
    await this.getMainTab.click();
    await this.getMainStoreRosters.click();
    await this.getMainStoreRosters2.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  // Navigate to Sales Tab/ Performance Dashboard.
  async NavigateToSalesNewVehicleDashboard() {
    await this.getSalesTab.first().click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewVehicleDashboard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesApprovabilityScorecard() {
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesApprovabilityScorecard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesNewInventoryDetail() {
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesNewInventoryDetail.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesIncentiveLog() {
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesIncentiveLog.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesRDRReconciliation() {
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesRDRReconciliation.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesLoanerVehicleDetail() {
    await this.getSalesTab.click();
    await this.getSalesNewVehicle.click();
    await this.getSalesLoanerVehicleDetail.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesUsedVehicleDashboard() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedVehicleDashboard.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToSalesPurchaseLogTradeIn() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesPurchaseLogTradeIn.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesUsedInventoryDetail() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedInventoryDetail.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesInventoryAnalysisUVIA() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesInventoryAnalysisUVIA.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesUsedVehicleReportCard() {
    await this.getSalesTab.click();
    await this.getSalesUsedVehicle.click();
    await this.getSalesUsedVehicleReportCard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  //Navigate to Sales/ F&I Ops
  async NavigateToSalesFIOpsDashboard() {
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIOpsDashboard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesFILog() {
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFILog.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesFILogNew() {
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFILogNew.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesFIPerformanceScorecard() {
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIPerformanceScorecard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesFIManagerPerformance() {
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIManagerPerformance.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesFITopProducers() {
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFITopProducers.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesFIBankLog() {
    await this.getSalesTab.click();
    await this.getSalesFIOps.click();
    await this.getSalesFIBankLog.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  //Sales Log
  async NavigateToSalesRetailSalesLogALOG() {
    await this.getSalesTab.click();
    await this.getSalesSalesLog.click();
    await this.getSalesRetailSalesLogALOG.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesWholesaleLogALOG() {
    await this.getSalesTab.click();
    await this.getSalesSalesLog.click();
    await this.getSalesWholesaleLogALOG.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesCITSummary() {
    await this.getSalesTab.click();
    await this.getSalesSalesLog.click();
    await this.getSalesCITSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  // Sales Log Report
  async NavigateToSalesBookedandPending() {
    await this.getSalesTab.click();
    await this.getSalesBookedandPending.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesSalesPersonnelPerformance() {
    await this.getSalesTab.click();
    await this.getSalesSalesPersonnelPerformance.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesSubmitaSummary() {
    await this.getSalesTab.click();
    await this.getSalesWeekendMonthEndSummary.click();
    await this.getSalesSubmitaSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesWeekendSummary() {
    await this.getSalesTab.click();
    await this.getSalesWeekendMonthEndSummary.click();
    await this.getSalesViewReports.click();
    await this.getSalesWeekendSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToSalesMonthEndReport() {
    await this.getSalesTab.click();
    await this.getSalesWeekendMonthEndSummary.click();
    await this.getSalesViewReports.click();
    await this.getSalesMonthEndReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  /* not sure where this is present
    async NavigateToSalesSalesMgrTopProducers() {
      await this.getSalesTab.click();
      await this.getSalesSalesMgrTopProducers.click();
      await this.page.waitForLoadState('networkidle');
    }
    */
  // use goto() if you intend on starting the test on a particular page in SPEDashboard App
  async goto() {
    await this.page.goto("https://spedev.lithiainc.com/main/store", {
      timeout: 0,
    });
    // Pause for 10 seconds, to see what's going on.
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
  }
  // get elements of all locators
  async NavigateToDriveway() {
    await this.getDrivewayTab.click();
    await this.getDrivewaySuppressionReport.click();
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToDriveway1() {
    await this.getDrivewayTab1.click();
    await this.getDrivewaySuppressionReport.click();
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToDrivewayStoreDrivewayScorecard() {
    await this.getDrivewayTab.click();
    await this.getStoreDrivewayScorecard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToDrivewayStoreDrivewayScorecard1() {
    await this.getDrivewayTab1.click();
    await this.getStoreDrivewayScorecard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToDFCDrivewayFinanceCorpScorecard() {
    await this.getDFC.click();
    await this.getDFCDrivewayFinanceCorpScorecard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToBodyShop() {
    await this.getBodyShop1.click();
    await this.getBodyShopReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateTopfaffBodyShop() {
    await this.getBodyShop.click();
    await this.getBodyShopReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToServiceDashboard() {
    await this.getServiceDashboard.click();
    await this.getServiceDashboardReport.click();
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToServiceRepairOrderLog() {
    await this.getServiceDashboard.click();
    await this.getServiceRepairOrderLogReport.click();
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToServiceFlateRateHrs() {
    await this.getServiceDashboard.click();
    await this.getServiceFlatRateHrsReport.click();
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToServiceAdvisorReport() {
    await this.getServiceDashboard.click();
    await this.getServiceAdvisorReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToServicePDELMobileReport() {
    await this.getServiceDashboard.click();
    await this.getServicePDELMobileReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToServiceTechnicianPerformanceReport() {
    await this.getServiceDashboard.click();
    await this.getServiceTechnicianPerformanceReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToPartsReport() {
    await this.getParts1.click();
    await this.getPartsReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToPartspfaffReport() {
    await this.getParts.click();
    await this.getPartsReport.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToAdminTrackingDashboardReport() {
    await this.getAdmin.click();
    await this.getAdminTrackingDashboard.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NAvigateToAdminJobLauncher() {
    await this.page.goto("https://spedev.lithiainc.com/Admin/Jobs.aspx");
    await this.page.waitForLoadState("networkidle");
  }
  async NAvigateToAdminEmployeeLookup() {
    await this.page.goto("https://spedev.lithiainc.com/Admin/EmployeeLookup");
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToAdminSiteAlert() {
    await this.getAdmin.click();
    await this.getAdminSiteAlert.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToCashARValidationLog() {
    await this.getOffice.click();
    await this.getOfficeCashARVAlidationLOg.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToVehicleDocTracking() {
    await this.getOffice.click();
    await this.getVehicleDocTracking.click();
    await this.page.waitForLoadState("networkidle");
    await this.getPopupCloseVehicleDocTracking.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigatetoInventoryNotInFirstLook() {
    await this.getOffice.click();
    await this.getInventoryNotInFirstLook.click();
  }
  async NavigatetoBankofHawaii() {
    await this.getOffice.click();
    await this.getBankOfHawaii.click();
  }
  async NavigateToAssuredServiceContractSalesSummary() {
    await this.getOffice.click();
    await this.getAssuredServiceContractSalesSummary.click();
  }
  async NavigateToOfficeSchedulesSummary() {
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSummary.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeSchedulesARAP() {
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesArAP.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToOfficeSchedulesSARExceptionRequest() {
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSARExceptionRequest.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeSchedulesSARExceptionApproval() {
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficesSchedulesSARExceptionApproval.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeSchedulesSARAdministration() {
    await this.getOffice.click();
    await this.getOfficeSchedules.click();
    await this.getOfficeSchedulesSARAdministration.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeMonthEndSubmittal() {
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndSubmittal.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeMonthEndReadOnly() {
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndReadOnly.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeMonthEndApproval() {
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndApproval.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeMonthEndAdmin() {
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndAdmin.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeMonthEndAudit() {
    await this.getOffice.click();
    await this.getOfficeMonthEndReview.click();
    await this.getOfficeMonthEndAudit.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeFabsoftProductionLog() {
    await this.getOffice.click();
    await this.getOfficeFabSoft.click();
    await this.getOfficeFabSoftProductionLog.click();
  }
  async NavigateToOfficeFabsoftJournal() {
    await this.getOffice.click();
    await this.getOfficeFabSoft.click();
    await this.getOfficeFabSoftJournal.click();
  }
  async NavigatetoOfficeDealAutomationProductionLog() {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeDealAutomationProductLog.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigatetoOfficeOTIServiceDriveSales() {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeOTIServiceDriveSales.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigatetoOfficeOTITableViewer() {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeOTiTableViewer.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigatetoOfficeShipper() {
    await this.getOffice.click();
    await this.getOfficeDealProcessing.click();
    await this.getOfficeShipper.click();
    await this.page.waitForLoadState("networkidle");
  }
  // Login
  async login() {
    await this.getUsername.click();
    await this.page.fill('input[id="i0116"]', "t_PerfDash_01@lithia.com"); //username
    await this.page.locator("id=idSIButton9").click();
    await this.getPassword.click();
    await this.page.fill(
      'input[name="passwd"]',
      "GkCow**!#w#)4E#Sj3Rb8KS*TkGduz",
    ); //pwd
    await this.page.click("text=Sign In");
    await this.page.waitForNavigation();
  }
  async login_pfaff() {
    await this.getUsername.click();
    await this.page.fill(
      'input[id="i0116"]',
      "t_LithiaDashboard_PfaffTester@lithia.com",
    ); //username
    await this.page.locator("id=idSIButton9").click();
    await this.getPassword.click();
    await this.page.fill('input[name="passwd"]', "LithiaTest9999992!"); //pwd
    await this.page.click("text=Sign In");
    await this.page.waitForNavigation();
  }
  async login_suburban() {
    await this.getUsername.click();
    await this.page.fill(
      'input[id="i0116"]',
      "t_LithiaDashboard_SuburbanTester@lithia.com",
    ); //username
    await this.page.locator("id=idSIButton9").click();
    await this.getPassword.click();
    await this.page.fill('input[name="passwd"]', "LithiaTest9999800!"); //pwd
    await this.page.click("text=Sign In");
    await this.page.waitForNavigation();
  }
  async twostepauthlogin() {
    await this.page.click("id=KmsiCheckboxField");
    await this.page.click("id=idSIButton9");
  }
  //new reports navigation
  async NavigateToServiceFlatRateHrsPDF() {
    await this.getServiceDashboard.click();
    await this.getServiceFlatRateHrsPDF.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToServiceContractSales() {
    await this.getServiceDashboard.click();
    await this.getServiceContractSalesSummary.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToServiceRAPReport() {
    await this.getServiceDashboard.click();
    await this.getServiceRAPReport.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToServiceLOCCycleTime() {
    await this.getServiceDashboard.click();
    await this.getServiceLOCCycleTime.click();
  }
  //Office
  async NavigatetoBankofHawaii() {
    await this.getOffice.click();
    await this.getBankOfHawaii.click();
    await this.page.waitForLoadState("networkidle");
  }
  async NavigateToOfficeDealershipAccountingscorecard() {
    await this.getOffice.click();
    await this.getOfficeDealershipAccountingscorecard.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeCashARValidation() {
    await this.getOffice.click();
    await this.getOfficeCashARValidation.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.getSPELogo).toBeVisible();
  }
  async NavigateToOfficeVehicleDocTracking() {
    await this.getOffice.click();
    await this.getVehicleDocTracking.click();
  }
  //MArket
  async NavigateToMarketLADBudget() {
    await this.getMarket.click();
    await this.getMArketLADBudget.click();
  }
  async NavigateToMarketVistaDash() {
    await this.getMarket.click();
    await this.getMarketVistaDash.click();
  }
  async NavigateToMarketMarketingCreative() {
    await this.getMarket.click();
    await this.getMarketMArketingCreative.click();
  }
  //Reference
  async NavigateToPayrollProcessingCalendar() {
    await this.getReference.click();
    await this.getReferencePayrollProcessingCalendar.click();
  }
  async NavigateToManagementFeeSummary() {
    await this.getReference.click();
    await this.getReferenceManagementFeeSummary.click();
  }
  async NavigateToFixedOpsGrossTools() {
    await this.getReference.click();
    await this.getReferenceFixedOpsGrossTools.click();
  }
  async NavigateToVariableGrossTools() {
    await this.getReference.click();
    await this.getReferenceVariableGrossTools.click();
  }
}
module.exports = { MainStore };
