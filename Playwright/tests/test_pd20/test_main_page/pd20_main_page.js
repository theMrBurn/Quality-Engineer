const { expect } = require("@playwright/test");

/**
 * PD20 Main Page Object with locators and common interaction methods.
 * 
 * Work Items / Bug Fixes Tested:
 * - WI#277087: Drill-through functionality on /sales-log with slicer selections should always open reports.
 *   Bookmarks or active drill-through states should not prevent repeated drill-throughs.
 *   https://dev.azure.com/LithiaMotors/Data%20and%20Apps/_workitems/edit/277087
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

      /**
       * Wait for Power BI iframe and get content frame.
       */
      getPowerBIFrame: async () => {
        console.log(`[${new Date().toISOString()}] Waiting for Power BI iframe attachment...`);
        const frameHandle = await this.page.waitForSelector(
          this.locators.powerBIFrameSelector,
          { timeout: 60000 }
        );
        const contentFrame = await frameHandle.contentFrame();
        if (!contentFrame) {
          throw new Error("Power BI iframe contentFrame not acquired");
        }
        console.log(`[${new Date().toISOString()}] Power BI iframe contentFrame acquired.`);
        return contentFrame;
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

    // Embedded test parameters keyed by paramKey
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
          month: "March",
          year: "2023",
          repeatCount: 3,
          urlContains: "sales-log",
          reportVerifySelectors: ["#report-container", ".some-key-report-element"] // Replace with your actual selectors
        },
      },
      // Add more param sets as needed
    };

    this.testParams = this.testParamsMap[this.paramKey] || this.testParamsMap.default;

    // Store dynamic locators scraped from latest scrape
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
    await this.page.waitForLoadState("networkidle");
    console.log(`[${new Date().toISOString()}] Clicked '${locatorName}'`);
  }

  async fillInput(locatorName, value) {
    const locatorFunc = this.locators[locatorName] || this.dynamicLocators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    const element = locatorFunc.length ? await locatorFunc() : locatorFunc();
    console.log(`[${new Date().toISOString()}] Waiting for '${locatorName}' to be visible before fill`);
    await element.waitFor({ state: "visible", timeout: 15000 });
    await element.fill(value);
    await this.page.waitForLoadState("networkidle");
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

  // Generic method: get selected option label or value of any select element locator
  async getSelectedOption(locatorName) {
    const locatorFunc = this.locators[locatorName] || this.dynamicLocators[locatorName];
    if (!locatorFunc) throw new Error(`Locator '${locatorName}' not found`);
    const selectElement = locatorFunc.length ? await locatorFunc() : locatorFunc();
    return selectElement.evaluate((select) => {
      const selectedOption = select.selectedOptions[0];
      return selectedOption ? selectedOption.label || selectedOption.value : null;
    });
  }

  /**
   * Navigate to another report section by clicking UI buttons/links outside iframe.
   * @param {string} buttonName - button text
   * @param {string} linkName - link text
   */
  async navigateToReportSection(buttonName, linkName) {
    console.log(`[${new Date().toISOString()}] Navigating to section via button/link: ${buttonName} / ${linkName}`);
    const btn = this.locators.navButtonByName(buttonName, true);
    await btn.waitFor({ state: "visible", timeout: 15000 });
    await btn.click();
    await this.page.waitForLoadState("networkidle");

    const link = this.locators.navLinkByName(linkName);
    await link.waitFor({ state: "visible", timeout: 15000 });
    await link.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Dynamically update locators from scraped locatorMap
   * @param {Map<string, string>} locatorMap - Map of key => selector string from scrape
   */
  updateLocatorsFromScrape(locatorMap) {
    if (!locatorMap || !(locatorMap instanceof Map)) {
      console.warn(`[${new Date().toISOString()}] updateLocatorsFromScrape: invalid locatorMap provided.`);
      return;
    }

    let updateCount = 0;

    for (const [key, selector] of locatorMap.entries()) {
      if (!key || !selector) continue;

      const existing = this.locators[key] || this.dynamicLocators[key];

      // If locator already exists and selector is unchanged, skip
      if (existing && typeof existing === "function") {
        // Can't easily compare selectors if existing is a function
        // To keep simple: always overwrite in dynamicLocators to ensure latest selector used
        this.dynamicLocators[key] = () => this.page.locator(selector);
        updateCount++;
      } else {
        // Add new dynamic locator
        this.dynamicLocators[key] = () => this.page.locator(selector);
        updateCount++;
      }
    }

    console.log(`[${new Date().toISOString()}] updateLocatorsFromScrape: Updated/Added ${updateCount} locators dynamically.`);
  }

  /** Static array of tracked work items relevant to this suite */
  static workItems = [
    "WI#277087 - https://dev.azure.com/Lithia Motors/Data and Apps/_workitems/edit/277087"
  ];
}

module.exports = { PD20MainPage };