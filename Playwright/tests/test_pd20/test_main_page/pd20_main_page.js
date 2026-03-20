const { expect } = require("@playwright/test");

/**
 * PD20 Main Page Object with locators and common interaction methods.
 */
class PD20MainPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      applyBookmarkButton: () => this.page.getByRole("button", { name: /apply bookmark/i }),
      saveButton: () => this.page.getByRole("button", { name: /save/i }),
      cancelButton: () => this.page.getByRole("button", { name: /cancel/i }),
      inputField1: () => this.page.locator("#inputField1"),
      inputField2: () => this.page.locator("#inputField2"),
      inputField3: () => this.page.locator("#inputField3"),
      bookmarkStatus: () => this.page.locator("#bookmark-status"),
      // Add more locators as needed
    };
  }

  async goto(url) {
    const targetUrl = url || this.page.context()._options.baseURL || "/";
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState("load");
  }

  async clickElement(locatorName) {
    const locatorFunc = this.locators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    try {
      const element = locatorFunc();
      await element.waitFor({ state: "visible", timeout: 10000 });
      await element.click();
    } catch (err) {
      throw new Error(`Clicking locator '${locatorName}' failed: ${err.message}`);
    }
  }

  async fillInput(locatorName, value) {
    const locatorFunc = this.locators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    try {
      const element = locatorFunc();
      await element.waitFor({ state: "visible", timeout: 10000 });
      await element.fill(value);
    } catch (err) {
      throw new Error(`Filling input '${locatorName}' failed: ${err.message}`);
    }
  }

  async getText(locatorName) {
    const locatorFunc = this.locators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    try {
      const text = await locatorFunc().textContent();
      return text ? text.trim() : "";
    } catch (err) {
      throw new Error(`Getting text from '${locatorName}' failed: ${err.message}`);
    }
  }
}

module.exports = { PD20MainPage };