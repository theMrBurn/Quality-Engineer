// Admin Page

// dependencies
const { test, expect } = require("@playwright/test");
const { Admin } = require("./admin.js");

// test
test.describe.serial("/Admin", () => {
  test("Navigate to /Admin and validate when Position Type Category is chosen, is displayed as expected @func", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    try {
      await adminPage.clickElement("categoryDropdownTriangle");
      await adminPage.clickElement("positionTypeDefinitions");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Admin and validate when Data Type Category is chosen, is displayed as expected @func", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    try {
      await adminPage.clickElement("categoryDropdownTriangle");
      await adminPage.clickElement("dataTypeDefinitions");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Admin and validate Legal Explanation Text can be entered, and search results displayed if found @func", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    try {
      await adminPage.fillForm({
        legalExplanationInput: "RGPS Data Explanation",
      });
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Admin and validate Start Date can be chosen, and search results displayed if found @func", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    try {
      // input Start Date
      await adminPage.fillForm({ startDatePicker: "1/1/2000" });

      // input End Date
      await adminPage.fillForm({ endDatePicker: "12/31/2090" });
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Admin and click New Legal Explanation @func", async ({
    browser,
    page,
  }) => {
    const adminPage = new Admin(page);
    await adminPage.goto();

    try {
      // click New Legal Explanation and input dummy Test info
      await adminPage.clickElement("newLegalButton");

      await adminPage.fillForm({ gridNameInput: "Test Name" });

      await adminPage.fillForm({ gridCategoryInput: "Test Category" });

      // input Start Date and End Date
      await adminPage.fillForm({ startDateGridInput: "1/1/2000" });
      await adminPage.fillForm({ endDateGridInput: "12/31/2090" });

      // click cancel
      await adminPage.clickElement("cancelButton");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
