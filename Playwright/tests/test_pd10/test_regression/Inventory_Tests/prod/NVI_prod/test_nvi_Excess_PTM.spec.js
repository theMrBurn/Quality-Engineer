// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./nvi_excess_ptm.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/New_Vehicle_Inventory_prod", () => {
  test.fixme("This test will be implemented later");
   test("login to SPE", async function ({
       browser, 
       page,
     }) {
       test.setTimeout(6000000);
       const newvehicleinventory = new NewVehicleInventory(page);
       // We can use these two methods in case if the storage state doesnt work
       await newvehicleinventory.goto();
       await newvehicleinventory.login();
       await newvehicleinventory.twostepauthlogin();
       await newvehicleinventory.NavigateToSalesNewInventoryDetail();
       await newvehicleinventory.validatePTM();
       
    });
});