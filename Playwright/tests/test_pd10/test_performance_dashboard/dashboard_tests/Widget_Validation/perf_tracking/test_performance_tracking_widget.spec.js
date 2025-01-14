const { test, expect } = require("@playwright/test");
const { PerformanceTracking } = require("./performance_tracking");
const {
  MainStoreLogin,
} = require("../../../../test_spe_dashboard_login/login_spe/main_store_login");

test.describe.serial("/main_dashboard_performance_tracking_widget_dev", () => {
  test.fixme(
    "I like this test too, but I may not keep it, because I feel like if I do the validation from scratch it may be simpler",
  );

  test("Performance Tracking Widget - Main Dashboard", async ({ page }) => {
    const performanceTracking = new PerformanceTracking(page);

    const mainStoreLogin = new MainStoreLogin(page);
    await mainStoreLogin.login();

    // Helper function to validate for multiple stores
    const validateStore = async (
      storeSelectionMethod,
      storeName,
      validationMethod,
    ) => {
      await performanceTracking.goto();
      await storeSelectionMethod();
      console.log(storeName);
      await validationMethod();
    };

    const selectStoreThornhillHonda = async () => {
      await performanceTracking.selectStore(
        "Thornhill Honda",
        "CANADA",
        "Thornhill Honda",
      );
    };

    const selectStoreFHCJDR = async () => {
      await performanceTracking.selectStore(
        "FH CDJR",
        "MICHIGAN",
        "Farmington Hills CDJR",
      );
    };

    const selectStoreMarkhamBMW = async () => {
      await performanceTracking.selectStore(
        "Markham BMW",
        "CANADA",
        "Markham BMW Mini",
      );
    };

    const selectStoreDTLA = async () => {
      await performanceTracking.selectStore(
        "DT LA",
        "CALIFORNIA",
        "Downtown LA Toyota",
      );
    };

    const selectStoreTroyHighLine = async () => {
      await performanceTracking.selectStore(
        "Troy JLR",
        "MICHIGAN",
        "Troy High Line",
      );
    };

    await validateStore(
      selectStoreThornhillHonda,
      "Thornhill Honda",
      performanceTracking.validateUnits.bind(performanceTracking),
    );
    await validateStore(
      selectStoreFHCJDR,
      "FH CDJR",
      performanceTracking.validateUnits.bind(performanceTracking),
    );
    await validateStore(
      selectStoreMarkhamBMW,
      "Markham BMW",
      performanceTracking.validateUnits.bind(performanceTracking),
    );
    await validateStore(
      selectStoreDTLA,
      "DT LA",
      performanceTracking.validateUnits.bind(performanceTracking),
    );
    await validateStore(
      selectStoreTroyHighLine,
      "Troy JLR",
      performanceTracking.validateUnits.bind(performanceTracking),
    );

    // Uncomment the following lines to use the detailed validation method instead
    /*
    await validateStore(selectStoreThornhillHonda, "Thornhill Honda", performanceTracking.validateWithDetailUnits.bind(performanceTracking));
    await validateStore(selectStoreFHCJDR, "FH CDJR", performanceTracking.validateWithDetailUnits.bind(performanceTracking));
    await validateStore(selectStoreMarkhamBMW, "Markham BMW", performanceTracking.validateWithDetailUnits.bind(performanceTracking));
    await validateStore(selectStoreDTLA, "DT LA", performanceTracking.validateWithDetailUnits.bind(performanceTracking));
    await validateStore(selectStoreTroyHighLine, "Troy JLR", performanceTracking.validateWithDetailUnits.bind(performanceTracking));
    */
  });
});
