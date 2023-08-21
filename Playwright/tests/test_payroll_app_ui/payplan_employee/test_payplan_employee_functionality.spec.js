// Payplan Employee

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayplanEmployee } = require("./payplan_employee.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe("Payplan Employees - dropdowns and inputs functional check", () => {
  test("Navigate to Payplan /Employee and interact with Employee dropdown @func", async ({
    page,
  }) => {
    const payplanEmployee = new PayplanEmployee(page);

    await payplanEmployee.goto();

    // employee
    await payplanEmployee.inputEmployeeDropdown("Mark Valdez");

    // input employee and grid should show
    const employeeGridResult = await page.innerText("text=Mark Valdez");
    await page.getByRole("option", { name: "Mark Valdez (163056)" }).click();
    expect(employeeGridResult).toBe("Mark Valdez (163056)");

    const employeePayPlanID = await page.innerText("text=3828");
    expect(employeePayPlanID).toBe("3828");
  });

  test("Navigate to Payplan /Employee and interact with Employee and Company dropdown @func", async ({
    page,
  }) => {
    // test.fixme(
    //   "inputs that appear visible are coded hidden preventing success. Currently Covered by Manual testing"
    // );
    const payplanEmployee = new PayplanEmployee(page);

    await payplanEmployee.goto();

    // employee
    await payplanEmployee.inputEmployeeDropdown("204904");

    // input employee and grid should show
    const employeeGridResult = await page.innerText("text=Dean Faciane");
    await page.locator("text=Dean Faciane (204904)").click();
    expect(employeeGridResult).toBe("Dean Faciane (204904)");

    // company
    await payplanEmployee.inputCompanyDropdown("Seattle BMW");
    await page;
    await page
      .locator('li[role="option"]:has-text("Seattle BMW (L0110)")')
      .click();

    // input employee and grid should show
    const companyGridResult = await page.innerText("text=Seattle BMW");
    expect(companyGridResult).toBe("Seattle BMW (L0110)");
  });

  test("Navigate to Payplan /Employee and interact with Employee, Company, Job dropdown @func", async ({
    page,
  }) => {
    // test.fixme(
    //   "inputs that appear visible are coded hidden preventing success. Currently Covered by Manual testing"
    // );
    const payplanEmployee = new PayplanEmployee(page);

    await payplanEmployee.goto();

    // employee
    await payplanEmployee.inputEmployeeDropdown("99300");

    // input employee and grid should show
    const employeeGridResult = await page.innerText("text=Jeff Cartwright");
    await page.locator("text=Jeff Cartwright (99300)").click();
    expect(employeeGridResult).toBe("Jeff Cartwright (99300)");

    // company
    await payplanEmployee.inputCompanyDropdown();
    await page
      .locator('li[role="option"]:has-text("Des Moines Volkswagen (L0192)")')
      .click();

    // input employee and grid should show
    const companyGridResult = await page.innerText(
      "text=Des Moines Volkswagen",
    );
    expect(companyGridResult).toBe("Des Moines Volkswagen (L0192)");

    // input job and grid should show relavant results
    await payplanEmployee.inputJobDropdown("Detailer");
    await page
      .locator('li[role="option"]:has-text("Detailer (35007)")')
      .click();
    const jobGridResult = await page.innerText("text=35007");
    expect(jobGridResult).toBe("Detailer (35007)");
  });

  test("Navigate to Payplan /Employee and interact with Employee, Company, Job, Status and Department dropdowns @func", async ({
    page,
  }) => {
    const payplanEmployee = new PayplanEmployee(page);

    await payplanEmployee.goto();

    // employee
    await payplanEmployee.inputEmployeeDropdown("99300");

    // input employee and grid should show
    const employeeGridResult = await page.innerText("text=Jeff Cartwright");
    await page.locator("text=Jeff Cartwright (99300)").click();
    expect(employeeGridResult).toBe("Jeff Cartwright (99300)");

    // company
    await payplanEmployee.inputCompanyDropdown();
    await page
      .locator('li[role="option"]:has-text("Des Moines Volkswagen (L0192)")')
      .click();

    // input employee and grid should show
    const companyGridResult = await page.innerText(
      "text=Des Moines Volkswagen",
    );
    expect(companyGridResult).toBe("Des Moines Volkswagen (L0192)");

    // input job and grid should show relavant results
    await payplanEmployee.inputJobDropdown("Detailer");
    await page
      .locator('li[role="option"]:has-text("Detailer (35007)")')
      .click();
    const jobGridResult = await page.innerText("text=35007");
    expect(jobGridResult).toBe("Detailer (35007)");

    // input status and should show relavant results
  });
});
