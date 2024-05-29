// Impact Assignments

const { expect } = require("@playwright/test");

class ImpactAssignments {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    // Impact Assignments elements
    this.locators = {
      //reason type
      reasonTypeDropdown: () => this.page.getByLabel("Reason Type"),
      reasonTypeDropdownOpen: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Reason Type$/ })
          .getByLabel("Open"),
      reasonTypeDropdownClosed: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Reason Type$/ })
          .getByLabel("Closed"),

      //replacement type
      replacementEmployeeDropdown: () =>
        this.page.getByLabel("Replacement Employee"),
      replacementEmployeeDropdownOpen: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Replacement Employee$/ })
          .getByLabel("Open"),
      replacementEmployeeDropdownClosed: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Replacement Employee$/ })
          .getByLabel("Closed"),

      // First Menu option
      firstMenuOption: () => this.page.locator("#menu- div").first(),

      // Textbox Locators
      newAveragePayTextbox: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^New Average Pay$/ })
          .getByRole("textbox"),
      replacementAveragePayTextbox: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Replacement Average Pay$/ })
          .getByRole("textbox"),

      // Button Locators
      closeButton: () => this.page.getByRole("button", { name: "Close" }),
      replacementEmployeeCloseButton: () =>
        this.page
          .locator("div")
          .filter({ hasText: /^Replacement Employee$/ })
          .getByLabel("Close"),

      // Other Locators
      performanceImpact: () => this.page.getByText("Performance Impact"),
      addMeasure: () => this.page.getByTestId("addMeasure"),
      actionsFirst: () => this.page.getByText("Actions").first(),
      descriptionFirst: () => this.page.getByText("Description").first(),
      columnHeader: () =>
        this.page
          .locator(
            "div:nth-child(3) > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer > .MuiDataGrid-columnHeaderTitleContainerContent > .MuiDataGrid-columnHeaderTitle",
          )
          .first(),
      eightMonthAverage1: () => this.page.getByText("8 Month Average").nth(1),
      performanceObjectiveFirst: () =>
        this.page.getByText("Performance Objective").first(),
      commissionImpact: () => this.page.getByText("Commission Impact"),

      // Second Locators
      actionsSecond: () => this.page.getByText("Actions").nth(1),
      descriptionSecond: () => this.page.getByText("Description").nth(1),
      columHeaderSecond: () =>
        this.page.locator(
          "div:nth-child(2) > .MuiStack-root > .MuiBox-root > .MuiDataGrid-root > .MuiDataGrid-main > .MuiDataGrid-columnHeaders > .MuiDataGrid-columnHeadersInner > .css-k008qs > div:nth-child(3) > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer > .MuiDataGrid-columnHeaderTitleContainerContent > .MuiDataGrid-columnHeaderTitle",
        ),
      eightMonthAverage2: () => this.page.getByText("8 Month Average").nth(2),
      performanceObjectiveSecond: () =>
        this.page.getByText("Performance Objective").nth(1),

      // Third Locators
      bonusImpact: () => this.page.getByText("Bonus Impact"),
      actionsThird: () => this.page.getByText("Actions").nth(2),
      descriptionThird: () => this.page.getByText("Description").nth(2),
      columHeaderThird: () =>
        this.page.locator(
          "div:nth-child(3) > .MuiStack-root > .MuiBox-root > .MuiDataGrid-root > .MuiDataGrid-main > .MuiDataGrid-columnHeaders > .MuiDataGrid-columnHeadersInner > .css-k008qs > div:nth-child(3) > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer > .MuiDataGrid-columnHeaderTitleContainerContent > .MuiDataGrid-columnHeaderTitle",
        ),
      eightMonthAverage3: () => this.page.getByText("8 Month Average").nth(3),
      performanceObjectiveThird: () =>
        this.page.getByText("Performance Objective").nth(2),

      // Fourth Locators
      payoutImpact: () => this.page.getByText("Payout Impact"),
      descriptionFourth: () => this.page.getByText("Description").nth(3),
      columHeaderFourth: () =>
        this.page.locator(
          "div:nth-child(4) > .MuiStack-root > .MuiBox-root > .MuiDataGrid-root > .MuiDataGrid-main > .MuiDataGrid-columnHeaders > .MuiDataGrid-columnHeadersInner > .css-k008qs > div:nth-child(2) > .MuiDataGrid-columnHeaderDraggableContainer > .MuiDataGrid-columnHeaderTitleContainer > .MuiDataGrid-columnHeaderTitleContainerContent > .MuiDataGrid-columnHeaderTitle",
        ),
      eightMonthAverage4: () => this.page.getByText("8 Month Average").nth(4),
      performanceObjectiveFourth: () =>
        this.page.getByText("Performance Objective").nth(3),
      weight: () => this.page.getByText("Weight"),

      // add producitvity measures locators
      sourceSystemDropdown: () => this.page.getByLabel("Source System:"),
      sourceFieldDropdown: () => this.page.getByLabel("Source Field:"),
      employeeListDropdown: () =>
        this.page.getByRole("dialog").locator("#prodMeasureEmployeeList"),
      companyOptionalDropdown: () =>
        this.page.getByLabel("Company: (optional)"),
      fieldDescriptionRequiredInput: () =>
        this.page.getByLabel("Field Description (required"),
      selectButton: () => this.page.getByRole("button", { name: "Select" }),
      closeButton: () => this.page.getByRole("button", { name: "Close" }),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/");
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
module.exports = { ImpactAssignments };
