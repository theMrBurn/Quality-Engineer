// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { EmployeeAndImpact } = require("./emplopyee_and_impact.js");

//test
test.describe
  .serial("Impact Builder - Employee and Impact Information Page Elements @smoke", () => {
  test("Navigate to employee payplan, click Impact Builder and validate Page elements have loaded as expected", async ({
    page,
  }) => {
    const employeeAndImpact = new EmployeeAndImpact(page);

    //at the top of the test, must use Allpay Employee Payplan, select Employee under test and move on
    const payplanID = "?payplanid=3818";
    await employeeAndImpact.goto(payplanID);

    //validate expected text elements have loaded
    await employeeAndImpact.getEmployeeAndImpactHeader();
    await employeeAndImpact.getMonthlyAverageDropdown();
    await employeeAndImpact.getReasonTypeDropdown();
    await employeeAndImpact.getdClosingMonthCalendarInput();
    await employeeAndImpact.getEmployeeName();
    await employeeAndImpact.getCompanyName();
    await employeeAndImpact.getJobName();
    await employeeAndImpact.getNewAveragePay();
    await employeeAndImpact.getCurrentAveragePay();
  });
});
