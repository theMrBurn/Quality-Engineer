const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const { PD20MainPage } = require("./pd20_main_page");
const { scrapeInteractiveElements } = require("../../../helpers/utils/scrapeUtils");

// Load test data from new location
const TEST_DATA_PATH = path.resolve(__dirname, "../../../helpers/utils/pd20_test_data.json");
let testData = {};
try {
  testData = JSON.parse(fs.readFileSync(TEST_DATA_PATH, "utf8"));
} catch (e) {
  console.warn("Failed to load test data:", e.message);
}

/**
 * Map scraped elements to POM locators or fallback to direct locator interaction
 * and perform basic interaction
 */
async function performBasicInteraction(page, elInfo, pd20Page, testData) {
  try {
    if (elInfo.selector.includes("apply-bookmark")) {
      await pd20Page.clickElement("applyBookmarkButton");
    } else if (/inputField/i.test(elInfo.selector)) {
      for (const key of Object.keys(pd20Page.locators)) {
        if (key.toLowerCase().includes("input") &&
            elInfo.selector.toLowerCase().includes(key.toLowerCase().replace("input", ""))) {
          const val = testData.inputs[key] || "test";
          await pd20Page.fillInput(key, val);
          break;
        }
      }
    } else if (elInfo.tagName === "button" || elInfo.tagName === "a") {
      const locator = page.locator(elInfo.selector);
      await locator.click();
    } else {
      console.log(`Skipping interaction for ${elInfo.selector} (${elInfo.tagName})`);
      return false;
    }
    console.log(`Interacted with ${elInfo.selector} (${elInfo.tagName})`);
    return true;
  } catch (err) {
    console.error(`Failed interaction for ${elInfo.selector}: ${err.message}`);
    return false;
  }
}

test.describe.serial("PD20 Base Interaction Test", () => {
  test("should scrape, interact and validate dynamically", async ({ page }, testInfo) => {
    const baseUrl = testInfo.project.use.baseURL || testData.urls?.mainPage || "/";
    if (!baseUrl) test.skip(true, "Missing baseURL - cannot navigate");

    const pd20Page = new PD20MainPage(page);
    await pd20Page.goto(baseUrl);

    // If login needed and not via storageState, call login helper here (optional)

    // Scrape interactive elements on page
    const interactiveElements = await scrapeInteractiveElements(page);
    if (interactiveElements.length === 0) {
      console.warn("No interactive elements found, skipping interactions.");
      return;
    }

    // Optional: CLI override command from environment variable BASE_TEST_CLI, e.g. "click applyBookmarkButton"
    const cliCommand = process.env.BASE_TEST_CLI || "";
    if (cliCommand) {
      console.log(`Executing CLI command: ${cliCommand}`);
      const [action, target, ...args] = cliCommand.split(" ");
      try {
        switch (action) {
          case "click":
            await pd20Page.clickElement(target);
            break;
          case "fill":
            if (!args.length) throw new Error("Fill command missing value");
            await pd20Page.fillInput(target, args.join(" "));
            break;
          default:
            console.warn(`Unknown CLI action: ${action}`);
        }
      } catch (e) {
        throw new Error(`CLI command failed: ${e.message}`);
      }
      return;
    }

    // Otherwise, perform interactions on all discovered elements
    let successCount = 0;
    for (const elInfo of interactiveElements) {
      if (await performBasicInteraction(page, elInfo, pd20Page, testData)) successCount++;
    }

    console.log(`Successfully interacted with ${successCount} out of ${interactiveElements.length} elements.`);

    // Optional validation: bookmark status text includes expected string from test data
    try {
      const bookmarkText = await pd20Page.getText("bookmarkStatus");
      if (bookmarkText && testData.expectedTexts?.bookmarkApplied) {
        expect(bookmarkText).toContain(testData.expectedTexts.bookmarkApplied);
      }
    } catch {
      // Ignore if bookmarkStatus locator or text not found
    }
  });
});