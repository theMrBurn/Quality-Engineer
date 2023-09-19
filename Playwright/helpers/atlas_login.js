import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/atlas/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Sign In" }).click();
  const page1 = await page1Promise;
  await page1.getByLabel("someone@example.com").fill("seangoiburn@lithia.com");
  await page1.getByLabel("someone@example.com").press("Enter");
  await page1.locator("#i0118").fill("Melvinsarmy@1");
  await page1.locator("#i0118").press("Enter");
  await page1.goto("https://login.microsoftonline.com/common/SAS/ProcessAuth");
  await page1.getByText("Don't show this again").click();
  await page1.getByRole("button", { name: "Yes" }).click();
});
