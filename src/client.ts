/**
 * SpatialFlow Node.js SDK Client
 *
 * The main entry point for the SpatialFlow API.
 */

import axios, {
  AxiosInstance,
  AxiosError,
  CanceledError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  GeofencesApi,
  WorkflowsApi,
  WebhooksApi,
  DevicesApi,
  AccountApi,
  StorageApi,
} from "./_generated/api";
import { Configuration } from "./_generated/configuration";
import { BASE_PATH } from "./_generated/base";
import {
  ConnectionError,
  SpatialFlowError,
  TimeoutError,
  raiseForStatus,
} from "./errors";

export const VERSION = "3.1.0";
export const DEFAULT_BASE_URL = BASE_PATH;
const DEFAULT_TIMEOUT = 30000; // milliseconds
const DEFAULT_MAX_RETRIES = 3;
const RETRY_BASE_DELAY = 500; // milliseconds
const RETRY_MAX_DELAY = 30000; // milliseconds
const IDEMPOTENT_METHODS = new Set(["get", "head", "options", "put", "delete"]);
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const TIMEOUT_CODES = new Set(["ECONNABORTED", "ETIMEDOUT"]);

type RetryableConfig = InternalAxiosRequestConfig & { retryCount?: number };

export interface SpatialFlowOptions {
  /**
   * SpatialFlow API key (starts with "sf_").
   * Use this for server-side applications.
   */
  apiKey?: string;

  /**
   * JWT access token.
   * Use this for client-side applications with user auth.
   */
  accessToken?: string;

  /**
   * API base URL.
   * @default "https://api.spatialflow.io"
   */
  baseUrl?: string;

  /**
   * Request timeout in milliseconds.
   * @default 30000
   */
  timeout?: number;

  /**
   * Maximum retry attempts for failed requests. Only idempotent requests
   * (GET, HEAD, OPTIONS, PUT, DELETE) are retried, on timeouts, connection
   * failures, and 429, 500, 502, 503 and 504 responses, with exponential backoff. A Retry-After
   * header sets the wait when present.
   * @default 3
   */
  maxRetries?: number;
}

/**
 * SpatialFlow API client.
 *
 * Provides access to geofences, workflows, webhooks, and devices.
 *
 * @example
 * ```typescript
 * const client = new SpatialFlow({ apiKey: "sf_xxx" });
 *
 * // List geofences. Generated methods take positional arguments and
 * // return an Axios response, so the payload is on `.data`.
 * const response = await client.geofences.appsGeofencesApiListGeofences();
 * for (const geofence of response.data.geofences) {
 *   console.log(`${geofence.name}: ${geofence.id}`);
 * }
 *
 * // Create a geofence
 * const created = await client.geofences.appsGeofencesApiCreateGeofence({
 *   name: "My Region",
 *   geometry: {
 *     type: "Polygon",
 *     coordinates: [[[-122.4, 37.8], [-122.4, 37.7], [-122.3, 37.7], [-122.3, 37.8], [-122.4, 37.8]]]
 *   }
 * });
 * console.log(created.data.id);
 * ```
 */
export class SpatialFlow {
  private readonly axiosInstance: AxiosInstance;
  private readonly config: Configuration;
  private readonly maxRetries: number;

  private _geofences?: GeofencesApi;
  private _workflows?: WorkflowsApi;
  private _webhooks?: WebhooksApi;
  private _devices?: DevicesApi;
  private _account?: AccountApi;
  private _storage?: StorageApi;

  constructor(options: SpatialFlowOptions) {
    const { apiKey, accessToken, baseUrl, timeout, maxRetries } = options;

    if (!apiKey && !accessToken) {
      throw new Error("Either apiKey or accessToken must be provided");
    }

    if (apiKey && accessToken) {
      throw new Error("Provide either apiKey or accessToken, not both");
    }

    this.maxRetries = maxRetries ?? DEFAULT_MAX_RETRIES;

    this.axiosInstance = axios.create({
      baseURL: baseUrl ?? DEFAULT_BASE_URL,
      timeout: timeout ?? DEFAULT_TIMEOUT,
      headers: {
        "User-Agent": `spatialflow-node/${VERSION}`,
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      if (apiKey) {
        config.headers["X-API-KEY"] = apiKey;
      } else if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleError(error)
    );

    this.config = new Configuration({
      basePath: baseUrl ?? DEFAULT_BASE_URL,
      apiKey: apiKey ? () => apiKey : undefined,
      accessToken: accessToken,
    });
  }

  private async handleError(error: AxiosError): Promise<unknown> {
    // A caller's abort is theirs to handle, so it is neither retried nor
    // reclassified as a connection failure.
    if (axios.isCancel(error)) throw error;

    const config = error.config as RetryableConfig | undefined;
    const attempt = config?.retryCount ?? 0;

    if (config && attempt < this.maxRetries && this.isRetryable(error, config)) {
      config.retryCount = attempt + 1;
      await sleep(this.retryDelay(error, attempt), config.signal as AbortSignal | undefined, config);
      return this.axiosInstance.request(config);
    }

    if (error.response) {
      const { status, data, headers } = error.response;
      const headerRecord: Record<string, string> = {};
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          if (typeof value === "string") {
            headerRecord[key] = value;
          }
        });
      }

      raiseForStatus(status, error.message, {
        body: data,
        headers: headerRecord,
      });
    } else if (
      TIMEOUT_CODES.has(error.code ?? "") ||
      error.message.includes("timeout")
    ) {
      throw new TimeoutError("Request timed out", { detail: error.message });
    } else if (error.request) {
      throw new ConnectionError("Unable to connect to API", {
        detail: error.message,
      });
    }

    throw new SpatialFlowError(error.message || "Unknown error");
  }

  private isRetryable(error: AxiosError, config: RetryableConfig): boolean {
    if (!IDEMPOTENT_METHODS.has((config.method ?? "get").toLowerCase())) {
      return false;
    }
    if (error.response) {
      // A wait longer than the cap means the limit is still active when we
      // would retry, so surface the error and its retryAfter instead.
      const retryAfter = this.retryAfterMs(error);
      if (retryAfter !== undefined && retryAfter > RETRY_MAX_DELAY) return false;
      return RETRYABLE_STATUSES.has(error.response.status);
    }
    // A request that never got a response, unless the caller cancelled it.
    return error.code !== "ERR_CANCELED" && Boolean(error.request);
  }

  private retryAfterMs(error: AxiosError): number | undefined {
    const seconds = Number(error.response?.headers?.["retry-after"]);
    return Number.isFinite(seconds) && seconds >= 0 ? seconds * 1000 : undefined;
  }

  private retryDelay(error: AxiosError, attempt: number): number {
    const retryAfter = this.retryAfterMs(error);
    if (retryAfter !== undefined) return retryAfter;
    const backoff = Math.min(RETRY_BASE_DELAY * 2 ** attempt, RETRY_MAX_DELAY);
    return backoff / 2 + Math.random() * (backoff / 2);
  }

  get geofences(): GeofencesApi {
    if (!this._geofences) {
      this._geofences = new GeofencesApi(
        this.config,
        undefined,
        this.axiosInstance
      );
    }
    return this._geofences;
  }

  get workflows(): WorkflowsApi {
    if (!this._workflows) {
      this._workflows = new WorkflowsApi(
        this.config,
        undefined,
        this.axiosInstance
      );
    }
    return this._workflows;
  }

  get webhooks(): WebhooksApi {
    if (!this._webhooks) {
      this._webhooks = new WebhooksApi(
        this.config,
        undefined,
        this.axiosInstance
      );
    }
    return this._webhooks;
  }

  get devices(): DevicesApi {
    if (!this._devices) {
      this._devices = new DevicesApi(
        this.config,
        undefined,
        this.axiosInstance
      );
    }
    return this._devices;
  }

  get account(): AccountApi {
    if (!this._account) {
      this._account = new AccountApi(
        this.config,
        undefined,
        this.axiosInstance
      );
    }
    return this._account;
  }

  get storage(): StorageApi {
    if (!this._storage) {
      this._storage = new StorageApi(
        this.config,
        undefined,
        this.axiosInstance
      );
    }
    return this._storage;
  }
}

// Rejects with the same cancellation axios gives when the caller aborts
// during the wait.
function sleep(
  ms: number,
  signal: AbortSignal | undefined,
  config: InternalAxiosRequestConfig
): Promise<void> {
  return new Promise((resolve, reject) => {
    const cancel = () => {
      clearTimeout(timer);
      reject(new CanceledError(undefined, undefined, config));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", cancel);
      resolve();
    }, ms);
    if (signal?.aborted) return cancel();
    signal?.addEventListener("abort", cancel, { once: true });
  });
}
