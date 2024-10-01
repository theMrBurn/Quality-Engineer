// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactToExpenses } = require("./impact_to_expenses.js");

//test
test.describe
  .serial("Impact Builder Assignments - Page Elements @smoke", () => {
  test("Navigate to Impact To Expenses and validate elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const impactToExpenses = new ImpactToExpenses(page);
    await impactToExpenses.goto();

    const locatorNames = [
      "impactToExpensesHeader",
      "monthAverageColHdr",
      "withChangeColHdr",
      "personnelExpenseGraph",
      "expenseAsPercentOfGrossGraph",
      "personnelExpenseRowHdr",
      "expenseAsPrcntOfGross",
      "ExpenseGuideRowHdr",
    ];

    for (const locatorName of locatorNames) {
      await impactToExpenses.checkElementVisibility(locatorName);
    }
  });
});
