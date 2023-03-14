// global-setup.js
const { page } = require("@playwright/test");
const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=8084fcc6-32db-4d75-99a6-7b5f6de9d3be&redirect_uri=https%3A%2F%2Fazwu2apweb-uat.azurewebsites.net%2Fsignin-oidc&response_type=code&scope=openid%20profile%20offline_access&code_challenge=Ypg_IFFVyuJOH2bjZfnBkGNmuFLjo36cWLpv3Tb3YhQ&code_challenge_method=S256&response_mode=form_post&nonce=638040607030432746.NTVmMjAyNDMtZTkzZC00ZTEyLWEzMDEtMjBjNWEyODAwZmVkNjkyODMzYWItOWE4Yy00NWE0LTgyODUtYTU2ODMzNjMyMGIy&client_info=1&x-client-brkrver=IDWeb.1.15.0.0&state=CfDJ8NSSz-yKTlRPogxYC4Gv-2BYAz7iKigs98Vsbu3QWPQxUJ_lN-e9ex5oBvozfapGdSqpPL-T-uRHUjxUGRSFn7fAXRHUBZZSeQWCURgR5cp5ysmbS96sTimoVkv0_WtqF1wkl6b1zlAHdmGChg9LO5_HK7Geb1bs0oAlZv1CSJVguwS24usYL8zhTKvolvZMmKmx1HLKRwq4oXR4FHJK9dlF_OtsPhQXj3jBs6B3ppNBGnCmQzEt9HMo3SBxDdJUZ8plIwtfKXv40E_PgJ9_M0UZ0v4TngCGOYostFLNRv36pa6Ek7k7xDjtggtLJ0krvoTuqMJwqQABNc-GziYYQkr2fveuRKQ75Tbrp-yjRzH8cqKZZpDuYrHn7qmmEOuLKysaCYkvmaFrtu6xvdWyDA0&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.0.0"
  );

  //input username
  await page
    .locator('[placeholder="someone\\@example\\.com"]')
    .fill("u_AP_SupUser_UAT@lithia.com");

  //input pass
  await Promise.all([
    page.waitForURL(/*{ url: https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=8084fcc6-32db-4d75-99a6-7b5f6de9d3be&redirect_uri=https%3A%2F%2Fazwu2apweb-uat.azurewebsites.net%2Fsignin-oidc&response_type=code&scope=openid%20profile%20offline_access&code_challenge=Ypg_IFFVyuJOH2bjZfnBkGNmuFLjo36cWLpv3Tb3YhQ&code_challenge_method=S256&response_mode=form_post&nonce=638040607030432746.NTVmMjAyNDMtZTkzZC00ZTEyLWEzMDEtMjBjNWEyODAwZmVkNjkyODMzYWItOWE4Yy00NWE0LTgyODUtYTU2ODMzNjMyMGIy&client_info=1&x-client-brkrver=IDWeb.1.15.0.0&state=CfDJ8NSSz-yKTlRPogxYC4Gv-2BYAz7iKigs98Vsbu3QWPQxUJ_lN-e9ex5oBvozfapGdSqpPL-T-uRHUjxUGRSFn7fAXRHUBZZSeQWCURgR5cp5ysmbS96sTimoVkv0_WtqF1wkl6b1zlAHdmGChg9LO5_HK7Geb1bs0oAlZv1CSJVguwS24usYL8zhTKvolvZMmKmx1HLKRwq4oXR4FHJK9dlF_OtsPhQXj3jBs6B3ppNBGnCmQzEt9HMo3SBxDdJUZ8plIwtfKXv40E_PgJ9_M0UZ0v4TngCGOYostFLNRv36pa6Ek7k7xDjtggtLJ0krvoTuqMJwqQABNc-GziYYQkr2fveuRKQ75Tbrp-yjRzH8cqKZZpDuYrHn7qmmEOuLKysaCYkvmaFrtu6xvdWyDA0&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.0.0' }*/),
    page.locator("text=Next").click(),
  ]);

  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill("2:9I&+S/YBqn7O-");

  // Click text=Sign in
  await Promise.all([
    page.waitForURL(/*{ url: 'https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/login' }*/),
    page.locator("text=Sign in").click(),
  ]);

  // Click text=Don't show this again
  await page.locator("text=Don't show this again").click();
  // Click text=Yes
  await Promise.all([
    page.waitForURL(/*{ url: 'https://azwu2apweb-uat.azurewebsites.net/Payroll' }*/),
    page.locator("text=Yes").click(),
  ]);

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "./helpers" });
  await browser.close();
};
