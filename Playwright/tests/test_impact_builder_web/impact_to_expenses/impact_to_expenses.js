// Impact Assignments

const { expect } = require("@playwright/test");

class ImpactToExpenses {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      // Impact to Expenses
      impactToExpensesHeader: () => this.page.getByText("Impact to Expenses"),
      monthAverageColHdr: () =>
        this.page.getByRole("columnheader", { name: "Month Average" }),
      withChangeColHdr: () =>
        this.page.getByRole("columnheader", { name: "With Change" }),
      personnelExpenseGraph: () => this.page.getByRole("img").nth(1),
      expenseAsPercentOfGrossGraph: () => this.page.getByRole("img").nth(2),
      personnelExpenseRowHdr: () =>
        this.page.getByRole("rowheader", { name: "Personnel Expense" }),
      expenseAsPrcntOfGross: () =>
        this.page.getByRole("rowheader", { name: "Expense as % of Gross" }),
      ExpenseGuideRowHdr: () =>
        this.page.getByRole("rowheader", { name: "Expense Guide" }),

      // impact analysis
      impactBuilderAnalysisHeader: () => this.page.getByText("Impact Analysis"),
      reasonTypeDropdown: () => this.page.locator('//*[@id="menu-"]/div[3]/ul'),
      addPayPlanBtn: () =>
        this.page.getByRole("button", { name: "Add A Pay Plan" }),
      assignEmployeeBtn: () =>
        this.page.getByRole("button", { name: "Assign Employee" }),
      configureBtn: () => this.page.getByRole("button", { name: "Configure" }),
      removeBtn: () => this.page.getByRole("button", { name: "Remove" }),

      // payplan assignments modal
      payPlanSearchBox: () => this.page.getByLabel("Search"),
      searchBtn: () => this.page.getByTestId("SearchIcon"),
      applyBtn: () => this.page.getByRole("button", { name: "Apply" }),
      payPlanIdColumn: () => this.page.getByText("Pay Plan ID"),
      employeeColumn: () => this.page.getByText("Employee"),
      employeeIdColumn: () => this.page.getByText("Employee ID"),
      nameColumn: () => this.page.getByText("Name"),
      jobColumn: () => this.page.getByText("Job"),
      companyColumn: () => this.page.getByText("Company"),
      departmentColumn: () => this.page.getByText("Department"),
      cancelBtn: () => this.page.getByRole("button", { name: "Cancel" }),
      payPlanGrid: () => this.page.locator('[data-test="kendo-data-grid"]'),

      // employe addignment modal
      employeeLookup: () => this.page.getByText("Employee Lookup"),
      substituteEmployeeFilter: () =>
        this.page.getByLabel("Substitute Employee"),
      prospectiveEmployeeFilter: () =>
        this.page.getByLabel("Prospective Employee"),
      selectBtn: () => this.page.getByRole("button", { name: "Select" }),
      empSearchBtn: () => this.page.getByLabel("Search"),
      empSearchIcon: () => this.page.getByTestId("SearchIcon"),
      empApplyBtn: () => this.page.getByRole("button", { name: "Apply" }),
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

  async selectOption(page, label, optionName) {
    await this.page.click(`[aria-label=${label}]`);
    await this.page.click(`[role=option][name=${optionName}]`);
  }

  async clearField(page, textLabel) {
    await this.page.click(`div:has-text("${textLabel}") >> aria-label=Clear`);
    await this.page.click("[role=button][name=Select]");
  }

  async fillField(page, label, fieldValue) {
    await this.page.click(`[aria-label="${label}"]`);
    await this.page.fill(`[aria-label="${label}"]`, fieldValue);
    await this.page.click("[role=button][name=Select]");
  }

  async editMeasure(page, oldName, newName, testName, testValue) {
    await this.page.click(
      `[role=row][name="${oldName} 0.00 0.00"] [data-testid=editOverride]`,
    );
    await this.page.click(`[role=cell][name="${oldName}"] [role=textbox]`);
    await this.page.fill(
      `[role=cell][name="${oldName}"] [role=textbox]`,
      newName,
    );
    await this.page.press(
      `[role=cell][name="${testName}"] [role=textbox]`,
      "Tab",
    );
    await this.page.fill(
      `[role=row][name="${testName}   0"] [role=textbox]:nth-child(2)`,
      testValue,
    );
    await this.page.fill(`[role=cell][name="0"][role=textbox]`, testValue);
    await this.page.click("[data-testid=saveMeasure]");
  }

  async deleteMeasure(page, rowName) {
    await this.page.click(`[role=row][name="${rowName}"] [aria-label=Delete]`);
  }

  async findGridRows(gridSelector) {
    await this.page.waitForSelector(gridSelector); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridSelector); // Get handles for all grid rows
    return gridRowHandles;
  }
}
module.exports = { ImpactToExpenses };
