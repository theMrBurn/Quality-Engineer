// dependancies
const { test, expect } = require("@playwright/test");
const { MngrPerformance } = require("./fi_mngr_performance.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/fi_dashboard_prod", () => {
   test.fixme(" This test is skiped because its a known issue");
   test("F&I Dashboard - F&I Manager Performance Widget", async function ({
       browser, 
       page,     
     }) {      
        test.setTimeout(600000);
        const iw = new MngrPerformance(page);
       // We can use these two methods in case if the storage state doesnt work
       await iw.goto();
       await iw.login();
       await iw.twostepauthlogin();
       await iw.SelectStoresForRegression();
       await iw.NavigateToSalesFIOpsDashboard();
       await iw.ValidateUnits();
       });
});