// Explicit NetworkInterceptor usage — independent of the sweep fixture's internal use.
// Demonstrates: manual interceptor lifecycle (reset/intercept/snapshot/teardown),
// coexistence with sweep (both observers attach to the same page), assertion against
// captured request traffic.
//
// Target: https://the-internet.herokuapp.com/dynamic_loading

const { expect } = require("@playwright/test");
const { baseTest } = require("../../base/baseTest");
const NetworkInterceptor = require("../../helpers/utils/network_interceptor");
const { DynamicLoadingPage } = require("./dynamic_loading_page");

baseTest.describe.serial(
  "NetworkInterceptor — explicit start/stop @network @internet",
  () => {
    baseTest(
      "Capture request traffic during dynamic load and assert on it",
      async ({ page, sweep }, testInfo) => {
        const dynLoad = new DynamicLoadingPage(page);
        testInfo._pomClass = DynamicLoadingPage;

        // Manual interceptor lifecycle. baseTest's sweep also uses NetworkInterceptor
        // internally — both share the same static state, so reset() before measuring.
        NetworkInterceptor.reset();
        await NetworkInterceptor.interceptRequests(page);

        await dynLoad.goto();
        await dynLoad.gotoExample2();
        await dynLoad.startAndWait();
        sweep();

        const calls = NetworkInterceptor.snapshot();
        console.log(
          `[networkProbe] captured ${calls.length} HTTP exchanges during dynamic load`
        );
        expect(calls.length).toBeGreaterThan(0);
        expect(calls.some((c) => c.url.includes("dynamic_loading"))).toBe(true);

        NetworkInterceptor.teardown(page);
      }
    );
  }
);
