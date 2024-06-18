// Payplan Employee Details

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminEmployee } = require("./admin_employee_details.js");

// test
test.describe.serial("/Admin Employee Details", () => {
  test("Navigate to Admin/EmployeeDetails and validate Page elements have loaded as expected @smoke", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    const locatorNames = [
      "employeeDetailsHeader",
      "companyText",
      "statusText",
      "jobText",
      "payPlanStatusText",
      "employeeText",
      "departmentText",
      "activeText",
      "payPlanCalculationText",
      "serviceDateText",
      "companyInput",
      "statusListInput",
      "jobsListInput",
      "payPlanStatusInput",
      "employeeInput",
      "departmentInput",
      "activeInput",
      "payPlanCalculationInput",
      "companyDropdown",
      "statusDropdown",
      "jobDropdown",
      "departmentDropdown",
      "activeDropdown",
      "payPlanCalculationDropdown",
    ];

    try {
      for (const locatorName of locatorNames) {
        await adminEmployeeDetails.locators[locatorName]().isVisible();
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
