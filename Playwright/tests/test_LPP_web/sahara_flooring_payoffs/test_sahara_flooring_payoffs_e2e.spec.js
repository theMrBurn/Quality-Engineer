// Sahara Flooring Payoffs Tab

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaFlooringPayoffs } = require("./sahara_flooring_payoffs.js");

//test
test.describe.serial("Saraha Flooring Payoffs Tab - End to End @e2e", () => {
  test("Mock Date & Time in browser and attempt to perform Upload step for Flooring", async ({
    page,
  }) => {
    // Perform test steps here using the mocked date and time

    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await wait(5000); //
    await saharaFlooringPayoffs.amokTime("2024-07-31T12:00:00Z");
    await wait(5000); //
    await saharaFlooringPayoffs.goto();
    await wait(5000); //
    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring");
    await wait(5000); //
    await saharaFlooringPayoffs.uploadFiles();
    // const successMessage = this.page.getByRole("heading", { name: "Success!" });
    // await expect(successMessage).toBeVisible();

    const inProgressMessage = page.getByText(
      "FPO File Load in progress, please check back in a few minutes.",
    );
    await expect(inProgressMessage).toBeVisible();

    async function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  });

  test("Mock Date & Time in browser and attempt to reset FPO records via /Admin endpoint", async ({
    page,
  }) => {
    // Perform test steps here using the mocked date and time

    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);

    await saharaFlooringPayoffs.amokTime("2024-07-31T12:00:00Z");

    await saharaFlooringPayoffs.goto();
    await wait(300000); //
    await saharaFlooringPayoffs.uploadButtonIsUnavailable();
    await wait(2000); //
    const pageURL = await page.url();
    await expect(pageURL).toContain("/flooring");
    await wait(2000); //
    await saharaFlooringPayoffs.getGrid();
    await wait(2000); //
    await saharaFlooringPayoffs.removeFPOrecords();

    async function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  });
});
