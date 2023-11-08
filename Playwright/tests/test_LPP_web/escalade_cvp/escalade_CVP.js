// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class EscaladeCVP {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    this.locators = {
      // headers
      pageHeader: () =>
        this.page.getByRole("heading", {
          name: "Centralized Vehicle Processing",
          exact: true,
        }),

      salesTab: () => this.page.getByRole("tab", { name: "sales" }),
      inventoryTab: () => this.page.getByRole("tab", { name: "inventory" }),
      vdtTab: () => this.page.getByRole("tab", { name: "vdt" }),

      //sales tab
      stockNumColumn: () => this.page.getByText("STOCK #"),
      stockColumnFilter: () =>
        this.page.locator(
          "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-header > div > table > thead > tr > th.k-filterable.k-header.k-sorted.active > span.k-cell-inner > div > span",
        ),
      stockColumnInnerFilter: () =>
        this.page.getByText("Filter", { exact: true }),

      //inventory tab
      inventoryHubColunmn: () => this.page.getByText("HUB"),
      inventoryInnerColumnFilter: () =>
        this.page.locator(
          "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1a6buty > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-header > div > table > thead > tr > th.k-filterable.k-header.active > span.k-cell-inner > div > span",
        ),

      // Edit panel
      infoIcon: () => this.page.getByTestId("InfoIcon"),
      editButton: () => this.page.getByRole("button", { name: "Edit" }),
      cancelButton: () => this.page.getByRole("button", { name: "Cancel" }),
      completeButton: () => this.page.getByRole("button", { name: "Complete" }),
      closeEditPanelIcon: () => this.page.locator('[data-testid="CloseIcon"]'),
      hubNameDropdown: () =>
        this.page.locator(
          '//*[@id="root"]/div/div[1]/div[3]/span[2]/div/div/div[2]/span/div/div/div/form/div[2]/div/div/div',
        ),

      // Sales Data Upload
      salesDataUploadButton: () =>
        this.page.getByRole("button", {
          name: "UPLOAD SALES DATA",
        }),
      uploadFileModalButton: () =>
        this.page.getByRole("button", {
          name: "Upload",
        }),
      acceptButton: () => this.page.getByRole("button", { name: "Accept" }),
    };
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/cvp");
    await this.page.waitForLoadState("networkidle");
  }

  // interact with elements

  async clickResetFiltersButton() {
    await this.locators.resetFiltersButton().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickSalesTab() {
    await this.locators.salesTab().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickInvintoryTab() {
    await this.locators.inventoryTab().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickVDTTab() {
    await this.locators.vdtTab().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickStockNumColumn() {
    await this.locators.stockNumColumn().click();
    await this.page.waitForLoadState("load");
  }

  async clickStockNumFilter() {
    await this.locators.stockColumnFilter().click();
    await this.page.waitForLoadState("load");
    await this.locators.stockColumnInnerFilter().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickEditButton() {
    await this.locators.editButton().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickCancelButton() {
    await this.locators.cancelButton().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickClosePanel() {
    await this.locators.closeEditPanelIcon().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickInventoryHubFilter() {
    await this.locators.inventoryHubColunmn().click();
    await this.page.waitForLoadState("load");
    await this.locators.inventoryInnerColumnFilter().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickHubNameDropdown() {
    await this.locators.hubNameDropdown().click();
    await this.page.waitForLoadState("networkidle");
  }

  // upload

  async uploadSalesData(salesDataFile) {
    await this.page.getByRole("button", { name: "UPLOAD SALES DATA" }).click();
    await this.page.getByRole("button", { name: "Upload" }).click();
    await this.page
      .locator(
        "body > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.MuiDialogContent-dividers.css-1r09u4m > div > div > label",
      )
      .setInputFiles(salesDataFile);
    await this.page.getByRole("button", { name: "Accept" }).click();
    await expect(this.page.getByRole("alert")).toBeVisible();
  }

  async uploadBADSalesData(salesDataFile) {
    await this.page.getByRole("button", { name: "UPLOAD SALES DATA" }).click();
    await this.page.getByRole("button", { name: "Upload" }).click();
    await this.page
      .locator(
        "body > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.MuiDialogContent-dividers.css-1r09u4m > div > div > label",
      )
      .setInputFiles(salesDataFile);
    await this.page.getByRole("button", { name: "Accept" }).click();
    await expect(
      this.page.getByText(
        "TIMECARD.csv: File did not match fields for ACV or Manheim files.",
      ),
    ).toBeVisible();
  }

  async findFirstGridRow(gridElement) {
    await this.page.waitForSelector(gridElement); // Wait for the grid element to be available in the DOM
    const gridRowHandles = await this.page.$$(gridElement); // Get handles for all grid rows

    // Check if any grid rows are found
    if (gridRowHandles.length > 0) {
      const firstGridRow = gridRowHandles[0];

      // Ensure the element is attached to the DOM
      await this.page.evaluate((element) => {
        if (!element.isConnected) {
          throw new Error("Element is not attached to the DOM");
        }
      }, firstGridRow);

      // Click on the first grid row
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

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

  // search
}
module.exports = { EscaladeCVP };
