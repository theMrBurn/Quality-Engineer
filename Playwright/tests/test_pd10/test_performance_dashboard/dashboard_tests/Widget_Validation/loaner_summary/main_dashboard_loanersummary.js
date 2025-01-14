const { expect } = require("@playwright/test");

class loanerSummaryWidget {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  locators = {
    getSalesTab: () => this.page.locator('span:has-text("Sales")'),
    getSalesNewVehicle: () => this.page.locator('span:has-text("New Vehicle")'),
    getSalesLoanerVehicleDetail: () =>
      this.page.locator(':nth-match(:text("Loaner Vehicle Detail"),1)'),
  };

  async goto() {
    await this.page.goto("/main/store");
    await this.page.waitForLoadState("networkidle");
  }

  async selectStore(storeLocatorText, storeName) {
    await this.page
      .locator(`div:has-text("${storeLocatorText}")`)
      .nth(2)
      .click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(".allSelectorIndicator").click();
    await this.page.locator(`label:has-text("${storeName}")`).click();
    await this.page.locator("#storeSelector >> text=Select").click();
    await this.page.waitForLoadState("networkidle");
  }

  async validateLoanerCount() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    const countfromMain = await this.page
      .locator("//body/div[1]/main[1]/div[2]/section[2]/article[1]/div[2]")
      .innerText();
    const totaldollarsfromMain = await this.page
      .locator("//body/div[1]/main[1]/div[2]/section[2]/article[1]/div[4]")
      .innerText();
    const d = totaldollarsfromMain.replace("$", "");

    await this.clickElement("getSalesTab");
    await this.clickElement("getSalesNewVehicle");
    await this.clickElement("getSalesLoanerVehicleDetail");

    await this.page.waitForLoadState("networkidle");

    const TotalActualXpath =
      "//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]";
    const g = await this.page.locator(TotalActualXpath).innerText();
    const BalanceActualXpath =
      "//body/div[1]/div[2]/div[1]/section[1]/div[3]/table[1]/tbody[1]/tr[1]/td[3]";
    const ce = await this.page.locator(BalanceActualXpath).innerText();
    const de = ce.replace("$", "");

    if (g != countfromMain) {
      console.log(
        "For the regression set of stores, the loaner summary count doesn't match between main dashboard widget to the loaner summary report.",
      );
      console.log(
        "From main dashboard - loaner widget total count is: " + countfromMain,
      );
      console.log("The loaner summary report total is: " + g);
    }
    if (de != d) {
      console.log(
        "For the regression set of stores, the loaner summary balance total doesn't match between main dashboard widget to the loaner summary report.",
      );
      console.log("From main dashboard - loaner widget total balance is: " + d);
      console.log("The loaner summary report total balance is: " + de);
    }
  }

  async clickElement(locatorName) {
    const locatorFunction = this.locators[locatorName];
    const element = locatorFunction();

    try {
      await element.first().click();
    } catch (error) {
      throw new Error(`Clicking on locator failed: ${error.message}`);
    }
  }
}

module.exports = { loanerSummaryWidget };
