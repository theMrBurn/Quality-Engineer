// global-setup.js
const { page } = require("@playwright/test");
const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=48bfbb66-3d18-4294-8914-aef9dcb5dff7&redirect_uri=https%3A%2F%2Fazwu2aptest-dev.azurewebsites.net%2Fsignin-oidc&response_type=code&scope=openid%20profile%20offline_access&code_challenge=cPh9DSSJ40UW4MQ6kuTYCdAoiykfZ6kwWEZH9Eyim-s&code_challenge_method=S256&response_mode=form_post&nonce=638040472920622746.MDM4NjJkN2MtZGMxNy00ZTAxLTg5NjItZGYzYzRhNzViYTE5MTA1NmM4MWQtNzliYS00MzA2LTljN2MtZTVmMjQzZTcxOWVi&client_info=1&x-client-brkrver=IDWeb.1.15.0.0&state=CfDJ8LqfWBG1NMxAhCS56ph-JJAjpuu4vqZCnpIagHHPD4hO6Pi34qy6_CWURoeir1gtXzRanvpsDVq69591H1Fd-3fx_uraGnQGvduzmUGpEH1Ml_84TD7obTD7lb2arzdNnlaV-B5Y-yEHLZcrrAwgOIeTQcKDTK5ZGi7hCo2rtQtyXPhRHxrdRZE9VaDfo2zcfU9PD3JOoty-MTthLxopNd9F4cziNs-qyRc6qT_Iw2U5m_EkIwlIQypQjqV93zmqk-kibLWC2VyQPI-V57nfdfC4Ts-s5WIsDTOLaRaNC6HZa9KoLEpFR6GHIrAWEizn4kytIioGeN5nViC5ul3ahNoOurHwq8jrJ1gaEPwD6gekZup8tktnZZUTgkdgeZpjCRN5vlUfHB3u8GOnoRel1go&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.0.0"
  );

  //input username
  await page
    .locator('[placeholder="someone\\@example\\.com"]')
    .fill("u_AP_SupUser_Dev@lithia.com");

  //input pass
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/oauth2/v2.0/authorize?client_id=48bfbb66-3d18-4294-8914-aef9dcb5dff7&redirect_uri=https%3A%2F%2Fazwu2aptest-dev.azurewebsites.net%2Fsignin-oidc&response_type=code&scope=openid%20profile%20offline_access&code_challenge=cPh9DSSJ40UW4MQ6kuTYCdAoiykfZ6kwWEZH9Eyim-s&code_challenge_method=S256&response_mode=form_post&nonce=638040472920622746.MDM4NjJkN2MtZGMxNy00ZTAxLTg5NjItZGYzYzRhNzViYTE5MTA1NmM4MWQtNzliYS00MzA2LTljN2MtZTVmMjQzZTcxOWVi&client_info=1&x-client-brkrver=IDWeb.1.15.0.0&state=CfDJ8LqfWBG1NMxAhCS56ph-JJAjpuu4vqZCnpIagHHPD4hO6Pi34qy6_CWURoeir1gtXzRanvpsDVq69591H1Fd-3fx_uraGnQGvduzmUGpEH1Ml_84TD7obTD7lb2arzdNnlaV-B5Y-yEHLZcrrAwgOIeTQcKDTK5ZGi7hCo2rtQtyXPhRHxrdRZE9VaDfo2zcfU9PD3JOoty-MTthLxopNd9F4cziNs-qyRc6qT_Iw2U5m_EkIwlIQypQjqV93zmqk-kibLWC2VyQPI-V57nfdfC4Ts-s5WIsDTOLaRaNC6HZa9KoLEpFR6GHIrAWEizn4kytIioGeN5nViC5ul3ahNoOurHwq8jrJ1gaEPwD6gekZup8tktnZZUTgkdgeZpjCRN5vlUfHB3u8GOnoRel1go&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.0.0' }*/),
    page.locator("text=Next").click(),
  ]);

  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill("6UNQ195K7FDh!8(");

  // Click text=Sign in
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/f1a215ee-6910-4213-aec6-ac36fdca6048/login' }*/),
    page.locator("text=Sign in").click(),
  ]);

  // Click text=Don't show this again
  await page.locator("text=Don't show this again").click();
  // Click text=Yes
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://azwu2aptest-dev.azurewebsites.net/Payroll' }*/),
    page.locator("text=Yes").click(),
  ]);

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "./helpers" });
  await browser.close();
};
