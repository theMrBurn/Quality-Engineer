// Payroll Store Input Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollUpload } = require("./payroll_upload.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Upload elements", () => {
  test("Navigate to /Payroll/Upload and validate Page elements have loaded", async ({
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();
    await payrollUpload.getPayCalendarText();
    await payrollUpload.getPPEdateText();
    await payrollUpload.getAccountingMonthDateText();
    await payrollUpload.getPayrollUploadText();
    await payrollUpload.getpayCalendarDropdown();
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.getAccountingMonthDateDropdown();
    await payrollUpload.getUploadButtonText();
    await payrollUpload.getUploadButton();
  });
});
