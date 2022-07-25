// Performance Dashboard - Main Store

// POMs have to live in the same directory as the test, for now
// we will paramaterize the storageState with other .json for each userLogin, if necessary

// dependancies
const { test, expect } = require("@playwright/test");
const { MainStoreLogin } = require("./main_store_login.js");

test.describe.serial("/login_spe", () => {
    test("login to SPE", async ({
        browser,
        page,
     }) => {
       const mainStoreLogin = new MainStoreLogin(page);
       await mainStoreLogin.goto();
       await mainStoreLogin.login();
       await mainStoreLogin.twostepauthlogin();
    });
});
