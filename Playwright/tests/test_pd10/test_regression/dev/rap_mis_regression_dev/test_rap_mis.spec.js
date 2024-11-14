const { test, expect } = require("@playwright/test");
const { RapReport } = require("./rap_mis_.js");
//const mainStore = new MainStore(page);
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/rap_mis_regression_dev", () => {
       //NewReportsAdded - US103551
       test("Regression bug - test", async function ({
        browser, 
        page,
      }) {
        test.setTimeout(900000);  
        const rapreport = new RapReport(page);
       await rapreport.goto();
       await rapreport.login();
       await rapreport.twostepauthlogin();
       await rapreport.SelectStoresForRegression();
       await rapreport.NavigateToServiceRAPReport();
       await rapreport.ValidateData();
      });
});
