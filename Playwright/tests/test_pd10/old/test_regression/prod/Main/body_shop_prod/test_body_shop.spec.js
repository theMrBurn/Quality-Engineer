// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./body_shop.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/body_shop_prod", () => {
  //test.fixme("this test is timing out");
  test("login to SPE", async function ({ browser, page }) {
    test.setTimeout(300000);
    const mainStore = new MainStore(page);
    // We can use these two methods in case if the storage state doesnt work
    await mainStore.goto();
    await mainStore.login();
    await mainStore.twostepauthlogin();
    await mainStore.SelectStores();
    await mainStore.NavigateToBodyShop();
    await mainStore.ValidateData();
  });
});
