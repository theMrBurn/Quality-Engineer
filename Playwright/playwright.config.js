// playwright.config.js
// @ts-check
const { devices } = require("@playwright/test");

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  reporter: "line",

  // Options shared for all projects.
  timeout: 90000,

  // Give failing tests 3 retry attempts
  retries: 5,

  use: {
    launchOptions: {
      slowMo: 50,
    },

    trace: "on-first-retry",

    //for login as superadmin
    storageState: "pw_auth_testenv.json",
  },

  // Options specific to each project.
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
