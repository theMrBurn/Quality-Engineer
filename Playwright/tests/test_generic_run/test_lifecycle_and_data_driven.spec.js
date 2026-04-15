// Lifecycle hooks (beforeEach/afterEach) + data-driven loop pattern showcase.
// Demonstrates: per-test setup/teardown via baseTest hooks, generated tests from
// an external JSON fixture, baseTest sweep firing on each generated case.
//
// Target: https://the-internet.herokuapp.com

const { baseTest } = require("../../base/baseTest");
const { InternetDemoPage } = require("./internet_demo_page");
const testInputs = require("./data/test_inputs.json");

baseTest.describe("Lifecycle hooks + data-driven loop @lifecycle @internet", () => {
  let demo;

  baseTest.beforeEach(async ({ page }, testInfo) => {
    demo = new InternetDemoPage(page);
    testInfo._pomClass = InternetDemoPage;
    await demo.goto();
    console.log(`[lifecycle] beforeEach for: ${testInfo.title}`);
  });

  baseTest.afterEach(async ({}, testInfo) => {
    console.log(
      `[lifecycle] afterEach for: ${testInfo.title} (status: ${testInfo.status})`
    );
  });

  // Data-driven — one test generated per fixture row.
  for (const link of testInputs.landingLinks) {
    baseTest(`Landing link visible: ${link.key}`, async ({ sweep }) => {
      sweep();
      await demo.checkElementVisibility(link.key);
    });
  }
});
