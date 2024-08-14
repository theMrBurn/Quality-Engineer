// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopPersonnelExpense } = require("./bodyShopPSFFE_view");
const AtlasLogin = require("../../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe
  .serial("Atlas Web - Body Shop Personell Semi Fixed, Fixed Expense Page Elements @func", () => {
  test.slow();
  test("Navigate to Atlas Web, Body Shop PSFFE and validate Personell Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopPersonnelExpense.locators.peAOPinput().clear();
      await bodyShopPersonnelExpense.locators.pePotentialInput().clear();
      await bodyShopPersonnelExpense.locators.peUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Personell Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopPersonnelExpense.locators.peAOPinput().clear("1701");
      await bodyShopPersonnelExpense.locators.pePotentialInput().clear("2000");
      await bodyShopPersonnelExpense.locators.peAOPinput().fill(",./");
      await bodyShopPersonnelExpense.locators.pePotentialInput().fill(",./");
      await bodyShopPersonnelExpense.locators.peUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Personell Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopPersonnelExpense.locators.peAOPinput().clear("1701");
      await bodyShopPersonnelExpense.locators.peAOPinput().fill("1701");
      await bodyShopPersonnelExpense.locators.pePotentialInput().clear("2000");
      await bodyShopPersonnelExpense.locators.pePotentialInput().fill("2000");
      await bodyShopPersonnelExpense.locators.peUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Semi-Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopPersonnelExpense.locators.sfeAOPinput().clear();
      await bodyShopPersonnelExpense.locators.sfePotentialInput().clear();
      await bodyShopPersonnelExpense.locators.sfeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Semi-Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopPersonnelExpense.locators.sfeAOPinput().clear("1701");
      await bodyShopPersonnelExpense.locators.sfePotentialInput().clear("2000");
      await bodyShopPersonnelExpense.locators.sfeAOPinput().fill(",./");
      await bodyShopPersonnelExpense.locators.sfePotentialInput().fill(",./");
      await bodyShopPersonnelExpense.locators.sfeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Semi-Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopPersonnelExpense.locators.sfeAOPinput().fill("1701");
      await bodyShopPersonnelExpense.locators.sfePotentialInput().fill("2000");
      await bodyShopPersonnelExpense.locators.sfeUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopPersonnelExpense.locators.feAOPinput().clear();
      await bodyShopPersonnelExpense.locators.fePotentialInput().clear();
      await bodyShopPersonnelExpense.locators.feUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopPersonnelExpense.locators.feAOPinput().clear("1701");
      await bodyShopPersonnelExpense.locators.fePotentialInput().clear("2000");
      await bodyShopPersonnelExpense.locators.feAOPinput().fill(",./");
      await bodyShopPersonnelExpense.locators.fePotentialInput().fill(",./");
      await bodyShopPersonnelExpense.locators.feUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Body Shop PSFFE and validate Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopPersonnelExpense = new BodyShopPersonnelExpense(page);
    await bodyShopPersonnelExpense.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Body Shop Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Body Shop Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopPersonnelExpense.locators.feAOPinput().fill("1701");
      await bodyShopPersonnelExpense.locators.fePotentialInput().fill("2000");
      await bodyShopPersonnelExpense.locators.feUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
