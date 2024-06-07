// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PlanDetailsView } = require("./atlas_plan_details.js");
const AtlasLogin = require("../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @func", () => {
  test.skip("we can skip these as the E2E does it better now");
  test("Navigate to Plan Details and cancel before Assigning Employee", async ({
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Assign Shawn Backstrom
      await planDetailsView.clickElement("assignEmployeeSalesOps");
      await page.getByLabel("Open").click();
      await page.getByRole("option", { name: "Shawn Backstrom" }).click();
      await planDetailsView.clickElement("cancelButton");

      // Refresh the page
      await page.reload();
      await page.waitForLoadState("load");

      await planDetailsView.clickElement("assignEmployeeSalesOps");
      await page.getByLabel("Open").click();
      await page.getByRole("option", { name: "Shawn Backstrom" }).click();

      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Sales Operations Assigment can assign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await planDetailsView.locators.assignEmployeeSalesOps().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Shawn Backstrom" }).click();
      await page.getByRole("button", { name: "Assign" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been assigned");

      await expect(assigned.toBeVisible(await page.waitForLoadState("load")));
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to assign employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Notify Sales Operations Assigment can be notified", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // check to see if Plan Progress column shows Employee we assigned prior to Notify step

      const planProgress = await planDetailsView.locators.salesOpsPlanDetails();
      await expect(planProgress).toContainText("Not Started");

      // validate modal content before canceling
      await page.getByRole("button", { name: "Notify" }).first().click();
      const sendButton = await page.getByRole("button", { name: "Send" });
      await expect(sendButton).toBeVisible();
      const cancelButton = await page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();

      // // cancel notification on Test env (don't want to actually send a notification)
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to Notify employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Sales Operations can unassign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Unassign" }).first().click();

      //confirmation modal pop out
      const confirmationMessage = await page.getByRole("heading", {
        name: "Are you sure you want to unassign?",
      });
      await expect(confirmationMessage).toBeVisible();
      await page.getByRole("button", { name: "Confirm" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been unassigned");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to unassign employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Used Sales Operations Assigment can cancel before assigning", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await planDetailsView.locators.usedSalesOperations().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Brian Williford" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Used Sales Operations Assigment can assign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await planDetailsView.locators.usedSalesOperations().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Brian Williford" }).click();
      await page.getByRole("button", { name: "Assign" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been assigned");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to assign employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Notify Used Sales Operations Assigment can be notified", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // validate modal content before canceling
      await page.getByRole("button", { name: "Notify" }).click();
      const sendButton = await page.getByRole("button", { name: "Send" });
      await expect(sendButton).toBeVisible();
      const cancelButton = await page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();

      //Plan Progress does not have a step for USED Sales Ops

      // cancel notification on Test env (don't want to actually send a notification)
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to Notify employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Used Sales Operations can unassign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Unassign" }).first().click();

      //confirmation modal pop out
      const confirmationMessage = await page.getByRole("heading", {
        name: "Are you sure you want to unassign?",
      });
      await expect(confirmationMessage).toBeVisible();
      await page.getByRole("button", { name: "Confirm" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been unassigned");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to unassign employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Service/Detail Operations Assigment can cancel before assigning", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await planDetailsView.locators.assignButton2().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Scott Long" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Service/Detail Operations Assigment can Assign succesfully", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await planDetailsView.locators.assignButton2().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Scott Long" }).click();
      await page.getByRole("button", { name: "Assign" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Service/Detail Operations Assigment can be notified", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // check to see if Plan Progress column shows Employee we assigned prior to Notify step
      const planProgress =
        await planDetailsView.locators.serviceDetailsOpsPlanDetails();
      await expect(planProgress).toContainText("Not Started");

      // validate modal content before canceling
      await page.getByRole("button", { name: "Notify" }).click();
      const sendButton = await page.getByRole("button", { name: "Send" });
      await expect(sendButton).toBeVisible();
      const cancelButton = await page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();

      // cancel notification on Test env (don't want to actually send a notification)
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to Notify employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Service/Detail Operations can unassign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Unassign" }).click();

      //confirmation modal pop out
      const confirmationMessage = await page.getByRole("heading", {
        name: "Are you sure you want to unassign?",
      });
      await expect(confirmationMessage).toBeVisible();
      await page.getByRole("button", { name: "Confirm" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been unassigned");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to unassign employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Parts Operations Assigment can cancel before assigning", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await planDetailsView.locators.assignButton3().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Ryan Tuttle" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Parts Operations can Assign succesfully", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await planDetailsView.locators.assignButton3().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Ryan Tuttle" }).click();
      await page.getByRole("button", { name: "Assign" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Parts Operations Assigment can be notified", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // check to see if Plan Progress column shows Employee we assigned prior to Notify step
      const planProgress = await planDetailsView.locators.partsOpsPlanDetails();
      await expect(planProgress).toContainText("Not Started");

      // validate modal content before canceling
      await page.getByRole("button", { name: "Notify" }).click();
      const sendButton = await page.getByRole("button", { name: "Send" });
      await expect(sendButton).toBeVisible();
      const cancelButton = await page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();

      // cancel notification on Test env (don't want to actually send a notification)
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to Notify employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Parts Operations can unassign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Unassign" }).click();

      //confirmation modal pop out
      const confirmationMessage = await page.getByRole("heading", {
        name: "Are you sure you want to unassign?",
      });
      await expect(confirmationMessage).toBeVisible();
      await page.getByRole("button", { name: "Confirm" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been unassigned");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to unassign employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Body Shop Operations can cancel before assigning", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await planDetailsView.locators.assignButton4().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Travis Hawes" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Body Shop Operations can assign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await planDetailsView.locators.assignButton4().click();
      await page.getByLabel("Search Employee").click();
      await page.getByRole("option", { name: "Travis Hawes" }).click();
      await page.getByRole("button", { name: "Assign" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been assigned");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to assign employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Body Shop Operations Assigment can be notified", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // check to see if Plan Progress column shows Employee we assigned prior to Notify step
      const planProgress =
        await planDetailsView.locators.bodyShopPlanProgress();
      await expect(planProgress).toContainText("Not Started");

      // validate modal content before canceling
      await page.getByRole("button", { name: "Notify" }).click();
      const sendButton = await page.getByRole("button", { name: "Send" });
      await expect(sendButton).toBeVisible();
      const cancelButton = await page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();

      // cancel notification on Test env (don't want to actually send a notification)
      await page.getByRole("button", { name: "Cancel" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to Notify employee");
    }
  });

  test("Navigate to Atlas Web Plan Details and validate Body Shop Operations can unassign employee", async ({
    browser,
    page,
  }) => {
    const planDetailsView = new PlanDetailsView(page);
    await planDetailsView.goto();
    await page.waitForLoadState("load");

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    try {
      // Perform the steps
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Unassign" }).click();

      //confirmation modal pop out
      const confirmationMessage = await page.getByRole("heading", {
        name: "Are you sure you want to unassign?",
      });
      await expect(confirmationMessage).toBeVisible();
      await page.getByRole("button", { name: "Confirm" }).click();

      const assigned = page.locator('//*[@id="notistack-snackbar"]');
      await expect(assigned).toHaveText("Employee has been unassigned");
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to unassign employee");
    }
  });
});
