// this POM is for /Admin/Paycycle
const { expect } = require("@playwright/test");

class AdminPayCycle {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.payCyclePageHeader = page.locator('h2:has-text("Pay Cycle")');

    // unique page text
    this.companyText = page.locator("text=Company >> nth=0");
    this.companyNumberText = page.locator('label:has-text("Company Number")');
    this.companyGridColumnText = page.locator("text=Company >> nth=2");
    this.companyNumberGridColumnText = page.locator(
      'a:has-text("Company Number")'
    );
    this.calendarGridText = page.locator(
      'thead[role="rowgroup"] >> text=Calendar'
    );
    this.payGroupGridText = page.locator('a:has-text("Pay Group")');
    this.activeGridText = page.locator('a:has-text("Active")');

    // buttons, dropdowns and input boxes
    this.companyInputBox = page.locator('input[name="OrganizationList_input"]');
    this.companyInputDropdown = page.locator('[aria-label="select"] >> nth=0');
    this.payGroupInputBox = page.locator('input[name="PayGroupList_input"]');
    this.payGroupInputDropdown = page.locator('[aria-label="select"] >> nth=1');
    this.assignPayCycleButton = page.locator("text=Assign Pay Cycle");
    this.cancelButton = page.locator(
      '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[7]/a[2]'
    );

    // forms and grids
    this.nameGridColumn = page.locator("text=Name");
    this.legalExplanationGridColumn = page.locator(
      '#LegalExplanationGrid div:has-text("New Legal Explanation")'
    );
    this.endDateGridColumn = page.locator('a:has-text("End Date")');
    this.startDateGridInput = page.locator('//*[@id="StartDate"]');
    this.companyGridInput = page.locator(
      'tbody[role="rowgroup"] span[role="listbox"] [aria-label="select"] span'
    );
    this.companyNumberGridInput = page.locator(
      '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[3]/span[1]/span/span[2]'
    );
    this.calendarGridInput = page.locator(
      '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[4]/span[1]/span/span[2]'
    );

    this.payGroupGridInput = page.locator(
      '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[5]/span[1]/span/span[2]'
    );
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto(
      "https://azwu2apweb-test.azurewebsites.net/Admin/PayCycle"
    );
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async getPayCyclePageHeader() {
    await expect(
      this.payCyclePageHeader,
      "Admin PayCycle Page header not found"
    ).toBeVisible();
  }

  async getCompanyText() {
    await expect(
      this.companyText,
      "Company input label not found"
    ).toBeVisible();
  }

  async getCompanyNumberText() {
    await expect(
      this.companyNumberText,
      "Company Number input label not found"
    ).toBeVisible();
  }

  async getCompanyGridColumnText() {
    await expect(
      this.companyGridColumnText,
      "Company Grid text label not found"
    ).toBeVisible();
  }

  async getCompanyNumberGridColumnText() {
    await expect(
      this.companyNumberGridColumnText,
      "Company Number Grid text label not found"
    ).toBeVisible();
  }

  async getCalendarGridColumnText() {
    await expect(
      this.calendarGridText,
      "Calendar Grid text label not found"
    ).toBeVisible();
  }

  async getPayGroupGridColumnText() {
    await expect(
      this.payGroupGridText,
      "PayGroup Grid text label not found"
    ).toBeVisible();
  }

  async getActiveGridColumnText() {
    await expect(
      this.activeGridText,
      "Active Grid text label not found"
    ).toBeVisible();
  }

  async getCompanyInputBox() {
    await expect(
      this.companyInputBox,
      "Company input box not found"
    ).toBeVisible();
  }

  async getCompanyInputDropdown() {
    await expect(
      this.companyInputDropdown,
      "Company input dropdown not found"
    ).toBeVisible();
  }

  async getPayGroupInputBox() {
    await expect(
      this.payGroupInputBox,
      "PayGroup input box not found"
    ).toBeVisible();
  }

  async getPayGroupInputDropdown() {
    await expect(
      this.payGroupInputDropdown,
      "PayGroup input dropdown not found"
    ).toBeVisible();
  }

  async getAssignPayCycleButton() {
    await expect(
      this.assignPayCycleButton,
      "Assign Paycycle button not found"
    ).toBeVisible();
  }

  async getCompanyGridInput() {
    await expect(
      this.companyGridInput,
      "Company grid input box not found"
    ).toBeVisible();
  }

  async getCompanyNumberGridInput() {
    await expect(
      this.companyNumberGridInput,
      "Company Number grid input box not found"
    ).toBeVisible();
  }

  async getCalendarGridInput() {
    await expect(
      this.calendarGridInput,
      "Calendar grid input box not found"
    ).toBeVisible();
  }

  async getPayGroupGridInput() {
    await expect(
      this.payGroupGridInput,
      "Paygroup grid input box not found"
    ).toBeVisible();
  }

  async getCancelButton() {
    await expect(this.cancelButton, "Cancel button not found").toBeVisible();
  }

  // interact with elements

  async clickCompanyDropdown() {
    await this.getCompanyInputDropdown();
    await this.companyInputDropdown.click();
  }

  async clickCompanyNumberDropdown() {
    await this.getPayGroupInputDropdown();
    await this.payGroupInputDropdown.click();
  }

  async clickAssignPayCycleButton() {
    await this.getAssignPayCycleButton();
    await this.assignPayCycleButton.click();
  }

  async clickCancelButton() {
    await this.getCancelButton();
    await this.cancelButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms

  async inputCompany(text) {
    await this.getCompanyInputBox();
    await this.companyInputBox.fill(text);
  }

  async inputCompanyGridFromDropdown() {
    await this.getCompanyGridInput();
    await this.companyGridInput.click();
  }

  async inputCompanyNumberGridFromDropdown() {
    await this.getCompanyNumberGridInput();
    await this.companyNumberGridInput.click();
  }

  async inputCalendarGridFromDropdown() {
    await this.getCalendarGridInput();
    await this.calendarGridInput.click();
  }

  async inputPayGroupInputFromDropdown() {
    await this.getPayGroupGridInput();
    await this.payGroupGridInput.click();
  }
}
module.exports = { AdminPayCycle };
