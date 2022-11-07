// Payroll Dashboard

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayrollAudit } = require("./payroll_audit.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Audit elements", () => {
  test("Navigate to /Payroll/Audit and validate Page elements have loaded @smoke", async ({
    browser,
    page,
  }) => {
    const payrollAudit = new PayrollAudit(page);
    await payrollAudit.goto();

    await payrollAudit.getAuditHeader();
    await payrollAudit.getCompanyText();
    await payrollAudit.getPPEdateText();
    await payrollAudit.getCompanyDropdown();
    await payrollAudit.getPPEDateDropdown();
    await payrollAudit.getDataLoadGridLabel();
    await payrollAudit.getRunDateGridLabel();
    await payrollAudit.getCompleteDateGridLabel();
    // await payrollAudit.getRunButtonGridColumn(); -- needs data test tag
    await payrollAudit.getAuditDateGridLabel();
    await payrollAudit.getReportGridLabel();
  });
});
