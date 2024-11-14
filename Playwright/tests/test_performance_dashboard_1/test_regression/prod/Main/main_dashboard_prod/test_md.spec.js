// dependancies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./main_dashboard.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/main_dashboard_prod", () => {
   test("Inventory Widget - Main Dashboard - Filtered units validation", async function ({
       browser, 
       page,     
     }) {      
        test.setTimeout(600000);
        const iw = new InventoryWidget(page);
       // We can use these two methods in case if the storage state doesnt work
       await iw.goto();
       await iw.login();
       await iw.twostepauthlogin();
       await iw.SelectBryanCJDFiat();
       await iw.ValidatefilteredUnits();
       });
});