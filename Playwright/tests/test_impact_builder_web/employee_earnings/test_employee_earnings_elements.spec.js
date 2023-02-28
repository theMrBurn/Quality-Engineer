// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { EmployeeEarnigs } = require("./employee_earnings.js");

//test
test.describe
  .serial("Impact Builder - Employee Earnings Component Elements @smoke", () => {
  test("Navigate to /?payplanid=3906 and validate component elements have loaded as expected", async ({
    page,
  }) => {
    const employee_earnings = new EmployeeEarnigs(page);

    //at the top of the test, must declare the payplan under test by going directly there via URL query
    const payplanID = "/?payplanid=3906";
    await employee_earnings.goto(payplanID);

    //validate expected text elements have loaded
    await employee_earnings.getEmployeeEarningsHeader();
    await employee_earnings.getDescriptionRowText();
    await employee_earnings.getTwentyTwentyOneColumnText();
    await employee_earnings.getThreeMonthAverageColumnText();
    await employee_earnings.getPerformanceObjectiveText();
    await employee_earnings.getTotalMonthlyPayText();
    await employee_earnings.getTotalAnnualPayText();
    await employee_earnings.getTotalBiWeeklyPayText();
  });
});
