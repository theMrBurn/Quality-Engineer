// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { BodyShopGrossProfitView } = require("./bodyShopOps_view");
const AtlasLogin = require("../../../../../helpers/login/atlas_login");

// Instantiate your AtlasLogin class
const atlasLogin = new AtlasLogin();

//test
test.describe
  .serial("Atlas Web - Body Shop Operations Page Elements @func", () => {
  test("Navigate to Body Shop Gross Profit View and validate Customer Pay Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopGrossProfitView.locators.cpg2024AOPinput().clear();
      await bodyShopGrossProfitView.locators.cpgPotentialInput().clear();
      await bodyShopGrossProfitView.locators.cpgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Customer Pay Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopGrossProfitView.locators.cpg2024AOPinput().clear("1701");
      await bodyShopGrossProfitView.locators.cpgPotentialInput().clear("2000");
      await bodyShopGrossProfitView.locators.cpg2024AOPinput().fill(",./");
      await bodyShopGrossProfitView.locators.cpgPotentialInput().fill(",./");
      await bodyShopGrossProfitView.locators.cpgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Customer Pay Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopGrossProfitView.locators.cpg2024AOPinput().fill("1701");
      await bodyShopGrossProfitView.locators.cpgPotentialInput().fill("2000");
      await bodyShopGrossProfitView.locators.cpgUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Internal Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopGrossProfitView.locators.ig2024AOPinput().clear();
      await bodyShopGrossProfitView.locators.igPotentialInput().clear();
      await bodyShopGrossProfitView.locators.igUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Internal Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopGrossProfitView.locators.ig2024AOPinput().clear("1701");
      await bodyShopGrossProfitView.locators.igPotentialInput().clear("2000");
      await bodyShopGrossProfitView.locators.ig2024AOPinput().fill(",./");
      await bodyShopGrossProfitView.locators.igPotentialInput().fill(",./");
      await bodyShopGrossProfitView.locators.igUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Internal Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopGrossProfitView.locators.ig2024AOPinput().fill("1701");
      await bodyShopGrossProfitView.locators.igPotentialInput().fill("2000");
      await bodyShopGrossProfitView.locators.igUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Adjusted Dealer Services, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopGrossProfitView.locators.ads2024AOPinput().clear();
      await bodyShopGrossProfitView.locators.adsPotentialInput().clear();
      await bodyShopGrossProfitView.locators.adsUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Parts Gross Profit View and validate Adjusted Dealer Services renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopGrossProfitView.locators.ads2024AOPinput().clear("1701");
      await bodyShopGrossProfitView.locators.adsPotentialInput().clear("2000");
      await bodyShopGrossProfitView.locators.ads2024AOPinput().fill(",./");
      await bodyShopGrossProfitView.locators.adsPotentialInput().fill(",./");
      await bodyShopGrossProfitView.locators.adsUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Parts Gross Profit View and validate Adjusted Dealer Services input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopGrossProfitView.locators.ads2024AOPinput().fill("1701");
      await bodyShopGrossProfitView.locators.adsPotentialInput().fill("2000");
      await bodyShopGrossProfitView.locators.adsUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Parts Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopGrossProfitView.locators.pg2024AOPinput().clear();
      await bodyShopGrossProfitView.locators.pgPotentialInput().clear();
      await bodyShopGrossProfitView.locators.pgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Parts Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopGrossProfitView.locators.pg2024AOPinput().clear("1701");
      await bodyShopGrossProfitView.locators.pgPotentialInput().clear("2000");
      await bodyShopGrossProfitView.locators.pg2024AOPinput().fill(",./");
      await bodyShopGrossProfitView.locators.pgPotentialInput().fill(",./");
      await bodyShopGrossProfitView.locators.pgUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate Parts Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopGrossProfitView.locators.pg2024AOPinput().fill("1701");
      await bodyShopGrossProfitView.locators.pgPotentialInput().fill("2000");
      await bodyShopGrossProfitView.locators.pgUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate All Other Gross, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopGrossProfitView.locators.aog2024AOPinput().clear();
      await bodyShopGrossProfitView.locators.aogPotentialInput().clear();
      await bodyShopGrossProfitView.locators.aogUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Body Shop Gross Profit View and validate All Other Gross renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopGrossProfitView.locators.aog2024AOPinput().clear("1701");
      await bodyShopGrossProfitView.locators.aogPotentialInput().clear("2000");
      await bodyShopGrossProfitView.locators.aog2024AOPinput().fill(",./");
      await bodyShopGrossProfitView.locators.aogPotentialInput().fill(",./");
      await bodyShopGrossProfitView.locators.aogUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Parts Gross Profit View and validate All Other Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopGrossProfitView.locators.aog2024AOPinput().fill("1701");
      await bodyShopGrossProfitView.locators.aogPotentialInput().fill("2000");
      await bodyShopGrossProfitView.locators.aogUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Parts Gross Profit View and validate Total Revenue, no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //press Update to trigger Error Alert
      await bodyShopGrossProfitView.locators.tr2024AOPinput().clear();
      await bodyShopGrossProfitView.locators.trPotentialInput().clear();
      await bodyShopGrossProfitView.locators.trUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Parts Gross Profit View and validate Total Revenue renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input invalid symbols to trigger Error Alert
      await bodyShopGrossProfitView.locators.tr2024AOPinput().clear("1701");
      await bodyShopGrossProfitView.locators.trPotentialInput().clear("2000");
      await bodyShopGrossProfitView.locators.tr2024AOPinput().fill(",./");
      await bodyShopGrossProfitView.locators.trPotentialInput().fill(",./");
      await bodyShopGrossProfitView.locators.trUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Parts Gross Profit View and validate Total Revenue input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const bodyShopGrossProfitView = new BodyShopGrossProfitView(page);
    await bodyShopGrossProfitView.goto();

    // call your signInHelper method on your atlas Login instance
    await atlasLogin.signInHelper();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Body Shop Operations" }).click();
    await page.getByText("Body Shop Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    try {
      //input valid amount and click Update - vaidate Update Success
      await bodyShopGrossProfitView.locators.tr2024AOPinput().fill("1701");
      await bodyShopGrossProfitView.locators.trPotentialInput().fill("2000");
      await bodyShopGrossProfitView.locators.trUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });
});
