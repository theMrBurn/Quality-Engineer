// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { PartsGrossProfitView } = require("./parts_gross_profit_view.js");

//test
test.describe
  .serial("Atlas Web - Parts Operations Page Elements @smoke", () => {
  test("Navigate to Atlas Web, Dealership Listing and validate card Header and other basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Parts Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    //landed on the sales gross profit view, validate basic elements have loaded (big list)

    const locatorNames = [
      "customerPayGrossHeader",
      "warrantyGrossHeader",
      "internalGrossHeader",
      "wholesaleGrossHeader",
      "allOtherGrossHeader",
      "totalRevenueHeader",
      "totalPartsGrossHeader",
    ];

    for (const locatorName of locatorNames) {
      await partsGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Customer Pay Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Parts Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    const locatorNames = [
      "cpg2024AOPinput",
      "cpgPotentialInput",
      "cpgYoYcounter",
      "cpgPerformanceChart",
      "cpgInfoBox",
      "cpgUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await partsGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Warrenty Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Parts Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    const locatorNames = [
      "wg2024AOPinput",
      "wgPotentialInput",
      "wgYoYcounter",
      "wgPerformanceChart",
      "wgInfoBox",
      "wgUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await partsGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Internal Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Parts Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    const locatorNames = [
      "ig2024AOPinput",
      "igPotentialInput",
      "igYoYcounter",
      "igPerformanceChart",
      "igInfoBox",
      "igUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await partsGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate Wholesale Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Parts Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    const locatorNames = [
      "wsg2024AOPinput",
      "wsgPotentialInput",
      "wsgYoYcounter",
      "wsgPerformanceChart",
      "wsgInfoBox",
      "wsgUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await partsGrossProfitView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Dealership Listing and validate All Other Gross specific card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const partsGrossProfitView = new PartsGrossProfitView(page);
    await partsGrossProfitView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to Parts Operations
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page.getByRole("button", { name: "Parts Operations" }).click();
    await page.getByText("Parts Gross Profit", { exact: true }).click();
    await page.waitForLoadState("networkidle");

    const locatorNames = [
      "aog2024AOPinput",
      "aogPotentialInput",
      "aogYoYcounter",
      "aogPerformanceChart",
      "aogInfoBox",
      "aogUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await partsGrossProfitView.checkElementVisibility(locatorName);
    }
  });
});
