// // Payroll Regular

// // dependancies
// import { test, expect } from "@playwright/test";
// const { PayrollRegular } = require("../payroll_regular/payroll_regular.js");

// //test
// test.describe("End to End - Run a Manual Payroll for Semi Monthly occurance  @e2e", () => {
//   test("Use Existing Completed payroll to Uncomplete add Bonus and Complete a Semi Monthly Payroll", async ({
//     page,
//   }) => {
//     test.fixme("this will fail until the Unlock click action is operational");
//     const payrollRegular = new PayrollRegular(page);

//     await payrollRegular.goto();

//     await payrollRegular.clickPayrollGroupListDropdown();
//     await page.getByRole("option", { name: "Medford Toyota (L0006)" }).click();
//     await payrollRegular.clickPPEDateDropdownTriangle();
//     await page.getByRole("option", { name: "10/15/2022" }).click();

//     await payrollRegular.clickUncompletePayroll();
//   });

//   test("Navigate to Store Input tab and enter Company (Medford Toyota (L0006)), and PPE Date (10/15/2022) and click Unlock button", async ({
//     page,
//   }) => {
//     const payrollRegular = new PayrollRegular(page);
//     await payrollRegular.goto();

//     await page.getByRole("link", { name: "Store Input" }).click();
//     await page.getByRole("button", { name: "select" }).first().click();
//     await page.getByRole("option", { name: "Medford Toyota (L0006)" }).click();
//     await page.getByRole("button", { name: "select" }).nth(1).click();
//     await page.getByRole("option", { name: "10/15/2022" }).click();

//     const unlockButton = page.getByRole("button", { name: " Unlock" });
//     {
//       if (await unlockButton.isVisible()) await unlockButton.click();
//       else console.error("Unlock Button Not Found");
//       await page.close();
//     }
//   });

//   test("Navigate to Store Input tab, add new Adjustment", async ({ page }) => {
//     const payrollRegular = new PayrollRegular(page);
//     await payrollRegular.goto();
//     await page.getByRole("link", { name: "Store Input" }).click();
//     await page.getByRole("button", { name: "select" }).first().click();
//     await page.getByRole("option", { name: "Medford Toyota (L0006)" }).click();
//     await page.getByRole("button", { name: "select" }).nth(1).click();
//     await page.getByRole("option", { name: "10/15/2022" }).click();

//     const unlockButton = page.getByRole("button", { name: " Unlock" });
//     {
//       if (await unlockButton.isVisible()) await unlockButton.click();
//       else console.error("Unlock Button Not Found");

//       const submitButton = page.getByRole("button", {
//         name: " Submit",
//       });
//       if (await submitButton.isVisible()) await submitButton.click();
//       else console.error("Submit Button Not found");
//       await page.close(test.fail("if Payroll Not Unlocked test should fail"));

//       {
//         await page.getByRole("link", { name: "Store Input" }).click();
//         await page.getByRole("button", { name: " Add Store Input" }).click();
//         await page
//           .getByRole("option", { name: "Stephen Philips (569)" })
//           .click();
//         await page
//           .getByRole("gridcell", { name: "-- Select One -- select" })
//           .getByRole("button", { name: "select" })
//           .click();
//         await page
//           .getByRole("option", { name: "Bonus - Non Pay Plan Bonus - BN1" })
//           .click();
//         await page.locator("#AdjustedValue").fill("5555");
//         await page.getByRole("button", { name: " Submit" }).click();
//         await expect(
//           page.getByText("Store input created successfully (1)").tobevisible()
//         );
//       }
//     }
//   });

//   test("Navigate back to Payroll/Regular and Run the Payroll", async ({
//     page,
//   }) => {
//     const payrollRegular = new PayrollRegular(page);
//     await payrollRegular.goto();

//     await page.getByRole("link", { name: "Payroll Home" }).click();
//     await payrollRegular.clickPayrollGroupListDropdown();
//     await page.getByRole("option", { name: "Medford Toyota (L0006)" }).click();
//     await payrollRegular.clickPPEDateDropdownTriangle();
//     await page.getByRole("option", { name: "10/15/2022" }).click();

//     const runPayroll = page.locator('//*[@id="PayrollGrid"]/table/tbody/tr/td[18]/a/text()');
//     {
//       if (await runPayroll.isVisible()) await runPayroll.click();
//       else console.error("Run Payroll Button Not Found");
//       //await page.close();

//       //confirm running payroll and once finished, validate Success Message
//       await expect(
//         page.getByRole("heading", { name: "Running Payroll" })
//       ).toBeVisible();
//       await payrollRegular.getPayrollSuccessMessage();

//       // end the test here until we can get Uncomplete working

//       //if successful click Register Review checkbox and Complete button
//       // await page
//       //   .locator("#PayrollGrid > table > tbody > tr > td:nth-child(21)")
//       //   .click();
//       // //await payrollRegular.clickCompleteButton();
//       // await expect(
//       //   page
//       //     .getByRole("gridcell", { name: " Complete" })
//       //     .getByText("Complete"),
//       //   "Complete Button is not found".toBeVisible()
//       // );

//       //lastly, Uncomplete should be available again - cant use this until we get data-test-id tags
//       //await page.getByText("Uncomplete").toBeVisible();
//     }
//   });
// });
