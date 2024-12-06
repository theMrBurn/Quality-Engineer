// dependancies
const { test, expect } = require("@playwright/test");
const { PriceToMarket } = require("./price_to_market_national.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/price_to_market_prod", () => {
  test.fixme("Will enable the test after the prod release");
  test("Price To Market Navigation", async function ({ browser, page }) {
    test.setTimeout(600000);
    const ptm = new PriceToMarket(page);
    // We can use these two methods in case if the storage state doesnt work
    await ptm.goto();
    await ptm.login();
    await ptm.twostepauthlogin();
    await ptm.NavigateToSalesPriceToMarketNational();
    await ptm.Validate85Units();
    await ptm.Validate8590Units();
    await ptm.Validate9095Units();
    await ptm.Validate95100Units();
    await ptm.Validate100105Units();
    await ptm.Validate105Units();
    await ptm.ValidateElementsInSummaryPage();
    await ptm.ValidateExport();
  });
});
