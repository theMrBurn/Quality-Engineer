class BaseTest {
  constructor(page) {
    this.page = page;
    this.locators = {}; // This will map locator names to selector strings
  }

  async goto(url) {
    console.log("Navigating to:", url);
    await this.page.goto(url);
    await this.page.waitForLoadState("load");
  }

  async clickSignInButton() {
    const signInButton = await this.page.$(
      '//*[@id="root"]/div/div[3]/div/div/button',
    );
    if (signInButton) {
      await signInButton.click();
    } else {
      console.log("Sign in button not found or already clicked");
    }
  }

  async logRequests() {
    await this.page.route("**/*", (route) => {
      console.log("Request URL:", route.request().url());
      route.continue();
    });

    await this.page.route("**/*", async (route, request) => {
      await route.continue(); // Make sure to continue the request first
      const response = await request.response(); // Capture the response
      console.log("Response URL:", response.url());
    });
  }

  // Add locators to the locators object
  addLocators(newLocators) {
    this.locators = { ...this.locators, ...newLocators };
  }

  // Check element visibility
  async checkElementVisibility(locatorName) {
    try {
      console.log("Checking visibility for:", locatorName);
      const locator = this.locators[locatorName];
      await this.page.waitForSelector(locator); // Wait for the element to be present
      const element = await this.page.$(locator); // Find the element
      return await element.isVisible(); // Check the visibility of the element
    } catch (originalError) {
      const errorMessage = `Locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async findElements(tag) {
    console.log("Finding elements with tag:", tag);
    const elements = await this.page.$$(tag);

    // Handle specific elements
    if (tag === "input[type='search']") {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const id = (await element.getAttribute("id")) || `${tag}${i}`;
        this.locators[id] = `input[type='search']#${id}`;
      }
    }
  }

  // Filling a form
  async fillForm(locatorName, value) {
    try {
      console.log(
        `Filling form for locator '${locatorName}' with value:`,
        value,
      );
      await this.page.waitForSelector(this.locators[locatorName]);
      const inputElement = await this.page.$(this.locators[locatorName]);
      await inputElement.fill(value);
    } catch (originalError) {
      const errorMessage = `Filling form for locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  // Clicking an element
  async clickElement(locatorName) {
    try {
      console.log("Clicking on:", locatorName);
      await this.page.waitForSelector(this.locators[locatorName]);
      const element = await this.page.$(this.locators[locatorName]);
      await element.click();
    } catch (originalError) {
      const errorMessage = `Clicking on locator '${locatorName}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  // Finding grid rows
  async findGridRows(gridSelector) {
    try {
      console.log("Finding grid rows with selector:", gridSelector);
      await this.page.waitForSelector(gridSelector);
      const gridRowHandles = await this.page.$$(gridSelector);
      return gridRowHandles;
    } catch (originalError) {
      const errorMessage = `Finding grid rows for '${gridSelector}' failed: ${originalError.message}`;
      throw new Error(errorMessage);
    }
  }

  async scrapePageElements() {
    await this.page.waitForLoadState("load");
    const elementHandles = await this.page.$$("body *"); // get all elements in the body
    const tagNames = new Set(); // use a Set to store unique tag names
    const nonInteractableTags = ["noscript", "script", "style"]; // Define non-interactable tags

    // Loop through all elements and get the unique tag names
    for (const elementHandle of elementHandles) {
      const tagName = await this.page.evaluate(
        (element) => element.tagName.toLowerCase(),
        elementHandle,
      );
      if (!nonInteractableTags.includes(tagName)) {
        tagNames.add(tagName);
      }
    }

    // Now call findElements for each unique tag name
    for (const tagName of tagNames) {
      await this.findElements(tagName);
    }

    // Print out the found locators
    const locatorNames = Object.keys(this.locators);
    console.log("Locators found and stored:");
    for (const locatorName of locatorNames) {
      const label = await this.page.getAttribute(
        this.locators[locatorName],
        "label",
      );
      console.log(`- Locator: ${locatorName}, Label: ${label}`);
    }
  }
}
module.exports = BaseTest;
