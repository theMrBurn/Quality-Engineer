// dependancies
const { test, expect } = require("@playwright/test");
const { BP } = require("./booked_pending_driveway.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Booked_Pending_prod", () => {
   test("booked and pending - Driveway - Validate Duplicate Stocks", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const bp = new BP(page);
       // We can use these two methods in case if the storage state doesnt work
       await bp.goto();
       await bp.login();
       await bp.twostepauthlogin();
       await bp.SelectStoresForRegression();
       await bp.NavigateToSalesBookedandPending();
       await bp.ValidateDuplicateStore();
       await bp.ValidateDealNumbers();
    });
});