import { test, expect, request } from "@playwright/test";

// user
test.use({ storageState: "Playwright/helpers/test_DenaliLPP_superUser.json" });

//test
test.describe.serial("API testing - /approveContract @tahoeapi", () => {
  test("GET /approveContract returns 404 - GET NOT ALLOWED", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.get(`${baseURL}/approveContract`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    expect(response.status()).toBe(404);
  });

  test("POST /approveContract response 400 - Contract not approved, missing key attributes", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.patch(`${baseURL}/approveContract`);
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(
      "SchemaValidationError: Invalid request body."
    );
  });

  test("POST /contractPDF response 204 - the contract has been approved", async ({
    request,
    page,
  }) => {
    test.skip("need CRUDable test fixtures in DB");
    const baseURL = "http://localhost:5000/api/";

    const response = await request.patch(`${baseURL}/approveContract`, {
      requestBody: {
        ContractNum: {}, // integer
        STD_EXE: {}, // string
        GDS: {}, // string
        StandardPrice: {}, // number
      },
    });
    const responseBody = await response.json();
    console.log(JSON.stringify(responseBody));

    expect(response.status()).toBe(204); // 204 is approval of a PATCH request
  });
});
