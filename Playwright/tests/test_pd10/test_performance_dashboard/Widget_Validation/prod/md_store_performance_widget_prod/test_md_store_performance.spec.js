// dependancies
const { test, expect } = require("@playwright/test");
const { SARSummary } = require("./md_store_performance.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/md_store_performance_widget_prod", () => {
   test("SAR Summary Widget - Main Dashboard ", async function ({
       browser, 
       page,     
     }) {      
        test.setTimeout(600000);
        const iw = new SARSummary(page);
       // We can use these two methods in case if the storage state doesnt work
       await iw.goto();
       await iw.login();
       await iw.twostepauthlogin();
       await iw.SelectStoresForRegression();
       await iw.ValidateTheUnits();
       });
});