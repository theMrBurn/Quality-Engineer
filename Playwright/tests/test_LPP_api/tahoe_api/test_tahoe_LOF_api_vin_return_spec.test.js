import { test, expect } from "@playwright/test";

const normalizeDate = require("../../../helpers/utils/normalizeDate");
const fetchWithLogging = require("../../../helpers/utils/fetchWithLogging");

test.describe
  .serial("API testing - GET /productOfferings @localhost:5000/api", () => {
  const vinByClass = {
    class1: "2C4RC1BG9NR133450",
    class2: "1C6RR7GT1HS818284",
    class3: "1G6DB5RK2M0145899",
  };

  const expectedTiers = {
    class1: [
      {
        SetupID: 331,
        DtBeg: "2025-07-01T00:00:00.000Z",
        DtEnd: "2099-12-31T00:00:00.000Z",
        Description: "Class 1 Pre-Pay 2 Synthetic Oil Changes",
        StandardPrice: 189.0,
        StandardCost: 94.5,
      },
      {
        SetupID: 332,
        Description: "Class 1 Pre-Pay 3 Synthetic Oil Changes",
      },
      {
        SetupID: 333,
        Description: "Class 1 Pre-Pay 4 Synthetic Oil Changes",
      },
    ],
    class2: [
      {
        SetupID: 334,
        Description: "Class 2 Pre-Pay 2 Synthetic Oil Changes",
      },
      {
        SetupID: 335,
        Description: "Class 2 Pre-Pay 3 Synthetic Oil Changes",
      },
      {
        SetupID: 336,
        Description: "Class 2 Pre-Pay 4 Synthetic Oil Changes",
      },
    ],
    class3: [
      {
        SetupID: 337,
        Description: "Class 3 Pre-Pay 2 Synthetic Oil Changes",
      },
      {
        SetupID: 338,
        Description: "Class 3 Pre-Pay 3 Synthetic Oil Changes",
      },
      {
        SetupID: 339,
        Description: "Class 3 Pre-Pay 4 Synthetic Oil Changes",
      },
    ],
  };

  Object.entries(vinByClass).forEach(([className, vin]) => {
    test(`GET /productOfferings returns correct tiers for VIN (${className})`, async ({
      request,
    }) => {
      try {
        const response = await fetchWithLogging(
          request,
          `/api/productOfferings?vin=${vin}`,
        );

        expect(response.status()).toBe(200);
        const body = await response.json();

        const lofProducts = body.lof;
        expect(Array.isArray(lofProducts)).toBe(true);
        expect(lofProducts.length).toBeGreaterThan(0);

        expectedTiers[className].forEach((expected) => {
          const found = lofProducts.find(
            (p) =>
              p.SetupID === expected.SetupID &&
              p.Description === expected.Description,
          );
          expect(found).toBeDefined();

          if (found) {
            if (expected.StandardPrice !== undefined) {
              expect(found.StandardPrice).toBe(expected.StandardPrice);
            }
            if (expected.StandardCost !== undefined) {
              expect(found.StandardCost).toBe(expected.StandardCost);
            }
            if (expected.DtBeg !== undefined) {
              expect(normalizeDate(found.DtBeg)).toBe(
                normalizeDate(expected.DtBeg),
              );
            }
            if (expected.DtEnd !== undefined) {
              expect(normalizeDate(found.DtEnd)).toBe(
                normalizeDate(expected.DtEnd),
              );
            }
          }
        });
      } catch (error) {
        console.error("Error during test:", error.message);
        throw new Error(`Test failed with error: ${error.message}`);
      }
    });
  });
});
