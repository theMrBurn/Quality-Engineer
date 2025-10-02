// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PartsGrossProfitView } = require("./parts_gross_profit_view.js");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
// Test
test.describe
  .serial("Atlas Web - Parts Operations Page Elements @smoke", () => {
  let page;
  let partsGrossProfitView;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });
  test.slow();

  test("Navigate to Parts Gross Profit View and validate Customer Pay Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await partsGrossProfitView.locators.cpgAOPinput().clear();
      //  await partsGrossProfitView.locators.cpgPotentialInput().clear();
      await partsGrossProfitView.locators.cpgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Customer Pay Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await partsGrossProfitView.locators.cpgAOPinput().clear("1701");
      //  await partsGrossProfitView.locators.cpgPotentialInput().clear("2000");
      await partsGrossProfitView.locators.cpgAOPinput().fill(",./");
      //  await partsGrossProfitView.locators.cpgPotentialInput().fill(",./");
      await partsGrossProfitView.locators.cpgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Customer Pay Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    // await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsGrossProfitView.locators.cpgAOPinput().clear("1701");
      await partsGrossProfitView.locators.cpgAOPinput().fill("1701");
      await partsGrossProfitView.locators.cpgUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Warrenty Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await partsGrossProfitView.locators.wgAOPinput().clear();
      //  await partsGrossProfitView.locators.wgPotentialInput().clear();
      await partsGrossProfitView.locators.wgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Warrenty Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await partsGrossProfitView.locators.wgAOPinput().clear("1701");
      //  await partsGrossProfitView.locators.wgPotentialInput().clear("2000");
      await partsGrossProfitView.locators.wgAOPinput().fill(",./");
      //  await partsGrossProfitView.locators.wgPotentialInput().fill(",./");
      await partsGrossProfitView.locators.wgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Warrenty Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    // await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsGrossProfitView.locators.wgAOPinput().clear("1701");
      await partsGrossProfitView.locators.wgAOPinput().fill("1701");
      //  await partsGrossProfitView.locators.wgPotentialInput().clear("2000");
      //  await partsGrossProfitView.locators.wgPotentialInput().fill("2000");
      await partsGrossProfitView.locators.wgUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Internal Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await partsGrossProfitView.locators.igAOPinput().clear();
      //  await partsGrossProfitView.locators.igPotentialInput().clear();
      await partsGrossProfitView.locators.igUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Internal Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await partsGrossProfitView.locators.igAOPinput().clear("1701");
      //  await partsGrossProfitView.locators.igPotentialInput().clear("2000");
      await partsGrossProfitView.locators.igAOPinput().fill(",./");
      //  await partsGrossProfitView.locators.igPotentialInput().fill(",./");
      await partsGrossProfitView.locators.igUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Internal Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsGrossProfitView.locators.igAOPinput().clear("1701");
      await partsGrossProfitView.locators.igAOPinput().fill("1701");
      //  await partsGrossProfitView.locators.igPotentialInput().clear("2000");
      //  await partsGrossProfitView.locators.igPotentialInput().fill("2000");
      await partsGrossProfitView.locators.igUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Wholesale Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await partsGrossProfitView.locators.wsgAOPinput().clear();
      //  await partsGrossProfitView.locators.wsgPotentialInput().clear();
      await partsGrossProfitView.locators.wsgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Wholesale Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await partsGrossProfitView.locators.wsgAOPinput().clear("1701");
      //  await partsGrossProfitView.locators.wsgPotentialInput().clear("2000");
      await partsGrossProfitView.locators.wsgAOPinput().fill(",./");
      //  await partsGrossProfitView.locators.wsgPotentialInput().fill(",./");
      await partsGrossProfitView.locators.wsgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Wholesale Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsGrossProfitView.locators.wsgAOPinput().clear("1701");
      await partsGrossProfitView.locators.wsgAOPinput().fill("1701");
      //  await partsGrossProfitView.locators.wsgPotentialInput().clear("2000");
      //  await partsGrossProfitView.locators.wsgPotentialInput().fill("2000");
      await partsGrossProfitView.locators.wsgUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate All Other Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await partsGrossProfitView.locators.aogAOPinput().clear();
      //  await partsGrossProfitView.locators.aogPotentialInput().clear();
      await partsGrossProfitView.locators.aogUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate All Other Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await partsGrossProfitView.locators.aogAOPinput().clear("1701");
      //  await partsGrossProfitView.locators.aogPotentialInput().clear("2000");
      await partsGrossProfitView.locators.aogAOPinput().fill(",./");
      //  await partsGrossProfitView.locators.aogPotentialInput().fill(",./");
      await partsGrossProfitView.locators.aogUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate All Other Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsGrossProfitView.locators.aogAOPinput().clear("1701");
      await partsGrossProfitView.locators.aogAOPinput().fill("1701");
      //  await partsGrossProfitView.locators.aogPotentialInput().clear("2000");
      //  await partsGrossProfitView.locators.aogPotentialInput().fill("2000");
      await partsGrossProfitView.locators.aogUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Total Revenue, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await partsGrossProfitView.locators.trAOPinput().clear();
      //  await partsGrossProfitView.locators.trPotentialInput().clear();
      await partsGrossProfitView.locators.trUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Total Revenue renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await partsGrossProfitView.locators.trAOPinput().clear("1701");
      // await partsGrossProfitView.locators.trPotentialInput().clear("2000");
      await partsGrossProfitView.locators.trAOPinput().fill(",./");
      // await partsGrossProfitView.locators.trPotentialInput().fill(",./");
      await partsGrossProfitView.locators.trUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Parts Gross Profit View and validate Total Revenue input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    const atlasLogin = new AtlasLogin();
    await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("tab", { name: "Parts Operations" }).click();
    await page.getByRole("menuitem", { name: "Parts Gross Profit" }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await partsGrossProfitView.locators.trAOPinput().clear("1701");
      await partsGrossProfitView.locators.trAOPinput().fill("1701");
      // await partsGrossProfitView.locators.trPotentialInput().clear("2000");
      // await partsGrossProfitView.locators.trPotentialInput().fill("2000");
      await partsGrossProfitView.locators.trUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
