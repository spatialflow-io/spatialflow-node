/**
 * File upload helpers for SpatialFlow SDK.
 *
 * Provides utilities for uploading files (GeoJSON, KML, GPX) and processing them.
 */

import * as fs from "fs";
import * as path from "path";
import { JobResult, pollJob, PollJobOptions } from "./jobs";

export interface UploadGeofencesOptions {
  client: {
    storage: {
      appsStorageApiCreatePresignedUrl: (request: {
        file_type: string;
        filename: string;
        file_size: number;
      }) => Promise<unknown>;
      appsStorageApiCompletePresignedUpload: (fileId: string) => Promise<unknown>;
    };
    geofences: {
      appsGeofencesApiUploadGeofencesAsync: (request: {
        file_id: string;
        group_name?: string;
      }) => Promise<unknown>;
      appsGeofencesApiGetUploadJobStatus: (jobId: string) => Promise<unknown>;
    };
  };

  /**
   * Path to the file to upload (GeoJSON, KML, or GPX).
   */
  filePath: string;

  groupName?: string;

  /**
   * Maximum time to wait for processing in milliseconds.
   * @default 300000 (5 minutes)
   */
  timeout?: number;

  /**
   * Time between status polls in milliseconds.
   * @default 2000
   */
  pollInterval?: number;

  /**
   * Called on each poll.
   */
  onStatus?: (status: string, response: unknown) => void;
}

const CONTENT_TYPES: Record<string, string> = {
  ".geojson": "application/geo+json",
  ".json": "application/json",
  ".kml": "application/vnd.google-earth.kml+xml",
  ".gpx": "application/gpx+xml",
};

/**
 * Upload a geofence file and wait for processing to complete.
 *
 * This is a convenience method that:
 * 1. Requests a presigned upload URL
 * 2. Uploads the file to S3
 * 3. Finalizes the upload so the API verifies the S3 object metadata
 * 4. Starts the geofence import job
 * 5. Polls until completion
 *
 * @example
 * ```typescript
 * import { uploadGeofences } from "@spatialflow/sdk";
 *
 * const result = await uploadGeofences({
 *   client,
 *   filePath: "boundaries.geojson",
 *   groupName: "my-region",
 *   timeout: 120000,
 *   onStatus: (status) => console.log(`Status: ${status}`),
 * });
 *
 * console.log(`Created ${result.createdCount} geofences`);
 * ```
 */
export async function uploadGeofences(
  options: UploadGeofencesOptions
): Promise<JobResult> {
  const {
    client,
    filePath,
    groupName,
    timeout = 300000,
    pollInterval = 2000,
    onStatus,
  } = options;

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const filename = path.basename(filePath);
  const fileSize = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();

  const contentType = CONTENT_TYPES[ext];
  if (!contentType) {
    throw new Error(
      `Unsupported file type: ${ext}. Supported types: ${Object.keys(CONTENT_TYPES).join(", ")}`
    );
  }

  const presignedResponse = await client.storage.appsStorageApiCreatePresignedUrl({
    file_type: "geofences",
    filename,
    file_size: fileSize,
  });

  const presignedData = extractData(presignedResponse);
  const uploadUrl = presignedData.upload_url as string | undefined;
  const fileId = presignedData.file_id as string | undefined;

  if (!uploadUrl) {
    throw new Error(
      "Failed to get presigned upload URL from storage API. " +
        "Response missing 'upload_url' field."
    );
  }
  if (!fileId) {
    throw new Error(
      "Failed to get file ID from storage API. " +
        "Response missing 'file_id' field."
    );
  }

  // Reads the entire file into memory; consider streaming for large files.
  // Requires Node.js 18+ for global fetch, or a polyfill for older versions.
  const fileContent = fs.readFileSync(filePath);

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: fileContent,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(fileSize),
      "If-None-Match": "*",
    },
  });

  if (!uploadResponse.ok) {
    const text = await uploadResponse.text();
    throw new Error(
      `Failed to upload file to S3: ${uploadResponse.status} - ${text}`
    );
  }

  // The API verifies the S3 object's actual size and content type before
  // making it available to import jobs.
  await client.storage.appsStorageApiCompletePresignedUpload(fileId);

  const jobResponse = await client.geofences.appsGeofencesApiUploadGeofencesAsync({
    file_id: fileId,
    ...(groupName && { group_name: groupName }),
  });

  const jobData = extractData(jobResponse);
  const jobId = jobData.job_id as string | undefined;

  if (!jobId) {
    throw new Error(
      "Failed to start upload job. Response missing 'job_id' field."
    );
  }

  return pollJob({
    fetchStatus: () => client.geofences.appsGeofencesApiGetUploadJobStatus(jobId),
    timeout,
    pollInterval,
    onStatus,
  });
}

function extractData(response: unknown): Record<string, unknown> {
  const r = response as Record<string, unknown>;

  if (r.data && typeof r.data === "object") {
    return r.data as Record<string, unknown>;
  }

  if (typeof response === "object" && response !== null) {
    return response as Record<string, unknown>;
  }

  return {};
}
