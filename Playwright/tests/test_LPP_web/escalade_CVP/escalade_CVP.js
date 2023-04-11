// this POM is for Escalade /cvp/sales
const { expect } = require("@playwright/test");

class EscaladeCVP {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.pageHeader = page.getByRole("heading", {
      name: "Centralized Vehicle Processing",
      exact: true,
    });

    // unique page text

    // search, buttons, dropdowns and input boxes

    // forms and grids

    // unique page elements
    this.helpSupportLink = page.getByText("Help and Support");
    this.userGuideLink = page.getByText("User Guide");
  }

  // Navigate to /cvp/sales endpoint
  async goto() {
    await this.page.goto("/cvp/sales");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page Header not found").toBeVisible();
  }

  async getHelpSupportLink() {
    await expect(
      this.helpSupportLink,
      "Help and Support Link not found"
    ).toBeVisible();
  }

  async getUserGuideLink() {
    await expect(this.userGuideLink, "User Guide link not found").toBeVisible();
  }

  // interact with elements

  async clickHelpSupportLink() {
    await this.getHelpSupportLink();
    await this.helpSupportLink.click();
    const page1Promise = this.page.waitForEvent("popup");
    const page1 = await page1Promise;
    await page1.goto(
      "https://lithia.service-now.com/rrc?id=emp_taxonomy_topic&topic_id=d96b7ab51bcb9550a11f1131b24bcbe8"
    );
  }

  async clickUserGuideLink() {
    await this.getHelpSupportLink();
    await this.userGuideLink.click();
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.getByText("User Guide").click();
    const page1 = await page1Promise;
  }

  // input elements and forms
}
module.exports = { EscaladeCVP };
