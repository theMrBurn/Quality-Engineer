// Impact Builder Assignments Module

// POMs have to live in the same directory as the test, for now
// we will parameterize the storageState with other .json for each userLogin, if necessary

// Dependencies
const { test, expect } = require("@playwright/test");
const { EmployeeImpact } = require("./impact_builder_emp_and_impact.js");

// Test
test.describe
  .serial("Impact Builder - Analysis Page, Employee And Impact Functional Tests @func", () => {
  let page;
  let employeeImpact;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    employeeImpact = new EmployeeImpact(page);
    await employeeImpact.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Navigate to Impact Builder - Employee And Impact Reason Type dropdown works as expected", async () => {
    try {
      // click Dropdown
      await page.getByLabel("Reason Type").click();

      // get dropdown content
      const dropdownContents = await page.locator('div[role="menu"]');

      const expectedOptions = [
        "New Employee",
        "Position Change/Additional",
        "Transfer",
        "New Employee Replace",
        "Position Change/Replace",
        "Transfer/Replace",
        "Pay Plan Change",
        "Plan Renewal",
        "Expired Plan",
        "Position Change/Same Expense Line",
      ];

      const reasonTypeDropdown = employeeImpact.locators.reasonTypeDropdown;

      for (let option of expectedOptions) {
        await expect(reasonTypeDropdown()).toContainText(option);
      }

      // // Click on 'Position Change/Replace' and then pick Expired plan
      await page
        .getByRole("option", { name: "Position Change/Replace" })
        .click();
      await page.getByLabel("Reason Type").first().click();
      await page.getByRole("option", { name: "Expired Plan" }).click();
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Employee And Impact, input Current average, New Average, and clear Replacement Average ", async () => {
    try {
      await page
        .locator("div")
        .filter({ hasText: /^Current Average Pay$/ })
        .getByRole("textbox")
        .fill("$1,1888");
      await page
        .locator("div")
        .filter({ hasText: /^Current Average Pay$/ })
        .getByRole("textbox")
        .press("Tab");
      await page
        .locator("div")
        .filter({ hasText: /^New Average Pay$/ })
        .getByRole("textbox")
        .fill("$1,5000");
      await page
        .locator("div")
        .filter({ hasText: /^New Average Pay$/ })
        .getByRole("textbox")
        .press("Tab");
      await page.getByRole("button", { name: "Clear" }).click();
      await page.getByLabel("Replacement Employee").press("Tab");
      await page
        .locator("div")
        .filter({ hasText: /^Replacement Average Pay$/ })
        .getByRole("textbox")
        .press("Tab");
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
