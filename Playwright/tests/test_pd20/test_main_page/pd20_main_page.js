const { expect } = require("@playwright/test");

class PD20MainPage {
    /**
     * @param {import('playwright').Page} page
     */
    
    constructor(page) {
        this.page = page;
        
        this.locators = {
            signInButton: () => this.page.getByRole("button", { name: "Sign in with Microsoft"}),
            navBar: () => this.page.getByRole("banner"),
            storeButton: () => this.page.getByRole("button", { name: "Selected Stores"}),
            supportLink: () => this.page.getByRole("link", { name: "Support"})
        }
    }

    async goto(){
        await this.page.goto("/");
        await this.page.waitForLoadState("load");
        await this.locators.signInButton().click();
    }   

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

module.exports = { PD20MainPage }