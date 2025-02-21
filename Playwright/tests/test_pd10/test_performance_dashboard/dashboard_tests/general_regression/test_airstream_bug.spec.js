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
      await airstream.clickElement('getMultiStore');
      await airstream.clickElement('getSelectGroup');
      await airstream.clickElement('getPfaffCheck');
      await airstream.clickElement('getPfaffCheck'); // Duplicate click may be redundant, double-check
      await airstream.clickElement('getAirstreamGroup');
      await airstream.clickElement('getSelectGroup');
      await airstream.clickElement('getStoreSelector');
      await airstream.clickElement('getMultiStore');
      await airstream.clickElement('getCalifornia');
      await airstream.clickElement('getIdaho');
      await airstream.clickElement('getOregon');
      await airstream.clickElement('getWashington');
      await airstream.clickElement('getStoreSelector');
      await page.waitForLoadState("networkidle");

      // Assertions for pacing elements
      await airstream.checkElementVisibility('getPacing1');
      await airstream.checkElementVisibility('getPacing2');
      await airstream.checkElementVisibility('getPacing3');

      // Sales tab
      await airstream.clickElement('getSalesTab');
      await airstream.clickElement('getSalesNewVehicle');
      await airstream.clickElement('getSalesNewInventoryDetail');
      await page.waitForLoadState("networkidle");

      // Fairfield NVI
      await airstream.clickElement('getFairfieldNVI');
      await page.waitForLoadState("networkidle");

      // Assertions for on-ground elements
      await airstream.checkElementVisibility('getOnGroundMake');
      await airstream.checkElementVisibility('getOnGroundModel');
      await airstream.checkElementVisibility('getOnGroundNVI');
      await airstream.checkElementVisibility('getOnGroundNVI2');

      // Used vehicle section
      await airstream.clickElement('getSalesTab');
      await airstream.clickElement('getSalesUsedVehicle');
      await airstream.clickElement('getSalesUsedInventoryDetail');
      await page.waitForLoadState("networkidle");

      // Fairfield UVI
      await airstream.clickElement('getFairfieldUVI');
      await page.waitForLoadState("networkidle");

      // Assertion for on-ground UVI element
      await airstream.checkElementVisibility('getOnGroundUVI2');
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
      await airstream.clickElement('getMultiStore');
      await airstream.clickElement('getSelectGroup');
      await airstream.clickElement('getPfaffCheck');
      await airstream.clickElement('getPfaffCheck'); // Duplicate click may be redundant, double-check
      await airstream.clickElement('getAirstreamGroup');
      await airstream.clickElement('getSelectGroup');
      await page.locator(".allSelectorIndicator").click();
      await airstream.clickElement('getCalifornia');

      // Assertions for store names in California
      await expect(page.locator('label:has-text("Bay Area Airstream Adventures")')).toBeVisible();
      await expect(page.locator('label:has-text("South Bay Airstream Adventures")')).toBeVisible();

      await airstream.clickElement('getIdaho');
      await page.waitForLoadState("load");

      // Assertions for store names in Idaho
      await expect(page.locator('li:has-text("Boise Airstream Adventures")').nth(1)).toBeVisible();

      await airstream.clickElement('getOregon');

      // Assertions for store names in Oregon
      await expect(page.locator('label:has-text("Portland Airstream Adventures")')).toBeVisible();
      await expect(page.locator('label:has-text("Ultimate Airstreams")')).toBeVisible();

      await airstream.clickElement('getWashington');

      // Assertions for store names in Washington
      await expect(page.locator('label:has-text("Seattle Airstream Adventures")')).toBeVisible();
      await expect(page.locator('label:has-text("Spokane Airstream Adventures")')).toBeVisible();

      await airstream.clickElement('getStoreSelector');
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
