// Atlas Web

// Import the required dependencies
const { test, expect } = require("@playwright/test");
const { AtlasE2E } = require("./atlas_e2e.js");
const AtlasLogin = require("../../../../helpers/login/atlas_login.js");
const {
  SalesGrossProfitView,
} = require("../../atlas_web/sales_operations/sales_gross_profit/sales_gross_profit_view.js");
const { clear } = require("console");

test.describe
  .serial("Atlas E2E - Assign Employee -> Notify Employee -> Input Sales Data -> Submit for Review -> Submit For Approval -> Unlock Approval -> Unnassign Employee @e2e", () => {
  test.slow();

  test("Assign functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    try {
      await page.getByLabel("Open").first().click();
      await atlase2e.clickElement("employeeScottBackstrom");

      // Notify Shawn Backstrom and Send
      await atlase2e.clickElement("salesOpsNotifyButton");

      await page.waitForTimeout(3000);

      const notifyText1 = await page.getByText("Notifcation has been sent.");

      await expect(notifyText1).toBeVisible();

      // check if Plan Progress matches assignment state
      const planProgressCardElement =
        await atlase2e.locators.planProgressCard();
      const planProgressCardText = await planProgressCardElement.innerText();

      expect(planProgressCardText).toContain("Not Started");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Input functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    // instantiate SalesGrossProfitView
    const salesGrossProfitView = new SalesGrossProfitView(page);

    try {
      await atlase2e.clickElement("viewButton");

      const urlString = "/atlas/plan/0/section/7/step/11";
      const currentURL = await page.url();
      await expect(currentURL).toContain(urlString);

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      /// execute input steps from Func Tests
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.nru2024AOPinput().clear();
      await salesGrossProfitView.locators.nru2024AOPinput().fill("725");
      await salesGrossProfitView.locators.nruPotentialInput().clear();
      await salesGrossProfitView.locators.nruPotentialInput().fill("800");
      await salesGrossProfitView.locators.nruUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fraN2024AOPinput().clear();
      await salesGrossProfitView.locators.fraN2024AOPinput().fill("1701");
      await salesGrossProfitView.locators.fraNPotentialInput().clear();
      await salesGrossProfitView.locators.fraNPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fraNUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiaN2024AOPinput().clear();
      await salesGrossProfitView.locators.fiaN2024AOPinput().fill("2300");
      await salesGrossProfitView.locators.fiaNPotentialInput().clear();
      await salesGrossProfitView.locators.fiaNPotentialInput().fill("3000");
      await salesGrossProfitView.locators.fiaNUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.uru2024AOPinput().clear();
      await salesGrossProfitView.locators.uru2024AOPinput().fill("1300");
      await salesGrossProfitView.locators.uruPotentialInput().clear();
      await salesGrossProfitView.locators.uruPotentialInput().fill("1500");
      await salesGrossProfitView.locators.uruUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.feauAOPinput().clear();
      await salesGrossProfitView.locators.feauAOPinput().fill("1701");
      await salesGrossProfitView.locators.feauPotentialInput().clear();
      await salesGrossProfitView.locators.feauPotentialInput().fill("2000");
      await salesGrossProfitView.locators.feauUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiau2024AOPinput().clear();
      await salesGrossProfitView.locators.fiau2024AOPinput().fill("2400");
      await salesGrossProfitView.locators.fiauPotentialInput().clear();
      await salesGrossProfitView.locators.fiauPotentialInput().fill("2700");
      await salesGrossProfitView.locators.fiauUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fGrossAOPinput().clear();
      await salesGrossProfitView.locators.fGrossAOPinput().fill("0");
      await salesGrossProfitView.locators.fGrossPotentialInput().clear();
      await salesGrossProfitView.locators.fGrossPotentialInput().fill("0");
      await salesGrossProfitView.locators.fGrossUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.wGrossAOPinput().clear();
      await salesGrossProfitView.locators.wGrossAOPinput().fill("-60000");
      await salesGrossProfitView.locators.wGrossPotentialInput().clear();
      await salesGrossProfitView.locators.wGrossPotentialInput().fill("-50000");
      await salesGrossProfitView.locators.wGrossUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.dFeeAOPinput().clear();
      await salesGrossProfitView.locators.dFeeAOPinput().fill("200");
      await salesGrossProfitView.locators.dFeePotentialInput().clear();
      await salesGrossProfitView.locators.dFeePotentialInput().fill("250");
      await salesGrossProfitView.locators.dFeeUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiCanAOPinput().clear();
      await salesGrossProfitView.locators.fiCanAOPinput().fill("-190000");
      await salesGrossProfitView.locators.fiCanPotentialInput().clear();
      await salesGrossProfitView.locators.fiCanPotentialInput().fill("-180000");
      await salesGrossProfitView.locators.fiCanUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.aogAOPinput().clear();
      await salesGrossProfitView.locators.aogAOPinput().fill("111110");
      await salesGrossProfitView.locators.aogPotentialInput().clear();
      await salesGrossProfitView.locators.aogPotentialInput().fill("222220");
      await salesGrossProfitView.locators.aogUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.mduAOPinput().clear();
      await salesGrossProfitView.locators.mduAOPinput().fill("0");
      await salesGrossProfitView.locators.mduPotentialInput().clear();
      await salesGrossProfitView.locators.mduPotentialInput().fill("0");
      await salesGrossProfitView.locators.mduUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("networkidle");

      // // click AOP by Month 2024 and validate landing
      // await atlase2e.clickElement("storePerformance");
      // await atlase2e.clickElement("aop2024byMonth");

      // // Validate URL string
      // const urlString2 = "plan/0/history?history=2024";
      // const currentURL2 = await page.url();
      // await expect(currentURL2).toContain(urlString2);

      // // simulate final edit of fields and click Submit
      // await atlase2e.seasonalityUpdate();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Submit for Review functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    try {
      await atlase2e.clickElement("viewButton");
      // Click AOP by Month 2024 and validate landing
      await atlase2e.clickElement("storePerformance");
      await atlase2e.clickElement("aop2024byMonth");

      // Validate URL string
      const urlString1 = "plan/0/history?history=2024";
      const currentURL1 = await page.url();
      await expect(currentURL1).toContain(urlString1);

      // Simulate submit, but cancel, and then repeat but confirm
      await atlase2e.submitForReviewCancel();

      await atlase2e.submitForReviewConfirm();

      const thankYou = await page.getByRole("heading", { name: "Thank you!" });
      const checkCircle = await page.getByTestId("CheckCircleOutlineIcon");

      await expect(thankYou, "thank you message").toBeVisible();

      await expect(checkCircle, "Green Check Confirmation Icon").toBeVisible();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      // Click AOP by Month 2024 and validate landing
      await atlase2e.clickElement("storePerformance");
      await atlase2e.clickElement("aop2024byMonth");

      // Validate URL string
      const urlString2 = "plan/0/history?history=2024";
      const currentURL2 = await page.url();
      await expect(currentURL2).toContain(urlString2);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Flagged for Review functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    // instantiate SalesGrossProfitView
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await atlase2e.clickElement("viewButton");

    const urlString = "/atlas/plan/0/section/7/step/11";
    const currentURL = await page.url();
    await expect(currentURL).toContain(urlString);

    try {
      await atlase2e.clickElement("seApprovalFlagOn");
      const flaggedForReview = page.getByText("Card Flagged Succesfully!");

      await expect(flaggedForReview).toBeVisible();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      await atlase2e.clickElement("seApprovalFlagOff");
      const unFlaggedForReview = page.getByText("Card UnFlagged Succesfully!");
      await expect(unFlaggedForReview).toBeVisible();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Submit For Approval functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    try {
      await atlase2e.clickElement("viewButton");
      // Click AOP by Month 2024 and validate landing
      await atlase2e.clickElement("storePerformance");
      await atlase2e.clickElement("aop2024byMonth");

      // Validate URL string
      const urlString1 = "plan/0/history?history=2024";
      const currentURL1 = await page.url();
      await expect(currentURL1).toContain(urlString1);

      // Simulate post review, approval flow
      await atlase2e.submitForApprovalCancel();

      await atlase2e.submitForApproval();

      const thankYou1 = await page.getByRole("heading", { name: "Thank you!" });
      const checkCircle1 = await page.getByTestId("CheckCircleOutlineIcon");

      await expect(thankYou1, "thank you message").toBeVisible();

      await expect(checkCircle1, "Green Check Confirmation Icon").toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Unlock Approval functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    try {
      // Unapproval flow
      await atlase2e.clickElement("viewButton");
      await atlase2e.clickElement("storePerformance");
      await atlase2e.clickElement("aop2024byMonth");

      const unlockWarningText = await page.getByText(
        "This plan has been approved",
      );

      await expect(unlockWarningText).toContainText(
        "This plan has been approved and is currently locked.",
      );

      await atlase2e.unlockAOPplan();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Unassign Employee functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    try {
      // Finish the test and cleanup
      const inputBox = await page.locator('//*[@id="mui-3"]');
      await inputBox.click();

      await page.getByLabel("Clear").click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
