// POM for https://the-internet.herokuapp.com/iframe — TinyMCE editor in iframe.
// Demonstrates the iframe handshake pattern: frameLocator + retry on bind delay.
const { BasePOM } = require("../../base/BasePOM");

class IframeDemoPage extends BasePOM {
  static expectedLocators = ["pageHeader"];

  constructor(page) {
    super(page);
    this.locators = {
      pageHeader: () =>
        this.page.getByRole("heading", { name: /An iFrame containing/i }),
      iframeFrame: () => this.page.frameLocator("#mce_0_ifr"),
    };
  }

  async goto() {
    await this.page.goto("/iframe");
    await this.page.waitForLoadState("load");
  }

  // Iframe handshake — embedded editor binds asynchronously after page load.
  // Retry pattern: try a few short waits before declaring failure.
  async typeIntoEditor(text) {
    const body = this.locators.iframeFrame().locator("body#tinymce");
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        await body.waitFor({ state: "visible", timeout: 2000 });
        await body.click();
        await body.locator("p").first().fill(text);
        return;
      } catch {
        await this.page.waitForTimeout(500);
      }
    }
    throw new Error(
      "[IframeDemoPage] iframe editor never became interactable after 5 attempts"
    );
  }

  async readEditorText() {
    return await this.locators.iframeFrame().locator("body#tinymce p").first().textContent();
  }
}

module.exports = { IframeDemoPage };
