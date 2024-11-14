// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./new_vehicle_inventory_on_ground_totals_stores.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/NVI_prod", () => {
   test("NVI - Totals for a Store", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(900000);
       const newvehicleinventory = new NewVehicleInventory(page);
       // We can use these two methods in case if the storage state doesnt work
       await newvehicleinventory.goto();
       await newvehicleinventory.login();
       await newvehicleinventory.twostepauthlogin();
       await newvehicleinventory.goto();
       await newvehicleinventory.SelectStoresForRegression();
       await newvehicleinventory.NavigateToSalesNewInventoryDetail();  
       await newvehicleinventory.ValidateTotalsForAStore030Days();
       await newvehicleinventory.ValidateTotalsForAStore3160Days();
       await newvehicleinventory.ValidateTotalsForAStore6190Days();
       await newvehicleinventory.ValidateTotalsForAStore91Days();
       await newvehicleinventory.ValidateTotalsForAStoreTotal();
     });
});