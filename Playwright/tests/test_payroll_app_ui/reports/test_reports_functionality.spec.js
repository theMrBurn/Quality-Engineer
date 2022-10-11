// Payroll Reports

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AllPayReports } = require("./reports.js");

//test
test.describe.serial("Payroll /Reports", () => {
  test("Navigate to /Reports CA Tech Link, click URL and validate success", async ({
    page,
  }) => {
    const payrollReports = new AllPayReports(page);
    await payrollReports.goto();

    // the PO has conditional statement - if locator has URL, click the link
    await payrollReports.clickJVCATechLink();
  });

  test("Navigate to /Reports Cash Spliff, click URL and validate success", async ({
    page,
  }) => {
    const payrollReports = new AllPayReports(page);
    await payrollReports.goto();

    // the PO has conditional statement - if locator has URL, click the link
    await payrollReports.clickCashSpliffLink();
  });

  test("Navigate to /Reports Sales Rep, click URL and validate success", async ({
    page,
  }) => {
    const payrollReports = new AllPayReports(page);
    await payrollReports.goto();

    // the PO has conditional statement - if locator has URL, click the link
    await payrollReports.clickSalesRepLink();
  });

  test("Navigate to /Reports Vacation Temp Rates, click URL and validate success", async ({
    page,
  }) => {
    const payrollReports = new AllPayReports(page);
    await payrollReports.goto();

    // the PO has conditional statement - if locator has URL, click the link
    await payrollReports.clickVacationTempRatesLink();
  });
});
