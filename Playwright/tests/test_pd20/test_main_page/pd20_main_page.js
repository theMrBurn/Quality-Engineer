const { expect } = require("@playwright/test");

/**
 * PD20 Main Page Object with locators and common interaction methods.
 * Handles Power BI iframe elements explicitly with waits on frame content.
 */
class PD20MainPage {
  /**
   * @param {import('playwright').Page} page
   * @param {Object} testParams optional parameters object to drive test data, inputs, expectations
   */
  constructor(page, testParams = {}) {
    this.page = page;
    this.testParams = testParams;

    this.locators = {
      // Buttons
      applyBookmarkButton: () =>
        this.page.getByRole("button", { name: /apply bookmark/i }),
      saveButton: () => this.page.getByRole("button", { name: /save/i }),
      cancelButton: () => this.page.getByRole("button", { name: /cancel/i }),

      // Inputs
      inputField1: () => this.page.locator("#inputField1"),
      inputField2: () => this.page.locator("#inputField2"),
      inputField3: () => this.page.locator("#inputField3"),

      // Bookmarks / Status
      bookmarkStatus: () => this.page.locator("#bookmark-status"),

      // Power BI iframe locator - used internally only
      powerBIFrameSelector: 'iframe[src*="powerbi.com"]',

      // Locators inside Power BI iframe - accessed via async methods below
      // Use explicit waits and contentFrame to ensure frame loaded before interaction

      monthSlicerDropdown: async () => {
        const frame = await this.waitForPowerBIFrameAndGet();
        await frame.waitForSelector("#month-slicer", { state: "visible", timeout: 30000 });
        return frame.locator("#month-slicer");
      },

      yearSlicerDropdown: async () => {
        const frame = await this.waitForPowerBIFrameAndGet();
        await frame.waitForSelector("#year-slicer", { state: "visible", timeout: 30000 });
        return frame.locator("#year-slicer");
      },

      drillThroughLink: async () => {
        const frame = await this.waitForPowerBIFrameAndGet();
        await frame.waitForSelector(".drillthrough-link", { state: "visible", timeout: 30000 });
        return frame.locator(".drillthrough-link");
      },

      reportContainer: async () => {
        const frame = await this.waitForPowerBIFrameAndGet();
        await frame.waitForSelector("#report-container", { state: "visible", timeout: 30000 });
        return frame.locator("#report-container");
      },

      // App header or nav outside iframe used to verify login success
      appHeader: () => this.page.getByRole("banner"), // Replace with actual reliable logged-in UI selector
    };
  }

  /**
   * Helper method to wait for the Power BI iframe to be attached and get its Playwright Frame object.
   */
  async waitForPowerBIFrameAndGet() {
    console.log(`[${new Date().toISOString()}] Waiting for Power BI iframe to be attached...`);
    const frameHandle = await this.page.waitForSelector(this.locators.powerBIFrameSelector, { timeout: 30000 });
    const frame = await frameHandle.contentFrame();
    if (!frame) {
      throw new Error("Power BI iframe contentFrame not available");
    }
    console.log(`[${new Date().toISOString()}] Power BI iframe contentFrame acquired.`);
    return frame;
  }

  async goto(url) {
    const targetUrl =
      url ||
      this.testParams.urls?.mainPage ||
      this.page.context()._options.baseURL ||
      "/";
    console.log(`[${new Date().toISOString()}] Navigating to ${targetUrl}`);
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState("load");
    console.log(`[${new Date().toISOString()}] Navigation complete`);
  }

  async clickElement(locatorName) {
    const locatorFunc = this.locators[locatorName];
    if (!locatorFunc)
      throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    console.log(`[${new Date().toISOString()}] Waiting for '${locatorName}' to be visible before click`);
    await element.waitFor({ state: "visible", timeout: 15000 });
    await element.click();
    console.log(`[${new Date().toISOString()}] Clicked '${locatorName}'`);
  }

  async fillInput(locatorName, value) {
    const locatorFunc = this.locators[locatorName];
    if (!locatorFunc)
      throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    console.log(`[${new Date().toISOString()}] Waiting for '${locatorName}' to be visible before fill`);
    await element.waitFor({ state: "visible", timeout: 15000 });
    await element.fill(value);
    console.log(`[${new Date().toISOString()}] Filled '${locatorName}' with '${value}'`);
  }

  async getText(locatorName) {
    const locatorFunc = this.locators[locatorName];
    if (!locatorFunc)
      throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    const text = await element.textContent();
    return text ? text.trim() : "";
  }

  async checkElementVisibility(locatorName) {
    const locatorFunc = this.locators[locatorName];
    if (!locatorFunc)
      throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    console.log(`[${new Date().toISOString()}] Checking visibility of '${locatorName}'`);
    await expect(element).toBeVisible({ timeout: 15000 });
  }
}

module.exports = { PD20MainPage };