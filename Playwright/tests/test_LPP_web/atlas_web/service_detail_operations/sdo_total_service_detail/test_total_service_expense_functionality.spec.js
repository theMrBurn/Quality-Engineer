// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SDOTotalServiceDetail } = require("./sdoTotalServiceDetail");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe
  .serial("Atlas Web - Page Elements Total Service Detail view @func", () => {
  test("Navigate to Atlas Web, Total Service Detail and validate Total Detail Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sdoTotalServiceDetail = new SDOTotalServiceDetail(page);
    await sdoTotalServiceDetail.goto();
    await page.waitForLoadState("networkidle");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page
      .getByRole("tab", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Total Service/Detail").click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await sdoTotalServiceDetail.locators.tdeAOPinput().clear();
      // await sdoTotalServiceDetail.locators.tdePotential2024input().clear();
      await sdoTotalServiceDetail.locators.tdeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Total Service Detail and validate Total Detail Expense renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sdoTotalServiceDetail = new SDOTotalServiceDetail(page);
    await sdoTotalServiceDetail.goto();
    await page.waitForLoadState("networkidle");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page
      .getByRole("tab", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Total Service/Detail").click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await sdoTotalServiceDetail.locators.tdeAOPinput().clear("1701");
      // await sdoTotalServiceDetail.locators
      //   .tdePotential2024input()
      //   .clear("2000");
      await sdoTotalServiceDetail.locators.tdeAOPinput().fill(",./");
      // await sdoTotalServiceDetail.locators.tdePotential2024input().fill(",./");
      await sdoTotalServiceDetail.locators.tdeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Total Service Detail and validate Total Detail Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const sdoTotalServiceDetail = new SDOTotalServiceDetail(page);
    await sdoTotalServiceDetail.goto();
    await page.waitForLoadState("networkidle");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page
      .getByRole("tab", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Total Service/Detail").click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await sdoTotalServiceDetail.locators.tdeAOPinput().clear("1701");
      await sdoTotalServiceDetail.locators.tdeAOPinput().fill("1701");
      // await sdoTotalServiceDetail.locators
      //   .tdePotential2024input()
      //   .clear("2000");
      //await sdoTotalServiceDetail.locators.tdePotential2024input().fill("2000");
      await sdoTotalServiceDetail.locators.tdeUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
