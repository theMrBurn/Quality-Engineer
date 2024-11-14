// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./payroll_and_productivity.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/payroll_and_productivity_dev", () => {
  //test.fixme("this test is timing out");
   
    test("Navigate to admin and driveway", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(600000);
      const mainStore = new MainStore(page);
      await mainStore.goto();
      await mainStore.login();
      await mainStore.twostepauthlogin();
      await mainStore.goto();
      await mainStore.NavigateToAdminEmployeeLookup();
      //commenting it out until Scott can give permissions to impersonate.
      //await mainStore.impersonate();
    });
   });
