// Iframe handshake pattern showcase — embedded TinyMCE editor.
// Demonstrates: frameLocator usage, retry-on-bind-delay for async iframe content,
// reading from iframe DOM after interaction. baseTest sweep runs in passive parallel.
//
// Target: https://the-internet.herokuapp.com/iframe

const { expect } = require("@playwright/test");
const { baseTest } = require("../../base/baseTest");
const { IframeDemoPage } = require("./iframe_demo_page");

baseTest.describe.serial("Iframe handshake — TinyMCE editor @iframe", () => {
  baseTest(
    "Type into iframe-embedded editor and read it back",
    async ({ page, sweep }, testInfo) => {
      const iframeDemo = new IframeDemoPage(page);
      testInfo._pomClass = IframeDemoPage;
      await iframeDemo.goto();
      sweep();

      await expect(iframeDemo.locators.pageHeader()).toBeVisible();

      const sampleText = "passive parallel demo";
      await iframeDemo.typeIntoEditor(sampleText);

      const readBack = await iframeDemo.readEditorText();
      expect(readBack).toContain(sampleText);
    }
  );
});
