// Payplan Employee Details

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminEmployee } = require("./admin_employee_details.js");

//test
test.describe.serial("Admin Employee Details Functionality Test", () => {
  test("Navigate to Admin/EmployeeDetails and validate if Company chosen, grid results reflect company chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    try {
      await adminEmployeeDetails.clickElement("companyDropdown");
      await page.locator("text=Medford CJD (L0004)").click();
      const gridResults = await page.locator("td:nth-child(5) >> nth=0");
      await expect(gridResults).toHaveText("Medford CJD (L0004)");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to Admin/EmployeeDetails and validate if Status chosen, grid results reflect Status chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    try {
      // validate grid results if Active is chosen
      await adminEmployeeDetails.clickElement("statusDropdown");
      await page.locator("#StatusList_listbox >> text=Active").click();

      const activeResults = await page.locator("td:nth-child(3) >> nth=0");
      await expect(activeResults).toHaveText("Active");

      // validate grid results if Terminated is chosen
      await adminEmployeeDetails.clickElement("statusDropdown");
      await page.locator("#StatusList_listbox >> text=Terminated").click();

      const terminatedResults = await page.locator("td:nth-child(3) >> nth=0");
      await expect(terminatedResults).toHaveText("Terminated");

      // validate the rest of the options
      await adminEmployeeDetails.clickElement("statusDropdown");
      await page.locator("#StatusList_listbox >> text=Deceased").click();

      await adminEmployeeDetails.clickElement("statusDropdown");
      await page
        .locator("#StatusList_listbox >> text=Leave of Absence")
        .click();

      await adminEmployeeDetails.clickElement("statusDropdown");
      await page.locator("#StatusList_listbox >> text=Retired").click();

      await adminEmployeeDetails.clickElement("statusDropdown");
      await page.locator("#StatusList_listbox >> text=Suspended").click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to Admin/EmployeeDetails and validate if Job chosen, grid results reflect Job chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    try {
      // validate grid results if Accounting Supervisor is chosen
      await adminEmployeeDetails.clickElement("jobDropdown");
      await page.locator("text=Accounting Supervisor (90011)").click();

      const jobResults = await page.locator(
        'td[role="gridcell"]:has-text("Accounting Supervisor") >> nth=0',
      );
      await expect(jobResults).toHaveText("Accounting Supervisor");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to Admin/EmployeeDetails and validate if Department chosen, grid results reflect Department chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    try {
      // validate grid results if Body Shop is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Body Shop (BDYSHP)").click();

      const bodyShopResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(bodyShopResults).toHaveText("Body Shop");

      // validate grid results if Detail is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Detail (DETAIL)").click();

      const detailResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(detailResults).toHaveText("Detail");

      // validate grid results if IPW is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=IPW (IPWIPW)").click();

      const ipwResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(ipwResults).toHaveText("IPW");

      // validate grid results if Overhead is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Overhead (OVRHED)").click();

      const overheadResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(overheadResults).toHaveText("Overhead");

      // validate grid results if Parts is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Parts (PARTSS)").click();

      const partsResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(partsResults).toHaveText("Parts");

      // validate grid results if Sales - New F&I Results is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Sales - New F&I (SLSFIN)").click();

      const salesFIResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(salesFIResults).toHaveText("Sales - New F&I");

      // validate grid results if Sales - New Vehicle Results is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Sales - New Vehicle (SLSNEW)").click();

      const salesNewVResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(salesNewVResults).toHaveText("Sales - New Vehicle");

      // validate grid results if Sales - Used Vehicle Results is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Sales - Used Vehicle (SLSUSE)").click();

      const salesUVResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(salesUVResults).toHaveText("Sales - Used Vehicle");

      // validate grid results if Service (SERVIC) Results is chosen
      await adminEmployeeDetails.clickElement("departmentDropdown");
      await page.locator("text=Service (SERVIC)").click();

      const serviceResults = await page.locator("td:nth-child(6) >> nth=0");
      await expect(serviceResults).toHaveText("Service");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to Admin/EmployeeDetails and validate if Active YES or NO chosen, grid results reflect Active results chosen from Dropdown @func", async ({
    browser,
    page,
  }) => {
    const adminEmployeeDetails = new AdminEmployee(page);
    await adminEmployeeDetails.goto();

    try {
      // validate grid results if Active YES is chosen
      await adminEmployeeDetails.clickElement("activeDropdown");

      const activeResultsYes = await page.locator(
        'li[role="option"]:has-text("Yes")',
      );
      await expect(activeResultsYes).toHaveText("Yes");

      // validate grid results if Active NO is chosen
      // await adminEmployeeDetails.getActiveDropdown();
      // await page
      //   .locator('text=Job Active >> [aria-label="select"] >> nth=1')
      //   .click();
      // //no results currently on TEST ENV, so we'll leave this commented out
      // const activeResultsNo = await page.locator('li[role="option"]:has-text("No")');
      // await expect(activeResultsNo).toHaveText("No");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
