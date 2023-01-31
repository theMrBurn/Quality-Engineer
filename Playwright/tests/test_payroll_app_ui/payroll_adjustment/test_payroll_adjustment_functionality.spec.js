// Payroll Adjustment

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollAdjustment } = require("./payroll_adjustment.js");

//test
test.describe.serial("Payroll /Adjustment interactive tests", () => {
  test("Navigate to /Payroll/Adjustment Validate Payroll Type options can be input @func", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    // Payroll Type
    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.getByRole("option", { name: "Accrual" }).click();
    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.getByRole("option", { name: "Audit" }).click();
    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.getByRole("option", { name: "Payroll" }).click();
  });

  test("Navigate to /Payroll/Adjustment Validate Company dropdown options can be input @func", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    // company
    await payrollAdjustment.clickPaygroupListDropdown();
    await page.getByRole("option", { name: "Medford CJD" }).click();
  });

  test("Navigate to /Payroll/Adjustment Load button is NOT present when input is incomplete @func", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.getLoadButtonNotVisible();
  });

  test("Navigate to /Payroll/Adjustment Load button IS present when input is complete @func", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.getByRole("option", { name: "Audit" }).click();

    await payrollAdjustment.clickPaygroupListDropdown();
    await page.getByRole("option", { name: "Medford CJD (L0004)" }).click();

    await payrollAdjustment.clickPPEdateDropdown();
    await page.getByRole("option", { name: "11/30/2022" }).click();

    await payrollAdjustment.getLoadButton();
  });

  test("Navigate to /Payroll/Adjustment Load button generates Adjustment form when input is complete for Payroll Type Accrual, company and PPE date @func", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();
    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.getByRole("option", { name: "Accrual" }).click();
    await payrollAdjustment.clickPaygroupListDropdown();
    await page.getByRole("option", { name: "Medford Toyota" }).click();
    await payrollAdjustment.clickPPEdateDropdown();
    await page.getByRole("option", { name: "11/15/2022" }).click();
    await payrollAdjustment.getAddAdjustmentButton();
  });

  test("Navigate to /Payroll/Adjustment Load button generates Adjustment form when input is complete for Payroll Type Audit, company and PPE date @func", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.getByRole("option", { name: "Audit" }).click();

    await payrollAdjustment.clickPaygroupListDropdown();
    await page.getByRole("option", { name: "Medford Toyota (L0006)" }).click();

    await payrollAdjustment.clickPPEdateDropdown();
    await page.getByRole("option", { name: "12/15/2022" }).click();

    const loadButton = page.getByTestId("Load");
    if (loadButton.isHidden()) {
      await payrollAdjustment.getAddAdjustmentButton();
    } else {
      if (loadButton.isVisible());
      await loadButton.click();
    }
  });

  test("Navigate to /Payroll/Adjustment Load button generates Adjustment form when input is complete for Payroll Type Payroll, company and PPE date @func", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.getByRole("option", { name: "Payroll" }).click();

    await payrollAdjustment.clickPaygroupListDropdown();
    await page.getByRole("option", { name: "Medford CJD (L0004)" }).click();

    await payrollAdjustment.clickPPEdateDropdown();
    await page.getByRole("option", { name: "02/15/2022" }).click();

    const loadButton = page.getByTestId("Load");

    if (loadButton.isHidden()) {
      await payrollAdjustment.getAddAdjustmentButton();
    } else {
      if (loadButton.isVisible());
      await loadButton.click();
    }
  });
});
