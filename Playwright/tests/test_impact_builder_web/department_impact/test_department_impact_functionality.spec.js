// Payplan ID endpoint

// dependancies
const { test, expect } = require("@playwright/test");
const { DepartmentImpact } = require("./department_impact.js");

//test
test.describe
  .serial("Impact Builder - Employee and Impact Information functional testing @func", () => {
  test("Navigate to employee payplan, Validate that the payplan ID matches the expected employee", async ({
    page,
  }) => {
    const departmentImpact = new DepartmentImpact(page);

    //at the top of the test, must use Allpay Employee Payplan, select Employee under test and move on
    const payplanID = `?payplanid=3818`;
    await departmentImpact.goto(payplanID);

    const employeeName = "Stephen  Philips (569)";

    await expect(page.getByLabel("Employee")).toHaveValue(employeeName);
  });
});
