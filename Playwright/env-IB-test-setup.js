// global-setup.js
const { page } = require("@playwright/test");
const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=37657b65-6f6a-4c92-aaba-41c8dfc8726e&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fapp-allpaytest-wu2-web.azurewebsites.net%2F&client-request-id=0c9668ca-f53a-4548-987f-ee5dbb7a0247&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.32.0&client_info=1&code_challenge=L-dI46t2IzpI9d0f86RNIPYQGz2YXlpWZmVU9gr2gMY&code_challenge_method=S256&nonce=6198b848-040d-46e8-b04b-289ec9790311&state=eyJpZCI6IjU5NTZhZGVmLTAzOTktNDg4My1hMmY5LTU1NWE1MjIxY2JhNyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D"
  );

  //input username
  await page
    .locator('[placeholder="someone\\@example\\.com"]')
    .fill("u_AP_SupUser_UAT@lithia.com");

  //input pass
  await Promise.all([
    page.waitForURL(/*{ url: https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=37657b65-6f6a-4c92-aaba-41c8dfc8726e&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fapp-allpaytest-wu2-web.azurewebsites.net%2F&client-request-id=029f0697-99ce-48f6-b517-2e4ffa885599&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.32.0&client_info=1&code_challenge=Ky7dTJ9X1oLTlxNdE_wrfVVp0rUoWlYxIB_TsXWyS7w&code_challenge_method=S256&nonce=dc1c553c-85d6-4d4f-9ecd-377119c2d68b&state=eyJpZCI6ImMxM2U3NThhLWZlODAtNDIzYi1hMDdjLTIzZDVkM2I4YzY5MyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D' }*/),
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
    page.waitForURL(/*{ url: 'https://app-allpaytest-wu2-web.azurewebsites.net/' }*/),
    page.locator("text=Yes").click(),
  ]);

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "./helpers" });
  await browser.close();
};
