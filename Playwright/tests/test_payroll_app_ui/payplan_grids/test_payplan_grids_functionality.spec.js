// Payplan Grids

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayPlanGrids } = require("./payplan_grids.js");

// user
//test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("PayPlan /Grids - Validate basic Functionality", () => {
  test("Navigate to /Payplan/Grids and use dropdown to validate Grid Name = VPIxPVR, description = F&I Grid VPI x PVR @func", async ({
    browser,
    page,
  }) => {
    const payplanGrids = new PayPlanGrids(page);
    await payplanGrids.goto();

    await payplanGrids.clickGridsDropdownTriangle();
    await page.locator("text=VPIxPVR >> nth=1").click();

    const gridName = await page.innerText(
      "#GridsGrid > table > tbody > tr > td:nth-child(2)"
    );
    expect.soft(gridName).toContain("VPIxPVR");

    const gridDescription = await page.innerText("text=F&I Grid VPI x PVR");
    expect(gridDescription).toContain("F&I Grid VPI x PVR");
  });

  // test DB update removed this from the dropdown. Deprecated until the next DB update when we can just delete this
  // test("Navigate to /Payplan/Grids and use dropdown to validate Grid Name = VPIxPVR (SIS), description = VPIxPVR (SIS)", async ({
  //   browser,
  //   page,
  // }) => {
  //   const payplanGrids = new PayPlanGrids(page);
  //   await payplanGrids.goto();

  //   await payplanGrids.clickGridsDropdownTriangle();
  //   await page.locator('li[role="option"]:has-text("L0304")').click();

  //   const gridName = await page.innerHTML("text=VPIxPVR");
  //   expect(gridName).toContain("VPIXPVR");

  //   const gridDescription = await page.innerHTML("text=VPIxPVR");
  //   expect(gridDescription).toContain("VPIXPVR");
  // });

  test("Navigate to /Payplan/Grids and use dropdown to validate Grid Name = PVRxVPI, description = PVRxVPI @func", async ({
    browser,
    page,
  }) => {
    const payplanGrids = new PayPlanGrids(page);
    await payplanGrids.goto();

    await payplanGrids.clickGridsDropdownTriangle();
    await page.locator('li[role="option"]:has-text("PVRxVPI")').click();

    const gridName = await page.innerText("text=PVRxVPI");
    expect.soft(gridName).toContain("PVRxVPI");

    const gridDescription = await page.innerText("text=PVRxVPI");
    expect(gridDescription).toContain("PVRxVPI");
  });
});
