// this POM is for Admin/Security
const { expect } = require("@playwright/test");

class AdminSecurity {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // text and lables
    this.locators = {
      securityRoleText: () =>
        page.getByRole("link", { name: "Security Roles" }),
      displayNameText: () => page.locator("text=Display Name"),
      principalNameText: () => page.locator("text=User Principal Name"),
      departmentText: () => page.locator("text=Department"),
      jobTitleText: () => page.locator("text=Job Title"),

      // inputs
      securityRoleInput: () =>
        page.locator('input[name="SecurityRoleList_listbox"]'),

      // dropdowns
      securityRoleDropdown: () =>
        page.locator('[aria-label="select"] >> nth=0'),
    };
  }

  // Navigation
  async goto() {
    await this.page.goto("/Admin/SecurityRoles");
  }

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

module.exports = { AdminSecurity };
