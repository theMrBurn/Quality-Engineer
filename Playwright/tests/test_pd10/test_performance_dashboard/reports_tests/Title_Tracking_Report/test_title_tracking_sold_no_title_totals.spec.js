const { test, expect } = require("@playwright/test");
const {
  MainStoreLogin,
} = require("../../../test_spe_dashboard_login/login_spe/main_store_login.js");

test.describe.serial("Performance Dashboard 1.0 - /login_spe  @e2e", () => {
  let mainStoreLogin;

  test.beforeEach(async ({ page }) => {
    mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();
  });

  test("Performance Dashboard - Attempt login to SPE", async ({ page }) => {
    const elementsToCheck = ["getUsername", "getPassword", "signInButton"];

    try {
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
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test.afterEach(async ({ context }) => {
    await context.close();
    console.log("Cleaning up after test");
  });
});
