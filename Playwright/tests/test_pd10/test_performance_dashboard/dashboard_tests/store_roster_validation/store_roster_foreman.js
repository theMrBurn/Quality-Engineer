const { test, expect } = require("@playwright/test");
const fs = require('fs');
const csv = require('csv-parser');

class StoreRosterForeman {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      mainTab: () => this.page.locator('span:has-text("Main")').first(),
      storeRostersTab: () => this.page.getByRole('link', { name: 'Store Rosters' }),
      storeRostersFilter: () => this.page.locator('span').filter({ hasText: 'Store Rosters' }),
      storeRostersTable: () => this.page.getByRole('table'),
      storeRow: (storeName) => this.page.locator(`role=table >> text=${storeName}`),
      employeeRow: (employeeId) => this.page.locator(`role=row >> text=${employeeId}`),
    };
  }

  async goto() {
    await this.page.goto('/TMS/Reports/Main.aspx');
    await this.page.waitForLoadState('load');
  }

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement);
    const gridRowHandles = await this.page.$$(gridElement);

    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error('Element is not attached to the DOM');
        }
      }, firstGridRow);

      await firstGridRow.click();
      console.log('Clicked on the first grid row.');
    } else {
      console.log('No grid rows found.');
    }
  }

  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState('load');
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState('networkidle');
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        try {
          await this.page.waitForLoadState('networkidle');
          const inputElement = await locatorFunction();
          await inputElement.fill(value);
        } catch (originalError) {
          const errorMessage = `Filling the form field with locator '${key}' failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState('load');
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState('networkidle');
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async hoverElement(locatorName) {
    await this.page.waitForLoadState('load');
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.hover();
      await this.page.waitForLoadState('networkidle');
    } catch (originalError) {
      const errorMessage = `Hovering over locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async selectStore(storeName) {
    const storeLocator = this.locators.storeRow(storeName);
    await storeLocator.click();

    // Ensure the URL contains 'StoreEmployeeRoster'
    await this.page.waitForFunction(
        (url) => window.location.href.includes(url),
        'StoreEmployeeRoster'
    );

    // Optionally, you can add an assertion to verify the URL contains 'StoreEmployeeRoster'
    expect(this.page.url()).toContain('StoreEmployeeRoster');
}

  async verifyEmployeeInTable(employeeId) {
    const employeeRow = this.locators.employeeRow(employeeId);
    await expect(employeeRow).toBeVisible();
  }

  async readCsv(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      let isFirstLine = true;
      fs.createReadStream(filePath)
        .pipe(
          csv({
            skipLines: 1, // Skip the first line
            mapHeaders: ({ header }) => {
              return header.trim().toUpperCase().replace(/\s+/g, '_');
            },
          })
        )
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  async validateCsvData(data) {
    for (const record of data) {
      expect(record).toHaveProperty('EMPLOYEE_ID');
      expect(record).toHaveProperty('FIRST_NAME');
      expect(record).toHaveProperty('LAST_NAME');
      expect(record).toHaveProperty('COMPANY_NAME');
      // Add more fields as required

      expect(record.EMPLOYEE_ID).toMatch(/^\d+$/); // Assuming employee ID is numeric
      expect(record.FIRST_NAME).toBeTruthy(); // Check if first name is not empty
      expect(record.LAST_NAME).toBeTruthy(); // Check if last name is not empty
      expect(record.COMPANY_NAME).toBeTruthy(); // Check if company name is not empty
    }
  }
}

module.exports = { StoreRosterForeman };