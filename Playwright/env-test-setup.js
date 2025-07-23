// global-setup.js
const { chromium } = require("@playwright/test");

async function login(page, loginConfig) {
  const { url, username, password } = loginConfig;

  // Navigate to the login page
  await page.goto(url);

  // Input username
  await page.locator('[placeholder="Email, phone, or Skype"]').fill(username);

  // Click Next
  await Promise.all([
    page.waitForURL(/.*\/authorize/), // Adjust the regex pattern as necessary
    page.locator("text=Next").click(),
  ]);

  // Input password
  await page.locator('[placeholder="Password"]').fill(password);

  // Click Sign in
  await Promise.all([
    page.waitForURL(/.*\/login/), // Adjust the regex pattern as necessary
    page.locator("text=Sign in").click(),
  ]);

  // Handle any additional prompts if needed
  if (await page.isVisible("text=Don't show this again")) {
    await page.locator("text=Don't show this again").click();
    await Promise.all([
      page.waitForURL(/.*\/Payroll/), // Adjust the regex pattern as necessary
      page.locator("text=Yes").click(),
    ]);
  }

  // Save signed-in state
  await page.context().storageState({ path: "./helpers" });
}

module.exports = async (config) => {
  const skipLogin = process.env.SKIP_LOGIN;

  if (skipLogin) {
    console.log("Skipping login setup for tests.");
    return; // Skip the login process
  }

  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    // Define the login configuration
    const loginConfig = {
      url: "https://login.microsoftonline.com",
      username: "joaovassoler@lithia.com",
      password: "MunDOGaMeR#300",
    };

    // Perform login
    await login(page, loginConfig);
  } catch (error) {
    console.error("An error occurred during the global setup:", error);
    throw error; // Uncomment this line to stop the process on error
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
 