// Saraha Lienholder Management Web

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaLHMweb } = require("./sahara_lhm.js");

//test
test.describe
  .serial("Saraha Lienholder Management Web - Page Elements @smoke", () => {
  test("Navigate to Saraha Lienholder Management Web and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const saharaLHM = new SaharaLHMweb(page);
    await saharaLHM.goto();

    // validate expected page elements have loaded
    await saharaFlooringRequests.getPageHeader();


    // validate grid elements
    await saharaFlooringRequests.getGrid();
  });
});
