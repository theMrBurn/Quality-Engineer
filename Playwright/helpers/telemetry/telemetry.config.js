/**
 * Minimal Playwright config for running telemetry probe specs in isolation.
 *
 * The main `playwright.config.js` loads projects.json, which binds every
 * test run to an authenticated dealer project (baseURL, storageState).
 * The telemetry probe tests are pure / hermetic — they use
 * `page.setContent(...)` against inline HTML and don't need any of that.
 *
 * Run from the repo root:
 *
 *   npx playwright test \
 *     --config=Playwright/helpers/telemetry/telemetry.config.js
 *
 * Not wired into CI. Not referenced by projects.json. Delete the
 * `Playwright/helpers/telemetry/` directory and this config goes
 * with it.
 */

const path = require("path");

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: __dirname,
  testMatch: "*.spec.js",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"]],
  use: {
    headless: true,
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  outputDir: path.join(__dirname, ".test-results"),
};
