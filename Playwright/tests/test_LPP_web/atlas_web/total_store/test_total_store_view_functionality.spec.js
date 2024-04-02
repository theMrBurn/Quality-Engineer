// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { TotalStoreView } = require("./total_store_view");
const AtlasLogin = require("../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe
  .serial("Atlas Web - Total Store Page Functional Tests @func", () => {
  test("Navigate to Total Store View and validate Additional Income, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await totalStoreView.locators.ai2024AOPinput().clear();
      await totalStoreView.locators.aiPotentialInput().clear();
      await totalStoreView.locators.aiUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Total Store View and validate Additional Income, bad input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await totalStoreView.locators.ai2024AOPinput().clear("1701");
      await totalStoreView.locators.aiPotentialInput().clear("2000");
      await totalStoreView.locators.ai2024AOPinput().fill(",./");
      await totalStoreView.locators.aiPotentialInput().fill(",./");
      await totalStoreView.locators.aiUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Total Store View and validate Additional Income input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid amount and click Update - vaidate Update Success
      await totalStoreView.locators.ai2024AOPinput().fill("1701");
      await totalStoreView.locators.aiPotentialInput().fill("2000");
      await totalStoreView.locators.aiUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Total Store View and validate top Complete Button functions as expected, but cancel before complete", async ({
    browser,
    page,
  }) => {
    const totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await page.waitForLoadState("load");
      await totalStoreView.locators.topCompleteButton().click();

      await expect(
        totalStoreView.locators.completeSectionModal(),
      ).toBeVisible();
      await totalStoreView.locators.cancelComplete().click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Total Store View and validate bottom Complete Button functions as expected, but cancel before complete", async ({
    browser,
    page,
  }) => {
    const totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //click complete - vaidate complete confirmation modal
      await page.waitForLoadState("load");
      await totalStoreView.locators.bottomCompleteButton().click();

      await expect(
        totalStoreView.locators.completeSectionModal(),
      ).toBeVisible();
      await totalStoreView.locators.cancelComplete().click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Total Store View and validate bottom Complete Button functions as expected, including full Complete success", async ({
    browser,
    page,
  }) => {
    const totalStoreView = new TotalStoreView(page);
    await totalStoreView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //click complete - vaidate complete confirmation modal
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Total Store Operations" }).click();
    await page.getByText("Total Store", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //click complete - vaidate complete confirmation modal
      await page.waitForLoadState("load");
      await totalStoreView.locators.bottomCompleteButton().click();

      await expect(
        totalStoreView.locators.completeSectionModal(),
      ).toBeVisible();
      await totalStoreView.locators.cancelComplete().click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });
});
