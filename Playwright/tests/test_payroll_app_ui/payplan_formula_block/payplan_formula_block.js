// this POM is for /Payroll/Adjustment
const { expect } = require("@playwright/test");

class PayPlanFormulaBlock {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.PayPlanFormulaBlockHeader = page.locator(
      'h2:has-text("Formula Block Templates")'
    );

    // unique page text
    this.blockDetails = page.locator("text=Block Details");
    this.earningsCodeText = page.locator("text=Earnings Code");
    this.payTypeText = page.locator("text=Pay Type");
    this.blockNameText = page.locator("text=Block Name");
    this.blockDescriptionText = page.locator("text=Block Description");
    this.paysheetDescriptionText = page.locator("text=Paysheet Description");
    this.calculatePayPeriodType = page.locator(
      "text=Calculate on pay period type"
    );
    this.advancedFormulaEditor = page.locator("text=Advanced Formula Editor");
    this.blockExpression = page.locator("text=Block Expression");

    // buttons
    this.addFormula = page.locator("text=Add Formula");
    this.clearFilters = page.locator("text=Clear Filters");
    this.blockDetailsClose = page.locator(
      'text=Block DetailsClose >> button[role="button"]'
    );
    this.calculateOnPayPeriodType = page.locator(
      'text=Block Description Paysheet Description Calculate on pay period type Simple Formu >> [aria-label="select"]'
    );
    this.validateButton = page.locator("text=Validate");

    // forms and grids
    this.earningsCodeBlockName = page.locator(
      'text=Earnings Code Block Name >> [aria-label="select"]'
    );

    this.earningsCodePayType = page.locator(
      'text=Earnings Code Block Name Pay Type >> [aria-label="select"] >> nth=1'
    );

    this.formulaBlockNameInput = page.locator(
      'input[name="PayPlanBlock\\.Name"]'
    );

    this.blockDescriptionNameInput = page.locator(
      'input[name="PayPlanBlock\\.LongDescription"]'
    );

    this.paysheetDescriptionInput = page.locator(
      'input[name="PayPlanBlock\\.PaySheetDescription"]'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/FormulaBlock"
    );
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async getPayPlanHeader() {
    await expect(
      this.PayPlanFormulaBlockHeader,
      "PayPlan Formula header not found"
    ).toBeVisible();
  }

  async getClearFiltersLink() {
    await expect(
      this.clearFilters,
      "Clear Filters Link not found"
    ).toBeVisible();
  }

  async getAddFormulaButton() {
    await expect(this.addFormula, "Add Formula Button not found").toBeVisible();
  }

  async getBlockDetails() {
    await expect(this.blockDetails, "Block Details not found").toBeVisible;
  }

  async getEarningsCodeText() {
    await expect(
      this.earningsCodeText,
      "Earnings Code not found"
    ).toBeVisible();
  }

  async getPayTypeText() {
    await expect(this.payTypeText, "Pay Type not found").toBeVisible();
  }

  async getBlockNameText() {
    await expect(this.blockNameText, "Block Name not found").toBeVisible();
  }

  async getBlockDescriptionText() {
    await expect(
      this.blockDescriptionText,
      "Block Description not found"
    ).toBeVisible();
  }

  async getPaysheetDescriptionText() {
    await expect(
      this.paysheetDescriptionText,
      "Paysheet Description not found"
    ).toBeVisible();
  }

  async getCalculatePayPeriodType() {
    await expect(
      this.calculatePayPeriodType,
      "Calculate on pay period type not found"
    ).toBeVisible();
  }

  async getAdvancedFormulaEditor() {
    await expect(
      this.advancedFormulaEditor,
      "Advanded Formula Editor not found"
    ).toBeVisible();
  }

  async getBlockDetailsCloseButton() {
    await expect(
      this.blockDetailsClose,
      "Block Details Close Button not found"
    ).toBeVisible();
  }

  async getFormulaBlockNameInput() {
    await expect(
      this.formulaBlockNameInput,
      "Formula Block Name Input not found"
    ).toBeVisible();
  }

  async getBlockExpression() {
    await expect(
      this.blockExpression,
      "Block Expression not found"
    ).toBeVisible();
  }

  async getEarningsCodeBlockName() {
    await expect(
      this.earningsCodeBlockName,
      "Earnings Code Block Name dropdown is not present"
    ).toBeVisible();
  }

  async getEarningsCodePayType() {
    await expect(
      this.earningsCodePayType,
      "Earnings Code Pay Type dropdown is not present"
    ).toBeVisible();
  }

  async getBlockDescriptionNameInput() {
    await expect(
      this.blockDescriptionNameInput,
      "Block Description input is not present"
    ).toBeVisible();
  }

  async getPaysheetDescriptionInput() {
    await expect(
      this.paysheetDescriptionInput,
      "Paysheed Description input is not present"
    ).toBeVisible();
  }

  async getCalculateOnPayPeriodTypeDropdown() {
    await expect(
      this.calculateOnPayPeriodType,
      "Calculate On Pay Period Type dropdown not present"
    ).toBeVisible();
  }

  async getValidateButton() {
    await expect(
      this.validateButton,
      "Validate button not present"
    ).toBeVisible();
  }

  async getCloseModalButton() {
    await expect(
      this.closeModalButton,
      "Close Modal button not found"
    ).toBeVisible();
  }

  // interact with elements
  async clickClearFiltersLink() {
    await this.clearFilters.click();
  }

  async clickAddFormulaButton() {
    await this.getAddFormulaButton();
    await this.addFormula.click();
  }

  async clickBlockDetailsCloseButton() {
    await this.getBlockDetailsCloseButton();
    await this.blockDetailsClose.click();
  }

  async clickEarningsCodeBlockNameDropdown() {
    await this.getEarningsCodeBlockName();
    await this.earningsCodeBlockName.click();
  }

  async clickEarningsCodeBlockNamePayTypeDropdown() {
    await this.getEarningsCodePayType();
    await this.earningsCodePayType.click();
  }

  async clickValidateButton() {
    await this.getValidateButton();
    await this.validateButton.click();
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

  async clickCalculateOnPayPeriodTypeDropdown() {
    await this.getCalculateOnPayPeriodTypeDropdown();
    await this.calculateOnPayPeriodType.click();
  }
}
module.exports = { PayPlanFormulaBlock };
