const { expect } = require('playwright/test');

class BMDMainPage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;

        this.locators = {
            //buttons
            demoButton: () => this.page.getByRole("button", { name: "Click Me" }),
        };
    }

    // Navigate to endpoint
    async goto() {
        await this.page.goto("/");
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
module.exports = { BMDMainPage };