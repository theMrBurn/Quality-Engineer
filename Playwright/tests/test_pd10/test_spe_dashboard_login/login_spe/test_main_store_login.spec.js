const { test, expect, browsser } = require("@playwright/test");
const { MainStoreLogin } = require("./main_store_login.js");
const fs = require("fs");
const path = require("path");

test.describe.serial("Performance Dashboard 1.0 - /login_spe  @e2e", () => {
  test.beforeEach(async ({ page }) => {
    console.log("Setting up before test");

    // Load session storage before each test
    const storagePath = path.resolve(
      __dirname,
      "Playwright/helpers/login/spe_test_user.json",
    );
    if (fs.existsSync(storagePath)) {
      const storageState = JSON.parse(fs.readFileSync(storagePath, "utf-8"));
      await page.context().addCookies(storageState.cookies);
      await page.context().setLocalStorage(storageState.localStorage);
    }
  });

  test("Performance Dashboard - Attempt login to SPE", async ({ page }) => {
    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();

    try {
      const elementsToCheck = ["getUsername", "getPassword", "signInButton"];

      // Ensure elements are visible before interaction
      for (const element of elementsToCheck) {
        await mainStoreLogin.checkElementVisibility(element);
      }

      // Use fillForm to fill in credentials
      await mainStoreLogin.fillForm({
        getUsername: "t_PerfDash_01@lithia.com",
        getPassword: "GkCow**!#w#)4E#Sj3Rb8KS*TkGduz",
      });

      await mainStoreLogin.login();
      await mainStoreLogin.twostepauthlogin();
      await mainStoreLogin.saveSessionState(); // Save the session state after login
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test.afterEach(async ({ browser, page }) => {
    browser.close();
    console.log("Cleaning up after test");
  });
});
