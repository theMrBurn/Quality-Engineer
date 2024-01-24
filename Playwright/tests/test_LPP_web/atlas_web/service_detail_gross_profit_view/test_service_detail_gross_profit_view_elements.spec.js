// Atlas Web

// dependancies
const { test, expect } = require("@playwright/test");
const { ServiceDetailstView } = require("./service_detail_views");

//test
test.describe
  .serial("Atlas Web - Service Detail Operations 'Service/Detail Gross Profit View' @smoke", () => {
  test("Navigate to Atlas Web, Service Detals / Gross Profit view and validate card Header and other basic elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Service/Detail Gross Profit").click();
    await page.waitForLoadState("networkidle");

    //landed on the service details gross profit view, validate basic elements have loaded

    const locatorNames = [
      "serviceDetailsGrossProfitHeader",
      "customerPayGrossHeader",
      "warrentyGrossHeader",
      "internalGrossHeader",
      "allOtherGrossHeader",
      "totalDetailGrossHeader",
      "totalServiceGrossHeader",
    ];

    for (const locatorName of locatorNames) {
      await serviceDetailstView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Service Detals / Gross Profit view and validate Flat Rate Hours card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Service/Detail Gross Profit").click();
    await page.waitForLoadState("networkidle");

    //landed on the service details gross profit view, validate basic elements have loaded

    const locatorNames = [
      "frh2024AOPinput",
      "frhPotentialInput",
      "frhYoYcounter",
      "frhPerformanceChart",
      "frhUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await serviceDetailstView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Service Detals / Customer Pay Gross view and validate Flat Rate Hours card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Service/Detail Gross Profit").click();
    await page.waitForLoadState("networkidle");

    //landed on the service details gross profit view, validate basic elements have loaded

    const locatorNames = [
      "cpg2024AOPinput",
      "cpgPotentialInput",
      "cpgYoYcounter",
      "cpgPerformanceChart",
      "cpgInfoBox",
      "cpgUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await serviceDetailstView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Service Detals / Warrenty Gross view and validate Flat Rate Hours card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Service/Detail Gross Profit").click();
    await page.waitForLoadState("networkidle");

    //landed on the service details gross profit view, validate basic elements have loaded

    const locatorNames = [
      "warg2024AOPinput",
      "wargPotentialInput",
      "wargYoYcounter",
      "wargPerformanceChart",
      "wargInfoBox",
      "wargUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await serviceDetailstView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Service Detals / Internal Gross view and validate Flat Rate Hours card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Service/Detail Gross Profit").click();
    await page.waitForLoadState("networkidle");

    //landed on the service details gross profit view, validate basic elements have loaded

    const locatorNames = [
      "ig2024AOPinput",
      "igPotentialInput",
      "igYoYcounter",
      "igPerformanceChart",
      "igInfoBox",
      "igUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await serviceDetailstView.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Atlas Web, Service Detals / All Other Gross view and validate Flat Rate Hours card elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const serviceDetailstView = new ServiceDetailstView(page);
    await serviceDetailstView.goto();

    //start at dealership listing and navagate to plan details, then to navigate to SPSFFEE
    await page.getByRole("gridcell", { name: "L0000 Aop Test Store" }).click();
    await page
      .getByRole("button", { name: "Service / Detail Operations" })
      .click();
    await page.getByText("Service/Detail Gross Profit").click();
    await page.waitForLoadState("networkidle");

    //landed on the service details gross profit view, validate basic elements have loaded

    const locatorNames = [
      "aog2024AOPinput",
      "aogPotentialInput",
      "aogYoYcounter",
      "aogPerformanceChart",
      "aogInfoBox",
      "aogUpdateButton",
    ];

    for (const locatorName of locatorNames) {
      await serviceDetailstView.checkElementVisibility(locatorName);
    }
  });
});
