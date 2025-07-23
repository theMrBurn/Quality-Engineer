const { expect } = require("@playwright/test");

class PD20LoginPage {
    /**
     * @param {import('playwright').Page} page
     */
    
    constructor(page) {
        this.page = page;
        this.locators = {
            signInButton: () => this.page.getByRole('button', { name: 'Sign in with Microsoft' }),
            signInMButton: () => this.page.locator("id=idSIButton9"),
            kmsiCheckbox: () => this.page.locator("id=KmsiCheckboxField"),
        }
    }

    async goto(){
        await this.page.goto("/login");
        await this.page.waitForLoadState("load");
    }

    async login(){
        await this.locators.signInButton().click();
        await this.page.waitForURL('**/login.microsoftonline.com/**');
        await this.page
            .getByPlaceholder('someone@example.com')
            .fill('joaovassoler@lithia.com');
        await this.page.getByRole('button', { name: 'Next'}).click();
        await this.page
            .getByPlaceholder('Password')
            .fill('MunDOGaMeR#300')
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async loginAgain(){
        await this.locators.signInButton().click();
    }

    async twostepauthlogin() {
        await this.locators.kmsiCheckbox().click();
        await this.locators.signInMButton().click();
    }

    async checkElementVisibility(locatorName) {
        await this.page.waitForLoadState("load");
        const locatorFunction = this.locators[locatorName];

        try {
            const element = await locatorFunction().first();
            await expect(element).toBeVisible();
            await this.page.waitForLoadState("networkidle");
        } catch (originalError) {
            const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
            throw new Error(errorMessage);
        }
    }
}

module.exports = { PD20LoginPage }