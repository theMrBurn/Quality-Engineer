const { browser, test, expect } = require("@playwright/test");
const { PD20LoginPage } = require("./local_pd20_login_page");

test.describe.serial("Performance Dashboard 2.0 - Login Page", () => {
    test("Performance Dashboard 2.0 - Login Attempt", async ({ page }) => {

        const pd20LoginPage = new PD20LoginPage(page);
        await pd20LoginPage.goto();

        // Navigate to the login page
        await pd20LoginPage.goto();

        //const elementsToCheck = ["getUsername", "getPassword", "Sign in with Microsoft"];

        try {
            // Ensure elements are visible before interaction
            //await pd20LoginPage.checkElementVisibility(elementsToCheck);

            // Perform login action
            await pd20LoginPage.login();
            await pd20LoginPage.twostepauthlogin();

            await pd20LoginPage.loginAgain();

            await pd20LoginPage.page.waitForTimeout(3000);

        } catch (error) {
            console.error("Error during login:", error);
        }
    });
});