// global-setup.js
const { page } = require("@playwright/test");

// module.exports = async () => {
//   // Sign in using the Super User json
//   const context = await browser.newContext({
//     storageState: "./helpers",
//   });

//   const page = await context.newPage();
//   const cxtx = page.context();
//   cxtx.storageState();
//   await browser.close();

//   // global-setup.js
const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=37657b65-6f6a-4c92-aaba-41c8dfc8726e&redirect_uri=https%3A%2F%2Fazwu2apweb-test.azurewebsites.net%2Fsignin-oidc&response_type=code&scope=openid%20profile%20offline_access&code_challenge=z3oiY07NPiqk1Gi_nJLTKu6o7opVs_oCj0AVEBVhEP0&code_challenge_method=S256&response_mode=form_post&nonce=637968902320221133.NmNkM2Q0ZjMtNThmYi00NjFmLThlMWItY2FhMDc3N2QyOTAxOGEwNDVkMmMtNGQ4ZC00NzY2LTgyN2UtYzJmNTllZGJmMWY3&client_info=1&x-client-brkrver=IDWeb.1.15.0.0&state=CfDJ8GOyBCL0ttlDijd0Me3i4h8pJhv7QTG395otpr-i0tQtZXGkDf9UFFIIIpwqXXAOctdL6gd8XZnv90b24Wfw9t-GZAeg2uSDci5_JuxPrpPuOdXIbW_Fln7TqBlmAMFHhD6qbBqvU3mwQuDq9e33Nbc6UtuaJzj_545zArOAFZV-7THklzXLwY5W1tkNH3DOM3QrgoEtNtzQuzCyUVTQWZEbshxrNskVVnbPfvuv-f-dhgb7i3A3ZgeGkQ3YOERAx9s2-h0A42igA_qq5mzRq0mBWmKliD6m7hczVoYp4wMvU4zb_a_Fj8ZEad4Z6j5T8ythNQgCr3IReWjpzswFaMJ66qFdNgInq6Il0BYuO9sfaQYJL6JiYsYwvBb3xYMGuvGxikWOdyPlg_NcL25-Mhs&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.0.0"
  );

  //input username
  await page
    .locator('[placeholder="someone\\@example\\.com"]')
    .fill("u_AP_SupUser_Test@lithia.com");

  //input pass
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=37657b65-6f6a-4c92-aaba-41c8dfc8726e&redirect_uri=https%3A%2F%2Fazwu2apweb-test.azurewebsites.net%2Fsignin-oidc&response_type=code&scope=openid%20profile%20offline_access&code_challenge=z3oiY07NPiqk1Gi_nJLTKu6o7opVs_oCj0AVEBVhEP0&code_challenge_method=S256&response_mode=form_post&nonce=637968902320221133.NmNkM2Q0ZjMtNThmYi00NjFmLThlMWItY2FhMDc3N2QyOTAxOGEwNDVkMmMtNGQ4ZC00NzY2LTgyN2UtYzJmNTllZGJmMWY3&client_info=1&x-client-brkrver=IDWeb.1.15.0.0&state=CfDJ8GOyBCL0ttlDijd0Me3i4h8pJhv7QTG395otpr-i0tQtZXGkDf9UFFIIIpwqXXAOctdL6gd8XZnv90b24Wfw9t-GZAeg2uSDci5_JuxPrpPuOdXIbW_Fln7TqBlmAMFHhD6qbBqvU3mwQuDq9e33Nbc6UtuaJzj_545zArOAFZV-7THklzXLwY5W1tkNH3DOM3QrgoEtNtzQuzCyUVTQWZEbshxrNskVVnbPfvuv-f-dhgb7i3A3ZgeGkQ3YOERAx9s2-h0A42igA_qq5mzRq0mBWmKliD6m7hczVoYp4wMvU4zb_a_Fj8ZEad4Z6j5T8ythNQgCr3IReWjpzswFaMJ66qFdNgInq6Il0BYuO9sfaQYJL6JiYsYwvBb3xYMGuvGxikWOdyPlg_NcL25-Mhs&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.0.0' }*/),
    page.locator("text=Next").click(),
  ]);

  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill("IhHF:k8AvX$4u-s");

  // Click text=Sign in
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/login' }*/),
    page.locator("text=Sign in").click(),
  ]);

  // Click text=Don't show this again
  await page.locator("text=Don't show this again").click();
  // Click text=Yes
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://azwu2apweb-test.azurewebsites.net/Payroll' }*/),
    page.locator("text=Yes").click(),
  ]);

  // Save signed-in state to 'storageState.json'.
  await page
    .context()
    .storageState({ path: "Playwright/helpers/allPay_superUser.json" });
  await browser.close();
};
