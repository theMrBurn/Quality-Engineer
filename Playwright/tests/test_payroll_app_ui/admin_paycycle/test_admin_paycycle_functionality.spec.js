// Admin Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { AdminPayCycle } = require("./admin_paycycle.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("/Admin/PayCycle", () => {
  test("Navigate to /Admin/PayCycle and validate when Company is chosen, is displayed as expected @func", async ({
    browser,
    page,
  }) => {
    const adminPayCyclePage = new AdminPayCycle(page);
    await adminPayCyclePage.goto();
    await page.waitForLoadState("networkidle");

    const companyNumber = await page.locator(
      'td[role="gridcell"]:has-text("L0143")',
    );
    const paygroupResult = await page.locator("text=West Pay Group");
    const companyResult = await page.locator(
      'td[role="gridcell"]:has-text("Fairbanks Chev Buick GMC")',
    );
    const calendarResult = await page.getByRole("gridcell", {
      name: "Semi-monthly",
    });
    const error = await page.locator("#divErrorHolder");

    await adminPayCyclePage.clickElement("companyInputDropdown");

    try {
      await page.locator("text=Fairbanks Chev Buick GMC (L0143)").click();
      await page.waitForLoadState("networkidle");

      expect(companyResult).toHaveText("Fairbanks Chev Buick GMC");
      expect(companyNumber).toHaveText("L0143");
      expect(calendarResult).toContainText("Semi-monthly");
      expect(paygroupResult).toHaveText("West Pay Group");
      await expect(error).not.toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Admin/PayCycle and validate when Company Number is chosen, is displayed as expected @func", async ({
    browser,
    page,
  }) => {
    const adminPayCyclePage = new AdminPayCycle(page);
    await adminPayCyclePage.goto();

    await adminPayCyclePage.clickElement("payGroupInputDropdown");
    await page.getByRole("option", { name: "L0152" }).click();

    try {
      const companyResult = page.getByRole("gridcell", {
        name: "Great Falls CJD",
      });
      await expect(companyResult).toHaveText("Great Falls CJD");

      const companyNumber = page.getByRole("gridcell", { name: "L0152" });
      await expect(companyNumber).toHaveText("L0152");

      const calendarResult = page.getByRole("gridcell", {
        name: "Semi-monthly",
      });
      await expect(calendarResult).toContainText("Semi-monthly");

      const paygroupResult = page.getByRole("gridcell", {
        name: "Midwest Pay Group",
      });
      expect(paygroupResult).toHaveText("Midwest Pay Group");

      const error = page.locator("#divErrorHolder");
      await expect(error).not.toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Admin/PayCycle and validate Assign PayCycle basic functionality - cancel before Update (cant CRUD) @func", async ({
    browser,
    page,
  }) => {
    const adminPayCyclePage = new AdminPayCycle(page);
    await adminPayCyclePage.goto();

    await adminPayCyclePage.clickElement("assignPayCycleButton");

    try {
      await adminPayCyclePage.clickElement("companyGridInput");
      await page.locator("text=Knoxville CJDR >> nth=2").click();

      //await adminPayCyclePage.inputCompanyNumberGridFromDropdown();
      await adminPayCyclePage.clickElement("companyNumberGridInput");
      await page.locator("#Code_listbox >> text=L0365").click();

      //await adminPayCyclePage.inputCalendarGridFromDropdown();
      await adminPayCyclePage.clickElement("calendarGridInput");
      await page.locator("#PayCalendarId_listbox >> text=Semi-monthly").click();

      //await adminPayCyclePage.inputPayGroupInputFromDropdown();
      await adminPayCyclePage.clickElement("payGroupGridInput");
      await page.locator("text=East Semi-Monthly Pay Group").click();

      await page.locator('input[type="checkbox"]').uncheck();

      await page.locator('input[type="checkbox"]').check();

      //await adminPayCyclePage.clickCancelButton();
      await adminPayCyclePage.clickElement("cancelButton");

      const error = page.locator("#divErrorHolder");
      await expect(error).not.toBeVisible();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
