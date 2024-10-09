// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will parameterize the storageState with other .json for each userLogin, if necessary

// Dependencies
const { test, expect } = require("@playwright/test");
const { EmployeeImpact } = require("./impact_builder_emp_and_impact.js");

// Test
test.describe
  .serial("Impact Builder Assignments - Page Elements @smoke", () => {
  let page;
  let impactAssignments;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    impactAssignments = new EmployeeImpact(page);
    await impactAssignments.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Impact Builder Analysis config, and validate Pay Plan Assignments elements have loaded as expected", async () => {
    const locatorNames = [
      "impactBuilderAnalysisHeader",
      "addPayPlanBtn",
      "assignEmployeeBtn",
      "configureBtn",
      "removeBtn",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Impact Builder Analysis config, and validate Pay Plan Assignments, Add a Payplan elements have loaded as expected", async () => {
    await impactAssignments.clickElement("addPayPlanBtn");

    const locatorNames = [
      "payPlanSearchBox",
      "searchBtn",
      "applyBtn",
      "payPlanIdColumn",
      "employeeColumn",
      "employeeIdColumn",
      "nameColumn",
      "jobColumn",
      "companyColumn",
      "departmentColumn",
      "cancelBtn",
      "payPlanGrid",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Impact Builder Analysis config, and validate Assign Employee elements have loaded as expected", async () => {
    await impactAssignments.clickElement("assignEmployeeBtn");

    const locatorNames = [
      "employeeLookup",
      "substituteEmployeeFilter",
      "prospectiveEmployeeFilter",
      "selectBtn",
      "empSearchBtn",
      "empSearchIcon",
      "empApplyBtn",
      "employeeColumn",
      "employeeIdColumn",
      "jobColumn",
      "companyColumn",
      "departmentColumn",
      "cancelBtn",
      // will remove from here, as this can be triggered during functional tests and not necessary for smoke tests
      // "pleaseSelectEmployeeNotification",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });
});
