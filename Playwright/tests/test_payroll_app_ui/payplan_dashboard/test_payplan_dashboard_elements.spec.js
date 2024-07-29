// Payplan Dashboard

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayplanDashboard } = require("./payplan_dashboard.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("Payplans Dashboard", () => {
  test("Navigate to Payplans Dashboard and validate Page elements have loaded @smoke", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    const locatorNames = [
      "payplanHeader",
      "payplanLink",
      "employeesLink",
      "footersLink",
      "templatesLink",
      "formulasLink",
      "gridsLink",
      "expirationDateText",
      "expirationDateText2",
      "paycalendarText",
      "effectiveDateText",
      "ppeDateText",
      "planStatusText",
      "planstatusExpiring",
      "planstatusSuspended",
      "planstatusPending",
      "positionChangesText",
      "noPlanCreatedCount",
      "newHiresPendingCount",
      "newHiresNoActiveStatusCount",
      "complianceRiskText",
      "complianceRiskExceptionCount",
      "complainceRiskExipredCount",
      "metricsText",
      "metricsCreatedCount",
      "metricsActiveCount",
      "averagePerMonthBox",
      "expirationDateInput",
      "expirationDateCalendar1",
      "expirationDateCalendar2",
      "payCalendarInput",
      "ppeDateInput",
      "experitationDateInput2",
      "effectiveDateInput",
      "effectiveDateCalendar",
    ];

    try {
      for (const locatorName of locatorNames) {
        await payplansDashboard.checkElementVisibility(locatorName);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to Payplan Dashboard and Click top header Links @smoke", async ({
    browser,
    page,
  }) => {
    const payplanDashboard = new PayplanDashboard(page);
    await payplanDashboard.goto();

    const locatorNames = [
      "employeesLink",
      "footersLink",
      "formulasLink",
      "gridsLink",
      "templatesLink",
    ];
  });
});
