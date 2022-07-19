// global-setup.js
const { page } = require("@playwright/test");

module.exports = async () => {
  // Sign in using the Super User json
  const context = await browser.newContext({
    storageState: "./helpers",
  });

  const page = await context.newPage();
  const cxtx = page.context();
  cxtx.storageState();
  await browser.close();
};
