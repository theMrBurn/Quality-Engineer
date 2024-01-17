// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SellingPersonalExpense } = require("./spsffee.js");
const NetworkInterceptor = require("../../../../helpers/network_interceptor.js");

//test
test.describe.serial("Atlas Web - Page Elements @func", () => {
  test("Navigate to Atlas Web, Dealership Listing and validate Selling Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //press Update to trigger Error Alert
      await sellingPersonalExpense.locators.seAOPinput().clear();
      await sellingPersonalExpense.locators.sePotentialInput().clear();
      await sellingPersonalExpense.locators.seUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Selling Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //input invalid symbols to trigger Error Alert
      await sellingPersonalExpense.locators.seAOPinput().clear("1701");
      await sellingPersonalExpense.locators.sePotentialInput().clear("2000");
      await sellingPersonalExpense.locators.seAOPinput().fill(",./");
      await sellingPersonalExpense.locators.sePotentialInput().fill(",./");
      await sellingPersonalExpense.locators.seUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Selling Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {

      //input valid amount and click Update - vaidate Update Success
      await sellingPersonalExpense.locators.seAOPinput().fill("1701");
      await sellingPersonalExpense.locators.sePotentialInput().fill("2000");
      await sellingPersonalExpense.locators.seUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Personell Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //press Update to trigger Error Alert
      await sellingPersonalExpense.locators.peAOPinput().clear();
      await sellingPersonalExpense.locators.pePotentialInput().clear();
      await sellingPersonalExpense.locators.peUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Personell Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //input invalid symbols to trigger Error Alert
      await sellingPersonalExpense.locators.peAOPinput().clear("1701");
      await sellingPersonalExpense.locators.pePotentialInput().clear("2000");
      await sellingPersonalExpense.locators.peAOPinput().fill(",./");
      await sellingPersonalExpense.locators.pePotentialInput().fill(",./");
      await sellingPersonalExpense.locators.peUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Personell Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {

      //input valid amount and click Update - vaidate Update Success
      await sellingPersonalExpense.locators.peAOPinput().fill("1701");
      await sellingPersonalExpense.locators.pePotentialInput().fill("2000");
      await sellingPersonalExpense.locators.peUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Semi-Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //press Update to trigger Error Alert
      await sellingPersonalExpense.locators.sfeAOPinput().clear();
      await sellingPersonalExpense.locators.sfePotentialInput().clear();
      await sellingPersonalExpense.locators.sfeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Semi-Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //input invalid symbols to trigger Error Alert
      await sellingPersonalExpense.locators.sfeAOPinput().clear("1701");
      await sellingPersonalExpense.locators.sfePotentialInput().clear("2000");
      await sellingPersonalExpense.locators.sfeAOPinput().fill(",./");
      await sellingPersonalExpense.locators.sfePotentialInput().fill(",./");
      await sellingPersonalExpense.locators.sfeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Semi-Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {

      //input valid amount and click Update - vaidate Update Success
      await sellingPersonalExpense.locators.sfeAOPinput().fill("1701");
      await sellingPersonalExpense.locators.sfePotentialInput().fill("2000");
      await sellingPersonalExpense.locators.sfeUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //press Update to trigger Error Alert
      await sellingPersonalExpense.locators.feAOPinput().clear();
      await sellingPersonalExpense.locators.fePotentialInput().clear();
      await sellingPersonalExpense.locators.feUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {
      //input invalid symbols to trigger Error Alert
      await sellingPersonalExpense.locators.feAOPinput().clear("1701");
      await sellingPersonalExpense.locators.fePotentialInput().clear("2000");
      await sellingPersonalExpense.locators.feAOPinput().fill(",./");
      await sellingPersonalExpense.locators.fePotentialInput().fill(",./");
      await sellingPersonalExpense.locators.feUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const sellingPersonalExpense = new SellingPersonalExpense(page);
    await sellingPersonalExpense.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page
      .getByText("Selling, Personnel, Semi-Fixed, & Fixed Expense")
      .click();

    try {

      //input valid amount and click Update - vaidate Update Success
      await sellingPersonalExpense.locators.feAOPinput().fill("1701");
      await sellingPersonalExpense.locators.fePotentialInput().fill("2000");
      await sellingPersonalExpense.locators.feUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });
});
