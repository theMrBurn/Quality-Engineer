// Generic POC - full stack feature demo
// Target: https://the-internet.herokuapp.com (open source QA playground)
// Demonstrates: POM usage, functional flows, pageIdentityProbe telemetry,
// native API request context, sweep fixture regression snapshot, tags,
// slow annotation, skip annotation, describe.serial.

// dependancies
const { expect } = require("@playwright/test");
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
baseTest.describe.serial("generic_POC - Page Elements @smoke @demo @internet", () => {
  baseTest("Navigate to the-internet landing page and validate basic elements have loaded as expected", async ({ page, sweep }, testInfo) => {
    const demo = new InternetDemoPage(page);
    testInfo._pomClass = InternetDemoPage;
    await demo.goto();
    sweep();

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
baseTest.describe.serial("generic_POC - Form Authentication Functional Tests @func @demo @internet", () => {
  baseTest.slow();

  baseTest("Navigate to Form Authentication and validate successful login renders Secure Area as expected", async ({ page, sweep }, testInfo) => {
    const demo = new InternetDemoPage(page);
    testInfo._pomClass = InternetDemoPage;
    await demo.goto();
    sweep();

    try {
      await demo.gotoFormAuth();
      await expect(demo.locators.loginFormHeader()).toBeVisible();
      await demo.login(testData.login.username, testData.login.password);

      await expect(demo.locators.successFlash()).toBeVisible();
      await expect(demo.locators.successFlash()).toContainText(
        testData.expectedText.successFlash,
      );
      await expect(demo.locators.secureAreaHeader()).toBeVisible();
      await expect(demo.locators.logoutButton()).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  baseTest("Navigate to Form Authentication and validate invalid credentials render error flash as expected", async ({ page, sweep }, testInfo) => {
    const demo = new InternetDemoPage(page);
    testInfo._pomClass = InternetDemoPage;
    await demo.goto();
    sweep();

    try {
      await demo.gotoFormAuth();
      await demo.login(testData.login.badUsername, testData.login.badPassword);

      await expect(demo.locators.errorFlash()).toBeVisible();
      await expect(demo.locators.errorFlash()).toContainText(
        testData.expectedText.errorFlash,
      );
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});

//test
baseTest.describe.serial("generic_POC - Page Identity Telemetry Probe @telemetry @demo @internet", () => {
  baseTest("Capture page identity on home and login, then validate the diff flags the route + heading delta", async ({ page, sweep }, testInfo) => {
    const demo = new InternetDemoPage(page);
    testInfo._pomClass = InternetDemoPage;
    await demo.goto();
    sweep();

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
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});

//test
baseTest.describe.serial("generic_POC - API testing @api @demo", () => {
  baseTest("GET /todos/1 returns 200 with expected body shape", async ({ request }) => {
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
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  baseTest.skip("POST /todos returns 400 - intentionally skipped to demonstrate baseTest.skip annotation", async () => {
    // Intentionally skipped - demonstrates baseTest.skip pattern used in this suite.
  });
});

//test
baseTest.describe.serial("generic_POC - Sweep Fixture Regression Demo @sweep @demo @internet", () => {
  baseTest("Sweep /checkboxes and validate Track 2 snapshot written in teardown", async ({
    page,
    sweep,
  }, testInfo) => {
    testInfo._pomClass = InternetDemoPage;

    try {
      await page.goto("/checkboxes");
      await page.waitForLoadState("networkidle");
      sweep(); // fire-and-forget — Track 2 scrape completes in teardown
      await expect(page.locator('input[type="checkbox"]').first()).toBeVisible();
      console.log("sweep: /checkboxes visited, Track 2 scrape will complete in teardown");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
