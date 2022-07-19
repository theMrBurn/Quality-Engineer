// Payroll Offcycle Earnings

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayrollOffCycleEarnings } = require("./payroll_offcycle_earnings.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /OffCycleEarnings elements", () => {
  test("Navigate to /Payroll/OffCycleEarnings and validate expected Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const payrollOffcycle = new PayrollOffCycleEarnings(page);
    await payrollOffcycle.goto();

    await payrollOffcycle.getOffcycleHeader();
    await payrollOffcycle.getCompanyText();
    await payrollOffcycle.getStatusText();
    await payrollOffcycle.getEmployeeText();
    await payrollOffcycle.getPPEdateText();
    await payrollOffcycle.getCostCenterText();
    await payrollOffcycle.getOffCycleInfoText();
    await payrollOffcycle.getCompanyDropdown();
    await payrollOffcycle.getPayFrequencyDropdown();
    await payrollOffcycle.getEmployeeDropdown();
    await payrollOffcycle.getPayFrequencyDropdown();
    await payrollOffcycle.getPPEdateDropdownHidden(); /// this is hidden until a PPE date is entered. Will validate isVisible() when doing smoke test
    await payrollOffcycle.getJobTitleDropdown();
    await payrollOffcycle.getCostCenterDropdown();
    await payrollOffcycle.getStatusDropdown();
    await payrollOffcycle.getTypeDropdown();
    await payrollOffcycle.getSearchButton();
  });
});
