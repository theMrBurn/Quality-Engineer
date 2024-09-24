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

    const locatorNames = [
      "payrollUploadText",
      "payCalendarText",
      "ppeDateUploadText",
      "accountingMonthDate",
      "uploadTimecardText",
      "uploadButtonText",
      "payrollProcessingTasksText",
      "taskText",
      "paycalendarListDropdown",
      "ppeDateDropdown",
      "accountingMonthCalendar",
      "accountingMonthDateDropdown",
      "payGroupRegionDropdown",
      "ppeDateProcessingDropdown",
      "tasksDropdown",
      "uploadButton"
    ];

    for (const locatorName of locatorNames) {
      await payrollUpload.checkElementVisibility(locatorName);
    }
  });
});
