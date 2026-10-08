/**
 * SpatialFlow Node.js SDK
 *
 * A TypeScript/JavaScript client for the SpatialFlow API - real-time geospatial automation platform.
 *
 * @example
 * ```typescript
 * import { SpatialFlow } from "@spatialflow/sdk";
 *
 * const client = new SpatialFlow({ apiKey: "sf_xxx" });
 *
 * // List geofences
 * const response = await client.geofences.appsGeofencesApiListGeofences();
 * for (const geofence of response.data.results) {
 *   console.log(geofence.name);
 * }
 * ```
 *
 * @packageDocumentation
 */

export { SpatialFlow, SpatialFlowOptions, VERSION, DEFAULT_BASE_URL } from "./client";

export {
  SpatialFlowError,
  AuthenticationError,
  PermissionError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  ConflictError,
  TimeoutError,
  ConnectionError,
  raiseForStatus,
} from "./errors";

export {
  verifyWebhookSignature,
  verifyWorkflowSignature,
  verifySignature,
  WebhookSignatureError,
  VerifyWebhookOptions,
  VerifyWorkflowOptions,
  WebhookEvent,
} from "./webhooks";

export { paginate, collectAll, PaginateOptions } from "./pagination";

export {
  pollJob,
  JobResult,
  JobTimeoutError,
  JobFailedError,
  PollJobOptions,
} from "./jobs";

export { uploadGeofences, UploadGeofencesOptions } from "./uploads";

// Re-export generated types and APIs for advanced usage
export * from "./_generated/api";
export * from "./_generated/configuration";
export { BASE_PATH } from "./_generated/base";
