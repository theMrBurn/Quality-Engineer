// dependencies
const { test, expect } = require("@playwright/test");
const { loanerSummaryWidget } = require("./main_dashboard_loanersummary");
const {
  MainStoreLogin,
} = require("../../../../test_spe_dashboard_login/login_spe/main_store_login.js");

// test
test.describe.serial("/main_dashboard_loaner_summary_widget_dev", () => {
  test.fixme(
    "this is a decent test that just needs some locators updated and I think it will be pretty valuable",
  );

  test("Loaner Summary Widget - Main Dashboard", async ({ page }) => {
    // perform mandatory login
    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.goto();
    await mainStoreLogin.login();
    await mainStoreLogin.twostepauthlogin();

    const lw = new loanerSummaryWidget(page);

    // Select Store for Thornhill Honda
    await lw.selectStore(
      "Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL",
      "Thornhill Honda",
    );
    console.log("Thornhill Honda");
    // Validate Loaner Count for Thornhill Honda
    await lw.validateLoanerCount();
    await lw.goto();

    // Select Store for Farmington Hills CDJR
    await lw.selectStore(
      "Thornhill Honda Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL",
      "Farmington Hills CDJR",
    );
    console.log("FH CDJR");
    // Validate Loaner Count for Farmington Hills CDJR
    // await lw.validateLoanerCount();
    await lw.goto();

    // Select Store for Markham BMW
    await lw.selectStore(
      "Farmington Hills CDJR Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL",
      "Markham BMW Mini",
    );
    console.log("Markham BMW");
    // Validate Loaner Count for Markham BMW
    await lw.validateLoanerCount();
    await lw.goto();

    // Select Stores for Downtown LA Toyota
    await lw.selectStore(
      "Markham BMW Mini Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL",
      "Downtown LA Toyota",
    );
    console.log("DT LA");
    // Validate Loaner Count for Downtown LA Toyota
    await lw.validateLoanerCount();
    await lw.goto();

    // Data is unavailable for Troy High Line
    // await lw.selectStore(
    //   "Downtown LA Toyota Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL",
    //   "Troy High Line"
    // );
    // console.log("Troy High Line");
    // await lw.validateLoanerCount();
  });
});
