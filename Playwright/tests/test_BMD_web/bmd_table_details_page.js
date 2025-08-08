const { expect } = require('playwright/test');

class BMDTableDetailsPage {
    /**
     * @param {import('playwright').Page} page
     * @param {String} tableId
     */
    constructor(page, tableId) {
        this.page = page;
        this.tableId = tableId;

        this.locators = {
            tableName: () => this.page.locator('.MuiTypography-root.MuiTypography-h5'),
            backToMainPageButton: () => this.page.getByText('All Data Tables'),
        };
    }

    // Navigate to endpoint
    async goto() {
        await this.page.goto(`/table/${this.tableId}`);
        await this.page.waitForLoadState("load");
    }

    // get page elements
    async checkElementVisibility(locatorName) {
        await this.page.waitForLoadState("networkidle");
        const locatorFunction = this.locators[locatorName];

        try {
            const element = await locatorFunction().first();
            await expect(element).toBeVisible();
        } catch (originalError) {
            const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
            throw new Error(errorMessage);
        }
    }

    // check text on page elements
    async checkElementText(locatorName, expectedText) {
        await this.page.waitForLoadState("networkidle");
        const locatorFunction = this.locators[locatorName];

        try {
            const element = await locatorFunction().first();
            await expect(element).toContainText(expectedText);
        } catch (originalError) {
            const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
            throw new Error(errorMessage);
        }
    }

    /// interact with elements
    async clickElement(locatorName) {
        const locatorFunction = this.locators[locatorName];

        try {
            const element = await locatorFunction().first();
            await element.click();
        } catch (originalError) {
            const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
            throw new Error(errorMessage);
        }
    }
}
module.exports = { BMDTableDetailsPage };