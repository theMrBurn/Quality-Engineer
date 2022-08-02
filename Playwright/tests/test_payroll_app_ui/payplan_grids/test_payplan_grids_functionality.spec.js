// Payplan Grids

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { PayPlanGrids } = require("./payplan_grids.js");

// user
test.use({ storageState: "Playwright/helpers/pw_auth_testenv.json" });

//test
test.describe.serial("PayPlan /Grids - Validate basic Functionality", () => {
  test.fixme(
    "skip Grid Plans tests - these fail wile Feature Flag is on and dev incomplete - will be fixed by branch: AllPay/payplan-grids-Equation-builder"
  );
  test("Navigate to /Payplan/Grids and use dropdown to validate Grid Name = VPIxPVR, description = F&I Grid VPI x PVR", async ({
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
    expect(gridName).toContain("VPIxPVR");

    const gridDescription = await page.innerText("text=F&I Grid VPI x PVR");
    expect(gridDescription).toContain("F&I Grid VPI x PVR");
  });

  test("Navigate to /Payplan/Grids and use dropdown to validate Grid Name = VPIxPVR (SIS), description = VPIxPVR (SIS)", async ({
    browser,
    page,
  }) => {
    const payplanGrids = new PayPlanGrids(page);
    await payplanGrids.goto();

    await payplanGrids.clickGridsDropdownTriangle();
    await page.locator('li[role="option"]:has-text("VPIxPVR (SIS)")').click();

    const gridName = await page.innerText("text=VPIxPVR (SIS)");
    expect(gridName).toContain("VPIxPVR (SIS)");

    const gridDescription = await page.innerText("text=VPIxPVR (SIS)");
    expect(gridDescription).toContain("VPIxPVR (SIS)");
  });

  test("Navigate to /Payplan/Grids and use dropdown to validate Grid Name = PVRxVPI, description = PVRxVPI", async ({
    browser,
    page,
  }) => {
    const payplanGrids = new PayPlanGrids(page);
    await payplanGrids.goto();

    await payplanGrids.clickGridsDropdownTriangle();
    await page.locator('li[role="option"]:has-text("PVRxVPI")').click();

    const gridName = await page.innerText("text=PVRxVPI");
    expect(gridName).toContain("PVRxVPI");

    const gridDescription = await page.innerText("text=PVRxVPI");
    expect(gridDescription).toContain("PVRxVPI");
  });

  test("Navigate to /Payplan/Grids and ADD New Grid, Grid Name = QA TEST, description = TEST TEST TEST", async ({
    browser,
    page,
  }) => {
    const payplanGrids = new PayPlanGrids(page);
    await payplanGrids.goto();

    // add QA TEST grid
    // Click text=Add Grid - Modal will pop allowing remainder of element validation to occur
    await payplanGrids.clickAddGridsButton();

    // Fill input[name="Name"]
    await page.locator('input[name="Name"]').fill("QA Test");

    // Fill input[name="Description"]
    await page.locator('input[name="Description"]').fill("test test test");

    if (await page.locator("text=Update").click()) {
      const sourceSystemWarning = page.locator(
        "text=Row Source System is required."
      );
      expect(sourceSystemWarning).toBeVisible;
    }

    //clear source system field requirement warning
    await page.locator('#divErrorHolder img[alt="Hide"]').click();

    // Click text=Row Format amt Row Source System Row Source System Field Row Field Description N >> [aria-label="select"] >> nth=1
    await page
      .locator(
        'text=Row Format amt Row Source System Row Source System Field Row Field Description N >> [aria-label="select"]'
      )
      .nth(1)
      .click();

    // Click #RowSourceSystemList_listbox >> text=Store Input Sheet
    await page
      .locator("#RowSourceSystemList_listbox >> text=Store Input Sheet")
      .click();

    // Click text=Row Format amt Row Source System Row Source System Field Row Field Description N >> [aria-label="select"] >> nth=2
    await page
      .locator(
        'text=Row Format amt Row Source System Row Source System Field Row Field Description N >> [aria-label="select"]'
      )
      .nth(2)
      .click();

    // Click text=BN1 - Bonus Above
    await page.locator("text=BN1 - Bonus Above").click();

    // Fill input[name="RowFieldDescription"]
    await page.locator('input[name="RowFieldDescription"]').fill("test");

    // Triple click text=Row Format amt Row Source System Row Source System Field Row Field Description N >> [aria-label="Increase value"] span
    await page
      .locator(
        'text=Row Format amt Row Source System Row Source System Field Row Field Description N >> [aria-label="Increase value"] span'
      )
      .click({
        clickCount: 3,
      });

    // Click text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="select"] >> nth=1
    await page
      .locator(
        'text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="select"]'
      )
      .nth(1)
      .click();

    // Click #ColumnSourceSystemList_listbox >> text=FI >> nth=0
    await page
      .locator("#ColumnSourceSystemList_listbox >> text=FI")
      .first()
      .click();

    // Click text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="select"] >> nth=2
    await page
      .locator(
        'text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="select"]'
      )
      .nth(2)
      .click();

    // Click text=CASH_amt_All
    await page.locator("text=CASH_amt_All").click();

    // Click input[name="ColumnFieldDescription"]
    await page.locator('input[name="ColumnFieldDescription"]').click();

    // Fill input[name="ColumnFieldDescription"]
    await page.locator('input[name="ColumnFieldDescription"]').fill("test");

    // Click text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span
    await page
      .locator(
        'text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span'
      )
      .click();
    // Click text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span
    await page
      .locator(
        'text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span'
      )
      .click();
    // Click text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span
    await page
      .locator(
        'text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span'
      )
      .click();
    // Click text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span
    await page
      .locator(
        'text=Column Format amt Column Source System Column Source System Field Column Field D >> [aria-label="Increase value"] span'
      )
      .click();

    await payplanGrids.clickGenerateGridButton();

    // Click #divMatrix
    await expect(
      page.locator("#divMatrix"),
      "QA grid not visible after Generate is clicked"
    ).toBeVisible();

    // click Update to finish, notice error since we didnt populate grids, and click to close alert and cancel
    await payplanGrids.clickUpdateGridButton();
    await page.locator('#divErrorHolder img[alt="Hide"]').click();
  });
});
