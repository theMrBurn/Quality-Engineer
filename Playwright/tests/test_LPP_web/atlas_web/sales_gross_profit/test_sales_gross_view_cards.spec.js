// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SalesGrossProfitView } = require("./sales_gross_profit_view.js");
const NetworkInterceptor = require("../../../../helpers/network_interceptor.js");

//test
test.describe.serial("Atlas Web - Page Elements @func", () => {
  test("Navigate to Atlas Web, Dealership Listing and validate New Retail Units no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.nru2024AOPinput().clear();
      await salesGrossProfitView.locators.nruPotentialInput().clear();
      await salesGrossProfitView.locators.nruUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate New Retail Units bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.nru2024AOPinput().clear("1701");
      await salesGrossProfitView.locators.nruPotentialInput().clear("2000");
      await salesGrossProfitView.locators.nru2024AOPinput().fill(",./");
      await salesGrossProfitView.locators.nruPotentialInput().fill(",./");
      await salesGrossProfitView.locators.nruUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate New Retail Units input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.nru2024AOPinput().fill("1701");
      await salesGrossProfitView.locators.nruPotentialInput().fill("2000");
      await salesGrossProfitView.locators.nruUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Front End Average - NEW no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.fraN2024AOPinput().clear();
      await salesGrossProfitView.locators.fraNPotentialInput().clear();
      await salesGrossProfitView.locators.fraNUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Front End Average - NEW bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.fraN2024AOPinput().clear("1701");
      await salesGrossProfitView.locators.fraNPotentialInput().clear("2000");
      await salesGrossProfitView.locators.fraN2024AOPinput().fill(",./");
      await salesGrossProfitView.locators.fraNPotentialInput().fill(",./");
      await salesGrossProfitView.locators.fraNUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Front End Average - NEW input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fraN2024AOPinput().fill("1701");
      await salesGrossProfitView.locators.fraNPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fraNUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average - NEW no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.fiaN2024AOPinput().clear();
      await salesGrossProfitView.locators.fiaNPotentialInput().clear();
      await salesGrossProfitView.locators.fiaNUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average - NEW bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.fiaN2024AOPinput().clear("1701");
      await salesGrossProfitView.locators.fiaNPotentialInput().clear("2000");
      await salesGrossProfitView.locators.fiaN2024AOPinput().fill(",./");
      await salesGrossProfitView.locators.fiaNPotentialInput().fill(",./");
      await salesGrossProfitView.locators.fiaNUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average - NEW input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiaN2024AOPinput().fill("1701");
      await salesGrossProfitView.locators.fiaNPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fiaNUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Used Retail Units (Including Driveway) no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.uru2024AOPinput().clear();
      await salesGrossProfitView.locators.uruPotentialInput().clear();
      await salesGrossProfitView.locators.uruUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate FUsed Retail Units (Including Driveway) bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.uru2024AOPinput().clear();
      await salesGrossProfitView.locators.uruPotentialInput().clear();
      await salesGrossProfitView.locators.uru2024AOPinput().fill(",./");
      await salesGrossProfitView.locators.uruPotentialInput().fill(",./");
      await salesGrossProfitView.locators.uruUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Used Retail Units (Including Driveway) input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.uru2024AOPinput().fill("1701");
      await salesGrossProfitView.locators.uruPotentialInput().fill("2000");
      await salesGrossProfitView.locators.uruUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Front-End Average - Used no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.feauAOPinput().clear();
      await salesGrossProfitView.locators.feauPotentialInput().clear();
      await salesGrossProfitView.locators.feauUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Front-End Average - Used bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.feauAOPinput().clear();
      await salesGrossProfitView.locators.feauPotentialInput().clear();
      await salesGrossProfitView.locators.feauAOPinput().fill(",./");
      await salesGrossProfitView.locators.feauPotentialInput().fill(",./");
      await salesGrossProfitView.locators.feauUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Front-End Average - Used input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.feauAOPinput().fill("1701");
      await salesGrossProfitView.locators.feauPotentialInput().fill("2000");
      await salesGrossProfitView.locators.feauUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average - Used no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.fiau2024AOPinput().clear();
      await salesGrossProfitView.locators.fiauPotentialInput().clear();
      await salesGrossProfitView.locators.fiauUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average - Used bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.fiau2024AOPinput().clear();
      await salesGrossProfitView.locators.fiauPotentialInput().clear();
      await salesGrossProfitView.locators.fiau2024AOPinput().fill(",./");
      await salesGrossProfitView.locators.fiauPotentialInput().fill(",./");
      await salesGrossProfitView.locators.fiauUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average - Used input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiau2024AOPinput().fill("1701");
      await salesGrossProfitView.locators.fiauPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fiauUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fleet Gross no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.fGrossAOPinput().clear();
      await salesGrossProfitView.locators.fGrossPotentialInput().clear();
      await salesGrossProfitView.locators.fGrossUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fleet Gross bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.fGrossAOPinput().clear();
      await salesGrossProfitView.locators.fGrossPotentialInput().clear();
      await salesGrossProfitView.locators.fGrossAOPinput().fill(",./");
      await salesGrossProfitView.locators.fGrossPotentialInput().fill(",./");
      await salesGrossProfitView.locators.fGrossUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fleet Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fGrossAOPinput().fill("1701");
      await salesGrossProfitView.locators.fGrossPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fGrossUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Wholesale Gross no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert
      await salesGrossProfitView.locators.wGrossAOPinput().clear();
      await salesGrossProfitView.locators.wGrossPotentialInput().clear();
      await salesGrossProfitView.locators.wGrossUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Wholesale Gross bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.wGrossAOPinput().clear();
      await salesGrossProfitView.locators.wGrossPotentialInput().clear();
      await salesGrossProfitView.locators.wGrossAOPinput().fill(",./");
      await salesGrossProfitView.locators.wGrossPotentialInput().fill(",./");
      await salesGrossProfitView.locators.wGrossUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Wholesale Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.wGrossAOPinput().fill("1701");
      await salesGrossProfitView.locators.wGrossPotentialInput().fill("2000");
      await salesGrossProfitView.locators.wGrossUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Doc Fee & EVR Income (Per Unit) no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert

      await salesGrossProfitView.locators.dFeeAOPinput().clear();
      await salesGrossProfitView.locators.dFeePotentialInput().clear();
      await salesGrossProfitView.locators.dFeeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Doc Fee & EVR Income (Per Unit) bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.dFeeAOPinput().clear();
      await salesGrossProfitView.locators.dFeePotentialInput().clear();
      await salesGrossProfitView.locators.dFeeAOPinput().fill(",./");
      await salesGrossProfitView.locators.dFeePotentialInput().fill(",./");
      await salesGrossProfitView.locators.dFeeUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Doc Fee & EVR Income (Per Unit) input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.dFeeAOPinput().fill("1701");
      await salesGrossProfitView.locators.dFeePotentialInput().fill("2000");
      await salesGrossProfitView.locators.dFeeUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Cancels (Under and Over 180) no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert

      await salesGrossProfitView.locators.fiCanAOPinput().clear();
      await salesGrossProfitView.locators.fiCanPotentialInput().clear();
      await salesGrossProfitView.locators.fiCanUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Cancels (Under and Over 180) bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.fiCanAOPinput().clear();
      await salesGrossProfitView.locators.fiCanPotentialInput().clear();
      await salesGrossProfitView.locators.fiCanAOPinput().fill(",./");
      await salesGrossProfitView.locators.fiCanPotentialInput().fill(",./");
      await salesGrossProfitView.locators.fiCanUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Cancels (Under and Over 180) input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiCanAOPinput().fill("1701");
      await salesGrossProfitView.locators.fiCanPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fiCanUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate All Other Gross no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert

      await salesGrossProfitView.locators.aogAOPinput().clear();
      await salesGrossProfitView.locators.aogPotentialInput().clear();
      await salesGrossProfitView.locators.aogUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate All Other Gross bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.fiCanAOPinput().clear();
      await salesGrossProfitView.locators.fiCanPotentialInput().clear();
      await salesGrossProfitView.locators.fiCanAOPinput().fill(",./");
      await salesGrossProfitView.locators.fiCanPotentialInput().fill(",./");
      await salesGrossProfitView.locators.fiCanUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate All Other Gross input AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.fiCanAOPinput().fill("1701");
      await salesGrossProfitView.locators.fiCanPotentialInput().fill("2000");
      await salesGrossProfitView.locators.fiCanUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Memo: Driveway Units (New and Used) no-input renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //press Update to trigger Error Alert

      await salesGrossProfitView.locators.mduAOPinput().clear();
      await salesGrossProfitView.locators.mduPotentialInput().clear();
      await salesGrossProfitView.locators.mduUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Memo: Driveway Units (New and Used) bad characters renders Update Button Disabled as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    try {
      //input invalid symbols to trigger Error Alert
      await salesGrossProfitView.locators.mduAOPinput().clear();
      await salesGrossProfitView.locators.mduPotentialInput().clear();
      await salesGrossProfitView.locators.mduAOPinput().fill(",./");
      await salesGrossProfitView.locators.mduPotentialInput().fill(",./");
      await salesGrossProfitView.locators.mduUpdateButton().isDisabled();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed.");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Memo: Driveway Units (New and Used) AOP UPDATE works as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    try {
      //input valid amount and click Update - vaidate Update Success
      await salesGrossProfitView.locators.mduAOPinput().fill("1701");
      await salesGrossProfitView.locators.mduPotentialInput().fill("2000");
      await salesGrossProfitView.locators.mduUpdateButton().click();
      await expect(page.getByText("Plan step updated!")).toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to update card");
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate when NEXT button is clicked, landing page URL is as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page.getByLabel("Plan Details (0)").locator("path").click();
    await page.getByRole("button", { name: "View", exact: true }).click();

    await NetworkInterceptor.interceptRequests(page);

    const partialURL = "/atlas/plan/0/section/7/step/14";

    try {
      // Click bottom NEXT button and validate landing page URL
      await salesGrossProfitView.locators.bottomNextButton().click();
      await expect(page.url()).toContain(partialURL);
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error("Test failed. Unable to validate page URL");
    }
  });
});
