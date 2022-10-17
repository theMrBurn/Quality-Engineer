// Payroll Adjustment

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollAdjustment } = require("./payroll_adjustment.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Adjustment Bulk Upload tests", () => {
  test("Navigate to /Payroll/Adjustment and validate import records partial success functionality", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.locator('li[role="option"]:has-text("Payroll")').click();

    await payrollAdjustment.clickPaygroupListDropdown();
    await page.locator("text=Odessa Chevrolet (L0026)").click();
    await page.waitForLoadState("networkidle");

    await payrollAdjustment.clickPPEdateDropdown();
    await page.locator("text=08/15/2022").click();
    await page.waitForLoadState("networkidle");

    await payrollAdjustment.clickImportButton();
    await payrollAdjustment.getUploadAdjustmentHeader();

    await payrollAdjustment.getSelectFilesButton();
    await payrollAdjustment.uploadPartialSuccessAdjustment();
    await payrollAdjustment.clickImportFilesButton();

    const partialSuccess = page.locator(
      "#importDialog > div:nth-child(1) > div.failResults > div:nth-child(1) > span"
    );
    await expect(partialSuccess).toBeVisible();
  });

  test("Navigate to /Payroll/Adjustment and validate import records success functionality", async ({
    page,
  }) => {
    const payrollAdjustment = new PayrollAdjustment(page);
    await payrollAdjustment.goto();

    await payrollAdjustment.clickPayrollTypeListDropdown();
    await page.locator('li[role="option"]:has-text("Payroll")').click();

    await payrollAdjustment.clickPaygroupListDropdown();
    await page.locator("text=Odessa Chevrolet (L0026)").click();
    await page.waitForLoadState("networkidle");

    await payrollAdjustment.clickPPEdateDropdown();
    await page.locator("text=08/15/2022").click();
    await page.waitForLoadState("networkidle");

    await payrollAdjustment.clickImportButton();
    await payrollAdjustment.getUploadAdjustmentHeader();

    await payrollAdjustment.getSelectFilesButton();
    await payrollAdjustment.uploadSuccessAdjustment();
    await payrollAdjustment.clickImportFilesButton();

    const uploadSuccess = page.locator("#AddRecords");
    await expect(uploadSuccess).toBeVisible();
  });
});
