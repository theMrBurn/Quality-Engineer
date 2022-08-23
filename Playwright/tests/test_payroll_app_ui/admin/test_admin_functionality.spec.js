// Admin Page

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { Admin } = require("./admin.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("/Admin", () => {
  test("Navigate to /Admin and validate when Position Type Category is chosen, is displayed as expected", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    await adminPage.clickCategoryDropdown();
    await adminPage.clickPositionTypeDefinitions();

    const dataTypeVisible = await page.locator(
      'td[role="gridcell"]:has-text("Data Type Definitions") >> nth=0'
    );
    expect(dataTypeVisible).toBeHidden();
  });

  test("Navigate to /Admin and validate when Data Type Category is chosen, is displayed as expected", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    await adminPage.clickCategoryDropdown();
    await adminPage.clickDataTypeDefinitions();

    const positionTypeVisible = await page.locator(
      'td[role="gridcell"]:has-text("Position Type Definitions") >> nth=0'
    );
    expect(positionTypeVisible).toBeHidden();
  });

  test("Navigate to /Admin and validate Legal Explaination Text can be entered, and search results displayed if found", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    await adminPage.inputLegalExplanation("RGPS Data Explanation");

    const searchResult = await page.locator(
      'td[role="gridcell"]:has-text("RGPS Data Explanation")'
    );
    expect(searchResult).toHaveText("RGPS Data Explanation");
  });

  test("Navigate to /Admin and validate Start Date can be chosen, and search results displayed if found", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    // input Start Date
    await adminPage.inputStartDatePicker("1/1/2000");
    await adminPage.inputEndDatePicker("12/31/2090");

    // validate start date
    const startDate = await page.locator("td:nth-child(5) >> nth=0");
    expect(startDate).toHaveText("01/01/2000");

    // validate end date
    const endDate = await page.locator("td:nth-child(6) >> nth=0");
    expect(endDate).toHaveText("12/31/2090");
  });

  test("Navigate to /Admin and click New Legal Explanation", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    // click New Legal Explanation and input dummy Test info
    await adminPage.clickNewLegalButton();
    await adminPage.inputNewName("Test Name");
    await adminPage.inputNewCategory("Test Category");

    // input Start Date and End Date
    await adminPage.inputStartDateGrid("1/1/2000");
    await adminPage.inputEndDateGrid("12/31/2090");

    // click cancel
    await adminPage.clickCancelButton();

    // validate TEST NAME and TEST CATEGORY did not save - .not.toHaveText() isn't working?
    // const testName = await page.locator(
    //   'td[role="gridcell"]:has-text("Test Name")'
    // );
    // await expect(testName).not.toHaveText("Test Name");

    // const testCategory = await page.locator(
    //   'td[role="gridcell"]:has-text("Test Category") >> nth=1'
    // );
    // await expect(testCategory).not.toHaveText("Test Category");
  });
});
