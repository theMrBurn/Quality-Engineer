// @ts-check
const { devices } = require("@playwright/test");

// JUnit reporter config for Xray
const xrayOptions = {
  // Whether to add <properties> with all annotations; default is false
  embedAnnotationsAsProperties: true,

  // By default, annotation is reported as <property name='' value=''>.
  // These annotations are reported as <property name=''>value</property>.
  textContentAnnotations: ["test_description"],

  // This will create a "testrun_evidence" property that contains all attachments. Each attachment is added as an inner <item> element.
  // Disables [[ATTACHMENT|path]] in the <system-out>.
  embedAttachmentsAsProperty: "testrun_evidence",

  // Where to put the report.
  outputFile: "./test_results/test-xray-report.xml",
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  globalSetup: require.resolve("./Playwright/env-test-setup.js"),
  // use: {
  //   // Tell all tests to load signed-in state from 'storageState.json'.
  //   storageState: "allPay_superUser.json",
  // },

  testDir: "Playwright/tests",
  /* Maximum time one test can run for. */
  timeout: 10 * 80 * 100,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10 * 60 * 100,
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
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",

    launchOptions: {
      slowMo: 120,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "AtlasWeb",
      testDir: "Playwright/tests/test_LPP_web/atlas_web",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/atlas_test_env_auth.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "AtlasDealershipListings",
      testDir:
        "Playwright/tests/test_LPP_web/atlas_web/dealership_listings_view",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/atlas_test_env_auth.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "AtlasPlanDetailsView",
      testDir: "Playwright/tests/test_LPP_web/atlas_web/plan_details_view",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/atlas_test_env_auth.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "AtlasSalesGrossView",
      testDir: "Playwright/tests/test_LPP_web/atlas_web/sales_gross_profit",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/atlas_test_env_auth.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "AtlasSPFSSEView",
      testDir: "Playwright/tests/test_LPP_web/atlas_web/sales_gross_profit",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/atlas_test_env_auth.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "AtlasAPI",
      testDir: "Playwright/tests/test_LPP_api/atlas_api",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/atlas_test_env_auth.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "TahoeLOFAPI_Local",
      testDir: "Playwright/tests/test_LPP_api/tahoe_api",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "http://localhost:5000/api",
      },
    },

    {
      name: "TahoeLOFAPI_Test",
      testDir: "Playwright/tests/test_LPP_api/tahoe_api",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://azwu2loftest-apim.azure-api.net/api/",
      },
    },

    {
      name: "AllPayTest",
      testDir: "Playwright/tests/test_payroll_app_ui",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_allpay_superUser.json",
        baseURL: "https://azwu2apweb-test.azurewebsites.net/",
      },
    },

    {
      name: "AllPayDev",
      testDir: "Playwright/tests/test_payroll_app_ui",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/dev_allPay_superuser_auth.json",
        baseURL: "https://azwu2aptest-dev.azurewebsites.net/",
      },
    },

    {
      name: "AllPayUAT",
      testDir: "Playwright/tests/test_payroll_app_ui",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/uat_allPay_superuser_auth.json",
        baseURL: "https://azwu2apweb-uat.azurewebsites.net/",
      },
    },

    {
      name: "DenaliLPPTest",
      testDir: "Playwright/tests/test_LPP_web/denali_portal",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "SaharaLPOTest",
      testDir: "Playwright/tests/test_LPP_web/sahara_LPO",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "SaharaNewLienTest",
      testDir: "Playwright/tests/test_LPP_web/sahara_new_lien",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "SaharaFlooringPayoffs",
      testDir: "Playwright/tests/test_LPP_web/sahara_flooring_payoffs",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "SaharaFlooringRequests",
      testDir: "Playwright/tests/test_LPP_web/sahara_flooring_requests",
      timeout: 100 * 1000 * 10000,
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "SaharaLHM",
      testDir: "Playwright/tests/test_LPP_web/sahara_leinholder_management_web",
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "EscaladeCVP",
      testDir: "Playwright/tests/test_LPP_web/escalade_cvp",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "CamaroDMM",
      testDir: "Playwright/tests/test_LPP_web/camero_DMM",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/test_DenaliLPP_superUser.json",
        baseURL: "https://test.lpp.lithia.com/",
      },
    },

    {
      name: "SPEDev",
      testDir: "Playwright/tests/test_performance_dashboard",
      retries: 3,
    },

    {
      name: "Impact_Builder_Web_Test",
      testDir: "Playwright/tests/test_impact_builder_web",
      retries: 3,
      use: {
        storageState: "Playwright/helpers/impact_builder_TEST.json",
        baseURL: "https://app-allpaytest-wu2-web.azurewebsites.net/",
      },
    },

    // {
    //   name: "chromium",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     ignoreHTTPSErrors: true,
    //   },
    // },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     ignoreHTTPSErrors: true,
    //   },
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     ignoreHTTPSErrors: true,
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "Playwright/test_results",

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
