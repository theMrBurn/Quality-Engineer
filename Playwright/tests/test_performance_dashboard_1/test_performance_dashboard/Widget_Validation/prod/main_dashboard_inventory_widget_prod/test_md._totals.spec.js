// dependancies
const { test, expect } = require("@playwright/test");
const { InventoryWidget } = require("./main_dashboard_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/main_dashboard_inventory_widget_prod", () => {
   test.fixme("This test slows down , hence disabling it");
   test("Airstream Regression bugs ", async function ({
       browser, 
       page,     
     }) {      
        test.setTimeout(900000);
        const iw = new InventoryWidget(page);
       // We can use these two methods in case if the storage state doesnt work
       await iw.goto();
       await iw.login();
       await iw.twostepauthlogin();
       await iw.SelectFarmingtonCDJR();
       await iw.ValidateNVIUnits();
       await iw.ValidateUVIUnits();
       await iw.SelectCentinnialStore();       
       await iw.ValidateNVIUnits();
       await iw.ValidateUVIUnits();
       });
});