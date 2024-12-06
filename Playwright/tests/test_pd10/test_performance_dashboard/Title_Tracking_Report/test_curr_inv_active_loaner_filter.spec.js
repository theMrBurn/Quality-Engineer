const { test, expect } = require("@playwright/test");
const {
  MainStoreLogin,
} = require("../../test_spe_dashboard_login/login_spe/main_store_login.js");
const { TitleTracking } = require("./title_tracking");

test.describe.serial("/title_tracking_prod", () => {
  test.fixme(
    "the fix is to gut these tests after establishing better flow and use cases",
  );

  let titleTrackingLogin;
  let titleTracking;

  test.beforeEach(async ({ page }) => {
    titleTrackingLogin = new MainStoreLogin(page);
    titleTracking = new TitleTracking(page);
    await titleTrackingLogin.goto();
    await titleTrackingLogin.login();
    await titleTrackingLogin.twostepauthlogin();
  });

  test("Title Tracking", async function ({ page }) {
    const titleTracking = new TitleTracking(page);

    try {
      await titleTracking.goto();

      await titleTracking.checkElementVisibility("getOfficeTab");
      await titleTracking.clickElement("getOfficeTab");
      await titleTracking.clickElement("getOfficeTitleTracking");
      await titleTracking.clickElement("getCurrentInv");

      // Start of `validateVin` function content
      await titleTracking.clickElement("getCurrentInv");
      await titleTracking.clickElement("getStore");
      for (const vin of titleTracking.locators.vins) {
        await expect(vin()).not.toBeVisible();
      }
    } catch (error) {
      console.error("An error occurred during VIN validation:", error);
      throw error;
    }
  });

  test.afterEach(async ({ context }) => {
    await context.close();
    console.log("Cleaning up after test");
  });
});
