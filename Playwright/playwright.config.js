// playwright.config.js
// @ts-check
const { devices } = require("@playwright/test");

/** @type {import('@playwright/test').PlaywrightTestConfig} */
//@ts-check

const config = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  globalSetup: require.resolve("./global-setup.js"),

  use: {
    trace: "retain-on-failure",

    //for login as superadmin
    storageState: "pw_auth_testenv.json",
  },

  reporter: "html",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};

module.exports = config;
