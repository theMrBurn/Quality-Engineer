// Payplan Grids

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayPlanGrids } = require("../payplan_grids/payplan_grids.js");

//test
test.describe
  .serial("PayPlan /Grids - New Pay Plan Template CRUD E2E @e2e", () => {
  test.fixme(
    "Unable to complete FUll Crud - locator.click: Target closed / waiting for selector text=Delete >> nth=3 "
  );

  test("Navigate to /Payplan/Grids and CRUD adding new Grid Template", async ({
    browser,
    page,
  }) => {
    const payplanGrids = new PayPlanGrids(page);
    await payplanGrids.goto();

    // add QA TEST grid
    // Click text=Add Grid - Modal will pop allowing remainder of element validation to occur
    await payplanGrids.clickAddGridsButton();

    // Fill input[name="Name"]
    await page.locator('input[name="Name"]').fill("QA Test Automation");

    // Fill input[name="Description"]
    await page.locator('input[name="LongDescription"]').fill("test test test");

    if (await page.locator("text=Update").click()) {
      const sourceSystemWarning = page.locator(
        "text=Row Source System is required."
      );
      expect(sourceSystemWarning).toBeVisible;
    }

    //clear source system field requirement warning
    await page.locator('#divErrorHolder img[alt="Hide"]').click();

    await payplanGrids.inputGridTemplateName("QA Test Playwright");

    await payplanGrids.inputGridTemplateDescription("test test test");

    await payplanGrids.inputNumberOfRows("3");

    await payplanGrids.inputNumberOfColumns("3");

    await payplanGrids.clickRowFormatDropdown();
    await page
      .locator("#RowFieldDataFormatTypeList_listbox >> text=amt")
      .click();

    const rowFormat = page.locator(
      "#RowFieldDataFormatTypeList_listbox >> text=amt"
    );
    expect(rowFormat).toHaveText("amt");

    await payplanGrids.clickColumnFormatDropdown();
    await page
      .locator("#ColumnFieldDataFormatTypeList_listbox >> text=pct")
      .click();

    const columnFormat = page.locator(
      "#ColumnFieldDataFormatTypeList_listbox >> text=pct"
    );
    expect(columnFormat).toHaveText("pct");

    await payplanGrids.clickBodyFormatDropdown();
    await page.locator("#BodyDataFormatTypeList_listbox >> text=amt").click();

    const bodyFormat = page.locator(
      "#BodyDataFormatTypeList_listbox >> text=pct"
    );
    expect(bodyFormat).toHaveText("pct");

    await payplanGrids.clickEditRowSourceEquation();

    await page.locator("#nested-elements").isVisible();

    await page.locator(".equation-builder-section").first().isVisible();

    await page.locator("text=Group").isVisible();

    // add value / operator / value and fill out the necessary info during each step
    const group = '[data-testid="equationBuilderGroupElement"]';
    const source = '[data-testid="equationBuilderSourceElement"]';
    const value = '[data-testid="equationBuilderValueElement"]';
    const operator = '[data-testid="equationBuilderOperatorElement"]';
    const viewer = "#nested-elements";

    // add Value and update value 1
    await page.dragAndDrop(value, viewer);
    await page.locator(value).isVisible();
    await page
      .locator('//*[@id="equation-value-config"]/span/span/input[1]')
      .click();
    await page.locator('[data-testid="equationBuilderValueTextBox"]').fill("1");
    await page
      .locator('[data-testid="equationBuilderValueTextBox"]')
      .press("Enter");
    await page.locator('[data-testid="equationBuilderUpdateValue"]').click();

    // add Operator, choose 'Add' and Update
    await page.dragAndDrop(operator, viewer);
    await page.locator(operator).isVisible();
    await page.locator('//*[@id="equation-operator-config"]/label[2]').click();
    await page.locator('[data-testid="equationBuilderUpdateOperator"]').click();

    // add Value again to complete acceptable formula
    await page.dragAndDrop(value, viewer);
    await page.locator(value).isVisible();
    await page
      .locator('//*[@id="equation-value-config"]/span/span/input[1]')
      .click();
    await page.locator('[data-testid="equationBuilderValueTextBox"]').fill("2");
    await page
      .locator('[data-testid="equationBuilderValueTextBox"]')
      .press("Enter");
    await page.locator('[data-testid="equationBuilderUpdateValue"]').click();

    await payplanGrids.clickEquationDoneButton();

    // click Edit Column Source Equation, and repeat same steps as Edit Row

    await payplanGrids.clickEditColumnSourceEquation();

    await page.dragAndDrop(value, viewer);
    await page.locator(value).isVisible();
    await page
      .locator('//*[@id="equation-value-config"]/span/span/input[1]')
      .click();
    await page.locator('[data-testid="equationBuilderValueTextBox"]').fill("1");
    await page
      .locator('[data-testid="equationBuilderValueTextBox"]')
      .press("Enter");
    await page.locator('[data-testid="equationBuilderUpdateValue"]').click();

    // add Operator, choose 'Add' and Update
    await page.dragAndDrop(operator, viewer);
    await page.locator(operator).isVisible();
    await page.locator('//*[@id="equation-operator-config"]/label[2]').click();
    await page.locator('[data-testid="equationBuilderUpdateOperator"]').click();

    // add Value again to complete acceptable formula
    await page.dragAndDrop(value, viewer);
    await page.locator(value).isVisible();
    await page
      .locator('//*[@id="equation-value-config"]/span/span/input[1]')
      .click();
    await page.locator('[data-testid="equationBuilderValueTextBox"]').fill("2");
    await page
      .locator('[data-testid="equationBuilderValueTextBox"]')
      .press("Enter");
    await page.locator('[data-testid="equationBuilderUpdateValue"]').click();

    // click Done and validate formula is present on Grid
    await payplanGrids.clickEquationDoneButton();

    await payplanGrids.clickGenerateGridButton();
    // validate elements are now present in Equation Viewer

    // fill grid column values
    await page.locator("tr:nth-child(2) > .fieldValue > input").fill("1");
    await page.locator("tr:nth-child(3) > .fieldValue > input").fill("2");
    await page.locator("tr:nth-child(4) > .fieldValue > input").fill("3");

    //fill grid row values
    await page.locator(".fieldValue > input").first().fill("1.5");
    await page
      .locator("#MatrixTable > tbody > tr > td:nth-child(3) > input")
      .first()
      .fill("2");
    await page.locator("td:nth-child(4) > input").first().fill("2.5");

    //fill interior grid values
    await page.locator("tr:nth-child(2) > td:nth-child(2) > input").fill("9");
    await page.locator("tr:nth-child(2) > td:nth-child(3) > input").fill("8");
    await page.locator("tr:nth-child(2) > td:nth-child(4) > input").fill("7");
    await page.locator("tr:nth-child(3) > td:nth-child(2) > input").fill("6");
    await page.locator("tr:nth-child(3) > td:nth-child(3) > input").fill("5");
    await page.locator("tr:nth-child(3) > td:nth-child(4) > input").fill("4");
    await page.locator("tr:nth-child(4) > td:nth-child(2) > input").fill("3");
    await page.locator("tr:nth-child(4) > td:nth-child(3) > input").fill("2");
    await page.locator("tr:nth-child(4) > td:nth-child(4) > input").fill("1");

    await payplanGrids.clickUpdateGridButton();

    // save successful, time to delete and validate delete was successful

    await payplanGrids.clickDeleteQATestButton();

    await payplanGrids.clickClearFiltersButton();

    await page.locator("text=QA TEST Playwright").not.toBeVisible();
  });
});
