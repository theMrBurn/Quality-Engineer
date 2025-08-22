import { test } from "@playwright/test";
import { FIM } from "./FIM_page"; // Corrected import statement
import FIM_Login from "../../../../../helpers/login/fim_login";

// test 1
test.describe.serial("F&I management, /FIM page @smoke", () => {
  test("Navigate to /FIM and validate page loads elements as expected", async ({
    page,
  }) => {
    const fimgmt = new FIM(page);
    await fimgmt.goto();

    const fimLogin = new FIM_Login(); // Instantiate the login helper
    await fimLogin.loginFIM(page); // Call the login method

    await page.waitForLoadState("load");

    const locatorNames = [
      "fimPageHeader",
      "fimPageLogo",
      "fimUserTag",
      "fimPageFooter",
      "fimPageSupportLink",
      "fimPageSupportLinkText",
      //"fimUserTagSignOut", - need to do this in the func tests i think, logout and login again
    ];

    try {
      for (const locatorName of locatorNames) {
        console.log(
          `Validating page element: '${locatorName}' is present and has loaded as expected`,
        );
        await fimgmt.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
