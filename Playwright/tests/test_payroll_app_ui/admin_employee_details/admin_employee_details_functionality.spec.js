// Payplan Employee Details

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminEmployee } = require("./admin_employee_details.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Admin Employee Details Functionality Test", () => {
  test("Navigate to Admin/EmployeeDetails and validate if Company chosen, grid results reflect company chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    await adminEmployeeDetails.clickCompanyDropdown();
    await page.locator("text=Medford CJD (L0004)").click();

    const gridResults = await page.locator("td:nth-child(5) >> nth=0");
    await expect(gridResults).toHaveText("Medford CJD (L0004)");
  });

  test("Navigate to Admin/EmployeeDetails and validate if Status chosen, grid results reflect Status chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    // validate grid results if Active is choosen
    await adminEmployeeDetails.clickStatusDropdown();
    await page.locator("#StatusList_listbox >> text=Active").click();

    const activeResults = await page.locator("td:nth-child(3) >> nth=0");
    await expect(activeResults).toHaveText("Active");

    // validate grid results if Active is choosen
    await adminEmployeeDetails.clickStatusDropdown();
    await page.locator("#StatusList_listbox >> text=Terminated").click();

    const terminatedResults = await page.locator("td:nth-child(3) >> nth=0");
    await expect(terminatedResults).toHaveText("Terminated");

    // these options have no results when picked, so for now we can just validate the choice can be made successfully
    await adminEmployeeDetails.clickStatusDropdown();
    await page.locator("#StatusList_listbox >> text=Deceased").click();

    await adminEmployeeDetails.clickStatusDropdown();
    await page.locator("#StatusList_listbox >> text=Leave of Absence").click();

    await adminEmployeeDetails.clickStatusDropdown();
    await page.locator("#StatusList_listbox >> text=Retired").click();

    await adminEmployeeDetails.clickStatusDropdown();
    await page.locator("#StatusList_listbox >> text=Suspended").click();
  });

  test("Navigate to Admin/EmployeeDetails and validate if Job chosen, grid results reflect Job chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    // validate grid results if Active is choosen
    await adminEmployeeDetails.clickJobDropdown();
    await page.locator("text=Accounting Supervisor (90011)").click();

    const jobResults = await page.locator(
      'td[role="gridcell"]:has-text("Accounting Supervisor") >> nth=0'
    );
    await expect(jobResults).toHaveText("Accounting Supervisor");
  });

  test("Navigate to Admin/EmployeeDetails and validate if Department chosen, grid results reflect Department chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    // validate grid results if Body Shop is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Body Shop (BDYSHP)").click();

    const bodyShopResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(bodyShopResults).toHaveText("Body Shop");

    // validate grid results if Detail is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Detail (DETAIL)").click();

    const detailResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(detailResults).toHaveText("Detail");

    // validate grid results if IPW is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=IPW (IPWIPW)").click();

    const ipwResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(ipwResults).toHaveText("IPW");

    // validate grid results if Overhead is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Overhead (OVRHED)").click();

    const overheadResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(overheadResults).toHaveText("Overhead");

    // validate grid results if Parts is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Parts (PARTSS)").click();

    const partsResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(partsResults).toHaveText("Parts");

    // validate grid results if Sales - New F&I Results is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Sales - New F&I (SLSFIN)").click();

    const salesFIResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(salesFIResults).toHaveText("Sales - New F&I");

    // validate grid results if Sales - New Vehicle Results is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Sales - New Vehicle (SLSNEW)").click();

    const salesNewVResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(salesNewVResults).toHaveText("Sales - New Vehicle");

    // validate grid results if Sales - Used Vehicle Results is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Sales - Used Vehicle (SLSUSE)").click();

    const salesUVResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(salesUVResults).toHaveText("Sales - Used Vehicle");

    // validate grid results if Service (SERVIC) Results is choosen
    await adminEmployeeDetails.clickDepartmentDropdown();
    await page.locator("text=Service (SERVIC)").click();

    const serviceResults = await page.locator("td:nth-child(6) >> nth=0");
    await expect(serviceResults).toHaveText("Service");
  });

  test("Navigate to Admin/EmployeeDetails and validate if Active YES or NO chosen, grid results reflect Active results chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    // validate grid results if Active YES is choosen
    await adminEmployeeDetails.getActiveDropdown();
    await page
      .locator('text=Job Active >> [aria-label="select"] >> nth=1')
      .click();

    const activeResultsYes = await page.locator(
      'li[role="option"]:has-text("Yes")'
    );
    await expect(activeResultsYes).toHaveText("Yes");

    // validate grid results if Active NO is choosen
    await adminEmployeeDetails.getActiveDropdown();
    await page
      .locator('text=Job Active >> [aria-label="select"] >> nth=1')
      .click();
    // //no results currently on TEST ENV, so we'll leave this commented out
    // const activeResultsNo = await page.locator('li[role="option"]:has-text("No")');
    // await expect(activeResultsNo).toHaveText("No");
  });
});
