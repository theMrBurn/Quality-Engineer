// Impact Builder Assignments Module

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { ImpactAssignments } = require("./impact_builder_assignments.js");

//test
test.describe
  .serial("Impact Builder - Analysis Page, Employee and Impact Information Functional Tests @func", () => {
  test("Navigate to Impact Builder - Employee and Impact Information, reason type - current average pay - new average pay - replacement employee - replacement average pay inputs works as expected", async ({
    browser,
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    // navigate and pre test steps
    await impactAssignments.goto();

    // execute functional test steps using POM locators and page elements
    try {
      // Fill the reason type
      await impactAssignments.clickElement('reasonTypeDropdown');
      await impactAssignments.clickElement('firstMenuOption');

      // Fill the new average pay
      await impactAssignments.fillForm({'newAveragePayTextbox': '60000'});

      // Fill the replacement employee
      await impactAssignments.clickElement('replacementEmployeeDropdown');
      await page.getByRole('option', { name: 'Aaron Barahona (100164)' }).click();

      // Fill the replacement average pay
      await impactAssignments.fillForm({'replacementAveragePayTextbox': '55000'});

      // Validate the fields are filled correctly. This will be specific to your application's behavior.
      // For instance, you might check if a confirmation message is displayed, a new page is navigated to, etc.
    
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Employee and Impact Information, Add Productivity Measure works as expected", async ({
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    try {
      await impactAssignments.clickElement('addMeasure');
      await page.locator('div').filter({ hasText: /^Source System:$/ }).getByLabel('Open').click();
      await page.getByRole('dialog').getByLabel('Close').click();
      await page.locator('div').filter({ hasText: /^Source System:$/ }).getByLabel('Open').click();
      await page.getByRole('option', { name: 'FI', exact: true }).click();
      await page.locator('div').filter({ hasText: /^Source Field:$/ }).getByLabel('Open').click();
      await page.getByRole('option', { name: 'Alarm Count Product Only' }).click();
      await page.getByLabel('Field Description (required').click();
      await page.getByLabel('Field Description (required').fill('test');
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.getByRole('button', { name: 'Select' }).click();

    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Employee and Impact Information, Edit Productivity Measures works as expected", async ({
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    try {
      await page.getByRole('row', { name: 'CSI/SSI/FSI - Individual Raw' }).getByTestId('editOverride').click();
      await page.getByRole('cell', { name: 'CSI/SSI/FSI - Individual Raw' }).getByRole('textbox').fill('test');
      await page.getByRole('row', { name: 'test   0   0' }).getByRole('textbox').nth(1).fill('100000');
      await page.getByRole('row', { name: 'test   100000   0' }).getByRole('textbox').nth(2).fill('0110000');
      await page.getByRole('cell', { name: '0', exact: true }).getByRole('textbox').fill('115000');
      await page.getByRole('cell', { name: '0110000' }).getByRole('textbox').click();

      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.getByRole('button', { name: 'Select' }).click();
    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Employee and Impact Information, Delete Productivity Measures works as expected", async ({
    page,
  }) => {
    test.skip('this function isnt currently enabled in the app');
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    try {
      await page.getByRole('row', { name: 'CSI/SSI/FSI - Individual Raw' }).getByTestId('editOverride').click();
      await page.getByRole('cell', { name: 'CSI/SSI/FSI - Individual Raw' }).getByRole('textbox').fill('test');
      await page.getByRole('row', { name: 'test   0   0' }).getByRole('textbox').nth(1).fill('100000');
      await page.getByRole('row', { name: 'test   100000   0' }).getByRole('textbox').nth(2).fill('0110000');
      await page.getByRole('cell', { name: '0', exact: true }).getByRole('textbox').fill('115000');
      await page.getByRole('cell', { name: '0110000' }).getByRole('textbox').click();

      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.getByRole('button', { name: 'Select' }).click();

    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Navigate to Impact Builder - Employee and Impact Information, Generate Output works as expected", async ({
    page,
  }) => {
    const impactAssignments = new ImpactAssignments(page);
    await impactAssignments.goto();

    try {
      const page1Promise = page.waitForEvent('popup');
      await page.getByRole('button', { name: 'Generate Output' }).click();
      const page1 = await page1Promise;

    } catch (error) {
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
