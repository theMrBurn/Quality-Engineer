// Payplan Formula Block

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayPlanFormulaBlock } = require("./payplan_formula_block.js");

// user
test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe.serial("PayPlan /FormulaBlockock", () => {
  test("Navigate to /Payroll/formulablock and validate Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const payplanFormulaBlock = new PayPlanFormulaBlock(page);
    await payplanFormulaBlock.goto();

    await payplanFormulaBlock.getPayPlanHeader();
    await payplanFormulaBlock.getClearFiltersLink();
    await payplanFormulaBlock.getAddFormulaButton();

    // Click text=Add Formula - Modal will pop allowing remainder of element validation to occur
    await payplanFormulaBlock.clickAddFormulaButton();

    await payplanFormulaBlock.getBlockDetails();
    await payplanFormulaBlock.getEarningsCodeText();
    await payplanFormulaBlock.getPayTypeText();
    await payplanFormulaBlock.getBlockNameText();
    await payplanFormulaBlock.getBlockDescriptionText();
    await payplanFormulaBlock.getPaysheetDescriptionText();
    await payplanFormulaBlock.getCalculatePayPeriodType();
    await payplanFormulaBlock.getAdvancedFormulaEditor();
    await payplanFormulaBlock.getBlockExpression();
    await payplanFormulaBlock.getBlockDetailsCloseButton();

    //click to close modal
    await payplanFormulaBlock.clickBlockDetailsCloseButton();
  });
});
