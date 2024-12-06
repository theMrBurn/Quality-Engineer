// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./sales_mgr_top_prod.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/sales_mgr_top_producer_dev", () => {
  test("Navigate to Sales Mngr Top Producer Report", async function ({
    browser,
    page,
  }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.NavigateToSalesSalesMgrTopProducers();
  });
});
