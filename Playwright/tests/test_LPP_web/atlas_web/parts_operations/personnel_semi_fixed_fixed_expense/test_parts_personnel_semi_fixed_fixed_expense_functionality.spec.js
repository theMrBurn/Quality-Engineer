// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PartsPersonnelExpense } = require("./partsOpsPSFFE");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @func", () => {
  let page;
  let partsPersonnelExpense;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Personell Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //press Update to trigger Error Alert
      await partsPersonnelExpense.locators.peAOPinput().clear();
      // await partsPersonnelExpense.locators.pePotentialInput().clear();
      await partsPersonnelExpense.locators.peUpdateButton().isHidden();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Personell Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //input invalid symbols to trigger Error Alert
      await partsPersonnelExpense.locators.peAOPinput().clear("1701");
      //await partsPersonnelExpense.locators.pePotentialInput().clear("2000");
      await partsPersonnelExpense.locators.peAOPinput().fill(",./");
      //await partsPersonnelExpense.locators.pePotentialInput().fill(",./");
      await partsPersonnelExpense.locators.peUpdateButton().isHidden();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Personell Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsPersonnelExpense.locators.peAOPinput().clear("1701");
      await partsPersonnelExpense.locators.peAOPinput().fill("1701");
      // await partsPersonnelExpense.locators.pePotentialInput().clear("2000");
      // await partsPersonnelExpense.locators.pePotentialInput().fill("2000");
      await partsPersonnelExpense.locators.peUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Semi-Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //press Update to trigger Error Alert
      await partsPersonnelExpense.locators.sfeAOPinput().clear();
      // await partsPersonnelExpense.locators.sfePotentialInput().clear();
      await partsPersonnelExpense.locators.sfeUpdateButton().isHidden();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Semi-Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //input invalid symbols to trigger Error Alert
      await partsPersonnelExpense.locators.sfeAOPinput().clear("1701");
      //  await partsPersonnelExpense.locators.sfePotentialInput().clear("2000");
      await partsPersonnelExpense.locators.sfeAOPinput().fill(",./");
      //  await partsPersonnelExpense.locators.sfePotentialInput().fill(",./");
      await partsPersonnelExpense.locators.sfeUpdateButton().isHidden();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Semi-Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsPersonnelExpense.locators.sfeAOPinput().fill("1701");
      //  await partsPersonnelExpense.locators.sfePotentialInput().fill("2000");
      await partsPersonnelExpense.locators.sfeUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //press Update to trigger Error Alert
      await partsPersonnelExpense.locators.feAOPinput().clear();
      //  await partsPersonnelExpense.locators.fePotentialInput().clear();
      await partsPersonnelExpense.locators.feUpdateButton().isHidden();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //input invalid symbols to trigger Error Alert
      await partsPersonnelExpense.locators.feAOPinput().clear("1701");
      //  await partsPersonnelExpense.locators.fePotentialInput().clear("2000");
      await partsPersonnelExpense.locators.feAOPinput().fill(",./");
      //  await partsPersonnelExpense.locators.fePotentialInput().fill(",./");
      await partsPersonnelExpense.locators.feUpdateButton().isHidden();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsPersonnelExpense = new PartsPersonnelExpense(page);
    await partsPersonnelExpense.goto();

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
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsPersonnelExpense.locators.feAOPinput().fill("1701");
      //  await partsPersonnelExpense.locators.fePotentialInput().fill("2000");
      await partsPersonnelExpense.locators.feUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
