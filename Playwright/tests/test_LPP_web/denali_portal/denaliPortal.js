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

    this.locators = {
      pageHeaderDenali: () =>
        this.page.getByRole("heading", { name: "Denali Portal" }),
      elementHeaderLPO: () =>
        this.page.getByRole("heading", {
          name: "Lien Payoff Center LPO",
        }),
      elementHeaderFlooring: () =>
        this.page.getByRole("heading", {
          name: "Flooring Payoff Manager FPOPR",
        }),
      elementHeaderDealerships: () =>
        this.page.getByRole("heading", {
          name: "Dealerships Manager DMM",
        }),

      elementHeaderLHM: () =>
        this.page.getByRole("heading", {
          name: "Lienholder Manager LHM",
        }),

      elementHeaderCVP: () =>
        this.page.getByRole("heading", {
          name: "Driveway Inventory Management System DIMS",
        }),

      launchLPObutton: () =>
        this.page
          .locator("span")
          .filter({ hasText: "InsightsLaunch" })
          .getByRole("button", { name: "Launch" }),
      launchFlooringButton: () =>
        this.page.getByRole("button", { name: "Launch" }).nth(1),
      launchDealership: () =>
        this.page.getByRole("button", { name: "Launch" }).nth(2),
      launchLHM: () => this.page.getByRole("button", { name: "Launch" }).nth(3),
      launchCVP: () => this.page.getByRole("button", { name: "Launch" }).nth(4),
      leftMenu: () => this.page.getByRole("button", { name: "menu" }),
      leftMenuClose: () =>
        this.page.locator("div:nth-child(2) > button:nth-child(2)"),
      denaliPortalHomeLink: () =>
        this.page.getByRole("button", {
          name: "Denali Portal Home",
        }),
      lienPayoffLink: () =>
        this.page.getByRole("button", {
          name: "Lien Payoff Center (LPO)",
        }),
      flooringPayoffCenterLink: () =>
        this.page.getByRole("button", {
          name: "Flooring Payoff Center (FPO-PR)",
        }),
      payoffRequestSubLink: () =>
        this.page.getByRole("button", {
          name: "Payoff Request",
        }),
      cashForcastingSubLink: () =>
        this.page.getByRole("button", {
          name: "Cash Forecasting",
        }),

      documentTrackingSubLink: () =>
        this.page.getByRole("button", {
          name: "Document Tracking (VDT)",
        }),
      dealershipManagementSubLink: () =>
        this.page.getByRole("button", {
          name: "Dealership Management",
        }),
      lienholderManagementSubLink: () =>
        this.page.getByRole("button", {
          name: "Lienholder Management",
        }),
      /// sub menus
      flooringPayoffCenterTriangle: () =>
        this.page.getByRole("button", {
          name: "Flooring Payoff Center (FPO-PR)",
        }),
      vehicleProcessingTriangle: () =>
        this.page.getByRole("button", {
          name: "Driveway Inventory Management System (DIMS)",
        }),
    };
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("");
    await this.page.waitForLoadState("networkidle");
  }

  // get page elements

  // get page elements

  async checkElementVisibility(locatorName) {
    const locatorFunction = this.locators[locatorName];
    const element = await locatorFunction().first();
    try {
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(`Locator '${locatorName}' failed: ${error.message}`);
    }
  }

  // interact with elements

  async clickLeftMenuOpen() {
    await this.locators.leftMenu().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickLeftMenuClose() {
    await this.locators.leftMenuClose().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickDenaliPortlalHomeLink() {
    await this.locators.denaliPortalHomeLink().click();
    await expect(this.page.url()).toContain("");
    await this.page.waitForLoadState("networkidle");
  }

  async clickLeinPayoffLaunch() {
    await this.locators.launchLPObutton().click();
    await expect(this.page.url()).toContain("/lienpayoff");
    await this.page.waitForLoadState("networkidle");
  }

  async clickFlooringLaunch() {
    await this.locators.launchFlooringButton().click();
    await expect(this.page.url()).toContain("/flooring");
  }

  async clickDealerLaunch() {
    await this.locators.launchDealership().click();
    await expect(this.page.url()).toContain("/dealerships");
  }

  async clickLHMlaunch() {
    await this.locators.launchLHM().click();
    await expect(this.page.url()).toContain("/lienholders");
  }

  async clickDIMSMLaunch() {
    await this.locators.launchDIMS().click();
    await expect(this.page.url()).toContain("/dims");
  }

  async clickLienPayoffLink() {
    await this.locators.lienPayoffLink().click();
    await expect(this.page.url()).toContain("/lienpayoff");
    await this.page.waitForLoadState("networkidle");
  }

  async clickFlooringMenuLink() {
    await this.locators.flooringMenuLink().click();
    await expect(this.page.url()).toContain("/flooring");
    await this.page.waitForLoadState("networkidle");
  }

  async clickPayoffRequestMenulink() {
    await this.locators.payoffRequestSubLink().click();
    await expect(this.page.url()).toContain("/flooring/requests");
    await this.page.waitForLoadState("networkidle");
  }

  async clickCashForcastingMenuLink() {
    await this.locators.cashForcastingSubLink().click();
    await expect(this.page.url()).toContain("/flooring/forecast");
    await this.page.waitForLoadState("networkidle");
  }

  async clickVDTDocumentTrackingMenuLink() {
    await this.locators.documentTrackingSubLink().click();
    await expect(this.page.url()).toContain("/vdt");
    await this.page.waitForLoadState("networkidle");
  }

  async clickDealerShipManagementMenuLink() {
    await this.locators.dealershipManagementSubLink().click();
    await expect(this.page.url()).toContain("/dealerships");
    await this.page.waitForLoadState("networkidle");
  }

  // input elements and forms
}
module.exports = { DenaliPortal };
