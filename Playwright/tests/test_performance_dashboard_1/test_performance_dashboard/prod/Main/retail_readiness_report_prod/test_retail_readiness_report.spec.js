// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./retail_readiness.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/retail_readiness_report_prod", () => {
       // Main    
      test.fixme(" This test is a functional test");
       test("Navigate to Main", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(600000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login();
       await mainStore.twostepauthlogin();       
       //We will activate this method when it is ready in production.
       await mainStore.NavigatetoMainConsumerOptionality();
       //await mainStore.NavigateToMainRetailReadinessOmnichannel();
       await mainStore.ValidateDownloadAABMW();
       await mainStore.ValidateDownloadAAChevyCadillac();
       await mainStore.ValidateDownloadAACDJR();
       await mainStore.ValidateDownloadAAMerc();
       await mainStore.ValidateDownloadGardenCityCDJR();   
      });
});
