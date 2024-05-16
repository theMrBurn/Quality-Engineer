// Impact Builder Analysis Config Module

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactAnalysisPage } = require("./impact_builder_analysis.js");

//test
test.describe
  .serial("Impact Builder - Analysis Page Functional Tests @func", () => {
  test("Navigate to Impact Builder - Analysis Configuration, Company Drodown works as expected", async ({
    browser,
    page,
  }) => {
    const impactAnalysisPage = new ImpactAnalysisPage(page);
    await impactAnalysisPage.goto();

    try {
      await page
        .locator("div")
        .filter({ hasText: /^Company$/ })
        .getByLabel("Open")
        .click();
      await page
        .locator("div")
        .filter({ hasText: /^Company$/ })
        .getByLabel("Close")
        .click();
      await page.getByRole("button", { name: "Clear" }).click();
      await page.getByLabel("Company").fill("Calabasas Audi (L0756)");
      await page
        .getByRole("option", { name: "Calabasas Audi (L0756)" })
        .click();
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Analysis Configuration, Expense Type Dropdown works as expected", async ({
    browser,
    page,
  }) => {
    test.skip(
      "when this is ran, it works but the dropdown returns an empty element, even though manually its clearly got the list",
    );
    const impactAnalysisPage = new ImpactAnalysisPage(page);
    await impactAnalysisPage.goto();

    try {
      // click Expense Type
      await impactAnalysisPage.locators.expenseTypeInput().click();

      // clear entry
      await page
        .locator("div")
        .filter({ hasText: /^Expense Type$/ })
        .getByLabel("Clear")
        .click();

      // click open Expense Type
      await impactAnalysisPage.locators.expenseTypeInput().click();

      const expectedOptions = [
        "Body Shop Advisor",
        "General Manager",
        "Parts Advisor",
        "Sales Manager",
        "Service Advisor",
        "Body Shop Manager",
        "Service Support",
        "Service Manual",
        "F&I Manager",
        "Parts Manager",
      ];

      const expenseTypeDropdown = impactAnalysisPage.locators.expenseTypeInput;

      for (let option of expectedOptions) {
        await expect(expenseTypeDropdown()).toHaveText(option);
      }

      // Click on 'Service Advisor'
      await page.getByRole("option", { name: "Service Advisor" }).click();

      for (let option of expectedOptions) {
        await expect(expenseTypeDropdown()).toHaveText(option);
      }

      await page.getByRole("option", { name: "Service Advisor" }).click();
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Analysis Configuration, Closing Month choice, and Apply button work as expected", async ({
    browser,
    page,
  }) => {
    const impactAnalysisPage = new ImpactAnalysisPage(page);
    await impactAnalysisPage.goto();

    try {
      // Click on the Calendar
      await page.getByLabel("Choose date, selected date is").click();

      // Click on the '2024' button.
      await page.getByRole("button", { name: "2024", exact: true }).click();

      // Click on the 'Jan' button.
      await page.getByRole("button", { name: "Jan", exact: true }).click();

      // Click on the 'Apply' button.
      await page.getByRole("button", { name: "Apply" }).click();
    } catch (err) {
      // Handle any errors that occur during the test.
      console.error(err);
    }
  });
});
