// this POM is for /Impact Builder

const { expect } = require("@playwright/test");

class ImpactAnalysisPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// Impact Analysis page elements
    this.locators = {
      impactBuilderAnalysisHeader: () => this.page.getByText("Impact Analysis"),

      analysisConfigHeader: () => this.page.getByText("Analysis Configuration"),
      impactServiceAdvisorExpenseHeader: () =>
        this.page.getByText("Impact to Service Advisor Expenses"),
      payplanAssignmentsHeader: () =>
        this.page.getByText("Pay Plan Assignments"),
      employeeAndImpactHeader: () =>
        this.page.getByText("Employee and Impact Information"),

      // Analysis Config Module
      companyInput: () => this.page.getByLabel("Company"),
      expenseTypeInput: () =>
        this.page
          .locator('[data-test="ib-list-container"]')
          .getByLabel("Expense Type"),
      primaryAverageInput: () => this.page.getByLabel("Primary Average"),
      secondaryAverageInput: () => this.page.getByLabel("Secondary Average"),
      closingMonthCalendar: () =>
        this.page.getByLabel("Choose date, selected date is"),
      applyButton: () => this.page.getByRole("button", { name: "Apply" }),

      // Impact to Service Advisor Expenses
      graphPanelFull: () =>
        this.page.locator('[data-test="ib-list-container"]'),
      personalExpenseGraph: () => this.page.getByRole("img").nth(1),
      expensePercentofGrossGraph: () => this.page.getByRole("img").nth(2),
      personalExpense3MoAv: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/div/table/tbody/tr[1]/td[1]',
        ),
      personalExpensePercentOfGross3MoAv: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/div/table/tbody/tr[2]/td[1]',
        ),
      expenseGuide3MoAv: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/div/table/tbody/tr[3]/td[1]',
        ),
      personalExpenseWithChange: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/div/table/tbody/tr[1]/td[2]',
        ),
      personalExpensePercentOfGrossWithChange: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/div/table/tbody/tr[2]/td[2]',
        ),
      expenseGuideWithChange: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/div/table/tbody/tr[3]/td[2]',
        ),

      // Pay Plan Assignments
      roleAssignmentsColumn: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Role Assignments$/ })
          .first(),

      // Employee and Impact Information
      roleAssignmentsColumn: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Role Assignments$/ })
          .first(),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/Reports/28");
    await this.page.waitForLoadState("load");
  }

  // get page elements

  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridElement); // Get handles for all grid rows

    // Check if any grid rows are found
    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      // Ensure the element is attached to the DOM
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      // Add an extra wait for the element to be visible. Adjust time as needed.
      await this.page.waitForTimeout(1000);

      // Click on the first grid row
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");

      // Wait for any possible navigation to complete
      await this.page.waitForLoadState("networkidle");
    } else {
      console.log("No grid rows found.");
    }
  }

  /// interact with elements

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async findGridRows(gridSelector) {
    await this.page.waitForSelector(gridSelector); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridSelector); // Get handles for all grid rows
    return gridRowHandles;
  }
}
module.exports = { ImpactAnalysisPage };
