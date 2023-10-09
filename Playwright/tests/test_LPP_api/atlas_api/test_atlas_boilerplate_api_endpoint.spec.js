import { test, expect, request } from "@playwright/test";

//test
test.describe.serial("API testing - GET /plans @atlasapi", () => {
  test("GET /plans returns 200", async ({ request, page }) => {
    const baseURL = "https://test.lpp.lithia.com/atlas/api/";

    const response = await request.get(`${baseURL}/plans`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(JSON.stringify(body));
  });

  test("POST /plans returns 400 and error message - POST not allowed for this endpoint", async ({
    request,
    page,
  }) => {
    const baseURL = "https://test.lpp.lithia.com/atlas/api/";

    const response = await request.post(`${baseURL}/plans`);
    // const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(404);
  });
});
