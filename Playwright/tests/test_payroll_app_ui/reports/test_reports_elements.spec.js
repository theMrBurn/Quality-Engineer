// Payroll Reports

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AllPayReports } = require("./reports.js");

//test
test.describe.serial("Payroll /Reports", () => {
  test("Navigate to /Reports and validate Page elements have loaded", async ({
    page,
  }) => {
    const payrollReports = new AllPayReports(page);
    await payrollReports.goto();
    await payrollReports.getReportsHeader();
    await payrollReports.getCashSpliffReportLink();
    await payrollReports.getJVCATechReportLink();
    await payrollReports.getSalesRepReportLink();
    await payrollReports.getVacationTempRatesReportLink();
  });
});
