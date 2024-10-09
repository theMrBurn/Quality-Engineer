// Impact Builder Analysis Portal

// POMs have to live in the same directory as the test, for now
// we will parameterize the storageState with other .json for each userLogin, if necessary

// Dependencies
const { test, expect } = require("@playwright/test");
const { ImpactToExpenses } = require("./impact_to_expenses.js");

// Test
test.describe
  .serial("Impact Builder Assignments - Page Elements @smoke", () => {
  let page;
  let impactToExpenses;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    impactToExpenses = new ImpactToExpenses(page);
    await impactToExpenses.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Impact To Expenses and validate elements have loaded as expected", async () => {
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
