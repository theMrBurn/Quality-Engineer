// Payroll Dashboard

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayrollAudit } = require("./payroll_audit.js");

// user
test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe.serial("Payroll /Audit elements", () => {
  test("Navigate to /Payroll/Audit and validate Company dropdown functionality", async ({
    browser,
    page,
  }) => {
    const payrollAudit = new PayrollAudit(page);
    await payrollAudit.goto();

    await payrollAudit.getCompanyDropdown();
    await payrollAudit.clickCompanyDropdown();
    await payrollAudit.inputCompanyDropdown("Spokane BMW");

    const SpokaneBMW = await page.innerText("text=Spokane BMW");
    expect(SpokaneBMW).toBe("Spokane BMW (L0052)");
  });

  test("Navigate to /Payroll/Audit and validate PPE Date dropdown functionality", async ({
    browser,
    page,
  }) => {
    const payrollAudit = new PayrollAudit(page);
    await payrollAudit.goto();

    await payrollAudit.getPPEDateDropdown();
    await payrollAudit.clickPPEdateDropdown();
    await payrollAudit.inputPPEdateDropdown("07/15/2021");

    const ppeDate = await page.innerText("text=07/15/2021");
    expect(ppeDate).toBe("07/15/2021");
  });

  test("Navigate to /Payroll/Audit and validate when Company and PPE Date entered, audit for the correct Date is displayed on the grid", async ({
    browser,
    page,
  }) => {
    const payrollAudit = new PayrollAudit(page);
    await payrollAudit.goto();

    await payrollAudit.inputCompanyDropdown("Spokane BMW");
    await payrollAudit.inputPPEdateDropdown("07/15/2021");

    const CompleteDateGridcell = await page.innerText('text="07/21/2021"');
    expect(CompleteDateGridcell).toBe("07/21/2021");
  });
});
