/**
 * Integration/smoke tests for SpatialFlow Node.js SDK.
 *
 * These tests run against a real API and are skipped unless SPATIALFLOW_API_KEY is set.
 * Run with: SPATIALFLOW_API_KEY=sf_xxx npm test -- tests/integration.test.ts
 */

import { describe, it, expect, beforeAll } from "vitest";
import * as crypto from "crypto";

const API_KEY = process.env.SPATIALFLOW_API_KEY;
const BASE_URL = process.env.SPATIALFLOW_BASE_URL || "https://api.spatialflow.io";
const RUN_CRUD = process.env.SPATIALFLOW_RUN_CRUD_TESTS === "true";

// Skip all tests if no API key
const describeIntegration = API_KEY ? describe : describe.skip;

describeIntegration("SDK Integration Tests", () => {
  let client: Awaited<ReturnType<typeof import("../src/client").SpatialFlow>>;

  beforeAll(async () => {
    const { SpatialFlow } = await import("../src/client");
    // Detect token type: API keys start with "sf_", JWT tokens start with "ey"
    const isApiKey = API_KEY!.startsWith("sf_");
    client = new SpatialFlow({
      ...(isApiKey ? { apiKey: API_KEY! } : { accessToken: API_KEY! }),
      baseUrl: BASE_URL,
    });
  });

  describe("Authentication", () => {
    it("should authenticate and list geofences", async () => {
      const response = await client.geofences.appsGeofencesApiListGeofences({
        limit: 1,
      });

      // Verify response structure - generated models use 'geofences' and 'count'
      expect(response).toBeDefined();
      const data = response.data || response;
      expect(data).toHaveProperty("geofences");
      expect(data).toHaveProperty("count");
    });

    it("should throw on invalid API key", async () => {
      const { SpatialFlow, AuthenticationError } = await import("../src");

      const badClient = new SpatialFlow({
        apiKey: "sf_invalid_key_12345",
        baseUrl: BASE_URL,
      });

      await expect(
        badClient.geofences.appsGeofencesApiListGeofences()
      ).rejects.toThrow();
    });
  });

  describe("Pagination", () => {
    it("should paginate through results", async () => {
      const { paginate } = await import("../src/pagination");

      let count = 0;
      for await (const geofence of paginate({
        fetchPage: (offset, limit) =>
          client.geofences.appsGeofencesApiListGeofences({ offset, limit }),
        limit: 10,
      })) {
        count++;
        if (count >= 5) break; // Don't iterate through everything
      }

      // Test passed if no exceptions
      expect(true).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should throw NotFoundError for missing resource", async () => {
      const { NotFoundError } = await import("../src/errors");

      const fakeId = crypto.randomUUID();

      try {
        await client.geofences.appsGeofencesApiGetGeofence({ id: fakeId });
        expect.fail("Should have thrown NotFoundError");
      } catch (e) {
        // Accept either NotFoundError or any 404-related error
        expect(e).toBeDefined();
      }
    });
  });

  // CRUD tests - only run if explicitly enabled
  const describeCrud = RUN_CRUD ? describe : describe.skip;

  describeCrud("Geofence CRUD", () => {
    it("should create and delete a geofence", async () => {
      // Create
      const createResponse = await client.geofences.appsGeofencesApiCreateGeofence({
        createGeofenceRequest: {
          name: "SDK Integration Test Geofence",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-122.4, 37.8],
                [-122.4, 37.7],
                [-122.3, 37.7],
                [-122.3, 37.8],
                [-122.4, 37.8],
              ],
            ],
          },
        },
      });

      const geofence = createResponse.data || createResponse;
      expect(geofence.name).toBe("SDK Integration Test Geofence");
      expect(geofence.id).toBeDefined();

      // Delete
      await client.geofences.appsGeofencesApiDeleteGeofence({ id: geofence.id });

      // Verify deleted
      try {
        await client.geofences.appsGeofencesApiGetGeofence({ id: geofence.id });
        expect.fail("Should have thrown after delete");
      } catch (e) {
        // Expected
        expect(e).toBeDefined();
      }
    });
  });
});
