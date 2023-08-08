// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class SaharaLHMweb {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers, tabs
    this.pageHeader = page.getByRole("heading", {
      name: "Lienholder Management Web",
      exact: true,
    });

    // unique page text

    // search, buttons, dropdowns and input boxes
    this.buttonRow = page.getByText(
      "GL POWER POSTEXPORT ZIPNEWEXPORT GRID DATA"
    );

    // unique elements
  }

  // Navigate to endpoint
  async goto() {
    await this.page.goto("/lienholders");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page header not found").toBeVisible();
  }

  // interact with elements

  // input elements and forms

  async inputSearch(text) {
    await this.getSearchBar();
    await this.searchBar.click();
    await this.searchBar.fill(text);
    await this.page.waitForLoadState("networkidle");
  }

  // filter
  async inputColumnFilter(text) {
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").first().click();
    await this.page.getByRole("textbox").first().fill("test");
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("button", { name: "Clear" }).click();
  }

  /// columns have specific filter options

  async inputContractDateColumnFilter(text) {
    await this.getGridColumnContractDate();
    await this.page
      .getByRole("columnheader", { name: text })
      .locator("div span")
      .click();
    await this.page.getByText("Filter").click();
    await this.page.getByRole("textbox").click();
    await this.page.getByRole("textbox").fill("01/01/2001");
    await this.page
      .getByRole("button", { name: "Filter", exact: true })
      .click();
  }
}
module.exports = { SaharaLHMweb };
