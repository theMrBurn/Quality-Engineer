// Sahara Flooring Payoffs Tab

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaFlooringPayoffs } = require("./sahara_flooring_payoffs.js");

//test
test.describe
  .serial("Saraha Flooring Payoffs Tab - Functionality @func", () => {
  test("Navigate to Saraha Flooring Center, click Flooring Tab and validate URL location", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();
    await saharaFlooringPayoffs.clickPayoffsTab();

    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring");
  });

  test("Navigate to Saraha Flooring Center, click Requests Tab and validate URL location", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();
    await saharaFlooringPayoffs.clickRequestsTab();

    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring/requests");
  });

  test("Navigate to Saraha Flooring Center, click Forecast Tab and validate URL location", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();
    await saharaFlooringPayoffs.clickForecastsTab();

    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring/forecast");
  });

  test("Navigate to Saraha Flooring Center, validate Bank column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();

    const column = "BANK ";

    await saharaFlooringPayoffs.inputColumnFilter(column);
    await saharaFlooringPayoffs.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Bank DDA column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();

    const column = "BANK DDA ";

    await saharaFlooringPayoffs.inputColumnFilter(column);
    await saharaFlooringPayoffs.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Stock # column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();

    const column = "STOCK # ";

    await saharaFlooringPayoffs.inputColumnFilter(column);
    await saharaFlooringPayoffs.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate VIN column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();

    const column = "VIN ";

    await saharaFlooringPayoffs.inputColumnFilter(column);
    await saharaFlooringPayoffs.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Criteria column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();

    const column = "CRITERIA ";

    await saharaFlooringPayoffs.inputCriteriaColumnFilter(column);
    await saharaFlooringPayoffs.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, validate Contract Date column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();

    const column = "CONTRACT DATE";

    await saharaFlooringPayoffs.inputContractDateColumnFilter(column);
    await saharaFlooringPayoffs.clickResetFiltersButton();
  });

  test("Navigate to Saraha Flooring Center, Reset Filters button is functional as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();
    await saharaFlooringPayoffs.clickResetFiltersButton();
  });
});
