// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./main_store.js");
//const mainStore = new MainStore(page);
// user
//test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe.serial("SPE Home Page", () => {
  
  test("login to SPE", async ({
       page
    }) => {
      
      const mainStore = new MainStore(page);
      await mainStore.goto();
      await mainStore.login();
      await mainStore.twostepauthlogin();
      await mainStore.NavigateToBodyShop();
      await mainStore.NavigateToPartsreport();
      await mainStore.NavigateToServiceDashboard();
      await mainStore.NavigateToServiceFlateRateHrs();
      await mainStore.NavigateToServiceRepairOrderLog();
      await mainStore.NavigateToServiceAdvisorreport()
      await mainStore.NavigateToServicePDELMobilereport();
      await mainStore.NavigateToServiceTechnicianPerformancereport();
      await mainStore.NavigateToAdminTrackingDashboardreport();
      await mainStore.NavigateToDriveway();
      //await mainStore.NAvigateToAdminEmployeeLookup();
      //await mainStore.NAvigateToAdminJobLauncher();
      //await mainStore.NavigateToAdminSiteAlert();
      
      
      
      
      
    });

    
});
