// dependancies
const { test, expect } = require("@playwright/test");
const { NewStore } = require("./new_store.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/new_store_dev", () => {
  test.fixme("This test is no longer needed");
  test("New Store test ", async function ({ browser, page }) {
    test.setTimeout(60000);
    const newstore = new NewStore(page);
    // We can use these two methods in case if the storage state doesnt work
    await newstore.goto();
    await newstore.login();
    await newstore.twostepauthlogin();
    await newstore.StoreSelector();
  });
});
