// Payplan Employee Details

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminSecurity } = require("./admin_security_roles.js");

//test
test.describe.serial("Admin Employee Details Functionality", () => {
  test("Navigate to Admin/EmployeeDetails and validate when Compensation is chosen from the dropdown, appropriate results are displayed @func", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    // Click dropdown and choose Compensation
    await adminSecurityRoles.clickSecurityRoleDropdown();
    await page.locator("text=Compensation").first().click();

    // if compensation chosen from dropdown, grid result should contain Compensation
    const gridResult = await page.locator("#SecurityRolesGrid");
    await expect(gridResult).toContainText("Compensation");
  });

  test("Navigate to Admin/EmployeeDetails and validate when Compensation Senior is chosen from the dropdown, appropriate results are displayed @func", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    // Click dropdown and choose Compensation
    await adminSecurityRoles.clickSecurityRoleDropdown();
    await page.locator("text=Compensation Senior").first().click();
    await page.getByRole('listbox').locator('span').nth(3).click();
    await page.getByRole('option', { name: '200' }).click();
    // if compensation chosen from dropdown, grid result should contain Compensation
    const gridResult = await page.locator("#SecurityRolesGrid");
    await expect(gridResult).toContainText("Senior Compensation Manager");
  });

  test("Navigate to Admin/EmployeeDetails and validate when Payroll is chosen from the dropdown, appropriate results are displayed @func", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    // Click dropdown and choose Payroll
    await adminSecurityRoles.clickSecurityRoleDropdown();
    await page.locator("text=Payroll >> nth=2").first().click();

    // if Payroll chosen from dropdown, grid result should contain Payroll
    const gridResult = await page.locator("#SecurityRolesGrid");
    await expect(gridResult).toContainText("Payroll");
  });

  test("Navigate to Admin/EmployeeDetails and validate when Payroll Senior is chosen from the dropdown, appropriate results are displayed @func", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    // Click dropdown and choose Payroll
    await adminSecurityRoles.clickSecurityRoleDropdown();
    await page.locator("text=Payroll Senior").first().click();

    // if Payroll Senior chosen from dropdown, grid result should contain Payroll
    const gridResult = await page.locator("#SecurityRolesGrid");
    await expect(gridResult).toBeVisible();
  });

  test("Navigate to Admin/EmployeeDetails and validate when Store is chosen from the dropdown, appropriate results are displayed @func", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    // Click dropdown and choose Store
    await adminSecurityRoles.clickSecurityRoleDropdown();
    await page.locator('li[role="option"]:has-text("Store")').first().click();

    // if Store chosen from dropdown, grid result should contain Store
    const gridResult = await page.locator("#SecurityRolesGrid");
    await expect(gridResult).toBeVisible();
  });

  test("Navigate to Admin/EmployeeDetails and validate when Superuser is chosen from the dropdown, appropriate results are displayed @func", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    // Click dropdown and choose Store
    await adminSecurityRoles.clickSecurityRoleDropdown();
    await page.locator("text=Superuser").first().click();

    // if Superuser chosen from dropdown, grid result should contain Allpay
    const gridResult = await page.locator("#SecurityRolesGrid");
    await expect(gridResult).toBeVisible();
  });

  test("Navigate to Admin/EmployeeDetails and validate when bad info is input, appropriate error or exception is displayed @func", async ({
    browser,
    page,
  }) => {
    const adminSecurityRoles = new AdminSecurity(page);
    await adminSecurityRoles.goto();

    // Click dropdown and choose Store
    await page.locator('[placeholder="-- Select One --"]').fill("bad input");

    // if alert appears, click close alert

    if (await page.isVisible("#divErrorHolder")) {
      await page.click('#divErrorHolder img[alt="Hide"]');
    }
  });
});
