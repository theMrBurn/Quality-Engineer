import { test } from "@playwright/test";
import { FIM } from "./FIM_page"; // Corrected import statement

// test 1
test.describe.serial("/ F&I management, /FIM page @smoke", () => {
  test("Navigate to /FIM and validate page loads elements as expected", async ({
    page,
  }) => {
    const fimgmt = new FIM(page);
    await fimgmt.goto();

    await page.waitForLoadState("load");

    const locatorNames = [
      "fimPageHeader",
      "fimPageLogo",
      "fimUserTag",
      "fimPageText",
      "fimPageFooter",
      "fimPageSupportLink",
      "fimPageSupportLinkText",
      //"fimUserTagSignOut", -- do this once we have logout, add a seperate click action to expose it
    ];

    try {
      for (const locatorName of locatorNames) {
        console.log(
          "validating page elements are present and have loaded as expected",
        );
        await fimgmt.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
