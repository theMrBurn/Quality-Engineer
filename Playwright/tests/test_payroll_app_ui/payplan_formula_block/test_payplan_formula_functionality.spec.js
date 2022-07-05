// Payplan Formula Block

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayPlanFormulaBlock } = require("./payplan_formula_block.js");

// user
test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe.serial("PayPlan /FormulaBlockock Functionality", () => {
  test("Navigate to /Payroll/formulablock and validate Basic Smoke check for attempting to add a new PayPlan Block", async ({
    browser,
    page,
  }) => {
    const payplanFormulaBlock = new PayPlanFormulaBlock(page);
    await payplanFormulaBlock.goto();

    // basic Crud for Add Formula Block, save, edit, delete -- Edit Button Challenges, no full CRUD at this time
    await payplanFormulaBlock.clickAddFormulaButton();

    // add Earnings Code "Base (BSE)"
    await payplanFormulaBlock.clickEarningsCodeBlockNameDropdown();
    await page.locator("#EarningCodeList_listbox >> text=Base (BSE)").click();

    // add Earnings Code Pay Type "Base (BSE)"
    await payplanFormulaBlock.clickEarningsCodeBlockNamePayTypeDropdown();
    await page.locator("#BlockPayTypeList_listbox >> text=Base (BSE)").click();

    // input block name, block description, and Paysheet Description
    await payplanFormulaBlock.inputFormulaBlockName("QA Test");
    await payplanFormulaBlock.inputBlockDescriptionName("QA Test");
    await payplanFormulaBlock.inputPaysheetDescriptionInput("test test test");

    // choose Calculate on Pay Period type dropdown
    await payplanFormulaBlock.clickCalculateOnPayPeriodTypeDropdown();
    await page.locator("text=Current Month Total").click();

    // since we cant full CRUD at the moment, click Validate, get error message and cancel Template build
    if (await payplanFormulaBlock.clickValidateButton()) {
      const divError = page.locator("divErrorText");
      expect(divError).toBeVisible;
      await clickCloseModalButton();
    }
  });
});
