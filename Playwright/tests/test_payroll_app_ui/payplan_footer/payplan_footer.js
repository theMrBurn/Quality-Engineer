// this POM is for /Payplan/PayplanFooter
const { expect } = require("@playwright/test");

class PayplanFooter {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.payplanHeader = page.locator("text=Pay Plan Footer");
    this.editPayPlanHeader = page.locator("text=Edit Pay Plan Footer");

    // page elements
    this.footerNameText = page.locator('label:has-text("Footer Name")');
    this.experationDateText = page.locator("text=Expiration Date");
    this.footerNameColumnText = page.locator('a:has-text("Footer Name")');
    this.effectiveDateText = page.locator("text=Effective Date");
    this.payRateTypeColumnText = page.locator("text=Pay Rate Type");
    this.updatedByColumnText = page.locator("text=Updated By");
    this.updatedOnColumnText = page.locator("text=Updated On");

    // page alerts
    this.saveConfirmationAlert = page.locator("#divSuccessHolder");

    // buttons
    this.addFooterButton = page.locator('#grid div:has-text("Add Footer")');
    this.clearFiltersButton = page.locator("text=Clear Filters");
    this.editButton = page.locator("text=Edit");
    this.saveButton = page.locator("text=Save");
    this.backButton = page.locator("text=Back");

    // dropdown triangle
    this.dropdownTriangle = page.locator('[aria-label="select"] >> nth=0');

    // inputs

    this.footerNameInput = page.locator('input[name="NameList_input"]');
  }

  // Navigation
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanFooter"
    );
  }

  /// get elements
  async getPayPlanFooterHeader() {
    await expect(this.payplanHeader).toBeVisible();
  }

  async getEditPayPlanFooterHeader() {
    await expect(this.editPayPlanHeader).toBeVisible();
  }

  async getFooterNameText1() {
    await expect(this.footerNameText).toBeVisible();
  }

  async getFooterNameColumnText() {
    await expect(this.footerNameColumnText).toBeVisible();
  }

  async getExperationDateText() {
    await expect(this.experationDateText).toBeVisible();
  }

  async getEffectiveDateText() {
    await expect(this.effectiveDateText).toBeVisible();
  }

  async getPayRateTypeColumnText() {
    await expect(this.payRateTypeColumnText).toBeVisible();
  }

  async getUpdatedByColumnText() {
    await expect(this.updatedByColumnText).toBeVisible();
  }

  async getUpdatedOnColumnText() {
    await expect(this.updatedOnColumnText).toBeVisible();
  }

  async getEditButton() {
    await expect.soft(this.editButton).toBeVisible();
  }

  async getAddFooterButton() {
    await expect(this.addFooterButton).toBeVisible();
  }

  async getBackButton() {
    await expect(this.backButton).toBeVisible();
  }

  async getClearFiltersButton() {
    await expect(this.clearFiltersButton).toBeVisible();
  }

  async getSaveConfirmationAlert() {
    await expect(this.saveConfirmationAlert).toBeVisible();
  }

  // input elements

  async inputFooterName(text) {
    await this.footerNameInput.click();
    await this.footerNameInput.fill(text);
    await this.footerNameInput.press("Enter");
  }

  async inputFooterClickDropdown() {
    await this.dropdownTriangle.first().click();
  }

  // click elements
  async clickEmployeesLink() {
    await this.employeesLink.click();
    await expect(this.page).toHaveURL(
      "https://azwu2apweb-test.azurewebsites.net/PayPlan/PayPlanEmployee"
    );
  }

  async clickEditButton() {
    await this.getEditButton();
    await this.editButton.click();
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async clickBackButton() {
    await this.backButton.click();
  }
}

module.exports = { PayplanFooter };
