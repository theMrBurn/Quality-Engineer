// @ts-check
const path = require("path");
const fs = require("fs");

/**
 * Helper function to resolve storageState paths relative to the config file.
 * @param {Array} projects
 * @returns {Array}
 */
function resolveStorageState(projects) {
  return projects.map((project) => {
    if (project.use && project.use.storageState) {
      return {
        ...project,
        use: {
          ...project.use,
          storageState: path.resolve(__dirname, project.use.storageState),
        },
      };
    }
    return project;
  });
}

/**
 * Helper function to transform project name to an environment variable key.
 * Example: "FI_mgmt_API_DEV" => "BASEURL_FI_MGMT_API_DEV"
 * @param {string} projectName
 * @returns {string}
 */
function toEnvVarKey(projectName) {
  // Uppercase, replace non-alphanumeric with underscore, prefix BASEURL_
  return "BASEURL_" + projectName.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
}

// Load projects from JSON file with defensive error handling
let projects = [];
try {
  const projectsPath = path.resolve(__dirname, "projects.json");
  if (fs.existsSync(projectsPath)) {
    const rawProjects = fs.readFileSync(projectsPath, "utf-8");
    projects = JSON.parse(rawProjects);
  } else {
    console.warn(`Warning: projects.json not found at ${projectsPath}`);
  }
} catch (err) {
  console.error("Error reading or parsing projects.json:", err);
}

console.log("Loaded projects:", projects);

projects = resolveStorageState(projects);

// projects.json carries `grep` as a string (JSON has no RegExp literal).
// Playwright's project config requires a RegExp instance — convert here.
projects = projects.map((project) => {
  if (typeof project.grep === "string") {
    return { ...project, grep: new RegExp(project.grep) };
  }
  return project;
});

// Defensive map to avoid accessing undefined properties and check baseURL presence
projects = projects.map((project) => {
  if (!project.use) project.use = {};
  const envKey = toEnvVarKey(project.name);
  // BASEURL_<PROJECT> env var takes highest priority (per-project override).
  // process.env.BASEURL is the generic fallback used by `make test BASEURL=...`
  // and the ADO pipeline baseUrl parameter.
  const baseURL = process.env[envKey] || project.use.baseURL || process.env.BASEURL;

  if (!baseURL) {
    console.warn(`Warning: baseURL missing for project "${project.name}"`);
  }

  return {
    ...project,
    use: {
      ...project.use,
      baseURL,
    },
  };
});

// PLAYWRIGHT_PROJECT env var — restricts which projects are loaded into the runner.
// Used by devcontainer profiles (devcontainer.json sets this per profile) so that
// `npx playwright test` inside the container only sees the active project without
// requiring a --project flag.
// The Makefile and pipeline always pass --project explicitly and do not set this var.
const singleProject = process.env.PLAYWRIGHT_PROJECT;
if (singleProject) {
  const filtered = projects.filter((p) => p.name === singleProject);
  if (filtered.length === 0) {
    console.warn(`Warning: PLAYWRIGHT_PROJECT="${singleProject}" matched no projects in projects.json`);
  } else {
    projects = filtered;
  }
}

console.log("Configured projects:", projects);

/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  globalSetup: "./Playwright/base/globalSetup",

  testDir: "Playwright/tests",

  /* Maximum time one test can run for. */
  timeout: 10 * 90 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10 * 80 * 100,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 3,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 6,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["junit", { outputFile: "Playwright/test_results/test-xray-report.xml" }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10 * 80 * 100,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    launchOptions: {
      slowMo: 360,
    },
    screenshot: "only-on-failure",
  },

  /* Load projects dynamically */
  projects: projects,

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "Playwright/test_results",
};

module.exports = config;
