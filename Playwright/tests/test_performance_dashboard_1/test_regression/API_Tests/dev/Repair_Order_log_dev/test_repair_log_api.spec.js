const { test, expect } = require("@playwright/test");
const { ROL } = require("./repair_log_api.js");
//test
test.describe.serial("/Repair_Order_log_prod", () => {
  
     test("Navigate to Service Menu-Repair Order Log report API tests", async function ({
      browser, 
      page,
    }) {
      test.setTimeout(600000);
      const rol = new ROL(page);
      await rol.goto();
      await rol.login();
      await rol.twostepauthlogin();
      await rol.goto();
      await rol.ValidateAPIResponseROLReport();
      await rol.ValidateAPiResponseDetailForAStore();
    });
});
