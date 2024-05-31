// Atlas Web

// Import the required dependencies
const { test, expect } = require("@playwright/test");
const { AtlasE2E } = require("./atlas_e2e.js");
const AtlasLogin = require("../../../../helpers/login/atlas_login.js");
const {
  SalesGrossProfitView,
} = require("../../atlas_web/sales_operations/sales_gross_profit/sales_gross_profit_view.js");

test.describe
  .serial("Atlas E2E - Assign Employee -> Notify Employee -> Input Sales Data -> Submit for Review -> Submit For Approval -> Unlock Approval -> Unassign Employee @e2e", () => {
test("Assign functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      await atlase2e.assignBackstrom();

      // Notify Shawn Backstrom and cancel
      await atlase2e.clickElement("salesOpsNotifyButton");

      const notifyHeading1 = await page.getByRole("heading", {
        name: "Notify Employee of Assignment",
      });
      const notifyText1 = await page.getByText("Shawn W Backstrom will be");

      await expect(notifyHeading1).toBeVisible();
      await expect(notifyText1).toBeVisible();

      await atlase2e.clickElement("cancelButton");

      // Notify Shawn Backstrom and send
      await atlase2e.clickElement("salesOpsNotifyButton");

      const notifyHeading2 = await page.getByRole("heading", {
        name: "Notify Employee of Assignment",
      });
      const notifyText2 = await page.getByText("Shawn W Backstrom will be");

      await expect(notifyHeading2).toBeVisible();

      await expect(notifyText2).toBeVisible();

      await atlase2e.clickElement("cancelButton");

      await page.getByRole("button", { name: "Notify" }).click();
      await page.getByRole("button", { name: "Send" }).click();

      await page.locator(".SnackbarContent-root").click();

      // check if Plan Progress matches assignment state
      const planProgressCardElement =
        await atlase2e.locators.planProgressCard();
      const planProgressCardText = await planProgressCardElement.innerText();

      expect(planProgressCardText).toContain("Not Started");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Input functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    // instantiate SalesGrossProfitView
    const salesGrossProfitView = new SalesGrossProfitView(page);

    try {
      await atlase2e.clickElement("viewButton");

      const urlString = "/atlas/plan/0/section/7/step/11";
      const currentURL = await page.url();
      await expect(currentURL).toContain(urlString);

      /// execute input steps from Func Tests
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.nru2024AOPinput().fill("725");
      await salesGrossProfitView.locators.nruPotentialInput().fill("800");
      await salesGrossProfitView.locators.nruUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fraN2024AOPinput().fill("1701");
      await salesGrossProfitView.locators.fraNPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fraNUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiaN2024AOPinput().fill("2300");
      await salesGrossProfitView.locators.fiaNPotentialInput().fill("3000");
      await salesGrossProfitView.locators.fiaNUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.uru2024AOPinput().fill("1300");
      await salesGrossProfitView.locators.uruPotentialInput().fill("1500");
      await salesGrossProfitView.locators.uruUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.feauAOPinput().fill("1701");
      await salesGrossProfitView.locators.feauPotentialInput().fill("2000");
      await salesGrossProfitView.locators.feauUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiau2024AOPinput().fill("2400");
      await salesGrossProfitView.locators.fiauPotentialInput().fill("2700");
      await salesGrossProfitView.locators.fiauUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fGrossAOPinput().fill("0");
      await salesGrossProfitView.locators.fGrossPotentialInput().fill("0");
      await salesGrossProfitView.locators.fGrossUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.wGrossAOPinput().fill("-60000");
      await salesGrossProfitView.locators.wGrossPotentialInput().fill("-50000");
      await salesGrossProfitView.locators.wGrossUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.dFeeAOPinput().fill("200");
      await salesGrossProfitView.locators.dFeePotentialInput().fill("250");
      await salesGrossProfitView.locators.dFeeUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiCanAOPinput().fill("-190000");
      await salesGrossProfitView.locators.fiCanPotentialInput().fill("-180000");
      await salesGrossProfitView.locators.fiCanUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.aogAOPinput().fill("111110");
      await salesGrossProfitView.locators.aogPotentialInput().fill("222220");
      await salesGrossProfitView.locators.aogUpdateButton().click();

      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.mduAOPinput().fill("0");
      await salesGrossProfitView.locators.mduPotentialInput().fill("0");
      await salesGrossProfitView.locators.mduUpdateButton().click();

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      // click AOP by Month 2024 and validate landing
      await atlase2e.clickElement("storePerformance");
      await atlase2e.clickElement("aop2024byMonth");

      // Validate URL string
      const urlString2 = "plan/0/history?history=2024";
      const currentURL2 = await page.url();
      await expect(currentURL2).toContain(urlString2);

      // simulate final edit of fields and click Submit
      await atlase2e.seasonalityUpdate();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Submit for Review functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

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
      throw new Error("Test failed.", error.message);
    }
  });

  test("Submit For Approval functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

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
      throw new Error("Test failed.", error.message);
    }
  });

  test("Unlock Approval functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Unapproval flow
      await atlase2e.clickElement("viewButton");
      await atlase2e.clickElement("storePerformance");
      await atlase2e.clickElement("aop2024byMonth");

      const unlockWarningText = page.locator(
        '//*[@id="root"]/div/div[3]/div/div/div[2]/div/div[2]/div/div[2]/div/div[2]',
      );

      await expect(unlockWarningText).toContainText(
        "This plan has been approved and is currently locked.",
      );

      await atlase2e.unlockAOPplan();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Unassign Employee functionality", async ({ browser, page }) => {
    const atlase2e = new AtlasE2E(page);
    await atlase2e.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Finish the test and cleanup
      await atlase2e.goto();
      await atlase2e.unassignEmployee("unassignButton");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
