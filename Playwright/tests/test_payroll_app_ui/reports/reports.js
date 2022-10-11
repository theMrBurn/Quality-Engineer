// this POM is for /Reports
const { expect } = require("@playwright/test");

class AllPayReports {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators
    // text

    this.reportsHeader = page.locator('h2:has-text("Reports")');

    // dropdowns
    // links
    this.cashSpliffReportLink = page.locator("text=Cash Spiff JV");
    this.jvCATechReportLink = page.locator("text=JV - CA Tech");
    this.jvSalesRepReportLink = page.locator("text=JV - Sales Rep");
    this.vacationTempReportLink = page.locator("text=Vacation Temp Rates");
  }

  // Navigate to /reports endpoint
  async goto() {
    await this.page.goto("https://azwu2apweb-test.azurewebsites.net/Reports");
    await this.page.waitForLoadState("networkidle");
  }

  // get elements
  async getReportsHeader() {
    await expect(this.reportsHeader, "Reports header not found").toBeVisible();
  }

  async getCashSpliffReportLink() {
    await expect(
      this.cashSpliffReportLink,
      "Cash Spiff JV report link not found"
    ).toBeVisible();
  }

  async getJVCATechReportLink() {
    await expect(
      this.jvCATechReportLink,
      "CA Tech report link not found"
    ).toBeVisible();
  }
  async getSalesRepReportLink() {
    await expect(
      this.jvSalesRepReportLink,
      "JV Sales Report link not found"
    ).toBeVisible();
  }

  async getVacationTempRatesReportLink() {
    await expect(
      this.vacationTempReportLink,
      "Vacation Temp Report link not found"
    ).toBeVisible();
  }

  // get Dropdowns

  // interact with elements
  async clickCashSpliffLink() {
    const link =
      "https://app.powerbi.com/groups/me/apps/b0ff7cdb-e872-4428-a709-33534ba7a81a/rdlreports/b8a0059e-c0bc-442e-8ff1-954b751d39f8";
    if (await this.page.link) {
      await this.getCashSpliffReportLink();
    }
    await this.cashSpliffReportLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickJVCATechLink() {
    const link =
      "https://app.powerbi.com/groups/me/apps/b0ff7cdb-e872-4428-a709-33534ba7a81a/rdlreports/a20e9ffd-d06a-4b21-93f1-8baab638ecbf";
    if (await this.page.link) {
      await this.getJVCATechReportLink();
    }
    await this.jvCATechReportLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickSalesRepLink() {
    const link =
      "https://app.powerbi.com/groups/me/apps/b0ff7cdb-e872-4428-a709-33534ba7a81a/rdlreports/61448114-6b47-4b54-89fb-b71d2d395c7e";
    if (await this.page.link) {
      await this.getSalesRepReportLink();
    }
    await this.jvSalesRepReportLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickVacationTempRatesLink() {
    const link =
      "https://app.powerbi.com/groups/me/apps/b0ff7cdb-e872-4428-a709-33534ba7a81a/reports/fd8d33a9-ee25-408a-8c54-16105c977686/ReportSection";
    if (await this.page.link) {
      await this.getVacationTempRatesReportLink();
    }
    await this.vacationTempReportLink.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { AllPayReports };
