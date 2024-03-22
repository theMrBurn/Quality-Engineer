// Escalade CVP

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { EscaladeVDT } = require("./escalade_vdt.js");

//test
test.describe.serial("Escalade VDT - Page Elements @smoke", () => {
  test("Navigate to Escalade VDT and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const escaladeVDT = new EscaladeVDT(page);
    await escaladeVDT.goto();

    try {
      //validate expected text elements have loaded
      const locatorNames = [
        "pageHeader",
        "vehicleDocTrackingLabel",
        "vdtActionColumn",
        "vdtTitleRiskColumn",
        "vdtDMVRiskColumn",
        "vdtLNumColumn",
        "vdtStoreColumn",
        "vdtStockNumColumn",
        "vdtTitleStatusColumn",
        "vdtAgeColumn",
        "vdtStockDateColumn",
        "vdtVINColumn",
        "vdtYearColumn",
        "vdtMakeColumn",
        "vdtModelColumn",
        "vdtDealNumberColumn",
        "vdtSoldDateColumn",
        "vdtDealStatusColumn",
        "vdtSaleTypeColumn",
        "vdtSourceTypeColumn",
        "vdtCustomerColumn",
        "vdtDMVProcDateColumn",
        "vdtContractDateColumn",
      ];

      for (const locatorName of locatorNames) {
        await escaladeVDT.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
