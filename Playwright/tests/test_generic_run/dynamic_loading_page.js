// POM for https://the-internet.herokuapp.com/dynamic_loading — async element load.
// Used by the network-probe spec to demonstrate explicit NetworkInterceptor usage.
const { BasePOM } = require("../../base/BasePOM");

class DynamicLoadingPage extends BasePOM {
  static expectedLocators = [
    "pageHeader",
    "example2Link",
    "startButton",
    "loadedText",
  ];

  static fallbacks = {
    startButton: ['button:has-text("Start")'],
  };

  constructor(page) {
    super(page);
    this.locators = {
      pageHeader: () =>
        this.page.getByRole("heading", {
          name: /Dynamically Loaded Page Elements/i,
        }),
      example1Link: () => this.page.getByRole("link", { name: /Example 1/i }),
      example2Link: () => this.page.getByRole("link", { name: /Example 2/i }),
      startButton: () => this.page.getByRole("button", { name: "Start" }),
      loadedText: () => this.page.locator("#finish"),
    };
  }

  async goto() {
    await this.page.goto("/dynamic_loading");
    await this.page.waitForLoadState("load");
  }

  async gotoExample2() {
    await this.locators.example2Link().click();
    await this.page.waitForLoadState("load");
  }

  async startAndWait() {
    await this.locators.startButton().click();
    await this.locators.loadedText().waitFor({ state: "visible" });
  }
}

module.exports = { DynamicLoadingPage };
