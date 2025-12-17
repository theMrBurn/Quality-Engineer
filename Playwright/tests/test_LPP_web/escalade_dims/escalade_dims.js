// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class EscaladeDIMS {
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
          name: "Driveway Inventory Management System",
          exact: true,
        }),

      salesTab: () => this.page.getByRole("tab", { name: "sales" }),
      inventoryTab: () => this.page.getByRole("tab", { name: "inventory" }),
      vdtTab: () => this.page.getByRole("tab", { name: "vdt" }),

      //sales tab
      stockNumColumn: () => this.page.getByText("STOCK #"),
      stockColumnFilter: () =>
        this.page.locator(
          "#root > div > div.MuiBox-root.css-1bkvht1 > div.MuiContainer-root.MuiContainer-maxWidthLg.css-4hqp1a-MuiContainer-root > span:nth-child(2) > div > div > div > div > div > div > div.k-grid-header > div > table > thead > tr > th:nth-child(1) > span.k-cell-inner > span > span",
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
    await this.page.goto("/dims");
    await this.page.waitForLoadState("networkidle");
  }

  // interact with elements

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

      // Make sure the element is visible and stable before clicking
      await firstGridRow.waitForElementState("visible");
      await new Promise((r) => setTimeout(r, 10000)); // Wait for 10 seconds

      // Click on the first grid row
      await firstGridRow.click();
      console.log("Clicked on the first grid row.");
    } else {
      console.log("No grid rows found.");
    }
  }

  // get page elements

  async checkElementVisibility(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await expect(element).toBeVisible();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  /// interact with elements

  async fillForm(testData) {
    for (const [key, value] of Object.entries(testData)) {
      const locatorFunction = this.locators[key];
      if (locatorFunction) {
        try {
          await this.page.waitForLoadState("networkidle");
          const inputElement = await locatorFunction();
          await inputElement.fill(value);
        } catch (originalError) {
          const errorMessage = `Filling the form field with locator '${key}' failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      } else {
        console.warn(`Locator not found for key: ${key}`);
      }
    }
  }

  async clickElement(locatorName) {
    await this.page.waitForLoadState("load");
    const locatorFunction = this.locators[locatorName];

    try {
      const element = await locatorFunction().first();
      await element.click();
      await this.page.waitForLoadState("networkidle");
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }
}
module.exports = { EscaladeDIMS };
