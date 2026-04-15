const { expect } = require("@playwright/test");
const { HealCache } = require("./healCache");

/**
 * BasePOM — base class for all feature Page Object Models.
 *
 * Design contract:
 * - this.locators is the SOURCE OF TRUTH for expected page elements
 * - static expectedLocators lists locator keys baseTest should auto-validate
 * - All wait states use "load" not "networkidle" to prevent hangs on polling pages
 * - Methods throw on failure so try blocks in test files own the hard fail decision
 * - BasePOM never swallows errors silently — it surfaces them with context
 *
 * Subclasses must:
 * - Define this.locators in constructor after super(page)
 * - Define static expectedLocators = [] with keys matching this.locators
 * - Override goto() with their specific route
 */
class BasePOM {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {};

    // Approach 3 pathway: load static fallbacks declared on the subclass.
    // POM subclasses opt in by declaring:
    //   static fallbacks = { locatorKey: ['#sel1', 'button[name="x"]'] }
    // No changes required in test files — BasePOM handles it automatically.
    HealCache.loadFromPOM(this.constructor);
  }

  /**
   * Default navigation — subclasses override with specific route.
   */
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  /**
   * Assert a locator is visible.
   * Throws with locator name context so test try block can surface it cleanly.
   * @param {string} locatorName - key from this.locators
   */
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFn = this.locators[locatorName];

    if (!locatorFn) {
      throw new Error(
        `[BasePOM] checkElementVisibility: no locator registered for key '${locatorName}'`
      );
    }

    try {
      const element = locatorFn().first();
      await expect(element).toBeVisible();
    } catch (originalError) {
      // Try HealCache fallback selectors before giving up.
      // Populated by baseTest teardown from golden selectors and Approach 3 static fallbacks.
      for (const selector of HealCache.get(locatorName)) {
        try {
          await expect(this.page.locator(selector).first()).toBeVisible();
          HealCache.logHeal(locatorName, selector, "checkElementVisibility");
          return;
        } catch {
          // try next fallback
        }
      }
      throw new Error(
        `[BasePOM] Locator '${locatorName}' not visible: ${originalError.message}`
      );
    }
  }

  /**
   * Assert a locator contains expected text.
   * @param {string} locatorName - key from this.locators
   * @param {string} expectedText
   */
  async checkElementText(locatorName, expectedText) {
    await this.page.waitForLoadState("load");
    const locatorFn = this.locators[locatorName];

    if (!locatorFn) {
      throw new Error(
        `[BasePOM] checkElementText: no locator registered for key '${locatorName}'`
      );
    }

    try {
      const element = locatorFn().first();
      await expect(element).toContainText(expectedText);
    } catch (originalError) {
      for (const selector of HealCache.get(locatorName)) {
        try {
          await expect(this.page.locator(selector).first()).toContainText(expectedText);
          HealCache.logHeal(locatorName, selector, "checkElementText");
          return;
        } catch {
          // try next fallback
        }
      }
      throw new Error(
        `[BasePOM] Locator '${locatorName}' text check failed: ${originalError.message}`
      );
    }
  }

  /**
   * Click an element by locator key.
   * Uses "load" wait state post-click to avoid networkidle hangs.
   * @param {string} locatorName - key from this.locators
   */
  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFn = this.locators[locatorName];

    if (!locatorFn) {
      throw new Error(
        `[BasePOM] clickElement: no locator registered for key '${locatorName}'`
      );
    }

    try {
      const element = locatorFn().first();
      await element.click();
      await this.page.waitForLoadState("load");
    } catch (originalError) {
      for (const selector of HealCache.get(locatorName)) {
        try {
          await this.page.locator(selector).first().click();
          await this.page.waitForLoadState("load");
          HealCache.logHeal(locatorName, selector, "clickElement");
          return;
        } catch {
          // try next fallback
        }
      }
      throw new Error(
        `[BasePOM] Click on '${locatorName}' failed: ${originalError.message}`
      );
    }
  }

  /**
   * Fill one or more form fields by locator key.
   * @param {Object} testData - { locatorKey: value, ... }
   */
  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFn = this.locators[key];

      if (!locatorFn) {
        console.warn(`[BasePOM] fillForm: no locator registered for key '${key}' — skipping`);
        continue;
      }

      try {
        await this.page.waitForLoadState("load");
        const element = locatorFn();
        await element.fill(value);
      } catch (originalError) {
        let healed = false;
        for (const selector of HealCache.get(key)) {
          try {
            await this.page.locator(selector).first().fill(value);
            HealCache.logHeal(key, selector, "fillForm");
            healed = true;
            break;
          } catch {
            // try next fallback
          }
        }
        if (!healed) {
          throw new Error(
            `[BasePOM] Fill on '${key}' failed: ${originalError.message}`
          );
        }
      }
    }
  }

  /**
   * Click the first row of a grid by CSS selector.
   * @param {string} gridSelector - CSS selector string
   */
  async findFirstGridRow(gridSelector) {
    await this.page.waitForSelector(gridSelector);
    const rows = await this.page.$$(gridSelector);

    if (rows.length > 0) {
      const firstRow = rows[0];
      await this.page.evaluate((el) => {
        if (!el.isConnected) throw new Error("Grid row is not attached to DOM");
      }, firstRow);
      await firstRow.click();
      console.log(`[BasePOM] Clicked first grid row for selector: ${gridSelector}`);
    } else {
      console.warn(`[BasePOM] No grid rows found for selector: ${gridSelector}`);
    }
  }
}

module.exports = { BasePOM };