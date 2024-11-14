// dependancies
const { test, expect } = require("@playwright/test");
const { BookedAndPending } = require("./booked_and_pending_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/booked_and_pending_prod", () => {
   test("booked and pending ", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const bookedandpending = new BookedAndPending(page);
       // We can use these two methods in case if the storage state doesnt work
       await bookedandpending.goto();
       await bookedandpending.login();
       await bookedandpending.twostepauthlogin();
       await bookedandpending.SelectStoresForRegression();
       await bookedandpending.NavigateToSalesBookedandPending();
       await bookedandpending.VerifyTotalVehicle();
       await bookedandpending.NavigateToSalesBookedandPending();
       await bookedandpending.VerifyTotalMatchBetweenBPandDataBuckets();
       await bookedandpending.NavigateToSalesBookedandPending();
       await bookedandpending.VerifyTotalwithDataBuckets();
       await bookedandpending.ValidateDuplicateStore();
       await bookedandpending.ValidateDuplicateDeals();    
    });
});