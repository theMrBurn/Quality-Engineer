// Payroll Accrual

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollAccrual } = require("./payroll_accrual.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Accrual elements", () => {
  test("Navigate to /Payroll/Accrual and validate Page elements have loaded", async ({
    page,
  }) => {
    const payrollAccrual = new PayrollAccrual(page);
    await payrollAccrual.goto();
    await payrollAccrual.getAccrualHeader();
    await payrollAccrual.getAccrualInputCompany();
    await payrollAccrual.getAccrualInputPPEdate();
    await payrollAccrual.getAccrualInputPayFrequency();
  });
});
