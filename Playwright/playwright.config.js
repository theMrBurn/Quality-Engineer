// playwright.config.js
// @ts-check
const { devices } = require("@playwright/test");

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  reporter: "line",

  // Options shared for all projects.
  timeout: 90000,

  // Give failing tests 3 retry attempts
  retries: 3,

  use: {
    trace: "on-first-retry",

    //for login as superadmin
    storageState: "pw_auth_testenv.json",
  },

  // Options specific to each project.
  projects: [
    {
      name: "Desktop Chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "Desktop Safari",
      use: {
        browserName: "webkit",
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "Desktop Firefox",
      use: {
        browserName: "firefox",
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "Mobile Chrome",
      use: devices["Pixel 6"],
    },
    {
      name: "Mobile Safari",
      use: devices["iPhone 12"],
    },
  ],
};

module.exports = config;
