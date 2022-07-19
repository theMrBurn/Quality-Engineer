// Payplan Template

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayplanTemplate } = require("./payplan_template.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payplan Template", () => {
  test("Navigate to Payplan Template and validate expected Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const payplanTemplate = new PayplanTemplate(page);
    await payplanTemplate.goto();

    // page text and dropdowns
    await payplanTemplate.getJobText();
    await payplanTemplate.getJobInput();
    await payplanTemplate.getDepartmentText();
    await payplanTemplate.getDepartmentInput();
    await payplanTemplate.getStateText();
    await payplanTemplate.getStateInput();
    await payplanTemplate.getPositionTypeText();
    await payplanTemplate.getPositionTypeDropdown();
    await payplanTemplate.getPayPlanTypeText();
    await payplanTemplate.getPlanTypeDropdown();
    await payplanTemplate.getTemplateNameText();
    await payplanTemplate.getTemplateNameDropdown();
    await payplanTemplate.getPayRateTypeText();
    await payplanTemplate.getPayRateTypeDropdown();

    // grid items
    await payplanTemplate.getGridPlanID();
    await payplanTemplate.getGridTemplateNameColumn();
    await payplanTemplate.getGridJobColumn();
    await payplanTemplate.getGridEmpStatusColumn();
    await payplanTemplate.getGridDepartmentColumn();
    await payplanTemplate.getGridStateColumn();
    await payplanTemplate.getGridPositionTypeColumn();
    await payplanTemplate.getGridPlanTypesColumn();
    await payplanTemplate.getGridPayRateTypeColumn();
    await payplanTemplate.getGridPortableColumn();
    await payplanTemplate.getGridUpdatedByColumn();
    await payplanTemplate.getGridUpdatedOnColumn();

    // buttons
    await payplanTemplate.getAddTemplateButton();
    await payplanTemplate.getClearFiltersButton();
    // await payplanTemplate.getEditButton(); // edit seems to be tied directly to a db value, need data test tags
    // await payplanTemplate.getDeleteButton(); // delete seems to be tied directly to a db value, need data test tags
  });
});
