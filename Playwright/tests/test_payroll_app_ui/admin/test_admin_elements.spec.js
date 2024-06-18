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
  test("Navigate to /Admin and validate Page elements have loaded as expected @smoke", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    const locatorNames = [
      "adminPageHeader",
      "categoryText",
      "legalExplanationText",
      "startDateText",
      "endDateText",
      "legalExplanationGridColumn",
      "nameGridColumn",
      "categoryGridColumn",
      "startDateGridColumn",
      "endDateGridColumn",
      "newLegalButton",
      "categoryDropdownTriangle",
      "legalExplanationInput",
    ];

    try {
      for (const locatorName of locatorNames) {
        await adminPage.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
