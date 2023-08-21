// Saraha Lienholder Management Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaLHMweb } = require("./sahara_lhm.js");

//test
test.describe
  .serial("Saraha Lienholder Management Web - Page Elements @func", () => {
  test("Navigate to Saraha Lienholder Management Web, enter search term, hit reset, repeat for several different entries", async ({
    browser,
    page,
  }) => {
    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();
    await saharaLHM.locators.searchBar().fill("Portland");
    await page.getByRole("button", { name: "Reset Filters" }).click();

    await saharaLHM.locators.searchBar().fill("Payoff Dept");
    await page.getByRole("button", { name: "Reset Filters" }).click();

    await saharaLHM.locators.searchBar().fill("Check");
    await page.getByRole("button", { name: "Reset Filters" }).click();
  });
});
