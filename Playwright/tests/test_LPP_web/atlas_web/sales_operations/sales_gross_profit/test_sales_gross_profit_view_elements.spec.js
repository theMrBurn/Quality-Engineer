// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SalesGrossProfitView } = require("./sales_gross_profit_view.js");
const AtlasLogin = require("../../../../../helpers/login/atlas_login.js");

//test
test.describe.serial("Atlas Web - Page Elements @smoke", () => {
  test.slow();
  test("Navigate to Atlas Web, Dealership Listing and validate card Header and other basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "newRetailUnitsHeader",
      "frontEndAverageHeader",
      "fiAverageHeader",
      "usedRetailUnitsHeader",
      "frontEndAverageUsed",
      "fiAverageUsedHeader",
      "fleetGrossHeader",
      "wholesaleGrossHeader",
      "docFeeHeader",
      "fiCancelsHeader",
      "allOtherGrossHeader",
      "memoDrivewayUnitsHeader",
      "totalSalesGross",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate New Retail Units specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "nru2024AOPinput",
      "nruPotentialInput",
      "nruYoYcounter",
      "nruPerformanceChart",
      "nruSalesEfficiencyChart",
      "nruUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate 'Front End Average - NEW' specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "fraN2024AOPinput",
      "fraNPotentialInput",
      "fraNYoYcounter",
      "fraNPerformanceChart",
      "fraNUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average NEW specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "fiaN2024AOPinput",
      "fiaNPotentialInput",
      "fiaNYoYcounter",
      "fiaNUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Used Retail Units (Including Driveway) specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "uru2024AOPinput",
      "uruPotentialInput",
      "uruYoYcounter",
      "uruPerformanceChart",
      "uruUsedToNewChart",
      "uruUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Front-End Average - Used specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "feauAOPinput",
      "feauPotentialInput",
      "feauYoYcounter",
      "feauPerformanceChart",
      "feauInfoBox",
      "feauUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Average Used specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "feauAOPinput",
      "feauPotentialInput",
      "feauYoYcounter",
      "feauPerformanceChart",
      "feauInfoBox",
      "feauUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Fleet Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "fGrossAOPinput",
      "fGrossPotentialInput",
      "fGrossYoYcounter",
      "fGrossPerformanceChart",
      "fGrossInfoBox",
      "fGrossUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Wholesale Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "wGrossAOPinput",
      "wGrossPotentialInput",
      "wGrossYoYcounter",
      "wGrossPerformanceChart",
      "wGrossInfoBox",
      "wGrossUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Doc Fee & EVR Income (Per Unit) specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "dFeeAOPinput",
      "dFeePotentialInput",
      "dFeeYoYcounter",
      "dFeePerformanceChart",
      "dFeeInfoBox",
      "dFeePerfTrendGraph",
      "dFeeUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate F&I Cancels (Under and Over 180) specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "dFeeAOPinput",
      "dFeePotentialInput",
      "dFeeYoYcounter",
      "dFeePerformanceChart",
      "dFeeInfoBox",
      "dFeePerfTrendGraph",
      "dFeeUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate All Other Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "aogAOPinput",
      "aogPotentialInput",
      "aogYoYcounter",
      "aogPerformanceChart",
      "dFeeInfoBox",
      "aogInfoBox",
      "aogUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Memo: Driveway Units (New and Used) specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "mduAOPinput",
      "mduPotentialInput",
      "mduYoYcounter",
      "mduPerformanceChart",
      "mduInfoBox",
      "mduUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Total Sales Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const salesGrossProfitView = new SalesGrossProfitView(page);
    await salesGrossProfitView.goto();

    // Create an instance of AtlasLogin and call the signInHelper method
    // const atlasLogin = new AtlasLogin();
    // await atlasLogin.signInHelper(page);

    //start at dealership listing and navagate to plan details, then to navigate to SGPV
    await page
      .getByRole("columnheader", { name: "STORE " })
      .locator("span")
      .nth(1)
      .click();
    await page.getByText("L0000 Aop Test Store").click();
    await page.getByRole("button", { name: "Sales Operations" }).click();
    await page.getByText("Sales Gross Profit").click();

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "tsgAOP",
      "tsgPotential",
      "tsgYoYcounter",
      "tsgPerformanceChart",
      "mduInfoBox",
      "tsgPerfTrendChart",
      "bottomNextButton",
    ];

    for (const locatorName of locatorNames) {
      await salesGrossProfitView.checkElementVisibility(locatorName);
    }
  });
});
