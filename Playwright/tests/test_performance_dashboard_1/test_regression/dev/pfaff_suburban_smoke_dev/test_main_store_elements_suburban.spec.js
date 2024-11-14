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
test.describe.serial("/main_store_dev", () => {
  test.fixme("this test is not needed anymore");
   test("login to SPE", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(300000);
       const mainStore = new MainStore(page);
       // We can use these two methods in case if the storage state doesnt work
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateTopfaffBodyShop();
     });
     test("Navigate to Service Menu", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(300000);
      const mainStore = new MainStore(page);
      await mainStore.goto();
      await mainStore.login_suburban();
      await mainStore.twostepauthlogin();
      await mainStore.NavigateToServiceDashboard();
      await mainStore.goto();
      await mainStore.NavigateToServiceFlateRateHrs();
      await mainStore.goto();
      await mainStore.NavigateToServiceRepairOrderLog();
      await mainStore.NavigateToServiceAdvisorReport();
      await mainStore.NavigateToServicePDELMobileReport();
      await mainStore.NavigateToServiceTechnicianPerformanceReport();
    });
    test("Navigate to driveway", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(300000);
      const mainStore = new MainStore(page);
      await mainStore.goto();
      await mainStore.login_suburban();
      await mainStore.twostepauthlogin();
      await mainStore.goto();
      await mainStore.NavigateToDriveway();
    });
    test("Navigate to Office", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(600000);
      const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToCashARValidationLog();
       await mainStore.NavigateToAssuredServiceContractSalesSummary();
       await mainStore.NavigateToOfficeSchedulesSARAdministration();
       await mainStore.NavigateToOfficeMonthEndSubmittal();
       await mainStore.NavigateToOfficeMonthEndReadOnly();
       await mainStore.NavigateToOfficeMonthEndApproval();
       await mainStore.NavigateToOfficeMonthEndAudit();
    });
       // Main    
       test("Navigate to Main", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(600000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToMainStorePerformanceDashboard();
       await mainStore.NavigateToMainStorePerformanceScorecardSPS();
       await mainStore.NavigateToMainAnnualOperatingPlan();
       await mainStore.NavigateToMainMISComparison();
       await mainStore.NavigateToMainStaffingAnalysis();
       await mainStore.NavigateToMainMIS1Standard();
       await mainStore.NavigateToMainStoreRosters();
       await mainStore.NavigateToMainOperationalMIS();
       await mainStore.NavigateToMainStoreLeadershipReport();
       await mainStore.goto();  
       await mainStore.NavigateToPartspfaffReport();
      });
      test("Navigate to Sales Used Inventory", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToSalesUsedVehicleDashboard();
       await mainStore.NavigateToSalesPurchaseLogTradeIn();
       await mainStore.NavigateToSalesUsedInventoryDetail();
       await mainStore.NavigateToSalesInventoryAnalysisUVIA();
       await mainStore.NavigateToSalesUsedVehicleReportCard();
      });
       // F&I Ops 
       test("Navigate to Sales F& I ops", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(400000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToSalesFIOpsDashboard();
       await mainStore.NavigateToSalesFIPerformanceScorecard();
       await mainStore.NavigateToSalesFILog();
       await mainStore.NavigateToSalesFIManagerPerformance();
       await mainStore.NavigateToSalesFITopProducers();
       await mainStore.NavigateToSalesFIBankLog();
       //Sales Log
       await mainStore.NavigateToSalesRetailSalesLogALOG();
       await mainStore.NavigateToSalesWholesaleLogALOG();
       // Sales Reports
       await mainStore.NavigateToSalesBookedandPending();
       await mainStore.NavigateToSalesSalesPersonnelPerformance();
       await mainStore.NavigateToSalesSubmitaSummary();
       await mainStore.NavigateToSalesWeekendSummary();
       await mainStore.NavigateToSalesMonthEndReport();
      });
      test("Navigate to Sales New Inventory", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(600000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToSalesNewVehicleDashboard();
       await mainStore.NavigateToSalesApprovabilityScorecard();
       await mainStore.NavigateToSalesNewInventoryDetail();
       await mainStore.NavigateToSalesIncentiveLog();
       await mainStore.NavigateToSalesRDRReconciliation();
      });
     
       //NewReportsAdded - US103551
       test("Navigate to New Reports", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToServiceFlatRateHrsPDF();
       await mainStore.goto();
       await mainStore.NavigateToServiceRAPReport();
       await mainStore.NavigateToServiceLOCCycleTime();
      });
      test("Navigate to New Reports under Office", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       //Office
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToOfficeDealershipAccountingscorecard();
       await mainStore.NavigateToOfficeCashARValidation();
       await mainStore.NavigateToOfficeVehicleDocTracking();
       await mainStore.goto();
       //MArket
      });
      test("Navigate to Under MArket", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToMarketLADBudget();
       await mainStore.goto();
       await mainStore.NavigateToMarketVistaDash();
       await mainStore.goto();
       await mainStore.NavigateToMarketMarketingCreative();
       await mainStore.goto();
      });
       //Reference
       test("Navigate to Under Reference", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(500000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_suburban();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToPayrollProcessingCalendar();
       await mainStore.NavigateToManagementFeeSummary();
       await mainStore.NavigateToFixedOpsGrossTools();
       await mainStore.NavigateToVariableGrossTools();
     });
});
