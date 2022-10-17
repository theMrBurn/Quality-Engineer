// Payroll Dashboard

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayrollDashboard } = require("./payroll_dashboard.js");

//test
test.describe.serial("Payroll Home Page", () => {
  test("Navigate to Payroll Home and validate Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const payrollDashboard = new PayrollDashboard(page);
    await payrollDashboard.goto();
    await payrollDashboard.getHeaderContainer();
    await payrollDashboard.getPaycalendarDrop();
    await payrollDashboard.getPeriodDrop();
    await payrollDashboard.getMonthPickerDrop();
    await payrollDashboard.getpayrollSetupBox();
    await payrollDashboard.getDataLoadBox();
    await payrollDashboard.getInputSheetBox();
    await payrollDashboard.getPayRunStatusBox();
    await payrollDashboard.getNotRunBox();
    await payrollDashboard.getPrelimiaryBox();
    await payrollDashboard.getErrorbox();
    await payrollDashboard.getCompleteBox();
    await payrollDashboard.getRegisterReviewBox();
    await payrollDashboard.getPayrollBox();
    await payrollDashboard.getCompanyBox();
    await payrollDashboard.getManualChecksBox();
    await payrollDashboard.getMonthToDateBox();
    await payrollDashboard.getMonthToDateCounter();
    await payrollDashboard.getyearToDateBox();
    await payrollDashboard.getYearToDateCounter();
    await payrollDashboard.getAveragePerMonthBox();
    await payrollDashboard.getAveragePerMonthCounter();
  });

  test("Navigate to Payroll home and Click top header Links", async ({
    browser,
    page,
  }) => {
    const payrollDashboard = new PayrollDashboard(page);
    await payrollDashboard.goto();
    await payrollDashboard.clickPayrollLink();
    await payrollDashboard.clickStoreInputLink();
    await payrollDashboard.clickAdjustmentLink();
    await payrollDashboard.clickAccrualLink();
    await payrollDashboard.clickAuditLink();
    await payrollDashboard.clickOffCycleLink();
    await payrollDashboard.clickSupervisorTasksLink();
  });
});
