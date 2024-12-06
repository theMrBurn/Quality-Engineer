const { expect } = require("@playwright/test");

class MainStoreLogin {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      getUsername: () => this.page.locator("id=i0116"),
      getPassword: () => this.page.locator("id=i0118"),
      signInButton: () => this.page.locator("id=idSIButton9"),
      kmsiCheckbox: () => this.page.locator("id=KmsiCheckboxField"),
    };
  }

  async goto() {
    await this.page.goto("/main/store");
    await this.page.waitForLoadState("load");
  }

  async login() {
    await this.locators.getUsername().click();
    await this.page
      .locator('input[id="i0116"]')
      .fill("t_PerfDash_01@lithia.com");
    await this.locators.signInButton().click();
    await this.locators.getPassword().click();
    await this.page
      .locator('input[name="passwd"]')
      .fill("GkCow**!#w#)4E#Sj3Rb8KS*TkGduz");
    await this.page.click("text=Sign In");
  }

  async twostepauthlogin() {
    await this.locators.kmsiCheckbox().click();
    await this.locators.signInButton().click();
  }

  // get page elements
  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /// interact with elements

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];

    try {
      await this.page.waitForLoadState("load");
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        await this.page.waitForLoadState("networkidle");
        const inputElement = await locatorFunction();
        await inputElement.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }
}

module.exports = { MainStoreLogin };
