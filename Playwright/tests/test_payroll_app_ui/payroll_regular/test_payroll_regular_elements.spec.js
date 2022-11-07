// Payroll Regular

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollRegular } = require("./payroll_regular.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Regular elements", () => {
  test("Navigate to /Payroll/Regular and validate Page elements have loaded @smoke", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);
    await payrollRegular.goto();
    await payrollRegular.getPayrollGrid();
    await payrollRegular.getPayrollGroupListDropdown();
    await payrollRegular.getPeriodEndDateListDropdown();
    await payrollRegular.getPayRegionlistDropdown();
    await payrollRegular.getPayCalendarListDropdown();
    await payrollRegular.getPayrollStatusListDropdown();
    await payrollRegular.getPayrollDataLoadListDropdown();
    await payrollRegular.getPayrollInputSheetListDropdown();
    await payrollRegular.getAdjustmentListDropdown();
    await payrollRegular.getRegisterReviewPayrollDropdown();
    await payrollRegular.getPayRegisterReviewLocationDropdown();
  });
});
