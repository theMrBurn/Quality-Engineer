// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { CITSummary } = require("./cit_summary.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/CIT_Summary_prod", () => {
  test.fixme(" This test should only be enabled when we want to calcualte the VR Days");
         test("Sales - CIT Summary", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(1200000);
        const citsummary = new CITSummary(page);
       await citsummary.goto();
       await citsummary.login();
       await citsummary.twostepauthlogin();
       await citsummary.SelectStoresForRegression();
       await citsummary.NavigateToSalesCITSummary();
       await citsummary.ValidateVRDayCountinCITSummary();
       //The below methods should only be activated when we are calculating the differences between ScheduleSummary and CITSUmmary pages
       /*await citsummary.NavigateToOfficeSchedulesSummary();
       await citsummary.VRCount5FromScheduleSummary();
       await citsummary.VRCount10FromScheduleSummary();
       await citsummary.VRCount15FromScheduleSummary();
       await citsummary.VRCount30FromScheduleSummary();
       await citsummary.VRCount31FromScheduleSummary();*/
      });
});
