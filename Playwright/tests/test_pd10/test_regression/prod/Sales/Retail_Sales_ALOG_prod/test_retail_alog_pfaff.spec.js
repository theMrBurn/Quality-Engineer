// dependancies
const { test, expect } = require("@playwright/test");
const { Retail } = require("./retail_alog_totals_pfaff.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Retail_Sales_ALOG_prod", () => {
   test("Retail Alog Total - Pfaff", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(600000);
       const retail = new Retail(page);
       // We can use these two methods in case if the storage state doesnt work
       await retail.goto();
       await retail.login();
       await retail.twostepauthlogin();
       await retail.SelectStoresForRegression();
       await retail.NavigateToSalesRetailLogALOG();
       await retail.ValidateTotalForStores();

    });
});