// this POM is for /Payroll/Adjustment
const { expect } = require("@playwright/test");

class PayPlanGrids {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.payplanGridsHeader = page.locator(
      'h2:has-text("Grid Plan Templates")'
    );
    this.newGridsHeader = page.locator("text=Grid values for new grid");

    // unique page text
    this.gridNameText = page.locator("text=Grid Name");
    this.gridTableName = page.locator('a:has-text("Name")');
    this.gridTableDescription = page.locator('a:has-text("Description")');
    this.rowFormatText = page.locator("text=Row Format");
    this.rowSourceEquationText = page.locator("text=Row Source Equation");
    this.fieldDescriptionText = page.locator("text=Description");
    this.numberOfFieldsText = page.locator("text=Number of Rows");
    this.columnFormatText = page.locator("text=Column Format");
    this.columnSourceEquationText = page.locator(
      "text=Column Source Equation >> nth=0"
    );
    this.numberOfColumnsText = page.locator("text=Number of Columns");
    this.bodyFormatText = page.locator("text=Body Format");

    // buttons and Dropdowns
    this.addGrid = page.locator("text=Add Grid");
    this.clearFilters = page.locator("text=Clear Filters");
    this.blockDetailsClose = page.locator(
      'text=Block DetailsClose >> button[role="button"]'
    );
    this.closeModalButton = page.locator(
      'text=Block DetailsClose >> button[role="button"]'
    );
    this.gridsListInput = page.locator('input[name="GridsList_input"]');
    this.gridsDropdownTriangle = page.locator(".k-select").first();
    this.newGridButton = page.locator("text=New Grid");
    this.generateGridButton = page.locator("text=Generate");
    this.updateGridButton = page.locator(
      "#GridsGrid > table > tbody > tr.k-grid-edit-row > td.k-command-cell.k-command-cell.k-command-cell.k-command-cell.k-command-cell > a.k-button.k-button-icontext.k-primary.k-grid-update"
    );
    this.equationDoneButton = page.locator(
      '[data-testid="equationBuilderDone"]'
    );

    // forms and grids

    this.gridsGrid = page.locator('#GridsGrid div:has-text("New Grid")');

    // CRUD specific locators

    this.gridTemplateName = page.locator('input[name="Name"]');
    this.gridTemplateDescription = page.locator(
      'input[name="LongDescription"]'
    );
    this.numberOfRowsInput = page.locator('input[role="spinbutton"] >> nth=0');
    this.numberOfColumnsInput = page.locator(
      'input[role="spinbutton"] >> nth=2'
    );
    this.rowFormatDropdown = page.locator(
      'text=Row Format amt >> [aria-label="select"] span'
    );
    this.columnFormatDropdown = page.locator(
      'text=Column Format amt >> [aria-label="select"] span'
    );

    this.bodyFormatDropdown = page.locator(
      'text=Body Format amt >> [aria-label="select"] span'
    );

    this.editRowSourceEquation = page.locator(
      'text=Row Source Equation Edit >> [data-testid="editRowSourceEquation"]'
    );

    this.equationBuilderGroupElement = page.locator(
      '[data-testid="equationBuilderGroupElement"]'
    );

    this.editColumnSourceEquation = page.locator(
      'text=Column Source Equation Edit >> [data-testid="editRowSourceEquation"]'
    );
    this.editQATestButton = page.locator(
      'a[role="button"]:has-text("Edit") >> nth=3'
    );
    this.deleteQATestButton = page.locator(
      '//*[@id="GridsGrid"]/table/tbody/tr/td[4]/a[2]'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/PayPlan/Grids");
  }

  // get page elements

  async getPayplanGridsHeader() {
    await expect(
      this.payplanGridsHeader,
      "PayPlan Formula header not found"
    ).toBeVisible();
  }

  async getClearFiltersLink() {
    await expect(
      this.clearFilters,
      "Clear Filters Link not found"
    ).toBeVisible();
  }

  async getAddGridsGridHeader() {
    await expect(this.gridsGrid, "Grids Grid header not found").toBeVisible();
  }

  async getGridNameDropodownTriangle() {
    await expect(
      this.gridsDropdownTriangle,
      "Grid Name dropdown not found"
    ).toBeVisible();
  }

  async getNewGridButton() {
    await expect(this.newGridButton, "New Grid Button not Found").toBeVisible();
  }

  async getGridTableNameText() {
    await expect(
      this.gridTableName,
      "grid table 'Name' not found"
    ).toBeVisible();
  }

  async getGridTableDescriptionText() {
    await expect(
      this.gridTableDescription,
      "grid table 'Description' not found"
    ).toBeVisible();
  }

  async getNewGridsHeaderText() {
    await expect(
      this.newGridsHeader,
      "new Grids Header not found after new Grids Button clicked"
    ).toBeVisible;
  }

  async getRowFormatText() {
    await expect(
      this.rowFormatText,
      "Row Format text is not found"
    ).toBeVisible();
  }

  async getRowSourceEquationText() {
    await expect(
      this.rowSourceEquationText,
      "Row Source Equation Text not found"
    ).toBeVisible();
  }

  async getColumnSourceEquationText() {
    await expect(
      this.columnSourceEquationText,
      "Column Source Equation Text not found"
    ).toBeVisible();
  }

  async getFieldDescriptionText() {
    await expect(
      this.fieldDescriptionText,
      "Row Field Description Text not found"
    ).toBeVisible();
  }

  async getNumberOfFieldsText() {
    await expect(
      this.numberOfFieldsText,
      "Number of Fields Text not found"
    ).toBeVisible();
  }

  async getColumnFormatText() {
    await expect(
      this.columnFormatText,
      "Column Format Text not found"
    ).toBeVisible();
  }

  async getNumberOfColmunsText() {
    await expect(
      this.numberOfColumnsText,
      "Number of Columns Text not found"
    ).toBeVisible();
  }

  async getBodyFormatText() {
    await expect(
      this.bodyFormatText,
      "Body Format Text not found"
    ).toBeVisible();
  }

  async getGenerateGridButton() {
    await expect(
      this.generateGridButton,
      "Generate grid Button not found"
    ).toBeVisible();
  }

  async getUpdateGridButton() {
    await expect(
      this.updateGridButton,
      "Update Grid button not found"
    ).toBeVisible();
  }

  async getGridTemplateNameInput() {
    await expect(
      this.gridTemplateName,
      "Grid Template Name input box not found"
    ).toBeVisible();
  }

  async getGridTemplateDescriptionInput() {
    await expect(
      this.gridTemplateDescription,
      "Grid Template Description input box not found"
    ).toBeVisible();
  }

  async getNumberOfRowsInput() {
    await expect(
      this.numberOfRowsInput,
      "Number of Rows input not found"
    ).toBeVisible();
  }

  async getNumberOfColumnsInput() {
    await expect(
      this.numberOfColumnsInput,
      "Number of Columns input not found"
    ).toBeVisible();
  }

  async getRowFormatDropdown() {
    await expect(
      this.rowFormatDropdown,
      "Row Format dropdown options not found"
    ).toBeVisible();
  }

  async getColumnFormatDropdown() {
    await expect(
      this.columnFormatDropdown,
      "Column Format dropdown options not found"
    ).toBeVisible();
  }

  async getBodyFormatDropdown() {
    await expect(
      this.bodyFormatDropdown,
      "Body Format Dropdown options not found"
    ).toBeVisible();
  }

  async getEditRowSourceEquation() {
    await expect(
      this.editRowSourceEquation,
      "Edit Row source Equation link not found"
    ).toBeVisible();
  }

  async getEditColumnSourceEquation() {
    await expect(
      this.editColumnSourceEquation,
      "Edit Column source Equation link not found"
    ).toBeVisible();
  }

  async getEquationBuilderGroupElement() {
    await expect(
      this.equationBuilderGroupElement,
      "Element not found"
    ).toBeVisible();
  }

  async getEquationDoneButton() {
    await expect(
      this.equationDoneButton,
      "Done button not found"
    ).toBeVisible();
  }

  async getQAEditButton() {
    await expect(this.editQATestButton).toBeVisible();
  }

  async getDeleteQATestButton() {
    await expect(this.deleteQATestButton).toBeVisible();
  }

  // interact with elements

  async clickGridsDropdownTriangle() {
    await this.getGridNameDropodownTriangle();
    await this.gridsDropdownTriangle.click();
  }

  async clickAddGridsButton() {
    await this.getNewGridButton();
    await this.newGridButton.click();
  }

  async clickAddFormulaButton() {
    await this.getAddFormulaButton();
    await this.addFormula.click();
  }

  async clickClearFiltersButton() {
    await this.getClearFiltersLink();
    await this.clearFilters.click();
  }

  async clickGenerateGridButton() {
    await this.getGenerateGridButton();
    await this.generateGridButton.click();
  }

  async clickUpdateGridButton() {
    await this.getUpdateGridButton();
    await this.updateGridButton.click();
  }

  async clickRowFormatDropdown() {
    await this.getRowFormatDropdown();
    await this.rowFormatDropdown.click();
  }

  async clickColumnFormatDropdown() {
    await this.getColumnFormatDropdown();
    await this.columnFormatDropdown.click();
  }

  async clickBodyFormatDropdown() {
    await this.getBodyFormatDropdown();
    await this.bodyFormatDropdown.click();
  }

  async clickEditRowSourceEquation() {
    await this.getEditRowSourceEquation();
    await this.editRowSourceEquation.click();
  }

  async clickEditColumnSourceEquation() {
    await this.getEditColumnSourceEquation();
    await this.editColumnSourceEquation.click();
  }

  async clickEquationDoneButton() {
    await this.getEquationDoneButton();
    await this.equationDoneButton.click();
  }

  async clickQAEditButton() {
    await this.getQAEditButton();
    await this.editQATestButton.click();
  }

  async clickDeleteQATestButton() {
    // Click [aria-label="select"] >> nth=0
    await this.page.locator('[aria-label="select"]').first().click();
    // Click li[role="option"]:has-text("QA Test Playwright")
    await this.page
      .locator('li[role="option"]:has-text("QA Test Playwright")')
      .click();
    // Click text=Delete
    this.page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.locator("text=Delete").click();
    // Click text=Clear Filters
    await this.page.locator("text=Clear Filters").click();
  }

  // input elements and forms
  async inputFormulaBlockName(text) {
    await this.getFormulaBlockNameInput();
    await this.formulaBlockNameInput.fill(text);
  }

  async inputGridTemplateName(text) {
    await this.getGridTemplateNameInput();
    await this.gridTemplateName.fill(text);
  }

  async inputGridTemplateDescription(text) {
    await this.getGridTemplateDescriptionInput();
    await this.gridTemplateDescription.fill(text);
  }

  async inputNumberOfRows(text) {
    await this.getNumberOfRowsInput();
    await this.numberOfRowsInput.fill(text);
  }

  async inputNumberOfColumns(text) {
    await this.getNumberOfColumnsInput();
    await this.numberOfColumnsInput.fill(text);
  }

  //page grab and move POs (manual page object method, in the event built in drag and drop does not work)
  // async dragDropEquationElement(dropElemenet) {
  //   const src = await this.page.$(dropElemenet); //'[data-testid="equationBuilderGroupElement"]'
  //   const dst = await this.page.$("#nested-elements"); //"#nested-elements"

  //   if (src && dst) {
  //     const srcBound = await src.boundingBox();
  //     const dstBound = await dst.boundingBox();
  //     if (srcBound && dstBound) {
  //       await this.page.mouse.move(
  //         srcBound.x + srcBound.width / 2,
  //         srcBound.y + srcBound.height / 2
  //       );
  //       await this.page.mouse.down();
  //       await this.page.mouse.move(
  //         dstBound.x + dstBound.width / 2,
  //         dstBound.y + dstBound.height / 2
  //       );
  //       await page.mouse.up();
  //     } else {
  //       throw new Error("No Element to Drag and Drop");
  //     }
  //   }
  // }
}
module.exports = { PayPlanGrids };
