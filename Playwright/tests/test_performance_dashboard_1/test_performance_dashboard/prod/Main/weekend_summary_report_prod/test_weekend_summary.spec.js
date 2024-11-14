// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./weekly_summary.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/weekend_summary_report_prod", () => {
      test.fixme("Activate the test once it the corresponding dev story is in prod");
       test("Sales - Weekend Summary", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(400000);
        const mainStore = new MainStore(page);
       await mainStore.goto();
       await mainStore.login();
       await mainStore.twostepauthlogin();
       await mainStore.NavigateToSalesWeekendSummary();
       await mainStore.ValidateGroupName();
      });
});
