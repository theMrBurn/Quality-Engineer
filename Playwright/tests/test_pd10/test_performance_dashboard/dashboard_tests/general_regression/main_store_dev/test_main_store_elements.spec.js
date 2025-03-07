// Performance Dashboard - Main Store

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./PD10_main_store.js");

//test
test.describe.serial("/main_store_dev", () => {
  test.fixme(
    "these all need updated locators, and there's a better way to do this test, see ALLPAY / ATLAS validate element tests",
  );
  test("login to SPE", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToDrivewayStoreDrivewayScorecard1();
    await mainStore.NavigateToDFCDrivewayFinanceCorpScorecard();
    await page.goto("/main/store");
    await mainStore.NavigateToBodyShop();
    await mainStore.NavigateToPartsReport();
  });

  test("Navigate to Service Menu", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToServiceRepairOrderLog();
    await mainStore.NavigateToServiceAdvisorReport();
    await mainStore.NavigateToServicePDELMobileReport();
    await mainStore.NavigateToServiceTechnicianPerformanceReport();
  });

  test("Navigate to admin and driveway", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToDriveway1();
    await mainStore.NavigateToAdminTrackingDashboardReport();
    await page.goto("/main/store");
    await mainStore.NAvigateToAdminEmployeeLookup();
  });

  test("Navigate to Office", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

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

  test("Navigate to Main", async function ({ browser, page }) {
    const mainStore = new MainStore(page);
    await page.goto("/main/store");
    await page.waitForLoadState("load");

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
  });

  test("Navigate to Sales New Inventory", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");
    await mainStore.NavigateToSalesNewVehicleDashboard();
    await mainStore.NavigateToSalesApprovabilityScorecard();
    await mainStore.NavigateToSalesNewInventoryDetail();
    await mainStore.NavigateToSalesIncentiveLog();
    await mainStore.NavigateToSalesLoanerVehicleDetail();
  });

  test("Navigate to Sales Used Inventory", async function ({ browser, page }) {
    const mainStore = new MainStore(page);
    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToSalesUsedVehicleDashboard();
    await mainStore.NavigateToSalesPurchaseLogTradeIn();
    await mainStore.NavigateToSalesUsedInventoryDetail();
    await mainStore.NavigateToSalesInventoryAnalysisUVIA();
    await mainStore.NavigateToSalesUsedVehicleReportCard();
  });

  // F&I Ops
  test("Navigate to Sales F& I ops", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");
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

  test("Navigate to New Reports", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToServiceFlatRateHrsPDF();
    await page.goto("/main/store");
    await mainStore.NavigateToServiceContractSales();
    await page.goto("/main/store");
    await mainStore.NavigateToServiceRAPReport();
    await page.goto("/main/store");
    await mainStore.NavigateToServiceLOCCycleTime();
    await page.goto("/main/store");
  });

  test("Navigate to New Reports under Office", async function ({
    browser,
    page,
  }) {
    const mainStore = new MainStore(page);
    //Office
    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToOfficeDealershipAccountingscorecard();
    await mainStore.NavigateToOfficeCashARValidation();
    await mainStore.NavigateToOfficeVehicleDocTracking();
  });

  test("Navigate to Under Market", async function ({ browser, page }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToMarketLADBudget();
    await page.goto("/main/store");
    await mainStore.NavigateToMarketVistaDash();
    await page.goto("/main/store");
    await mainStore.NavigateToMarketMarketingCreative();
  });

  //Reference
  test("Navigate to Under Reference", async function ({ browser, page }) {
    const mainStore = new MainStore(page);
    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.NavigateToPayrollProcessingCalendar();
    await mainStore.NavigateToManagementFeeSummary();
    await mainStore.NavigateToFixedOpsGrossTools();
    await mainStore.NavigateToVariableGrossTools();
  });
});
