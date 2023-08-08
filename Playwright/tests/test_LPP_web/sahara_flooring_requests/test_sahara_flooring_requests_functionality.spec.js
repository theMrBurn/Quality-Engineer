// Sahara Flooring Requests Tab

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaFlooringRequests } = require("./sahara_flooring_requests.js");

//test
test.describe
  .serial("Saraha Flooring Requests Tab - Functionality @func", () => {
  test("Navigate to Saraha Flooring Requests, click Requests Tab and validate URL location", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();
    await saharaFlooringRequests.clickRequestsTab();

    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring/requests");
  });

  test("Navigate to Saraha Flooring Requests, validate Bank column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();

    const column = "BANK ";

    await saharaFlooringRequests.inputColumnFilter(column);
  });

  test("Navigate to Saraha Flooring Requests, validate Bank DDA column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();

    const column = "BANK DDA ";

    await saharaFlooringRequests.inputColumnFilter(column);
  });

  test("Navigate to Saraha Flooring Requests, validate Stock # column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();

    const column = "STOCK # ";

    await saharaFlooringRequests.inputColumnFilter(column);
  });

  test("Navigate to Saraha Flooring Requests, validate VIN column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();

    const column = "VIN ";

    await saharaFlooringRequests.inputColumnFilter(column);
  });

  test("Navigate to Saraha Flooring Requests, validate Contract Date column filters function as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();

    const column = "CONTRACT DATE";

    await saharaFlooringRequests.inputContractDateColumnFilter(column);
  });

  test("Navigate to Saraha Flooring Requests, Reset Filters button is functional as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();
    const clearFilterButton = await page.locator('[data-test="flooring-request-toolbar"]').getByRole('button').nth(4);
    clearFilterButton.click();
  });
});
