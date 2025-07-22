const { test, expect } = require("@playwright/test");

// Test suite for API testing - /products
test.describe.serial("API testing - /products @fiManagementAPI", () => {
  let dynamicProductId; // Variable to hold the ID of a created product

  // Negative Tests for /products
  test("GET /products returns 404 - Not Found on invalid endpoint", async ({
    request,
  }) => {
    console.log("Starting test: GET /products with invalid endpoint");

    const invalidURL = `/invalid-endpoint`;
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

    const response = await request.post(`/products`, {
      headers: { "Content-Type": "application/json" },
      data: {},
    });

    const responseBody = await response.json();
    console.log("Received response status:", response.status());
    console.table([responseBody]); // Use console.table for better visual output

    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(
      "Invalid input types or required fields are missing.",
    );
    console.log(
      "Test completed: POST /products returns 400 - Invalid product creation",
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

    console.log("Sending POST request to:", `/products`);
    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await request.post(`/products`, {
      headers: { "Content-Type": "application/json" },
      data: requestBody,
    });

    const responseBody = await response.json();
    console.log("Received response status:", response.status());
    console.table([responseBody]); // Use console.table for better visual output

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
      `/products/${dynamicProductId}`,
    );
    console.log("Verifying product existence with ID:", dynamicProductId);
    console.log(
      "Received response:",
      getProductResponse.status(),
      getProductResponse.statusText(),
    );

    expect(getProductResponse.status()).toBe(
      200,
      "Product not found after creation.",
    );
    const productBody = await getProductResponse.json();
    console.log("Product existence verification response body:");
    console.table([productBody]); // Use console.table for better visual output

    console.log(
      "Test completed: POST /products creates a product successfully",
    );
  });

  test("POST /products returns 409 - Conflict on existing product", async ({
    request,
  }) => {
    console.log("Starting test: POST /products with existing product data");

    const requestBody = {
      product: "Test Product",
      lease_type: "L",
      source_field: "FIIncome",
      sales_amount: "FIIncome",
      cost_amount: "Miscellaneous6",
      gross_amount: "",
      user_id: 123,
    };

    const response = await request.post(`/products`, {
      headers: { "Content-Type": "application/json" },
      data: requestBody,
    });

    const responseBody = await response.json();
    console.log("Received response status:", response.status());
    console.table([responseBody]); // Use console.table for better visual output

    expect(response.status()).toBe(409);
    expect(responseBody.error).toBe(
      "Product mapping already exists. No insert performed.",
    );
    console.log(
      "Test completed: POST /products returns 409 - Conflict on existing product",
    );
  });

  test("GET /products returns 200 - success", async ({ request }) => {
    console.log("Starting test: GET /products");

    const response = await request.get(`/products`);
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Response body:");
    console.table(responseBody); // Use console.table for better visual output
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
    const response = await request.get(`/products/${dynamicProductId}`);
    console.log("Received response:", response.status(), response.statusText());

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Response body:");
    console.table([responseBody]); // Use console.table for better visual output
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

    const url = `/products`; // Relative URL without baseURL

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
    console.log("Payload:", JSON.stringify(payload, null, 2));

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
    console.log("Response body:");
    console.table([responseBody]); // Use console.table for better visual output

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty(
      "message",
      expect.stringContaining("Product mapping updated successfully"),
    );
    expect(responseBody).toHaveProperty("product_mapping_id");

    console.log(
      "Test completed: PUT /products updates a product and returns 200 - success",
    );
  });

  test("DELETE /products deletes a product successfully", async ({
    request,
  }) => {
    console.log("Starting test: DELETE /products deletes a product");

    const deletePayload = {
      product_name: "Test Product",
      lease_type: "L",
      source_field: "FIIncome",
    };

    console.log("Sending DELETE request to:", `/products`);
    console.log("Request body:", JSON.stringify(deletePayload, null, 2));

    const response = await request.delete(`/products`, {
      headers: { "Content-Type": "application/json" },
      data: deletePayload,
    });

    const responseBody = await response.json();
    console.log("Received response status:", response.status());
    console.table([responseBody]); // Better visual output

    expect(response.status()).toBe(200);
    console.log("Test completed: DELETE /products deletes a product");
  });
});
