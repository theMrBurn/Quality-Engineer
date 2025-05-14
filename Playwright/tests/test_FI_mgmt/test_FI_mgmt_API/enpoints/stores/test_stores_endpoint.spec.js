// Test suite for API testing - /products
const { test, expect } = require("@playwright/test");

// Test suite for API testing - /store
test.describe.serial("API testing - /store Endpoint @fiManagementAPI", () => {
  const baseURL = process.env.BASE_URL || "http://localhost:3200";

  // Positive Test for /store
  test("GET /stores returns 200 - success", async ({ request }) => {
    console.log("Starting test: GET /stores");

    const companyNumber = "235"; // The company number you're testing with
    const url = `http://localhost:3200/stores/`;

    const response = await request.get(url);
    console.log("Received response:", response.status(), response.statusText());

    // Expect the response status to be 200 (success)
    expect(response.status()).toBe(200);

    // Parse the response body
    const responseBody = await response.json();
    console.log("Response body:");
    console.table(responseBody); // Use console.table for better visual output

    // Since the response body is an array of products, validate the array directly
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0); // Ensure that there are products returned

    // Validate properties for each product in the response
    responseBody.forEach((product) => {
      expect(product).toHaveProperty("STORE_NUMBER");
      expect(product).toHaveProperty("STORE_NAME");
      expect(product).toHaveProperty("ADDRESS");
      expect(product).toHaveProperty("CITY");
      expect(product).toHaveProperty("STATE");
      expect(product).toHaveProperty("ZIP");

      //   // Add more assertions based on your requirements
    });

    console.log("Test completed: GET /store returns 200 - success");
  });
});
