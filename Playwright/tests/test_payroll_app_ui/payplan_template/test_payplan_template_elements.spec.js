// Payplan Template

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependencies
const { test, expect } = require("@playwright/test");
const { PayplanTemplate } = require("./payplan_template.js");

// test suite
test.describe.serial("Payplan Template", () => {
  test("Navigate to Payplan Template and validate expected Page elements have loaded @smoke", async ({
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    try {
      // list of locator names to check
      const locatorNames = [
        // page text and dropdowns
        "jobText",
        "jobInput",
        "departmentText",
        "departmentInput",
        "stateText",
        "stateInput",
        "positionTypeText",
        "positionTypeDropdown",
        "payplanTypeText",
        "planTypeDropdown",
        "templateNameText",
        "templateNameDropdown",
        "payRateTypeText",
        "payRateTypeDropdown",

        // grid items
        "gridPayPlanIDColumn",
        "gridTemplateNameColumn",
        "gridJobColumn",
        "gridEmpStatusColumn",
        "gridDepartmentColumn",
        "gridStateColumn",
        "gridPositionTypeColumn",
        "gridPlanTypesColumn",
        "gridPayRateTypeColumn",
        "gridPortableColumn",
        "gridUpdatedByColumn",
        "gridUpdatedOnColumn",

        // buttons
        "addTemplateButton",
        "clearFiltersButton",
        // "editButton", // commented out because tied to DB values or test tags
        // "deleteButton",
      ];

      for (const locatorName of locatorNames) {
        await payplanTemplate.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
