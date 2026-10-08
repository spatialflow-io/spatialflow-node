/**
 * Tests for file upload helpers.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { uploadGeofences, UploadGeofencesOptions } from "../src/uploads";

describe("uploadGeofences", () => {
  let tempDir: string;
  let testFilePath: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sdk-test-"));
    testFilePath = path.join(tempDir, "test.geojson");
    fs.writeFileSync(
      testFilePath,
      JSON.stringify({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { name: "Test" },
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
        ],
      })
    );
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFilePath);
      fs.rmdirSync(tempDir);
    } catch {
      // Ignore cleanup errors
    }
  });

  describe("validation", () => {
    it("should throw on missing file", async () => {
      const mockClient = {
        storage: {
          appsStorageApiCreatePresignedUrl: vi.fn(),
        },
        geofences: {
          appsGeofencesApiUploadGeofencesAsync: vi.fn(),
          appsGeofencesApiGetUploadJobStatus: vi.fn(),
        },
      };

      await expect(
        uploadGeofences({
          client: mockClient as unknown as UploadGeofencesOptions["client"],
          filePath: "/nonexistent/file.geojson",
        })
      ).rejects.toThrow("File not found");
    });

    it("should throw on unsupported file type", async () => {
      const txtPath = path.join(tempDir, "test.txt");
      fs.writeFileSync(txtPath, "test content");

      const mockClient = {
        storage: {
          appsStorageApiCreatePresignedUrl: vi.fn(),
        },
        geofences: {
          appsGeofencesApiUploadGeofencesAsync: vi.fn(),
          appsGeofencesApiGetUploadJobStatus: vi.fn(),
        },
      };

      await expect(
        uploadGeofences({
          client: mockClient as unknown as UploadGeofencesOptions["client"],
          filePath: txtPath,
        })
      ).rejects.toThrow("Unsupported file type");

      fs.unlinkSync(txtPath);
    });

    it("should accept supported file types", async () => {
      const extensions = [".geojson", ".json", ".kml", ".gpx"];

      for (const ext of extensions) {
        const filePath = path.join(tempDir, `test${ext}`);
        fs.writeFileSync(filePath, '{"type": "FeatureCollection"}');

        const mockClient = {
          storage: {
            appsStorageApiCreatePresignedUrl: vi.fn().mockRejectedValue(
              new Error("API call made - file type accepted")
            ),
          },
          geofences: {
            appsGeofencesApiUploadGeofencesAsync: vi.fn(),
            appsGeofencesApiGetUploadJobStatus: vi.fn(),
          },
        };

        await expect(
          uploadGeofences({
            client: mockClient as unknown as UploadGeofencesOptions["client"],
            filePath,
          })
        ).rejects.toThrow("API call made");

        fs.unlinkSync(filePath);
      }
    });
  });

  describe("upload flow", () => {
    it("should throw when presigned URL is missing", async () => {
      const mockClient = {
        storage: {
          appsStorageApiCreatePresignedUrl: vi.fn().mockResolvedValue({
            file_id: "file-123",
            // Missing upload_url
          }),
        },
        geofences: {
          appsGeofencesApiUploadGeofencesAsync: vi.fn(),
          appsGeofencesApiGetUploadJobStatus: vi.fn(),
        },
      };

      await expect(
        uploadGeofences({
          client: mockClient as unknown as UploadGeofencesOptions["client"],
          filePath: testFilePath,
        })
      ).rejects.toThrow("missing 'upload_url'");
    });

    it("should throw when file_id is missing", async () => {
      const mockClient = {
        storage: {
          appsStorageApiCreatePresignedUrl: vi.fn().mockResolvedValue({
            upload_url: "https://s3.example.com/upload",
            // Missing file_id
          }),
        },
        geofences: {
          appsGeofencesApiUploadGeofencesAsync: vi.fn(),
          appsGeofencesApiGetUploadJobStatus: vi.fn(),
        },
      };

      await expect(
        uploadGeofences({
          client: mockClient as unknown as UploadGeofencesOptions["client"],
          filePath: testFilePath,
        })
      ).rejects.toThrow("missing 'file_id'");
    });

    it("should call storage API with correct parameters", async () => {
      const mockClient = {
        storage: {
          appsStorageApiCreatePresignedUrl: vi.fn().mockRejectedValue(
            new Error("Storage API called")
          ),
        },
        geofences: {
          appsGeofencesApiUploadGeofencesAsync: vi.fn(),
          appsGeofencesApiGetUploadJobStatus: vi.fn(),
        },
      };

      await expect(
        uploadGeofences({
          client: mockClient as unknown as UploadGeofencesOptions["client"],
          filePath: testFilePath,
        })
      ).rejects.toThrow("Storage API called");

      expect(mockClient.storage.appsStorageApiCreatePresignedUrl).toHaveBeenCalledWith({
        file_type: "geofences",
        filename: "test.geojson",
        file_size: expect.any(Number),
      });
    });

    it("should complete the upload before starting the import", async () => {
      const callOrder: string[] = [];
      const mockClient = {
        storage: {
          appsStorageApiCreatePresignedUrl: vi.fn().mockResolvedValue({
            upload_url: "https://s3.example.com/upload",
            file_id: "file-123",
          }),
          appsStorageApiCompletePresignedUpload: vi
            .fn()
            .mockImplementation(async () => {
              callOrder.push("complete");
              return { file_id: "file-123", status: "complete" };
            }),
        },
        geofences: {
          appsGeofencesApiUploadGeofencesAsync: vi
            .fn()
            .mockImplementation(async () => {
              callOrder.push("import");
              return { job_id: "job-123" };
            }),
          appsGeofencesApiGetUploadJobStatus: vi
            .fn()
            .mockImplementation(async () => {
              callOrder.push("status");
              return {
                job_id: "job-123",
                status: "completed",
                created_count: 1,
                failed_count: 0,
                total_features: 1,
                results: {},
              };
            }),
        },
      };

      const originalFetch = global.fetch;
      const fetchMock = vi.fn().mockImplementation(async () => {
        callOrder.push("s3_put");
        return {
          ok: true,
          text: () => Promise.resolve(""),
        };
      });
      global.fetch = fetchMock;

      try {
        const result = await uploadGeofences({
          client: mockClient as unknown as UploadGeofencesOptions["client"],
          filePath: testFilePath,
        });

        expect(result.status).toBe("completed");
        expect(callOrder).toEqual(["s3_put", "complete", "import", "status"]);
        expect(mockClient.storage.appsStorageApiCompletePresignedUpload).toHaveBeenCalledWith(
          "file-123"
        );
        expect(fetchMock).toHaveBeenCalledWith(
          "https://s3.example.com/upload",
          expect.objectContaining({
            method: "PUT",
            headers: {
              "Content-Type": "application/geo+json",
              "Content-Length": String(fs.statSync(testFilePath).size),
              "If-None-Match": "*",
            },
          })
        );
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});

describe("extractData", () => {
  // Test the extractData function indirectly through uploadGeofences behavior
  it("should handle axios-style response with data property", async () => {
    const mockClient = {
      storage: {
        appsStorageApiCreatePresignedUrl: vi.fn().mockResolvedValue({
          data: {
            upload_url: "https://s3.example.com/upload",
            file_id: "file-123",
          },
        }),
        appsStorageApiCompletePresignedUpload: vi.fn().mockResolvedValue({
          file_id: "file-123",
          status: "complete",
        }),
      },
      geofences: {
        appsGeofencesApiUploadGeofencesAsync: vi.fn(),
        appsGeofencesApiGetUploadJobStatus: vi.fn(),
      },
    };

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(""),
    });

    try {
      mockClient.geofences.appsGeofencesApiUploadGeofencesAsync.mockRejectedValue(
        new Error("Reached job start - data extracted correctly")
      );

      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sdk-test-"));
      const filePath = path.join(tempDir, "test.geojson");
      fs.writeFileSync(filePath, '{"type": "FeatureCollection", "features": []}');

      await expect(
        uploadGeofences({
          client: mockClient as unknown as UploadGeofencesOptions["client"],
          filePath,
        })
      ).rejects.toThrow("Reached job start");

      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
    } finally {
      global.fetch = originalFetch;
    }
  });
});
