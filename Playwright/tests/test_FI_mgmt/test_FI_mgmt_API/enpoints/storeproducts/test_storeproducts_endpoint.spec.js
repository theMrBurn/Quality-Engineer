const { test, expect } = require("@playwright/test");

// Test suite for API testing - /storeproducts
test.describe.serial("API testing - /storeproducts @fiManagementAPI", () => {
  const baseURL = process.env.BASE_URL || "http://localhost:3200";

  const companyNumber = 499; // The company number you're testing with

  // Negative Test for POST /storeproducts with invalid data
  test("POST /storeproducts returns 400 - Invalid product creation", async ({
    request,
  }) => {
    console.log("Starting test: POST /storeproducts with invalid data");

    const response = await request.post(`${baseURL}/storeproducts`, {
      headers: { "Content-Type": "application/json" },
      data: {},
    });

    const responseBody = await response.json();
    console.log("Received response status:", response.status());
    console.log("Response body:", JSON.stringify(responseBody, null, 2));

    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(
      "Invalid input types or required fields are missing.",
    );
    console.log(
      "Test completed: POST /storeproducts returns 400 - Invalid product creation",
    );
  });

  // Negative Test for GET /storeproducts/{invalidId}
  test("GET /storeproducts/{invalidId} returns 400 - Bad Request", async ({
    request,
  }) => {
    console.log("Starting test: GET /storeproducts/{invalidId}");

    const invalidId = 9999; // A non-existent ID
    const response = await request.get(`${baseURL}/storeproducts/${invalidId}`);
    console.log(
      "Received response status:",
      response.status(),
      response.statusText(),
    );

    expect(response.status()).toBe(400);
    console.log(
      "Test completed: GET /storeproducts/{invalidId} returns 400 - Bad Request",
    );
  });

  // Positive Test for POST /storeproducts (creating a new product)
  test("POST /storeproducts creates a product successfully", async ({
    request,
  }) => {
    console.log("Starting test: POST /storeproducts creates a product");

    const dynamicUserId = Math.floor(Math.random() * 10000); // Example of generating random user ID
    const payload = {
      company_number: companyNumber,
      lease_type: "P",
      product_name: "Lube Test", // Generate a unique product name
      airstream_store: "N",
      source_field: null,
      sales_amount: "FeeOption10Amount",
      cost_amount: null,
      gross_amount: null,
      user_id: dynamicUserId, // Use dynamic user ID
    };

    console.group("Request Information");
    console.log("Sending POST request to:", `${baseURL}/storeproducts`);
    console.log("Request body:", JSON.stringify(payload, null, 2));
    console.groupEnd();

    const response = await request.post(`${baseURL}/storeproducts`, {
      data: payload,
      headers: { "Content-Type": "application/json" },
    });

    const responseBody = await response.json();

    console.group("Response Information");
    console.log("Received response status:", response.status());
    console.log("Response body:", JSON.stringify(responseBody, null, 2));
    console.groupEnd();

    expect(response.status()).toBe(201);
    expect(responseBody).toHaveProperty(
      "status",
      "Store Product created successfully.",
    );

    console.log(
      "Test completed: POST /storeproducts creates a product successfully",
    );
  });

  // Test for PUT /storeproducts updates a product successfully
  test("PUT /storeproducts updates a product successfully", async ({
    request,
  }) => {
    console.log(
      "Starting test: PUT /storeproducts updates a product successfully",
    );

    const updatedProduct = {
      company_number: companyNumber,
      lease_type: "P",
      product_name: "Lube Test",
      source_field: null,
      sales_amount: "12345", // Updated field
      cost_amount: "12345", // Updated field
      gross_amount: "12345", // Updated field
    };

    console.group("Request Information");
    console.log("Sending PUT request to:", `${baseURL}/storeproducts`);
    console.log("Request body:", JSON.stringify(updatedProduct, null, 2));
    console.groupEnd();

    const response = await request.put(`${baseURL}/storeproducts`, {
      data: updatedProduct,
      headers: { "Content-Type": "application/json" },
    });

    const responseBody = await response.json();
    console.group("Response Information");
    console.log("Received response status:", response.status());
    console.log("Response body:", JSON.stringify(responseBody, null, 2));
    console.groupEnd();

    expect(response.status()).toBe(200);
    expect(responseBody.message).toContain("successfully");
    console.log(
      "Test completed: PUT /storeproducts updates a product successfully",
    );
  });

  // Test for DELETE /storeproducts deletes a product successfully
  test("DELETE /storeproducts deletes the product successfully", async ({
    request,
  }) => {
    console.log(
      "Starting test: DELETE /storeproducts deletes a product successfully",
    );

    const deletePayload = {
      company_number: companyNumber,
      lease_type: "P",
      product_name: "Lube Test",
      source_field: null,
    };

    console.group("Request Information");
    console.log("Sending DELETE request to:", `${baseURL}/storeproducts`);
    console.log("Request body:", JSON.stringify(deletePayload, null, 2));
    console.groupEnd();

    const response = await request.delete(`${baseURL}/storeproducts`, {
      data: deletePayload,
      headers: { "Content-Type": "application/json" },
    });

    const responseBody = await response.json();
    console.group("Response Information");
    console.log("Received response status:", response.status());
    console.log("Response body:", JSON.stringify(responseBody, null, 2));
    console.groupEnd();

    expect(response.status()).toBe(200);
    expect(responseBody.status).toBe("Store Product deleted successfully.");
    console.log(
      "Test completed: DELETE /storeproducts deletes the product successfully",
    );
  });
});
