import { readFileSync } from "fs";
import { join } from "path";
import { describe, it, expect } from "vitest";
import { SpatialFlow, VERSION } from "../src/client";

const packageVersion = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf-8")
).version;

describe("SDK version", () => {
  it("matches package.json", () => {
    expect(VERSION).toBe(packageVersion);
  });

  it("is sent in the User-Agent header", () => {
    const client = new SpatialFlow({ apiKey: "sf_test" }); // pragma: allowlist secret
    const axiosInstance = (client as unknown as {
      axiosInstance: { defaults: { headers: Record<string, string> } };
    }).axiosInstance;
    expect(axiosInstance.defaults.headers["User-Agent"]).toBe(
      `spatialflow-node/${packageVersion}`
    );
  });
});
