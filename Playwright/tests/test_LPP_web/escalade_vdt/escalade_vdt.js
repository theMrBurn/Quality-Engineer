// this POM is for /lienpayoff
const { expect } = require("@playwright/test");

class EscaladeVDT {
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
          name: "LPP",
          exact: true,
        }),

      vehicleDocTrackingLabel: () =>
        this.page.getByRole("heading", { name: "Vehicle Document Tracking" }),

      //VDT page and grid
      vdtActionColumn: () => this.page.getByText("ACTION"),
      vdtTitleRiskColumn: () => this.page.getByText("TITLE RISK"),
      vdtDMVRiskColumn: () => this.page.getByText("DMV Risk"),
      vdtLNumColumn: () => this.page.getByText("L#"),
      vdtStoreColumn: () => this.page.getByText("STORE"),
      vdtStockNumColumn: () => this.page.getByText("STOCK NUMBER"),
      vdtTitleStatusColumn: () => this.page.getByText("TITLE STATUS"),
      vdtAgeColumn: () => this.page.getByText("AGE"),
      vdtStockDateColumn: () => this.page.getByText("STOCK DATE"),
      vdtVINColumn: () => this.page.getByText("VIN"),
      vdtYearColumn: () => this.page.getByText("YEAR"),
      vdtMakeColumn: () => this.page.getByText("MAKE"),
      vdtModelColumn: () => this.page.getByText("MODEL"),
      vdtDealNumberColumn: () => this.page.getByText("DEAL NUMBER"),
      vdtSoldDateColumn: () => this.page.getByText("SOLD DATE"),
      vdtDealStatusColumn: () => this.page.getByText("DEAL STATUS"),
      vdtSaleTypeColumn: () => this.page.getByText("SALE TYPE"),
      vdtSourceTypeColumn: () => this.page.getByText("SOURCE TYPE"),
      vdtCustomerColumn: () => this.page.getByText("CUSTOMER"),
      vdtDMVProcDateColumn: () => this.page.getByText("DMV PROCESSED DATE"),
      vdtContractDateColumn: () => this.page.getByText("CONTRACT DATE"),

      // filters
      vdtStockNumFilter: () =>
        this.page
          .getByRole("columnheader", { name: "STOCK NUMBER " })
          .locator("div span"),
      vdtStockNumSortedFilter: () =>
        this.page
          .getByRole("columnheader", { name: "STOCK NUMBER  " })
          .locator("div span"),
      vdtNestedFilter: () =>
        this.page.locator("div").filter({ hasText: /^Filter$/ }),
      vdtFilterButton: () =>
        this.page.getByRole("button", { name: "Filter", exact: true }),
      vdtClearFilterButton: () =>
        this.page.getByRole("button", { name: "Remove Filtering" }),

      // export
      exportGridDataButton: () =>
        this.page.getByRole("button", { name: "EXPORT GRID DATA" }),

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
    };
  }

  // Navigate to /Payroll/Regular endpoint
  async goto() {
    await this.page.goto("/vdt");
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

  //common test methods

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
module.exports = { EscaladeVDT };
