// PD 2.0 Web


// Import the required dependencies
const { browser, test, expect } = require("@playwright/test");
const { PD20MainPage } = require("./pd20_main_page.js");

test.describe.serial("Performance Dashboard 2.0 - Main Page Render", () => {
    test.slow();

    test("Performance Dashboard 2.0 - Main Page", async ({ page }) => {

        const pd20MainPage = new PD20MainPage(page);
        await pd20MainPage.goto();

        try {
            await expect(page.locator('.MuiTypography-h4')).toContainText('Profile');
        } catch (error) {
            console.error("Error during login:", error);
        }
    });
});