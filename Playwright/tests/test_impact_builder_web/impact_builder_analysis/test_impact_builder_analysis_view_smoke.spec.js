// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will parameterize the storageState with other .json for each userLogin, if necessary

// Dependencies
const { test, expect } = require("@playwright/test");
const { ImpactAnalysisPage } = require("./impact_builder_analysis.js");

// Test
test.describe.serial("Impact Builder Search - Page Elements @smoke", () => {
  let page;
  let impactAnalysisPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    impactAnalysisPage = new ImpactAnalysisPage(page);
    await impactAnalysisPage.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Impact Builder Search and validate Page elements have loaded as expected", async () => {
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
