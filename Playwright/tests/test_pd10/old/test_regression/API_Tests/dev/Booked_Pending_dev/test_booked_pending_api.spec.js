// dependancies
const { test, expect } = require("@playwright/test");
const { bookedandpending } = require("./booked_pending_api.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/Booked_Pending_dev", () => {
  test("API tests for Booked and Pending Summary And Detail", async function ({
    browser,
    page,
  }) {
    test.setTimeout(900000);
    const Bookedandpending = new bookedandpending(page);
    // We can use these two methods in case if the storage state doesnt work
    await Bookedandpending.goto();
    await Bookedandpending.login();
    await Bookedandpending.twostepauthlogin();
    await Bookedandpending.ValidateAPIResponseBPSummary();
    await Bookedandpending.ValidateAPiResponseBPDetailForAStore();
  });
});
