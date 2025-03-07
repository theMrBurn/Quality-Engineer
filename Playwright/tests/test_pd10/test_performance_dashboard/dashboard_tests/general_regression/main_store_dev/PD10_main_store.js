// Consolidated POM for /Main Store and /Payroll
const { expect } = require("@playwright/test");

class MainStore {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    // Common locators
    this.getSPELogo = page.locator("id=logo");
    this.getUsername = page.locator("id=i0116");
    this.getPassword = page.locator("id=i0118");
    this.getStoreSelector = page.locator(
      'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
    );
    this.getAllSelector = page.locator(".allSelectorIndicator");

    // Store options
    this.getStores = {
      santaRosaCJD: page.locator("text=Santa Rosa CJD"),
      rosevilleChev: page.locator(':nth-match(:text("Roseville Chevrolet"),1)'),
      gardenaHonda: page.locator("text=Gardena Honda"),
      eurekaCJD: page.locator("text=Eureka CJD"),
      abileneHonda: page.locator('label:has-text("Abilene Honda")'),
      twinFallsChev: page.locator("text=Twin Falls Chevrolet"),
      grandForksToyota: page.locator("text=Grand Forks Toyota"),
      miamiMitsubishi: page.locator("text=Miami Mitsubishi"),
      california: page.locator("text=CALIFORNIA"),
      texas: page.locator("text=TEXAS >> nth=0"),
      florida: page.locator("text=FLORIDA"),
      northDakota: page.locator("text=NORTH DAKOTA"),
      idaho: page.locator("text=IDAHO >> nth=0"),
      casperFord: page.locator('label:has-text("Casper Ford")'),
      wyoming: page.locator("text=WYOMING"),
    };

    // Additional selectors specific to Payroll
    this.getGVpSelector = page.locator(
      "text=Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERLDTLADAYPRESTIGEC >> select",
    );
    this.getMichaelCavanaugh = page.locator(
      "text=Michael Cavanaugh[+]Ann Arbor BMWAnn Arbor CDJRAnn Arbor Chevrolet CadillacAnn A >> div",
    );
    this.getTimMuzyka = page.locator(
      "text=Tim Muzyka[+]Downtown LA AudiDowntown LA FordDowntown LA InfinitiDowntown LA Mer >> div",
    );
    this.getKennethColson = page.locator(
      "text=Kenneth Colson[+]Carson NissanFontana HondaMission Valley HondaRiverside SubaruS >> div",
    );

    // Driveway related locators
    this.getDrivewayTab = page.locator(':nth-match(:text("Driveway"),1)');
    this.getDrivewaySuppressionReport = page.locator(
      ':nth-match(:text("Driveway Suppression Report"),1)',
    );
    this.getDFC = page.locator(':nth-match(:text("DFC"),1)');
    this.getDFCDrivewayFinanceCorpScorecard = page.locator(
      'text="Driveway Finance Corp Scorecard"',
    );
    this.getStoreDrivewayScorecard = page.locator(
      ':nth-match(:text("Store Driveway Scorecard"),1)',
    );

    // Additional locators for various tabs
    this.getTabs = {
      mainTab: page.locator(':nth-match(:text("Main"),1)'),
      salesTab: page.locator('text="Sales" >> nth=0'),
      serviceDashboard: page.locator(':nth-match(:text("Service"),1)'),
      parts: page.locator(':nth-match(:text("Parts"),1)'),
      admin: page.locator('text="Admin"'),
      mainMIS: page.locator('text="MIS"'),
      mainStorePerformanceDashboard: page.locator(
        ':nth-match(:text("Store Performance Dashboard"),1)',
      ),
    };

    // Reports and other sections
    this.getReports = {
      bodyShop: {
        report: page.locator('text="Body Shop Report"'),
      },
      service: {
        report: page.locator('text="Service Dashboard"'),
        flatRateHrs: page.locator(':nth-match(:text("Flat Rate Hours"),2)'),
      },
      office: {
        schedulesSummary: page.locator('text="Schedules Summary"'),
        cashARValidation: page.locator('text="Cash & AR Validation Log"'),
      },
      market: {
        ladBudget: page.locator(':nth-match(:text("LAD Budget"),1)'),
        vistaDash: page.locator(':nth-match(:text("VistaDash"),1)'),
        marketingCreative: page.locator(
          ':nth-match(:text("Marketing Creative"),1)',
        ),
      },
      reference: {
        payrollProcessingCalendar: page.locator(
          ':nth-match(:text("Payroll Processing Calendars"),1)',
        ),
        managementFeeSummary: page.locator(
          ':nth-match(:text("Management Fee Summary"),1)',
        ),
        fixedOpsGrossTools: page.locator(
          ':nth-match(:text("Fixed Ops Gross Tools"),1)',
        ),
        variableGrossTools: page.locator(
          ':nth-match(:text("Variable Gross Tools"),1)',
        ),
      },
    };
  }

  async ValidateStore() {
    await this.getStoreSelector.nth(2).click();
    await this.getGVpSelector.selectOption("2");
    await this.getAllSelector.click();
    await this.getAllSelector.click();
    await this.getMichaelCavanaugh.nth(2).click();
    await this.page
      .locator('label:has-text("Farmington Hills Volkswagen")')
      .click();
    await this.page.locator('label:has-text("Farmington Hills Mazda")').click();
    await this.page
      .locator('label:has-text("Farmington Hills Porsche")')
      .click();
    await this.getTimMuzyka.nth(2).click();
    await this.page
      .locator('label:has-text("Downtown LA Mercedes-Benz")')
      .click();
    await this.page.locator('label:has-text("Downtown LA Volkswagen")').click();
    await this.page.locator('label:has-text("Downtown LA Audi")').click();
    await this.page.locator('label:has-text("Downtown LA Porsche")').click();
    await this.page.locator('label:has-text("Downtown LA Toyota")').click();
    await this.page.locator('label:has-text("Downtown LA Nissan")').click();
    await this.page.locator('label:has-text("Sherman Oaks Audi")').click();
    await this.getKennethColson.nth(2).click();
    await this.page.locator('label:has-text("Carson Nissan")').click();
    await this.page.locator('label:has-text("Fontana Honda")').click();
    await this.page.locator('label:has-text("Temecula Honda")').click();
    await this.page.locator('label:has-text("Temecula Kia")').click();
    await this.page.locator('label:has-text("Mission Valley Honda")').click();
    await this.page.locator('label:has-text("Riverside Subaru")').click();
  }

  // Navigation methods
  async goto() {
    await this.page.goto();
    await this.page.waitForLoadState("networkidle");
  }

  async selectStore() {
    await this.getStoreSelector.nth(2).click();
    await this.getStores.california.click();
  }

  async validateDivestedStores() {
    await expect(this.getStores.santaRosaCJD).not.toBeChecked();
    await expect(this.getStores.rosevilleChev).not.toBeChecked();
    await expect(this.getStores.gardenaHonda).not.toBeChecked();
    await expect(this.getStores.eurekaCJD).not.toBeChecked();
    await this.getStores.florida.click();
    await expect(this.getStores.miamiMitsubishi).not.toBeChecked();
    await this.getStores.idaho.click();
    await expect(this.getStores.twinFallsChev).not.toBeChecked();
    await this.getStores.northDakota.click();
    await expect(this.getStores.grandForksToyota).not.toBeChecked();
    await this.getStores.texas.click();
    await expect(this.getStores.abileneHonda).not.toBeVisible();
  }

  // Navigation to specific tabs and reports
  async navigateToServiceDashboard() {
    await this.getTabs.serviceDashboard.click();
    await expect(this.getSPELogo).toBeVisible();
  }

  async navigateToSalesNewVehicleDashboard() {
    await this.getTabs.salesTab.click();
    // Example for clicking on further navigation items
  }

  async navigateToBodyShopReport() {
    await this.getTabs.admin.click();
    await this.getReports.bodyShop.report.click();
    await expect(this.getSPELogo).toBeVisible();
  }

  async navigateToMarketLADBudget() {
    await this.getTabs.admin.click();
    await this.getReports.market.ladBudget.click();
    await expect(this.getSPELogo).toBeVisible();
  }

  // Additional navigation methods can be created similarly to navigate to specific tabs or reports.
}

module.exports = { MainStore };
