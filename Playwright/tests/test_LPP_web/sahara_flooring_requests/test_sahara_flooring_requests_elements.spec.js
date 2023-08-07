// Sahara Flooring Requests Tab

// dependancies
const { test, expect } = require("@playwright/test");
const { SaharaFlooringRequests } = require("./sahara_flooring_requests.js");

//test
test.describe
  .serial("Saraha Floring Center / Requests - Page Elements @smoke", () => {
  test("Navigate to Saraha Flooring Requests and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const saharaFlooringRequests = new SaharaFlooringRequests(page);
    await saharaFlooringRequests.goto();

    // validate expected page elements have loaded
    await saharaFlooringRequests.getPageHeader();
    await saharaFlooringRequests.getPayoffsTab();
    await saharaFlooringRequests.getRequestsTab();
    await saharaFlooringRequests.getForecastTab();
    await saharaFlooringRequests.getButtonRow();
    await saharaFlooringRequests.getButtonGLP();
    await saharaFlooringRequests.getGrid();
    await saharaFlooringRequests.getGridColumnStoreNum();
    await saharaFlooringRequests.getGridColumnDealerCode();
    await saharaFlooringRequests.getGridLogon();
    await saharaFlooringRequests.getGridBankDDA();
    await saharaFlooringRequests.getGridStockNum();
    await saharaFlooringRequests.getGridColumnVIN();
    await saharaFlooringRequests.getGridColumnAccount();
    await saharaFlooringRequests.getGridColumnAmount();
    await saharaFlooringRequests.getGridColumnContractDate();

    // validate grid elements
    await saharaFlooringRequests.getGrid();
  });
});
