// Impact Builder Assignments Module

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EmployeeImpact } = require("./impact_builder_emp_and_impact.js");

//test
test.describe
  .serial("Impact Builder - Analysis Page, Employee And Impact Functional Tests @func", () => {
  test("Navigate to Impact Builder - Employee And Impact Reason Type dropdown works as expected", async ({
    page,
  }) => {
    const employeeImpact = new EmployeeImpact(page);
    await employeeImpact.goto();

    try {
      // click Dropdown
      await page.getByLabel("Reason Type").click();

      // click Dropdown and Inspect contents
      await employeeImpact.clickElement("reasonTypeDropdown");

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

      // // Click on 'Position Change/Replace'
      // await page.getByRole('option', { name: 'Position Change/Replace' }).click();

      // // click Dropdown and Inspect contents
      // await employeeImpact.clickElement('reasonTypeDropdown');

      for (let option of expectedOptions) {
        await expect(reasonTypeDropdown()).toContainText(option);
      }

      // Click on 'Expired Plan'
      // await dropdownContents.locator('text="Expired Plan"').click();
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Employee And Impact Reason Type dropdown selection works as expected", async ({
    page,
  }) => {
    const employeeImpact = new EmployeeImpact(page);
    await employeeImpact.goto();

    try {
      // click Dropdown
      await page.getByLabel("Reason Type").click();

      // click Dropdown and Inspect contents
      await employeeImpact.clickElement("reasonTypeDropdown");

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

      // Click on 'Position Change/Replace'
      await page
        .getByRole("option", { name: "Position Change/Replace" })
        .click();

      // click Dropdown and Inspect contents
      await employeeImpact.clickElement("reasonTypeDropdown");

      for (let option of expectedOptions) {
        await expect(reasonTypeDropdown()).toContainText(option);
      }

      // Click on 'Expired Plan'
      await dropdownContents.locator('text="Expired Plan"').click();
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
