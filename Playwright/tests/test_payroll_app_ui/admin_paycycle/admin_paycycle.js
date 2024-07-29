// this POM is for /Admin/Paycycle
const { expect } = require("@playwright/test");

class AdminPayCycle {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      payCyclePageHeader: () =>
        this.page.getByRole("heading", { name: "Pay Cycle" }),
      companyText: () => this.page.locator("text=Company >> nth=0"),
      companyNumberText: () =>
        this.page.locator('label:has-text("Company Number")'),
      companyGridColumnText: () => this.page.locator("text=Company >> nth=2"),
      companyNumberGridColumnText: () =>
        this.page.locator('a:has-text("Company Number")'),
      calendarGridText: () =>
        this.page.locator('thead[role="rowgroup"] >> text=Calendar'),
      payGroupGridText: () => this.page.locator('a:has-text("Pay Group")'),
      activeGridText: () => this.page.locator('a:has-text("Active")'),
      companyInputBox: () =>
        this.page.locator('input[name="OrganizationList_input"]'),
      companyInputDropdown: () =>
        this.page.locator('[aria-label="select"] >> nth=0'),
      payGroupInputBox: () =>
        this.page.locator('input[name="PayGroupList_input"]'),
      payGroupInputDropdown: () =>
        this.page.locator('[aria-label="select"] >> nth=1'),
      assignPayCycleButton: () => this.page.locator("text=Assign Pay Cycle"),
      cancelButton: () =>
        this.page.locator(
          '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[7]/a[2]',
        ),
      nameGridColumn: () => this.page.locator("text=Name"),
      legalExplanationGridColumn: () =>
        this.page.locator(
          '#LegalExplanationGrid div:has-text("New Legal Explanation")',
        ),
      endDateGridColumn: () => this.page.locator('a:has-text("End Date")'),
      startDateGridInput: () => this.page.locator('//*[@id="StartDate"]'),
      companyGridInput: () =>
        this.page.locator(
          'tbody[role="rowgroup"] span[role="listbox"] [aria-label="select"] span',
        ),
      companyNumberGridInput: () =>
        this.page.locator(
          '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[3]/span[1]/span/span[2]',
        ),
      calendarGridInput: () =>
        this.page.locator(
          '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[4]/span[1]/span/span[2]',
        ),
      payGroupGridInput: () =>
        this.page.locator(
          '//*[@id="PayGroupGrid"]/table/tbody/tr[1]/td[5]/span[1]/span/span[2]',
        ),
    };
  }

  // Navigate to /Admin/Paycycle endpoint
  async goto() {
    await this.page.goto("/Admin/PayCycle");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements
  /// new interactive methods

  // get page elements
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /// interact with elements

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      await this.page.waitForLoadState("networkidle");
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("load");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }
}
module.exports = { AdminPayCycle };
