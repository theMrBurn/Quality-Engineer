// Sahara Flooring Payoffs Tab

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaFlooringPayoffs } = require("./sahara_flooring_payoffs.js");

//test
test.describe
  .serial("Saraha Floring Center / Payoffs - Page Elements @smoke", () => {
  test("Navigate to Saraha Flooring Payoffs and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringPayoffs = new SaharaFlooringPayoffs(page);
    await saharaFlooringPayoffs.goto();

    // validate expected page elements have loaded
    await saharaFlooringPayoffs.getPageHeader();
    await saharaFlooringPayoffs.getPayoffsTab();
    await saharaFlooringPayoffs.getRequestsTab();
    await saharaFlooringPayoffs.getForecastTab();
    await saharaFlooringPayoffs.getButtonRow();
    await saharaFlooringPayoffs.getUploadsButton();
    await saharaFlooringPayoffs.getButtonGLP();
    await saharaFlooringPayoffs.getGrid();
    await saharaFlooringPayoffs.getGridColumnStoreNum();
    await saharaFlooringPayoffs.getGridColumnDealerCode();
    await saharaFlooringPayoffs.getGridLogon();
    await saharaFlooringPayoffs.getGridBankDDA();
    await saharaFlooringPayoffs.getGridDealNum();
    await saharaFlooringPayoffs.getGridStockNum();
    await saharaFlooringPayoffs.getGridColumnVIN();
    await saharaFlooringPayoffs.getGridColumnAccount();
    await saharaFlooringPayoffs.getGridColumnRequiredPay();
    await saharaFlooringPayoffs.getGridColumnAmount();
    await saharaFlooringPayoffs.getGridColumnContractDate();
    await saharaFlooringPayoffs.getGridColumnCriteria();

    // validate grid elements
    await saharaFlooringPayoffs.getGrid();
  });
});
