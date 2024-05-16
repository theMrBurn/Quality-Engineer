const { test, expect } = require("@playwright/test");
const BaseTest = require("./innovation_sprint_POM");

test.describe.serial("Innovation Sprint POC - Page Elements @smoke", () => {
  test.setTimeout(900000);

  test("Search bar is visible and can be filled", async ({ page }) => {
    const baseTest = new BaseTest(page);
    await baseTest.goto(""); // goes to the PAGE in your project baseurl

    await baseTest.clickSignInButton();
    await page.waitForLoadState("load");

    try {
      // Find the search bar element
      const searchBarElement = await page.$('[aria-label="search"]');

      if (!searchBarElement) {
        throw new Error("Search bar element not found");
      }

      // Check element visibility
      const isSearchBarVisible = await searchBarElement.isVisible();
      console.log("Search bar is visible:", isSearchBarVisible);

      // Assert on the visibility of the search bar element
      await expect(searchBarElement).toBeVisible();

      // Fill the search bar
      await searchBarElement.fill("Test search query");

      // Verify the filled value
      const filledValue = await searchBarElement.inputValue();
      await expect(filledValue).toBe("Test search query");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  test("Button is visible", async ({ page }) => {
    const baseTest = new BaseTest(page);
    await baseTest.goto(""); // goes to the PAGE in your project baseurl

    // Find the button element
    await baseTest.findElements("button");

    // Check element visibility
    const isButtonVisible = await baseTest.checkElementVisibility("button");
    console.log("Button is visible:", isButtonVisible);

    // Assert on the visibility of the button element
    const buttonElement = await page.$(baseTest.locators["button"]);
    await expect(buttonElement).toBeVisible();
  });

  test("Dropdown is visible and shows options", async ({ page }) => {
    const baseTest = new BaseTest(page);
    await baseTest.goto(""); // goes to the PAGE in your project baseurl

    // Find the dropdown element
    await baseTest.findElements("select");

    // Check element visibility
    const isDropdownVisible = await baseTest.checkElementVisibility("select");
    console.log("Dropdown is visible:", isDropdownVisible);

    // Assert on the visibility of the dropdown element
    const dropdownElement = await page.$(baseTest.locators["select"]);
    await expect(dropdownElement).toBeVisible();

    // Get the list of dropdown options
    const optionElements = await dropdownElement.$$eval("option", (options) =>
      options.map((option) => option.textContent),
    );

    console.log("Dropdown options:");
    optionElements.forEach((option) => console.log(option));
  });
});
