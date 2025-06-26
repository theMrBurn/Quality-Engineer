import { test } from "@playwright/test";
import { FIM } from "./FIM_page"; // Corrected import statement
import FIM_Login from "../../../../../helpers/login/fim_login";

// test 1
test.describe.serial("/ F&I management, /FIM page @smoke", () => {
  test("Navigate to /FIM and validate page loads elements as expected", async ({
    page,
  }) => {
    const fimgmt = new FIM(page);
    await fimgmt.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the l

    await page.waitForLoadState("load");

    const locatorNames = [
      "fimPageHeader",
      "fimPageLogo",
      "fimUserTag",
      "fimPageFooter",
      "fimPageSupportLink",
      "fimPageSupportLinkText",
      //"fimUserTagSignOut", -- do this once we have logout, add a seperate click action to expose it
    ];

    try {
      for (const locatorName of locatorNames) {
        console.log(
          `Validating page element: ${locatorName} is present and has loaded as expected`,
        );
        await fimgmt.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
