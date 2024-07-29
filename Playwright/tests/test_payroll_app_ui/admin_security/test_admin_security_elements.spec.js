// Payplan Employee Details

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminSecurity } = require("./admin_security_roles.js");

//test
test.describe.serial("Admin Employee Details Page load", () => {
  test("Navigate to Admin/EmployeeDetails and validate Page elements have loaded @smoke", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    const locatorNames = [
      "securityRoleText",
      "displayNameText",
      "principalNameText",
      "departmentText",
      "jobTitleText",
      "securityRoleDropdown",
    ];

    try {
      for (const locatorName of locatorNames) {
        await adminSecurityRoles.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
