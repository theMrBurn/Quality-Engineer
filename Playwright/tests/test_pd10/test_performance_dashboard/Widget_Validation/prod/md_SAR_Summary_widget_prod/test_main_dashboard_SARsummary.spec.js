// dependancies
const { test, expect } = require("@playwright/test");
const { SARSummary } = require("./main_dashboard_SARsummary.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/md_SAR_summary_widget_prod", () => {
   test.fixme("this module is not part of SPE Dashboard anymore");
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
       await iw.SelectSToreForTHornhillHonda();
       console.log("Thornhill Honda");
       await iw.ValidateTotalCount();
       await iw.goto();
       await iw.ValidateTotalCountForOutOfCriteria();
       await iw.goto();
       await iw.SelectStoreForFHCJDR();
       console.log("FH CDJR");
       await iw.ValidateTotalCount();
       await iw.goto();
       await iw.ValidateTotalCountForOutOfCriteria();
       await iw.goto();
       await iw.SelectStoresForDTLA();
       console.log("DT LA");
       await iw.ValidateTotalCount();
       await iw.goto();
       await iw.ValidateTotalCountForOutOfCriteria();
       });
});