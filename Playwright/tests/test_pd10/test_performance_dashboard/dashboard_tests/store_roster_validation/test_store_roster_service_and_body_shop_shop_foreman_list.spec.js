const { test, expect } = require("@playwright/test");
const { StoreRosterForeman } = require("./store_roster_foreman");

test.describe("Store Roster Foreman Tests", () => {
  test.use({ storageState: "Playwright/helpers/login/pd1_dev_env_login.json" });
  test.slow();

  test('Validate and Verify Employees Data from CSV', async ({ page, browser }) => {
    const rosterForeman = new StoreRosterForeman(page);
    const failedRecords = [];

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

        console.log(`Test passed for employee ID: ${employee.EMPLOYEE_ID}`);
      } catch (error) {
        console.error(`Test failed for employee ID: ${employee.EMPLOYEE_ID} - ${error.message}`);
        failedRecords.push(employee);
      } finally {
        // Handle unexpected browser closure or page issues
        try {
          await rosterForeman.goto();
        } catch (reloadError) {
          console.error(`Failed to reload the page: ${reloadError.message}`);

          // Reopen browser and recreate context/page if necessary
          const newContext = await browser.newContext();
          const newPage = await newContext.newPage();
          rosterForeman.setPage(newPage);
          await rosterForeman.goto();
          await newPage.waitForLoadState('networkidle');
        }
      }
    }

    // Output the failed records
    if (failedRecords.length) {
      console.log('Test complete. Here are the records not found:');
      failedRecords.forEach(record => {
        console.log(`Employee ID: ${record.EMPLOYEE_ID}, Company Name: ${record.COMPANY_NAME}`);
      });
      // Fail the test if there are any failed records
      throw new Error('Some records failed validation. See the failed records above.');
    } else {
      console.log('Test complete. All records successfully validated.');
    }
  });
});
