import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as http from "http";
import { AddressInfo } from "net";
import axios from "axios";
import { SpatialFlow } from "../src/client";
import { ConnectionError, RateLimitError, ServerError, TimeoutError } from "../src/errors";

const API_KEY = "sf_test_key"; // pragma: allowlist secret

type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

describe("SpatialFlow transport", () => {
  let server: http.Server;
  let baseUrl: string;
  let handler: Handler;
  let requests: string[];

  beforeEach(async () => {
    requests = [];
    server = http.createServer((req, res) => {
      requests.push(`${req.method} ${req.url}`);
      handler(req, res);
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  afterEach(async () => {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  });

  const reply = (res: http.ServerResponse, status: number, headers: Record<string, string> = {}) => {
    res.writeHead(status, { "Content-Type": "application/json", ...headers });
    res.end(JSON.stringify({ geofences: [], count: 0, total_count: 0 }));
  };

  describe("network failures", () => {
    it("rejects with TimeoutError when the API does not answer in time", async () => {
      handler = () => {};
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, timeout: 50, maxRetries: 0 });

      await expect(client.geofences.appsGeofencesApiListGeofences()).rejects.toBeInstanceOf(
        TimeoutError
      );
    });

    it("rejects with ConnectionError when the connection is refused", async () => {
      const port = (server.address() as AddressInfo).port;
      await new Promise((resolve) => server.close(resolve));
      const client = new SpatialFlow({
        apiKey: API_KEY,
        baseUrl: `http://127.0.0.1:${port}`,
        maxRetries: 0,
      });

      await expect(client.geofences.appsGeofencesApiListGeofences()).rejects.toBeInstanceOf(
        ConnectionError
      );
      server = http.createServer();
      await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    });
  });

  describe("maxRetries", () => {
    it("retries a GET after a 503 and returns the later success", async () => {
      let calls = 0;
      handler = (_req, res) => {
        calls++;
        reply(res, calls < 3 ? 503 : 200, { "Retry-After": "0" });
      };
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 3 });

      const response = await client.geofences.appsGeofencesApiListGeofences();

      expect(response.status).toBe(200);
      expect(calls).toBe(3);
    });

    it("retries a 429 and honors Retry-After", async () => {
      let calls = 0;
      handler = (_req, res) => {
        calls++;
        reply(res, calls === 1 ? 429 : 200, { "Retry-After": "0" });
      };
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 1 });

      await client.geofences.appsGeofencesApiListGeofences();

      expect(calls).toBe(2);
    });

    it("gives up after maxRetries and rejects with the last error", async () => {
      handler = (_req, res) => reply(res, 503, { "Retry-After": "0" });
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 2 });

      await expect(client.geofences.appsGeofencesApiListGeofences()).rejects.toBeInstanceOf(
        ServerError
      );
      expect(requests).toHaveLength(3);
    });

    it("does not retry when maxRetries is 0", async () => {
      handler = (_req, res) => reply(res, 429, { "Retry-After": "0" });
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 0 });

      await expect(client.geofences.appsGeofencesApiListGeofences()).rejects.toBeInstanceOf(
        RateLimitError
      );
      expect(requests).toHaveLength(1);
    });

    it("does not wait out a Retry-After longer than the backoff cap", async () => {
      handler = (_req, res) => reply(res, 429, { "Retry-After": "3600" });
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 3 });

      await expect(client.geofences.appsGeofencesApiListGeofences()).rejects.toMatchObject({
        name: "RateLimitError",
        retryAfter: 3600,
      });
      expect(requests).toHaveLength(1);
    });

    it("does not retry a client error", async () => {
      handler = (_req, res) => reply(res, 404);
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 3 });

      await expect(client.geofences.appsGeofencesApiListGeofences()).rejects.toThrow();
      expect(requests).toHaveLength(1);
    });

    it("does not retry a POST", async () => {
      handler = (_req, res) => reply(res, 503, { "Retry-After": "0" });
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 3 });

      await expect(
        client.geofences.appsGeofencesApiCreateGeofence({
          name: "x",
          geometry: { type: "Point", coordinates: [0, 0] },
        } as never)
      ).rejects.toBeInstanceOf(ServerError);
      expect(requests).toHaveLength(1);
    });
  });

  describe("caller cancellation", () => {
    const list = (client: SpatialFlow, signal: AbortSignal) =>
      client.geofences.appsGeofencesApiListGeofences(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { signal }
      );

    it("rejects with the cancellation, not a ConnectionError, when aborted mid-request", async () => {
      handler = () => {};
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 3 });
      const controller = new AbortController();
      const pending = list(client, controller.signal);
      setTimeout(() => controller.abort(), 30);

      const error = await pending.catch((e) => e);

      expect(axios.isCancel(error)).toBe(true);
      expect(requests).toHaveLength(1);
    });

    it("interrupts the retry backoff when aborted", async () => {
      handler = (_req, res) => reply(res, 503, { "Retry-After": "20" });
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl, maxRetries: 3 });
      const controller = new AbortController();
      const pending = list(client, controller.signal);
      setTimeout(() => controller.abort(), 100);

      const started = Date.now();
      const error = await pending.catch((e) => e);

      expect(axios.isCancel(error)).toBe(true);
      expect(Date.now() - started).toBeLessThan(2000);
      expect(requests).toHaveLength(1);
    });

    it("sends no request when aborted before the first attempt", async () => {
      handler = (_req, res) => reply(res, 200);
      const client = new SpatialFlow({ apiKey: API_KEY, baseUrl });
      const controller = new AbortController();
      controller.abort();

      const error = await list(client, controller.signal).catch((e) => e);

      expect(axios.isCancel(error)).toBe(true);
      expect(requests).toHaveLength(0);
    });
  });
});
