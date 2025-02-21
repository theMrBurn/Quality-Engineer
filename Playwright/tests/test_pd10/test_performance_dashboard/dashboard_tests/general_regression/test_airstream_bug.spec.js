// dependencies
const { test, expect } = require("@playwright/test");
const { Airstream } = require("./airstream_bug"); // Adjust the path as necessary

// test 1
test.describe.serial("/airstream_regression_dev", () => {
  let page;
  let airstream;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    airstream = new Airstream(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Airstream Regression bugs", async function () {
    await airstream.goto();
    await page.waitForLoadState("load");

    try {
      // AirstreamStoreSelector method
      await airstream.locators.getMultiStore().nth(2).click();
      await airstream.locators.getSelectGroup().click();
      await airstream.locators.getPfaffCheck().click();
      await airstream.locators.getPfaffCheck().click(); // Duplicate click may be redundant, double-check
      await airstream.locators.getAirstreamGroup().click();
      await airstream.locators.getSelectGroup().click();
      await airstream.locators.getStoreSelector().click();
      await airstream.locators.getMultiStore().nth(2).click();
      await airstream.locators.getCalifornia().click();
      await airstream.locators.getIdaho().nth(2).click();
      await airstream.locators.getOregon().nth(2).click();
      await airstream.locators.getWashington().nth(2).click();
      await airstream.locators.getStoreSelector().click();
      await page.waitForLoadState("networkidle");

      // Assertions for pacing elements
      await expect(airstream.locators.getPacing1()).toBeVisible();
      await expect(airstream.locators.getPacing2()).toBeVisible();
      await expect(airstream.locators.getPacing3()).toBeVisible();

      // Sales tab
      await airstream.locators.getSalesTab().click();
      await airstream.locators.getSalesNewVehicle().click();
      await airstream.locators.getSalesNewInventoryDetail().click();
      await page.waitForLoadState("networkidle");

      // Fairfield NVI
      await airstream.locators.getFairfieldNVI().click();
      await page.waitForLoadState("networkidle");

      // Assertions for on-ground elements
      await expect(airstream.locators.getOnGroundMake()).toBeVisible();
      await expect(airstream.locators.getOnGroundModel()).toBeVisible();
      await expect(airstream.locators.getOnGroundNVI()).toBeVisible();
      await expect(airstream.locators.getOnGroundNVI2()).toBeVisible();

      // Used vehicle section
      await airstream.locators.getSalesTab().click();
      await airstream.locators.getSalesUsedVehicle().click();
      await airstream.locators.getSalesUsedInventoryDetail().click();
      await page.waitForLoadState("networkidle");

      // Fairfield UVI
      await airstream.locators.getFairfieldUVI().click();
      await page.waitForLoadState("networkidle");

      // Assertion for on-ground UVI element
      await expect(airstream.locators.getOnGroundUVI2()).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  // test 2
  test("Airstream Regression bugs - Store Name Validation", async function () {
    await airstream.goto();
    await page.waitForLoadState("load");

    try {
      // Validate The Store Names method
      await page.waitForLoadState("networkidle");
      await page.waitForLoadState("load");
      await airstream.locators.getMultiStore().nth(2).click();
      await airstream.locators.getSelectGroup().click();
      await airstream.locators.getPfaffCheck().click();
      await airstream.locators.getPfaffCheck().click(); // Duplicate click may be redundant, double-check
      await airstream.locators.getAirstreamGroup().click();
      await airstream.locators.getSelectGroup().click();
      await page.locator(".allSelectorIndicator").click();
      await airstream.locators.getCalifornia().click();

      // Assertions for store names in California
      expect(
        page.locator('label:has-text("Bay Area Airstream Adventures")'),
      ).toBeVisible();
      expect(
        page.locator('label:has-text("South Bay Airstream Adventures")'),
      ).toBeVisible();

      await airstream.locators.getIdaho().nth(2).click();
      await page.waitForLoadState("load");

      // Assertions for store names in Idaho
      expect(
        page.locator('li:has-text("Boise Airstream Adventures")').nth(1),
      ).toBeVisible();

      await airstream.locators.getOregon().nth(2).click();

      // Assertions for store names in Oregon
      expect(
        page.locator('label:has-text("Portland Airstream Adventures")'),
      ).toBeVisible();
      expect(
        page.locator('label:has-text("Ultimate Airstreams")'),
      ).toBeVisible();

      await airstream.locators.getWashington().nth(2).click();

      // Assertions for store names in Washington
      expect(
        page.locator('label:has-text("Seattle Airstream Adventures")'),
      ).toBeVisible();
      expect(
        page.locator('label:has-text("Spokane Airstream Adventures")'),
      ).toBeVisible();

      await airstream.locators.getStoreSelector().click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
