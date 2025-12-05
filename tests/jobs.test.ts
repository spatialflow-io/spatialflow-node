import { describe, it, expect, vi } from "vitest";
import {
  pollJob,
  JobResult,
  JobTimeoutError,
  JobFailedError,
} from "../src/jobs";

describe("pollJob", () => {
  it("should complete immediately for a completed job", async () => {
    const fetchStatus = vi.fn().mockResolvedValue({
      data: {
        job_id: "test-123",
        status: "completed",
        created_count: 5,
        failed_count: 0,
        total_features: 5,
        results: { created_geofences: [{ id: "1", name: "Test" }] },
        duration: 1.5,
      },
    });

    const result = await pollJob({
      fetchStatus,
      timeout: 10000,
      pollInterval: 100,
    });

    expect(result.jobId).toBe("test-123");
    expect(result.status).toBe("completed");
    expect(result.createdCount).toBe(5);
    expect(result.failedCount).toBe(0);
    expect(result.duration).toBe(1.5);
    expect(result.createdGeofences).toHaveLength(1);
    expect(fetchStatus).toHaveBeenCalledTimes(1);
  });

  it("should poll until completion", async () => {
    let callCount = 0;
    const fetchStatus = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount < 3) {
        return { data: { job_id: "test-456", status: "processing" } };
      }
      return {
        data: {
          job_id: "test-456",
          status: "completed",
          created_count: 10,
          results: {},
        },
      };
    });

    const result = await pollJob({
      fetchStatus,
      timeout: 10000,
      pollInterval: 10,
    });

    expect(result.status).toBe("completed");
    expect(fetchStatus).toHaveBeenCalledTimes(3);
  });

  it("should throw JobTimeoutError on timeout", async () => {
    const fetchStatus = vi.fn().mockResolvedValue({
      data: { job_id: "slow-job", status: "processing" },
    });

    await expect(
      pollJob({
        fetchStatus,
        timeout: 50,
        pollInterval: 20,
      })
    ).rejects.toThrow(JobTimeoutError);

    try {
      await pollJob({ fetchStatus, timeout: 50, pollInterval: 20 });
    } catch (e) {
      expect(e).toBeInstanceOf(JobTimeoutError);
      expect((e as JobTimeoutError).jobId).toBe("slow-job");
      expect((e as JobTimeoutError).lastStatus).toBe("processing");
    }
  });

  it("should throw JobFailedError on failure", async () => {
    const fetchStatus = vi.fn().mockResolvedValue({
      data: {
        job_id: "failed-job",
        status: "failed",
        error_message: "Invalid file format",
        results: { errors: [{ message: "Parse error" }] },
      },
    });

    await expect(
      pollJob({
        fetchStatus,
        timeout: 10000,
        pollInterval: 100,
      })
    ).rejects.toThrow(JobFailedError);

    try {
      await pollJob({ fetchStatus, timeout: 10000, pollInterval: 100 });
    } catch (e) {
      expect(e).toBeInstanceOf(JobFailedError);
      expect((e as JobFailedError).jobId).toBe("failed-job");
      expect((e as JobFailedError).errorMessage).toBe("Invalid file format");
    }
  });

  it("should call onStatus callback on each poll", async () => {
    let callCount = 0;
    const statuses: string[] = [];

    const fetchStatus = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount < 3) {
        return { data: { job_id: "cb-test", status: "processing" } };
      }
      return { data: { job_id: "cb-test", status: "completed", created_count: 0 } };
    });

    await pollJob({
      fetchStatus,
      timeout: 10000,
      pollInterval: 10,
      onStatus: (status) => statuses.push(status),
    });

    expect(statuses).toEqual(["processing", "processing", "completed"]);
  });

  it("should respect custom terminal statuses", async () => {
    const fetchStatus = vi.fn().mockResolvedValue({
      data: { job_id: "custom", status: "cancelled" },
    });

    // "cancelled" is not a default terminal status, should timeout
    await expect(
      pollJob({
        fetchStatus,
        timeout: 50,
        pollInterval: 20,
      })
    ).rejects.toThrow(JobTimeoutError);

    // With custom terminal statuses, should complete
    const result = await pollJob({
      fetchStatus,
      timeout: 10000,
      pollInterval: 100,
      terminalStatuses: ["completed", "failed", "cancelled"],
    });

    expect(result.status).toBe("cancelled");
  });

  it("should extract from direct response shape (no data wrapper)", async () => {
    const fetchStatus = vi.fn().mockResolvedValue({
      job_id: "direct-123",
      status: "completed",
      created_count: 3,
      failed_count: 1,
      total_features: 4,
      results: {},
    });

    const result = await pollJob({
      fetchStatus,
      timeout: 10000,
      pollInterval: 100,
    });

    expect(result.jobId).toBe("direct-123");
    expect(result.createdCount).toBe(3);
  });
});

describe("JobResult", () => {
  it("should have correct structure", () => {
    const result: JobResult = {
      jobId: "test",
      status: "completed",
      createdCount: 5,
      failedCount: 2,
      totalFeatures: 7,
      results: {
        created_geofences: [{ id: "1", name: "Test" }],
        errors: [{ index: 0, name: "Bad", error: "Failed" }],
        warnings: ["Warning 1"],
      },
      duration: 1.5,
      rawResponse: {},
      createdGeofences: [{ id: "1", name: "Test" }],
      errors: [{ index: 0, name: "Bad", error: "Failed" }],
      warnings: ["Warning 1"],
    };

    expect(result.jobId).toBe("test");
    expect(result.createdGeofences).toHaveLength(1);
    expect(result.errors).toHaveLength(1);
    expect(result.warnings).toHaveLength(1);
  });
});

describe("JobTimeoutError", () => {
  it("should be instanceof Error", () => {
    const error = new JobTimeoutError("job-123", 60000, "processing");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("JobTimeoutError");
    expect(error.message).toContain("job-123");
    expect(error.message).toContain("60");
    expect(error.message).toContain("processing");
  });

  it("should work without last status", () => {
    const error = new JobTimeoutError("job-456", 30000);
    expect(error.message).toContain("job-456");
    expect(error.lastStatus).toBeUndefined();
  });
});

describe("JobFailedError", () => {
  it("should include error message", () => {
    const error = new JobFailedError("job-789", "Parse error");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("JobFailedError");
    expect(error.message).toContain("job-789");
    expect(error.message).toContain("Parse error");
  });

  it("should include results", () => {
    const results = { errors: [{ line: 1, message: "Invalid" }] };
    const error = new JobFailedError("job-abc", "Validation failed", results);
    expect(error.results).toEqual(results);
  });
});
