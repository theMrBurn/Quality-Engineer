// dependancies
const { test, expect } = require("@playwright/test");
const { RetailUnits } = require("./retail_units.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/retail_units_main_dev", () => {
  test("Store Name - Retail Units - Regression bugs ", async function ({
    browser,
    page,
  }) {
    test.setTimeout(500000);
    const retailunits = new RetailUnits(page);
    // We can use these two methods in case if the storage state doesnt work
    await retailunits.goto();
    await retailunits.login();
    await retailunits.twostepauthlogin();
    await retailunits.ValidateStoreNameForNewRetailUnits();
    await retailunits.goto();
    await retailunits.ValidateStoreNameForUsedRetailUnits();
  });
});
