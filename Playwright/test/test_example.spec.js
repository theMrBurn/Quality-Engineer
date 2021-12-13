const { test, expect } = require('@playwright/test');

test('Logon to /Payroll', async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth-testenv.json"
    })
    
    const page = await context.newPage();
    const cxtx = page.context();
    cxtx.storageState()

    await page.goto('https://azwu2apweb-test.azurewebsites.net/Payroll');
    await page.waitForTimeout(5000)
});