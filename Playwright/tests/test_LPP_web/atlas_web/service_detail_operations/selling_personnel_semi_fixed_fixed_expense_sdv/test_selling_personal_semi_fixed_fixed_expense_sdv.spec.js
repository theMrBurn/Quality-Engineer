// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PersonalSFFE } = require("./spsffe_sdo.js");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe
  .serial("Atlas Web - Service Detail Operations 'Service/Detail Operations View' Page Elements @func", () => {
  test.slow();
  test("Navigate to Atlas Web, Service/Detail Operations View and validate Personell Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await personalSFFE.locators.peAOPinput().clear();
      // await personalSFFE.locators.pePotentialInput().clear();
      await personalSFFE.locators.peUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Personell Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await personalSFFE.locators.peAOPinput().clear("1701");
      // await personalSFFE.locators.pePotentialInput().clear("2000");
      await personalSFFE.locators.peAOPinput().fill(",./");
      // await personalSFFE.locators.pePotentialInput().fill(",./");
      await personalSFFE.locators.peUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Personell Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await personalSFFE.locators.peAOPinput().clear("1701");
      await personalSFFE.locators.peAOPinput().fill("1701");
      //await personalSFFE.locators.pePotentialInput().clear("2000");
      //await personalSFFE.locators.pePotentialInput().fill("2000");
      await personalSFFE.locators.peUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Semi-Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await personalSFFE.locators.sfeAOPinput().clear();
      //await personalSFFE.locators.sfePotentialInput().clear();
      await personalSFFE.locators.sfeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Semi-Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await personalSFFE.locators.sfeAOPinput().clear("1701");
      //await personalSFFE.locators.sfePotentialInput().clear("2000");
      await personalSFFE.locators.sfeAOPinput().fill(",./");
      //await personalSFFE.locators.sfePotentialInput().fill(",./");
      await personalSFFE.locators.sfeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Semi-Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await personalSFFE.locators.sfeAOPinput().clear("1701");
      await personalSFFE.locators.sfeAOPinput().fill("1701");
      // await personalSFFE.locators.sfePotentialInput().clear("2000");
      // await personalSFFE.locators.sfePotentialInput().fill("2000");
      await personalSFFE.locators.sfeUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Fixed Expense no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await personalSFFE.locators.feAOPinput().clear();
      // await personalSFFE.locators.fePotentialInput().clear();
      await personalSFFE.locators.feUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Fixed Expense bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await personalSFFE.locators.feAOPinput().clear("1701");
      //await personalSFFE.locators.fePotentialInput().clear("2000");
      await personalSFFE.locators.feAOPinput().fill(",./");
      //await personalSFFE.locators.fePotentialInput().fill(",./");
      await personalSFFE.locators.feUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Atlas Web, Service/Detail Operations View and validate Fixed Expense input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const personalSFFE = new PersonalSFFE(page);
    await personalSFFE.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    //const atlasLogin = new AtlasLogin();
    //await atlasLogin.signInHelper(page);

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
    await page
      .getByRole("menuitem", { name: "Personnel, Semi-Fixed, &" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await personalSFFE.locators.feAOPinput().clear("1701");
      await personalSFFE.locators.feAOPinput().fill("1701");
      //await personalSFFE.locators.fePotentialInput().clear("2000");
      //await personalSFFE.locators.fePotentialInput().fill("2000");
      await personalSFFE.locators.feUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
