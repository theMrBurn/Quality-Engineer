import { test, expect } from "@playwright/test";
import { PD20MainPage } from "./dev_pd20_main_page";

test.describe.serial("Performance Dashboard 2.0 - Main Page", () => {
    test("Performance Dashboard - Main Page rendering", async ({ page }) => {

        const pd20MainPage = new PD20MainPage(page);

        // Navigate to the main page of Performance Dashboard 2.0
        await pd20MainPage.goto();
    });
});