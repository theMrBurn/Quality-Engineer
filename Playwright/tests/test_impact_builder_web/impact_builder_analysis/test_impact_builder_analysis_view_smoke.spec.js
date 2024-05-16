// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactAnalysisPage } = require("./impact_builder_analysis.js");

//test
test.describe.serial("Impact Builder Search - Page Elements @smoke", () => {
  test("Navigate to Impact Builder Search and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactAnalysisPage = new ImpactAnalysisPage(page);
    await impactAnalysisPage.goto();

    //validate expected text elements have loaded
    const locatorNames = [
      "impactBuilderAnalysisHeader",
      "analysisConfigHeader",
      "payplanAssignmentsHeader",
      "employeeAndImpactHeader",
      "companyInput",
      "expenseTypeInput",
      "primaryAverageInput",
      "secondaryAverageInput",
      "closingMonthCalendar",
      "applyButton",
      "graphPanelFull",
      "personalExpenseGraph",
      "expensePercentofGrossGraph",
      "personalExpense3MoAv",
      "personalExpensePercentOfGross3MoAv",
      "expenseGuide3MoAv",
      "personalExpenseWithChange",
      "personalExpensePercentOfGrossWithChange",
    ];

    for (const locatorName of locatorNames) {
      await impactAnalysisPage.checkElementVisibility(locatorName);
    }
  });
});
