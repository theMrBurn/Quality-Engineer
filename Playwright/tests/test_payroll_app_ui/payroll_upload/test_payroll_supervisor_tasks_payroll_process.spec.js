// Payroll Sup Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayrollUpload } = require("./payroll_upload.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe
  .serial("Payroll /Upload and Validate Payroll Tasks Functionality @e2e", () => {
  test("Navigate to /Payroll/upload and input Pay Group Region", async ({
    page,
  }) => {
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // California Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=California Pay Group").click();
    //delete entry
    await supervisorTasks.paygroupRegionDelete();

    // East 2 Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=East 2 Pay Group").click();
    //delete entry
    await supervisorTasks.paygroupRegionDelete();

    // East Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=East Pay Group").click();
    //delete entry
    await supervisorTasks.paygroupRegionDelete();

    // East Semi-Monthly Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=East Semi-Monthly Pay Group").click();
    //delete entry
    await supervisorTasks.paygroupRegionDelete();

    // Hawaii Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=Hawaii Pay Group").click();
    //delete entry
    await supervisorTasks.paygroupRegionDelete();

    // Midwest Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=Midwest Pay Group").click();
    //delete entry
    await supervisorTasks.paygroupRegionDelete();

    // West Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=West Pay Group >> nth=1").click();
    //delete entry
    await supervisorTasks.paygroupRegionDelete();
  });

  test("Navigate to /Payroll/upload and input Pay Group Region California Pay Group, and attempt PPE Date input", async ({
    page,
  }) => {
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // California Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=California Pay Group").click();

    await supervisorTasks.clickPPEDateProcessingDropdown();
    await page.locator("text=9/17/2022").click();
  });

  test("Navigate to /Payroll/upload and input Pay Group Region East 2 Pay Group, and attempt PPE Date input", async ({
    page,
  }) => {
    test.fixme("East2 Pay Group isn't loading PPE dates");
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // East 2 Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=East 2 Pay Group").click();

    await supervisorTasks.clickPPEDateProcessingDropdown();
    await page.locator("text=9/17/2022").click();
  });

  test("Navigate to /Payroll/upload and input Pay Group Region East Pay Group, and attempt PPE Date input", async ({
    page,
  }) => {
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // East 2 Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=East Pay Group").click();

    await supervisorTasks.clickPPEDateProcessingDropdown();
    await page.locator("text=9/10/2022").click();
  });

  test("Navigate to /Payroll/upload and input Pay Group Region East Semi-Monthly Pay Group, and attempt PPE Date input", async ({
    page,
  }) => {
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // East Semi-Monthly Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=East Semi-Monthly Pay Group").click();

    await supervisorTasks.clickPPEDateProcessingDropdown();
    await page.locator("text=9/30/2022").click();
  });

  test("Navigate to /Payroll/upload and input Pay Group Region Hawaii Pay Group, and attempt PPE Date input", async ({
    page,
  }) => {
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // Hawaii Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=Hawaii Pay Group").click();

    await supervisorTasks.clickPPEDateProcessingDropdown();
    await page.locator("text=9/30/2022").click();
  });

  test("Navigate to /Payroll/upload and input Pay Group Region Midwest Pay Group, and attempt PPE Date input", async ({
    page,
  }) => {
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // Midwest Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=Midwest Pay Group").click();

    await supervisorTasks.clickPPEDateProcessingDropdown();
    await page.locator("text=8/31/2022").click();
  });

  test("Navigate to /Payroll/upload and input Pay Group Region West Pay Group, and attempt PPE Date input", async ({
    page,
  }) => {
    const supervisorTasks = new PayrollUpload(page);
    await supervisorTasks.goto();

    // West Pay Group
    await supervisorTasks.clickPayGroupRegionDropdown();
    await page.locator("text=West Pay Group >> nth=1").click();

    await supervisorTasks.clickPPEDateProcessingDropdown();
    await page.locator("text=10/15/2022").click();
  });
});
