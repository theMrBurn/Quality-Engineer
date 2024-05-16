// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactAssignments } = require("./impact_builder_emp_and_impact");

//test
test.describe
  .serial("Impact Builder Assignments - Page Elements @smoke", () => {
  test("Navigate to Impact Builder Analysis config, and validate Pay Plan Assignments elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    //validate expected text elements have loaded
    const locatorNames = [
      "impactBuilderAnalysisHeader",
      "addPayPlanBtn",
      "assignEmployeeBtn",
      "addPayPlansAndAssignBtn",
      "configureBtn",
      "removeBtn",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Impact Builder Analysis config, and validate Pay Plan Assignments, Assign Employee elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    await impactAssignments.clickElement("addPayPlanBtn");

    //validate expected text elements have loaded
    const locatorNames = [
      "payPlanSearchBox",
      "payPlanLookup",
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
      "payPlanDiv",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Impact Builder Analysis config, and validate Pay Plan Assignments, Add Pay Plan elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    await impactAssignments.clickElement("assignEmployeeBtn");

    //validate expected text elements have loaded
    const locatorNames = [
      "employeeLookup",
      "substituteEmployeeFilter",
      "prospectiveEmployeeFilter",
      "selectBtn",
      // will remove from here, as this can be triggered during functional tests and not necessary for smoke tests
      // "pleaseSelectEmployeeNotification",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });
});
