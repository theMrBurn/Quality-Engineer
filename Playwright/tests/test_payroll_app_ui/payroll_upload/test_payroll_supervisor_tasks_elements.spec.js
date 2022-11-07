// Payroll Supervisor Tasks

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollUpload } = require("./payroll_upload.js");

//test
test.describe.serial("Payroll /Upload elements", () => {
  test("Navigate to /Payroll/Upload and validate Page elements have loaded @smoke", async ({
    page,
  }) => {
    const payrollUpload = new PayrollUpload(page);
    await payrollUpload.goto();

    //payroll file uploads
    await payrollUpload.getPayCalendarText();
    await payrollUpload.getPPEdateUploadText();
    await payrollUpload.getAccountingMonthDateText();
    await payrollUpload.getPayrollUploadText();
    await payrollUpload.getpayCalendarDropdown();
    await payrollUpload.getPPEDateDropdown();
    await payrollUpload.getAccountingMonthDateDropdown();
    await payrollUpload.getUploadButtonText();
    await payrollUpload.getUploadButton();

    //payroll processing tasks
    await payrollUpload.getPayrollProcText();
    await payrollUpload.getPayGroupRegionDropdown();
    await payrollUpload.getPPEDateProcessingDropdown();
    await payrollUpload.getTasksText();
    await payrollUpload.getTasksDropdown();
  });
});
