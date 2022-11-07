// this POM is for Admin/Security
const { expect } = require("@playwright/test");

class AdminSecurity {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers

    // text and lables
    this.securityRoleText = page.locator('label:has-text("Security Role")');
    this.displayNameText = page.locator("text=Display Name");
    this.principalNameText = page.locator("text=User Principal Name");
    this.departmentText = page.locator("text=Department");
    this.jobTitleText = page.locator("text=Job Title");

    /// page elements
    // inputs
    this.securityRoleInput = page.locator(
      'input[name="SecurityRoleList_listbox"]'
    );

    // dropdowns
    this.securityRoleDropdown = page.locator('[aria-label="select"] >> nth=0');
  }

  // Navigation
  async goto() {
    await this.page.goto("/Admin/SecurityRoles");
  }

  /// get elements
  async getSecurityRoleText() {
    await expect(
      this.securityRoleText,
      "Security Role text not found"
    ).toBeVisible();
  }

  async getSecurityRoleInput() {
    await expect(
      this.securityRoleInput,
      "Security Role input not found"
    ).toBeVisible();
  }

  async getSecurityRoleDropdown() {
    await expect(
      this.securityRoleDropdown,
      "Security Role dropdown not found"
    ).toBeVisible();
  }

  async getDisplayNameText() {
    await expect(
      this.displayNameText,
      "Display Name column not found"
    ).toBeVisible();
  }

  async getPrincipalText() {
    await expect(
      this.principalNameText,
      "Principal column not found"
    ).toBeVisible();
  }

  async getDepartmentText() {
    await expect(
      this.departmentText,
      "Department column not found"
    ).toBeVisible();
  }

  async getJobTitle() {
    await expect(this.jobTitleText, "Job Title column not found").toBeVisible();
  }

  // input elements

  async clickSecurityRoleDropdown() {
    await this.getSecurityRoleDropdown();
    await this.securityRoleDropdown.click();
  }

  async inputSecurityRole(text) {
    await this.getSecurityRoleInput();
    await this.securityRoleInput.click();
    await this.securityRoleInput.fill(text);
    await this.securityRoleInput.press("Enter");
  }
}

module.exports = { AdminSecurity };
