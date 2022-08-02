// Payplan Formula Block

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayPlanGrids } = require("./payplan_grids.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("PayPlan /Grids", () => {
  test.fixme(
    "skip Grid Plans tests - these fail wile Feature Flag is on and dev incomplete - will be fixed by branch: AllPay/payplan-grids-Equation-builder"
  );
  test("Navigate to /Payplan/Grids and validate Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const payplanGrids = new PayPlanGrids(page);
    await payplanGrids.goto();

    await payplanGrids.getPayplanGridsHeader();
    await payplanGrids.getClearFiltersLink();
    await payplanGrids.getAddGridsGridHeader();
    await payplanGrids.getNewGridButton();
    await payplanGrids.getGridTableNameText();
    await payplanGrids.getGridTableDescriptionText();

    // Click text=Add Grid - Modal will pop allowing remainder of element validation to occur
    await payplanGrids.clickAddGridsButton();

    await payplanGrids.getNewGridsHeaderText();
    await payplanGrids.getRowFormatText();
    await payplanGrids.getRowSourceSystemText();
    await payplanGrids.getRowSourceSystemFieldText();
    await payplanGrids.getRowFieldDescriptionText();
    await payplanGrids.getNumberOfFieldsText();
    await payplanGrids.getColumnFormatText();
    await payplanGrids.getColumnSourceSystemText();
    await payplanGrids.getCoulumnSourceSystemFieldText();
    await payplanGrids.getColumnFieldDescriptionText();
    await payplanGrids.getNumberOfColmunsText();
    await payplanGrids.getBodyFormatText();
    await payplanGrids.getGenerateGridButton();

    //click to clear filter
    await payplanGrids.clickClearFiltersButton();
  });
});
