import { test, expect, request } from "@playwright/test";

//test
test.describe.serial("API testing - /contractPDF @tahoeapi", () => {
  test("GET /contractPDF returns 404 - GET NOT ALLOWED", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.get(`${baseURL}/contractPDF`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    expect(response.status()).toBe(404);
  });

  test("POST /contractPDF response 400 - PDF not created, missing key attributes", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.post(`${baseURL}/contractPDF`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(
      "SchemaValidationError: Invalid request body."
    );
  });

  test("POST /contractPDF response 201 - PDF created as expected", async ({
    request,
    page,
  }) => {
    test.skip("need CRUDable test fixtures in DB");
    const baseURL = "http://localhost:5000/api/";

    const response = await request.post(`${baseURL}/contractPDF`, {
      requestBody: {
        customerFirstName: {},
        customerLastName: {},
        customerAddress: {},
        customerCity: {},
        customerState: {},
        customerZip: {},
        customerPhone: {},
        vehicleYear: {},
        vehicleMake: {},
        vehicleModel: {},
        VIN: {},
        saleDate: {},
        leaseTerminationDate: {},
        mileage: {},
        sellerDealership: {},
        sellerAddress: {},
        sellerPhone: {},
        lienholder: {},
        lienholderAddress: {},
        product: {},
      },
    });
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    expect(response.status()).toBe(201);
  });
});
