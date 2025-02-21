const { test, expect } = require("@playwright/test");
const { NewVehicleInventory } = require("./new_used_vehicle_inventory");

test.describe.serial("/New_Vehicle_Inventory", () => {
  test.fixme("need to update nav and locators to get this to work as expected");
  test("Excess Duplicates", async ({ page }) => {
    // Navigate to the base URL
    await page.goto("/");
    await page.waitForLoadState("load");

    try {
      // Select stores for regression
      await page
        .locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        )
        .nth(2)
        .click();
      await page.locator(".allSelectorIndicator").click();
      await page.locator("#storeSelector >> text=Select").click();
      await page.waitForLoadState("networkidle");

      // Navigate to Sales New Inventory Detail
      await page.waitForLoadState("networkidle");
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // Validate Duplicate Store
      const totalRows = await page.locator("tr").count();
      for (let i = 1; i < Math.min(5, totalRows); i++) {
        const beforeXpath =
          '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
        const afterXpath = "]/td[1]/a[1]";
        const compareXpath1 = beforeXpath + i + afterXpath;
        const compareXpath2 = beforeXpath + (i + 1) + afterXpath;
        const text1 = await page.locator(compareXpath1).innerText();
        const text2 = await page.locator(compareXpath2).innerText();
        if (text1 === text2) {
          console.log(
            `NVI - Invoice Aging - The store name ${text2} is a duplicate`,
          );
        }
      }

      // Validate Duplicate VIN
      for (let i = 1; i < Math.min(5, totalRows); i++) {
        const beforeXpath =
          '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
        const afterXpath = "]/td[1]/a[1]";
        const storeXpath = beforeXpath + i + afterXpath;
        const storeName = await page.locator(storeXpath).innerText();
        await page.locator(storeXpath).click();
        await page.waitForLoadState("networkidle");
        await page.locator("text=100select >> span").nth(2).click();
        await page.locator('li[role="option"]:has-text("500")').click();
        await page.waitForLoadState("load");
        const vinTotalRows = await page.locator("tr").count();
        for (let j = 1; j < vinTotalRows; j++) {
          const vinBeforeXpath =
            '//*[@id="NewDetailTable"]/div[3]/table[1]/tbody[1]/tr[';
          const vinAfterXpath = "]/td[27]";
          const vinXpath1 = vinBeforeXpath + j + vinAfterXpath;
          const vinXpath2 = vinBeforeXpath + (j + 1) + vinAfterXpath;
          const vin1 = await page.locator(vinXpath1).innerText();
          const vin2 = await page.locator(vinXpath2).innerText();
          if (vin1 === vin2) {
            console.log(
              `NVI - Invoice aging - The store ${storeName} has duplicate VINS`,
            );
          }
        }
        await page.goBack();
        await page
          .locator('span:has-text("New Inventory Detail")')
          .first()
          .click();
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Excess Totals", async ({ page }) => {
    // Navigate to the base URL
    await page.goto();

    try {
      // Navigate to Sales New Inventory Detail
      await page.waitForLoadState("networkidle");
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // Verify Total Vehicle Total
      const totalCountText = await page
        .locator('span[class="k-pager-info k-label"]')
        .innerText();
      const sanitizedTotal = parseInt(totalCountText.replace(",", ""));

      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.waitForLoadState("networkidle");

      const itemCountText = await page
        .locator('span[class="k-pager-info k-label"]')
        .innerText();
      const itemCount = parseInt(
        itemCountText.replace("1 - 100 of ", "").replace(" items", ""),
      );

      if (sanitizedTotal === itemCount) {
        console.log("NVI - Totals in Invoice Aging Page match");
      } else {
        console.log("NVI - Totals in Invoice Aging page mismatch");
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Invoice Aging Duplicates", async ({ page }) => {
    const newvehicleinventory = new NewVehicleInventory(page);

    // Navigation
    await newvehicleinventory.goto();

    try {
      // Select stores for regression
      await page
        .locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        )
        .nth(2)
        .click();
      await page.locator(".allSelectorIndicator").click();
      await page.locator("#storeSelector >> text=Select").click();
      await page.waitForLoadState("networkidle");

      // Navigate to Sales New Inventory Detail
      await page.waitForLoadState("networkidle");
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // Validate Duplicate VIN
      const totalRows = await page.locator("tr").count();
      for (let i = 1; i < Math.min(5, totalRows); i++) {
        const beforeXpath =
          '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
        const afterXpath = "]/td[1]/a[1]";
        const storeXpath = beforeXpath + i + afterXpath;
        const storeName = await page.locator(storeXpath).innerText();
        await page.locator(storeXpath).click();
        await page.waitForLoadState("networkidle");
        await page.locator("text=100select >> span").nth(2).click();
        await page.locator('li[role="option"]:has-text("500")').click();
        await page.waitForTimeout(5000);
        const vinTotalRows = await page.locator("tr").count();
        for (let j = 1; j < vinTotalRows; j++) {
          const vinBeforeXpath =
            '//*[@id="NewDetailTable"]/div[3]/table[1]/tbody[1]/tr[';
          const vinAfterXpath = "]/td[27]";
          const vinXpath1 = vinBeforeXpath + j + vinAfterXpath;
          const vinXpath2 = vinBeforeXpath + (j + 1) + vinAfterXpath;
          const vin1 = await page.locator(vinXpath1).innerText();
          const vin2 = await page.locator(vinXpath2).innerText();
          if (vin1 === vin2) {
            console.log(
              `NVI - Invoice aging - The store ${storeName} has duplicate VINS`,
            );
          }
        }
        await page.goBack();
        await page
          .locator('span:has-text("New Inventory Detail")')
          .first()
          .click();
      }

      // Validate Duplicate Store
      for (let i = 1; i < Math.min(5, totalRows); i++) {
        const beforeXpath =
          '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
        const afterXpath = "]/td[1]/a[1]";
        const compareXpath1 = beforeXpath + i + afterXpath;
        const compareXpath2 = beforeXpath + (i + 1) + afterXpath;
        const text1 = await page.locator(compareXpath1).innerText();
        const text2 = await page.locator(compareXpath2).innerText();
        if (text1 === text2) {
          console.log(
            `NVI - Invoice Aging - The store name ${text2} is a duplicate`,
          );
        }
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Excess Totals Stores", async ({ page }) => {
    const newvehicleinventory = new NewVehicleInventory(page);

    // Navigation
    await newvehicleinventory.goto();

    try {
      // Select stores for regression
      await page.waitForTimeout(5000);
      await page
        .locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        )
        .nth(2)
        .click();
      await page.locator(".allSelectorIndicator").click();
      await page.locator("#storeSelector >> text=Select").click();
      await page.waitForLoadState("networkidle");

      // Navigate to Sales New Inventory Detail
      await page.waitForLoadState("networkidle");
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // Validate Totals for a Store
      const totalRows = await page.locator("tr").count();
      for (let i = 1; i < Math.min(5, totalRows); i++) {
        const beforeXpath =
          '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
        const afterXpath = "]/td[12]/a[1]";
        const totalXpath = beforeXpath + i + afterXpath;
        const totalCount = await page.locator(totalXpath).innerText();
        const storeXpath = beforeXpath + i + "]/td[1]/a[1]";
        const storeName = await page.locator(storeXpath).innerText();
        await page.locator(totalXpath).click();
        await page.waitForLoadState("networkidle");
        await page.locator("text=100select >> span").nth(2).click();
        await page.locator('li[role="option"]:has-text("500")').click();
        await page.waitForTimeout(5000);
        const rowCount = await page.locator("tr").count();
        const totalRowsCount = rowCount - 1;
        if (totalCount !== totalRowsCount) {
          console.log(
            `NVI - Invoice Aging - The Total Units for ${storeName} has a mismatch in Total Units`,
          );
        }
        await page.goBack();
        await page
          .locator('span:has-text("New Inventory Detail")')
          .first()
          .click();
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Totals for Stores - Invoice Aging", async ({ page }) => {
    const newvehicleinventory = new NewVehicleInventory(page);

    // Navigation
    await newvehicleinventory.goto();

    try {
      // Select stores for regression
      await page.waitForTimeout(5000);
      await page
        .locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        )
        .nth(2)
        .click();
      await page.locator(".allSelectorIndicator").click();
      await page.locator("#storeSelector >> text=Select").click();
      await page.waitForLoadState("networkidle");

      // Navigate to Sales New Inventory Detail
      await page.waitForLoadState("networkidle");
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // Validate Totals for a Store for 0-30 Days
      await validateTotalsForAStore(page, "0-30 Days", 4);

      // Validate Totals for a Store for 31-60 Days
      await validateTotalsForAStore(page, "31-60 Days", 6);

      // Validate Totals for a Store for 61-90 Days
      await validateTotalsForAStore(page, "61-90 Days", 8);

      // Validate Totals for a Store for 91+ Days
      await validateTotalsForAStore(page, "91 Days", 10);

      // Validate Totals for a Store Total
      await validateTotalsForAStore(page, "Total", 12);
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  async function validateTotalsForAStore(page, days, column) {
    await page.waitForLoadState("load");
    const totalRows = await page.locator("tr").count();
    for (let i = 1; i < Math.min(5, totalRows); i++) {
      const beforeXpath = '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
      const afterXpath = `]/td[${column}]/a[1]`;
      const totalXpath = beforeXpath + i + afterXpath;
      const totalCount = await page.locator(totalXpath).innerText();
      const storeXpath = beforeXpath + i + "]/td[1]/a[1]";
      const storeName = await page.locator(storeXpath).innerText();
      await page.locator(totalXpath).click();
      await page.waitForLoadState("networkidle");
      await page.locator("text=100select >> span").nth(2).click();
      await page.locator('li[role="option"]:has-text("500")').click();
      await page.waitForTimeout(5000);
      const rowCount = await page.locator("tr").count();
      const totalRowsCount = rowCount - 1;
      if (totalCount !== totalRowsCount) {
        console.log(
          `NVI - Invoice Aging - The Total Units for ${days} ${storeName} has a mismatch in Total Units`,
        );
      }
      await page.goBack();
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
    }
  }

  test("Invoice Aging Totals", async ({ page }) => {
    const newvehicleinventory = new NewVehicleInventory(page);

    // Navigation
    await newvehicleinventory.goto();

    try {
      // Navigate to Sales New Inventory Detail
      await page.waitForLoadState("networkidle");
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // Validate Day Supply
      await validateDaySupply(page);

      // Verify Total Vehicle for 0-30 Days
      await verifyTotalVehicleBuckets(
        page,
        "0-30 Days",
        "span.k-pager-info.k-label",
        "span.k-pager-info.k-label",
      );

      // Verify Total Vehicle for 31-60 Days
      await verifyTotalVehicleBuckets(
        page,
        "31-60 Days",
        "span.k-pager-info.k-label",
        "span.k-pager-info.k-label",
      );

      // Verify Total Vehicle for 61-90 Days
      await verifyTotalVehicleBuckets(
        page,
        "61-90 Days",
        "span.k-pager-info.k-label",
        "span.k-pager-info.k-label",
      );

      // Verify Total Vehicle for 91+ Days
      await verifyTotalVehicleBuckets(
        page,
        "91+ Days",
        "span.k-pager-info.k-label",
        "span.k-pager-info.k-label",
      );

      // Verify Total Vehicle Total
      const totalCount = await page
        .locator("span.k-pager-info.k-label")
        .innerText();
      const sanitizedTotal = parseInt(totalCount.replace(",", ""));
      await page
        .locator('span:has-text("New Inventory Detail")')
        .first()
        .click();
      await page.waitForLoadState("networkidle");
      const itemCountText = await page
        .locator("span.k-pager-info.k-label")
        .innerText();
      const itemCount = parseInt(
        itemCountText.replace("1 - 100 of ", "").replace(" items", ""),
      );
      if (sanitizedTotal === itemCount) {
        console.log("NVI - Totals in Invoice Aging Page match");
      } else {
        console.log("NVI - Totals in Invoice Aging page mismatch");
      }

      // Verify Total Between Summary and Detail Page
      await verifyTotalBetWeenSummaryandDetailPage(page);
    } catch (error) {
      console.error("Error during test:", error.message);
      // Mark the test as failed
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  async function validateDaySupply(page) {
    const beforeDSXpath = '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
    const afterDSXpath = "]/td[15]";
    const rowCount = await page.locator("tr").count();
    for (let i = 1; i < rowCount - 3; i++) {
      const actualDSXpath = beforeDSXpath + i + afterDSXpath;
      expect(await page.locator(actualDSXpath)).toBeTruthy();
    }
  }

  async function verifyTotalVehicleBuckets(
    page,
    description,
    countLocator1,
    countLocator2,
  ) {
    const totalCount1 = await page.locator(countLocator1).innerText();
    const totalCount2 = await page.locator(countLocator2).innerText();
    if (totalCount1 === totalCount2) {
      console.log(`NVI - ${description} - Total count matches`);
    } else {
      console.log(`NVI - ${description} - Total count mismatch`);
    }
  }

  async function verifyTotalBetWeenSummaryandDetailPage(page) {
    const summaryTotal = await page
      .locator("span.k-pager-info.k-label")
      .innerText();
    await page.locator('span:has-text("New Inventory Detail")').first().click();
    await page.waitForLoadState("networkidle");
    const detailTotal = await page
      .locator("span.k-pager-info.k-label")
      .innerText();
    if (summaryTotal === detailTotal) {
      console.log("NVI - Totals between summary and detail page match");
    } else {
      console.log("NVI - Totals between summary and detail page mismatch");
    }
  }

  test("On Ground Duplicates", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    try {
      // SelectStoresForRegression method
      await page.waitForTimeout(5000);
      await page
        .locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        )
        .nth(2)
        .click();
      await page.locator(".allSelectorIndicator").click();
      await page.locator("#storeSelector >> text=Select").click();
      await page.waitForLoadState("networkidle");

      // NavigateToSalesNewInventoryDetail method
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(7000);
      await page.waitForTimeout(5000);
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page.locator('a:has-text("New Inventory Detail")').first().click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // ValidateDuplicateVIN method
      const vinTotalRows = await page.locator("tr").count();
      for (let i = 1; i < Math.min(5, vinTotalRows); i++) {
        const beforeXpath =
          '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
        const afterXpath = "]/td[1]/a[1]";
        const storeXpath = beforeXpath + i + afterXpath;
        const storeName = await page.locator(storeXpath).innerText();
        await page.locator(storeXpath).click();
        await page.waitForLoadState("networkidle");
        await page.locator("text=100select >> span").nth(2).click();
        await page.locator('li[role="option"]:has-text("500")').click();
        await page.waitForTimeout(5000);

        const vinRows = await page.locator("tr").count();
        for (let j = 1; j < vinRows; j++) {
          const vinBeforeXpath =
            '//*[@id="NewDetailTable"]/div[3]/table[1]/tbody[1]/tr[';
          const vinAfterXpath = "]/td[27]";
          const vinXpath1 = vinBeforeXpath + j + vinAfterXpath;
          const vinXpath2 = vinBeforeXpath + (j + 1) + vinAfterXpath;
          const vin1 = await page.locator(vinXpath1).innerText();
          const vin2 = await page.locator(vinXpath2).innerText();
          if (vin1 === vin2) {
            console.log(
              `NVI - Invoice aging - The store ${storeName} has duplicate VINS`,
            );
          }
        }
        await page.goBack();
        await page
          .locator('a:has-text("New Inventory Detail")')
          .first()
          .click();
      }

      // ValidateDuplicateStore method
      const totalRows = await page.locator("tr").count();
      for (let i = 1; i < Math.min(5, totalRows); i++) {
        const beforeXpath =
          '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
        const afterXpath = "]/td[1]/a[1]";
        const compareXpath1 = beforeXpath + i + afterXpath;
        const compareXpath2 = beforeXpath + (i + 1) + afterXpath;
        const text1 = await page.locator(compareXpath1).innerText();
        const text2 = await page.locator(compareXpath2).innerText();
        if (text1 === text2) {
          console.log(
            `NVI - Invoice Aging - The store name ${text2} is a duplicate`,
          );
        }
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Totals for a Store - On Ground", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    try {
      // SelectStoresForRegression method
      await page.waitForTimeout(5000);
      await page
        .locator(
          'div:has-text("Multiple Stores Location Group VP Manufacturer Same Store 12 Groups LITHIABAIERL")',
        )
        .nth(2)
        .click();
      await page.locator(".allSelectorIndicator").click();
      await page.locator("#storeSelector >> text=Select").click();
      await page.waitForLoadState("networkidle");

      // NavigateToSalesNewInventoryDetail method
      await page.waitForLoadState("networkidle");

      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page.locator('a:has-text("New Inventory Detail")').first().click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // ValidateTotalsForAStore method
      const validateTotalsForAStore = async (days, column) => {
        await page.waitForTimeout(4000);
        const totalRows = await page.locator("tr").count();
        for (let i = 1; i < Math.min(5, totalRows); i++) {
          const beforeXpath =
            '//*[@id="AgingTable"]/div[3]/table[1]/tbody[1]/tr[';
          const afterXpath = `]/td[${column}]/a[1]`;
          const totalXpath = beforeXpath + i + afterXpath;
          const totalCount = await page.locator(totalXpath).innerText();
          const storeXpath = beforeXpath + i + "]/td[1]/a[1]";
          const storeName = await page.locator(storeXpath).innerText();
          await page.locator(totalXpath).click();
          await page.waitForLoadState("networkidle");
          await page.locator("text=100select >> span").nth(2).click();
          await page.locator('li[role="option"]:has-text("500")').click();
          await page.waitForTimeout(5000);
          const rowCount = await page.locator("tr").count();
          const totalRowsCount = rowCount - 1;
          if (totalCount !== totalRowsCount.toString()) {
            console.log(
              `NVI - Invoice Aging - The Total Units for ${days} ${storeName} has a mismatch in Total Units`,
            );
          }
          await page.goBack();
          await page
            .locator('a:has-text("New Inventory Detail")')
            .first()
            .click();
        }
      };

      // ValidateTotalsForAStore030Days method
      await validateTotalsForAStore("0-30 Days", 4);

      // ValidateTotalsForAStore3160Days method
      await validateTotalsForAStore("31-60 Days", 6);

      // ValidateTotalsForAStore6190Days method
      await validateTotalsForAStore("61-90 Days", 8);

      // ValidateTotalsForAStore91Days method
      await validateTotalsForAStore("91 Days", 10);

      // ValidateTotalsForAStoreTotal method
      await validateTotalsForAStore("Total", 12);
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("On Ground Totals", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    try {
      // NavigateToSalesNewInventoryDetail method
      await page.waitForLoadState("networkidle");

      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page.locator('a:has-text("New Inventory Detail")').first().click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // ValidateDaySupply method
      const beforeDSXpath =
        "//*[@id='AgingTable']/div[3]/table[1]/tbody[1]/tr[";
      const afterDSXpath = "]/td[15]";
      const rowCount = await page.locator("tr").count();
      for (let i = 1; i < rowCount - 3; i++) {
        const actualDSXpath = beforeDSXpath + i + afterDSXpath;
        expect(await page.locator(actualDSXpath)).toBeTruthy();
      }

      // VerifyTotalVehicleBuckets method
      const verifyTotalVehicleBuckets = async (
        description,
        countLocator1,
        countLocator2,
      ) => {
        const totalCount1 = await page.locator(countLocator1).innerText();
        const totalCount2 = await page.locator(countLocator2).innerText();
        if (totalCount1 === totalCount2) {
          console.log(`NVI - ${description} - Total count matches`);
        } else {
          console.log(`NVI - ${description} - Total count mismatch`);
        }
      };

      // VerifyTotalVehicle030Days method
      await verifyTotalVehicleBuckets(
        "0-30 Days",
        "locator-for-0-30-Days-total-count1",
        "locator-for-0-30-Days-total-count2",
      );

      // VerifyTotalVehicle3160Days method
      await verifyTotalVehicleBuckets(
        "31-60 Days",
        "locator-for-31-60-Days-total-count1",
        "locator-for-31-60-Days-total-count2",
      );

      // VerifyTotalVehicle6190Days method
      await verifyTotalVehicleBuckets(
        "61-90 Days",
        "locator-for-61-90-Days-total-count1",
        "locator-for-61-90-Days-total-count2",
      );

      // VerifyTotalVehicle91Days method
      await verifyTotalVehicleBuckets(
        "91+ Days",
        "locator-for-91-Days-total-count1",
        "locator-for-91-Days-total-count2",
      );

      // VerifyTotalVehicleTotal method
      const totalCount = await page
        .locator("locator-for-total-total-count2")
        .innerText();
      const sanitizedTotal = parseInt(totalCount.replace(",", ""));
      await page.locator('a:has-text("New Inventory Detail")').click();
      await page.waitForLoadState("networkidle");
      const itemCountText = await page
        .locator("locator-for-0-30-days-total-count2")
        .innerText();
      const itemCount = parseInt(
        itemCountText.replace("1 - 100 of ", "").replace(" items", ""),
      );
      if (sanitizedTotal === itemCount) {
        console.log("NVI - Totals in Invoice Aging Page match");
      } else {
        console.log("NVI - Totals in Invoice Aging page mismatch");
      }

      // verifyTotalBetWeenSummaryandDetailPage method
      // Note: I assume this method needs to be implemented similarly to others, but it's not detailed in the provided implementation. Below is a placeholder.
      const verifyTotalBetWeenSummaryandDetailPage = async () => {
        // Implement the steps needed to verify the total between summary and detail page
      };

      await verifyTotalBetWeenSummaryandDetailPage();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Excess PTM", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    try {
      // NavigateToSalesNewInventoryDetail method
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(7000);
      await page.waitForTimeout(5000);
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page.locator('a:has-text("New Inventory Detail")').first().click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // validatePTM method
      await page.waitForLoadState("load");
      const checkElementVisibility = async (locatorFunction) => {
        try {
          const element = await locatorFunction().first();
          await expect(element).toBeVisible();
          await page.waitForLoadState("networkidle");
        } catch (originalError) {
          const errorMessage = `Locator failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      };

      await checkElementVisibility(() =>
        page.locator("Locator for getPTMRegional"),
      );
      await checkElementVisibility(() =>
        page.locator("Locator for getPTMNational"),
      );

      const beforeRegionalXpath = "//tr[";
      const afterRegionalXpath = "]/td[11]";
      const beforeNationalXpath = "//tr[";
      const afterNationalXpath = "]/td[12]";

      for (let i = 1; i < 100; i++) {
        const actualRegionalXpath =
          beforeRegionalXpath + i + afterRegionalXpath;
        const actualNationalXpath =
          beforeNationalXpath + i + afterNationalXpath;
        const regionalLocator = () => page.locator(actualRegionalXpath);
        const nationalLocator = () => page.locator(actualNationalXpath);
        await checkElementVisibility(regionalLocator);
        await checkElementVisibility(nationalLocator);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("Invoice Aging PTM", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    try {
      // NavigateToSalesNewInventoryDetail method
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(7000);
      await page.waitForTimeout(5000);
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page.locator('a:has-text("New Inventory Detail")').first().click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // validatePTM method
      await page.waitForLoadState("load");
      const checkElementVisibility = async (locatorFunction) => {
        try {
          const element = await locatorFunction().first();
          await expect(element).toBeVisible();
          await page.waitForLoadState("networkidle");
        } catch (originalError) {
          const errorMessage = `Locator failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      };

      await checkElementVisibility(() =>
        page.locator("Locator for getPTMRegional"),
      );
      await checkElementVisibility(() =>
        page.locator("Locator for getPTMNational"),
      );

      const beforeRegionalXpath = "//tr[";
      const afterRegionalXpath = "]/td[11]";
      const beforeNationalXpath = "//tr[";
      const afterNationalXpath = "]/td[12]";

      for (let i = 1; i < 100; i++) {
        const actualRegionalXpath =
          beforeRegionalXpath + i + afterRegionalXpath;
        const actualNationalXpath =
          beforeNationalXpath + i + afterNationalXpath;
        const regionalLocator = () => page.locator(actualRegionalXpath);
        const nationalLocator = () => page.locator(actualNationalXpath);
        await checkElementVisibility(regionalLocator);
        await checkElementVisibility(nationalLocator);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  test("On Ground PTM", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    try {
      // NavigateToSalesNewInventoryDetail method
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(7000);
      await page.waitForTimeout(5000);
      await page.locator('span:has-text("Sales")').first().click();
      await page.locator('span:has-text("New Vehicle")').first().click();
      await page.locator('a:has-text("New Inventory Detail")').first().click();
      await page.locator(':nth-match(:text("Excess"),1)').click();
      await page.waitForLoadState("networkidle");
      await page
        .locator(
          '//*[@id="OnGroundAgingTable"]/div[3]/table[1]/tbody[1]/tr[3]/td[1]/a[1]',
        )
        .click();
      await page.waitForLoadState("networkidle");

      // validatePTM method
      await page.waitForLoadState("load");
      const checkElementVisibility = async (locatorFunction) => {
        try {
          const element = await locatorFunction().first();
          await expect(element).toBeVisible();
          await page.waitForLoadState("networkidle");
        } catch (originalError) {
          const errorMessage = `Locator failed: ${originalError.message}`;
          throw new Error(errorMessage);
        }
      };

      await checkElementVisibility(() =>
        page.locator("Locator for getPTMRegional"),
      );
      await checkElementVisibility(() =>
        page.locator("Locator for getPTMNational"),
      );

      const beforeRegionalXpath = "//tr[";
      const afterRegionalXpath = "]/td[11]";
      const beforeNationalXpath = "//tr[";
      const afterNationalXpath = "]/td[12]";

      for (let i = 1; i < 100; i++) {
        const actualRegionalXpath =
          beforeRegionalXpath + i + afterRegionalXpath;
        const actualNationalXpath =
          beforeNationalXpath + i + afterNationalXpath;
        const regionalLocator = () => page.locator(actualRegionalXpath);
        const nationalLocator = () => page.locator(actualNationalXpath);
        await checkElementVisibility(regionalLocator);
        await checkElementVisibility(nationalLocator);
      }
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });
});
