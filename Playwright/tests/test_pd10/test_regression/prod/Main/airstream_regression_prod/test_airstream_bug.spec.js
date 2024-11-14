// dependancies
const { test, expect } = require("@playwright/test");
const { Airstream } = require("./airstream_bug.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/airstream_regression_prod", () => {
   test.fixme(" This fix is available and stable now. Hence disabling this test");
   test("Airstream Regression bugs ", async function ({
      browser, 
      page,
    }) {
       test.setTimeout(800000);
      const airstream = new Airstream(page);
      // We can use these two methods in case if the storage state doesnt work
      await airstream.goto();
      await airstream.login();
      await airstream.twostepauthlogin();
      await airstream.AirstreamStoreSelector();
      });
/*      test("Airstream Regression bugs - Store Name Validation ", async function ({
        browser, 
        page,
      }) {
         test.setTimeout(800000);
        const airstream = new Airstream(page);
        // We can use these two methods in case if the storage state doesnt work
        await airstream.goto();
        await airstream.login();
        await airstream.twostepauthlogin();
        await airstream.ValidateTheStoreNames();
        }); */
        // The above test will be activated after the bug fix goes into production
});