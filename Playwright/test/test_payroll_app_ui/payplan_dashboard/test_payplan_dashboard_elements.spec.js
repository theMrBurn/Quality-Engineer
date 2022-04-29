// Payplan Dashboard

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayplanDashboard } = require("./payplan_dashboard.js");

// user
test.use({ storageState: "pw_auth_testenv.json" });

//test
test.describe.serial("Payplans Dashboard", () => {
  test("Navigate to Payplans Dashboard and validate Page elements have loaded", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();
    await payplansDashboard.getPayPlanHeader();
    await payplansDashboard.getPayplanLink();
    await payplansDashboard.getEmployeesLink();
    await payplansDashboard.getFootersLink();
    await payplansDashboard.getTemplatesLink();
    await payplansDashboard.getFormulasLink();
    await payplansDashboard.getGridsLink();
    await payplansDashboard.getExpirationDateText();
    await payplansDashboard.getExpirationDateText2();
    await payplansDashboard.getPaycalendarText();
    await payplansDashboard.getEffectiveDateText();
    await payplansDashboard.getPPPEdateText();
    await payplansDashboard.getPlanStatusText();
    await payplansDashboard.getPlanStatusExpiring();
    await payplansDashboard.getPlanStatusSuspended();
    await payplansDashboard.getPlanStatusPending();
    await payplansDashboard.getPositionChangesText();
    await payplansDashboard.getNoPlanCreatedCount();
    await payplansDashboard.getNewHiresPendingCount();
    await payplansDashboard.getNewHiresNoActiveStatusCount();
    await payplansDashboard.getComplianceRiskText();
    await payplansDashboard.getComplianceRiskExceptionCount();
    await payplansDashboard.getComplainceRiskExipredCount();
    await payplansDashboard.getMetricsText();
    await payplansDashboard.getMetricsCreatedCount();
    await payplansDashboard.getMetricsActiveCount();
    await payplansDashboard.getAveragePerMonthBox();
  });

  test("Navigate to Payplan Dashboard and Click top header Links", async ({
    browser,
    page,
  }) => {
    const payplanDashboard = new PayplanDashboard(page);
    await payplanDashboard.goto();
    await payplanDashboard.clickEmployeesLink();
    await payplanDashboard.clickFootersLink();
    await payplanDashboard.clickFormulasLink();
    await payplanDashboard.clickGridsLink();
    await payplanDashboard.clickTemplatesLink();
  });
});
