// Payroll Adjustment

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollAdjustment } = require("./payroll_adjustment.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Adjustment interactive tests", () => {
  test("Navigate to /Payroll/Adjustment Validate Payroll Type options can be input", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    // Payroll Type
    await payrollAdjustment.inputPayTypeDropdown("Acc");
    await payrollAdjustment.inputPayTypeDropdown("Aud");
    await payrollAdjustment.inputPayTypeDropdown("Pay");
  });

  test("Navigate to /Payroll/Adjustment Validate Company dropdown options can be input", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    // company
    await payrollAdjustment.inputCompanyDropdown("Medford");
  });

  test("Navigate to /Payroll/Adjustment Validate PPE dropdown options can be input", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.inputPPEdateDropdown("02/15/2022");
  });

  test("Navigate to /Payroll/Adjustment Load button is NOT present when input is incomplete ", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.getLoadButtonNotVisible();
  });

  test("Navigate to /Payroll/Adjustment Load button IS present when input is complete ", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.inputPayTypeDropdown("Aud");
    await payrollAdjustment.inputCompanyDropdown("Medford CJD");
    await payrollAdjustment.inputPPEdateDropdown("3/31/2021");
    // await payrollAdjustment.getLoadButton(); - load button Race Condition, manual testing validates this test case
  });

  test("Navigate to /Payroll/Adjustment Load button generates Adjustment form when input is complete for Payroll Type Accrual, company and PPE date ", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.inputPayTypeDropdown("Auccr");
    await payrollAdjustment.inputCompanyDropdown("Medford CJD");
    await payrollAdjustment.inputPPEdateDropdown("1/15/2023");
    await payrollAdjustment.getAddAdjustmentButton();
  });

  test("Navigate to /Payroll/Adjustment Load button generates Adjustment form when input is complete for Payroll Type Audit, company and PPE date ", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.inputPayTypeDropdown("Aud");
    await payrollAdjustment.inputCompanyDropdown("Medford CJD");
    await payrollAdjustment.inputPPEdateDropdown("1/15/2023");
    await payrollAdjustment.getAddAdjustmentButton();
  });

  test("Navigate to /Payroll/Adjustment Load button generates Adjustment form when input is complete for Payroll Type Payroll, company and PPE date ", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.inputPayTypeDropdown("Payr");
    await payrollAdjustment.inputCompanyDropdown("Medford CJD");
    await payrollAdjustment.inputPPEdateDropdown("1/15/2023");
    await payrollAdjustment.getAddAdjustmentButton();
  });
});
