// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactAssignments } = require("./impact_builder_assignments.js");

//test
test.describe
  .serial("Impact Builder Assignments - Page Elements @smoke", () => {
  test("Navigate to Impact Assignments, and validate Assignments elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    const locatorNames = [
      "reasonTypeDropdown",
      //"reasonTypeDropdownOpen", - not visible but present
      //"reasonTypeDropdownClosed", - not visible but present
      "replacementEmployeeDropdown",
      "replacementEmployeeDropdownOpen",
      //"replacementEmployeeDropdownClosed", - not visible but present
      //"firstMenuOption", - not visible but present
      "newAveragePayTextbox",
      "replacementAveragePayTextbox",
      "closeButton",
      //"replacementEmployeeCloseButton", - not visible but present
      "performanceImpact",
      "addMeasure",
      "actionsFirst",
      "descriptionFirst",
      "columnHeader",
      "eightMonthAverage1",
      "performanceObjectiveFirst",
      "commissionImpact",
      "actionsSecond",
      "descriptionSecond",
      //"columnHeaderSecond", - not visible but present
      "eightMonthAverage2",
      "performanceObjectiveSecond",
      "bonusImpact",
      "actionsThird",
      "descriptionThird",
      //"columnHeaderThird", - not visible but present
      "eightMonthAverage3",
      "performanceObjectiveThird",
      "payoutImpact",
      "descriptionFourth",
      //"columnHeaderFourth", - not visible but present
      "eightMonthAverage4",
      "performanceObjectiveFourth",
      "weight",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Impact Assignments, click Add Productivity Measure and validate modal elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    await impactAssignments.clickElement("addMeasure");

    //validate expected text elements have loaded
    const locatorNames = [
      "sourceSystemDropdown",
      "sourceFieldDropdown",
      "employeeListDropdown",
      "companyOptionalDropdown",
      "fieldDescriptionRequiredInput",
      "selectButton",
      "closeButton",
    ];

    for (const locatorName of locatorNames) {
      await impactAssignments.checkElementVisibility(locatorName);
    }
  });
});
