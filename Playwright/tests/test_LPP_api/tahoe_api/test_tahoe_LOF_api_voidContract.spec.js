import { test, expect, request } from "@playwright/test";

//test
test.describe.serial("API testing - /voidContract @tahoeapi", () => {
  test("GET /voidContract returns 400 and error message - GET not allowed for this endpoint", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.get(`${baseURL}/voidContract`);

    expect(response.status()).toBe(404);
  });

  test("POST /voidContract returns 400 and error message - POST not allowed for this endpoint", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.post(`${baseURL}/voidContract`);

    expect(response.status()).toBe(404);
  });

  test("PATCH /voidContract returns 409 when duplicate vin/store combo entered", async ({
    request,
    page,
  }) => {
    test.skip("need CRUDable test fixtures in DB");
    const baseURL = "http://localhost:5000/api/";

    const response = await request.patch(`${baseURL}/voidContract`);
    const responseBody = await response.json();
    const parsedBody = JSON.parse(JSON.stringify(responseBody));
    const prettifiedJSON = JSON.stringify(parsedBody, null, 2);
    console.log(prettifiedJSON); // guarantees a readable json response in the console log

    const expectedAttributes = [
      {
        vin: "123412345678xyz", // string
        store: 555, //number
      },
    ];

    expect(response.status()).toBe(409);
  });

  test("PATCH /voidContract returns 200 when void request secussfull", async ({
    request,
    page,
  }) => {
    test.skip("need CRUDable test fixtures in DB");
    const baseURL = "http://localhost:5000/api/";

    const response = await request.patch(`${baseURL}/voidContract`);
    const responseBody = await response.json();
    const parsedBody = JSON.parse(JSON.stringify(responseBody));
    const prettifiedJSON = JSON.stringify(parsedBody, null, 2);
    console.log(prettifiedJSON); // guarantees a readable json response in the console log

    const expectedAttributes = [
      {
        vin: "", // string
        store: 0, //number
      },
    ];

    expect(response.status()).toBe(200);
  });
});
