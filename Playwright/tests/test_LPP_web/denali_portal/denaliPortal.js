// this POM is for /LPP portal
const { expect } = require("@playwright/test");

class DenaliPortal {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // headers
    this.pageHeader = page.getByRole("heading", { name: "Denali Portal" });
    this.elementHeaderLPO = page.getByRole("heading", {
      name: "Lien Payoff Center LPO",
    });
    this.elementHeaderFlooring = page.getByRole("heading", {
      name: "Flooring Payoff Manager FPOPR",
    });
    this.elementHeaderDealerships = page.getByRole("heading", {
      name: "Dealerships Manager DMM",
    });

    this.elementHeaderLHM = page.getByRole("heading", {
      name: "Lienholder Manager LHM",
    });

    this.elementHeaderCVP = page.getByRole("heading", {
      name: "Central Vehicle Processing CVP",
    });

    // unique page text

    // buttons, dropdowns and input boxes
    this.launchLPObutton = page
      .locator("span")
      .filter({ hasText: "InsightsLaunch" })
      .getByRole("button", { name: "Launch" });
    this.launchFlooringButton = page
      .getByRole("button", { name: "Launch" })
      .nth(1);
    this.launchDealership = page.getByRole("button", { name: "Launch" }).nth(2);
    this.launchLHM = page.getByRole("button", { name: "Launch" }).nth(3);
    this.launchCVP = page.getByRole("button", { name: "Launch" }).nth(4);

    this.leftMenu = page.getByRole("button", { name: "menu" });
    this.leftMenuClose = page.locator("div:nth-child(2) > button:nth-child(2)");
    this.denaliPortalHomeLink = page.getByRole("button", {
      name: "Denali Portal Home",
    });
    this.lienPayoffLink = page.getByRole("button", {
      name: "Lien Payoff Center (LPO)",
    });
    this.flooringPayoffCenterLink = page.getByRole("button", {
      name: "Flooring Payoff Center (FPO-PR)",
    });
    this.payoffRequestSubLink = page.getByRole("button", {
      name: "Payoff Request",
    });
    this.cashForcastingSubLink = page.getByRole("button", {
      name: "Cash Forecasting",
    });

    this.documentTrackingSubLink = page.getByRole("button", {
      name: "Document Tracking (VDT)",
    });
    this.dealershipManagementSubLink = page.getByRole("button", {
      name: "Dealership Management",
    });
    this.lienholderManagementSubLink = page.getByRole("button", {
      name: "Lienholder Management",
    });

    /// sub menus
    this.flooringPayoffCenterTriangle = page.getByRole("button", {
      name: "Flooring Payoff Center (FPO-PR)",
    });
    this.vehicleProcessingTriangle = page.getByRole("button", {
      name: "Vehicle Processing (CVP)",
    });

    // forms and grids

    // calendar elements
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  async getPageHeader() {
    await expect(this.pageHeader, "Page header not found").toBeVisible();
  }

  async getElementHeaderLPO() {
    await expect(this.elementHeaderLPO, "LPO card not found").toBeVisible();
  }

  async getElementHeaderFlooring() {
    await expect(
      this.elementHeaderFlooring,
      "Flooring Center card not found"
    ).toBeVisible();
  }

  async getDealershipsHeader() {
    await expect(
      this.elementHeaderDealerships,
      "Dealerships card not found"
    ).toBeVisible();
  }

  async getLienHolderManagerHeader() {
    await expect(
      this.elementHeaderLHM,
      "Lienholder Manager card not found"
    ).toBeVisible();
  }

  async getCVPheader() {
    await expect(
      this.elementHeaderCVP,
      "Central Vehicle processing card not found"
    ).toBeVisible();
  }

  async getLeftMenu() {
    await expect(this.leftMenu, "Left Menu cannot be found").toBeVisible();
  }

  async getLeftMenuClose() {
    await expect(
      this.leftMenuClose,
      "Left Menu Close triangle not found"
    ).toBeVisible();
  }

  async getDenaliPortalHomeLink() {
    await expect(
      this.denaliPortalHomeLink,
      "Denali Portal Home link not found"
    ).toBeVisible();
  }

  async getFlooringPayoffCenterTriangle() {
    await expect(
      this.flooringPayoffCenterTriangle,
      "Floring Center dropdown triangle not found"
    ).toBeVisible();
  }

  async getLienPayoffLink() {
    await expect(
      this.lienPayoffLink,
      "Lien Payoff link not found"
    ).toBeVisible();
  }

  async getFlooringPayofCenterfLink() {
    await expect(
      this.flooringPayoffCenterLink,
      "Flooring Payoff link not found"
    ).toBeVisible();
  }

  async getFlooringPayoffSubLink() {
    await expect(
      this.flooringPayoffSubLink,
      "flooringPayoff sub-Link not found"
    ).toBeVisible();
  }

  async getPayoffRequestlink() {
    await expect(
      this.payoffRequestSubLink,
      "Payoff Request sub-link not found"
    ).toBeVisible();
  }

  async getCashForcastingLink() {
    await expect(
      this.cashForcastingSubLink,
      "Cash Forcasting sub-link not found"
    ).toBeVisible();
  }

  async getVehicleProcessingTriangle() {
    await expect(
      this.vehicleProcessingTriangle,
      "Vehicle Processing CVP dropdown triangle not found"
    ).toBeVisible();
  }

  async getDocumentTrackingSubLink() {
    await expect(
      this.documentTrackingSubLink,
      "VDT Document Tracking sub-link not found"
    ).toBeVisible();
  }

  async getDealershipManagementSubLink() {
    await expect(
      this.dealershipManagementSubLink,
      "Dealership Management sub-link not found"
    ).toBeVisible();
  }

  async getLienholderManagmentSubLink() {
    await expect(
      this.lienholderManagementSubLink,
      "Lienholder Management sub-link not found"
    ).toBeVisible();
  }

  // interact with elements

  async clickLeftMenuOpen() {
    await this.getLeftMenu();
    await this.leftMenu.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickLeftMenuClose() {
    await this.getLeftMenuClose();
    await this.leftMenuClose.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickDenaliPortlalHomeLink() {
    await this.getDenaliPortalHomeLink();
    await this.denaliPortalHomeLink.click();
    await expect(this.page.url()).toContain("");
    await this.page.waitForLoadState("networkidle");
  }

  async clickLeinPayoffLaunch() {
    await this.getElementHeaderLPO();
    await this.launchLPObutton.click();
    await expect(this.page.url()).toContain("/lienpayoff");
    await this.page.waitForLoadState("networkidle");
  }

  async clickFlooringLaunch() {
    await this.getElementHeaderFlooring();
    await this.launchFlooringButton.click();
    await expect(this.page.url()).toContain("/flooring");
  }

  async clickDealerLaunch() {
    await this.getDealershipsHeader();
    await this.launchDealership.click();
    await expect(this.page.url()).toContain("/dealerships");
  }

  async clickLHMlaunch() {
    await this.getLienHolderManagerHeader();
    await this.launchLHM.click();
    await expect(this.page.url()).toContain("/lienholders");
  }

  async clickCVPLaunch() {
    await this.getCVPheader();
    await this.launchCVP.click();
    await expect(this.page.url()).toContain("/cvp");
  }

  async clickLienPayoffLink() {
    await this.getLienPayoffLink();
    await this.lienPayoffLink.click();
    await expect(this.page.url()).toContain("/lienpayoff");
    await this.page.waitForLoadState("networkidle");
  }

  async clickFlooringMenuLink() {
    await this.getFlooringMenuLink();
    await this.flooringMenuLink.click();
    await expect(this.page.url()).toContain("/flooring");
    await this.page.waitForLoadState("networkidle");
  }

  async clickPayoffRequestMenulink() {
    await this.getPayoffRequestlink();
    await this.payoffRequestSubLink.click();
    await expect(this.page.url()).toContain("/flooring/requests");
    await this.page.waitForLoadState("networkidle");
  }

  async clickCashForcastingMenuLink() {
    await this.getCashForcastingLink();
    await this.cashForcastingSubLink.click();
    await expect(this.page.url()).toContain("/flooring/forecast");
    await this.page.waitForLoadState("networkidle");
  }

  async clickVDTDocumentTrackingMenuLink() {
    await this.getDocumentTrackingSubLink();
    await this.documentTrackingSubLink.click();
    await expect(this.page.url()).toContain("cvp/vdt");
    await this.page.waitForLoadState("networkidle");
  }

  async clickDealerShipManagementMenuLink() {
    await this.getDealershipManagementSubLink();
    await this.dealershipManagementSubLink.click();
    await expect(this.page.url()).toContain("/dealerships");
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms
}
module.exports = { DenaliPortal };
