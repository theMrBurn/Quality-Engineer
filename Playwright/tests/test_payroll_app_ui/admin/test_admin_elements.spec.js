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
  test("Navigate to /Admin and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    //validate expected text elements have loaded
    await adminPage.getAdminPageHeader();
    await adminPage.getCategotyText();
    await adminPage.getLegalExplanationText();
    await adminPage.getStartDateText();
    await adminPage.getEndDateText();
    await adminPage.getLegalExplanationGridColumn();
    await adminPage.getNameGridColumn();
    await adminPage.getCategoryGridColumn();
    await adminPage.getStartDateGridColumn();
    await adminPage.getEndDateGridColumn();

    //validate expected interactive elements have loaded
    await adminPage.getNewLegalButton();
    await adminPage.getCategoryDropdown();
    await adminPage.getLegalExplanationInput();
  });
});
