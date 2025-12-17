// Payplan Dashboard

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect, devices } = require("@playwright/test");
const { PayplanDashboard } = require("./payplan_dashboard.js");

//test
test.describe.serial("Payplan /dashboard interactive tests", () => {
  test("Navigate to /Payplan/Dashboard Validate Expiration Date can be input @func", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // input Expiration Date 1
      await payplansDashboard.clickElement("expirationDateCalendar1");

      await page.getByRole("gridcell", { name: "2025" }).click();

      await payplansDashboard.clickElement("expirationDateCalendar1");

      await page
        .getByRole("gridcell", { name: "Jan" })
        .getByRole("link", { name: "Jan" })
        .click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard Validate Pay Calendar Date can be input @func", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // semi monthly
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "Semi-monthly" }).click();

      const semiMonthly = await page.innerText("text=Semi-monthly");
      expect(semiMonthly).toBe("Semi-monthly");

      // // weekly
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "Weekly", exact: true }).click();

      const weekly = await page.innerText("text=Weekly");
      expect(weekly).toBe("Weekly");

      // // bi weeky
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "Bi-Weekly" }).click();

      const biWeekly = await page.innerText("text=Bi-Weekly");
      expect(biWeekly).toBe("Bi-Weekly");

      // // calendar monthly
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "Calendar Monthly" }).click();

      const calMonthly = await page.innerText("text=Calendar Monthly");
      expect(calMonthly).toBe("Calendar Monthly");

      // // bi weekly week 1
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "BiWeekly Wk1" }).click();

      const biWeekly1 = await page.innerText("text=BiWeekly Wk1");
      expect(biWeekly1).toBe("BiWeekly Wk1");

      // // bi weekly week 2
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "BiWeekly Wk2" }).click();

      const biWeekly2 = await page.innerText("text=BiWeekly Wk2");
      expect(biWeekly2).toBe("BiWeekly Wk2");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Semi Monthly @func", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // a pay cycle needs to be input
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "Semi-monthly" }).click();

      // Simulate pressing the "Enter" key
      const keyboard = page.keyboard;
      await keyboard.press("Enter");

      // ppe date input
      await payplansDashboard.clickElement("ppeDateDropdownTriangle");
      await page.getByRole("option", { name: "7/31/2024" }).click();

      const semiMonthly = await page.innerText("text=Semi-monthly");
      expect(semiMonthly).toBe("Semi-monthly");
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Weekly @func", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // a pay cycle needs to be input
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page.getByRole("option", { name: "Weekly", exact: true }).click();

      const weekly = await page.innerText("text=Weekly");
      expect(weekly).toBe("Weekly");

      // ppe date input
      await payplansDashboard.clickElement("ppeDateDropdownTriangle");
      await page.getByRole("option", { name: "/25/2024" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Bi-Weekly @func", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // a pay cycle needs to be input
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page
        .getByRole("option", { name: "Bi-Weekly", exact: true })
        .click();

      const biWeekly = await page.innerText("text=Bi-Weekly");
      expect(biWeekly).toBe("Bi-Weekly");

      // ppe date input
      await payplansDashboard.clickElement("ppeDateDropdownTriangle");
      await page.getByRole("option", { name: "1/20/" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Bi-Weekly Wk1 @func", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // a pay cycle needs to be input
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page
        .getByRole("option", { name: "BiWeekly Wk1", exact: true })
        .click();

      const biWeekly1 = await page.innerText("text=BiWeekly Wk1");
      expect(biWeekly1).toBe("BiWeekly Wk1");

      // ppe date input
      await payplansDashboard.clickElement("ppeDateDropdownTriangle");
      await page.getByRole("option", { name: "1/27/" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard validate PPE Date dropdown functionality, Bi-Weekly Wk2 @func", async ({
    browser,
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // a pay cycle needs to be input
      await payplansDashboard.clickElement("payCallendarDropTriangle");
      await page
        .getByRole("option", { name: "BiWeekly Wk2", exact: true })
        .click();

      const biWeekly2 = await page.innerText("text=BiWeekly Wk2");
      expect(biWeekly2).toBe("BiWeekly Wk2");

      // ppe date input
      await payplansDashboard.clickElement("ppeDateDropdownTriangle");
      await page.getByRole("option", { name: "1/20/" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard Validate Expiration Date2 can be input @func", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // input Expiration Date 2

      await payplansDashboard.clickElement("expirationDateCalendar1");
      await page.getByRole("gridcell", { name: "2025" }).click();

      await payplansDashboard.clickElement("expirationDateCalendar2");

      await page
        .getByRole("gridcell", { name: "Jan" })
        .getByRole("link", { name: "Jan" })
        .click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });

  test("Navigate to /Payplan/Dashboard Validate Effective Date can be input @func", async ({
    page,
  }) => {
    const payplansDashboard = new PayplanDashboard(page);
    await payplansDashboard.goto();

    try {
      // input Effective Date
      await payplansDashboard.clickElement("effectiveDateCalendar");
      await page.getByRole("button", { name: "Previous" }).click();
      await page.getByRole("link", { name: "Feb" }).click();
    } catch (error) {
      console.error("Error during test:", error.message);
      throw new Error("Test failed.", error.message);
    }
  });
});
