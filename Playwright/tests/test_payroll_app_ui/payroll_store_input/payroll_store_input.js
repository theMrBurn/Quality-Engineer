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

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Payroll/storeinput"
    );
  }

  // get elements

  async getStoreInputHeader() {
    await expect(this.storeInputHeader, "Header Not Found").toBeVisible();
  }

  async getStoreInputCompanyDropdown() {
    await expect(this.storeInputCompany).toBeVisible();
  }

  async getStoreInputPPEdate() {
    await expect(this.storeInputPPEdate).toBeVisible();
  }

  async getStoreInputStatus() {
    await expect(this.storeInputStatus).toBeVisible();
  }

  async getStoreInputInstructions() {
    await expect(this.storeInputInstructions).toBeVisible();
  }

  // click elements
  async clickStoreInputCompany() {
    await this.storeInputCompany.click();
  }

  async clickStoreInputPPEdate() {
    await this.storeInputPPEdate.click();
  }

  async clickStoreInputStatus() {
    await this.storeInputStatus.click();
  }

  // interact with elements

  async inputCompanyDropdown(text) {
    await this.storeInputCompany.click();
    await this.storeInputCompany.fill(text);
    await this.storeInputCompany.press("ArrowDown");
    await this.storeInputCompany.press("Enter");
    const medford = await this.page.innerText("text=Medford CJD (L0004)");
    expect(medford).toBe("Medford CJD (L0004)");
  }

  async inputPPEdateDropdown(text) {
    await this.storeInputPPEdate.click();
    await this.storeInputPPEdate.fill(text);
    await this.storeInputPPEdate.press("ArrowDown");
    await this.storeInputPPEdate.press("Enter");
  }

  async inputStatusDropdown(text) {
    await this.storeInputStatus.click();
    await this.storeInputStatus.fill(text);
    await this.storeInputStatus.press("ArrowDown");
    await this.storeInputStatus.press("Enter");
  }
}

module.exports = { PayrollStoreInput };
