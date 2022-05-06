// Payroll Regular

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollRegular } = require("./payroll_regular.js");

// user
test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe("Payroll /Regular - dropdowns functional check", () => {
  test("Navigate to Payroll /Regular and interact with Company dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // company
    await payrollRegular.inputCompanyDropdown("L0004");
  });

  test("Navigate to Payroll /Regular and interact with Pay Group dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // region
    await payrollRegular.inputPayRegionListDropdown("Cali");

    await payrollRegular.inputPayRegionListDropdown("East 2");

    await payrollRegular.inputPayRegionListDropdown("East P");

    await payrollRegular.inputPayRegionListDropdown("East Semi");

    await payrollRegular.inputPayRegionListDropdown("Hawaii");

    await payrollRegular.inputPayRegionListDropdown("Midwest");

    await payrollRegular.inputPayRegionListDropdown("West");
  });

  test("Navigate to Payroll /Regular and interact with Pay Calendar dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // pay calendar
    await payrollRegular.inputPayCalendarListDropdown("Semi");

    await payrollRegular.inputPayCalendarListDropdown("Weekly");

    await payrollRegular.inputPayCalendarListDropdown("Bi-wee");

    await payrollRegular.inputPayCalendarListDropdown("Biwee");

    await payrollRegular.inputPayCalendarListDropdown("2");
  });

  test("Navigate to Payroll /Regular and interact with Status dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // status
    await payrollRegular.inputPayStatusListDropdown("Not");
    await payrollRegular.inputPayStatusListDropdown("Proc");
    await payrollRegular.inputPayStatusListDropdown("Err");
    await payrollRegular.inputPayStatusListDropdown("Prelim");
    await payrollRegular.inputPayStatusListDropdown("Compl");
    await payrollRegular.inputPayStatusListDropdown("Data");
  });

  test("Navigate to Payroll /Regular and interact with Data Load dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // Data Load
    await payrollRegular.inputPayDataLoadListDropdown("Complete");
    await payrollRegular.inputPayDataLoadListDropdown("Incom");
  });

  test("Navigate to Payroll /Regular and interact with Input Sheet dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // input Sheet
    await payrollRegular.inputPayInputSheetListDropdown("Complete");
    await payrollRegular.inputPayInputSheetListDropdown("Incom");
  });

  test("Navigate to Payroll /Regular and interact with Adjustment dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // Adjustment
    await payrollRegular.inputPayAdjustmentListDropdown("Complete");
    await payrollRegular.inputPayAdjustmentListDropdown("Incom");
  });

  test("Navigate to Payroll /Regular and interact with Register Review Payroll dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // Reg Rev Payroll
    await payrollRegular.inputPayRegisterReviewPayrollDropdown("Complete");
    await payrollRegular.inputPayRegisterReviewPayrollDropdown("Incom");
  });

  test("Navigate to Payroll /Regular and interact with Register Review Company dropdown", async ({
    page,
  }) => {
    const payrollRegular = new PayrollRegular(page);

    await payrollRegular.goto();

    // Reg Rev Company
    await payrollRegular.inputPayRegisterReviewLocationDropdown("Complete");
    await payrollRegular.inputPayRegisterReviewLocationDropdown("Incom");
  });
});
