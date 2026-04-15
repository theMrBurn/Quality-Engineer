// this POM is for https://the-internet.herokuapp.com (generic_POC demo)
const { BasePOM } = require("../../base/BasePOM");

class InternetDemoPage extends BasePOM {
  /**
   * @param {import('playwright').Page} page
   */
  static expectedLocators = [
    "pageHeader",
    "formAuthLink",
    "checkboxesLink",
    "dropdownLink",
    "dynamicLoadingLink",
    "loginFormHeader",
    "usernameInput",
    "passwordInput",
    "loginButton",
    "successFlash",
    "errorFlash",
    "secureAreaHeader",
    "logoutButton",
    "firstCheckbox",
  ];

  // Approach 3 fallbacks — populated by selfHealCleaner.
  // Add selectors here to explicitly declare healing candidates for this POM.
  static fallbacks = {
    loginButton: ['button:has-text("Login")'],
    usernameInput: ['#username'],
    passwordInput: ['#password'],
    formAuthLink: ['a[href="/login"]'],
    checkboxesLink: ['a[href="/checkboxes"]'],
    logoutButton: ['a[href="/logout"]'],
    loginFormHeader: ['h2:has-text("Login Page")'],
    pageHeader: ['h1:has-text("Welcome to the-internet")'],
    secureAreaHeader: ['h2:has-text("Secure Area")'],
  };

  constructor(page) {
    super(page);

    /// locators
    // landing page
    this.locators = {
      pageHeader: () =>
        this.page.getByRole("heading", { name: /Welcome to the-internet/i }),
      formAuthLink: () =>
        this.page.getByRole("link", { name: "Form Authentication" }),
      checkboxesLink: () =>
        this.page.getByRole("link", { name: "Checkboxes" }),
      dropdownLink: () =>
        this.page.getByRole("link", { name: "Dropdown" }),
      dynamicLoadingLink: () =>
        this.page.getByRole("link", { name: "Dynamic Loading" }),

      // form auth /login
      loginFormHeader: () =>
        this.page.getByRole("heading", { name: "Login Page" }),
      usernameInput: () =>
        this.page.locator("#username"),
      passwordInput: () =>
        this.page.locator("#password"),
      loginButton: () =>
        this.page.getByRole("button", { name: /Login/i }),
      successFlash: () =>
        this.page.locator("#flash.success"),
      errorFlash: () =>
        this.page.locator("#flash.error"),
      secureAreaHeader: () =>
        this.page.getByRole("heading", { name: "Secure Area", exact: true }),
      logoutButton: () =>
        this.page.getByRole("link", { name: /Logout/i }),

      // checkboxes page
      firstCheckbox: () =>
        this.page.locator('input[type="checkbox"]').first(),
      secondCheckbox: () =>
        this.page.locator('input[type="checkbox"]').nth(1),
    };
  }

  // Navigate to home page
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  // Navigate to form authentication page
  async gotoFormAuth() {
    await this.locators.formAuthLink().click();
    await this.page.waitForLoadState("networkidle");
  }

  // Navigate to checkboxes page
  async gotoCheckboxes() {
    await this.locators.checkboxesLink().click();
    await this.page.waitForLoadState("networkidle");
  }

  // Submit login form with given credentials
  async login(username, password) {
    await this.locators.usernameInput().fill(username);
    await this.locators.passwordInput().fill(password);
    await this.locators.loginButton().click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { InternetDemoPage };
