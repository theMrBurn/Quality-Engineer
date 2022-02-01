// global-setup.js
const { page } = require("@playwright/test");

module.exports = async () => {
  // Sign in using the Super User json
  const context = await browser.newContext({
    storageState: "./pw_auth_testenv.json",
  });

  const page = await context.newPage();
  const cxtx = page.context();
  cxtx.storageState();

  //await page.goto("https://azwu2apweb-test.azurewebsites.net/Payroll");
  await browser.close();
};
