const { expect } = require("@playwright/test");

class PD20MainPage {
   /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

  }

    async goto() {
    await this.page.goto("/performancedashboard");
    await this.page.waitForLoadState("load");
  }
}

module.exports = { PD20MainPage };