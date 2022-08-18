// Payplan Employee

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayplanEmployee } = require("./payplan_employee.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payplans Employee", () => {
  test("Navigate to Payplan/PayplanEmployee and validate Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const employeePayPlans = new PayplanEmployee(page);
    await employeePayPlans.goto();
    await employeePayPlans.getEmployeePlansHeader();
    await employeePayPlans.getEmployeeDropdownText();
    await employeePayPlans.getEmployeeDropdown();
    await employeePayPlans.getCompanyText();
    await employeePayPlans.getJobText();
    await employeePayPlans.getDepartmentText();
    await employeePayPlans.getEffectiveDatesText();
    await employeePayPlans.getEffectiveStartDateInput();
    await employeePayPlans.getIsPayPlanExpiredText();
    await employeePayPlans.getIsPayPlanExpiredInput();
    await employeePayPlans.getTagsText();
    await employeePayPlans.getClearFilters();
    await employeePayPlans.getExportExcelButton();
    await employeePayPlans.getAddPlanButton();
    await employeePayPlans.getPageGrid();
  });

  test("Navigate to Payplan Employee and Click links to validate functionality", async ({
    browser,
    page,
  }) => {
    const employeePayPlans = new PayplanEmployee(page);
    await employeePayPlans.goto();
    await employeePayPlans.clickClearFilters();
    await employeePayPlans.clickExportExcelButton();
    await employeePayPlans.clickAddPlanButton();
  });

  test.fixme(
    "for some reason these are formatted in a way that its hidden until its interacted with, which is wrong",
    async ({ browser, page }) => {
      const employeePayPlans = new PayplanEmployee(page);
      await employeePayPlans.goto();
      await employeePayPlans.getCompanyDropdownHidden();
      await employeePayPlans.getJobDropdownHidden();
      await employeePayPlans.getStatusDropdownHidden();
      await employeePayPlans.getDepartmentDropdownHidden();
      await employeePayPlans.getEffectiveEndDateInput();
      await employeePayPlans.getTagsDropdown();
    }
  );
});
