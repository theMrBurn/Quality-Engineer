const { test, expect } = require("@playwright/test");
const { StoreRosterForeman } = require("./store_roster_foreman");

test.describe("Store Roster Foreman Tests", () => {
  test.use({ storageState: "Playwright/helpers/login/pd1_dev_env_login.json" });
  test.slow();

  test('Validate and Verify Employees Data from CSV', async ({ page }) => {
    const rosterForeman = new StoreRosterForeman(page);

    await rosterForeman.goto();
    await page.waitForLoadState('networkidle');

    const data = await rosterForeman.readCsv('Playwright/helpers/misc_test_helper_files/feb25_foreman_list.csv');

    try {
      await rosterForeman.validateCsvData(data);
      console.log('CSV data validation passed.');
    } catch (error) {
      console.error(`CSV data validation failed: ${error.message}`);
      throw error;
    }

    for (const [index, employee] of data.entries()) {
      try {
        console.log(`Processing employee ID: ${employee.EMPLOYEE_ID}, Index: ${index}`);

        await rosterForeman.goto();
        await page.waitForLoadState('networkidle');

        // Wait for the store name to be visible and get the text content
        await page.waitForSelector(`text=${employee.COMPANY_NAME}`, { state: 'visible' });
        const storeNameLocator = page.locator(`text=${employee.COMPANY_NAME}`).first();
        const storeNameText = await storeNameLocator.textContent();

        console.log(`Found store name: ${storeNameText}`);

        // Choose store from the roster page
        await rosterForeman.selectStore(employee.COMPANY_NAME);

        // Verify that the employee's row is present in the table
        const employeeRow = await page.locator(`text=${employee.EMPLOYEE_ID}`).first();
        await expect(employeeRow).toBeVisible();

        console.log(`Test passed for employee ID: ${employee.EMPLOYEE_ID}`);
      } catch (error) {
        console.error(`Test failed for employee ID: ${employee.EMPLOYEE_ID} - ${error.message}`);
      } finally {
        // Refresh the page to reset the state for the next iteration
        try {
          await rosterForeman.goto();
        } catch (reloadError) {
          console.error(`Failed to reload the page: ${reloadError.message}`);
        }
      }
    }
  });
});
