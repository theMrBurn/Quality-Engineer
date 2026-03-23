class PD20MainPage {
  constructor(page, paramKey = "default") {
    this.page = page;
    this.paramKey = paramKey;

    this.locators = {
      powerBIFrameSelector: 'iframe[src*="powerbi.com"]',
      salesButton: () => this.page.getByRole("button", { name: "Sales", exact: true }),
      navLinkByName: (name) => this.page.getByRole("link", { name }),
      // Add other static locators here as needed
    };

    this._testParamsMap = {
      used_inventory_view: {
        urls: { mainPage: "https://dev.apps.lithiadriveway.com/performance-dashboard/used-inventory" },
        pagination: { targetPageName: "Used Vehicle Inventory" },
        access: { role: "SalesUser", expectedElements: [], permissions: ["read"] },
      },
      new_inventory_view: {
        urls: { mainPage: "https://dev.apps.lithiadriveway.com/performance-dashboard/new-inventory" },
        pagination: { targetPageName: "New Vehicle Inventory" },
        access: { role: "SalesUser", expectedElements: [], permissions: ["read"] },
      },
      default: {
        urls: { mainPage: "https://dev.apps.lithiadriveway.com/performance-dashboard/sales-log" },
        pagination: { targetPageName: "New Inventory" },
        access: { role: "Default", expectedElements: [], permissions: ["read"] },
      },
    };

    this._testParams = this._testParamsMap[this.paramKey] || this._testParamsMap.default;

    this.dynamicLocators = {};
  }

  get testParams() {
    return this._testParams;
  }

  get testParamsMap() {
    return this._testParamsMap;
  }

  /**
   * Returns the Power BI iframe content frame handle.
   * @returns {Promise<import('playwright').Frame|null>}
   */
  async getPowerBIFrame() {
    const frameHandle = await this.page.locator(this.locators.powerBIFrameSelector).elementHandle();
    if (!frameHandle) return null;
    return frameHandle.contentFrame();
  }

  /**
   * Update dynamic locators with unique keys from scraped locatorMap.
   * Does NOT overwrite existing static locators.
   * Logs newly discovered unique locators or logs zero if none found.
   *
   * @param {Map<string,string>} locatorMap
   */
  updateLocatorsFromScrape(locatorMap) {
    if (!(locatorMap instanceof Map)) {
      console.warn("updateLocatorsFromScrape called with invalid locatorMap.");
      return;
    }

    const uniqueLocators = [];

    for (const [key, selector] of locatorMap.entries()) {
      if (!key || !selector) continue;

      // Add only if not in static or dynamic locators
      if (!this.locators.hasOwnProperty(key) && !this.dynamicLocators.hasOwnProperty(key)) {
        this.dynamicLocators[key] = () => this.page.locator(selector);
        uniqueLocators.push({ key, selector });
      }
    }

    if (uniqueLocators.length) {
      console.log(`[New Discovery] ${uniqueLocators.length} unique locators found by scraper:`);
      for (const { key, selector } of uniqueLocators) {
        console.log(`  Key: "${key}" | Selector: "${selector}"`);
      }
    } else {
      console.log("Scraper found 0 unique elements (all exist in POM).");
    }
  }

  /**
   * Navigates to the main page based on testParams URL.
   */
  async goto() {
    await this.page.goto(this._testParams.urls.mainPage);
  }
}

module.exports = { PD20MainPage };