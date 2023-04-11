// this POM is for /LPP portal
const { expect } = require("@playwright/test");

class DenaliPortal {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.PageHeader = page.getByRole("heading", { name: "Denali Portal" });

    // unique page text

    // buttons, dropdowns and input boxes

    // forms and grids

    // calendar elements
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.PageHeader, "Page header not found").toBeVisible();
  }

  // interact with elements

  // input elements and forms
}
module.exports = { DenaliPortal };
