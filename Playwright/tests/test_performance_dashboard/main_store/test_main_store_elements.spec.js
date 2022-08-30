// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./main_store.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/main_store", () => {
   test("login to SPE", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(600000);
       const mainStore = new MainStore(page);
       // We can use these two methods in case if the storage state doesnt work
       await mainStore.goto();
       await mainStore.login();
       await mainStore.twostepauthlogin();
       /*await mainStore.NavigateToBodyShop();
       await mainStore.NavigateToPartsReport();
       await mainStore.NavigateToServiceDashboard();
       await mainStore.NavigateToServiceFlateRateHrs();
       await mainStore.NavigateToServiceRepairOrderLog();
       await mainStore.NavigateToServiceAdvisorReport();
       await mainStore.NavigateToServicePDELMobileReport();
       await mainStore.NavigateToServiceTechnicianPerformanceReport();
       await mainStore.NavigateToAdminTrackingDashboardReport();
       await mainStore.NavigateToDriveway();
       await mainStore.NAvigateToAdminEmployeeLookup();
       await mainStore.NAvigateToAdminJobLauncher();
       await mainStore.NavigateToCashARValidationLog();
       //we will implement this report redirection in future
       //await mainStore.NavigateToVehicleDocTracking();
       await mainStore.NavigatetoInventoryNotInFirstLook();
       await mainStore.NavigatetoBankofHawaii();
       await mainStore.NavigateToAssuredServiceContractSalesSummary();
       await mainStore.NavigateToOfficeSchedulesSummary();
       await mainStore.NavigateToOfficeSchedulesARAP();
       await mainStore.NavigateToOfficeSchedulesSARAdministration();
       await mainStore.NavigateToOfficeSchedulesSARExceptionRequest();
       await mainStore.NavigateToOfficeSchedulesSARExceptionApproval();
       await mainStore.NavigateToOfficeMonthEndSubmittal();
       await mainStore.NavigateToOfficeMonthEndReadOnly();
       await mainStore.NavigateToOfficeMonthEndApproval();
       await mainStore.NavigateToOfficeMonthEndAdmin();
       await mainStore.NavigateToOfficeMonthEndAudit();
       await mainStore.NavigateToOfficeFabsoftJournal();
       await mainStore.NavigateToOfficeFabsoftProductionLog();
       await mainStore.NavigatetoOfficeDealAutomationProductionLog();
       await mainStore.NavigatetoOfficeOTIServiceDriveSales();
       await mainStore.NavigatetoOfficeOTITableViewer();
       await mainStore.NavigatetoOfficeShipper();
       // Main
       await mainStore.NavigateToMainStorePerformanceDashboard();
       await mainStore.NavigateToMainStorePerformanceScorecardSPS();
       
       await mainStore.NavigateToMainAnnualOperatingPlan();
       await mainStore.NavigateToMainRetailReadinessOmnichannel();
       
       await mainStore.NavigateToMainStaffingAnalysis();
       */
       await mainStore.NavigateToMainMIS();
       await mainStore.NavigateToMainMIS1Standard();
       await mainStore.NavigateToMainMISComparison();
       await mainStore.NavigateToMainOperationalMIS();
       await mainStore.NavigateToMainStoreRosters();
       await mainStore.NavigateToMainStoreLeadershipReport();
       await mainStore.NavigateToMainStore();
       // Sales
       await mainStore.NavigateToSalesNewVehicle();
       await mainStore.NavigateToSalesNewVehicleDashboard();
       await mainStore.NavigateToSalesNewVehicle();
       await mainStore.NavigateToSalesApprovabilityScorecard();
       await mainStore.NavigateToSalesNewInventoryDetail();
       await mainStore.NavigateToSalesIncentiveLog();
       await mainStore.NavigateToSalesRDRReconciliation();
       await mainStore.NavigateToSalesLoanerVehicleDetail();
       //Sales Used Vehicle
       await mainStore.NavigateToSalesUsedVehicle();
       await mainStore.NavigateToSalesPurchaseLogTradeIn();
       await mainStore.NavigateToSalesUsedVehicle();
       await mainStore.NavigateToSalesUsedInventoryDetail();
       await mainStore.NavigateToSalesInventoryAnalysisUVIA();
       await mainStore.NavigateToSalesUsedVehicleReportCard();
       // F&I Ops 
       await mainStore.NavigateToSalesFIOp();
       await mainStore.NavigateToSalesFIOpsDashboard();
       await mainStore.NavigateToSalesFILog();
       await mainStore.NavigateToSalesFILogNew();
       await mainStore.NavigateToSalesFIPerformanceScorecard();
       await mainStore.NavigateToSalesFIManagerPerformance();
       await mainStore.NavigateToSalesFITopProducers();
       await mainStore.NavigateToSalesFIBankLog();
       //Sales Log
       await mainStore.NavigateToSalesSalesLog();
       await mainStore.NavigateToSalesRetailSalesLogALOG();
       await mainStore.NavigateToSalesWholesaleLogALOG();
       await mainStore.NavigateToSalesCITSummary();
       // Sales Reports
       await mainStore.NavigateToSalesBookedandPending();
       await mainStore.NavigateToSalesSalesPersonnelPerformance();
       await mainStore.NavigateToSalesWeekendMonthEndSummary();
       await mainStore.NavigateToSalesSubmitaSummary();
       await mainStore.NavigateToSalesViewReports();
       await mainStore.NavigateToSalesWeekendSummary();
       await mainStore.NavigateToSalesMonthEndReport();
       await mainStore.NavigateToSalesSalesMgrTopProducers();
     });
});
