const { expect } = require("@playwright/test");

class PayplanTemplate {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators grouped in an object with functions
    this.locators = {
      // headers
      payplanTemplateHeader: () => this.page.locator("text=Pay Plan Templates"),
      editTemplatePageHeader: () =>
        this.page.locator("text=Edit Pay Plan Template"),

      // page elements
      footerNameText: () => this.page.locator('label:has-text("Footer Name")'),
      jobText: () => this.page.locator('label:has-text("Job")'),
      departmentText: () => this.page.locator('label:has-text("Department")'),
      stateText: () => this.page.locator('label:has-text("State")'),
      positionTypeText: () => this.page.locator("text=Position Type"),
      payplanTypeText: () => this.page.locator('label:has-text("Plan Type")'),
      templateNameText: () =>
        this.page.locator('label:has-text("Template Name")'),
      payRateTypeText: () =>
        this.page.locator('label:has-text("Pay Rate Type")'),

      // grid elements
      gridAddTemplateElement: () =>
        this.page.locator('#grid div:has-text("Add Template")'),
      gridPayPlanIDColumn: () => this.page.locator("text=Plan Id"),
      gridTemplateNameColumn: () =>
        this.page.locator('a:has-text("Template Name")'),
      gridJobColumn: () => this.page.locator("text=Job >> nth=3"),
      gridEmpStatusColumn: () => this.page.locator("text=Emp. Status >> nth=1"),
      gridDepartmentColumn: () => this.page.locator("text=Department >> nth=2"),
      gridStateColumn: () => this.page.locator('a:has-text("State")'),
      gridPositionTypeColumn: () => this.page.locator("text=Postion Type"),
      gridPlanTypesColumn: () => this.page.locator("text=Plan Types"),
      gridPayRateTypeColumn: () =>
        this.page.locator('a:has-text("Pay Rate Type")'),
      gridPortableColumn: () => this.page.locator("text=Proratable"),
      gridUpdatedByColumn: () => this.page.locator("text=Updated By"),
      gridUpdatedOnColumn: () => this.page.locator("text=Updated On"),

      // page alerts
      saveConfirmationAlert: () => this.page.locator("#divSuccessHolder"),

      // buttons
      addTemplateButton: () => this.page.locator("text=Add Template"),
      clearFiltersButton: () => this.page.locator("text=Clear Filters"),
      editButton: () => this.page.locator("text=Edit"),
      saveButton: () => this.page.locator("text=Save"),
      deleteButton: () => this.page.locator("text=Delete"),
      backButton: () => this.page.locator("text=Back"),
      deleteInput: () => this.page.getByTitle("delete"),

      // inputs
      jobInput: () =>
        this.page.locator('input[aria-describedby="JobList_taglist"]'),
      departmentInput: () =>
        this.page.locator('input[aria-describedby="DepartmentList_taglist"]'),
      stateInput: () =>
        this.page.locator('input[aria-describedby="StateList_taglist"]'),

      // position type
      positionTypeDropdown: () =>
        this.page.locator('input[name="PositionTypeList_input"]'),
      positionTypeTriangle: () =>
        this.page.locator('[aria-label="select"] >> nth=0'),
      positionTypeDelete: () => this.page.getByRole("button", { name: "" }),

      // plan type
      planTypeDropdown: () =>
        this.page.locator('input[name="PlanTypeList_input"]'),
      planTypeDropdownTriangle: () =>
        this.page.locator('[aria-label="select"]').nth(1),
      planTypeDelete: () =>
        this.page.locator(
          ".k-dropdown-wrap.k-state-default.k-state-focused .k-icon.k-clear-value",
        ),

      // template name
      templateNameDropdown: () =>
        this.page.locator('input[name="NameList_input"]'),
      templateNameDelete: () =>
        this.page
          .locator(
            ".k-dropdown-wrap.k-state-default.k-state-focused .k-icon.k-clear-value",
          )
          .nth(1),

      // pay rate type
      payRateTypeDropdown: () =>
        this.page.locator('input[name="PayRateTypeList_input"]'),
      payRateTypeDropdownTriangle: () =>
        this.page.locator('[aria-label="select"]').nth(3),
      payRateTypeDelete: () =>
        this.page
          .locator(
            ".k-dropdown-wrap.k-state-default.k-state-focused .k-icon.k-clear-value",
          )
          .nth(2),
    };
  }

  // Navigation
  async goto() {
    await this.page.goto("/PayPlan/PayPlanTemplate");
    await this.page.waitForLoadState("networkidle");
  }

  // Common test methods

  /**
   * Clicks the first element matching the grid selector provided.
   * @param {string} gridElement - selector string for grid rows
   */
  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement);
    const gridRowHandles = await this.page.$$(gridElement);

    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

  /**
   * Checks visibility of the element by locator name
   * @param {string} locatorName
   */
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    if (!locatorFunction)
      throw new Error(`Locator '${locatorName}' not found in locators object.`);

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      throw new Error(
        `Locator '${locatorName}' failed: ${originalError.message}`,
      );
    }
  }

  /**
   * Fills form fields using the testData object where key matches locator name and value is the text to input
   * @param {Object} testData
   */
  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (!locatorFunction) {
        console.warn(`Locator not found for key: ${key}`);
        continue;
      }
      try {
        await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } catch (originalError) {
        throw new Error(
          `Filling the form field with locator '${key}' failed: ${originalError.message}`,
        );
      }
    }
  }
}

module.exports = { PayplanTemplate };
