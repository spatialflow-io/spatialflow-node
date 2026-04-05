/**
 * SpatialFlow Node.js SDK Client
 *
 * The main entry point for the SpatialFlow API.
 */

import axios, { AxiosInstance, AxiosError } from "axios";
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
import { SpatialFlowError, raiseForStatus } from "./errors";

export const VERSION = "1.1.0";
export const DEFAULT_BASE_URL = BASE_PATH;
const DEFAULT_TIMEOUT = 30000; // 30 seconds
const DEFAULT_MAX_RETRIES = 3;

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
   * Maximum retry attempts for failed requests.
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
 * // List geofences
 * const response = await client.geofences.appsGeofencesApiListGeofences();
 * for (const geofence of response.data.results) {
 *   console.log(`${geofence.name}: ${geofence.id}`);
 * }
 *
 * // Create a geofence
 * const geofence = await client.geofences.appsGeofencesApiCreateGeofence({
 *   createGeofenceRequest: {
 *     name: "My Region",
 *     geometry: {
 *       type: "Polygon",
 *       coordinates: [[[-122.4, 37.8], [-122.4, 37.7], [-122.3, 37.7], [-122.3, 37.8], [-122.4, 37.8]]]
 *     }
 *   }
 * });
 * ```
 */
export class SpatialFlow {
  private readonly axiosInstance: AxiosInstance;
  private readonly config: Configuration;
  private readonly maxRetries: number;

  // Lazy-initialized API instances
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

    // Create axios instance with defaults
    this.axiosInstance = axios.create({
      baseURL: baseUrl ?? DEFAULT_BASE_URL,
      timeout: timeout ?? DEFAULT_TIMEOUT,
      headers: {
        "User-Agent": `spatialflow-node/${VERSION}`,
      },
    });

    // Add request interceptor for auth
    this.axiosInstance.interceptors.request.use((config) => {
      if (apiKey) {
        config.headers["X-API-KEY"] = apiKey;
      } else if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleError(error)
    );

    // Create configuration for generated APIs
    this.config = new Configuration({
      basePath: baseUrl ?? DEFAULT_BASE_URL,
      apiKey: apiKey ? () => apiKey : undefined,
      accessToken: accessToken,
    });
  }

  /**
   * Handle axios errors and convert to SpatialFlow errors.
   */
  private async handleError(error: AxiosError): Promise<never> {
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
    } else if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      throw new SpatialFlowError("Request timed out", {
        detail: error.message,
      });
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      throw new SpatialFlowError("Unable to connect to API", {
        detail: error.message,
      });
    }

    throw new SpatialFlowError(error.message || "Unknown error");
  }

  /**
   * Access geofence operations.
   */
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

  /**
   * Access workflow operations.
   */
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

  /**
   * Access webhook operations.
   */
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

  /**
   * Access device operations.
   */
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

  /**
   * Access account operations.
   */
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

  /**
   * Access storage operations.
   */
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
