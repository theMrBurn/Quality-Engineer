// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { ServiceDetailstView } = require("./service_detail_views");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe
  .serial("Atlas Web - Service Detail Operations 'Service/Detail Gross Profit View' Page Elements @func", () => {
  test.slow();
  test("Navigate to Service/Detail Gross Profit View and validate Flat Rate Hours, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await serviceDetailstView.locators.frhAOPinput().clear();
      //  await serviceDetailstView.locators.frhPotentialInput().clear();
      await serviceDetailstView.locators.frhUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Flat Rate Hours renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await serviceDetailstView.locators.frhAOPinput().clear("1701");
      //  await serviceDetailstView.locators.frhPotentialInput().clear("2000");
      await serviceDetailstView.locators.frhAOPinput().fill(",./");
      //  await serviceDetailstView.locators.frhPotentialInput().fill(",./");
      await serviceDetailstView.locators.frhUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Flat Rate Hours input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    // await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await serviceDetailstView.locators.frhAOPinput().clear("1701");
      await serviceDetailstView.locators.frhAOPinput().fill("1701");
      //  await serviceDetailstView.locators.frhPotentialInput().clear("2000");
      //  await serviceDetailstView.locators.frhPotentialInput().fill("2000");
      await serviceDetailstView.locators.frhUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Customer Pay Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await serviceDetailstView.locators.cpgAOPinput().clear();
      //  await serviceDetailstView.locators.cpgPotentialInput().clear();
      await serviceDetailstView.locators.cpgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Customer Pay Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await serviceDetailstView.locators.cpgAOPinput().clear("1701");
      //  await serviceDetailstView.locators.cpgPotentialInput().clear("2000");
      await serviceDetailstView.locators.cpgAOPinput().fill(",./");
      //  await serviceDetailstView.locators.cpgPotentialInput().fill(",./");
      await serviceDetailstView.locators.cpgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Customer Pay Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await serviceDetailstView.locators.cpgAOPinput().clear("1701");
      await serviceDetailstView.locators.cpgAOPinput().fill("1701");
      //  await serviceDetailstView.locators.cpgPotentialInput().clear("2000");
      //  await serviceDetailstView.locators.cpgPotentialInput().fill("2000");
      await serviceDetailstView.locators.cpgUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Warrenty Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await serviceDetailstView.locators.wargAOPinput().clear();
      //  await serviceDetailstView.locators.wargPotentialInput().clear();
      await serviceDetailstView.locators.wargUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Warrenty Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await serviceDetailstView.locators.wargAOPinput().clear("1701");
      //  await serviceDetailstView.locators.wargPotentialInput().clear("2000");
      await serviceDetailstView.locators.wargAOPinput().fill(",./");
      //  await serviceDetailstView.locators.wargPotentialInput().fill(",./");
      await serviceDetailstView.locators.wargUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Warrenty Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await serviceDetailstView.locators.wargAOPinput().clear("1701");
      await serviceDetailstView.locators.wargAOPinput().fill("1701");
      //  await serviceDetailstView.locators.wargPotentialInput().clear("2000");
      //  await serviceDetailstView.locators.wargPotentialInput().fill("2000");
      await serviceDetailstView.locators.wargUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Internal Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await serviceDetailstView.locators.igAOPinput().clear();
      //  await serviceDetailstView.locators.igPotentialInput().clear();
      await serviceDetailstView.locators.igUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Internal Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await serviceDetailstView.locators.igAOPinput().clear("1701");
      //  await serviceDetailstView.locators.igPotentialInput().clear("2000");
      await serviceDetailstView.locators.igAOPinput().fill(",./");
      //  await serviceDetailstView.locators.igPotentialInput().fill(",./");
      await serviceDetailstView.locators.igUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Internal Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await serviceDetailstView.locators.igAOPinput().clear("1701");
      await serviceDetailstView.locators.igAOPinput().fill("1701");
      //  await serviceDetailstView.locators.igPotentialInput().clear("2000");
      //  await serviceDetailstView.locators.igPotentialInput().fill("2000");
      await serviceDetailstView.locators.igUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate All Other Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await serviceDetailstView.locators.aogAOPinput().clear();
      //  await serviceDetailstView.locators.aogPotentialInput().clear();
      await serviceDetailstView.locators.aogUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate All Other Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await serviceDetailstView.locators.aogAOPinput().clear("1701");
      //  await serviceDetailstView.locators.aogPotentialInput().clear("2000");
      await serviceDetailstView.locators.aogAOPinput().fill(",./");
      //  await serviceDetailstView.locators.aogPotentialInput().fill(",./");
      await serviceDetailstView.locators.aogUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate All Other Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await serviceDetailstView.locators.aogAOPinput().clear("1701");
      await serviceDetailstView.locators.aogAOPinput().fill("1701");
      //  await serviceDetailstView.locators.aogPotentialInput().clear("2000");
      //  await serviceDetailstView.locators.aogPotentialInput().fill("2000");
      await serviceDetailstView.locators.aogUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Total Detail Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await serviceDetailstView.locators.tdgAOPinput().clear();
      //  await serviceDetailstView.locators.tdgPotentialInput().clear();
      await serviceDetailstView.locators.tdgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Total Detail Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await serviceDetailstView.locators.tdgAOPinput().clear("1701");
      //  await serviceDetailstView.locators.tdgPotentialInput().clear("2000");
      await serviceDetailstView.locators.tdgAOPinput().fill(",./");
      //  await serviceDetailstView.locators.tdgPotentialInput().fill(",./");
      await serviceDetailstView.locators.tdgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Service/Detail Gross Profit View and validate Total Detail Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

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
    await page
      .getByRole("menuitem", { name: "Service/Detail Gross Profit" })
      .click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await serviceDetailstView.locators.tdgAOPinput().clear("1701");
      await serviceDetailstView.locators.tdgAOPinput().fill("1701");
      //  await serviceDetailstView.locators.tdgPotentialInput().clear("2000");
      //  await serviceDetailstView.locators.tdgPotentialInput().fill("2000");
      await serviceDetailstView.locators.tdgUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
