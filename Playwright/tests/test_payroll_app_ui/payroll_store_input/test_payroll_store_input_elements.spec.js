// Payroll Store Input Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollStoreInput } = require("./payroll_store_input.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Storeinput elements", () => {
  test("Navigate to /Payroll/Storeinput and validate Page elements have loaded", async ({
    page,
  }) => {
    const payrollStoreInput = new PayrollStoreInput(page);
    await payrollStoreInput.goto();
    await payrollStoreInput.getStoreInputHeader();
    await payrollStoreInput.getStoreInputCompanyDropdown();
    await payrollStoreInput.getStoreInputPPEdate();
    await payrollStoreInput.getStoreInputStatus();
    await payrollStoreInput.getStoreInputInstructions();
  });
});
