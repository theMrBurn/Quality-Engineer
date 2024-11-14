// dependancies
const { test, expect } = require("@playwright/test");
const { MISStandard } = require("./mis_standard1_report.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/MIS_Standard1_dev", () => {
   test("Validate Benchmark in Sales", async function ({
       browser, 
       page,
     }) {
      test.setTimeout(600000);
       const mis = new MISStandard(page);
       // We can use these two methods in case if the storage state doesnt work
       await mis.goto();
       await mis.login();
       await mis.twostepauthlogin();
       await mis.NavigateToMainMIS1Standard();
       await mis.ValidateNewBrokerSection();
       //await mis.ValidateCarrotExtensionForGVP();
    });
});