// Sahara Flooring Payoffs Tab

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaFlooringRequests } = require("./sahara_flooring_requests.js");

//test
test.describe
  .serial("Saraha Flooring Payoffs Tab - Functionality @func", () => {
  test("Navigate to Saraha Flooring Center, click Flooring Tab and validate URL location", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();
    await saharaFlooringRequests.clickPayoffsTab();

    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring");
  });

  test("Navigate to Saraha Flooring Center, click Requests Tab and validate URL location", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();
    await saharaFlooringRequests.clickRequestsTab();

    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring/requests");
  });

  test("Navigate to Saraha Flooring Center, click Forecast Tab and validate URL location", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();
    await saharaFlooringRequests.clickForecastsTab();

    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring/forecast");
  });

  test("Navigate to Saraha Flooring Center, validate Bank column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();

    const column = "BANK ";

    await saharaFlooringRequests.inputColumnFilter(column);
    await saharaFlooringRequests.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Bank DDA column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();

    const column = "BANK DDA ";

    await saharaFlooringRequests.inputColumnFilter(column);
    await saharaFlooringRequests.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Stock # column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();

    const column = "STOCK # ";

    await saharaFlooringRequests.inputColumnFilter(column);
    await saharaFlooringRequests.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate VIN column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();

    const column = "VIN ";

    await saharaFlooringRequests.inputColumnFilter(column);
    await saharaFlooringRequests.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Criteria column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();

    const column = "CRITERIA ";

    await saharaFlooringRequests.inputCriteriaColumnFilter(column);
    await saharaFlooringRequests.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Contract Date column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();

    const column = "CONTRACT DATE";

    await saharaFlooringRequests.inputContractDateColumnFilter(column);
    await saharaFlooringRequests.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, Reset Filters button is functional as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringPayoffs(page);
    await saharaFlooringRequests.goto();
    await saharaFlooringRequests.clickResetFiltersButton();
  });
});
