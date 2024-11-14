// dependancies
const { test, expect } = require("@playwright/test");
const { TitleTracking } = require("./title_tracking_sold_no_title_totals.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/title_tracking_dev", () => {  
  test.fixme(" This report is very consuming report of Dashboard , hence disabling it until we need to run for a specific test");
  test("Title Tracking", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const titletracking = new TitleTracking(page);
       // We can use these two methods in case if the storage state doesnt work
       await titletracking.goto();
       await titletracking.login();
       await titletracking.twostepauthlogin();
       await titletracking.goto();
       await titletracking.LoadNewInv();
       await titletracking.LoadPurchaseDate();
       await titletracking.VerifyTotalNoTitleVehicle();
       await titletracking.goto();
       await titletracking.LoadAllInventory();
       await titletracking.LoadSaleDate();
       await titletracking.VerifyTotalNoTitleVehicle();
       await titletracking.goto();
       await titletracking.LoadUsedInv();
       await titletracking.LoadPurchaseDate();
       await titletracking.VerifyTotalNoTitleVehicle();
    }); 
    test("Title Tracking - Sold No Title- Validate store vehicle numbers", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(900000);
      const titletracking = new TitleTracking(page);
      // We can use these two methods in case if the storage state doesnt work
      await titletracking.goto();
      await titletracking.login();
      await titletracking.twostepauthlogin();
      await titletracking.goto();
      await titletracking.LoadPurchaseDate();
      await titletracking.LoadUsedInv();
      await titletracking.ValidateDetailAndSummaryForSelectedStoreUsed();
      await titletracking.goto();
      await titletracking.LoadSaleDate();
      await titletracking.LoadNewInv();
      await titletracking.ValidateDetailAndSummaryForSelectedStoreNew();
      await titletracking.goto();
      await titletracking.LoadSaleDate();
      await titletracking.LoadUsedInv();
      await titletracking.ValidateDetailAndSummaryForSelectedStoreUsed();
   }); 
    test("Title Tracking - Sold No Title- Validate totals between Summary and Detail ", async function ({
    browser, 
    page,
  }) {
    test.setTimeout(900000);
    const titletracking = new TitleTracking(page);
    // We can use these two methods in case if the storage state doesnt work
    await titletracking.goto();
    await titletracking.login();
    await titletracking.twostepauthlogin();
    await titletracking.goto();
    await titletracking.LoadPurchaseDate();
    await titletracking.LoadNewInv();
    await titletracking.ValidateTotalslinkNew();
    await titletracking.goto();
    await titletracking.LoadPurchaseDate();
    await titletracking.LoadAllInventory();
    await titletracking.ValidateTotalslinkAll();
    await titletracking.goto();
    await titletracking.LoadPurchaseDate();
    await titletracking.LoadUsedInv();
    await titletracking.ValidateTotalslinkUsed();
 }); 
});