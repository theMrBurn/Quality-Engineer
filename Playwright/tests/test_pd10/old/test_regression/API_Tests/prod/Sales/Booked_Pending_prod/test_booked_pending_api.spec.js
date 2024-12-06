// dependancies
const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./booked_pending_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Booked_Pending_prod", () => {
  test("API tests for Booked and Pending Summary And Detail", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const newvehicleinventory = new NewVehicleInventory(page);
    // We can use these two methods in case if the storage state doesnt work
    await newvehicleinventory.goto();
    await newvehicleinventory.login();
    await newvehicleinventory.twostepauthlogin();
    await newvehicleinventory.ValidateAPIResponseBPSummary();
    await newvehicleinventory.ValidateAPiResponseBPDetailForAStore();
  });
});
