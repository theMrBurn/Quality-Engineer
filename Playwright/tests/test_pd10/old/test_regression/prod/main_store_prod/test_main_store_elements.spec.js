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
test.describe.serial("/main_store_prod", () => {
  //test.fixme("this test is timing out");
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    // We can use these two methods in case if the storage state doesnt work
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToDrivewayStoreDrivewayScorecard1();
    await mainStore.NavigateToDFCDrivewayFinanceCorpScorecard();
    await mainStore.goto();
    await mainStore.NavigateToBodyShop();
    await mainStore.NavigateToPartsReport();
  });
  test("Navigate to Service Menu", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.goto();
    await mainStore.NavigateToServiceRepairOrderLog();
    await mainStore.NavigateToServiceAdvisorReport();
    await mainStore.NavigateToServicePDELMobileReport();
    await mainStore.NavigateToServiceTechnicianPerformanceReport();
  });
  test("Navigate to admin and driveway", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.goto();
    await mainStore.NavigateToDriveway1();
    await mainStore.NavigateToAdminTrackingDashboardReport();
    await mainStore.goto();
    await mainStore.NAvigateToAdminEmployeeLookup();
  });
  test("Navigate to Office", async function ({ browser, page }) {
    test.setTimeout(600000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    //await mainStore.NAvigateToAdminJobLauncher(); Temporarily disabling until cloud team gives a fix for the on prem problem
    await mainStore.NavigateToCashARValidationLog();
    await mainStore.NavigatetoInventoryNotInFirstLook();
    await mainStore.NavigatetoBankofHawaii();
    await mainStore.NavigateToAssuredServiceContractSalesSummary();
    await mainStore.NavigateToOfficeFabsoftJournal();
    await mainStore.NavigateToOfficeFabsoftProductionLog();
    await mainStore.NavigatetoOfficeDealAutomationProductionLog();
    await mainStore.NavigatetoOfficeOTIServiceDriveSales();
    await mainStore.NavigatetoOfficeOTITableViewer();
    await mainStore.NavigatetoOfficeShipper();
  });
  // Main
  test("Navigate to Main", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToMainStorePerformanceDashboard();
    await mainStore.NavigateToMainStorePerformanceScorecardSPS();
    await mainStore.NavigateToMainAnnualOperatingPlan();
    //We will activate this method when it is ready in production
    // await mainStore.NavigatetoMainConsumerOptionality();
    await mainStore.NavigateToMainMISComparison();
    await mainStore.NavigateToMainStaffingAnalysis();
    await mainStore.NavigateToMainMIS1Standard();
    await mainStore.NavigateToMainStoreRosters();
    await mainStore.NavigateToMainOperationalMIS();
    await mainStore.NavigateToMainStoreLeadershipReport();
    await mainStore.goto();
  });
  test("Navigate to Sales New Inventory", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToSalesNewVehicleDashboard();
    await mainStore.NavigateToSalesApprovabilityScorecard();
    await mainStore.NavigateToSalesNewInventoryDetail();
    await mainStore.NavigateToSalesIncentiveLog();
    await mainStore.NavigateToSalesLoanerVehicleDetail();
  });
  test("Navigate to Sales Used Inventory", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToSalesUsedVehicleDashboard();
    await mainStore.NavigateToSalesPurchaseLogTradeIn();
    await mainStore.NavigateToSalesUsedInventoryDetail();
    await mainStore.NavigateToSalesInventoryAnalysisUVIA();
    await mainStore.NavigateToSalesUsedVehicleReportCard();
  });
  // F&I Ops
  test("Navigate to Sales F& I ops", async function ({ browser, page }) {
    test.setTimeout(400000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToSalesFIOpsDashboard();
    await mainStore.NavigateToSalesFIPerformanceScorecard();
    await mainStore.NavigateToSalesFILog();
    await mainStore.NavigateToSalesFIManagerPerformance();
    await mainStore.NavigateToSalesFITopProducers();
    await mainStore.NavigateToSalesFIBankLog();
    //Sales Log
    await mainStore.NavigateToSalesRetailSalesLogALOG();
    await mainStore.NavigateToSalesWholesaleLogALOG();
    await mainStore.NavigateToSalesCITSummary();
    // Sales Reports
    await mainStore.NavigateToSalesBookedandPending();
    await mainStore.NavigateToSalesSalesPersonnelPerformance();
    await mainStore.NavigateToSalesSubmitaSummary();
    await mainStore.NavigateToSalesWeekendSummary();
    await mainStore.NavigateToSalesMonthEndReport();
  });
  //NewReportsAdded - US103551
  test("Navigate to New Reports", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToServiceFlatRateHrsPDF();
    await mainStore.goto();
    await mainStore.NavigateToServiceContractSales();
    await mainStore.goto();
    await mainStore.NavigateToServiceRAPReport();
    await mainStore.goto();
    await mainStore.NavigateToServiceLOCCycleTime();
    await mainStore.goto();
  });
  test("Navigate to New Reports under Office", async function ({
    browser,
    page,
  }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    //Office
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToOfficeDealershipAccountingscorecard();
    await mainStore.NavigateToOfficeCashARValidation();
    await mainStore.NavigateToOfficeVehicleDocTracking();
    await mainStore.goto();
    //MArket
  });
  test("Navigate to Under MArket", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToMarketLADBudget();
    await mainStore.goto();
    await mainStore.NavigateToMarketVistaDash();
    await mainStore.goto();
    await mainStore.NavigateToMarketMarketingCreative();
    await mainStore.goto();
  });
  //Reference
  test("Navigate to Under Reference", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToPayrollProcessingCalendar();
    await mainStore.NavigateToManagementFeeSummary();
    await mainStore.NavigateToFixedOpsGrossTools();
    await mainStore.NavigateToVariableGrossTools();
  });
});
