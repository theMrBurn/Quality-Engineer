// Payroll Adjustment

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollAdjustment } = require("./payroll_adjustment.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Adjustment elements", () => {
  test("Navigate to /Payroll/Adjustment and validate Page elements have loaded", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.getAdjustmentHeader();
    await payrollAdjustment.getInstructionsText();
    await payrollAdjustment.getPayrollText();
    await payrollAdjustment.getCompanyText();
    await payrollAdjustment.getPPEdateText();
    await payrollAdjustment.getStatusText();
    await payrollAdjustment.getPayrollTypeListDropdown();
    await payrollAdjustment.getPayGroupDropdown();
    await payrollAdjustment.getPPEdateDropdown();
  });

  test("Navigate to /Payroll/Adjustment and validate dropdowns can be clicked", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.clickPayrollTypeListDropdown();
    await payrollAdjustment.clickPaygroupListDropdown();
    await payrollAdjustment.clickPPEdateDropdown();
  });
});
