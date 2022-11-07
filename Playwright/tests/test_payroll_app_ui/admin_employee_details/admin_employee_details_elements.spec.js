// Payplan Employee Details

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminEmployee } = require("./admin_employee_details.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Admin Employee Details", () => {
  test("Navigate to Admin/EmployeeDetails and validate Page elements have loaded @smoke", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    // validate text elements have loaded as expected
    await adminEmployeeDetails.getEmployeeDetailsHeader();
    await adminEmployeeDetails.getCompanyText();
    await adminEmployeeDetails.getStatusText();
    await adminEmployeeDetails.getJobText();
    await adminEmployeeDetails.getPayPlanStatusText();
    await adminEmployeeDetails.getEmployeeText();
    await adminEmployeeDetails.getDepartmentText();
    await adminEmployeeDetails.getPayPlanCalculationText();
    await adminEmployeeDetails.getServiceDateText();

    // validate input/dropdown elements have loaded as expected
    await adminEmployeeDetails.getComapanyInput();
    await adminEmployeeDetails.getStatusInput();
    await adminEmployeeDetails.getJobInput();
    await adminEmployeeDetails.getPayPlanStatusInput();
    await adminEmployeeDetails.getDepartmentInput();
    await adminEmployeeDetails.getActiveInput();
    await adminEmployeeDetails.getPayPlanCalculationInput();
  });
});
