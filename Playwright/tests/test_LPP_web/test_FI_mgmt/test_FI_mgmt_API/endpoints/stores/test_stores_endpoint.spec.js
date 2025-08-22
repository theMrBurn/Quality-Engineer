const { test, expect } = require("@playwright/test");

test.describe.serial("API testing - /store Endpoint @fiManagementAPI", () => {
  test("GET /stores returns 200 - success", async ({ request }) => {
    console.log("Starting test: GET /stores");

    // Using relative URL so Playwright will prepend baseURL from config automatically
    const response = await request.get("/stores");
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Response body:");
    console.table(responseBody);

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    responseBody.forEach((product) => {
      expect(product).toHaveProperty("STORE_NUMBER");
      expect(product).toHaveProperty("STORE_NAME");
      expect(product).toHaveProperty("ADDRESS");
      expect(product).toHaveProperty("CITY");
      expect(product).toHaveProperty("STATE");
      expect(product).toHaveProperty("ZIP");
    });

    console.log("Test completed: GET /stores returns 200 - success");
  });
});
