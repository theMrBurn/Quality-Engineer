const { expect } = require("@playwright/test");

class TitleTracking {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    this.locators = {
      getUsername: () => this.page.locator("#i0116"),
      getPassword: () => this.page.locator("#i0118"),
      getOfficeTab: () => this.page.locator("text=Office").first(),
      getOfficeTitleTracking: () =>
        this.page.locator('text="Title Tracking Report"').first(),
      getCurrentInv: () => this.page.locator('text="Current Inv"').first(), // Modified locator
      getAllNoTitle: () => this.page.locator('text="All - No Title"').first(),

      radioButtons: {
        SaleDate: () =>
          this.page.locator('#radioGroupNoSold span:has-text("Sale Date")'),
        PurchaseDate: () =>
          this.page.locator('#radioGroupNoSold span:has-text("Purchase Date")'),
        UsedInv: () => this.page.locator('#radioGroup span:has-text("Used")'),
        All: () => this.page.locator('#radioGroup span:has-text("All")'),
        NewInv: () => this.page.locator('#radioGroup span:has-text("New")'),
      },

      getExportToExcel: () =>
        this.page.locator('text="Export to Excel"').first(),
      getExportToPDF: () => this.page.locator('text="Export to PDF"').first(),

      getStoreSelector: () => this.page.locator("//header[1]/div[1]"),
      getBanner: () => this.page.locator("//div[1]/p[1]/span[1]"),
      getReportName: () => this.page.locator("#ReportName"),
      getStore: () =>
        this.page.locator("tr:has(td a)").locator("td:first-child a"),
      getStoreTotal: () =>
        this.page.locator("tr:has(td a)").locator("td:nth-child(13)"),
      getStoreTotalDetail: () => this.page.locator("span.k-pager-info.k-label"),
      getStoreReceivedNV: () =>
        this.page.locator("tr:has(td a)").locator("td:nth-child(2)"),

      summaryPageLocators: {
        total015Days: () => this.page.locator("table tbody tr td:nth-child(2)"),
        total1630Days: () =>
          this.page.locator("table tbody tr td:nth-child(4)"),
        total3160Days: () =>
          this.page.locator("table tbody tr td:nth-child(6)"),
        total61Days: () => this.page.locator("table tbody tr td:nth-child(8)"),
        totalNoTitle: () =>
          this.page.locator("table tbody tr td:nth-child(13)"),
        total: () => this.page.locator("table tbody tr td:first-child a"),
        detailPageTotal: () => this.page.locator("span.k-pager-info.k-label"),
        totalReceived: () =>
          this.page.locator("table tbody tr td:nth-child(2)"),
      },

      vins: Array.from(
        { length: 11 },
        (_, i) => () => this.page.locator(`text="VIN${i + 1}"`),
      ),

      getTotalHyperlink: () =>
        this.page.locator("tr:has(td a)").locator("td:first-child a"),
    };
  }

  async goto() {
    await this.page.goto("/Reports/TitleTrackingSummary", { timeout: 0 });
    await this.page.waitForLoadState("networkidle");
  }

  async login() {
    const testData = {
      getUsername: "t_PerfDash_01@lithia.com",
      getPassword: "GkCow**!#w#)4E#Sj3Rb8KS*TkGduz",
    };
    await this.fillForm(testData);
    await this.clickElement(this.locators.getUsername);
    await this.clickElement(this.locators.getPassword);
    await this.clickElement("#idSIButton9");
    await this.clickElement("text=Sign In");
  }

  async twostepauthlogin() {
    await this.clickElement("#KmsiCheckboxField");
    await this.clickElement("#idSIButton9");
  }

  async navigateToOfficeTitleTracking() {
    await this.checkElementVisibility(this.locators.getOfficeTab);
    await this.clickElement(this.locators.getOfficeTab);
    await this.clickElement(this.locators.getOfficeTitleTracking);
    await this.clickElement(this.locators.getCurrentInv);
  }

  async loadInventory(type) {
    await this.clickElement(this.locators.getCurrentInv());
    await this.clickElement(this.locators.radioButtons[type]());
  }

  async loadSaleDate(type) {
    await this.checkElementVisibility(this.locators.getSoldNoTitle);
    await this.clickElement(this.locators.getSoldNoTitle);
    await this.clickElement(this.locators.radioButtons[type]);
  }

  async validateTotalslink(type) {
    const sumPageTotal = await this.getPageTotalValue(
      this.locators.summaryPageLocators.total(),
    );
    await this.clickElement(this.locators.getTotalHyperlink());
    await this.clickElement(this.locators.radioButtons[type]());
    const detailPageSum = await this.getPageTotalValue(
      this.locators.summaryPageLocators.detailPageTotal(),
    );
    this.compareTotals(
      sumPageTotal,
      detailPageSum,
      "Title Tracking Report - Sold No Title - Totals mismatch between summary and details page",
    );
  }

  async validateDetailAndSummaryForSelectedStore(type) {
    const summaryTotal = await this.getPageTotalValue(
      this.locators.getStoreTotal(),
    );
    await this.clickElement(this.locators.getStore());
    await this.clickElement(this.locators.radioButtons[type]());
    const detailTotal = await this.getPageTotalValue(
      this.locators.getStoreTotalDetail(),
    );
    this.compareTotals(
      summaryTotal,
      detailTotal,
      "Title Tracking Report - Sold No Title - Summary and Detail for a store mismatches",
    );
  }

  async validatePercentages() {
    await this.checkElementVisibility(
      this.locators.summaryPageLocators.total015Days(),
    );
    await this.checkElementVisibility(
      this.locators.summaryPageLocators.total1630Days(),
    );
    await this.checkElementVisibility(
      this.locators.summaryPageLocators.total3160Days(),
    );
    await this.checkElementVisibility(
      this.locators.summaryPageLocators.total61Days(),
    );
    await this.checkElementVisibility(
      this.locators.summaryPageLocators.totalReceived(),
    );
  }

  async exportToExcel() {
    await this.clickElement(this.locators.getExportToExcel());
    await this.clickElement(this.locators.getExportToPDF());
    await this.clickElement(this.locators.getStore());
    await this.clickElement(this.locators.getExportToExcel());
    await this.clickElement(this.locators.getExportToPDF());
  }

  async validateBanner() {
    await this.checkElementVisibility(this.locators.getStoreSelector());
    await expect(this.locators.getBanner()).toHaveText(
      "Sold unit data on this report goes back to 10/1/22. Active Inventory has no date limitation. COMING SOON: The sold units will automatically clear based on data from the DMV Accounting Schedule.",
    );
    await expect(this.locators.getReportName()).toHaveText(
      "All- No Title Tracking Report (Summary)",
    );
  }

  // Helper Methods
  async getElementText(locator) {
    return (await locator.innerText()).replace(/,/g, "");
  }

  async getPageTotalValue(locator) {
    const text = await this.getElementText(locator);
    return parseInt(text.replace("1 - 100 of ", "").replace(" items", ""));
  }

  compareTotals(summaryValue, detailValue, message) {
    if (summaryValue !== detailValue) {
      console.log(`${message} ${summaryValue}:${detailValue}`);
    }
  }

  // Interactions with page elements
  async checkElementVisibility(locator) {
    try {
      await locator.waitFor({ state: "visible" });
    } catch (error) {
      throw new Error(
        `Locator '${locator}' failed to be visible: ${error.message}`,
      );
    }
  }

  async clickElement(locator) {
    try {
      await locator.click();
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(
        `Clicking on locator '${locator}' failed: ${error.message}`,
      );
    }
  }

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locator = this.locators[key]();
      if (locator) {
        await locator.fill(value);
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }
}

module.exports = { TitleTracking };
