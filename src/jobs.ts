/**
 * Async job polling helpers for SpatialFlow SDK.
 *
 * Provides utilities for polling long-running jobs like file uploads.
 */

import { SpatialFlowError, TimeoutError } from "./errors";

/**
 * Raised when a job polling operation times out.
 */
export class JobTimeoutError extends TimeoutError {
  readonly jobId: string;
  readonly timeoutMs: number;
  readonly lastStatus?: string;

  constructor(jobId: string, timeoutMs: number, lastStatus?: string) {
    let message = `Job ${jobId} did not complete within ${timeoutMs / 1000} seconds`;
    if (lastStatus) {
      message += ` (last status: ${lastStatus})`;
    }
    super(message);
    this.name = "JobTimeoutError";
    this.jobId = jobId;
    this.timeoutMs = timeoutMs;
    this.lastStatus = lastStatus;
  }
}

/**
 * Raised when a polled job fails.
 */
export class JobFailedError extends SpatialFlowError {
  readonly jobId: string;
  readonly errorMessage?: string;
  readonly results?: Record<string, unknown>;

  constructor(
    jobId: string,
    errorMessage?: string,
    results?: Record<string, unknown>
  ) {
    let message = `Job ${jobId} failed`;
    if (errorMessage) {
      message += `: ${errorMessage}`;
    }
    super(message);
    this.name = "JobFailedError";
    this.jobId = jobId;
    this.errorMessage = errorMessage;
    this.results = results;
  }
}

/**
 * Result of a completed job.
 */
export interface JobResult {
  /** The job ID */
  jobId: string;
  /** Final job status */
  status: string;
  /** Number of items created */
  createdCount: number;
  /** Number of items that failed */
  failedCount: number;
  /** Total features processed */
  totalFeatures: number;
  /** Detailed results object */
  results: Record<string, unknown>;
  /** Duration in seconds (if available) */
  duration?: number;
  /** Raw response from the API */
  rawResponse: unknown;
  /** List of created geofence info (from results.created_geofences) */
  createdGeofences: Array<{ id: string; name: string }>;
  /** List of errors from processing */
  errors: Array<{ index: number; name: string; error: string }>;
  /** List of warnings from processing */
  warnings: string[];
}

/**
 * Options for polling a job.
 */
export interface PollJobOptions<T> {
  /**
   * Async function that fetches the current job status.
   * Should return a response object with status information.
   */
  fetchStatus: () => Promise<T>;

  /**
   * Maximum time to wait in milliseconds.
   * @default 300000 (5 minutes)
   */
  timeout?: number;

  /**
   * Time between polls in milliseconds.
   * @default 2000
   */
  pollInterval?: number;

  /**
   * Statuses that indicate the job is done.
   * @default ["completed", "failed"]
   */
  terminalStatuses?: string[];

  /**
   * Optional callback called on each poll with (status, response).
   */
  onStatus?: (status: string, response: T) => void;

  /**
   * Function to extract job_id from response.
   * @default looks for jobId, job_id attribute or nested in data
   */
  extractJobId?: (response: T) => string;

  /**
   * Function to extract status from response.
   * @default looks for status attribute or nested in data
   */
  extractStatus?: (response: T) => string;
}

/**
 * Poll a job until it reaches a terminal status.
 *
 * @example
 * ```typescript
 * import { pollJob } from "@spatialflow/sdk";
 *
 * const result = await pollJob({
 *   fetchStatus: () =>
 *     client.geofences.appsGeofencesApiGetUploadJobStatus({ jobId }),
 *   timeout: 120000,
 *   onStatus: (status) => console.log(`Status: ${status}`),
 * });
 *
 * console.log(`Created ${result.createdCount} geofences`);
 * ```
 */
export async function pollJob<T>(options: PollJobOptions<T>): Promise<JobResult> {
  const {
    fetchStatus,
    timeout = 300000,
    pollInterval = 2000,
    terminalStatuses = ["completed", "failed"],
    onStatus,
    extractJobId = defaultExtractJobId,
    extractStatus = defaultExtractStatus,
  } = options;

  let elapsed = 0;
  let lastStatus: string | undefined;
  let lastResponse: T | undefined;

  while (elapsed < timeout) {
    const response = await fetchStatus();
    lastResponse = response;
    const status = extractStatus(response);
    lastStatus = status;

    if (onStatus) {
      onStatus(status, response);
    }

    if (terminalStatuses.includes(status)) {
      const jobId = extractJobId(response);
      return buildJobResult(jobId, status, response);
    }

    await sleep(pollInterval);
    elapsed += pollInterval;
  }

  // Timeout
  const jobId = lastResponse ? extractJobId(lastResponse) : "unknown";
  throw new JobTimeoutError(jobId, timeout, lastStatus);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function defaultExtractJobId(response: unknown): string {
  const r = response as Record<string, unknown>;

  // Handle axios response shape (data.job_id)
  if (r.data && typeof r.data === "object") {
    const data = r.data as Record<string, unknown>;
    if (typeof data.job_id === "string") return data.job_id;
    if (typeof data.jobId === "string") return data.jobId;
  }

  // Direct access
  if (typeof r.job_id === "string") return r.job_id;
  if (typeof r.jobId === "string") return r.jobId;

  return "unknown";
}

function defaultExtractStatus(response: unknown): string {
  const r = response as Record<string, unknown>;

  // Handle axios response shape (data.status)
  if (r.data && typeof r.data === "object") {
    const data = r.data as Record<string, unknown>;
    if (typeof data.status === "string") return data.status;
  }

  // Direct access
  if (typeof r.status === "string") return r.status;

  return "unknown";
}

function getField<T>(
  response: unknown,
  name: string,
  defaultValue: T
): T {
  const r = response as Record<string, unknown>;

  // Handle axios response shape
  if (r.data && typeof r.data === "object") {
    const data = r.data as Record<string, unknown>;
    if (name in data) return data[name] as T;
  }

  // Direct access
  if (name in r) return r[name] as T;

  return defaultValue;
}

function buildJobResult(
  jobId: string,
  status: string,
  response: unknown
): JobResult {
  // Check for failure
  if (status === "failed") {
    const errorMessage = getField<string | undefined>(
      response,
      "error_message",
      undefined
    );
    const results = getField<Record<string, unknown> | undefined>(
      response,
      "results",
      undefined
    );
    throw new JobFailedError(jobId, errorMessage, results);
  }

  const results = getField<Record<string, unknown>>(response, "results", {});

  return {
    jobId,
    status,
    createdCount: getField(response, "created_count", 0),
    failedCount: getField(response, "failed_count", 0),
    totalFeatures: getField(response, "total_features", 0),
    results,
    duration: getField<number | undefined>(response, "duration", undefined),
    rawResponse: response,
    createdGeofences: (results.created_geofences as Array<{ id: string; name: string }>) || [],
    errors: (results.errors as Array<{ index: number; name: string; error: string }>) || [],
    warnings: (results.warnings as string[]) || [],
  };
}
