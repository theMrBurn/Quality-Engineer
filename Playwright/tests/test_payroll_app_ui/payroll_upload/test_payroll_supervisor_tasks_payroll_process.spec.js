// Dependencies
const { test, expect } = require("@playwright/test");
const { PayrollUpload } = require("./payroll_upload.js");

// Test
test.describe.serial(
  "Payroll /Upload and Validate Payroll Tasks Functionality @e2e",
  () => {
    let page;
    let supervisorTasks;

    test.beforeEach(async ({ browser }) => {
      page = await browser.newPage();
      supervisorTasks = new PayrollUpload(page);
      await supervisorTasks.goto();
    });

    test.afterEach(async () => {
      await page.close();
    });

    test("Navigate to /Payroll/upload and input Pay Group Region", async () => {
      // California Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=California Pay Group").click();
      await supervisorTasks.clickElement("deleteRegionEntry");

      // East 2 Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=East 2 Pay Group").click();
      await supervisorTasks.clickElement("deleteRegionEntry");

      // East Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=East Pay Group").click();
      await supervisorTasks.clickElement("deleteRegionEntry");

      // East Semi-Monthly Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=East Semi-Monthly Pay Group").click();
      await supervisorTasks.clickElement("deleteRegionEntry");

      // Hawaii Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=Hawaii Pay Group").click();
      await supervisorTasks.clickElement("deleteRegionEntry");

      // Midwest Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=Midwest Pay Group").click();
      await supervisorTasks.clickElement("deleteRegionEntry");

      // West Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=West Pay Group >> nth=1").click();
      await supervisorTasks.clickElement("deleteRegionEntry");
    });

    test("Navigate to /Payroll/upload and input Pay Group Region California Pay Group, and attempt PPE Date input", async () => {
      // California Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=California Pay Group").click();

      await supervisorTasks.clickElement("ppeDateProcessingDropdown");
      await page.locator("text=9/17/2022").click();
    });

    test("Navigate to /Payroll/upload and input Pay Group Region East 2 Pay Group, and attempt PPE Date input", async () => {
      test.fixme("East2 Pay Group isn't loading PPE dates");

      // East 2 Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=East 2 Pay Group").click();

      await supervisorTasks.clickElement("ppeDateProcessingDropdown");
      await page.locator("text=9/17/2022").click();
    });

    test("Navigate to /Payroll/upload and input Pay Group Region East Pay Group, and attempt PPE Date input", async () => {
      // East Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=East Pay Group").click();

      await supervisorTasks.clickElement("ppeDateProcessingDropdown");
      await page.locator("text=9/10/2022").click();
    });

    test("Navigate to /Payroll/upload and input Pay Group Region East Semi-Monthly Pay Group, and attempt PPE Date input", async () => {
      // East Semi-Monthly Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=East Semi-Monthly Pay Group").click();

      await supervisorTasks.clickElement("ppeDateProcessingDropdown");
      await page.locator("text=9/30/2022").click();
    });

    test("Navigate to /Payroll/upload and input Pay Group Region Hawaii Pay Group, and attempt PPE Date input", async () => {
      // Hawaii Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=Hawaii Pay Group").click();

      await supervisorTasks.clickElement("ppeDateProcessingDropdown");
      await page.locator("text=9/30/2022").click();
    });

    test("Navigate to /Payroll/upload and input Pay Group Region Midwest Pay Group, and attempt PPE Date input", async () => {
      // Midwest Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=Midwest Pay Group").click();

      await supervisorTasks.clickElement("ppeDateProcessingDropdown");
      await page.locator("text=8/31/2022").click();
    });

    test("Navigate to /Payroll/upload and input Pay Group Region West Pay Group, and attempt PPE Date input", async () => {
      // West Pay Group
      await supervisorTasks.clickElement("payGroupRegionDropdown");
      await page.locator("text=West Pay Group >> nth=1").click();

      await supervisorTasks.clickElement("ppeDateProcessingDropdown");
      await page.locator("text=10/15/2022").click();
    });
  }
);