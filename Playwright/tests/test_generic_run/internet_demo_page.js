// this POM is for https://the-internet.herokuapp.com (generic_POC)

const { expect } = require("@playwright/test");

class InternetDemoPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    /// locators
    this.locators = {
      //landing page
      pageHeader: () =>
        this.page.getByRole("heading", { name: /Welcome to the-internet/i }),
      formAuthLink: () =>
        this.page.getByRole("link", { name: "Form Authentication" }),
      checkboxesLink: () =>
        this.page.getByRole("link", { name: "Checkboxes" }),
      dropdownLink: () => this.page.getByRole("link", { name: "Dropdown" }),
      dynamicLoadingLink: () =>
        this.page.getByRole("link", { name: "Dynamic Loading" }),

      //form auth /login
      loginFormHeader: () =>
        this.page.getByRole("heading", { name: "Login Page" }),
      usernameInput: () => this.page.locator("#username"),
      passwordInput: () => this.page.locator("#password"),
      loginButton: () => this.page.getByRole("button", { name: /Login/i }),
      successFlash: () => this.page.locator("#flash.success"),
      errorFlash: () => this.page.locator("#flash.error"),
      secureAreaHeader: () =>
        this.page.getByRole("heading", { name: "Secure Area", exact: true }),
      logoutButton: () => this.page.getByRole("link", { name: /Logout/i }),

      //checkboxes page
      checkboxesHeader: () =>
        this.page.getByRole("heading", { name: "Checkboxes" }),
      firstCheckbox: () => this.page.locator('input[type="checkbox"]').first(),
      secondCheckbox: () => this.page.locator('input[type="checkbox"]').nth(1),

      //dropdown page
      dropdownHeader: () =>
        this.page.getByRole("heading", { name: "Dropdown List" }),
      dropdownSelect: () => this.page.locator("#dropdown"),
    };
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

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
}

module.exports = { InternetDemoPage };
