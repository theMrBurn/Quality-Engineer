import { test, expect, request } from "@playwright/test";

//test
test.describe.serial("API testing - /productOfferings @tahoeapi", () => {
  test("POST /productOfferings returns 400 and error message - POST not allowed for this endpoint", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.post(`${baseURL}/productOfferings`);
    // const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(404);
  });

  test("GET /productOfferings returns 200", async ({ request, page }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.get(`${baseURL}/productOfferings`);
    const responseBodybody = await response.json();

    console.log(JSON.stringify(responseBodybody));

    expect(response.status()).toBe(200);
  });

  test("GET /productOfferings response body includes expected attributes for Product Offerings", async ({
    request,
    page,
  }) => {
    const baseURL = "http://localhost:5000/api/";

    const response = await request.get(`${baseURL}/productOfferings`);
    const responseBody = await response.json();
    const parsedBody = JSON.parse(JSON.stringify(responseBody));
    const prettifiedJSON = JSON.stringify(parsedBody, null, 2);
    console.log(prettifiedJSON); // guarantees a readable json response in the console log

    const expectedAttributes = [
      {
        SetupID: 305,
        DtBeg: "2021-10-04T00:00:00.000Z",
        DtEnd: "2099-12-31T00:00:00.000Z",
        Prefix: "LOCD",
        STD_EXE: "STD",
        GDS: "D",
        StandardPrice: 1299,
        StandardCost: 649.5,
        Description: "Standard Diesel 2 per year",
      },
      {
        SetupID: 313,
        DtBeg: "2021-10-04T00:00:00.000Z",
        DtEnd: "2099-12-31T00:00:00.000Z",
        Prefix: "LOCD",
        STD_EXE: "SYE",
        GDS: "S",
        StandardPrice: 949,
        StandardCost: 474.5,
        Description: "Synthetic Executive 4 per year",
      },
      {
        SetupID: 314,
        DtBeg: "2021-10-04T00:00:00.000Z",
        DtEnd: "2099-12-31T00:00:00.000Z",
        Prefix: "LOCD",
        STD_EXE: "SYS",
        GDS: "S",
        StandardPrice: 749,
        StandardCost: 374.5,
        Description: "Synthetic Standard 2 per year",
      },
      {
        SetupID: 319,
        DtBeg: "2023-03-31T00:00:00.000Z",
        DtEnd: "2099-12-31T00:00:00.000Z",
        Prefix: "LOCD",
        STD_EXE: "SYS",
        GDS: "S",
        StandardPrice: 189,
        StandardCost: 94.5,
        Description: "Lease - 2 synthetic oil change",
      },
      {
        SetupID: 320,
        DtBeg: "2023-03-31T00:00:00.000Z",
        DtEnd: "2099-12-31T00:00:00.000Z",
        Prefix: "LOCD",
        STD_EXE: "SYS",
        GDS: "S",
        StandardPrice: 269,
        StandardCost: 134.5,
        Description: "Lease - 3 synthetic oil change",
      },
      {
        SetupID: 321,
        DtBeg: "2023-03-31T00:00:00.000Z",
        DtEnd: "2099-12-31T00:00:00.000Z",
        Prefix: "LOCD",
        STD_EXE: "SYS",
        GDS: "S",
        StandardPrice: 369,
        StandardCost: 184.5,
        Description: "Lease - 4 synthetic oil change",
      },
    ];

    expect(response.status()).toBe(200);

    for (const expectedItem of expectedAttributes) {
      const matchingItem = responseBody.find((item) => {
        for (const key in expectedItem) {
          if (expectedItem[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });

      expect(matchingItem).toBeTruthy();
    }
  });
});
