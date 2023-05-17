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
    await denaliPortal.getPageHeader();
    await denaliPortal.getElementHeaderLPO();
    await denaliPortal.getElementHeaderFlooring();
    await denaliPortal.getDealershipsHeader();
    await denaliPortal.getLienHolderManagerHeader();
    await denaliPortal.getCVPheader();
  });

  test("Navigate to Denali Portal, click left Popout and validate Page elements have loaded as expected", async ({
    browser,
    page,
  }) => {
    const denaliPortal = new DenaliPortal(page);
    await denaliPortal.goto();

    //click Left Menu hamburger and validate when expanded, all expected menu element items are present

    await denaliPortal.clickLeftMenuOpen();
    await denaliPortal.getDenaliPortalHomeLink();
    await denaliPortal.getFlooringPayoffCenterTriangle();
    await denaliPortal.getLienPayoffLink();
    await denaliPortal.getFlooringPayofCenterfLink();
    await denaliPortal.getPayoffRequestlink();
    await denaliPortal.getCashForcastingLink();
    await denaliPortal.getVehicleProcessingTriangle();
    await denaliPortal.getDocumentTrackingSubLink();
    await denaliPortal.getDealershipManagementSubLink();
    await denaliPortal.getLienholderManagmentSubLink();

    //click Left Menu again to retract menu
    await denaliPortal.clickLeftMenuClose();
  });
});
