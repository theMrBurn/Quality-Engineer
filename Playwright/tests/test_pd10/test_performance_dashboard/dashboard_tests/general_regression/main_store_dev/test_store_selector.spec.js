// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStore } = require("./PD10_main_store.js");

//test
test.describe.serial("/main_store_dev", () => {
  test.fixme(
    "this seems to have one method that attempts all locators are visible, theres a better way to do this, and probably a few of these are invalid now, fix it",
  );
  test("Store Selector Test for GVP and storelist under gvp", async function ({
    browser,
    page,
  }) {
    const mainStore = new MainStore(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    await mainStore.ValidateStore();
  });
});
