const { expect } = require("@playwright/test");

/**
 * PD20 Main Page Object with locators and common interaction methods.
 *
 * Work Items / Bug Fixes Tested:
 * - WI#277087: Drill-through functionality on /sales-log with slicer selections should always open reports.
 *   Bookmarks or active drill-through states should not prevent repeated drill-throughs.
 *   https://dev.azure.com/Lithia Motors/Data%20and%20Apps/_workitems/edit/277087
 *
 * Future work items can be appended here as needed.
 */
class PD20MainPage {
  /**
   * @param {import('playwright').Page} page
   * @param {string} paramKey optional test parameters key (default: 'default')
   */
  constructor(page, paramKey = "default") {
    this.page = page;
    this.paramKey = paramKey;

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

      // Power BI iframe locator
      powerBIFrameSelector: 'iframe[src*="powerbi.com"]',

      // App header or nav to verify login success (outside iframe)
      appHeader: () => this.page.getByRole("banner"),

      // The following are async getters for iframe-contained elements:
      getPowerBIFrame: async () => {
        console.log(`[${new Date().toISOString()}] Waiting for Power BI iframe attachment...`);
        try {
          const frameHandle = await this.page.waitForSelector(
            this.locators.powerBIFrameSelector,
            { timeout: 30000, state: "visible" }
          );
          if (!frameHandle) {
            throw new Error("Power BI iframe element not found or not visible");
          }
          const contentFrame = await frameHandle.contentFrame();
          if (!contentFrame) {
            throw new Error("Power BI iframe contentFrame not acquired");
          }
          console.log(`[${new Date().toISOString()}] Power BI iframe contentFrame acquired.`);
          return contentFrame;
        } catch (e) {
          console.error(`[${new Date().toISOString()}] Failed to find or access Power BI iframe: ${e.message}`);
          throw e;
        }
      },

      monthSlicerDropdown: async () => {
        const frame = await this.locators.getPowerBIFrame();
        await frame.waitForSelector("#month-slicer", { timeout: 60000 });
        await frame.waitForFunction(() => {
          const select = document.querySelector("#month-slicer");
          return select && select.options.length > 1;
        }, { timeout: 60000 });
        return frame.locator("#month-slicer");
      },

      yearSlicerDropdown: async () => {
        const frame = await this.locators.getPowerBIFrame();
        await frame.waitForSelector("#year-slicer", { timeout: 60000 });
        await frame.waitForFunction(() => {
          const select = document.querySelector("#year-slicer");
          return select && select.options.length > 1;
        }, { timeout: 60000 });
        return frame.locator("#year-slicer");
      },

      drillThroughLink: async () => {
        const frame = await this.locators.getPowerBIFrame();
        await frame.waitForSelector(".drillthrough-link", { timeout: 60000 });
        return frame.locator(".drillthrough-link");
      },

      reportContainer: async () => {
        const frame = await this.locators.getPowerBIFrame();
        await frame.waitForSelector("#report-container", { timeout: 60000 });
        return frame.locator("#report-container");
      },

      // Locators for navigation outside iframe
      navButtonByName: (name, exact = false) =>
        this.page.getByRole("button", { name, exact }),

      navLinkByName: (name) =>
        this.page.getByRole("link", { name }),
    };

    this.testParamsMap = {
      default: {
        urls: {
          mainPage: "https://dev.apps.lithiadriveway.com/performance-dashboard/sales-log",
        },
        inputs: {
          inputField1: "1000",
          inputField2: "2500",
          inputField3: "-300",
        },
        expectedTexts: {
          bookmarkApplied: "Bookmark applied successfully",
        },
        drillthrough: {
          month: "October",
          year: "2025",
          repeatCount: 3,
          urlContains: "sales-log",
          reportVerifySelectors: ["#report-container", ".some-key-report-element"] // Replace with your actual selectors
        },
      },
    };

    this.testParams = this.testParamsMap[this.paramKey] || this.testParamsMap.default;

    this.dynamicLocators = {};
  }

  getTestParams() {
    return this.testParams;
  }

  async goto(url) {
    const targetUrl =
      url ||
      this.testParams.urls.mainPage ||
      this.page.context()._options.baseURL ||
      "/";
    console.log(`[${new Date().toISOString()}] Navigating to ${targetUrl}`);
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState("load");
    console.log(`[${new Date().toISOString()}] Navigation complete`);
  }

  async clickElement(locatorName) {
    const locatorFunc = this.locators[locatorName] || this.dynamicLocators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    console.log(`[${new Date().toISOString()}] Waiting for '${locatorName}' to be visible before click`);
    await element.waitFor({ state: "visible", timeout: 15000 });
    await element.click();
    await this.page.waitForLoadState("load");
    console.log(`[${new Date().toISOString()}] Clicked '${locatorName}'`);
  }

  async fillInput(locatorName, value) {
    const locatorFunc = this.locators[locatorName] || this.dynamicLocators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    console.log(`[${new Date().toISOString()}] Waiting for '${locatorName}' to be visible before fill`);
    await element.waitFor({ state: "visible", timeout: 15000 });
    await element.fill(value);
    await this.page.waitForLoadState("load");
    console.log(`[${new Date().toISOString()}] Filled '${locatorName}' with '${value}'`);
  }

  async getText(locatorName) {
    const locatorFunc = this.locators[locatorName] || this.dynamicLocators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    const text = await element.textContent();
    return text ? text.trim() : "";
  }

  async checkElementVisibility(locatorName) {
    const locatorFunc = this.locators[locatorName] || this.dynamicLocators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    console.log(`[${new Date().toISOString()}] Checking visibility of '${locatorName}'`);
    await expect(element).toBeVisible({ timeout: 15000 });
  }

  async getSelectedOption(locatorName) {
    const locatorFunc = this.locators[locatorName] || this.dynamicLocators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    const selectElement = locatorFunc.length ? await locatorFunc() : locatorFunc();
    return selectElement.evaluate((select) => {
      const selectedOption = select.selectedOptions[0];
      return selectedOption ? selectedOption.label || selectedOption.value : null;
    });
  }

  async navigateToReportSection(buttonName, linkName) {
    console.log(`[${new Date().toISOString()}] Navigating to section via button/link: ${buttonName} / ${linkName}`);
    const btn = this.locators.navButtonByName(buttonName, true);
    await btn.waitFor({ state: "visible", timeout: 15000 });
    await btn.click();
    await this.page.waitForLoadState("load");

    const link = this.locators.navLinkByName(linkName);
    await link.waitFor({ state: "visible", timeout: 15000 });
    await link.click();
    await this.page.waitForLoadState("load");
  }

  updateLocatorsFromScrape(locatorMap) {
    if (!locatorMap || !(locatorMap instanceof Map)) {
      console.warn(`[${new Date().toISOString()}] updateLocatorsFromScrape: invalid locatorMap provided.`);
      return;
    }

    let updateCount = 0;

    for (const [key, selector] of locatorMap.entries()) {
      if (!key || !selector) continue;
      this.dynamicLocators[key] = () => this.page.locator(selector);
      updateCount++;
    }

    console.log(`[${new Date().toISOString()}] updateLocatorsFromScrape: Updated/Added ${updateCount} locators dynamically.`);
  }
}

module.exports = { PD20MainPage };