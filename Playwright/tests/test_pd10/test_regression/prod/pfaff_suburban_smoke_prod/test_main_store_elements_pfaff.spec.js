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
  test.fixme("Reynolds Conversion is completed . Hence disabling this test");
  //test.fixme("this test is timing out");
     test("Navigate to Service Menu", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(300000);
      const mainStore = new MainStore(page);
      await mainStore.goto();
      await mainStore.login_pfaff();
      await mainStore.twostepauthlogin();
      await mainStore.goto();
      await mainStore.NavigateToServiceRepairOrderLog();
      await mainStore.NavigateToServiceAdvisorReport();
      await mainStore.NavigateToServicePDELMobileReport();
      await mainStore.NavigateToServiceTechnicianPerformanceReport();
    })
    test("Navigate to Office", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(600000);
      const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToOfficeSchedulesSummary();
       await mainStore.NavigateToOfficeSchedulesARAP();
       await mainStore.NavigateToOfficeSchedulesSARExceptionRequest();
       await mainStore.NavigateToOfficeSchedulesSARExceptionApproval();
      })
       // Main    
       test("Navigate to Main", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToMainStorePerformanceScorecardSPS();
       await mainStore.NavigateToMainMISComparison();
       await mainStore.NavigateToMainMIS1Standard();
       await mainStore.NavigateToMainStoreRosters();
       await mainStore.NavigateToMainOperationalMIS();
       await mainStore.NavigateToMainStoreLeadershipReport();
       await mainStore.goto();  
      })
      test("Navigate to Sales New Inventory", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToSalesNewInventoryDetail();
      })
      test("Navigate to Sales Used Inventory", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToSalesUsedVehicleDashboard();
       await mainStore.NavigateToSalesUsedInventoryDetail();
       await mainStore.NavigateToSalesInventoryAnalysisUVIA();
       await mainStore.NavigateToSalesUsedVehicleReportCard();
      })
       // F&I Ops 
       test("Navigate to Sales F& I ops", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(400000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToSalesFIOpsDashboard();
       await mainStore.NavigateToSalesFIPerformanceScorecard();
       await mainStore.NavigateToSalesFIBankLog();
       //Sales Log
       await mainStore.NavigateToSalesRetailSalesLogALOG();
       await mainStore.NavigateToSalesWholesaleLogALOG();
      })
       //NewReportsAdded - US103551
       test("Navigate to New Reports", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       //await mainStore.NavigateToServiceFlatRateHrsPDF();
       await mainStore.goto();
       await mainStore.NavigateToServiceContractSales();
      })
      test("Navigate to Under MArket", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToMarketVistaDash();
       await mainStore.goto();
      })
       //Reference
       test("Navigate to Under Reference", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(300000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login_pfaff();
       await mainStore.twostepauthlogin();
       await mainStore.goto();
       await mainStore.NavigateToPayrollProcessingCalendar();
       await mainStore.NavigateToManagementFeeSummary();
       await mainStore.NavigateToFixedOpsGrossTools();
       await mainStore.NavigateToVariableGrossTools();
     })
});
