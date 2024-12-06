// dependancies
const { test, expect } = require("@playwright/test");
const { gvp } = require("./gvp_material.js");
// user to be implemented in future, hence commenting it until future implementation.
//test.use({ storageState: "helpers/spe_auth_testenv.json" });

//test
test.describe.serial("/GVP_materials_prod", () => {
  test.fixme(" This test is a functional test");
  test("GVP Material", async function ({ browser, page }) {
    test.setTimeout(600000);
    const GVP = new gvp(page);
    // We can use these two methods in case if the storage state doesnt work
    await GVP.goto();
    await GVP.login();
    await GVP.twostepauthlogin();
    await GVP.Validate();
  });
});
