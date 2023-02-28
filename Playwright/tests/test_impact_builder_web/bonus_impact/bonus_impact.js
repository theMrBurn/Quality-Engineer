// this POM is for /Admin
const { expect } = require("@playwright/test");

class BonusImpact {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

    //// locators

    // headers
    this.payoutImpactHeader = page.getByText("Bonus Impact");

    // unique page text
    this.actionsColumnText = page.getByText("Actions").nth(2);
    this.useCalculatedColumnText = page.getByText("Use Calculated").nth(1);
    this.descriptionColumnText = page.getByText("Description").nth(2);
    this.twentytwentyoneColumnText = page.getByText("2021 Avg").nth(2);
    this.performanceObjectiveColumnText = page
      .getByText("Performance Objective")
      .nth(2);
    this.weightColumnText = page.getByText("Weight").nth(1);
    this.fandiCommissionText = page
      .getByRole("row", { name: "Edit F&I Commissions $500 $500 $500 5%" })
      .getByRole("cell", { name: "F&I Commissions" });
    this.fandiCommissionsPercentText = page.getByRole("cell", {
      name: "F&I Commissions (1%)",
    });
    // buttons, dropdowns and input boxes

    // forms and grids

    // calendar elements
  }

  // Navigate to Impact Builder and pass PayPlan object
  async goto(text) {
    await this.page.goto(text), { waitUntil: "networkidle" };
  }

  // get page elements

  async getBonusImpactHeader() {
    await expect(
      this.payoutImpactHeader,
      "Bonus Impact component header not found"
    ).toBeVisible();
  }

  async getActionsColumnText() {
    await expect(
      this.actionsColumnText,
      "Actions Column Text not found"
    ).toBeVisible();
  }

  async getUseCalculatedColumnText() {
    await expect(
      this.useCalculatedColumnText,
      "Use Calculated Column Text not found"
    ).toBeVisible();
  }

  async getDescriptionColumnText() {
    await expect(
      this.descriptionColumnText,
      "Descrioption Column Text not found"
    ).toBeVisible();
  }

  async getTwentytwentyoneColumnText() {
    await expect(
      this.twentytwentyoneColumnText,
      "2021 Avg Column Text not found"
    ).toBeVisible();
  }

  async getPerformaceObjectiveColumnText() {
    await expect(
      this.performanceObjectiveColumnText,
      "Performance Objective Column Text not found"
    ).toBeVisible();
  }

  async getWeightColumnText() {
    await expect(
      this.weightColumnText,
      "Weight Column Text not found"
    ).toBeVisible();
  }

  async getFICommissionText() {
    await expect(
      this.fandiCommissionText,
      "F & I Commissions Text not found"
    ).toBeVisible();
  }

  async getFICommissionsPercentText() {
    await expect(
      this.fandiCommissionsPercentText,
      "F & I Commission (1%) Text Not Found"
    ).toBeVisible();
  }
  // interact with elements

  // input elements and forms
}
module.exports = { BonusImpact };
