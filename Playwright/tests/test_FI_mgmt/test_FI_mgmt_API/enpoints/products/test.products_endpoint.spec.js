import { test, expect, request } from "@playwright/test";

// Test suite for API testing - /products
test.describe.serial("API testing - /products @fiManagementAPI", () => {
  const baseURL = process.env.BASE_URL || "http://localhost:3200";
  let dynamicProductId; // Variable to hold the ID of a created product

  // Negative Tests for /products
  test("GET /products returns 404 - Not Found on invalid endpoint", async ({
    request,
  }) => {
    console.log("Starting test: GET /products with invalid endpoint");

    const invalidURL = `${baseURL}/invalid-endpoint`;
    const response = await request.get(invalidURL);
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(404);
    console.log(
      "Test completed: GET /invalid-endpoint returns 404 - Not Found",
    );
  });

  test("POST /products returns 400 - Invalid product creation", async ({
    request,
  }) => {
    console.log("Starting test: POST /products with invalid data");

    const response = await request.post(`${baseURL}/products`, {
      headers: { "Content-Type": "application/json" },
      data: {},
    });

    const responseBody = await response.json();
    console.log("Received response:", response.status(), responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(
      "Invalid input types or required fields are missing.",
    );
    console.log(
      "Test completed: POST /products returns 400 - Invalid product creation",
    );
  });

  test("POST /products returns 409 - Conflict on existing product", async ({
    request,
  }) => {
    console.log("Starting test: POST /products with existing product data");

    const requestBody = {
      product: "Test Product", // Replace with a known existing product
      lease_type: "L",
      source_field: "FIIncome",
      sales_amount: "FIIncome",
      cost_amount: "Miscellaneous6",
      gross_amount: "",
      user_id: 123,
    };

    const response = await request.post(`${baseURL}/products`, {
      headers: { "Content-Type": "application/json" },
      data: requestBody,
    });

    const responseBody = await response.json();
    console.log("Received response:", response.status(), responseBody);

    expect(response.status()).toBe(409);
    expect(responseBody.error).toBe(
      "Product mapping already exists. No insert performed.",
    );
    console.log(
      "Test completed: POST /products returns 409 - Conflict on existing product",
    );
  });

  test("POST /products creates a product successfully", async ({ request }) => {
    console.log("Starting test: POST /products creates a product");

    const uniqueUserId = Math.floor(Math.random() * 10000);
    const requestBody = {
      product: `Test Product ${Date.now()}`,
      lease_type: "L",
      source_field: "FIIncome",
      sales_amount: "500",
      cost_amount: "300",
      gross_amount: "200",
      user_id: uniqueUserId,
    };

    console.log("Sending POST request to:", `${baseURL}/products`);
    console.log("Request body:", JSON.stringify(requestBody));

    const response = await request.post(`${baseURL}/products`, {
      headers: { "Content-Type": "application/json" },
      data: requestBody,
    });

    const responseBody = await response.json();
    console.log("Received response:", response.status(), responseBody);

    expect(response.status()).toBe(201);
    expect(responseBody).toHaveProperty(
      "message",
      expect.stringContaining("Product successfully added where ID="),
    );
    expect(responseBody).toHaveProperty("product_mapping_id");

    // Store the new product ID for future use
    dynamicProductId = responseBody.product_mapping_id;
    console.log("Created product with ID:", dynamicProductId);

    // Immediate verification of product existence
    const getProductResponse = await request.get(
      `${baseURL}/products/${dynamicProductId}`,
    );
    console.log("Verifying product existence with ID:", dynamicProductId);
    expect(getProductResponse.status()).toBe(
      200,
      "Product not found after creation.",
    );

    console.log(
      "Test completed: POST /products creates a product successfully",
    );
  });

  test("GET /products returns 200 - success", async ({ request }) => {
    console.log("Starting test: GET /products");

    const response = await request.get(`${baseURL}/products`);
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThan(0);

    console.log("Verifying structure of the first product...");
    const product = responseBody[0];
    expect(product).toHaveProperty("NAME");
    expect(product).toHaveProperty("FI_COLUMN_ID");
    expect(product).toHaveProperty("CATEGORY");
    expect(product).toHaveProperty("SALES_AMOUNT");
    expect(product).toHaveProperty("COST_AMOUNT");
    expect(product).toHaveProperty("GROSS_AMOUNT");

    console.log("First product structure validated successfully.");
    console.log("Test completed: GET /products returns 200 - success");
  });

  test("GET /products/{productId} returns 200 - success", async ({
    request,
  }) => {
    console.log("Starting test: GET /products/{productId}");

    expect(dynamicProductId).toBeDefined(); // Ensure dynamic ID was set
    const response = await request.get(
      `${baseURL}/products/${dynamicProductId}`,
    );
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("PRODUCT_MAPPING_ID", dynamicProductId);
    expect(responseBody).toHaveProperty("NAME");

    console.log(
      "Test completed: GET /products/{productId} returns 200 - success",
    );
  });

  test("PUT /products updates a product and returns 200 - success", async ({
    request,
  }) => {
    console.log("Starting test: PUT /products");

    const url = `${baseURL}/products`; // Keeping the endpoint as specified

    // Define the payload for the PUT request
    const payload = {
      product: "Test Product",
      lease_type: "L",
      source_field: "FIIncome",
      sales_amount: "Miscellaneous6",
      cost_amount: "Miscellaneous6",
      gross_amount: "Miscellaneous6",
      user_id: 234,
    };

    console.log("Sending PUT request to:", url);
    console.log("Payload:", JSON.stringify(payload));

    // Make the PUT request
    const response = await request.put(url, {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });

    // Check if the response status is 200
    console.log("Received response status:", response.status());
    const responseBody = await response.json();
    console.log("Response body:", JSON.stringify(responseBody));

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty(
      "message",
      expect.stringContaining("Product mapping updated successfully"),
    ); // Adjusting expectation to match the response message format
    expect(responseBody).toHaveProperty("product_mapping_id"); // Assuming the ID is returned in the response

    console.log(
      "Test completed: PUT /products updates a product and returns 200 - success",
    );
  });

  // Negative Tests for /products/{id}
  test("GET /products/{invalidId} returns 404 - Not Found", async ({
    request,
  }) => {
    console.log("Starting test: GET /products/{invalidId}");

    const invalidId = 999; // A non-existent ID
    const response = await request.get(`${baseURL}/products/${invalidId}`);
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(404);
    console.log(
      "Test completed: GET /products/{invalidId} returns 404 - Not Found",
    );
  });

  // Positive Tests for /products/{id}
  test("GET /products/{validId} returns 200 - success", async ({ request }) => {
    console.log("Starting test: GET /products/{validId}");

    expect(dynamicProductId).toBeDefined(); // Ensure dynamic ID was set
    const response = await request.get(
      `${baseURL}/products/${dynamicProductId}`,
    );
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("PRODUCT_MAPPING_ID", dynamicProductId);
    expect(responseBody).toHaveProperty("NAME");

    console.log(
      "Test completed: GET /products/{validId} returns 200 - success",
    );
  });
});
