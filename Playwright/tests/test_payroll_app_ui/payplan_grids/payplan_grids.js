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
    this.rowSourceSystemText = page.locator("text=Row Source System >> nth=0");
    this.rowSourceSystemFieldText = page.locator(
      "text=Row Source System Field"
    );
    this.rowFieldDescriptionText = page.locator("text=Row Field Description");
    this.numberOfFieldsText = page.locator("text=Number of Rows");
    this.columnFormatText = page.locator("text=Column Format");
    this.columnSourceSystemText = page.locator(
      "text=Column Source System >> nth=0"
    );
    this.coulumnSourceSystemFieldText = page.locator(
      "text=Column Source System Field"
    );
    this.columnFieldDescriptionText = page.locator(
      "text=Column Field Description"
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

    // forms and grids

    this.gridsGrid = page.locator('#GridsGrid div:has-text("New Grid")');
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/Grids"
    );
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

  async getRowSourceSystemText() {
    await expect(
      this.rowSourceSystemText,
      "Row Source System Text not found"
    ).toBeVisible();
  }

  async getRowSourceSystemFieldText() {
    await expect(
      this.rowSourceSystemFieldText,
      "Row Source System Field Text not found"
    ).toBeVisible();
  }

  async getRowFieldDescriptionText() {
    await expect(
      this.rowFieldDescriptionText,
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

  async getColumnSourceSystemText() {
    await expect(
      this.columnSourceSystemText,
      "Column Source System Text not found"
    ).toBeVisible();
  }

  async getCoulumnSourceSystemFieldText() {
    await expect(
      this.coulumnSourceSystemFieldText,
      "Column Source System Text not found"
    ).toBeVisible();
  }

  async getColumnFieldDescriptionText() {
    await expect(
      this.columnFieldDescriptionText,
      "Column Field Description Text not found"
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

  // input elements and forms
  async inputFormulaBlockName(text) {
    await this.getFormulaBlockNameInput();
    await this.formulaBlockNameInput.fill(text);
  }

  async inputBlockDescriptionName(text) {
    await this.getBlockDescriptionNameInput();
    await this.blockDescriptionNameInput.fill(text);
  }

  async inputPaysheetDescriptionInput(text) {
    await this.getPaysheetDescriptionInput();
    await this.paysheetDescriptionInput.fill(text);
  }
}
module.exports = { PayPlanGrids };
