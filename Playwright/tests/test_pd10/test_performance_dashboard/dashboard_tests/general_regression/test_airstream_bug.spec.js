const { test, expect } = require("@playwright/test");
const { Airstream } = require("./airstream_bug"); // Adjust the path as necessary

test.use("Playwright/helpers/login/pd1_dev_env_login.json");

// test 1
test.describe.serial("/airstream_regression_dev", () => {
  test("Airstream Regression bugs", async ({ browser }) => {
    const page = await browser.newPage();
    const airstream = new Airstream(page);

    await page.goto("/main/store");
    await page.waitForLoadState("load");

    try {
      // Array of elements for multi-store selection
      const multiStoreElements = [
        "getMultiStore",
        "getSelectGroup",
        "getPfaffCheck",
        "getAirstreamGroup",
        "getSelectGroup",
        "getStoreSelector",
        "getMultiStore",
        "getCalifornia",
        "getIdaho",
        "getOregon",
        "getWashington",
        "getStoreSelector",
      ];

      // Click through multi-store elements
      for (const element of multiStoreElements) {
        await airstream.clickElement(element);
      }

      await page.waitForLoadState("networkidle");

      // Assertions for pacing elements
      const pacingElements = ["getPacing1", "getPacing2", "getPacing3"];
      for (const element of pacingElements) {
        await airstream.checkElementVisibility(element);
      }

      // Sales tab interactions
      await airstream.clickElement("getSalesTab");

      // Array of elements for new vehicle section
      const newVehicleElements = [
        "getSalesNewVehicle",
        "getSalesNewInventoryDetail",
      ];

      for (const element of newVehicleElements) {
        await airstream.clickElement(element);
      }

      await page.waitForLoadState("networkidle");

      // Fairfield NVI
      await airstream.clickElement("getFairfieldNVI");
      await page.waitForLoadState("networkidle");

      // Assertions for on-ground elements
      const onGroundElements = [
        "getOnGroundMake",
        "getOnGroundModel",
        "getOnGroundNVI",
        "getOnGroundNVI2",
      ];
      for (const element of onGroundElements) {
        await airstream.checkElementVisibility(element);
      }

      // Used vehicle section
      await airstream.clickElement("getSalesTab");

      // Array of elements for used vehicle section
      const usedVehicleElements = [
        "getSalesUsedVehicle",
        "getSalesUsedInventoryDetail",
      ];

      for (const element of usedVehicleElements) {
        await airstream.clickElement(element);
      }

      await page.waitForLoadState("networkidle");

      // Fairfield UVI
      await airstream.clickElement("getFairfieldUVI");
      await page.waitForLoadState("networkidle");

      // Assertion for on-ground UVI element
      await airstream.checkElementVisibility("getOnGroundUVI2");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    } finally {
      await page.close();
    }
  });

  // test 2
  test("Airstream Regression bugs - Store Name Validation", async ({
    browser,
  }) => {
    const page = await browser.newPage();
    const airstream = new Airstream(page);

    await airstream.goto();
    await page.waitForLoadState("load");

    try {
      // Validate The Store Names method
      await page.waitForLoadState("networkidle");
      await page.waitForLoadState("load");
      await airstream.clickElement("getMultiStore");
      await airstream.clickElement("getSelectGroup");
      await airstream.clickElement("getPfaffCheck");
      await airstream.clickElement("getAirstreamGroup");
      await airstream.clickElement("getSelectGroup");
      await page.locator(".allSelectorIndicator").click();
      await airstream.clickElement("getCalifornia");

      // Assertions for store names in California
      await expect(
        page.locator('label:has-text("Bay Area Airstream Adventures")'),
      ).toBeVisible();
      await expect(
        page.locator('label:has-text("South Bay Airstream Adventures")'),
      ).toBeVisible();

      await airstream.clickElement("getIdaho");
      await page.waitForLoadState("load");

      // Assertions for store names in Idaho
      await expect(
        page.locator('li:has-text("Boise Airstream Adventures")').nth(1),
      ).toBeVisible();

      await airstream.clickElement("getOregon");

      // Assertions for store names in Oregon
      await expect(
        page.locator('label:has-text("Portland Airstream Adventures")'),
      ).toBeVisible();
      await expect(
        page.locator('label:has-text("Ultimate Airstreams")'),
      ).toBeVisible();

      await airstream.clickElement("getWashington");

      // Assertions for store names in Washington
      await expect(
        page.locator('label:has-text("Seattle Airstream Adventures")'),
      ).toBeVisible();
      await expect(
        page.locator('label:has-text("Spokane Airstream Adventures")'),
      ).toBeVisible();

      await airstream.clickElement("getStoreSelector");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    } finally {
      await page.close();
    }
  });
});
