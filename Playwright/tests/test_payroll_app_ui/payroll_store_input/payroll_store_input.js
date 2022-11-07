// this POM is for /Payroll/storeinput

const { expect } = require("@playwright/test");
class PayrollStoreInput {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // header
    this.storeInputHeader = page.locator('h2:has-text("Store Input")');
    // dropdowns
    this.storeInputCompany = page.locator('input[name="PayGroupList_input"]');
    this.storeInputPPEdate = page.locator(
      'input[name="PayCalendarPeriodList_input"]'
    );
    this.storeInputStatus = page.locator('input[name="StoreInputStatus"]');

    // page instructions
    this.storeInputInstructions = page.locator(
      "text=Specify both Company and Payroll Period to display rows in the grid UnlockImport"
    );
  }

  // Navigate
  async goto() {
    await this.page.goto("/Payroll/storeinput");
    await this.page.waitForLoadState("networkidle");
  }

  // get elements

  async getStoreInputHeader() {
    await expect(this.storeInputHeader, "Header Not Found").toBeVisible();
  }

  async getStoreInputCompanyDropdown() {
    await expect(
      this.storeInputCompany,
      "Store Input Company dropdown not found"
    ).toBeVisible();
  }

  async getStoreInputPPEdate() {
    await expect(
      this.storeInputPPEdate,
      "Store Input PPE Date not found"
    ).toBeVisible();
  }

  async getStoreInputStatus() {
    await expect(
      this.storeInputStatus,
      "Store Input Status not found"
    ).toBeVisible();
  }

  async getStoreInputInstructions() {
    await expect(
      this.storeInputInstructions,
      "Store Input Instructions not found"
    ).toBeVisible();
  }

  // click elements
  async clickStoreInputCompany() {
    await this.getStoreInputCompanyDropdown();
    await this.storeInputCompany.click();
  }

  async clickStoreInputPPEdate() {
    await this.getStoreInputPPEdate();
    await this.storeInputPPEdate.click();
  }

  async clickStoreInputStatus() {
    await this.getStoreInputStatus();
    await this.storeInputStatus.click();
  }

  // interact with elements

  async inputCompanyDropdown(text) {
    await this.getStoreInputCompanyDropdown();
    await this.storeInputCompany.click();
    await this.storeInputCompany.fill(text);
    await this.storeInputCompany.press("ArrowDown");
    await this.storeInputCompany.press("Enter");
    // const medford = await this.page.innerText("text=Medford CJD (L0004)");
    // expect(medford).toBe("Medford CJD (L0004)");
  }

  async inputPPEdateDropdown(text) {
    await this.getStoreInputPPEdate();
    await this.storeInputPPEdate.click();
    await this.storeInputPPEdate.fill(text);
    await this.storeInputPPEdate.press("ArrowDown");
    await this.storeInputPPEdate.press("Enter");
  }

  async inputStatusDropdown(text) {
    await this.getStoreInputStatus();
    await this.storeInputStatus.click();
    await this.storeInputStatus.fill(text);
    await this.storeInputStatus.press("ArrowDown");
    await this.storeInputStatus.press("Enter");
  }
}

module.exports = { PayrollStoreInput };
