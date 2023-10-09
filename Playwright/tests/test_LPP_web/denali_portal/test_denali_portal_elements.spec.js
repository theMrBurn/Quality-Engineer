// Denali Portal

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { DenaliPortal } = require("./denaliPortal.js");

// user
//test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("Denali Portal - Page Elements @smoke", () => {
  test("Navigate to Denali Portal and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //validate expected text elements have loaded
    const locatorNames = [
      "pageHeaderDenali",
      "elementHeaderLPO",
      "elementHeaderFlooring",
      "elementHeaderDealerships",
      "elementHeaderLHM",
      "elementHeaderCVP",
    ];

    for (const locatorName of locatorNames) {
      await denaliPortal.checkElementVisibility(locatorName);
    }
  });

  test("Navigate to Denali Portal, click left Popout and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //click Left Menu hamburger and validate when expanded, all expected menu element items are present

    await denaliPortal.clickLeftMenuOpen();

    //validate expected text elements have loaded
    const locatorNames = [
      "denaliPortalHomeLink",
      "flooringPayoffCenterLink",
      "lienPayoffLink",
      "flooringPayoffCenterLink",
      "payoffRequestSubLink",
      "cashForcastingSubLink",
      "vehicleProcessingTriangle",
      "documentTrackingSubLink",
      "dealershipManagementSubLink",
      "lienholderManagementSubLink",
    ];

    for (const locatorName of locatorNames) {
      await denaliPortal.checkElementVisibility(locatorName);
    }
    //click Left Menu again to retract menu
    await denaliPortal.clickLeftMenuClose();
  });
});
