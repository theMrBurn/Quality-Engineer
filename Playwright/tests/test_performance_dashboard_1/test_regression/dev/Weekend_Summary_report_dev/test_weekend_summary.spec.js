// dependancies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./weekend_summary.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Weekend_Summary_report_dev", () => {
   test.fixme("This test will be activated when the bug 135606 is resolved");
   test("Weekend Summary Report", async function ({
       browser, 
       page,     
     }) {      
        test.setTimeout(600000);
        const iw = new InventoryWidget(page);
       // We can use these two methods in case if the storage state doesnt work
       await iw.goto();
       await iw.login();
       await iw.twostepauthlogin();   
       await iw.NavigateToSalesWeekendSummary();
       await iw.ValidateStoreName();
       });
});