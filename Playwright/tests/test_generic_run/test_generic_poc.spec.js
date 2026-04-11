// Generic POC - full stack feature demo
// Target: https://the-internet.herokuapp.com (open source QA playground)
// Demonstrates: POM usage, functional flows, pageIdentityProbe telemetry,
// native API request context, sweep fixture regression snapshot, tags,
// slow annotation, skip annotation, describe.serial, beforeEach/afterEach.

// dependencies
const { test, expect } = require("@playwright/test");
const { baseTest } = require("../../base/baseTest");
const { InternetDemoPage } = require("./internet_demo_page");
const {
  pageIdentityProbe,
  diffPageIdentity,
} = require("../../helpers/telemetry/pageIdentityProbe");

// test data (inline JSON, matches pd20_test_data.json pattern)
const testData = {
  login: {
    username: "tomsmith",
    password: "SuperSecretPassword!",
    badUsername: "wronguser",
    badPassword: "wrongpass",
  },
  expectedText: {
    successFlash: "You logged into a secure area!",
    errorFlash: "Your username is invalid!",
  },
  api: {
    baseURL: "https://jsonplaceholder.typicode.com",
    todoEndpoint: "/todos/1",
  },
};

//test
test.describe.serial("generic_POC - Page Elements @smoke @demo", () => {
  let page;
  let demo;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    demo = new InternetDemoPage(page);
    await demo.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to the-internet landing page and validate basic elements have loaded as expected", async () => {
    // Landed on the home page, validate basic elements have loaded
    const locatorNames = [
      "pageHeader",
      "formAuthLink",
      "checkboxesLink",
      "dropdownLink",
      "dynamicLoadingLink",
    ];

    try {
      for (const locatorName of locatorNames) {
        await demo.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});

//test
test.describe
  .serial("generic_POC - Form Authentication Functional Tests @func @demo", () => {
  test.slow();

  let page;
  let demo;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    demo = new InternetDemoPage(page);
    await demo.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Form Authentication and validate successful login renders Secure Area as expected", async () => {
    // Navigate from home to the form auth page
    await demo.locators.formAuthLink().click();
    await page.waitForLoadState("networkidle");

    try {
      // input valid credentials and submit - validate success flash + logout button
      await expect(demo.locators.loginFormHeader()).toBeVisible();
      await demo.locators.usernameInput().fill(testData.login.username);
      await demo.locators.passwordInput().fill(testData.login.password);
      await demo.locators.loginButton().click();
      await page.waitForLoadState("networkidle");

      await expect(demo.locators.successFlash()).toBeVisible();
      await expect(demo.locators.successFlash()).toContainText(
        testData.expectedText.successFlash,
      );
      await expect(demo.locators.secureAreaHeader()).toBeVisible();
      await expect(demo.locators.logoutButton()).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Form Authentication and validate invalid credentials render error flash as expected", async () => {
    // Navigate from home to the form auth page
    await demo.locators.formAuthLink().click();
    await page.waitForLoadState("networkidle");

    try {
      // input invalid credentials and submit - validate error flash
      await demo.locators.usernameInput().fill(testData.login.badUsername);
      await demo.locators.passwordInput().fill(testData.login.badPassword);
      await demo.locators.loginButton().click();
      await page.waitForLoadState("networkidle");

      await expect(demo.locators.errorFlash()).toBeVisible();
      await expect(demo.locators.errorFlash()).toContainText(
        testData.expectedText.errorFlash,
      );
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});

//test
test.describe
  .serial("generic_POC - Page Identity Telemetry Probe @telemetry @demo", () => {
  let page;
  let demo;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    demo = new InternetDemoPage(page);
    await demo.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Capture page identity on home and login, then validate the diff flags the route + heading delta", async () => {
    try {
      // first capture - home page
      const homeIdentity = await pageIdentityProbe(page);
      expect(homeIdentity.title).toBeTruthy();
      expect(homeIdentity.routeSignature).toBe("/");
      expect(homeIdentity.headings.h1.length).toBeGreaterThan(0);
      expect(homeIdentity.visibleTextChars).toBeGreaterThan(0);

      // navigate to a materially different page and re-capture
      await page.goto("/login");
      await page.waitForLoadState("networkidle");
      const loginIdentity = await pageIdentityProbe(page);
      expect(loginIdentity.routeSignature).toBe("/login");

      // diff should flag the route change and the headings delta
      const diff = diffPageIdentity(homeIdentity, loginIdentity);
      expect(diff).not.toBeNull();
      expect(diff.routeSignatureChanged).toBe(true);

      const h2Churn =
        diff.headings.h2.added.length + diff.headings.h2.removed.length;
      expect(h2Churn).toBeGreaterThan(0);

      console.log("pageIdentity diff:", JSON.stringify(diff, null, 2));
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});

//test
test.describe.serial("generic_POC - API testing @api @demo", () => {
  test("GET /todos/1 returns 200 with expected body shape", async ({
    request,
  }) => {
    try {
      // Matches atlas_api pattern: hardcoded baseURL in-test, native `request` context.
      const { baseURL, todoEndpoint } = testData.api;
      const response = await request.get(`${baseURL}${todoEndpoint}`);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty("id", 1);
      expect(body).toHaveProperty("title");
      expect(typeof body.completed).toBe("boolean");
      console.log(JSON.stringify(body));
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test.skip("POST /todos returns 400 - intentionally skipped to demonstrate test.skip annotation", async () => {
    // Intentionally skipped - demonstrates test.skip pattern used in legacy tests.
  });
});

// ---------------------------------------------------------------------------
// Extended baseTest demos (sweep fixture)
//
// The describes above use vanilla @playwright/test to match legacy shape.
// This describe uses the extended baseTest from Playwright/base/baseTest.js
// because the `sweep` fixture is only exposed on the extended instance.
// ---------------------------------------------------------------------------

//test
baseTest.describe
  .serial("generic_POC - Sweep Fixture Regression Demo @sweep @demo", () => {
  baseTest("Sweep /checkboxes and validate snapshot + diff payload", async ({
    sweep,
  }) => {
    try {
      // sweep(url) navigates, scrapes all interactables, softly touches each,
      // and appends/diffs a regression snapshot under Playwright/regression-data.
      const result = await sweep("/checkboxes");

      expect(result).toBeDefined();
      expect(result.locatorMap).toBeDefined();
      expect(result.diff).toBeDefined();

      // locatorMap is a JS Map, not a plain object — use .size, not Object.keys
      const locatorCount = result.locatorMap.size;
      expect(locatorCount).toBeGreaterThan(0);

      console.log(
        `sweep: touched ${locatorCount} interactables on /checkboxes, ` +
          `captured ${result.apiCalls.length} api calls`,
      );
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
