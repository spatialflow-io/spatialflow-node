'use strict';

var globalAxios2 = require('axios');
var url = require('url');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var globalAxios2__default = /*#__PURE__*/_interopDefault(globalAxios2);
var crypto__default = /*#__PURE__*/_interopDefault(crypto);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var path__namespace = /*#__PURE__*/_interopNamespace(path);

// src/client.ts
var BASE_PATH = "https://api.spatialflow.io".replace(/\/+$/, "");
var BaseAPI = class {
  constructor(configuration, basePath = BASE_PATH, axios2 = globalAxios2__default.default) {
    this.basePath = basePath;
    this.axios = axios2;
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath ?? basePath;
    }
  }
};
var RequiredError = class extends Error {
  constructor(field, msg) {
    super(msg);
    this.field = field;
    this.name = "RequiredError";
  }
};
var operationServerMap = {};
var DUMMY_BASE_URL = "https://example.com";
var assertParamExists = function(functionName, paramName, paramValue) {
  if (paramValue === null || paramValue === void 0) {
    throw new RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
  }
};
var setApiKeyToObject = async function(object, keyParamName, configuration) {
  if (configuration && configuration.apiKey) {
    const localVarApiKeyValue = typeof configuration.apiKey === "function" ? await configuration.apiKey(keyParamName) : await configuration.apiKey;
    object[keyParamName] = localVarApiKeyValue;
  }
};
var setBearerAuthToObject = async function(object, configuration) {
  if (configuration && configuration.accessToken) {
    const accessToken = typeof configuration.accessToken === "function" ? await configuration.accessToken() : await configuration.accessToken;
    object["Authorization"] = "Bearer " + accessToken;
  }
};
function setFlattenedQueryParams(urlSearchParams, parameter, key = "") {
  if (parameter == null) return;
  if (typeof parameter === "object") {
    if (Array.isArray(parameter)) {
      parameter.forEach((item) => setFlattenedQueryParams(urlSearchParams, item, key));
    } else {
      Object.keys(parameter).forEach(
        (currentKey) => setFlattenedQueryParams(urlSearchParams, parameter[currentKey], `${key}${key !== "" ? "." : ""}${currentKey}`)
      );
    }
  } else {
    if (urlSearchParams.has(key)) {
      urlSearchParams.append(key, parameter);
    } else {
      urlSearchParams.set(key, parameter);
    }
  }
}
var setSearchParams = function(url$1, ...objects) {
  const searchParams = new url.URLSearchParams(url$1.search);
  setFlattenedQueryParams(searchParams, objects);
  url$1.search = searchParams.toString();
};
var serializeDataIfNeeded = function(value, requestOptions, configuration) {
  const nonString = typeof value !== "string";
  const needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
  return needsSerialization ? JSON.stringify(value !== void 0 ? value : {}) : value || "";
};
var toPathString = function(url) {
  return url.pathname + url.search + url.hash;
};
var createRequestFunction = function(axiosArgs, globalAxios3, BASE_PATH2, configuration) {
  return (axios2 = globalAxios3, basePath = BASE_PATH2) => {
    const axiosRequestArgs = { ...axiosArgs.options, url: (axios2.defaults.baseURL ? "" : configuration?.basePath ?? basePath) + axiosArgs.url };
    return axios2.request(axiosRequestArgs);
  };
};

// src/_generated/api.ts
var AuthTypeEnum = {
  None: "none",
  Bearer: "bearer",
  Basic: "basic",
  ApiKey: "api_key"
};
var DeliveryStatusEnum = {
  Pending: "pending",
  Success: "success",
  Failed: "failed"
};
var MethodEnum = {
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Get: "GET"
};
var RetryStrategyEnum = {
  ExponentialBackoff: "exponential_backoff",
  LinearBackoff: "linear_backoff",
  FixedDelay: "fixed_delay"
};
var SignupRequestSelectedPlanEnum = {
  Free: "free",
  Pro: "pro",
  Business: "business",
  Enterprise: "enterprise"
};
var AccountApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Health check endpoint for account service.
     * @summary Account Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiAccountHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/account/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Generate a new API key for the authenticated user.
     * @summary Create Api Key
     * @param {ApiKeyCreateRequest} apiKeyCreateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiCreateApiKey: async (apiKeyCreateRequest, options = {}) => {
      assertParamExists("appsAccountsApiCreateApiKey", "apiKeyCreateRequest", apiKeyCreateRequest);
      const localVarPath = `/api/v1/account/api-keys`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(apiKeyCreateRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create a privacy data erasure job (GDPR compliance).  This endpoint allows workspace owners and admins to delete location and event data for GDPR Article 17 (Right to be Forgotten) compliance.  **Authentication:** JWT token required **Authorization:** Owner or Admin role only  **Scope Options:** - `workspace`: Delete all data for the workspace - `device`: Delete data for specific devices (requires device_ids) - `date_range`: Delete data within a time range (requires from_date and to_date) - `tag`: Delete data with specific tags (requires tags)  **Dry Run Mode:** Set `dry_run: true` to estimate deletions without actually deleting data. Always run dry-run first to verify the scope.  **Example:** ```json {     \"scope\": \"device\",     \"device_ids\": [\"truck-005\", \"truck-009\"],     \"from_date\": \"2024-01-01T00:00:00Z\",     \"to_date\": \"2024-12-31T23:59:59Z\",     \"dry_run\": true } ```  **PRD Reference:** §4.5 Privacy Erasure API **Roadmap:** Phase 2, Task 2.1
     * @summary Create Erasure Job
     * @param {PrivacyErasureRequest} privacyErasureRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiCreateErasureJob: async (privacyErasureRequest, options = {}) => {
      assertParamExists("appsAccountsApiCreateErasureJob", "privacyErasureRequest", privacyErasureRequest);
      const localVarPath = `/api/v1/account/privacy/erasure`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(privacyErasureRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete a specific API key.
     * @summary Delete Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiDeleteApiKey: async (apiKeyId, options = {}) => {
      assertParamExists("appsAccountsApiDeleteApiKey", "apiKeyId", apiKeyId);
      const localVarPath = `/api/v1/account/api-keys/{api_key_id}`.replace(`{${"api_key_id"}}`, encodeURIComponent(String(apiKeyId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Dismiss the onboarding checklist.  Permanently hides the onboarding checklist card for the user. This action cannot be undone via API.  **Authentication:** JWT token required
     * @summary Dismiss Onboarding
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiDismissOnboarding: async (options = {}) => {
      const localVarPath = `/api/v1/account/onboarding/dismiss`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get a specific API key by its ID.
     * @summary Get Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetApiKey: async (apiKeyId, options = {}) => {
      assertParamExists("appsAccountsApiGetApiKey", "apiKeyId", apiKeyId);
      const localVarPath = `/api/v1/account/api-keys/{api_key_id}`.replace(`{${"api_key_id"}}`, encodeURIComponent(String(apiKeyId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get all API keys for the authenticated user.
     * @summary Get Api Keys
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetApiKeys: async (options = {}) => {
      const localVarPath = `/api/v1/account/api-keys`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get dashboard KPI metrics for the authenticated user.  Returns key performance indicators for the dashboard: - **Active Workflows**: Workflows that are active and were created or executed in the period - **Events Total**: Total geofence entry/exit events triggered in the period - **Action Delivery Success**: Success rate for webhook deliveries and workflow step executions (north-star metric)  **Time Ranges:** - `today`: From midnight to now - `7d`: Last 7 days - `30d`: Last 30 days - `custom`: Custom date range (requires start_date and end_date)  **Formulas:** - Action Delivery Success Rate = (successful_deliveries / total_attempts) * 100 - Returns `null` when total_attempts = 0 (UI should show \"—\")  **Authentication:** JWT token required  **Example:** ``` GET /api/v1/accounts/dashboard/metrics?time_range=7d GET /api/v1/accounts/dashboard/metrics?time_range=custom&start_date=2025-01-01T00:00:00Z&end_date=2025-01-31T23:59:59Z ```  **Dashboard UX:** Ticket #2 - Global Time-Range Control + KPI Formulas
     * @summary Get Dashboard Metrics
     * @param {string} [timeRange] Time range: today, 7d, 30d, or custom
     * @param {string | null} [startDate] Custom start date (ISO 8601, required if time_range&#x3D;custom)
     * @param {string | null} [endDate] Custom end date (ISO 8601, required if time_range&#x3D;custom)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetDashboardMetrics: async (timeRange, startDate, endDate, options = {}) => {
      const localVarPath = `/api/v1/account/dashboard/metrics`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (timeRange !== void 0) {
        localVarQueryParameter["time_range"] = timeRange;
      }
      if (startDate !== void 0) {
        localVarQueryParameter["start_date"] = startDate instanceof Date ? startDate.toISOString() : startDate;
      }
      if (endDate !== void 0) {
        localVarQueryParameter["end_date"] = endDate instanceof Date ? endDate.toISOString() : endDate;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get status of a privacy erasure job.  Returns the current status, progress, and results of an erasure job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same workspace as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `running`: Job is executing - `completed`: Job finished successfully - `failed`: Job encountered an error  **PRD Reference:** §4.5 Privacy Erasure API
     * @summary Get Erasure Job
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetErasureJob: async (jobId, options = {}) => {
      assertParamExists("appsAccountsApiGetErasureJob", "jobId", jobId);
      const localVarPath = `/api/v1/account/privacy/erasure/{job_id}`.replace(`{${"job_id"}}`, encodeURIComponent(String(jobId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get user notifications.
     * @summary Get Notifications
     * @param {boolean} [unreadOnly] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetNotifications: async (unreadOnly, options = {}) => {
      const localVarPath = `/api/v1/account/notifications`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (unreadOnly !== void 0) {
        localVarQueryParameter["unread_only"] = unreadOnly;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get current user\'s onboarding checklist progress.  Returns the user\'s progress through the onboarding checklist steps, including which steps are complete and overall completion percentage.  **Authentication:** JWT token required
     * @summary Get Onboarding Progress
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetOnboardingProgress: async (options = {}) => {
      const localVarPath = `/api/v1/account/onboarding/progress`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get current user profile information.
     * @summary Get User Profile
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetUserProfile: async (options = {}) => {
      const localVarPath = `/api/v1/account/me`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List API keys expiring within the specified number of days.  Default: 30 days
     * @summary List Expiring Api Keys
     * @param {number} [days] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiListExpiringApiKeys: async (days, options = {}) => {
      const localVarPath = `/api/v1/account/api-keys/expiring`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (days !== void 0) {
        localVarQueryParameter["days"] = days;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Mark all notifications as read.
     * @summary Mark All Notifications Read
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiMarkAllNotificationsRead: async (options = {}) => {
      const localVarPath = `/api/v1/account/notifications/read-all`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Mark a notification as read.
     * @summary Mark Notification Read
     * @param {string} notificationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiMarkNotificationRead: async (notificationId, options = {}) => {
      assertParamExists("appsAccountsApiMarkNotificationRead", "notificationId", notificationId);
      const localVarPath = `/api/v1/account/notifications/{notification_id}/read`.replace(`{${"notification_id"}}`, encodeURIComponent(String(notificationId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Regenerate an existing API key.
     * @summary Regenerate Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiRegenerateApiKey: async (apiKeyId, options = {}) => {
      assertParamExists("appsAccountsApiRegenerateApiKey", "apiKeyId", apiKeyId);
      const localVarPath = `/api/v1/account/api-keys/{api_key_id}/regenerate`.replace(`{${"api_key_id"}}`, encodeURIComponent(String(apiKeyId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Rotate an API key.  Creates a new API key with the same permissions and marks the old one for expiration. The old key remains active for the grace period (default 7 days).
     * @summary Rotate Api Key
     * @param {string} apiKeyId 
     * @param {number} [gracePeriodDays] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiRotateApiKey: async (apiKeyId, gracePeriodDays, options = {}) => {
      assertParamExists("appsAccountsApiRotateApiKey", "apiKeyId", apiKeyId);
      const localVarPath = `/api/v1/account/api-keys/{api_key_id}/rotate`.replace(`{${"api_key_id"}}`, encodeURIComponent(String(apiKeyId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (gracePeriodDays !== void 0) {
        localVarQueryParameter["grace_period_days"] = gracePeriodDays;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Set or update expiration date for an API key.  Pass expires_at as ISO 8601 datetime string or null to remove expiration.
     * @summary Set Api Key Expiration
     * @param {string} apiKeyId 
     * @param {string | null} [expiresAt] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiSetApiKeyExpiration: async (apiKeyId, expiresAt, options = {}) => {
      assertParamExists("appsAccountsApiSetApiKeyExpiration", "apiKeyId", apiKeyId);
      const localVarPath = `/api/v1/account/api-keys/{api_key_id}/expiration`.replace(`{${"api_key_id"}}`, encodeURIComponent(String(apiKeyId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (expiresAt !== void 0) {
        localVarQueryParameter["expires_at"] = expiresAt instanceof Date ? expiresAt.toISOString() : expiresAt;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update an API key\'s settings.
     * @summary Update Api Key
     * @param {string} apiKeyId 
     * @param {ApiKeyUpdateRequest} apiKeyUpdateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiUpdateApiKey: async (apiKeyId, apiKeyUpdateRequest, options = {}) => {
      assertParamExists("appsAccountsApiUpdateApiKey", "apiKeyId", apiKeyId);
      assertParamExists("appsAccountsApiUpdateApiKey", "apiKeyUpdateRequest", apiKeyUpdateRequest);
      const localVarPath = `/api/v1/account/api-keys/{api_key_id}`.replace(`{${"api_key_id"}}`, encodeURIComponent(String(apiKeyId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(apiKeyUpdateRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update onboarding progress by marking a step as complete.  Marks the specified onboarding step as complete. If all steps are complete, automatically sets the completed_at timestamp.  **Authentication:** JWT token required  **Example:** ```json {     \"step\": \"created_workflow\" } ```
     * @summary Update Onboarding Progress
     * @param {UpdateOnboardingProgressRequest} updateOnboardingProgressRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiUpdateOnboardingProgress: async (updateOnboardingProgressRequest, options = {}) => {
      assertParamExists("appsAccountsApiUpdateOnboardingProgress", "updateOnboardingProgressRequest", updateOnboardingProgressRequest);
      const localVarPath = `/api/v1/account/onboarding/progress`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateOnboardingProgressRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update current user profile information.
     * @summary Update User Profile
     * @param {UpdateProfileRequest} updateProfileRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiUpdateUserProfile: async (updateProfileRequest, options = {}) => {
      assertParamExists("appsAccountsApiUpdateUserProfile", "updateProfileRequest", updateProfileRequest);
      const localVarPath = `/api/v1/account/me`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateProfileRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var AccountApiFp = function(configuration) {
  const localVarAxiosParamCreator = AccountApiAxiosParamCreator(configuration);
  return {
    /**
     * Health check endpoint for account service.
     * @summary Account Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiAccountHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiAccountHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiAccountHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Generate a new API key for the authenticated user.
     * @summary Create Api Key
     * @param {ApiKeyCreateRequest} apiKeyCreateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiCreateApiKey(apiKeyCreateRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiCreateApiKey(apiKeyCreateRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiCreateApiKey"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create a privacy data erasure job (GDPR compliance).  This endpoint allows workspace owners and admins to delete location and event data for GDPR Article 17 (Right to be Forgotten) compliance.  **Authentication:** JWT token required **Authorization:** Owner or Admin role only  **Scope Options:** - `workspace`: Delete all data for the workspace - `device`: Delete data for specific devices (requires device_ids) - `date_range`: Delete data within a time range (requires from_date and to_date) - `tag`: Delete data with specific tags (requires tags)  **Dry Run Mode:** Set `dry_run: true` to estimate deletions without actually deleting data. Always run dry-run first to verify the scope.  **Example:** ```json {     \"scope\": \"device\",     \"device_ids\": [\"truck-005\", \"truck-009\"],     \"from_date\": \"2024-01-01T00:00:00Z\",     \"to_date\": \"2024-12-31T23:59:59Z\",     \"dry_run\": true } ```  **PRD Reference:** §4.5 Privacy Erasure API **Roadmap:** Phase 2, Task 2.1
     * @summary Create Erasure Job
     * @param {PrivacyErasureRequest} privacyErasureRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiCreateErasureJob(privacyErasureRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiCreateErasureJob(privacyErasureRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiCreateErasureJob"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete a specific API key.
     * @summary Delete Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiDeleteApiKey(apiKeyId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiDeleteApiKey(apiKeyId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiDeleteApiKey"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Dismiss the onboarding checklist.  Permanently hides the onboarding checklist card for the user. This action cannot be undone via API.  **Authentication:** JWT token required
     * @summary Dismiss Onboarding
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiDismissOnboarding(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiDismissOnboarding(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiDismissOnboarding"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get a specific API key by its ID.
     * @summary Get Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiGetApiKey(apiKeyId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiGetApiKey(apiKeyId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiGetApiKey"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get all API keys for the authenticated user.
     * @summary Get Api Keys
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiGetApiKeys(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiGetApiKeys(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiGetApiKeys"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get dashboard KPI metrics for the authenticated user.  Returns key performance indicators for the dashboard: - **Active Workflows**: Workflows that are active and were created or executed in the period - **Events Total**: Total geofence entry/exit events triggered in the period - **Action Delivery Success**: Success rate for webhook deliveries and workflow step executions (north-star metric)  **Time Ranges:** - `today`: From midnight to now - `7d`: Last 7 days - `30d`: Last 30 days - `custom`: Custom date range (requires start_date and end_date)  **Formulas:** - Action Delivery Success Rate = (successful_deliveries / total_attempts) * 100 - Returns `null` when total_attempts = 0 (UI should show \"—\")  **Authentication:** JWT token required  **Example:** ``` GET /api/v1/accounts/dashboard/metrics?time_range=7d GET /api/v1/accounts/dashboard/metrics?time_range=custom&start_date=2025-01-01T00:00:00Z&end_date=2025-01-31T23:59:59Z ```  **Dashboard UX:** Ticket #2 - Global Time-Range Control + KPI Formulas
     * @summary Get Dashboard Metrics
     * @param {string} [timeRange] Time range: today, 7d, 30d, or custom
     * @param {string | null} [startDate] Custom start date (ISO 8601, required if time_range&#x3D;custom)
     * @param {string | null} [endDate] Custom end date (ISO 8601, required if time_range&#x3D;custom)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiGetDashboardMetrics(timeRange, startDate, endDate, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiGetDashboardMetrics(timeRange, startDate, endDate, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiGetDashboardMetrics"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get status of a privacy erasure job.  Returns the current status, progress, and results of an erasure job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same workspace as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `running`: Job is executing - `completed`: Job finished successfully - `failed`: Job encountered an error  **PRD Reference:** §4.5 Privacy Erasure API
     * @summary Get Erasure Job
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiGetErasureJob(jobId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiGetErasureJob(jobId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiGetErasureJob"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get user notifications.
     * @summary Get Notifications
     * @param {boolean} [unreadOnly] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiGetNotifications(unreadOnly, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiGetNotifications(unreadOnly, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiGetNotifications"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get current user\'s onboarding checklist progress.  Returns the user\'s progress through the onboarding checklist steps, including which steps are complete and overall completion percentage.  **Authentication:** JWT token required
     * @summary Get Onboarding Progress
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiGetOnboardingProgress(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiGetOnboardingProgress(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiGetOnboardingProgress"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get current user profile information.
     * @summary Get User Profile
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiGetUserProfile(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiGetUserProfile(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiGetUserProfile"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List API keys expiring within the specified number of days.  Default: 30 days
     * @summary List Expiring Api Keys
     * @param {number} [days] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiListExpiringApiKeys(days, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiListExpiringApiKeys(days, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiListExpiringApiKeys"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Mark all notifications as read.
     * @summary Mark All Notifications Read
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiMarkAllNotificationsRead(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiMarkAllNotificationsRead(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiMarkAllNotificationsRead"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Mark a notification as read.
     * @summary Mark Notification Read
     * @param {string} notificationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiMarkNotificationRead(notificationId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiMarkNotificationRead(notificationId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiMarkNotificationRead"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Regenerate an existing API key.
     * @summary Regenerate Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiRegenerateApiKey(apiKeyId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiRegenerateApiKey(apiKeyId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiRegenerateApiKey"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Rotate an API key.  Creates a new API key with the same permissions and marks the old one for expiration. The old key remains active for the grace period (default 7 days).
     * @summary Rotate Api Key
     * @param {string} apiKeyId 
     * @param {number} [gracePeriodDays] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiRotateApiKey(apiKeyId, gracePeriodDays, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiRotateApiKey(apiKeyId, gracePeriodDays, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiRotateApiKey"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Set or update expiration date for an API key.  Pass expires_at as ISO 8601 datetime string or null to remove expiration.
     * @summary Set Api Key Expiration
     * @param {string} apiKeyId 
     * @param {string | null} [expiresAt] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiSetApiKeyExpiration(apiKeyId, expiresAt, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiSetApiKeyExpiration(apiKeyId, expiresAt, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiSetApiKeyExpiration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update an API key\'s settings.
     * @summary Update Api Key
     * @param {string} apiKeyId 
     * @param {ApiKeyUpdateRequest} apiKeyUpdateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiUpdateApiKey(apiKeyId, apiKeyUpdateRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiUpdateApiKey(apiKeyId, apiKeyUpdateRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiUpdateApiKey"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update onboarding progress by marking a step as complete.  Marks the specified onboarding step as complete. If all steps are complete, automatically sets the completed_at timestamp.  **Authentication:** JWT token required  **Example:** ```json {     \"step\": \"created_workflow\" } ```
     * @summary Update Onboarding Progress
     * @param {UpdateOnboardingProgressRequest} updateOnboardingProgressRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiUpdateOnboardingProgress(updateOnboardingProgressRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiUpdateOnboardingProgress(updateOnboardingProgressRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiUpdateOnboardingProgress"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update current user profile information.
     * @summary Update User Profile
     * @param {UpdateProfileRequest} updateProfileRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAccountsApiUpdateUserProfile(updateProfileRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAccountsApiUpdateUserProfile(updateProfileRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AccountApi.appsAccountsApiUpdateUserProfile"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var AccountApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = AccountApiFp(configuration);
  return {
    /**
     * Health check endpoint for account service.
     * @summary Account Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiAccountHealthCheck(options) {
      return localVarFp.appsAccountsApiAccountHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Generate a new API key for the authenticated user.
     * @summary Create Api Key
     * @param {ApiKeyCreateRequest} apiKeyCreateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiCreateApiKey(apiKeyCreateRequest, options) {
      return localVarFp.appsAccountsApiCreateApiKey(apiKeyCreateRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create a privacy data erasure job (GDPR compliance).  This endpoint allows workspace owners and admins to delete location and event data for GDPR Article 17 (Right to be Forgotten) compliance.  **Authentication:** JWT token required **Authorization:** Owner or Admin role only  **Scope Options:** - `workspace`: Delete all data for the workspace - `device`: Delete data for specific devices (requires device_ids) - `date_range`: Delete data within a time range (requires from_date and to_date) - `tag`: Delete data with specific tags (requires tags)  **Dry Run Mode:** Set `dry_run: true` to estimate deletions without actually deleting data. Always run dry-run first to verify the scope.  **Example:** ```json {     \"scope\": \"device\",     \"device_ids\": [\"truck-005\", \"truck-009\"],     \"from_date\": \"2024-01-01T00:00:00Z\",     \"to_date\": \"2024-12-31T23:59:59Z\",     \"dry_run\": true } ```  **PRD Reference:** §4.5 Privacy Erasure API **Roadmap:** Phase 2, Task 2.1
     * @summary Create Erasure Job
     * @param {PrivacyErasureRequest} privacyErasureRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiCreateErasureJob(privacyErasureRequest, options) {
      return localVarFp.appsAccountsApiCreateErasureJob(privacyErasureRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete a specific API key.
     * @summary Delete Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiDeleteApiKey(apiKeyId, options) {
      return localVarFp.appsAccountsApiDeleteApiKey(apiKeyId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Dismiss the onboarding checklist.  Permanently hides the onboarding checklist card for the user. This action cannot be undone via API.  **Authentication:** JWT token required
     * @summary Dismiss Onboarding
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiDismissOnboarding(options) {
      return localVarFp.appsAccountsApiDismissOnboarding(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get a specific API key by its ID.
     * @summary Get Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetApiKey(apiKeyId, options) {
      return localVarFp.appsAccountsApiGetApiKey(apiKeyId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get all API keys for the authenticated user.
     * @summary Get Api Keys
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetApiKeys(options) {
      return localVarFp.appsAccountsApiGetApiKeys(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get dashboard KPI metrics for the authenticated user.  Returns key performance indicators for the dashboard: - **Active Workflows**: Workflows that are active and were created or executed in the period - **Events Total**: Total geofence entry/exit events triggered in the period - **Action Delivery Success**: Success rate for webhook deliveries and workflow step executions (north-star metric)  **Time Ranges:** - `today`: From midnight to now - `7d`: Last 7 days - `30d`: Last 30 days - `custom`: Custom date range (requires start_date and end_date)  **Formulas:** - Action Delivery Success Rate = (successful_deliveries / total_attempts) * 100 - Returns `null` when total_attempts = 0 (UI should show \"—\")  **Authentication:** JWT token required  **Example:** ``` GET /api/v1/accounts/dashboard/metrics?time_range=7d GET /api/v1/accounts/dashboard/metrics?time_range=custom&start_date=2025-01-01T00:00:00Z&end_date=2025-01-31T23:59:59Z ```  **Dashboard UX:** Ticket #2 - Global Time-Range Control + KPI Formulas
     * @summary Get Dashboard Metrics
     * @param {string} [timeRange] Time range: today, 7d, 30d, or custom
     * @param {string | null} [startDate] Custom start date (ISO 8601, required if time_range&#x3D;custom)
     * @param {string | null} [endDate] Custom end date (ISO 8601, required if time_range&#x3D;custom)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetDashboardMetrics(timeRange, startDate, endDate, options) {
      return localVarFp.appsAccountsApiGetDashboardMetrics(timeRange, startDate, endDate, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get status of a privacy erasure job.  Returns the current status, progress, and results of an erasure job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same workspace as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `running`: Job is executing - `completed`: Job finished successfully - `failed`: Job encountered an error  **PRD Reference:** §4.5 Privacy Erasure API
     * @summary Get Erasure Job
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetErasureJob(jobId, options) {
      return localVarFp.appsAccountsApiGetErasureJob(jobId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get user notifications.
     * @summary Get Notifications
     * @param {boolean} [unreadOnly] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetNotifications(unreadOnly, options) {
      return localVarFp.appsAccountsApiGetNotifications(unreadOnly, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get current user\'s onboarding checklist progress.  Returns the user\'s progress through the onboarding checklist steps, including which steps are complete and overall completion percentage.  **Authentication:** JWT token required
     * @summary Get Onboarding Progress
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetOnboardingProgress(options) {
      return localVarFp.appsAccountsApiGetOnboardingProgress(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get current user profile information.
     * @summary Get User Profile
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiGetUserProfile(options) {
      return localVarFp.appsAccountsApiGetUserProfile(options).then((request) => request(axios2, basePath));
    },
    /**
     * List API keys expiring within the specified number of days.  Default: 30 days
     * @summary List Expiring Api Keys
     * @param {number} [days] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiListExpiringApiKeys(days, options) {
      return localVarFp.appsAccountsApiListExpiringApiKeys(days, options).then((request) => request(axios2, basePath));
    },
    /**
     * Mark all notifications as read.
     * @summary Mark All Notifications Read
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiMarkAllNotificationsRead(options) {
      return localVarFp.appsAccountsApiMarkAllNotificationsRead(options).then((request) => request(axios2, basePath));
    },
    /**
     * Mark a notification as read.
     * @summary Mark Notification Read
     * @param {string} notificationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiMarkNotificationRead(notificationId, options) {
      return localVarFp.appsAccountsApiMarkNotificationRead(notificationId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Regenerate an existing API key.
     * @summary Regenerate Api Key
     * @param {string} apiKeyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiRegenerateApiKey(apiKeyId, options) {
      return localVarFp.appsAccountsApiRegenerateApiKey(apiKeyId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Rotate an API key.  Creates a new API key with the same permissions and marks the old one for expiration. The old key remains active for the grace period (default 7 days).
     * @summary Rotate Api Key
     * @param {string} apiKeyId 
     * @param {number} [gracePeriodDays] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiRotateApiKey(apiKeyId, gracePeriodDays, options) {
      return localVarFp.appsAccountsApiRotateApiKey(apiKeyId, gracePeriodDays, options).then((request) => request(axios2, basePath));
    },
    /**
     * Set or update expiration date for an API key.  Pass expires_at as ISO 8601 datetime string or null to remove expiration.
     * @summary Set Api Key Expiration
     * @param {string} apiKeyId 
     * @param {string | null} [expiresAt] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiSetApiKeyExpiration(apiKeyId, expiresAt, options) {
      return localVarFp.appsAccountsApiSetApiKeyExpiration(apiKeyId, expiresAt, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update an API key\'s settings.
     * @summary Update Api Key
     * @param {string} apiKeyId 
     * @param {ApiKeyUpdateRequest} apiKeyUpdateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiUpdateApiKey(apiKeyId, apiKeyUpdateRequest, options) {
      return localVarFp.appsAccountsApiUpdateApiKey(apiKeyId, apiKeyUpdateRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update onboarding progress by marking a step as complete.  Marks the specified onboarding step as complete. If all steps are complete, automatically sets the completed_at timestamp.  **Authentication:** JWT token required  **Example:** ```json {     \"step\": \"created_workflow\" } ```
     * @summary Update Onboarding Progress
     * @param {UpdateOnboardingProgressRequest} updateOnboardingProgressRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiUpdateOnboardingProgress(updateOnboardingProgressRequest, options) {
      return localVarFp.appsAccountsApiUpdateOnboardingProgress(updateOnboardingProgressRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update current user profile information.
     * @summary Update User Profile
     * @param {UpdateProfileRequest} updateProfileRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAccountsApiUpdateUserProfile(updateProfileRequest, options) {
      return localVarFp.appsAccountsApiUpdateUserProfile(updateProfileRequest, options).then((request) => request(axios2, basePath));
    }
  };
};
var AccountApi = class extends BaseAPI {
  /**
   * Health check endpoint for account service.
   * @summary Account Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiAccountHealthCheck(options) {
    return AccountApiFp(this.configuration).appsAccountsApiAccountHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Generate a new API key for the authenticated user.
   * @summary Create Api Key
   * @param {ApiKeyCreateRequest} apiKeyCreateRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiCreateApiKey(apiKeyCreateRequest, options) {
    return AccountApiFp(this.configuration).appsAccountsApiCreateApiKey(apiKeyCreateRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create a privacy data erasure job (GDPR compliance).  This endpoint allows workspace owners and admins to delete location and event data for GDPR Article 17 (Right to be Forgotten) compliance.  **Authentication:** JWT token required **Authorization:** Owner or Admin role only  **Scope Options:** - `workspace`: Delete all data for the workspace - `device`: Delete data for specific devices (requires device_ids) - `date_range`: Delete data within a time range (requires from_date and to_date) - `tag`: Delete data with specific tags (requires tags)  **Dry Run Mode:** Set `dry_run: true` to estimate deletions without actually deleting data. Always run dry-run first to verify the scope.  **Example:** ```json {     \"scope\": \"device\",     \"device_ids\": [\"truck-005\", \"truck-009\"],     \"from_date\": \"2024-01-01T00:00:00Z\",     \"to_date\": \"2024-12-31T23:59:59Z\",     \"dry_run\": true } ```  **PRD Reference:** §4.5 Privacy Erasure API **Roadmap:** Phase 2, Task 2.1
   * @summary Create Erasure Job
   * @param {PrivacyErasureRequest} privacyErasureRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiCreateErasureJob(privacyErasureRequest, options) {
    return AccountApiFp(this.configuration).appsAccountsApiCreateErasureJob(privacyErasureRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete a specific API key.
   * @summary Delete Api Key
   * @param {string} apiKeyId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiDeleteApiKey(apiKeyId, options) {
    return AccountApiFp(this.configuration).appsAccountsApiDeleteApiKey(apiKeyId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Dismiss the onboarding checklist.  Permanently hides the onboarding checklist card for the user. This action cannot be undone via API.  **Authentication:** JWT token required
   * @summary Dismiss Onboarding
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiDismissOnboarding(options) {
    return AccountApiFp(this.configuration).appsAccountsApiDismissOnboarding(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get a specific API key by its ID.
   * @summary Get Api Key
   * @param {string} apiKeyId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiGetApiKey(apiKeyId, options) {
    return AccountApiFp(this.configuration).appsAccountsApiGetApiKey(apiKeyId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get all API keys for the authenticated user.
   * @summary Get Api Keys
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiGetApiKeys(options) {
    return AccountApiFp(this.configuration).appsAccountsApiGetApiKeys(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get dashboard KPI metrics for the authenticated user.  Returns key performance indicators for the dashboard: - **Active Workflows**: Workflows that are active and were created or executed in the period - **Events Total**: Total geofence entry/exit events triggered in the period - **Action Delivery Success**: Success rate for webhook deliveries and workflow step executions (north-star metric)  **Time Ranges:** - `today`: From midnight to now - `7d`: Last 7 days - `30d`: Last 30 days - `custom`: Custom date range (requires start_date and end_date)  **Formulas:** - Action Delivery Success Rate = (successful_deliveries / total_attempts) * 100 - Returns `null` when total_attempts = 0 (UI should show \"—\")  **Authentication:** JWT token required  **Example:** ``` GET /api/v1/accounts/dashboard/metrics?time_range=7d GET /api/v1/accounts/dashboard/metrics?time_range=custom&start_date=2025-01-01T00:00:00Z&end_date=2025-01-31T23:59:59Z ```  **Dashboard UX:** Ticket #2 - Global Time-Range Control + KPI Formulas
   * @summary Get Dashboard Metrics
   * @param {string} [timeRange] Time range: today, 7d, 30d, or custom
   * @param {string | null} [startDate] Custom start date (ISO 8601, required if time_range&#x3D;custom)
   * @param {string | null} [endDate] Custom end date (ISO 8601, required if time_range&#x3D;custom)
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiGetDashboardMetrics(timeRange, startDate, endDate, options) {
    return AccountApiFp(this.configuration).appsAccountsApiGetDashboardMetrics(timeRange, startDate, endDate, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get status of a privacy erasure job.  Returns the current status, progress, and results of an erasure job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same workspace as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `running`: Job is executing - `completed`: Job finished successfully - `failed`: Job encountered an error  **PRD Reference:** §4.5 Privacy Erasure API
   * @summary Get Erasure Job
   * @param {string} jobId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiGetErasureJob(jobId, options) {
    return AccountApiFp(this.configuration).appsAccountsApiGetErasureJob(jobId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get user notifications.
   * @summary Get Notifications
   * @param {boolean} [unreadOnly] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiGetNotifications(unreadOnly, options) {
    return AccountApiFp(this.configuration).appsAccountsApiGetNotifications(unreadOnly, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get current user\'s onboarding checklist progress.  Returns the user\'s progress through the onboarding checklist steps, including which steps are complete and overall completion percentage.  **Authentication:** JWT token required
   * @summary Get Onboarding Progress
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiGetOnboardingProgress(options) {
    return AccountApiFp(this.configuration).appsAccountsApiGetOnboardingProgress(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get current user profile information.
   * @summary Get User Profile
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiGetUserProfile(options) {
    return AccountApiFp(this.configuration).appsAccountsApiGetUserProfile(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List API keys expiring within the specified number of days.  Default: 30 days
   * @summary List Expiring Api Keys
   * @param {number} [days] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiListExpiringApiKeys(days, options) {
    return AccountApiFp(this.configuration).appsAccountsApiListExpiringApiKeys(days, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Mark all notifications as read.
   * @summary Mark All Notifications Read
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiMarkAllNotificationsRead(options) {
    return AccountApiFp(this.configuration).appsAccountsApiMarkAllNotificationsRead(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Mark a notification as read.
   * @summary Mark Notification Read
   * @param {string} notificationId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiMarkNotificationRead(notificationId, options) {
    return AccountApiFp(this.configuration).appsAccountsApiMarkNotificationRead(notificationId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Regenerate an existing API key.
   * @summary Regenerate Api Key
   * @param {string} apiKeyId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiRegenerateApiKey(apiKeyId, options) {
    return AccountApiFp(this.configuration).appsAccountsApiRegenerateApiKey(apiKeyId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Rotate an API key.  Creates a new API key with the same permissions and marks the old one for expiration. The old key remains active for the grace period (default 7 days).
   * @summary Rotate Api Key
   * @param {string} apiKeyId 
   * @param {number} [gracePeriodDays] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiRotateApiKey(apiKeyId, gracePeriodDays, options) {
    return AccountApiFp(this.configuration).appsAccountsApiRotateApiKey(apiKeyId, gracePeriodDays, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Set or update expiration date for an API key.  Pass expires_at as ISO 8601 datetime string or null to remove expiration.
   * @summary Set Api Key Expiration
   * @param {string} apiKeyId 
   * @param {string | null} [expiresAt] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiSetApiKeyExpiration(apiKeyId, expiresAt, options) {
    return AccountApiFp(this.configuration).appsAccountsApiSetApiKeyExpiration(apiKeyId, expiresAt, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update an API key\'s settings.
   * @summary Update Api Key
   * @param {string} apiKeyId 
   * @param {ApiKeyUpdateRequest} apiKeyUpdateRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiUpdateApiKey(apiKeyId, apiKeyUpdateRequest, options) {
    return AccountApiFp(this.configuration).appsAccountsApiUpdateApiKey(apiKeyId, apiKeyUpdateRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update onboarding progress by marking a step as complete.  Marks the specified onboarding step as complete. If all steps are complete, automatically sets the completed_at timestamp.  **Authentication:** JWT token required  **Example:** ```json {     \"step\": \"created_workflow\" } ```
   * @summary Update Onboarding Progress
   * @param {UpdateOnboardingProgressRequest} updateOnboardingProgressRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiUpdateOnboardingProgress(updateOnboardingProgressRequest, options) {
    return AccountApiFp(this.configuration).appsAccountsApiUpdateOnboardingProgress(updateOnboardingProgressRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update current user profile information.
   * @summary Update User Profile
   * @param {UpdateProfileRequest} updateProfileRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  appsAccountsApiUpdateUserProfile(updateProfileRequest, options) {
    return AccountApiFp(this.configuration).appsAccountsApiUpdateUserProfile(updateProfileRequest, options).then((request) => request(this.axios, this.basePath));
  }
};
var AdminApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Activate a user account (set email_verified=True).
     * @summary Activate User
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiActivateUser: async (userId, options = {}) => {
      assertParamExists("appsAdminPortalApiActivateUser", "userId", userId);
      const localVarPath = `/api/v1/admin/users/{user_id}/activate`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Comprehensive health check for admin service.
     * @summary Admin Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiAdminHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/admin/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Simple health check for admin API (requires admin auth).
     * @summary Admin Ping
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiAdminPing: async (options = {}) => {
      const localVarPath = `/api/v1/admin/ping`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Admin-initiated password reset for a user.
     * @summary Admin Reset Password
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiAdminResetPassword: async (userId, options = {}) => {
      assertParamExists("appsAdminPortalApiAdminResetPassword", "userId", userId);
      const localVarPath = `/api/v1/admin/users/{user_id}/reset-password`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Approve a pending user account (for beta signups requiring approval).
     * @summary Approve User
     * @param {string} userId 
     * @param {UserApprovalRequest} userApprovalRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiApproveUser: async (userId, userApprovalRequest, options = {}) => {
      assertParamExists("appsAdminPortalApiApproveUser", "userId", userId);
      assertParamExists("appsAdminPortalApiApproveUser", "userApprovalRequest", userApprovalRequest);
      const localVarPath = `/api/v1/admin/users/{user_id}/approve`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(userApprovalRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Deactivate a user account (set email_verified=False).
     * @summary Deactivate User
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiDeactivateUser: async (userId, options = {}) => {
      assertParamExists("appsAdminPortalApiDeactivateUser", "userId", userId);
      const localVarPath = `/api/v1/admin/users/{user_id}/deactivate`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete workspace (hard delete with safety checks). Workspace must have 0 members before deletion. Cancels Stripe subscription and deletes all related data via CASCADE.
     * @summary Delete Workspace
     * @param {string} workspaceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiDeleteWorkspace: async (workspaceId, options = {}) => {
      assertParamExists("appsAdminPortalApiDeleteWorkspace", "workspaceId", workspaceId);
      const localVarPath = `/api/v1/admin/workspaces/{workspace_id}`.replace(`{${"workspace_id"}}`, encodeURIComponent(String(workspaceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get usage statistics for a specific user.
     * @summary Get User Usage
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiGetUserUsage: async (userId, options = {}) => {
      assertParamExists("appsAdminPortalApiGetUserUsage", "userId", userId);
      const localVarPath = `/api/v1/admin/users/{user_id}/usage`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get detailed information about a specific workspace.
     * @summary Get Workspace
     * @param {string} workspaceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiGetWorkspace: async (workspaceId, options = {}) => {
      assertParamExists("appsAdminPortalApiGetWorkspace", "workspaceId", workspaceId);
      const localVarPath = `/api/v1/admin/workspaces/{workspace_id}`.replace(`{${"workspace_id"}}`, encodeURIComponent(String(workspaceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get paginated list of members in a workspace.
     * @summary Get Workspace Members
     * @param {string} workspaceId 
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiGetWorkspaceMembers: async (workspaceId, page, limit, options = {}) => {
      assertParamExists("appsAdminPortalApiGetWorkspaceMembers", "workspaceId", workspaceId);
      const localVarPath = `/api/v1/admin/workspaces/{workspace_id}/members`.replace(`{${"workspace_id"}}`, encodeURIComponent(String(workspaceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Invite new user to a workspace via email.  If workspace_id is None or empty, creates a new workspace for the user. The user becomes owner of new workspaces, or gets the requested role for existing ones.
     * @summary Invite User
     * @param {UserInviteRequest} userInviteRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiInviteUser: async (userInviteRequest, options = {}) => {
      assertParamExists("appsAdminPortalApiInviteUser", "userInviteRequest", userInviteRequest);
      const localVarPath = `/api/v1/admin/users/invite`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(userInviteRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List all users pending admin approval.
     * @summary List Pending Users
     * @param {number} [limit] 
     * @param {string | null} [cursor] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiListPendingUsers: async (limit, cursor, options = {}) => {
      const localVarPath = `/api/v1/admin/users/pending`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (cursor !== void 0) {
        localVarQueryParameter["cursor"] = cursor;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get paginated list of users with filtering options.
     * @summary List Users
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {string | null} [search] 
     * @param {string | null} [role] 
     * @param {string | null} [status] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiListUsers: async (page, limit, search, role, status, options = {}) => {
      const localVarPath = `/api/v1/admin/users`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (role !== void 0) {
        localVarQueryParameter["role"] = role;
      }
      if (status !== void 0) {
        localVarQueryParameter["status"] = status;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get paginated list of workspaces with filtering options.
     * @summary List Workspaces
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiListWorkspaces: async (page, limit, search, options = {}) => {
      const localVarPath = `/api/v1/admin/workspaces`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Reject a pending user account.
     * @summary Reject User
     * @param {string} userId 
     * @param {UserRejectionRequest} userRejectionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiRejectUser: async (userId, userRejectionRequest, options = {}) => {
      assertParamExists("appsAdminPortalApiRejectUser", "userId", userId);
      assertParamExists("appsAdminPortalApiRejectUser", "userRejectionRequest", userRejectionRequest);
      const localVarPath = `/api/v1/admin/users/{user_id}/reject`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(userRejectionRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Remove member from workspace.
     * @summary Remove Member
     * @param {string} workspaceId 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiRemoveMember: async (workspaceId, userId, options = {}) => {
      assertParamExists("appsAdminPortalApiRemoveMember", "workspaceId", workspaceId);
      assertParamExists("appsAdminPortalApiRemoveMember", "userId", userId);
      const localVarPath = `/api/v1/admin/workspaces/{workspace_id}/members/{user_id}`.replace(`{${"workspace_id"}}`, encodeURIComponent(String(workspaceId))).replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Remove user from their workspace.
     * @summary Remove User Workspace
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiRemoveUserWorkspace: async (userId, options = {}) => {
      assertParamExists("appsAdminPortalApiRemoveUserWorkspace", "userId", userId);
      const localVarPath = `/api/v1/admin/users/{user_id}/workspace`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Resend password reset email to a user.
     * @summary Resend Password Reset
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiResendPasswordReset: async (userId, options = {}) => {
      assertParamExists("appsAdminPortalApiResendPasswordReset", "userId", userId);
      const localVarPath = `/api/v1/admin/users/{user_id}/resend-reset`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Resend email verification to a user.
     * @summary Resend Verification Email
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiResendVerificationEmail: async (userId, options = {}) => {
      assertParamExists("appsAdminPortalApiResendVerificationEmail", "userId", userId);
      const localVarPath = `/api/v1/admin/users/{user_id}/resend-verification`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update workspace member role.
     * @summary Update Member Role
     * @param {string} workspaceId 
     * @param {string} userId 
     * @param {UpdateMemberRoleRequest} updateMemberRoleRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiUpdateMemberRole: async (workspaceId, userId, updateMemberRoleRequest, options = {}) => {
      assertParamExists("appsAdminPortalApiUpdateMemberRole", "workspaceId", workspaceId);
      assertParamExists("appsAdminPortalApiUpdateMemberRole", "userId", userId);
      assertParamExists("appsAdminPortalApiUpdateMemberRole", "updateMemberRoleRequest", updateMemberRoleRequest);
      const localVarPath = `/api/v1/admin/workspaces/{workspace_id}/members/{user_id}`.replace(`{${"workspace_id"}}`, encodeURIComponent(String(workspaceId))).replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateMemberRoleRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update user\'s workspace (add to workspace or move between workspaces).
     * @summary Update User Workspace
     * @param {string} userId 
     * @param {UpdateUserWorkspaceRequest} updateUserWorkspaceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiUpdateUserWorkspace: async (userId, updateUserWorkspaceRequest, options = {}) => {
      assertParamExists("appsAdminPortalApiUpdateUserWorkspace", "userId", userId);
      assertParamExists("appsAdminPortalApiUpdateUserWorkspace", "updateUserWorkspaceRequest", updateUserWorkspaceRequest);
      const localVarPath = `/api/v1/admin/users/{user_id}/workspace`.replace(`{${"user_id"}}`, encodeURIComponent(String(userId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateUserWorkspaceRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update workspace details.
     * @summary Update Workspace
     * @param {string} workspaceId 
     * @param {WorkspaceUpdateRequest} workspaceUpdateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiUpdateWorkspace: async (workspaceId, workspaceUpdateRequest, options = {}) => {
      assertParamExists("appsAdminPortalApiUpdateWorkspace", "workspaceId", workspaceId);
      assertParamExists("appsAdminPortalApiUpdateWorkspace", "workspaceUpdateRequest", workspaceUpdateRequest);
      const localVarPath = `/api/v1/admin/workspaces/{workspace_id}`.replace(`{${"workspace_id"}}`, encodeURIComponent(String(workspaceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(workspaceUpdateRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var AdminApiFp = function(configuration) {
  const localVarAxiosParamCreator = AdminApiAxiosParamCreator(configuration);
  return {
    /**
     * Activate a user account (set email_verified=True).
     * @summary Activate User
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiActivateUser(userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiActivateUser(userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiActivateUser"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Comprehensive health check for admin service.
     * @summary Admin Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiAdminHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiAdminHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiAdminHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Simple health check for admin API (requires admin auth).
     * @summary Admin Ping
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiAdminPing(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiAdminPing(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiAdminPing"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Admin-initiated password reset for a user.
     * @summary Admin Reset Password
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiAdminResetPassword(userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiAdminResetPassword(userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiAdminResetPassword"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Approve a pending user account (for beta signups requiring approval).
     * @summary Approve User
     * @param {string} userId 
     * @param {UserApprovalRequest} userApprovalRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiApproveUser(userId, userApprovalRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiApproveUser(userId, userApprovalRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiApproveUser"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Deactivate a user account (set email_verified=False).
     * @summary Deactivate User
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiDeactivateUser(userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiDeactivateUser(userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiDeactivateUser"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete workspace (hard delete with safety checks). Workspace must have 0 members before deletion. Cancels Stripe subscription and deletes all related data via CASCADE.
     * @summary Delete Workspace
     * @param {string} workspaceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiDeleteWorkspace(workspaceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiDeleteWorkspace(workspaceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiDeleteWorkspace"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get usage statistics for a specific user.
     * @summary Get User Usage
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiGetUserUsage(userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiGetUserUsage(userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiGetUserUsage"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get detailed information about a specific workspace.
     * @summary Get Workspace
     * @param {string} workspaceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiGetWorkspace(workspaceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiGetWorkspace(workspaceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiGetWorkspace"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get paginated list of members in a workspace.
     * @summary Get Workspace Members
     * @param {string} workspaceId 
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiGetWorkspaceMembers(workspaceId, page, limit, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiGetWorkspaceMembers(workspaceId, page, limit, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiGetWorkspaceMembers"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Invite new user to a workspace via email.  If workspace_id is None or empty, creates a new workspace for the user. The user becomes owner of new workspaces, or gets the requested role for existing ones.
     * @summary Invite User
     * @param {UserInviteRequest} userInviteRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiInviteUser(userInviteRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiInviteUser(userInviteRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiInviteUser"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List all users pending admin approval.
     * @summary List Pending Users
     * @param {number} [limit] 
     * @param {string | null} [cursor] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiListPendingUsers(limit, cursor, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiListPendingUsers(limit, cursor, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiListPendingUsers"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get paginated list of users with filtering options.
     * @summary List Users
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {string | null} [search] 
     * @param {string | null} [role] 
     * @param {string | null} [status] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiListUsers(page, limit, search, role, status, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiListUsers(page, limit, search, role, status, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiListUsers"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get paginated list of workspaces with filtering options.
     * @summary List Workspaces
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiListWorkspaces(page, limit, search, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiListWorkspaces(page, limit, search, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiListWorkspaces"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Reject a pending user account.
     * @summary Reject User
     * @param {string} userId 
     * @param {UserRejectionRequest} userRejectionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiRejectUser(userId, userRejectionRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiRejectUser(userId, userRejectionRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiRejectUser"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Remove member from workspace.
     * @summary Remove Member
     * @param {string} workspaceId 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiRemoveMember(workspaceId, userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiRemoveMember(workspaceId, userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiRemoveMember"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Remove user from their workspace.
     * @summary Remove User Workspace
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiRemoveUserWorkspace(userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiRemoveUserWorkspace(userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiRemoveUserWorkspace"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Resend password reset email to a user.
     * @summary Resend Password Reset
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiResendPasswordReset(userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiResendPasswordReset(userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiResendPasswordReset"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Resend email verification to a user.
     * @summary Resend Verification Email
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiResendVerificationEmail(userId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiResendVerificationEmail(userId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiResendVerificationEmail"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update workspace member role.
     * @summary Update Member Role
     * @param {string} workspaceId 
     * @param {string} userId 
     * @param {UpdateMemberRoleRequest} updateMemberRoleRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiUpdateMemberRole(workspaceId, userId, updateMemberRoleRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiUpdateMemberRole(workspaceId, userId, updateMemberRoleRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiUpdateMemberRole"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update user\'s workspace (add to workspace or move between workspaces).
     * @summary Update User Workspace
     * @param {string} userId 
     * @param {UpdateUserWorkspaceRequest} updateUserWorkspaceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiUpdateUserWorkspace(userId, updateUserWorkspaceRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiUpdateUserWorkspace(userId, updateUserWorkspaceRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiUpdateUserWorkspace"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update workspace details.
     * @summary Update Workspace
     * @param {string} workspaceId 
     * @param {WorkspaceUpdateRequest} workspaceUpdateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAdminPortalApiUpdateWorkspace(workspaceId, workspaceUpdateRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAdminPortalApiUpdateWorkspace(workspaceId, workspaceUpdateRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AdminApi.appsAdminPortalApiUpdateWorkspace"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var AdminApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = AdminApiFp(configuration);
  return {
    /**
     * Activate a user account (set email_verified=True).
     * @summary Activate User
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiActivateUser(userId, options) {
      return localVarFp.appsAdminPortalApiActivateUser(userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Comprehensive health check for admin service.
     * @summary Admin Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiAdminHealthCheck(options) {
      return localVarFp.appsAdminPortalApiAdminHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Simple health check for admin API (requires admin auth).
     * @summary Admin Ping
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiAdminPing(options) {
      return localVarFp.appsAdminPortalApiAdminPing(options).then((request) => request(axios2, basePath));
    },
    /**
     * Admin-initiated password reset for a user.
     * @summary Admin Reset Password
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiAdminResetPassword(userId, options) {
      return localVarFp.appsAdminPortalApiAdminResetPassword(userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Approve a pending user account (for beta signups requiring approval).
     * @summary Approve User
     * @param {string} userId 
     * @param {UserApprovalRequest} userApprovalRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiApproveUser(userId, userApprovalRequest, options) {
      return localVarFp.appsAdminPortalApiApproveUser(userId, userApprovalRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Deactivate a user account (set email_verified=False).
     * @summary Deactivate User
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiDeactivateUser(userId, options) {
      return localVarFp.appsAdminPortalApiDeactivateUser(userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete workspace (hard delete with safety checks). Workspace must have 0 members before deletion. Cancels Stripe subscription and deletes all related data via CASCADE.
     * @summary Delete Workspace
     * @param {string} workspaceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiDeleteWorkspace(workspaceId, options) {
      return localVarFp.appsAdminPortalApiDeleteWorkspace(workspaceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get usage statistics for a specific user.
     * @summary Get User Usage
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiGetUserUsage(userId, options) {
      return localVarFp.appsAdminPortalApiGetUserUsage(userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get detailed information about a specific workspace.
     * @summary Get Workspace
     * @param {string} workspaceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiGetWorkspace(workspaceId, options) {
      return localVarFp.appsAdminPortalApiGetWorkspace(workspaceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get paginated list of members in a workspace.
     * @summary Get Workspace Members
     * @param {string} workspaceId 
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiGetWorkspaceMembers(workspaceId, page, limit, options) {
      return localVarFp.appsAdminPortalApiGetWorkspaceMembers(workspaceId, page, limit, options).then((request) => request(axios2, basePath));
    },
    /**
     * Invite new user to a workspace via email.  If workspace_id is None or empty, creates a new workspace for the user. The user becomes owner of new workspaces, or gets the requested role for existing ones.
     * @summary Invite User
     * @param {UserInviteRequest} userInviteRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiInviteUser(userInviteRequest, options) {
      return localVarFp.appsAdminPortalApiInviteUser(userInviteRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * List all users pending admin approval.
     * @summary List Pending Users
     * @param {number} [limit] 
     * @param {string | null} [cursor] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiListPendingUsers(limit, cursor, options) {
      return localVarFp.appsAdminPortalApiListPendingUsers(limit, cursor, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get paginated list of users with filtering options.
     * @summary List Users
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {string | null} [search] 
     * @param {string | null} [role] 
     * @param {string | null} [status] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiListUsers(page, limit, search, role, status, options) {
      return localVarFp.appsAdminPortalApiListUsers(page, limit, search, role, status, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get paginated list of workspaces with filtering options.
     * @summary List Workspaces
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiListWorkspaces(page, limit, search, options) {
      return localVarFp.appsAdminPortalApiListWorkspaces(page, limit, search, options).then((request) => request(axios2, basePath));
    },
    /**
     * Reject a pending user account.
     * @summary Reject User
     * @param {string} userId 
     * @param {UserRejectionRequest} userRejectionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiRejectUser(userId, userRejectionRequest, options) {
      return localVarFp.appsAdminPortalApiRejectUser(userId, userRejectionRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Remove member from workspace.
     * @summary Remove Member
     * @param {string} workspaceId 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiRemoveMember(workspaceId, userId, options) {
      return localVarFp.appsAdminPortalApiRemoveMember(workspaceId, userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Remove user from their workspace.
     * @summary Remove User Workspace
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiRemoveUserWorkspace(userId, options) {
      return localVarFp.appsAdminPortalApiRemoveUserWorkspace(userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Resend password reset email to a user.
     * @summary Resend Password Reset
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiResendPasswordReset(userId, options) {
      return localVarFp.appsAdminPortalApiResendPasswordReset(userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Resend email verification to a user.
     * @summary Resend Verification Email
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiResendVerificationEmail(userId, options) {
      return localVarFp.appsAdminPortalApiResendVerificationEmail(userId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update workspace member role.
     * @summary Update Member Role
     * @param {string} workspaceId 
     * @param {string} userId 
     * @param {UpdateMemberRoleRequest} updateMemberRoleRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiUpdateMemberRole(workspaceId, userId, updateMemberRoleRequest, options) {
      return localVarFp.appsAdminPortalApiUpdateMemberRole(workspaceId, userId, updateMemberRoleRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update user\'s workspace (add to workspace or move between workspaces).
     * @summary Update User Workspace
     * @param {string} userId 
     * @param {UpdateUserWorkspaceRequest} updateUserWorkspaceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiUpdateUserWorkspace(userId, updateUserWorkspaceRequest, options) {
      return localVarFp.appsAdminPortalApiUpdateUserWorkspace(userId, updateUserWorkspaceRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update workspace details.
     * @summary Update Workspace
     * @param {string} workspaceId 
     * @param {WorkspaceUpdateRequest} workspaceUpdateRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAdminPortalApiUpdateWorkspace(workspaceId, workspaceUpdateRequest, options) {
      return localVarFp.appsAdminPortalApiUpdateWorkspace(workspaceId, workspaceUpdateRequest, options).then((request) => request(axios2, basePath));
    }
  };
};
var AdminApi = class extends BaseAPI {
  /**
   * Activate a user account (set email_verified=True).
   * @summary Activate User
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiActivateUser(userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiActivateUser(userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Comprehensive health check for admin service.
   * @summary Admin Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiAdminHealthCheck(options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiAdminHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Simple health check for admin API (requires admin auth).
   * @summary Admin Ping
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiAdminPing(options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiAdminPing(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Admin-initiated password reset for a user.
   * @summary Admin Reset Password
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiAdminResetPassword(userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiAdminResetPassword(userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Approve a pending user account (for beta signups requiring approval).
   * @summary Approve User
   * @param {string} userId 
   * @param {UserApprovalRequest} userApprovalRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiApproveUser(userId, userApprovalRequest, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiApproveUser(userId, userApprovalRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Deactivate a user account (set email_verified=False).
   * @summary Deactivate User
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiDeactivateUser(userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiDeactivateUser(userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete workspace (hard delete with safety checks). Workspace must have 0 members before deletion. Cancels Stripe subscription and deletes all related data via CASCADE.
   * @summary Delete Workspace
   * @param {string} workspaceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiDeleteWorkspace(workspaceId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiDeleteWorkspace(workspaceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get usage statistics for a specific user.
   * @summary Get User Usage
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiGetUserUsage(userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiGetUserUsage(userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get detailed information about a specific workspace.
   * @summary Get Workspace
   * @param {string} workspaceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiGetWorkspace(workspaceId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiGetWorkspace(workspaceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get paginated list of members in a workspace.
   * @summary Get Workspace Members
   * @param {string} workspaceId 
   * @param {number} [page] 
   * @param {number} [limit] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiGetWorkspaceMembers(workspaceId, page, limit, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiGetWorkspaceMembers(workspaceId, page, limit, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Invite new user to a workspace via email.  If workspace_id is None or empty, creates a new workspace for the user. The user becomes owner of new workspaces, or gets the requested role for existing ones.
   * @summary Invite User
   * @param {UserInviteRequest} userInviteRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiInviteUser(userInviteRequest, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiInviteUser(userInviteRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List all users pending admin approval.
   * @summary List Pending Users
   * @param {number} [limit] 
   * @param {string | null} [cursor] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiListPendingUsers(limit, cursor, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiListPendingUsers(limit, cursor, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get paginated list of users with filtering options.
   * @summary List Users
   * @param {number} [page] 
   * @param {number} [limit] 
   * @param {string | null} [search] 
   * @param {string | null} [role] 
   * @param {string | null} [status] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiListUsers(page, limit, search, role, status, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiListUsers(page, limit, search, role, status, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get paginated list of workspaces with filtering options.
   * @summary List Workspaces
   * @param {number} [page] 
   * @param {number} [limit] 
   * @param {string | null} [search] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiListWorkspaces(page, limit, search, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiListWorkspaces(page, limit, search, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Reject a pending user account.
   * @summary Reject User
   * @param {string} userId 
   * @param {UserRejectionRequest} userRejectionRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiRejectUser(userId, userRejectionRequest, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiRejectUser(userId, userRejectionRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Remove member from workspace.
   * @summary Remove Member
   * @param {string} workspaceId 
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiRemoveMember(workspaceId, userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiRemoveMember(workspaceId, userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Remove user from their workspace.
   * @summary Remove User Workspace
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiRemoveUserWorkspace(userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiRemoveUserWorkspace(userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Resend password reset email to a user.
   * @summary Resend Password Reset
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiResendPasswordReset(userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiResendPasswordReset(userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Resend email verification to a user.
   * @summary Resend Verification Email
   * @param {string} userId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiResendVerificationEmail(userId, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiResendVerificationEmail(userId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update workspace member role.
   * @summary Update Member Role
   * @param {string} workspaceId 
   * @param {string} userId 
   * @param {UpdateMemberRoleRequest} updateMemberRoleRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiUpdateMemberRole(workspaceId, userId, updateMemberRoleRequest, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiUpdateMemberRole(workspaceId, userId, updateMemberRoleRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update user\'s workspace (add to workspace or move between workspaces).
   * @summary Update User Workspace
   * @param {string} userId 
   * @param {UpdateUserWorkspaceRequest} updateUserWorkspaceRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiUpdateUserWorkspace(userId, updateUserWorkspaceRequest, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiUpdateUserWorkspace(userId, updateUserWorkspaceRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update workspace details.
   * @summary Update Workspace
   * @param {string} workspaceId 
   * @param {WorkspaceUpdateRequest} workspaceUpdateRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AdminApi
   */
  appsAdminPortalApiUpdateWorkspace(workspaceId, workspaceUpdateRequest, options) {
    return AdminApiFp(this.configuration).appsAdminPortalApiUpdateWorkspace(workspaceId, workspaceUpdateRequest, options).then((request) => request(this.axios, this.basePath));
  }
};
var AuthenticationApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Change password for authenticated user.
     * @summary Change Password
     * @param {ChangePasswordSchema} changePasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiChangePassword: async (changePasswordSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiChangePassword", "changePasswordSchema", changePasswordSchema);
      const localVarPath = `/api/v1/auth/change-password`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(changePasswordSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Confirm password reset with token (simpler API for backwards compatibility).  This endpoint uses the token stored directly in the user model (password_reset_token) rather than Django\'s default_token_generator with UID encoding.  Security: Tokens are stored as SHA256 hashes, so we hash the incoming token before comparison. This prevents database compromise from exposing usable tokens.
     * @summary Confirm Password Reset
     * @param {ConfirmPasswordResetSchema} confirmPasswordResetSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiConfirmPasswordReset: async (confirmPasswordResetSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiConfirmPasswordReset", "confirmPasswordResetSchema", confirmPasswordResetSchema);
      const localVarPath = `/api/v1/auth/password-reset/confirm`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(confirmPasswordResetSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Request password reset email.
     * @summary Forgot Password
     * @param {ForgotPasswordSchema} forgotPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiForgotPassword: async (forgotPasswordSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiForgotPassword", "forgotPasswordSchema", forgotPasswordSchema);
      const localVarPath = `/api/v1/auth/forgot-password`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(forgotPasswordSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get current authenticated user. Requires JWT authentication.
     * @summary Get Current User
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiGetCurrentUser: async (options = {}) => {
      const localVarPath = `/api/v1/auth/me`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get feature flags for authenticated user.
     * @summary Get Feature Flags
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiGetFeatureFlags: async (options = {}) => {
      const localVarPath = `/api/v1/auth/feature-flags`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check for authentication service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/auth/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * User login endpoint. Returns JWT access and refresh tokens, and sets HttpOnly cookies.
     * @summary Login
     * @param {LoginSchema} loginSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiLogin: async (loginSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiLogin", "loginSchema", loginSchema);
      const localVarPath = `/api/v1/auth/login`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(loginSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Logout user by revoking all refresh tokens and clearing HttpOnly cookies.
     * @summary Logout
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiLogout: async (options = {}) => {
      const localVarPath = `/api/v1/auth/logout`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Alias for /forgot-password endpoint (backwards compatibility).
     * @summary Password Reset Alias
     * @param {ForgotPasswordSchema} forgotPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiPasswordResetAlias: async (forgotPasswordSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiPasswordResetAlias", "forgotPasswordSchema", forgotPasswordSchema);
      const localVarPath = `/api/v1/auth/password-reset`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(forgotPasswordSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Refresh access token using refresh token. Supports both body payload and HttpOnly cookie for refresh token.
     * @summary Refresh Token
     * @param {RefreshTokenSchema} [refreshTokenSchema] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiRefreshToken: async (refreshTokenSchema, options = {}) => {
      const localVarPath = `/api/v1/auth/refresh`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(refreshTokenSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * DEPRECATED: User registration endpoint.  This endpoint is deprecated and will be removed in a future version. Please use /api/v1/public/signup instead, which includes: - Beta mode support with admin approval workflow - Proper admin notifications - Enhanced tracking and analytics  This endpoint remains for backward compatibility but lacks beta features.
     * @summary Register
     * @param {RegisterSchema} registerSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiRegister: async (registerSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiRegister", "registerSchema", registerSchema);
      const localVarPath = `/api/v1/auth/register`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(registerSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Resend verification email.
     * @summary Resend Verification
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiResendVerification: async (options = {}) => {
      const localVarPath = `/api/v1/auth/resend-verification`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Resend verification email (unauthenticated endpoint with rate limiting). Allows users who haven\'t verified their email to request a new verification email. Rate limited to 3 requests per hour per email to prevent abuse.
     * @summary Resend Verification Email
     * @param {ResendVerificationSchema} resendVerificationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiResendVerificationEmail: async (resendVerificationSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiResendVerificationEmail", "resendVerificationSchema", resendVerificationSchema);
      const localVarPath = `/api/v1/auth/resend-verification-email`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(resendVerificationSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * DEPRECATED: This endpoint used Django\'s default_token_generator with UID encoding.  This flow is no longer supported. All password reset links now use the simpler /password-reset/confirm endpoint with hashed token storage.  If you have an old reset link, please request a new one via /forgot-password.
     * @summary Reset Password
     * @param {ResetPasswordSchema} resetPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiResetPassword: async (resetPasswordSchema, options = {}) => {
      assertParamExists("appsAuthenticationApiResetPassword", "resetPasswordSchema", resetPasswordSchema);
      const localVarPath = `/api/v1/auth/reset-password`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(resetPasswordSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test endpoint for API key authentication.
     * @summary Test Api Key Auth
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiTestApiKeyAuth: async (options = {}) => {
      const localVarPath = `/api/v1/auth/test-api-key`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test endpoint for JWT authentication.
     * @summary Test Jwt Auth
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiTestJwtAuth: async (options = {}) => {
      const localVarPath = `/api/v1/auth/test-auth`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Verify email address (query parameter format).
     * @summary Verify Email
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiVerifyEmail: async (token, options = {}) => {
      assertParamExists("appsAuthenticationApiVerifyEmail", "token", token);
      const localVarPath = `/api/v1/auth/verify-email`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      if (token !== void 0) {
        localVarQueryParameter["token"] = token;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Verify email address (path parameter format for backwards compatibility).
     * @summary Verify Email Path
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiVerifyEmailPath: async (token, options = {}) => {
      assertParamExists("appsAuthenticationApiVerifyEmailPath", "token", token);
      const localVarPath = `/api/v1/auth/verify-email/{token}`.replace(`{${"token"}}`, encodeURIComponent(String(token)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var AuthenticationApiFp = function(configuration) {
  const localVarAxiosParamCreator = AuthenticationApiAxiosParamCreator(configuration);
  return {
    /**
     * Change password for authenticated user.
     * @summary Change Password
     * @param {ChangePasswordSchema} changePasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiChangePassword(changePasswordSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiChangePassword(changePasswordSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiChangePassword"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Confirm password reset with token (simpler API for backwards compatibility).  This endpoint uses the token stored directly in the user model (password_reset_token) rather than Django\'s default_token_generator with UID encoding.  Security: Tokens are stored as SHA256 hashes, so we hash the incoming token before comparison. This prevents database compromise from exposing usable tokens.
     * @summary Confirm Password Reset
     * @param {ConfirmPasswordResetSchema} confirmPasswordResetSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiConfirmPasswordReset(confirmPasswordResetSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiConfirmPasswordReset(confirmPasswordResetSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiConfirmPasswordReset"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Request password reset email.
     * @summary Forgot Password
     * @param {ForgotPasswordSchema} forgotPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiForgotPassword(forgotPasswordSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiForgotPassword(forgotPasswordSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiForgotPassword"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get current authenticated user. Requires JWT authentication.
     * @summary Get Current User
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiGetCurrentUser(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiGetCurrentUser(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiGetCurrentUser"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get feature flags for authenticated user.
     * @summary Get Feature Flags
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiGetFeatureFlags(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiGetFeatureFlags(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiGetFeatureFlags"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check for authentication service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * User login endpoint. Returns JWT access and refresh tokens, and sets HttpOnly cookies.
     * @summary Login
     * @param {LoginSchema} loginSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiLogin(loginSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiLogin(loginSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiLogin"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Logout user by revoking all refresh tokens and clearing HttpOnly cookies.
     * @summary Logout
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiLogout(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiLogout(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiLogout"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Alias for /forgot-password endpoint (backwards compatibility).
     * @summary Password Reset Alias
     * @param {ForgotPasswordSchema} forgotPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiPasswordResetAlias(forgotPasswordSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiPasswordResetAlias(forgotPasswordSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiPasswordResetAlias"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Refresh access token using refresh token. Supports both body payload and HttpOnly cookie for refresh token.
     * @summary Refresh Token
     * @param {RefreshTokenSchema} [refreshTokenSchema] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiRefreshToken(refreshTokenSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiRefreshToken(refreshTokenSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiRefreshToken"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * DEPRECATED: User registration endpoint.  This endpoint is deprecated and will be removed in a future version. Please use /api/v1/public/signup instead, which includes: - Beta mode support with admin approval workflow - Proper admin notifications - Enhanced tracking and analytics  This endpoint remains for backward compatibility but lacks beta features.
     * @summary Register
     * @param {RegisterSchema} registerSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiRegister(registerSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiRegister(registerSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiRegister"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Resend verification email.
     * @summary Resend Verification
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiResendVerification(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiResendVerification(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiResendVerification"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Resend verification email (unauthenticated endpoint with rate limiting). Allows users who haven\'t verified their email to request a new verification email. Rate limited to 3 requests per hour per email to prevent abuse.
     * @summary Resend Verification Email
     * @param {ResendVerificationSchema} resendVerificationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiResendVerificationEmail(resendVerificationSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiResendVerificationEmail(resendVerificationSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiResendVerificationEmail"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * DEPRECATED: This endpoint used Django\'s default_token_generator with UID encoding.  This flow is no longer supported. All password reset links now use the simpler /password-reset/confirm endpoint with hashed token storage.  If you have an old reset link, please request a new one via /forgot-password.
     * @summary Reset Password
     * @param {ResetPasswordSchema} resetPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiResetPassword(resetPasswordSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiResetPassword(resetPasswordSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiResetPassword"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test endpoint for API key authentication.
     * @summary Test Api Key Auth
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiTestApiKeyAuth(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiTestApiKeyAuth(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiTestApiKeyAuth"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test endpoint for JWT authentication.
     * @summary Test Jwt Auth
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiTestJwtAuth(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiTestJwtAuth(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiTestJwtAuth"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Verify email address (query parameter format).
     * @summary Verify Email
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiVerifyEmail(token, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiVerifyEmail(token, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiVerifyEmail"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Verify email address (path parameter format for backwards compatibility).
     * @summary Verify Email Path
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationApiVerifyEmailPath(token, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationApiVerifyEmailPath(token, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthenticationApi.appsAuthenticationApiVerifyEmailPath"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var AuthenticationApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = AuthenticationApiFp(configuration);
  return {
    /**
     * Change password for authenticated user.
     * @summary Change Password
     * @param {ChangePasswordSchema} changePasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiChangePassword(changePasswordSchema, options) {
      return localVarFp.appsAuthenticationApiChangePassword(changePasswordSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Confirm password reset with token (simpler API for backwards compatibility).  This endpoint uses the token stored directly in the user model (password_reset_token) rather than Django\'s default_token_generator with UID encoding.  Security: Tokens are stored as SHA256 hashes, so we hash the incoming token before comparison. This prevents database compromise from exposing usable tokens.
     * @summary Confirm Password Reset
     * @param {ConfirmPasswordResetSchema} confirmPasswordResetSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiConfirmPasswordReset(confirmPasswordResetSchema, options) {
      return localVarFp.appsAuthenticationApiConfirmPasswordReset(confirmPasswordResetSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Request password reset email.
     * @summary Forgot Password
     * @param {ForgotPasswordSchema} forgotPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiForgotPassword(forgotPasswordSchema, options) {
      return localVarFp.appsAuthenticationApiForgotPassword(forgotPasswordSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get current authenticated user. Requires JWT authentication.
     * @summary Get Current User
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiGetCurrentUser(options) {
      return localVarFp.appsAuthenticationApiGetCurrentUser(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get feature flags for authenticated user.
     * @summary Get Feature Flags
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiGetFeatureFlags(options) {
      return localVarFp.appsAuthenticationApiGetFeatureFlags(options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check for authentication service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiHealthCheck(options) {
      return localVarFp.appsAuthenticationApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * User login endpoint. Returns JWT access and refresh tokens, and sets HttpOnly cookies.
     * @summary Login
     * @param {LoginSchema} loginSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiLogin(loginSchema, options) {
      return localVarFp.appsAuthenticationApiLogin(loginSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Logout user by revoking all refresh tokens and clearing HttpOnly cookies.
     * @summary Logout
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiLogout(options) {
      return localVarFp.appsAuthenticationApiLogout(options).then((request) => request(axios2, basePath));
    },
    /**
     * Alias for /forgot-password endpoint (backwards compatibility).
     * @summary Password Reset Alias
     * @param {ForgotPasswordSchema} forgotPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiPasswordResetAlias(forgotPasswordSchema, options) {
      return localVarFp.appsAuthenticationApiPasswordResetAlias(forgotPasswordSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Refresh access token using refresh token. Supports both body payload and HttpOnly cookie for refresh token.
     * @summary Refresh Token
     * @param {RefreshTokenSchema} [refreshTokenSchema] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiRefreshToken(refreshTokenSchema, options) {
      return localVarFp.appsAuthenticationApiRefreshToken(refreshTokenSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * DEPRECATED: User registration endpoint.  This endpoint is deprecated and will be removed in a future version. Please use /api/v1/public/signup instead, which includes: - Beta mode support with admin approval workflow - Proper admin notifications - Enhanced tracking and analytics  This endpoint remains for backward compatibility but lacks beta features.
     * @summary Register
     * @param {RegisterSchema} registerSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiRegister(registerSchema, options) {
      return localVarFp.appsAuthenticationApiRegister(registerSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Resend verification email.
     * @summary Resend Verification
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiResendVerification(options) {
      return localVarFp.appsAuthenticationApiResendVerification(options).then((request) => request(axios2, basePath));
    },
    /**
     * Resend verification email (unauthenticated endpoint with rate limiting). Allows users who haven\'t verified their email to request a new verification email. Rate limited to 3 requests per hour per email to prevent abuse.
     * @summary Resend Verification Email
     * @param {ResendVerificationSchema} resendVerificationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiResendVerificationEmail(resendVerificationSchema, options) {
      return localVarFp.appsAuthenticationApiResendVerificationEmail(resendVerificationSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * DEPRECATED: This endpoint used Django\'s default_token_generator with UID encoding.  This flow is no longer supported. All password reset links now use the simpler /password-reset/confirm endpoint with hashed token storage.  If you have an old reset link, please request a new one via /forgot-password.
     * @summary Reset Password
     * @param {ResetPasswordSchema} resetPasswordSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiResetPassword(resetPasswordSchema, options) {
      return localVarFp.appsAuthenticationApiResetPassword(resetPasswordSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Test endpoint for API key authentication.
     * @summary Test Api Key Auth
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiTestApiKeyAuth(options) {
      return localVarFp.appsAuthenticationApiTestApiKeyAuth(options).then((request) => request(axios2, basePath));
    },
    /**
     * Test endpoint for JWT authentication.
     * @summary Test Jwt Auth
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiTestJwtAuth(options) {
      return localVarFp.appsAuthenticationApiTestJwtAuth(options).then((request) => request(axios2, basePath));
    },
    /**
     * Verify email address (query parameter format).
     * @summary Verify Email
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiVerifyEmail(token, options) {
      return localVarFp.appsAuthenticationApiVerifyEmail(token, options).then((request) => request(axios2, basePath));
    },
    /**
     * Verify email address (path parameter format for backwards compatibility).
     * @summary Verify Email Path
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationApiVerifyEmailPath(token, options) {
      return localVarFp.appsAuthenticationApiVerifyEmailPath(token, options).then((request) => request(axios2, basePath));
    }
  };
};
var AuthenticationApi = class extends BaseAPI {
  /**
   * Change password for authenticated user.
   * @summary Change Password
   * @param {ChangePasswordSchema} changePasswordSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiChangePassword(changePasswordSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiChangePassword(changePasswordSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Confirm password reset with token (simpler API for backwards compatibility).  This endpoint uses the token stored directly in the user model (password_reset_token) rather than Django\'s default_token_generator with UID encoding.  Security: Tokens are stored as SHA256 hashes, so we hash the incoming token before comparison. This prevents database compromise from exposing usable tokens.
   * @summary Confirm Password Reset
   * @param {ConfirmPasswordResetSchema} confirmPasswordResetSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiConfirmPasswordReset(confirmPasswordResetSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiConfirmPasswordReset(confirmPasswordResetSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Request password reset email.
   * @summary Forgot Password
   * @param {ForgotPasswordSchema} forgotPasswordSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiForgotPassword(forgotPasswordSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiForgotPassword(forgotPasswordSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get current authenticated user. Requires JWT authentication.
   * @summary Get Current User
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiGetCurrentUser(options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiGetCurrentUser(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get feature flags for authenticated user.
   * @summary Get Feature Flags
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiGetFeatureFlags(options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiGetFeatureFlags(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check for authentication service.
   * @summary Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiHealthCheck(options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * User login endpoint. Returns JWT access and refresh tokens, and sets HttpOnly cookies.
   * @summary Login
   * @param {LoginSchema} loginSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiLogin(loginSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiLogin(loginSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Logout user by revoking all refresh tokens and clearing HttpOnly cookies.
   * @summary Logout
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiLogout(options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiLogout(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Alias for /forgot-password endpoint (backwards compatibility).
   * @summary Password Reset Alias
   * @param {ForgotPasswordSchema} forgotPasswordSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiPasswordResetAlias(forgotPasswordSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiPasswordResetAlias(forgotPasswordSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Refresh access token using refresh token. Supports both body payload and HttpOnly cookie for refresh token.
   * @summary Refresh Token
   * @param {RefreshTokenSchema} [refreshTokenSchema] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiRefreshToken(refreshTokenSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiRefreshToken(refreshTokenSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * DEPRECATED: User registration endpoint.  This endpoint is deprecated and will be removed in a future version. Please use /api/v1/public/signup instead, which includes: - Beta mode support with admin approval workflow - Proper admin notifications - Enhanced tracking and analytics  This endpoint remains for backward compatibility but lacks beta features.
   * @summary Register
   * @param {RegisterSchema} registerSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiRegister(registerSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiRegister(registerSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Resend verification email.
   * @summary Resend Verification
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiResendVerification(options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiResendVerification(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Resend verification email (unauthenticated endpoint with rate limiting). Allows users who haven\'t verified their email to request a new verification email. Rate limited to 3 requests per hour per email to prevent abuse.
   * @summary Resend Verification Email
   * @param {ResendVerificationSchema} resendVerificationSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiResendVerificationEmail(resendVerificationSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiResendVerificationEmail(resendVerificationSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * DEPRECATED: This endpoint used Django\'s default_token_generator with UID encoding.  This flow is no longer supported. All password reset links now use the simpler /password-reset/confirm endpoint with hashed token storage.  If you have an old reset link, please request a new one via /forgot-password.
   * @summary Reset Password
   * @param {ResetPasswordSchema} resetPasswordSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiResetPassword(resetPasswordSchema, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiResetPassword(resetPasswordSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test endpoint for API key authentication.
   * @summary Test Api Key Auth
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiTestApiKeyAuth(options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiTestApiKeyAuth(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test endpoint for JWT authentication.
   * @summary Test Jwt Auth
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiTestJwtAuth(options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiTestJwtAuth(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Verify email address (query parameter format).
   * @summary Verify Email
   * @param {string} token 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiVerifyEmail(token, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiVerifyEmail(token, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Verify email address (path parameter format for backwards compatibility).
   * @summary Verify Email Path
   * @param {string} token 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  appsAuthenticationApiVerifyEmailPath(token, options) {
    return AuthenticationApiFp(this.configuration).appsAuthenticationApiVerifyEmailPath(token, options).then((request) => request(this.axios, this.basePath));
  }
};
var BillingApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Add a new payment method
     * @summary Add Payment Method
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiAddPaymentMethod: async (body, options = {}) => {
      assertParamExists("appsSubscriptionsBillingApiAddPaymentMethod", "body", body);
      const localVarPath = `/api/v1/billing/payment-methods`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Cancel subscription at period end
     * @summary Cancel Subscription
     * @param {string} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiCancelSubscription: async (body, options = {}) => {
      const localVarPath = `/api/v1/billing/cancel-subscription`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Change subscription plan
     * @summary Change Plan
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiChangePlan: async (body, options = {}) => {
      assertParamExists("appsSubscriptionsBillingApiChangePlan", "body", body);
      const localVarPath = `/api/v1/billing/change-plan`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create Stripe setup intent for adding payment method
     * @summary Create Setup Intent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiCreateSetupIntent: async (options = {}) => {
      const localVarPath = `/api/v1/billing/create-setup-intent`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get invoice download URL
     * @summary Download Invoice
     * @param {string} invoiceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiDownloadInvoice: async (invoiceId, options = {}) => {
      assertParamExists("appsSubscriptionsBillingApiDownloadInvoice", "invoiceId", invoiceId);
      const localVarPath = `/api/v1/billing/invoices/{invoice_id}/download`.replace(`{${"invoice_id"}}`, encodeURIComponent(String(invoiceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get specific invoice details
     * @summary Get Invoice
     * @param {string} invoiceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiGetInvoice: async (invoiceId, options = {}) => {
      assertParamExists("appsSubscriptionsBillingApiGetInvoice", "invoiceId", invoiceId);
      const localVarPath = `/api/v1/billing/invoices/{invoice_id}`.replace(`{${"invoice_id"}}`, encodeURIComponent(String(invoiceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List user\'s invoices
     * @summary List Invoices
     * @param {number} [limit] 
     * @param {string} [startingAfter] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiListInvoices: async (limit, startingAfter, options = {}) => {
      const localVarPath = `/api/v1/billing/invoices`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (startingAfter !== void 0) {
        localVarQueryParameter["starting_after"] = startingAfter;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List user\'s payment methods
     * @summary List Payment Methods
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiListPaymentMethods: async (options = {}) => {
      const localVarPath = `/api/v1/billing/payment-methods`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Preview prorated charges for plan change
     * @summary Preview Plan Change
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiPreviewPlanChange: async (body, options = {}) => {
      assertParamExists("appsSubscriptionsBillingApiPreviewPlanChange", "body", body);
      const localVarPath = `/api/v1/billing/preview-plan-change`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Reactivate a cancelled subscription
     * @summary Reactivate Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiReactivateSubscription: async (options = {}) => {
      const localVarPath = `/api/v1/billing/reactivate-subscription`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Remove a payment method
     * @summary Remove Payment Method
     * @param {string} pmId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiRemovePaymentMethod: async (pmId, options = {}) => {
      assertParamExists("appsSubscriptionsBillingApiRemovePaymentMethod", "pmId", pmId);
      const localVarPath = `/api/v1/billing/payment-methods/{pm_id}`.replace(`{${"pm_id"}}`, encodeURIComponent(String(pmId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Set payment method as default
     * @summary Set Default Payment Method
     * @param {string} pmId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiSetDefaultPaymentMethod: async (pmId, options = {}) => {
      assertParamExists("appsSubscriptionsBillingApiSetDefaultPaymentMethod", "pmId", pmId);
      const localVarPath = `/api/v1/billing/payment-methods/{pm_id}/default`.replace(`{${"pm_id"}}`, encodeURIComponent(String(pmId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var BillingApiFp = function(configuration) {
  const localVarAxiosParamCreator = BillingApiAxiosParamCreator(configuration);
  return {
    /**
     * Add a new payment method
     * @summary Add Payment Method
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiAddPaymentMethod(body, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiAddPaymentMethod(body, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiAddPaymentMethod"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Cancel subscription at period end
     * @summary Cancel Subscription
     * @param {string} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiCancelSubscription(body, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiCancelSubscription(body, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiCancelSubscription"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Change subscription plan
     * @summary Change Plan
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiChangePlan(body, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiChangePlan(body, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiChangePlan"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create Stripe setup intent for adding payment method
     * @summary Create Setup Intent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiCreateSetupIntent(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiCreateSetupIntent(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiCreateSetupIntent"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get invoice download URL
     * @summary Download Invoice
     * @param {string} invoiceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiDownloadInvoice(invoiceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiDownloadInvoice(invoiceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiDownloadInvoice"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get specific invoice details
     * @summary Get Invoice
     * @param {string} invoiceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiGetInvoice(invoiceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiGetInvoice(invoiceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiGetInvoice"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List user\'s invoices
     * @summary List Invoices
     * @param {number} [limit] 
     * @param {string} [startingAfter] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiListInvoices(limit, startingAfter, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiListInvoices(limit, startingAfter, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiListInvoices"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List user\'s payment methods
     * @summary List Payment Methods
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiListPaymentMethods(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiListPaymentMethods(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiListPaymentMethods"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Preview prorated charges for plan change
     * @summary Preview Plan Change
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiPreviewPlanChange(body, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiPreviewPlanChange(body, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiPreviewPlanChange"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Reactivate a cancelled subscription
     * @summary Reactivate Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiReactivateSubscription(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiReactivateSubscription(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiReactivateSubscription"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Remove a payment method
     * @summary Remove Payment Method
     * @param {string} pmId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiRemovePaymentMethod(pmId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiRemovePaymentMethod(pmId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiRemovePaymentMethod"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Set payment method as default
     * @summary Set Default Payment Method
     * @param {string} pmId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsBillingApiSetDefaultPaymentMethod(pmId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsBillingApiSetDefaultPaymentMethod(pmId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["BillingApi.appsSubscriptionsBillingApiSetDefaultPaymentMethod"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var BillingApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = BillingApiFp(configuration);
  return {
    /**
     * Add a new payment method
     * @summary Add Payment Method
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiAddPaymentMethod(body, options) {
      return localVarFp.appsSubscriptionsBillingApiAddPaymentMethod(body, options).then((request) => request(axios2, basePath));
    },
    /**
     * Cancel subscription at period end
     * @summary Cancel Subscription
     * @param {string} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiCancelSubscription(body, options) {
      return localVarFp.appsSubscriptionsBillingApiCancelSubscription(body, options).then((request) => request(axios2, basePath));
    },
    /**
     * Change subscription plan
     * @summary Change Plan
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiChangePlan(body, options) {
      return localVarFp.appsSubscriptionsBillingApiChangePlan(body, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create Stripe setup intent for adding payment method
     * @summary Create Setup Intent
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiCreateSetupIntent(options) {
      return localVarFp.appsSubscriptionsBillingApiCreateSetupIntent(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get invoice download URL
     * @summary Download Invoice
     * @param {string} invoiceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiDownloadInvoice(invoiceId, options) {
      return localVarFp.appsSubscriptionsBillingApiDownloadInvoice(invoiceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get specific invoice details
     * @summary Get Invoice
     * @param {string} invoiceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiGetInvoice(invoiceId, options) {
      return localVarFp.appsSubscriptionsBillingApiGetInvoice(invoiceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * List user\'s invoices
     * @summary List Invoices
     * @param {number} [limit] 
     * @param {string} [startingAfter] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiListInvoices(limit, startingAfter, options) {
      return localVarFp.appsSubscriptionsBillingApiListInvoices(limit, startingAfter, options).then((request) => request(axios2, basePath));
    },
    /**
     * List user\'s payment methods
     * @summary List Payment Methods
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiListPaymentMethods(options) {
      return localVarFp.appsSubscriptionsBillingApiListPaymentMethods(options).then((request) => request(axios2, basePath));
    },
    /**
     * Preview prorated charges for plan change
     * @summary Preview Plan Change
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiPreviewPlanChange(body, options) {
      return localVarFp.appsSubscriptionsBillingApiPreviewPlanChange(body, options).then((request) => request(axios2, basePath));
    },
    /**
     * Reactivate a cancelled subscription
     * @summary Reactivate Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiReactivateSubscription(options) {
      return localVarFp.appsSubscriptionsBillingApiReactivateSubscription(options).then((request) => request(axios2, basePath));
    },
    /**
     * Remove a payment method
     * @summary Remove Payment Method
     * @param {string} pmId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiRemovePaymentMethod(pmId, options) {
      return localVarFp.appsSubscriptionsBillingApiRemovePaymentMethod(pmId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Set payment method as default
     * @summary Set Default Payment Method
     * @param {string} pmId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsBillingApiSetDefaultPaymentMethod(pmId, options) {
      return localVarFp.appsSubscriptionsBillingApiSetDefaultPaymentMethod(pmId, options).then((request) => request(axios2, basePath));
    }
  };
};
var BillingApi = class extends BaseAPI {
  /**
   * Add a new payment method
   * @summary Add Payment Method
   * @param {string} body 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiAddPaymentMethod(body, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiAddPaymentMethod(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Cancel subscription at period end
   * @summary Cancel Subscription
   * @param {string} [body] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiCancelSubscription(body, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiCancelSubscription(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Change subscription plan
   * @summary Change Plan
   * @param {string} body 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiChangePlan(body, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiChangePlan(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create Stripe setup intent for adding payment method
   * @summary Create Setup Intent
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiCreateSetupIntent(options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiCreateSetupIntent(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get invoice download URL
   * @summary Download Invoice
   * @param {string} invoiceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiDownloadInvoice(invoiceId, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiDownloadInvoice(invoiceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get specific invoice details
   * @summary Get Invoice
   * @param {string} invoiceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiGetInvoice(invoiceId, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiGetInvoice(invoiceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List user\'s invoices
   * @summary List Invoices
   * @param {number} [limit] 
   * @param {string} [startingAfter] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiListInvoices(limit, startingAfter, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiListInvoices(limit, startingAfter, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List user\'s payment methods
   * @summary List Payment Methods
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiListPaymentMethods(options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiListPaymentMethods(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Preview prorated charges for plan change
   * @summary Preview Plan Change
   * @param {string} body 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiPreviewPlanChange(body, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiPreviewPlanChange(body, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Reactivate a cancelled subscription
   * @summary Reactivate Subscription
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiReactivateSubscription(options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiReactivateSubscription(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Remove a payment method
   * @summary Remove Payment Method
   * @param {string} pmId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiRemovePaymentMethod(pmId, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiRemovePaymentMethod(pmId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Set payment method as default
   * @summary Set Default Payment Method
   * @param {string} pmId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BillingApi
   */
  appsSubscriptionsBillingApiSetDefaultPaymentMethod(pmId, options) {
    return BillingApiFp(this.configuration).appsSubscriptionsBillingApiSetDefaultPaymentMethod(pmId, options).then((request) => request(this.axios, this.basePath));
  }
};
var DefaultApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Disconnect an OAuth provider from user account.
     * @summary Disconnect Oauth Account
     * @param {string} provider 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiDisconnectOauthAccount: async (provider, options = {}) => {
      assertParamExists("appsAuthenticationOauthApiDisconnectOauthAccount", "provider", provider);
      const localVarPath = `/api/v1/auth/oauth/{provider}/disconnect`.replace(`{${"provider"}}`, encodeURIComponent(String(provider)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get list of OAuth providers linked to user account.
     * @summary Get Linked Accounts
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiGetLinkedAccounts: async (options = {}) => {
      const localVarPath = `/api/v1/auth/oauth/user/linked-accounts`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get list of available OAuth providers
     * @summary Get Oauth Providers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiGetOauthProviders: async (options = {}) => {
      const localVarPath = `/api/v1/auth/oauth/providers`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Link an OAuth provider to an existing authenticated user account.
     * @summary Link Oauth Account
     * @param {string} provider 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiLinkOauthAccount: async (provider, options = {}) => {
      assertParamExists("appsAuthenticationOauthApiLinkOauthAccount", "provider", provider);
      const localVarPath = `/api/v1/auth/oauth/{provider}/link`.replace(`{${"provider"}}`, encodeURIComponent(String(provider)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Initialize OAuth flow for a provider. Returns authorization URL to redirect user to.
     * @summary Oauth Authorize
     * @param {string} provider 
     * @param {string | null} [next] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiOauthAuthorize: async (provider, next, options = {}) => {
      assertParamExists("appsAuthenticationOauthApiOauthAuthorize", "provider", provider);
      const localVarPath = `/api/v1/auth/oauth/{provider}/authorize`.replace(`{${"provider"}}`, encodeURIComponent(String(provider)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      if (next !== void 0) {
        localVarQueryParameter["next"] = next;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Handle OAuth callback from provider. Exchanges code for tokens and creates/links user account.
     * @summary Oauth Callback
     * @param {string} provider 
     * @param {OAuthCallbackQuery} oAuthCallbackQuery 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiOauthCallback: async (provider, oAuthCallbackQuery, options = {}) => {
      assertParamExists("appsAuthenticationOauthApiOauthCallback", "provider", provider);
      assertParamExists("appsAuthenticationOauthApiOauthCallback", "oAuthCallbackQuery", oAuthCallbackQuery);
      const localVarPath = `/api/v1/auth/oauth/{provider}/callback`.replace(`{${"provider"}}`, encodeURIComponent(String(provider)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(oAuthCallbackQuery, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Handle email unsubscribe requests.  Verifies the signed timestamped token (max 90 days old) and adds the email to the blacklist. This endpoint is public (no authentication required) to allow one-click unsubscribe from emails.  Rate limited to 10 requests per minute per IP to prevent abuse.
     * @summary Unsubscribe
     * @param {UnsubscribeRequest} unsubscribeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailUnsubscribeUnsubscribe: async (unsubscribeRequest, options = {}) => {
      assertParamExists("appsEmailUnsubscribeUnsubscribe", "unsubscribeRequest", unsubscribeRequest);
      const localVarPath = `/api/v1/email/unsubscribe`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(unsubscribeRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Verify an unsubscribe token without actually unsubscribing.  This can be used by the frontend to show a confirmation page before the user confirms they want to unsubscribe.
     * @summary Verify Unsubscribe Token
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailUnsubscribeVerifyUnsubscribeToken: async (token, options = {}) => {
      assertParamExists("appsEmailUnsubscribeVerifyUnsubscribeToken", "token", token);
      const localVarPath = `/api/v1/email/unsubscribe/verify`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      if (token !== void 0) {
        localVarQueryParameter["token"] = token;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var DefaultApiFp = function(configuration) {
  const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration);
  return {
    /**
     * Disconnect an OAuth provider from user account.
     * @summary Disconnect Oauth Account
     * @param {string} provider 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationOauthApiDisconnectOauthAccount(provider, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationOauthApiDisconnectOauthAccount(provider, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsAuthenticationOauthApiDisconnectOauthAccount"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get list of OAuth providers linked to user account.
     * @summary Get Linked Accounts
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationOauthApiGetLinkedAccounts(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationOauthApiGetLinkedAccounts(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsAuthenticationOauthApiGetLinkedAccounts"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get list of available OAuth providers
     * @summary Get Oauth Providers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationOauthApiGetOauthProviders(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationOauthApiGetOauthProviders(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsAuthenticationOauthApiGetOauthProviders"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Link an OAuth provider to an existing authenticated user account.
     * @summary Link Oauth Account
     * @param {string} provider 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationOauthApiLinkOauthAccount(provider, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationOauthApiLinkOauthAccount(provider, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsAuthenticationOauthApiLinkOauthAccount"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Initialize OAuth flow for a provider. Returns authorization URL to redirect user to.
     * @summary Oauth Authorize
     * @param {string} provider 
     * @param {string | null} [next] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationOauthApiOauthAuthorize(provider, next, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationOauthApiOauthAuthorize(provider, next, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsAuthenticationOauthApiOauthAuthorize"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Handle OAuth callback from provider. Exchanges code for tokens and creates/links user account.
     * @summary Oauth Callback
     * @param {string} provider 
     * @param {OAuthCallbackQuery} oAuthCallbackQuery 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsAuthenticationOauthApiOauthCallback(provider, oAuthCallbackQuery, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsAuthenticationOauthApiOauthCallback(provider, oAuthCallbackQuery, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsAuthenticationOauthApiOauthCallback"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Handle email unsubscribe requests.  Verifies the signed timestamped token (max 90 days old) and adds the email to the blacklist. This endpoint is public (no authentication required) to allow one-click unsubscribe from emails.  Rate limited to 10 requests per minute per IP to prevent abuse.
     * @summary Unsubscribe
     * @param {UnsubscribeRequest} unsubscribeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailUnsubscribeUnsubscribe(unsubscribeRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailUnsubscribeUnsubscribe(unsubscribeRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsEmailUnsubscribeUnsubscribe"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Verify an unsubscribe token without actually unsubscribing.  This can be used by the frontend to show a confirmation page before the user confirms they want to unsubscribe.
     * @summary Verify Unsubscribe Token
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailUnsubscribeVerifyUnsubscribeToken(token, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailUnsubscribeVerifyUnsubscribeToken(token, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DefaultApi.appsEmailUnsubscribeVerifyUnsubscribeToken"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var DefaultApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = DefaultApiFp(configuration);
  return {
    /**
     * Disconnect an OAuth provider from user account.
     * @summary Disconnect Oauth Account
     * @param {string} provider 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiDisconnectOauthAccount(provider, options) {
      return localVarFp.appsAuthenticationOauthApiDisconnectOauthAccount(provider, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get list of OAuth providers linked to user account.
     * @summary Get Linked Accounts
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiGetLinkedAccounts(options) {
      return localVarFp.appsAuthenticationOauthApiGetLinkedAccounts(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get list of available OAuth providers
     * @summary Get Oauth Providers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiGetOauthProviders(options) {
      return localVarFp.appsAuthenticationOauthApiGetOauthProviders(options).then((request) => request(axios2, basePath));
    },
    /**
     * Link an OAuth provider to an existing authenticated user account.
     * @summary Link Oauth Account
     * @param {string} provider 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiLinkOauthAccount(provider, options) {
      return localVarFp.appsAuthenticationOauthApiLinkOauthAccount(provider, options).then((request) => request(axios2, basePath));
    },
    /**
     * Initialize OAuth flow for a provider. Returns authorization URL to redirect user to.
     * @summary Oauth Authorize
     * @param {string} provider 
     * @param {string | null} [next] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiOauthAuthorize(provider, next, options) {
      return localVarFp.appsAuthenticationOauthApiOauthAuthorize(provider, next, options).then((request) => request(axios2, basePath));
    },
    /**
     * Handle OAuth callback from provider. Exchanges code for tokens and creates/links user account.
     * @summary Oauth Callback
     * @param {string} provider 
     * @param {OAuthCallbackQuery} oAuthCallbackQuery 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsAuthenticationOauthApiOauthCallback(provider, oAuthCallbackQuery, options) {
      return localVarFp.appsAuthenticationOauthApiOauthCallback(provider, oAuthCallbackQuery, options).then((request) => request(axios2, basePath));
    },
    /**
     * Handle email unsubscribe requests.  Verifies the signed timestamped token (max 90 days old) and adds the email to the blacklist. This endpoint is public (no authentication required) to allow one-click unsubscribe from emails.  Rate limited to 10 requests per minute per IP to prevent abuse.
     * @summary Unsubscribe
     * @param {UnsubscribeRequest} unsubscribeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailUnsubscribeUnsubscribe(unsubscribeRequest, options) {
      return localVarFp.appsEmailUnsubscribeUnsubscribe(unsubscribeRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Verify an unsubscribe token without actually unsubscribing.  This can be used by the frontend to show a confirmation page before the user confirms they want to unsubscribe.
     * @summary Verify Unsubscribe Token
     * @param {string} token 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailUnsubscribeVerifyUnsubscribeToken(token, options) {
      return localVarFp.appsEmailUnsubscribeVerifyUnsubscribeToken(token, options).then((request) => request(axios2, basePath));
    }
  };
};
var DefaultApi = class extends BaseAPI {
  /**
   * Disconnect an OAuth provider from user account.
   * @summary Disconnect Oauth Account
   * @param {string} provider 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsAuthenticationOauthApiDisconnectOauthAccount(provider, options) {
    return DefaultApiFp(this.configuration).appsAuthenticationOauthApiDisconnectOauthAccount(provider, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get list of OAuth providers linked to user account.
   * @summary Get Linked Accounts
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsAuthenticationOauthApiGetLinkedAccounts(options) {
    return DefaultApiFp(this.configuration).appsAuthenticationOauthApiGetLinkedAccounts(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get list of available OAuth providers
   * @summary Get Oauth Providers
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsAuthenticationOauthApiGetOauthProviders(options) {
    return DefaultApiFp(this.configuration).appsAuthenticationOauthApiGetOauthProviders(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Link an OAuth provider to an existing authenticated user account.
   * @summary Link Oauth Account
   * @param {string} provider 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsAuthenticationOauthApiLinkOauthAccount(provider, options) {
    return DefaultApiFp(this.configuration).appsAuthenticationOauthApiLinkOauthAccount(provider, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Initialize OAuth flow for a provider. Returns authorization URL to redirect user to.
   * @summary Oauth Authorize
   * @param {string} provider 
   * @param {string | null} [next] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsAuthenticationOauthApiOauthAuthorize(provider, next, options) {
    return DefaultApiFp(this.configuration).appsAuthenticationOauthApiOauthAuthorize(provider, next, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Handle OAuth callback from provider. Exchanges code for tokens and creates/links user account.
   * @summary Oauth Callback
   * @param {string} provider 
   * @param {OAuthCallbackQuery} oAuthCallbackQuery 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsAuthenticationOauthApiOauthCallback(provider, oAuthCallbackQuery, options) {
    return DefaultApiFp(this.configuration).appsAuthenticationOauthApiOauthCallback(provider, oAuthCallbackQuery, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Handle email unsubscribe requests.  Verifies the signed timestamped token (max 90 days old) and adds the email to the blacklist. This endpoint is public (no authentication required) to allow one-click unsubscribe from emails.  Rate limited to 10 requests per minute per IP to prevent abuse.
   * @summary Unsubscribe
   * @param {UnsubscribeRequest} unsubscribeRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsEmailUnsubscribeUnsubscribe(unsubscribeRequest, options) {
    return DefaultApiFp(this.configuration).appsEmailUnsubscribeUnsubscribe(unsubscribeRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Verify an unsubscribe token without actually unsubscribing.  This can be used by the frontend to show a confirmation page before the user confirms they want to unsubscribe.
   * @summary Verify Unsubscribe Token
   * @param {string} token 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  appsEmailUnsubscribeVerifyUnsubscribeToken(token, options) {
    return DefaultApiFp(this.configuration).appsEmailUnsubscribeVerifyUnsubscribeToken(token, options).then((request) => request(this.axios, this.basePath));
  }
};
var DevicesApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Activate a device (resume tracking).
     * @summary Activate Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiActivateDevice: async (deviceId, options = {}) => {
      assertParamExists("appsDevicesApiActivateDevice", "deviceId", deviceId);
      const localVarPath = `/api/v1/devices/{device_id}/activate`.replace(`{${"device_id"}}`, encodeURIComponent(String(deviceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update locations for multiple devices in batch.
     * @summary Batch Update Locations
     * @param {Array<BatchLocationUpdateIn>} batchLocationUpdateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiBatchUpdateLocations: async (batchLocationUpdateIn, options = {}) => {
      assertParamExists("appsDevicesApiBatchUpdateLocations", "batchLocationUpdateIn", batchLocationUpdateIn);
      const localVarPath = `/api/v1/devices/batch-update`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(batchLocationUpdateIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Register a new device for tracking.
     * @summary Create Device
     * @param {DeviceIn} deviceIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiCreateDevice: async (deviceIn, options = {}) => {
      assertParamExists("appsDevicesApiCreateDevice", "deviceIn", deviceIn);
      const localVarPath = `/api/v1/devices/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(deviceIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Deactivate a device (stop tracking).
     * @summary Deactivate Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiDeactivateDevice: async (deviceId, options = {}) => {
      assertParamExists("appsDevicesApiDeactivateDevice", "deviceId", deviceId);
      const localVarPath = `/api/v1/devices/{device_id}/deactivate`.replace(`{${"device_id"}}`, encodeURIComponent(String(deviceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete a device.
     * @summary Delete Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiDeleteDevice: async (deviceId, options = {}) => {
      assertParamExists("appsDevicesApiDeleteDevice", "deviceId", deviceId);
      const localVarPath = `/api/v1/devices/{device_id}`.replace(`{${"device_id"}}`, encodeURIComponent(String(deviceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Export events endpoint - delegates to api_export module
     * @summary Export Events Endpoint
     * @param {string} format 
     * @param {string} [fromDate] 
     * @param {string} [toDate] 
     * @param {string} [deviceIds] 
     * @param {string} [geofenceIds] 
     * @param {string} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiExportEventsEndpoint: async (format, fromDate, toDate, deviceIds, geofenceIds, eventType, options = {}) => {
      assertParamExists("appsDevicesApiExportEventsEndpoint", "format", format);
      const localVarPath = `/api/v1/devices/events/export`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (format !== void 0) {
        localVarQueryParameter["format"] = format;
      }
      if (fromDate !== void 0) {
        localVarQueryParameter["from_date"] = fromDate;
      }
      if (toDate !== void 0) {
        localVarQueryParameter["to_date"] = toDate;
      }
      if (deviceIds !== void 0) {
        localVarQueryParameter["device_ids"] = deviceIds;
      }
      if (geofenceIds !== void 0) {
        localVarQueryParameter["geofence_ids"] = geofenceIds;
      }
      if (eventType !== void 0) {
        localVarQueryParameter["event_type"] = eventType;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get device details by device_id.
     * @summary Get Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetDevice: async (deviceId, options = {}) => {
      assertParamExists("appsDevicesApiGetDevice", "deviceId", deviceId);
      const localVarPath = `/api/v1/devices/{device_id}`.replace(`{${"device_id"}}`, encodeURIComponent(String(deviceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get geofence events for a device.
     * @summary Get Device Events
     * @param {string} deviceId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetDeviceEvents: async (deviceId, limit, offset, options = {}) => {
      assertParamExists("appsDevicesApiGetDeviceEvents", "deviceId", deviceId);
      const localVarPath = `/api/v1/devices/{device_id}/events`.replace(`{${"device_id"}}`, encodeURIComponent(String(deviceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get status of a location import job.  Returns the current status, progress, and error details of an import job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same organization as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `processing`: Job is parsing CSV and queueing locations - `completed`: Job finished successfully (locations queued for processing) - `failed`: Job encountered an error (see error_message)  **Error Handling:** If error_rate > 1%, the job will fail with first 100 errors listed.  **PRD Reference:** §3.1.2 CSV Import Schema
     * @summary Get Import Job
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetImportJob: async (jobId, options = {}) => {
      assertParamExists("appsDevicesApiGetImportJob", "jobId", jobId);
      const localVarPath = `/api/v1/devices/locations/import/{job_id}`.replace(`{${"job_id"}}`, encodeURIComponent(String(jobId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get location activity statistics for the user.
     * @summary Get Location Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetLocationStats: async (options = {}) => {
      const localVarPath = `/api/v1/devices/stats`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get recent geofence events across all user\'s devices.
     * @summary Get Recent Events
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {string | null} [deviceId] 
     * @param {string | null} [geofenceId] 
     * @param {string | null} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetRecentEvents: async (limit, offset, deviceId, geofenceId, eventType, options = {}) => {
      const localVarPath = `/api/v1/devices/events/recent`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      if (deviceId !== void 0) {
        localVarQueryParameter["device_id"] = deviceId;
      }
      if (geofenceId !== void 0) {
        localVarQueryParameter["geofence_id"] = geofenceId;
      }
      if (eventType !== void 0) {
        localVarQueryParameter["event_type"] = eventType;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List user\'s devices.
     * @summary List Devices
     * @param {boolean | null} [isActive] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiListDevices: async (isActive, options = {}) => {
      const localVarPath = `/api/v1/devices/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (isActive !== void 0) {
        localVarQueryParameter["is_active"] = isActive;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update device location and trigger geofence events.
     * @summary Update Device Location
     * @param {string} deviceId 
     * @param {LocationUpdateIn} locationUpdateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiUpdateDeviceLocation: async (deviceId, locationUpdateIn, options = {}) => {
      assertParamExists("appsDevicesApiUpdateDeviceLocation", "deviceId", deviceId);
      assertParamExists("appsDevicesApiUpdateDeviceLocation", "locationUpdateIn", locationUpdateIn);
      const localVarPath = `/api/v1/devices/{device_id}/location`.replace(`{${"device_id"}}`, encodeURIComponent(String(deviceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(locationUpdateIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Upload CSV file for bulk location import.  This endpoint accepts a CSV file with location data and queues it for async processing. Useful for customer migrations or bulk historical data imports.  **Authentication:** JWT token required **Max File Size:** 50 MB **Max Rows:** 500,000  **CSV Format:** ```csv device_id,ts,lat,lon,accuracy_m,speed_mps,heading_deg,meta_driver truck-005,2025-10-01T14:12:03Z,42.651,-73.756,9.2,12.4,180,alice truck-006,2025-10-01T14:13:00Z,42.652,-73.757,8.5,15.0,175,bob ```  **Required Columns:** - `device_id`: Unique device identifier - `ts`: ISO-8601 timestamp - `lat`: Latitude (-90 to 90) - `lon`: Longitude (-180 to 180)  **Optional Columns:** - `accuracy_m`: GPS accuracy in meters - `speed_mps`: Speed in meters per second - `heading_deg`: Heading in degrees (0-359) - `meta_*`: Metadata columns (e.g., meta_driver, meta_cargo)  **Validation Rules:** - Rejects entire import if >1% rows are invalid - Rejects timestamps > 5 minutes in the future - Warns for timestamps > 30 days old  **PRD Reference:** §3.1.2 CSV Import Schema **Roadmap:** Phase 2, Task 2.2
     * @summary Upload Csv Import
     * @param {File} file 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiUploadCsvImport: async (file, options = {}) => {
      assertParamExists("appsDevicesApiUploadCsvImport", "file", file);
      const localVarPath = `/api/v1/devices/locations/import`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (file !== void 0) {
        localVarFormParams.append("file", file);
      }
      localVarHeaderParameter["Content-Type"] = "multipart/form-data";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = localVarFormParams;
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var DevicesApiFp = function(configuration) {
  const localVarAxiosParamCreator = DevicesApiAxiosParamCreator(configuration);
  return {
    /**
     * Activate a device (resume tracking).
     * @summary Activate Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiActivateDevice(deviceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiActivateDevice(deviceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiActivateDevice"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update locations for multiple devices in batch.
     * @summary Batch Update Locations
     * @param {Array<BatchLocationUpdateIn>} batchLocationUpdateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiBatchUpdateLocations(batchLocationUpdateIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiBatchUpdateLocations(batchLocationUpdateIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiBatchUpdateLocations"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Register a new device for tracking.
     * @summary Create Device
     * @param {DeviceIn} deviceIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiCreateDevice(deviceIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiCreateDevice(deviceIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiCreateDevice"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Deactivate a device (stop tracking).
     * @summary Deactivate Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiDeactivateDevice(deviceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiDeactivateDevice(deviceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiDeactivateDevice"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete a device.
     * @summary Delete Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiDeleteDevice(deviceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiDeleteDevice(deviceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiDeleteDevice"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Export events endpoint - delegates to api_export module
     * @summary Export Events Endpoint
     * @param {string} format 
     * @param {string} [fromDate] 
     * @param {string} [toDate] 
     * @param {string} [deviceIds] 
     * @param {string} [geofenceIds] 
     * @param {string} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiExportEventsEndpoint(format, fromDate, toDate, deviceIds, geofenceIds, eventType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiExportEventsEndpoint(format, fromDate, toDate, deviceIds, geofenceIds, eventType, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiExportEventsEndpoint"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get device details by device_id.
     * @summary Get Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGetDevice(deviceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGetDevice(deviceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiGetDevice"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get geofence events for a device.
     * @summary Get Device Events
     * @param {string} deviceId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGetDeviceEvents(deviceId, limit, offset, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGetDeviceEvents(deviceId, limit, offset, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiGetDeviceEvents"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get status of a location import job.  Returns the current status, progress, and error details of an import job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same organization as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `processing`: Job is parsing CSV and queueing locations - `completed`: Job finished successfully (locations queued for processing) - `failed`: Job encountered an error (see error_message)  **Error Handling:** If error_rate > 1%, the job will fail with first 100 errors listed.  **PRD Reference:** §3.1.2 CSV Import Schema
     * @summary Get Import Job
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGetImportJob(jobId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGetImportJob(jobId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiGetImportJob"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get location activity statistics for the user.
     * @summary Get Location Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGetLocationStats(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGetLocationStats(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiGetLocationStats"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get recent geofence events across all user\'s devices.
     * @summary Get Recent Events
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {string | null} [deviceId] 
     * @param {string | null} [geofenceId] 
     * @param {string | null} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGetRecentEvents(limit, offset, deviceId, geofenceId, eventType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGetRecentEvents(limit, offset, deviceId, geofenceId, eventType, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiGetRecentEvents"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List user\'s devices.
     * @summary List Devices
     * @param {boolean | null} [isActive] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiListDevices(isActive, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiListDevices(isActive, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiListDevices"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update device location and trigger geofence events.
     * @summary Update Device Location
     * @param {string} deviceId 
     * @param {LocationUpdateIn} locationUpdateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiUpdateDeviceLocation(deviceId, locationUpdateIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiUpdateDeviceLocation(deviceId, locationUpdateIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiUpdateDeviceLocation"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Upload CSV file for bulk location import.  This endpoint accepts a CSV file with location data and queues it for async processing. Useful for customer migrations or bulk historical data imports.  **Authentication:** JWT token required **Max File Size:** 50 MB **Max Rows:** 500,000  **CSV Format:** ```csv device_id,ts,lat,lon,accuracy_m,speed_mps,heading_deg,meta_driver truck-005,2025-10-01T14:12:03Z,42.651,-73.756,9.2,12.4,180,alice truck-006,2025-10-01T14:13:00Z,42.652,-73.757,8.5,15.0,175,bob ```  **Required Columns:** - `device_id`: Unique device identifier - `ts`: ISO-8601 timestamp - `lat`: Latitude (-90 to 90) - `lon`: Longitude (-180 to 180)  **Optional Columns:** - `accuracy_m`: GPS accuracy in meters - `speed_mps`: Speed in meters per second - `heading_deg`: Heading in degrees (0-359) - `meta_*`: Metadata columns (e.g., meta_driver, meta_cargo)  **Validation Rules:** - Rejects entire import if >1% rows are invalid - Rejects timestamps > 5 minutes in the future - Warns for timestamps > 30 days old  **PRD Reference:** §3.1.2 CSV Import Schema **Roadmap:** Phase 2, Task 2.2
     * @summary Upload Csv Import
     * @param {File} file 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiUploadCsvImport(file, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiUploadCsvImport(file, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["DevicesApi.appsDevicesApiUploadCsvImport"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var DevicesApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = DevicesApiFp(configuration);
  return {
    /**
     * Activate a device (resume tracking).
     * @summary Activate Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiActivateDevice(deviceId, options) {
      return localVarFp.appsDevicesApiActivateDevice(deviceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update locations for multiple devices in batch.
     * @summary Batch Update Locations
     * @param {Array<BatchLocationUpdateIn>} batchLocationUpdateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiBatchUpdateLocations(batchLocationUpdateIn, options) {
      return localVarFp.appsDevicesApiBatchUpdateLocations(batchLocationUpdateIn, options).then((request) => request(axios2, basePath));
    },
    /**
     * Register a new device for tracking.
     * @summary Create Device
     * @param {DeviceIn} deviceIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiCreateDevice(deviceIn, options) {
      return localVarFp.appsDevicesApiCreateDevice(deviceIn, options).then((request) => request(axios2, basePath));
    },
    /**
     * Deactivate a device (stop tracking).
     * @summary Deactivate Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiDeactivateDevice(deviceId, options) {
      return localVarFp.appsDevicesApiDeactivateDevice(deviceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete a device.
     * @summary Delete Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiDeleteDevice(deviceId, options) {
      return localVarFp.appsDevicesApiDeleteDevice(deviceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Export events endpoint - delegates to api_export module
     * @summary Export Events Endpoint
     * @param {string} format 
     * @param {string} [fromDate] 
     * @param {string} [toDate] 
     * @param {string} [deviceIds] 
     * @param {string} [geofenceIds] 
     * @param {string} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiExportEventsEndpoint(format, fromDate, toDate, deviceIds, geofenceIds, eventType, options) {
      return localVarFp.appsDevicesApiExportEventsEndpoint(format, fromDate, toDate, deviceIds, geofenceIds, eventType, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get device details by device_id.
     * @summary Get Device
     * @param {string} deviceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetDevice(deviceId, options) {
      return localVarFp.appsDevicesApiGetDevice(deviceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get geofence events for a device.
     * @summary Get Device Events
     * @param {string} deviceId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetDeviceEvents(deviceId, limit, offset, options) {
      return localVarFp.appsDevicesApiGetDeviceEvents(deviceId, limit, offset, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get status of a location import job.  Returns the current status, progress, and error details of an import job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same organization as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `processing`: Job is parsing CSV and queueing locations - `completed`: Job finished successfully (locations queued for processing) - `failed`: Job encountered an error (see error_message)  **Error Handling:** If error_rate > 1%, the job will fail with first 100 errors listed.  **PRD Reference:** §3.1.2 CSV Import Schema
     * @summary Get Import Job
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetImportJob(jobId, options) {
      return localVarFp.appsDevicesApiGetImportJob(jobId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get location activity statistics for the user.
     * @summary Get Location Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetLocationStats(options) {
      return localVarFp.appsDevicesApiGetLocationStats(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get recent geofence events across all user\'s devices.
     * @summary Get Recent Events
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {string | null} [deviceId] 
     * @param {string | null} [geofenceId] 
     * @param {string | null} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGetRecentEvents(limit, offset, deviceId, geofenceId, eventType, options) {
      return localVarFp.appsDevicesApiGetRecentEvents(limit, offset, deviceId, geofenceId, eventType, options).then((request) => request(axios2, basePath));
    },
    /**
     * List user\'s devices.
     * @summary List Devices
     * @param {boolean | null} [isActive] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiListDevices(isActive, options) {
      return localVarFp.appsDevicesApiListDevices(isActive, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update device location and trigger geofence events.
     * @summary Update Device Location
     * @param {string} deviceId 
     * @param {LocationUpdateIn} locationUpdateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiUpdateDeviceLocation(deviceId, locationUpdateIn, options) {
      return localVarFp.appsDevicesApiUpdateDeviceLocation(deviceId, locationUpdateIn, options).then((request) => request(axios2, basePath));
    },
    /**
     * Upload CSV file for bulk location import.  This endpoint accepts a CSV file with location data and queues it for async processing. Useful for customer migrations or bulk historical data imports.  **Authentication:** JWT token required **Max File Size:** 50 MB **Max Rows:** 500,000  **CSV Format:** ```csv device_id,ts,lat,lon,accuracy_m,speed_mps,heading_deg,meta_driver truck-005,2025-10-01T14:12:03Z,42.651,-73.756,9.2,12.4,180,alice truck-006,2025-10-01T14:13:00Z,42.652,-73.757,8.5,15.0,175,bob ```  **Required Columns:** - `device_id`: Unique device identifier - `ts`: ISO-8601 timestamp - `lat`: Latitude (-90 to 90) - `lon`: Longitude (-180 to 180)  **Optional Columns:** - `accuracy_m`: GPS accuracy in meters - `speed_mps`: Speed in meters per second - `heading_deg`: Heading in degrees (0-359) - `meta_*`: Metadata columns (e.g., meta_driver, meta_cargo)  **Validation Rules:** - Rejects entire import if >1% rows are invalid - Rejects timestamps > 5 minutes in the future - Warns for timestamps > 30 days old  **PRD Reference:** §3.1.2 CSV Import Schema **Roadmap:** Phase 2, Task 2.2
     * @summary Upload Csv Import
     * @param {File} file 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiUploadCsvImport(file, options) {
      return localVarFp.appsDevicesApiUploadCsvImport(file, options).then((request) => request(axios2, basePath));
    }
  };
};
var DevicesApi = class extends BaseAPI {
  /**
   * Activate a device (resume tracking).
   * @summary Activate Device
   * @param {string} deviceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiActivateDevice(deviceId, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiActivateDevice(deviceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update locations for multiple devices in batch.
   * @summary Batch Update Locations
   * @param {Array<BatchLocationUpdateIn>} batchLocationUpdateIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiBatchUpdateLocations(batchLocationUpdateIn, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiBatchUpdateLocations(batchLocationUpdateIn, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Register a new device for tracking.
   * @summary Create Device
   * @param {DeviceIn} deviceIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiCreateDevice(deviceIn, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiCreateDevice(deviceIn, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Deactivate a device (stop tracking).
   * @summary Deactivate Device
   * @param {string} deviceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiDeactivateDevice(deviceId, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiDeactivateDevice(deviceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete a device.
   * @summary Delete Device
   * @param {string} deviceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiDeleteDevice(deviceId, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiDeleteDevice(deviceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Export events endpoint - delegates to api_export module
   * @summary Export Events Endpoint
   * @param {string} format 
   * @param {string} [fromDate] 
   * @param {string} [toDate] 
   * @param {string} [deviceIds] 
   * @param {string} [geofenceIds] 
   * @param {string} [eventType] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiExportEventsEndpoint(format, fromDate, toDate, deviceIds, geofenceIds, eventType, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiExportEventsEndpoint(format, fromDate, toDate, deviceIds, geofenceIds, eventType, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get device details by device_id.
   * @summary Get Device
   * @param {string} deviceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiGetDevice(deviceId, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiGetDevice(deviceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get geofence events for a device.
   * @summary Get Device Events
   * @param {string} deviceId 
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiGetDeviceEvents(deviceId, limit, offset, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiGetDeviceEvents(deviceId, limit, offset, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get status of a location import job.  Returns the current status, progress, and error details of an import job. Poll this endpoint to track job execution.  **Authentication:** JWT token required **Authorization:** Must be in the same organization as the job  **Job Statuses:** - `pending`: Job queued, not yet started - `processing`: Job is parsing CSV and queueing locations - `completed`: Job finished successfully (locations queued for processing) - `failed`: Job encountered an error (see error_message)  **Error Handling:** If error_rate > 1%, the job will fail with first 100 errors listed.  **PRD Reference:** §3.1.2 CSV Import Schema
   * @summary Get Import Job
   * @param {string} jobId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiGetImportJob(jobId, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiGetImportJob(jobId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get location activity statistics for the user.
   * @summary Get Location Stats
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiGetLocationStats(options) {
    return DevicesApiFp(this.configuration).appsDevicesApiGetLocationStats(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get recent geofence events across all user\'s devices.
   * @summary Get Recent Events
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {string | null} [deviceId] 
   * @param {string | null} [geofenceId] 
   * @param {string | null} [eventType] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiGetRecentEvents(limit, offset, deviceId, geofenceId, eventType, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiGetRecentEvents(limit, offset, deviceId, geofenceId, eventType, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List user\'s devices.
   * @summary List Devices
   * @param {boolean | null} [isActive] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiListDevices(isActive, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiListDevices(isActive, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update device location and trigger geofence events.
   * @summary Update Device Location
   * @param {string} deviceId 
   * @param {LocationUpdateIn} locationUpdateIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiUpdateDeviceLocation(deviceId, locationUpdateIn, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiUpdateDeviceLocation(deviceId, locationUpdateIn, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Upload CSV file for bulk location import.  This endpoint accepts a CSV file with location data and queues it for async processing. Useful for customer migrations or bulk historical data imports.  **Authentication:** JWT token required **Max File Size:** 50 MB **Max Rows:** 500,000  **CSV Format:** ```csv device_id,ts,lat,lon,accuracy_m,speed_mps,heading_deg,meta_driver truck-005,2025-10-01T14:12:03Z,42.651,-73.756,9.2,12.4,180,alice truck-006,2025-10-01T14:13:00Z,42.652,-73.757,8.5,15.0,175,bob ```  **Required Columns:** - `device_id`: Unique device identifier - `ts`: ISO-8601 timestamp - `lat`: Latitude (-90 to 90) - `lon`: Longitude (-180 to 180)  **Optional Columns:** - `accuracy_m`: GPS accuracy in meters - `speed_mps`: Speed in meters per second - `heading_deg`: Heading in degrees (0-359) - `meta_*`: Metadata columns (e.g., meta_driver, meta_cargo)  **Validation Rules:** - Rejects entire import if >1% rows are invalid - Rejects timestamps > 5 minutes in the future - Warns for timestamps > 30 days old  **PRD Reference:** §3.1.2 CSV Import Schema **Roadmap:** Phase 2, Task 2.2
   * @summary Upload Csv Import
   * @param {File} file 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DevicesApi
   */
  appsDevicesApiUploadCsvImport(file, options) {
    return DevicesApiFp(this.configuration).appsDevicesApiUploadCsvImport(file, options).then((request) => request(this.axios, this.basePath));
  }
};
var E2ETestApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Clean up E2E test data created during test runs.
     * @summary Cleanup Test Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiCleanupTestData: async (options = {}) => {
      const localVarPath = `/api/v1/test/cleanup-e2e-data`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Clean up E2E test data created during test runs.
     * @summary Cleanup Test Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiCleanupTestData_1: async (options = {}) => {
      const localVarPath = `/api/v1/test/cleanup`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create a test user for E2E testing.
     * @summary Create Test User
     * @param {CreateUserSchema} createUserSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiCreateTestUser: async (createUserSchema, options = {}) => {
      assertParamExists("appsTestApiCreateTestUser", "createUserSchema", createUserSchema);
      const localVarPath = `/api/v1/test/create-user`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(createUserSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Seed the database with E2E test data.
     * @summary Seed E2E Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiSeedE2eData: async (options = {}) => {
      const localVarPath = `/api/v1/test/seed-e2e-data`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var E2ETestApiFp = function(configuration) {
  const localVarAxiosParamCreator = E2ETestApiAxiosParamCreator(configuration);
  return {
    /**
     * Clean up E2E test data created during test runs.
     * @summary Cleanup Test Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTestApiCleanupTestData(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTestApiCleanupTestData(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["E2ETestApi.appsTestApiCleanupTestData"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Clean up E2E test data created during test runs.
     * @summary Cleanup Test Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTestApiCleanupTestData_1(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTestApiCleanupTestData_1(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["E2ETestApi.appsTestApiCleanupTestData_1"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create a test user for E2E testing.
     * @summary Create Test User
     * @param {CreateUserSchema} createUserSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTestApiCreateTestUser(createUserSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTestApiCreateTestUser(createUserSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["E2ETestApi.appsTestApiCreateTestUser"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Seed the database with E2E test data.
     * @summary Seed E2E Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTestApiSeedE2eData(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTestApiSeedE2eData(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["E2ETestApi.appsTestApiSeedE2eData"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var E2ETestApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = E2ETestApiFp(configuration);
  return {
    /**
     * Clean up E2E test data created during test runs.
     * @summary Cleanup Test Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiCleanupTestData(options) {
      return localVarFp.appsTestApiCleanupTestData(options).then((request) => request(axios2, basePath));
    },
    /**
     * Clean up E2E test data created during test runs.
     * @summary Cleanup Test Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiCleanupTestData_1(options) {
      return localVarFp.appsTestApiCleanupTestData_1(options).then((request) => request(axios2, basePath));
    },
    /**
     * Create a test user for E2E testing.
     * @summary Create Test User
     * @param {CreateUserSchema} createUserSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiCreateTestUser(createUserSchema, options) {
      return localVarFp.appsTestApiCreateTestUser(createUserSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Seed the database with E2E test data.
     * @summary Seed E2E Data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTestApiSeedE2eData(options) {
      return localVarFp.appsTestApiSeedE2eData(options).then((request) => request(axios2, basePath));
    }
  };
};
var E2ETestApi = class extends BaseAPI {
  /**
   * Clean up E2E test data created during test runs.
   * @summary Cleanup Test Data
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof E2ETestApi
   */
  appsTestApiCleanupTestData(options) {
    return E2ETestApiFp(this.configuration).appsTestApiCleanupTestData(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Clean up E2E test data created during test runs.
   * @summary Cleanup Test Data
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof E2ETestApi
   */
  appsTestApiCleanupTestData_1(options) {
    return E2ETestApiFp(this.configuration).appsTestApiCleanupTestData_1(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create a test user for E2E testing.
   * @summary Create Test User
   * @param {CreateUserSchema} createUserSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof E2ETestApi
   */
  appsTestApiCreateTestUser(createUserSchema, options) {
    return E2ETestApiFp(this.configuration).appsTestApiCreateTestUser(createUserSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Seed the database with E2E test data.
   * @summary Seed E2E Data
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof E2ETestApi
   */
  appsTestApiSeedE2eData(options) {
    return E2ETestApiFp(this.configuration).appsTestApiSeedE2eData(options).then((request) => request(this.axios, this.basePath));
  }
};
var EmailApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Get email history for the current user
     * @summary Get Email History
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiGetEmailHistory: async (limit, offset, options = {}) => {
      const localVarPath = `/api/v1/email/history`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Check email delivery status
     * @summary Get Email Status
     * @param {string} emailId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiGetEmailStatus: async (emailId, options = {}) => {
      assertParamExists("appsEmailApiGetEmailStatus", "emailId", emailId);
      const localVarPath = `/api/v1/email/status/{email_id}`.replace(`{${"email_id"}}`, encodeURIComponent(String(emailId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get email queue statistics (admin only)
     * @summary Get Queue Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiGetQueueStats: async (options = {}) => {
      const localVarPath = `/api/v1/email/queue-stats`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Email service health check
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/email/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Preview an email template with sample data (admin only)  Args:     template_name: Name of the template to preview     format: Output format - \'html\' or \'txt\' (default: \'html\')
     * @summary Preview Email Template
     * @param {string} templateName 
     * @param {string} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiPreviewEmailTemplate: async (templateName, format, options = {}) => {
      assertParamExists("appsEmailApiPreviewEmailTemplate", "templateName", templateName);
      const localVarPath = `/api/v1/email/preview/{template_name}`.replace(`{${"template_name"}}`, encodeURIComponent(String(templateName)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (format !== void 0) {
        localVarQueryParameter["format"] = format;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Queue email for delivery (admin only)
     * @summary Send Email
     * @param {SendEmailRequest} sendEmailRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiSendEmail: async (sendEmailRequest, options = {}) => {
      assertParamExists("appsEmailApiSendEmail", "sendEmailRequest", sendEmailRequest);
      const localVarPath = `/api/v1/email/send`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(sendEmailRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Send a test email to verify email configuration (admin only)
     * @summary Send Test Email
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiSendTestEmail: async (options = {}) => {
      const localVarPath = `/api/v1/email/test`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var EmailApiFp = function(configuration) {
  const localVarAxiosParamCreator = EmailApiAxiosParamCreator(configuration);
  return {
    /**
     * Get email history for the current user
     * @summary Get Email History
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailApiGetEmailHistory(limit, offset, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailApiGetEmailHistory(limit, offset, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["EmailApi.appsEmailApiGetEmailHistory"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Check email delivery status
     * @summary Get Email Status
     * @param {string} emailId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailApiGetEmailStatus(emailId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailApiGetEmailStatus(emailId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["EmailApi.appsEmailApiGetEmailStatus"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get email queue statistics (admin only)
     * @summary Get Queue Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailApiGetQueueStats(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailApiGetQueueStats(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["EmailApi.appsEmailApiGetQueueStats"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Email service health check
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["EmailApi.appsEmailApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Preview an email template with sample data (admin only)  Args:     template_name: Name of the template to preview     format: Output format - \'html\' or \'txt\' (default: \'html\')
     * @summary Preview Email Template
     * @param {string} templateName 
     * @param {string} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailApiPreviewEmailTemplate(templateName, format, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailApiPreviewEmailTemplate(templateName, format, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["EmailApi.appsEmailApiPreviewEmailTemplate"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Queue email for delivery (admin only)
     * @summary Send Email
     * @param {SendEmailRequest} sendEmailRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailApiSendEmail(sendEmailRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailApiSendEmail(sendEmailRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["EmailApi.appsEmailApiSendEmail"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Send a test email to verify email configuration (admin only)
     * @summary Send Test Email
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsEmailApiSendTestEmail(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsEmailApiSendTestEmail(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["EmailApi.appsEmailApiSendTestEmail"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var EmailApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = EmailApiFp(configuration);
  return {
    /**
     * Get email history for the current user
     * @summary Get Email History
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiGetEmailHistory(limit, offset, options) {
      return localVarFp.appsEmailApiGetEmailHistory(limit, offset, options).then((request) => request(axios2, basePath));
    },
    /**
     * Check email delivery status
     * @summary Get Email Status
     * @param {string} emailId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiGetEmailStatus(emailId, options) {
      return localVarFp.appsEmailApiGetEmailStatus(emailId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get email queue statistics (admin only)
     * @summary Get Queue Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiGetQueueStats(options) {
      return localVarFp.appsEmailApiGetQueueStats(options).then((request) => request(axios2, basePath));
    },
    /**
     * Email service health check
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiHealthCheck(options) {
      return localVarFp.appsEmailApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Preview an email template with sample data (admin only)  Args:     template_name: Name of the template to preview     format: Output format - \'html\' or \'txt\' (default: \'html\')
     * @summary Preview Email Template
     * @param {string} templateName 
     * @param {string} [format] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiPreviewEmailTemplate(templateName, format, options) {
      return localVarFp.appsEmailApiPreviewEmailTemplate(templateName, format, options).then((request) => request(axios2, basePath));
    },
    /**
     * Queue email for delivery (admin only)
     * @summary Send Email
     * @param {SendEmailRequest} sendEmailRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiSendEmail(sendEmailRequest, options) {
      return localVarFp.appsEmailApiSendEmail(sendEmailRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Send a test email to verify email configuration (admin only)
     * @summary Send Test Email
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsEmailApiSendTestEmail(options) {
      return localVarFp.appsEmailApiSendTestEmail(options).then((request) => request(axios2, basePath));
    }
  };
};
var EmailApi = class extends BaseAPI {
  /**
   * Get email history for the current user
   * @summary Get Email History
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EmailApi
   */
  appsEmailApiGetEmailHistory(limit, offset, options) {
    return EmailApiFp(this.configuration).appsEmailApiGetEmailHistory(limit, offset, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Check email delivery status
   * @summary Get Email Status
   * @param {string} emailId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EmailApi
   */
  appsEmailApiGetEmailStatus(emailId, options) {
    return EmailApiFp(this.configuration).appsEmailApiGetEmailStatus(emailId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get email queue statistics (admin only)
   * @summary Get Queue Stats
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EmailApi
   */
  appsEmailApiGetQueueStats(options) {
    return EmailApiFp(this.configuration).appsEmailApiGetQueueStats(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Email service health check
   * @summary Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EmailApi
   */
  appsEmailApiHealthCheck(options) {
    return EmailApiFp(this.configuration).appsEmailApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Preview an email template with sample data (admin only)  Args:     template_name: Name of the template to preview     format: Output format - \'html\' or \'txt\' (default: \'html\')
   * @summary Preview Email Template
   * @param {string} templateName 
   * @param {string} [format] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EmailApi
   */
  appsEmailApiPreviewEmailTemplate(templateName, format, options) {
    return EmailApiFp(this.configuration).appsEmailApiPreviewEmailTemplate(templateName, format, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Queue email for delivery (admin only)
   * @summary Send Email
   * @param {SendEmailRequest} sendEmailRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EmailApi
   */
  appsEmailApiSendEmail(sendEmailRequest, options) {
    return EmailApiFp(this.configuration).appsEmailApiSendEmail(sendEmailRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Send a test email to verify email configuration (admin only)
   * @summary Send Test Email
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EmailApi
   */
  appsEmailApiSendTestEmail(options) {
    return EmailApiFp(this.configuration).appsEmailApiSendTestEmail(options).then((request) => request(this.axios, this.basePath));
  }
};
var GPXSimulatorApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Cancel an active or paused playback.  The playback cannot be resumed after cancellation.
     * @summary Cancel Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxCancelGpxPlayback: async (playbackId, options = {}) => {
      assertParamExists("appsDevicesApiGpxCancelGpxPlayback", "playbackId", playbackId);
      const localVarPath = `/api/v1/gpx/playbacks/{playback_id}/cancel`.replace(`{${"playback_id"}}`, encodeURIComponent(String(playbackId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete (deactivate) a GPX route.
     * @summary Delete Gpx Route
     * @param {string} routeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxDeleteGpxRoute: async (routeId, options = {}) => {
      assertParamExists("appsDevicesApiGpxDeleteGpxRoute", "routeId", routeId);
      const localVarPath = `/api/v1/gpx/routes/{route_id}`.replace(`{${"route_id"}}`, encodeURIComponent(String(routeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get details of a specific playback session.
     * @summary Get Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxGetGpxPlayback: async (playbackId, options = {}) => {
      assertParamExists("appsDevicesApiGpxGetGpxPlayback", "playbackId", playbackId);
      const localVarPath = `/api/v1/gpx/playbacks/{playback_id}`.replace(`{${"playback_id"}}`, encodeURIComponent(String(playbackId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get details of a specific GPX route.
     * @summary Get Gpx Route
     * @param {string} routeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxGetGpxRoute: async (routeId, options = {}) => {
      assertParamExists("appsDevicesApiGpxGetGpxRoute", "routeId", routeId);
      const localVarPath = `/api/v1/gpx/routes/{route_id}`.replace(`{${"route_id"}}`, encodeURIComponent(String(routeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List GPX playback sessions.  Args:     status: Optional filter by status (running, paused, completed, cancelled, failed)     limit: Maximum number of results     offset: Pagination offset  Returns:     List of playback sessions
     * @summary List Gpx Playbacks
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxListGpxPlaybacks: async (status, limit, offset, options = {}) => {
      const localVarPath = `/api/v1/gpx/playbacks`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (status !== void 0) {
        localVarQueryParameter["status"] = status;
      }
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List GPX routes for the authenticated user.  Args:     device_id: Optional filter by device     limit: Maximum number of results     offset: Pagination offset  Returns:     List of GPX routes
     * @summary List Gpx Routes
     * @param {string | null} [deviceId] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxListGpxRoutes: async (deviceId, limit, offset, options = {}) => {
      const localVarPath = `/api/v1/gpx/routes`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (deviceId !== void 0) {
        localVarQueryParameter["device_id"] = deviceId;
      }
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Pause an active playback.  The playback will stop at the current point and can be resumed later.
     * @summary Pause Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxPauseGpxPlayback: async (playbackId, options = {}) => {
      assertParamExists("appsDevicesApiGpxPauseGpxPlayback", "playbackId", playbackId);
      const localVarPath = `/api/v1/gpx/playbacks/{playback_id}/pause`.replace(`{${"playback_id"}}`, encodeURIComponent(String(playbackId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Resume a paused playback.  Continues from the point where it was paused.
     * @summary Resume Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxResumeGpxPlayback: async (playbackId, options = {}) => {
      assertParamExists("appsDevicesApiGpxResumeGpxPlayback", "playbackId", playbackId);
      const localVarPath = `/api/v1/gpx/playbacks/{playback_id}/resume`.replace(`{${"playback_id"}}`, encodeURIComponent(String(playbackId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Start playback of a GPX route.  Creates a playback session and starts the Celery task to simulate device movement along the route.  Args:     route_id: ID of the route to play     data: Playback configuration (speed, loop)  Returns:     201: Created playback session     400: Invalid request or playback already active     404: Route not found
     * @summary Start Gpx Playback
     * @param {string} routeId 
     * @param {StartPlaybackRequest} startPlaybackRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxStartGpxPlayback: async (routeId, startPlaybackRequest, options = {}) => {
      assertParamExists("appsDevicesApiGpxStartGpxPlayback", "routeId", routeId);
      assertParamExists("appsDevicesApiGpxStartGpxPlayback", "startPlaybackRequest", startPlaybackRequest);
      const localVarPath = `/api/v1/gpx/routes/{route_id}/playback`.replace(`{${"route_id"}}`, encodeURIComponent(String(routeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(startPlaybackRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Upload and parse a GPX file to create a new route.  The GPX file is parsed, validated, and stored in S3. Track points are extracted and saved for efficient playback.  Args:     device_id: Device to associate with this route     name: Name for the route     file: GPX file upload     description: Optional route description  Returns:     201: Created route details     400: Invalid GPX file or device     401: Unauthorized
     * @summary Upload Gpx Route
     * @param {string} deviceId 
     * @param {string} name 
     * @param {File} file 
     * @param {string} [description] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxUploadGpxRoute: async (deviceId, name, file, description, options = {}) => {
      assertParamExists("appsDevicesApiGpxUploadGpxRoute", "deviceId", deviceId);
      assertParamExists("appsDevicesApiGpxUploadGpxRoute", "name", name);
      assertParamExists("appsDevicesApiGpxUploadGpxRoute", "file", file);
      const localVarPath = `/api/v1/gpx/routes/upload`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (deviceId !== void 0) {
        localVarQueryParameter["device_id"] = deviceId;
      }
      if (name !== void 0) {
        localVarQueryParameter["name"] = name;
      }
      if (description !== void 0) {
        localVarQueryParameter["description"] = description;
      }
      if (file !== void 0) {
        localVarFormParams.append("file", file);
      }
      localVarHeaderParameter["Content-Type"] = "multipart/form-data";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = localVarFormParams;
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var GPXSimulatorApiFp = function(configuration) {
  const localVarAxiosParamCreator = GPXSimulatorApiAxiosParamCreator(configuration);
  return {
    /**
     * Cancel an active or paused playback.  The playback cannot be resumed after cancellation.
     * @summary Cancel Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxCancelGpxPlayback(playbackId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxCancelGpxPlayback(playbackId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxCancelGpxPlayback"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete (deactivate) a GPX route.
     * @summary Delete Gpx Route
     * @param {string} routeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxDeleteGpxRoute(routeId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxDeleteGpxRoute(routeId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxDeleteGpxRoute"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get details of a specific playback session.
     * @summary Get Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxGetGpxPlayback(playbackId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxGetGpxPlayback(playbackId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxGetGpxPlayback"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get details of a specific GPX route.
     * @summary Get Gpx Route
     * @param {string} routeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxGetGpxRoute(routeId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxGetGpxRoute(routeId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxGetGpxRoute"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List GPX playback sessions.  Args:     status: Optional filter by status (running, paused, completed, cancelled, failed)     limit: Maximum number of results     offset: Pagination offset  Returns:     List of playback sessions
     * @summary List Gpx Playbacks
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxListGpxPlaybacks(status, limit, offset, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxListGpxPlaybacks(status, limit, offset, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxListGpxPlaybacks"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List GPX routes for the authenticated user.  Args:     device_id: Optional filter by device     limit: Maximum number of results     offset: Pagination offset  Returns:     List of GPX routes
     * @summary List Gpx Routes
     * @param {string | null} [deviceId] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxListGpxRoutes(deviceId, limit, offset, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxListGpxRoutes(deviceId, limit, offset, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxListGpxRoutes"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Pause an active playback.  The playback will stop at the current point and can be resumed later.
     * @summary Pause Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxPauseGpxPlayback(playbackId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxPauseGpxPlayback(playbackId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxPauseGpxPlayback"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Resume a paused playback.  Continues from the point where it was paused.
     * @summary Resume Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxResumeGpxPlayback(playbackId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxResumeGpxPlayback(playbackId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxResumeGpxPlayback"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Start playback of a GPX route.  Creates a playback session and starts the Celery task to simulate device movement along the route.  Args:     route_id: ID of the route to play     data: Playback configuration (speed, loop)  Returns:     201: Created playback session     400: Invalid request or playback already active     404: Route not found
     * @summary Start Gpx Playback
     * @param {string} routeId 
     * @param {StartPlaybackRequest} startPlaybackRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxStartGpxPlayback(routeId, startPlaybackRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxStartGpxPlayback(routeId, startPlaybackRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxStartGpxPlayback"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Upload and parse a GPX file to create a new route.  The GPX file is parsed, validated, and stored in S3. Track points are extracted and saved for efficient playback.  Args:     device_id: Device to associate with this route     name: Name for the route     file: GPX file upload     description: Optional route description  Returns:     201: Created route details     400: Invalid GPX file or device     401: Unauthorized
     * @summary Upload Gpx Route
     * @param {string} deviceId 
     * @param {string} name 
     * @param {File} file 
     * @param {string} [description] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsDevicesApiGpxUploadGpxRoute(deviceId, name, file, description, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsDevicesApiGpxUploadGpxRoute(deviceId, name, file, description, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GPXSimulatorApi.appsDevicesApiGpxUploadGpxRoute"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var GPXSimulatorApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = GPXSimulatorApiFp(configuration);
  return {
    /**
     * Cancel an active or paused playback.  The playback cannot be resumed after cancellation.
     * @summary Cancel Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxCancelGpxPlayback(playbackId, options) {
      return localVarFp.appsDevicesApiGpxCancelGpxPlayback(playbackId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete (deactivate) a GPX route.
     * @summary Delete Gpx Route
     * @param {string} routeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxDeleteGpxRoute(routeId, options) {
      return localVarFp.appsDevicesApiGpxDeleteGpxRoute(routeId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get details of a specific playback session.
     * @summary Get Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxGetGpxPlayback(playbackId, options) {
      return localVarFp.appsDevicesApiGpxGetGpxPlayback(playbackId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get details of a specific GPX route.
     * @summary Get Gpx Route
     * @param {string} routeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxGetGpxRoute(routeId, options) {
      return localVarFp.appsDevicesApiGpxGetGpxRoute(routeId, options).then((request) => request(axios2, basePath));
    },
    /**
     * List GPX playback sessions.  Args:     status: Optional filter by status (running, paused, completed, cancelled, failed)     limit: Maximum number of results     offset: Pagination offset  Returns:     List of playback sessions
     * @summary List Gpx Playbacks
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxListGpxPlaybacks(status, limit, offset, options) {
      return localVarFp.appsDevicesApiGpxListGpxPlaybacks(status, limit, offset, options).then((request) => request(axios2, basePath));
    },
    /**
     * List GPX routes for the authenticated user.  Args:     device_id: Optional filter by device     limit: Maximum number of results     offset: Pagination offset  Returns:     List of GPX routes
     * @summary List Gpx Routes
     * @param {string | null} [deviceId] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxListGpxRoutes(deviceId, limit, offset, options) {
      return localVarFp.appsDevicesApiGpxListGpxRoutes(deviceId, limit, offset, options).then((request) => request(axios2, basePath));
    },
    /**
     * Pause an active playback.  The playback will stop at the current point and can be resumed later.
     * @summary Pause Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxPauseGpxPlayback(playbackId, options) {
      return localVarFp.appsDevicesApiGpxPauseGpxPlayback(playbackId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Resume a paused playback.  Continues from the point where it was paused.
     * @summary Resume Gpx Playback
     * @param {string} playbackId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxResumeGpxPlayback(playbackId, options) {
      return localVarFp.appsDevicesApiGpxResumeGpxPlayback(playbackId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Start playback of a GPX route.  Creates a playback session and starts the Celery task to simulate device movement along the route.  Args:     route_id: ID of the route to play     data: Playback configuration (speed, loop)  Returns:     201: Created playback session     400: Invalid request or playback already active     404: Route not found
     * @summary Start Gpx Playback
     * @param {string} routeId 
     * @param {StartPlaybackRequest} startPlaybackRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxStartGpxPlayback(routeId, startPlaybackRequest, options) {
      return localVarFp.appsDevicesApiGpxStartGpxPlayback(routeId, startPlaybackRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Upload and parse a GPX file to create a new route.  The GPX file is parsed, validated, and stored in S3. Track points are extracted and saved for efficient playback.  Args:     device_id: Device to associate with this route     name: Name for the route     file: GPX file upload     description: Optional route description  Returns:     201: Created route details     400: Invalid GPX file or device     401: Unauthorized
     * @summary Upload Gpx Route
     * @param {string} deviceId 
     * @param {string} name 
     * @param {File} file 
     * @param {string} [description] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsDevicesApiGpxUploadGpxRoute(deviceId, name, file, description, options) {
      return localVarFp.appsDevicesApiGpxUploadGpxRoute(deviceId, name, file, description, options).then((request) => request(axios2, basePath));
    }
  };
};
var GPXSimulatorApi = class extends BaseAPI {
  /**
   * Cancel an active or paused playback.  The playback cannot be resumed after cancellation.
   * @summary Cancel Gpx Playback
   * @param {string} playbackId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxCancelGpxPlayback(playbackId, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxCancelGpxPlayback(playbackId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete (deactivate) a GPX route.
   * @summary Delete Gpx Route
   * @param {string} routeId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxDeleteGpxRoute(routeId, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxDeleteGpxRoute(routeId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get details of a specific playback session.
   * @summary Get Gpx Playback
   * @param {string} playbackId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxGetGpxPlayback(playbackId, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxGetGpxPlayback(playbackId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get details of a specific GPX route.
   * @summary Get Gpx Route
   * @param {string} routeId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxGetGpxRoute(routeId, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxGetGpxRoute(routeId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List GPX playback sessions.  Args:     status: Optional filter by status (running, paused, completed, cancelled, failed)     limit: Maximum number of results     offset: Pagination offset  Returns:     List of playback sessions
   * @summary List Gpx Playbacks
   * @param {string | null} [status] 
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxListGpxPlaybacks(status, limit, offset, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxListGpxPlaybacks(status, limit, offset, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List GPX routes for the authenticated user.  Args:     device_id: Optional filter by device     limit: Maximum number of results     offset: Pagination offset  Returns:     List of GPX routes
   * @summary List Gpx Routes
   * @param {string | null} [deviceId] 
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxListGpxRoutes(deviceId, limit, offset, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxListGpxRoutes(deviceId, limit, offset, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Pause an active playback.  The playback will stop at the current point and can be resumed later.
   * @summary Pause Gpx Playback
   * @param {string} playbackId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxPauseGpxPlayback(playbackId, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxPauseGpxPlayback(playbackId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Resume a paused playback.  Continues from the point where it was paused.
   * @summary Resume Gpx Playback
   * @param {string} playbackId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxResumeGpxPlayback(playbackId, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxResumeGpxPlayback(playbackId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Start playback of a GPX route.  Creates a playback session and starts the Celery task to simulate device movement along the route.  Args:     route_id: ID of the route to play     data: Playback configuration (speed, loop)  Returns:     201: Created playback session     400: Invalid request or playback already active     404: Route not found
   * @summary Start Gpx Playback
   * @param {string} routeId 
   * @param {StartPlaybackRequest} startPlaybackRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxStartGpxPlayback(routeId, startPlaybackRequest, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxStartGpxPlayback(routeId, startPlaybackRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Upload and parse a GPX file to create a new route.  The GPX file is parsed, validated, and stored in S3. Track points are extracted and saved for efficient playback.  Args:     device_id: Device to associate with this route     name: Name for the route     file: GPX file upload     description: Optional route description  Returns:     201: Created route details     400: Invalid GPX file or device     401: Unauthorized
   * @summary Upload Gpx Route
   * @param {string} deviceId 
   * @param {string} name 
   * @param {File} file 
   * @param {string} [description] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GPXSimulatorApi
   */
  appsDevicesApiGpxUploadGpxRoute(deviceId, name, file, description, options) {
    return GPXSimulatorApiFp(this.configuration).appsDevicesApiGpxUploadGpxRoute(deviceId, name, file, description, options).then((request) => request(this.axios, this.basePath));
  }
};
var GeofencesApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Bulk create multiple geofences.  This endpoint allows users with the BATCH_OPERATIONS feature to create multiple  geofences in a single request. Maximum 100 geofences per request.
     * @summary Bulk Create Geofences
     * @param {BulkGeofenceRequest} bulkGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiBulkCreateGeofences: async (bulkGeofenceRequest, options = {}) => {
      assertParamExists("appsGeofencesApiBulkCreateGeofences", "bulkGeofenceRequest", bulkGeofenceRequest);
      const localVarPath = `/api/v1/geofences/bulk`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(bulkGeofenceRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create new polygon geofence.
     * @summary Create Geofence
     * @param {CreateGeofenceRequest} createGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiCreateGeofence: async (createGeofenceRequest, options = {}) => {
      assertParamExists("appsGeofencesApiCreateGeofence", "createGeofenceRequest", createGeofenceRequest);
      const localVarPath = `/api/v1/geofences/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(createGeofenceRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete (deactivate) geofence.
     * @summary Delete Geofence
     * @param {string} geofenceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiDeleteGeofence: async (geofenceId, options = {}) => {
      assertParamExists("appsGeofencesApiDeleteGeofence", "geofenceId", geofenceId);
      const localVarPath = `/api/v1/geofences/{geofence_id}`.replace(`{${"geofence_id"}}`, encodeURIComponent(String(geofenceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check for geofence service.
     * @summary Geofence Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGeofenceHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/geofences/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get summary of active geofences with event counts for dashboard map widget.
     * @summary Get Active Geofences Summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetActiveGeofencesSummary: async (options = {}) => {
      const localVarPath = `/api/v1/geofences/active-summary`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get a specific geofence by its ID.
     * @summary Get Geofence
     * @param {string} geofenceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetGeofence: async (geofenceId, options = {}) => {
      assertParamExists("appsGeofencesApiGetGeofence", "geofenceId", geofenceId);
      const localVarPath = `/api/v1/geofences/{geofence_id}`.replace(`{${"geofence_id"}}`, encodeURIComponent(String(geofenceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get test event history for a geofence.  Args:     geofence_id: ID of the geofence     limit: Maximum number of events to return (default 50, max 100)     offset: Number of events to skip (for pagination)  Returns:     List of test events with execution details
     * @summary Get Test Event History
     * @param {string} geofenceId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetTestEventHistory: async (geofenceId, limit, offset, options = {}) => {
      assertParamExists("appsGeofencesApiGetTestEventHistory", "geofenceId", geofenceId);
      const localVarPath = `/api/v1/geofences/{geofence_id}/test-events`.replace(`{${"geofence_id"}}`, encodeURIComponent(String(geofenceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get the status of a geofence upload job.  Returns current status, progress, and results (when completed) of the upload job.
     * @summary Get Upload Job Status
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetUploadJobStatus: async (jobId, options = {}) => {
      assertParamExists("appsGeofencesApiGetUploadJobStatus", "jobId", jobId);
      const localVarPath = `/api/v1/geofences/upload/{job_id}/status`.replace(`{${"job_id"}}`, encodeURIComponent(String(jobId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List all unique groups for the current user.
     * @summary List Geofence Groups
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiListGeofenceGroups: async (options = {}) => {
      const localVarPath = `/api/v1/geofences/groups`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get user\'s polygon geofences.
     * @summary List Geofences
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean} [activeOnly] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiListGeofences: async (limit, offset, activeOnly, options = {}) => {
      const localVarPath = `/api/v1/geofences/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      if (activeOnly !== void 0) {
        localVarQueryParameter["active_only"] = activeOnly;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List all geofences in a specific group.
     * @summary List Group Geofences
     * @param {string} groupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiListGroupGeofences: async (groupId, options = {}) => {
      assertParamExists("appsGeofencesApiListGroupGeofences", "groupId", groupId);
      const localVarPath = `/api/v1/geofences/groups/{group_id}/geofences`.replace(`{${"group_id"}}`, encodeURIComponent(String(groupId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test a point against all geofences in a group.
     * @summary Test Group Point
     * @param {string} groupId 
     * @param {TestPointRequest} testPointRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiTestGroupPoint: async (groupId, testPointRequest, options = {}) => {
      assertParamExists("appsGeofencesApiTestGroupPoint", "groupId", groupId);
      assertParamExists("appsGeofencesApiTestGroupPoint", "testPointRequest", testPointRequest);
      const localVarPath = `/api/v1/geofences/groups/{group_id}/test-point`.replace(`{${"group_id"}}`, encodeURIComponent(String(groupId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(testPointRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test a point against user\'s geofences.
     * @summary Test Point
     * @param {TestPointRequest} testPointRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiTestPoint: async (testPointRequest, options = {}) => {
      assertParamExists("appsGeofencesApiTestPoint", "testPointRequest", testPointRequest);
      const localVarPath = `/api/v1/geofences/test-point`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(testPointRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Trigger a simulated test event for a geofence.  This allows users to test their webhooks and workflows without physically entering or exiting the geofence.  Args:     geofence_id: ID of the geofence     event_type: Type of event to simulate (\'enter\' or \'exit\')     test_metadata: Optional metadata to include in the test event  Returns:     Test event details including triggered webhooks and workflows
     * @summary Trigger Test Event
     * @param {string} geofenceId 
     * @param {string} eventType 
     * @param {TestEventRequest} [testEventRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiTriggerTestEvent: async (geofenceId, eventType, testEventRequest, options = {}) => {
      assertParamExists("appsGeofencesApiTriggerTestEvent", "geofenceId", geofenceId);
      assertParamExists("appsGeofencesApiTriggerTestEvent", "eventType", eventType);
      const localVarPath = `/api/v1/geofences/{geofence_id}/test-event`.replace(`{${"geofence_id"}}`, encodeURIComponent(String(geofenceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (eventType !== void 0) {
        localVarQueryParameter["event_type"] = eventType;
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(testEventRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update existing polygon geofence.
     * @summary Update Geofence
     * @param {string} geofenceId 
     * @param {UpdateGeofenceRequest} updateGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiUpdateGeofence: async (geofenceId, updateGeofenceRequest, options = {}) => {
      assertParamExists("appsGeofencesApiUpdateGeofence", "geofenceId", geofenceId);
      assertParamExists("appsGeofencesApiUpdateGeofence", "updateGeofenceRequest", updateGeofenceRequest);
      const localVarPath = `/api/v1/geofences/{geofence_id}`.replace(`{${"geofence_id"}}`, encodeURIComponent(String(geofenceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateGeofenceRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Assign or update a geofence\'s group.
     * @summary Update Geofence Group
     * @param {string} geofenceId 
     * @param {string} [groupName] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiUpdateGeofenceGroup: async (geofenceId, groupName, options = {}) => {
      assertParamExists("appsGeofencesApiUpdateGeofenceGroup", "geofenceId", geofenceId);
      const localVarPath = `/api/v1/geofences/{geofence_id}/group`.replace(`{${"geofence_id"}}`, encodeURIComponent(String(geofenceId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (groupName !== void 0) {
        localVarQueryParameter["group_name"] = groupName;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Upload geofences from a file (asynchronous).  This endpoint queues a background job to process geofence imports from various file formats: - GeoJSON (.geojson, .json) - Standard geospatial format - KML (.kml) - Google Earth format - GPX (.gpx) - GPS track format (converted to polygon buffers)  The file must first be uploaded using the storage API to get a file_id. All imported geofences can optionally be assigned to a group.  Returns a job ID to track the import progress.
     * @summary Upload Geofences Async
     * @param {UploadGeofencesRequest} uploadGeofencesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiUploadGeofencesAsync: async (uploadGeofencesRequest, options = {}) => {
      assertParamExists("appsGeofencesApiUploadGeofencesAsync", "uploadGeofencesRequest", uploadGeofencesRequest);
      const localVarPath = `/api/v1/geofences/upload`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(uploadGeofencesRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var GeofencesApiFp = function(configuration) {
  const localVarAxiosParamCreator = GeofencesApiAxiosParamCreator(configuration);
  return {
    /**
     * Bulk create multiple geofences.  This endpoint allows users with the BATCH_OPERATIONS feature to create multiple  geofences in a single request. Maximum 100 geofences per request.
     * @summary Bulk Create Geofences
     * @param {BulkGeofenceRequest} bulkGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiBulkCreateGeofences(bulkGeofenceRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiBulkCreateGeofences(bulkGeofenceRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiBulkCreateGeofences"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create new polygon geofence.
     * @summary Create Geofence
     * @param {CreateGeofenceRequest} createGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiCreateGeofence(createGeofenceRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiCreateGeofence(createGeofenceRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiCreateGeofence"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete (deactivate) geofence.
     * @summary Delete Geofence
     * @param {string} geofenceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiDeleteGeofence(geofenceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiDeleteGeofence(geofenceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiDeleteGeofence"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check for geofence service.
     * @summary Geofence Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiGeofenceHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiGeofenceHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiGeofenceHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get summary of active geofences with event counts for dashboard map widget.
     * @summary Get Active Geofences Summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiGetActiveGeofencesSummary(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiGetActiveGeofencesSummary(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiGetActiveGeofencesSummary"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get a specific geofence by its ID.
     * @summary Get Geofence
     * @param {string} geofenceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiGetGeofence(geofenceId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiGetGeofence(geofenceId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiGetGeofence"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get test event history for a geofence.  Args:     geofence_id: ID of the geofence     limit: Maximum number of events to return (default 50, max 100)     offset: Number of events to skip (for pagination)  Returns:     List of test events with execution details
     * @summary Get Test Event History
     * @param {string} geofenceId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiGetTestEventHistory(geofenceId, limit, offset, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiGetTestEventHistory(geofenceId, limit, offset, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiGetTestEventHistory"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get the status of a geofence upload job.  Returns current status, progress, and results (when completed) of the upload job.
     * @summary Get Upload Job Status
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiGetUploadJobStatus(jobId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiGetUploadJobStatus(jobId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiGetUploadJobStatus"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List all unique groups for the current user.
     * @summary List Geofence Groups
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiListGeofenceGroups(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiListGeofenceGroups(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiListGeofenceGroups"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get user\'s polygon geofences.
     * @summary List Geofences
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean} [activeOnly] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiListGeofences(limit, offset, activeOnly, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiListGeofences(limit, offset, activeOnly, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiListGeofences"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List all geofences in a specific group.
     * @summary List Group Geofences
     * @param {string} groupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiListGroupGeofences(groupId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiListGroupGeofences(groupId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiListGroupGeofences"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test a point against all geofences in a group.
     * @summary Test Group Point
     * @param {string} groupId 
     * @param {TestPointRequest} testPointRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiTestGroupPoint(groupId, testPointRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiTestGroupPoint(groupId, testPointRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiTestGroupPoint"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test a point against user\'s geofences.
     * @summary Test Point
     * @param {TestPointRequest} testPointRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiTestPoint(testPointRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiTestPoint(testPointRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiTestPoint"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Trigger a simulated test event for a geofence.  This allows users to test their webhooks and workflows without physically entering or exiting the geofence.  Args:     geofence_id: ID of the geofence     event_type: Type of event to simulate (\'enter\' or \'exit\')     test_metadata: Optional metadata to include in the test event  Returns:     Test event details including triggered webhooks and workflows
     * @summary Trigger Test Event
     * @param {string} geofenceId 
     * @param {string} eventType 
     * @param {TestEventRequest} [testEventRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiTriggerTestEvent(geofenceId, eventType, testEventRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiTriggerTestEvent(geofenceId, eventType, testEventRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiTriggerTestEvent"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update existing polygon geofence.
     * @summary Update Geofence
     * @param {string} geofenceId 
     * @param {UpdateGeofenceRequest} updateGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiUpdateGeofence(geofenceId, updateGeofenceRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiUpdateGeofence(geofenceId, updateGeofenceRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiUpdateGeofence"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Assign or update a geofence\'s group.
     * @summary Update Geofence Group
     * @param {string} geofenceId 
     * @param {string} [groupName] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiUpdateGeofenceGroup(geofenceId, groupName, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiUpdateGeofenceGroup(geofenceId, groupName, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiUpdateGeofenceGroup"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Upload geofences from a file (asynchronous).  This endpoint queues a background job to process geofence imports from various file formats: - GeoJSON (.geojson, .json) - Standard geospatial format - KML (.kml) - Google Earth format - GPX (.gpx) - GPS track format (converted to polygon buffers)  The file must first be uploaded using the storage API to get a file_id. All imported geofences can optionally be assigned to a group.  Returns a job ID to track the import progress.
     * @summary Upload Geofences Async
     * @param {UploadGeofencesRequest} uploadGeofencesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsGeofencesApiUploadGeofencesAsync(uploadGeofencesRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsGeofencesApiUploadGeofencesAsync(uploadGeofencesRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["GeofencesApi.appsGeofencesApiUploadGeofencesAsync"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var GeofencesApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = GeofencesApiFp(configuration);
  return {
    /**
     * Bulk create multiple geofences.  This endpoint allows users with the BATCH_OPERATIONS feature to create multiple  geofences in a single request. Maximum 100 geofences per request.
     * @summary Bulk Create Geofences
     * @param {BulkGeofenceRequest} bulkGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiBulkCreateGeofences(bulkGeofenceRequest, options) {
      return localVarFp.appsGeofencesApiBulkCreateGeofences(bulkGeofenceRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create new polygon geofence.
     * @summary Create Geofence
     * @param {CreateGeofenceRequest} createGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiCreateGeofence(createGeofenceRequest, options) {
      return localVarFp.appsGeofencesApiCreateGeofence(createGeofenceRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete (deactivate) geofence.
     * @summary Delete Geofence
     * @param {string} geofenceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiDeleteGeofence(geofenceId, options) {
      return localVarFp.appsGeofencesApiDeleteGeofence(geofenceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check for geofence service.
     * @summary Geofence Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGeofenceHealthCheck(options) {
      return localVarFp.appsGeofencesApiGeofenceHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get summary of active geofences with event counts for dashboard map widget.
     * @summary Get Active Geofences Summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetActiveGeofencesSummary(options) {
      return localVarFp.appsGeofencesApiGetActiveGeofencesSummary(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get a specific geofence by its ID.
     * @summary Get Geofence
     * @param {string} geofenceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetGeofence(geofenceId, options) {
      return localVarFp.appsGeofencesApiGetGeofence(geofenceId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get test event history for a geofence.  Args:     geofence_id: ID of the geofence     limit: Maximum number of events to return (default 50, max 100)     offset: Number of events to skip (for pagination)  Returns:     List of test events with execution details
     * @summary Get Test Event History
     * @param {string} geofenceId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetTestEventHistory(geofenceId, limit, offset, options) {
      return localVarFp.appsGeofencesApiGetTestEventHistory(geofenceId, limit, offset, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get the status of a geofence upload job.  Returns current status, progress, and results (when completed) of the upload job.
     * @summary Get Upload Job Status
     * @param {string} jobId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiGetUploadJobStatus(jobId, options) {
      return localVarFp.appsGeofencesApiGetUploadJobStatus(jobId, options).then((request) => request(axios2, basePath));
    },
    /**
     * List all unique groups for the current user.
     * @summary List Geofence Groups
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiListGeofenceGroups(options) {
      return localVarFp.appsGeofencesApiListGeofenceGroups(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get user\'s polygon geofences.
     * @summary List Geofences
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean} [activeOnly] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiListGeofences(limit, offset, activeOnly, options) {
      return localVarFp.appsGeofencesApiListGeofences(limit, offset, activeOnly, options).then((request) => request(axios2, basePath));
    },
    /**
     * List all geofences in a specific group.
     * @summary List Group Geofences
     * @param {string} groupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiListGroupGeofences(groupId, options) {
      return localVarFp.appsGeofencesApiListGroupGeofences(groupId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Test a point against all geofences in a group.
     * @summary Test Group Point
     * @param {string} groupId 
     * @param {TestPointRequest} testPointRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiTestGroupPoint(groupId, testPointRequest, options) {
      return localVarFp.appsGeofencesApiTestGroupPoint(groupId, testPointRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Test a point against user\'s geofences.
     * @summary Test Point
     * @param {TestPointRequest} testPointRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiTestPoint(testPointRequest, options) {
      return localVarFp.appsGeofencesApiTestPoint(testPointRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Trigger a simulated test event for a geofence.  This allows users to test their webhooks and workflows without physically entering or exiting the geofence.  Args:     geofence_id: ID of the geofence     event_type: Type of event to simulate (\'enter\' or \'exit\')     test_metadata: Optional metadata to include in the test event  Returns:     Test event details including triggered webhooks and workflows
     * @summary Trigger Test Event
     * @param {string} geofenceId 
     * @param {string} eventType 
     * @param {TestEventRequest} [testEventRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiTriggerTestEvent(geofenceId, eventType, testEventRequest, options) {
      return localVarFp.appsGeofencesApiTriggerTestEvent(geofenceId, eventType, testEventRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update existing polygon geofence.
     * @summary Update Geofence
     * @param {string} geofenceId 
     * @param {UpdateGeofenceRequest} updateGeofenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiUpdateGeofence(geofenceId, updateGeofenceRequest, options) {
      return localVarFp.appsGeofencesApiUpdateGeofence(geofenceId, updateGeofenceRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Assign or update a geofence\'s group.
     * @summary Update Geofence Group
     * @param {string} geofenceId 
     * @param {string} [groupName] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiUpdateGeofenceGroup(geofenceId, groupName, options) {
      return localVarFp.appsGeofencesApiUpdateGeofenceGroup(geofenceId, groupName, options).then((request) => request(axios2, basePath));
    },
    /**
     * Upload geofences from a file (asynchronous).  This endpoint queues a background job to process geofence imports from various file formats: - GeoJSON (.geojson, .json) - Standard geospatial format - KML (.kml) - Google Earth format - GPX (.gpx) - GPS track format (converted to polygon buffers)  The file must first be uploaded using the storage API to get a file_id. All imported geofences can optionally be assigned to a group.  Returns a job ID to track the import progress.
     * @summary Upload Geofences Async
     * @param {UploadGeofencesRequest} uploadGeofencesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsGeofencesApiUploadGeofencesAsync(uploadGeofencesRequest, options) {
      return localVarFp.appsGeofencesApiUploadGeofencesAsync(uploadGeofencesRequest, options).then((request) => request(axios2, basePath));
    }
  };
};
var GeofencesApi = class extends BaseAPI {
  /**
   * Bulk create multiple geofences.  This endpoint allows users with the BATCH_OPERATIONS feature to create multiple  geofences in a single request. Maximum 100 geofences per request.
   * @summary Bulk Create Geofences
   * @param {BulkGeofenceRequest} bulkGeofenceRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiBulkCreateGeofences(bulkGeofenceRequest, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiBulkCreateGeofences(bulkGeofenceRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create new polygon geofence.
   * @summary Create Geofence
   * @param {CreateGeofenceRequest} createGeofenceRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiCreateGeofence(createGeofenceRequest, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiCreateGeofence(createGeofenceRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete (deactivate) geofence.
   * @summary Delete Geofence
   * @param {string} geofenceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiDeleteGeofence(geofenceId, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiDeleteGeofence(geofenceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check for geofence service.
   * @summary Geofence Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiGeofenceHealthCheck(options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiGeofenceHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get summary of active geofences with event counts for dashboard map widget.
   * @summary Get Active Geofences Summary
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiGetActiveGeofencesSummary(options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiGetActiveGeofencesSummary(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get a specific geofence by its ID.
   * @summary Get Geofence
   * @param {string} geofenceId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiGetGeofence(geofenceId, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiGetGeofence(geofenceId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get test event history for a geofence.  Args:     geofence_id: ID of the geofence     limit: Maximum number of events to return (default 50, max 100)     offset: Number of events to skip (for pagination)  Returns:     List of test events with execution details
   * @summary Get Test Event History
   * @param {string} geofenceId 
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiGetTestEventHistory(geofenceId, limit, offset, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiGetTestEventHistory(geofenceId, limit, offset, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get the status of a geofence upload job.  Returns current status, progress, and results (when completed) of the upload job.
   * @summary Get Upload Job Status
   * @param {string} jobId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiGetUploadJobStatus(jobId, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiGetUploadJobStatus(jobId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List all unique groups for the current user.
   * @summary List Geofence Groups
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiListGeofenceGroups(options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiListGeofenceGroups(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get user\'s polygon geofences.
   * @summary List Geofences
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {boolean} [activeOnly] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiListGeofences(limit, offset, activeOnly, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiListGeofences(limit, offset, activeOnly, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List all geofences in a specific group.
   * @summary List Group Geofences
   * @param {string} groupId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiListGroupGeofences(groupId, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiListGroupGeofences(groupId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test a point against all geofences in a group.
   * @summary Test Group Point
   * @param {string} groupId 
   * @param {TestPointRequest} testPointRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiTestGroupPoint(groupId, testPointRequest, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiTestGroupPoint(groupId, testPointRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test a point against user\'s geofences.
   * @summary Test Point
   * @param {TestPointRequest} testPointRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiTestPoint(testPointRequest, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiTestPoint(testPointRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Trigger a simulated test event for a geofence.  This allows users to test their webhooks and workflows without physically entering or exiting the geofence.  Args:     geofence_id: ID of the geofence     event_type: Type of event to simulate (\'enter\' or \'exit\')     test_metadata: Optional metadata to include in the test event  Returns:     Test event details including triggered webhooks and workflows
   * @summary Trigger Test Event
   * @param {string} geofenceId 
   * @param {string} eventType 
   * @param {TestEventRequest} [testEventRequest] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiTriggerTestEvent(geofenceId, eventType, testEventRequest, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiTriggerTestEvent(geofenceId, eventType, testEventRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update existing polygon geofence.
   * @summary Update Geofence
   * @param {string} geofenceId 
   * @param {UpdateGeofenceRequest} updateGeofenceRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiUpdateGeofence(geofenceId, updateGeofenceRequest, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiUpdateGeofence(geofenceId, updateGeofenceRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Assign or update a geofence\'s group.
   * @summary Update Geofence Group
   * @param {string} geofenceId 
   * @param {string} [groupName] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiUpdateGeofenceGroup(geofenceId, groupName, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiUpdateGeofenceGroup(geofenceId, groupName, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Upload geofences from a file (asynchronous).  This endpoint queues a background job to process geofence imports from various file formats: - GeoJSON (.geojson, .json) - Standard geospatial format - KML (.kml) - Google Earth format - GPX (.gpx) - GPS track format (converted to polygon buffers)  The file must first be uploaded using the storage API to get a file_id. All imported geofences can optionally be assigned to a group.  Returns a job ID to track the import progress.
   * @summary Upload Geofences Async
   * @param {UploadGeofencesRequest} uploadGeofencesRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeofencesApi
   */
  appsGeofencesApiUploadGeofencesAsync(uploadGeofencesRequest, options) {
    return GeofencesApiFp(this.configuration).appsGeofencesApiUploadGeofencesAsync(uploadGeofencesRequest, options).then((request) => request(this.axios, this.basePath));
  }
};
var IntegrationsApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Export multiple integrations at once.  If integration_ids is not provided, exports all user\'s integrations.
     * @summary Bulk Export Integrations
     * @param {boolean} [includeSecrets] 
     * @param {Array<string | null> | null} [requestBody] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiBulkExportIntegrations: async (includeSecrets, requestBody, options = {}) => {
      const localVarPath = `/api/v1/integrations/bulk-export`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (includeSecrets !== void 0) {
        localVarQueryParameter["include_secrets"] = includeSecrets;
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(requestBody, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Import multiple integrations at once.
     * @summary Bulk Import Integrations
     * @param {Array<ExportIntegrationSchema>} exportIntegrationSchema 
     * @param {boolean} [overwrite] 
     * @param {string | null} [decryptKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiBulkImportIntegrations: async (exportIntegrationSchema, overwrite, decryptKey, options = {}) => {
      assertParamExists("appsIntegrationsApiBulkImportIntegrations", "exportIntegrationSchema", exportIntegrationSchema);
      const localVarPath = `/api/v1/integrations/bulk-import`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (overwrite !== void 0) {
        localVarQueryParameter["overwrite"] = overwrite;
      }
      if (decryptKey !== void 0) {
        localVarQueryParameter["decrypt_key"] = decryptKey;
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(exportIntegrationSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create config field for integration type (admin only)
     * @summary Create Config Field
     * @param {string} integrationTypeId 
     * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiCreateConfigField: async (integrationTypeId, configFieldDefinitionRequest, options = {}) => {
      assertParamExists("appsIntegrationsApiCreateConfigField", "integrationTypeId", integrationTypeId);
      assertParamExists("appsIntegrationsApiCreateConfigField", "configFieldDefinitionRequest", configFieldDefinitionRequest);
      const localVarPath = `/api/v1/integrations/admin/integration-types/{integration_type_id}/fields`.replace(`{${"integration_type_id"}}`, encodeURIComponent(String(integrationTypeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(configFieldDefinitionRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create a new integration
     * @summary Create Integration
     * @param {CreateIntegrationSchema} createIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiCreateIntegration: async (createIntegrationSchema, options = {}) => {
      assertParamExists("appsIntegrationsApiCreateIntegration", "createIntegrationSchema", createIntegrationSchema);
      const localVarPath = `/api/v1/integrations/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(createIntegrationSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create new integration type (admin only)
     * @summary Create Integration Type
     * @param {IntegrationTypeRequest} integrationTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiCreateIntegrationType: async (integrationTypeRequest, options = {}) => {
      assertParamExists("appsIntegrationsApiCreateIntegrationType", "integrationTypeRequest", integrationTypeRequest);
      const localVarPath = `/api/v1/integrations/admin/integration-types`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(integrationTypeRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete config field (admin only)
     * @summary Delete Config Field
     * @param {string} integrationTypeId 
     * @param {string} fieldId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiDeleteConfigField: async (integrationTypeId, fieldId, options = {}) => {
      assertParamExists("appsIntegrationsApiDeleteConfigField", "integrationTypeId", integrationTypeId);
      assertParamExists("appsIntegrationsApiDeleteConfigField", "fieldId", fieldId);
      const localVarPath = `/api/v1/integrations/admin/integration-types/{integration_type_id}/fields/{field_id}`.replace(`{${"integration_type_id"}}`, encodeURIComponent(String(integrationTypeId))).replace(`{${"field_id"}}`, encodeURIComponent(String(fieldId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete an integration
     * @summary Delete Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiDeleteIntegration: async (integrationId, options = {}) => {
      assertParamExists("appsIntegrationsApiDeleteIntegration", "integrationId", integrationId);
      const localVarPath = `/api/v1/integrations/{integration_id}`.replace(`{${"integration_id"}}`, encodeURIComponent(String(integrationId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete integration type (admin only, non-builtin only)
     * @summary Delete Integration Type
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiDeleteIntegrationType: async (integrationTypeId, options = {}) => {
      assertParamExists("appsIntegrationsApiDeleteIntegrationType", "integrationTypeId", integrationTypeId);
      const localVarPath = `/api/v1/integrations/admin/integration-types/{integration_type_id}`.replace(`{${"integration_type_id"}}`, encodeURIComponent(String(integrationTypeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Export integration configuration.  By default, sensitive data is encrypted. Set include_secrets=true to include decrypted sensitive data (use with caution).
     * @summary Export Integration
     * @param {string} integrationId 
     * @param {boolean} [includeSecrets] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiExportIntegration: async (integrationId, includeSecrets, options = {}) => {
      assertParamExists("appsIntegrationsApiExportIntegration", "integrationId", integrationId);
      const localVarPath = `/api/v1/integrations/{integration_id}/export`.replace(`{${"integration_id"}}`, encodeURIComponent(String(integrationId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (includeSecrets !== void 0) {
        localVarQueryParameter["include_secrets"] = includeSecrets;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get list of available integration types
     * @summary Get Available Integration Types
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetAvailableIntegrationTypes: async (options = {}) => {
      const localVarPath = `/api/v1/integrations/types/available`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get integration details
     * @summary Get Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegration: async (integrationId, options = {}) => {
      assertParamExists("appsIntegrationsApiGetIntegration", "integrationId", integrationId);
      const localVarPath = `/api/v1/integrations/{integration_id}`.replace(`{${"integration_id"}}`, encodeURIComponent(String(integrationId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get integration error statistics for the dashboard health strip.  Returns count of failed integration usage logs in the last 24 hours and timestamp of the most recent error.  Returns:     200: Error statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/integrations/error-stats     Response: { \"error_count_24h\": 5, \"last_error_at\": \"2025-10-05T12:34:56Z\" }
     * @summary Get Integration Error Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegrationErrorStats: async (options = {}) => {
      const localVarPath = `/api/v1/integrations/error-stats`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get usage statistics for an integration
     * @summary Get Integration Stats
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegrationStats: async (integrationId, options = {}) => {
      assertParamExists("appsIntegrationsApiGetIntegrationStats", "integrationId", integrationId);
      const localVarPath = `/api/v1/integrations/{integration_id}/stats`.replace(`{${"integration_id"}}`, encodeURIComponent(String(integrationId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get specific integration type (admin only)
     * @summary Get Integration Type
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegrationType: async (integrationTypeId, options = {}) => {
      assertParamExists("appsIntegrationsApiGetIntegrationType", "integrationTypeId", integrationTypeId);
      const localVarPath = `/api/v1/integrations/admin/integration-types/{integration_type_id}`.replace(`{${"integration_type_id"}}`, encodeURIComponent(String(integrationTypeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Import integration from exported data.  If an integration with the same name exists: - Set overwrite=true to replace it - Set overwrite=false to create with a new name (default)
     * @summary Import Integration
     * @param {ImportIntegrationSchema} importIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiImportIntegration: async (importIntegrationSchema, options = {}) => {
      assertParamExists("appsIntegrationsApiImportIntegration", "importIntegrationSchema", importIntegrationSchema);
      const localVarPath = `/api/v1/integrations/import`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(importIntegrationSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List config fields for an integration type (admin only)
     * @summary List Config Fields
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiListConfigFields: async (integrationTypeId, options = {}) => {
      assertParamExists("appsIntegrationsApiListConfigFields", "integrationTypeId", integrationTypeId);
      const localVarPath = `/api/v1/integrations/admin/integration-types/{integration_type_id}/fields`.replace(`{${"integration_type_id"}}`, encodeURIComponent(String(integrationTypeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List all integration types (admin only)
     * @summary List Integration Types
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {string | null} [category] 
     * @param {boolean | null} [isActive] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiListIntegrationTypes: async (page, pageSize, category, isActive, search, options = {}) => {
      const localVarPath = `/api/v1/integrations/admin/integration-types`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (pageSize !== void 0) {
        localVarQueryParameter["page_size"] = pageSize;
      }
      if (category !== void 0) {
        localVarQueryParameter["category"] = category;
      }
      if (isActive !== void 0) {
        localVarQueryParameter["is_active"] = isActive;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List user\'s integrations with optional filtering
     * @summary List Integrations
     * @param {string | null} [type] 
     * @param {boolean | null} [isActive] 
     * @param {boolean | null} [isVerified] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiListIntegrations: async (type, isActive, isVerified, search, options = {}) => {
      const localVarPath = `/api/v1/integrations/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (type !== void 0) {
        localVarQueryParameter["type"] = type;
      }
      if (isActive !== void 0) {
        localVarQueryParameter["is_active"] = isActive;
      }
      if (isVerified !== void 0) {
        localVarQueryParameter["is_verified"] = isVerified;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Initiate OAuth flow for an integration
     * @summary Oauth Authorize
     * @param {string} integrationType 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiOauthAuthorize: async (integrationType, options = {}) => {
      assertParamExists("appsIntegrationsApiOauthAuthorize", "integrationType", integrationType);
      const localVarPath = `/api/v1/integrations/{integration_type}/oauth/authorize`.replace(`{${"integration_type"}}`, encodeURIComponent(String(integrationType)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Handle OAuth callback
     * @summary Oauth Callback
     * @param {string} integrationType 
     * @param {string} code 
     * @param {string} state 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiOauthCallback: async (integrationType, code, state, options = {}) => {
      assertParamExists("appsIntegrationsApiOauthCallback", "integrationType", integrationType);
      assertParamExists("appsIntegrationsApiOauthCallback", "code", code);
      assertParamExists("appsIntegrationsApiOauthCallback", "state", state);
      const localVarPath = `/api/v1/integrations/{integration_type}/oauth/callback`.replace(`{${"integration_type"}}`, encodeURIComponent(String(integrationType)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (code !== void 0) {
        localVarQueryParameter["code"] = code;
      }
      if (state !== void 0) {
        localVarQueryParameter["state"] = state;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test all active integrations for the user
     * @summary Test Bulk Integrations
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiTestBulkIntegrations: async (options = {}) => {
      const localVarPath = `/api/v1/integrations/test-bulk`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test an integration to verify it works
     * @summary Test Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiTestIntegration: async (integrationId, options = {}) => {
      assertParamExists("appsIntegrationsApiTestIntegration", "integrationId", integrationId);
      const localVarPath = `/api/v1/integrations/{integration_id}/test`.replace(`{${"integration_id"}}`, encodeURIComponent(String(integrationId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update config field (admin only)
     * @summary Update Config Field
     * @param {string} integrationTypeId 
     * @param {string} fieldId 
     * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiUpdateConfigField: async (integrationTypeId, fieldId, configFieldDefinitionRequest, options = {}) => {
      assertParamExists("appsIntegrationsApiUpdateConfigField", "integrationTypeId", integrationTypeId);
      assertParamExists("appsIntegrationsApiUpdateConfigField", "fieldId", fieldId);
      assertParamExists("appsIntegrationsApiUpdateConfigField", "configFieldDefinitionRequest", configFieldDefinitionRequest);
      const localVarPath = `/api/v1/integrations/admin/integration-types/{integration_type_id}/fields/{field_id}`.replace(`{${"integration_type_id"}}`, encodeURIComponent(String(integrationTypeId))).replace(`{${"field_id"}}`, encodeURIComponent(String(fieldId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(configFieldDefinitionRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update an integration
     * @summary Update Integration
     * @param {string} integrationId 
     * @param {UpdateIntegrationSchema} updateIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiUpdateIntegration: async (integrationId, updateIntegrationSchema, options = {}) => {
      assertParamExists("appsIntegrationsApiUpdateIntegration", "integrationId", integrationId);
      assertParamExists("appsIntegrationsApiUpdateIntegration", "updateIntegrationSchema", updateIntegrationSchema);
      const localVarPath = `/api/v1/integrations/{integration_id}`.replace(`{${"integration_id"}}`, encodeURIComponent(String(integrationId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateIntegrationSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update integration type (admin only)
     * @summary Update Integration Type
     * @param {string} integrationTypeId 
     * @param {IntegrationTypeRequest} integrationTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiUpdateIntegrationType: async (integrationTypeId, integrationTypeRequest, options = {}) => {
      assertParamExists("appsIntegrationsApiUpdateIntegrationType", "integrationTypeId", integrationTypeId);
      assertParamExists("appsIntegrationsApiUpdateIntegrationType", "integrationTypeRequest", integrationTypeRequest);
      const localVarPath = `/api/v1/integrations/admin/integration-types/{integration_type_id}`.replace(`{${"integration_type_id"}}`, encodeURIComponent(String(integrationTypeId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(integrationTypeRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var IntegrationsApiFp = function(configuration) {
  const localVarAxiosParamCreator = IntegrationsApiAxiosParamCreator(configuration);
  return {
    /**
     * Export multiple integrations at once.  If integration_ids is not provided, exports all user\'s integrations.
     * @summary Bulk Export Integrations
     * @param {boolean} [includeSecrets] 
     * @param {Array<string | null> | null} [requestBody] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiBulkExportIntegrations(includeSecrets, requestBody, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiBulkExportIntegrations(includeSecrets, requestBody, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiBulkExportIntegrations"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Import multiple integrations at once.
     * @summary Bulk Import Integrations
     * @param {Array<ExportIntegrationSchema>} exportIntegrationSchema 
     * @param {boolean} [overwrite] 
     * @param {string | null} [decryptKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiBulkImportIntegrations(exportIntegrationSchema, overwrite, decryptKey, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiBulkImportIntegrations(exportIntegrationSchema, overwrite, decryptKey, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiBulkImportIntegrations"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create config field for integration type (admin only)
     * @summary Create Config Field
     * @param {string} integrationTypeId 
     * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiCreateConfigField(integrationTypeId, configFieldDefinitionRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiCreateConfigField(integrationTypeId, configFieldDefinitionRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiCreateConfigField"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create a new integration
     * @summary Create Integration
     * @param {CreateIntegrationSchema} createIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiCreateIntegration(createIntegrationSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiCreateIntegration(createIntegrationSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiCreateIntegration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create new integration type (admin only)
     * @summary Create Integration Type
     * @param {IntegrationTypeRequest} integrationTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiCreateIntegrationType(integrationTypeRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiCreateIntegrationType(integrationTypeRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiCreateIntegrationType"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete config field (admin only)
     * @summary Delete Config Field
     * @param {string} integrationTypeId 
     * @param {string} fieldId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiDeleteConfigField(integrationTypeId, fieldId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiDeleteConfigField(integrationTypeId, fieldId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiDeleteConfigField"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete an integration
     * @summary Delete Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiDeleteIntegration(integrationId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiDeleteIntegration(integrationId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiDeleteIntegration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete integration type (admin only, non-builtin only)
     * @summary Delete Integration Type
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiDeleteIntegrationType(integrationTypeId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiDeleteIntegrationType(integrationTypeId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiDeleteIntegrationType"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Export integration configuration.  By default, sensitive data is encrypted. Set include_secrets=true to include decrypted sensitive data (use with caution).
     * @summary Export Integration
     * @param {string} integrationId 
     * @param {boolean} [includeSecrets] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiExportIntegration(integrationId, includeSecrets, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiExportIntegration(integrationId, includeSecrets, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiExportIntegration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get list of available integration types
     * @summary Get Available Integration Types
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiGetAvailableIntegrationTypes(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiGetAvailableIntegrationTypes(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiGetAvailableIntegrationTypes"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get integration details
     * @summary Get Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiGetIntegration(integrationId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiGetIntegration(integrationId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiGetIntegration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get integration error statistics for the dashboard health strip.  Returns count of failed integration usage logs in the last 24 hours and timestamp of the most recent error.  Returns:     200: Error statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/integrations/error-stats     Response: { \"error_count_24h\": 5, \"last_error_at\": \"2025-10-05T12:34:56Z\" }
     * @summary Get Integration Error Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiGetIntegrationErrorStats(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiGetIntegrationErrorStats(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiGetIntegrationErrorStats"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get usage statistics for an integration
     * @summary Get Integration Stats
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiGetIntegrationStats(integrationId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiGetIntegrationStats(integrationId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiGetIntegrationStats"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get specific integration type (admin only)
     * @summary Get Integration Type
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiGetIntegrationType(integrationTypeId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiGetIntegrationType(integrationTypeId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiGetIntegrationType"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Import integration from exported data.  If an integration with the same name exists: - Set overwrite=true to replace it - Set overwrite=false to create with a new name (default)
     * @summary Import Integration
     * @param {ImportIntegrationSchema} importIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiImportIntegration(importIntegrationSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiImportIntegration(importIntegrationSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiImportIntegration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List config fields for an integration type (admin only)
     * @summary List Config Fields
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiListConfigFields(integrationTypeId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiListConfigFields(integrationTypeId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiListConfigFields"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List all integration types (admin only)
     * @summary List Integration Types
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {string | null} [category] 
     * @param {boolean | null} [isActive] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiListIntegrationTypes(page, pageSize, category, isActive, search, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiListIntegrationTypes(page, pageSize, category, isActive, search, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiListIntegrationTypes"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List user\'s integrations with optional filtering
     * @summary List Integrations
     * @param {string | null} [type] 
     * @param {boolean | null} [isActive] 
     * @param {boolean | null} [isVerified] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiListIntegrations(type, isActive, isVerified, search, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiListIntegrations(type, isActive, isVerified, search, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiListIntegrations"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Initiate OAuth flow for an integration
     * @summary Oauth Authorize
     * @param {string} integrationType 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiOauthAuthorize(integrationType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiOauthAuthorize(integrationType, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiOauthAuthorize"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Handle OAuth callback
     * @summary Oauth Callback
     * @param {string} integrationType 
     * @param {string} code 
     * @param {string} state 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiOauthCallback(integrationType, code, state, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiOauthCallback(integrationType, code, state, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiOauthCallback"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test all active integrations for the user
     * @summary Test Bulk Integrations
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiTestBulkIntegrations(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiTestBulkIntegrations(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiTestBulkIntegrations"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test an integration to verify it works
     * @summary Test Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiTestIntegration(integrationId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiTestIntegration(integrationId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiTestIntegration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update config field (admin only)
     * @summary Update Config Field
     * @param {string} integrationTypeId 
     * @param {string} fieldId 
     * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiUpdateConfigField(integrationTypeId, fieldId, configFieldDefinitionRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiUpdateConfigField(integrationTypeId, fieldId, configFieldDefinitionRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiUpdateConfigField"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update an integration
     * @summary Update Integration
     * @param {string} integrationId 
     * @param {UpdateIntegrationSchema} updateIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiUpdateIntegration(integrationId, updateIntegrationSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiUpdateIntegration(integrationId, updateIntegrationSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiUpdateIntegration"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update integration type (admin only)
     * @summary Update Integration Type
     * @param {string} integrationTypeId 
     * @param {IntegrationTypeRequest} integrationTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsIntegrationsApiUpdateIntegrationType(integrationTypeId, integrationTypeRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsIntegrationsApiUpdateIntegrationType(integrationTypeId, integrationTypeRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["IntegrationsApi.appsIntegrationsApiUpdateIntegrationType"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var IntegrationsApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = IntegrationsApiFp(configuration);
  return {
    /**
     * Export multiple integrations at once.  If integration_ids is not provided, exports all user\'s integrations.
     * @summary Bulk Export Integrations
     * @param {boolean} [includeSecrets] 
     * @param {Array<string | null> | null} [requestBody] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiBulkExportIntegrations(includeSecrets, requestBody, options) {
      return localVarFp.appsIntegrationsApiBulkExportIntegrations(includeSecrets, requestBody, options).then((request) => request(axios2, basePath));
    },
    /**
     * Import multiple integrations at once.
     * @summary Bulk Import Integrations
     * @param {Array<ExportIntegrationSchema>} exportIntegrationSchema 
     * @param {boolean} [overwrite] 
     * @param {string | null} [decryptKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiBulkImportIntegrations(exportIntegrationSchema, overwrite, decryptKey, options) {
      return localVarFp.appsIntegrationsApiBulkImportIntegrations(exportIntegrationSchema, overwrite, decryptKey, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create config field for integration type (admin only)
     * @summary Create Config Field
     * @param {string} integrationTypeId 
     * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiCreateConfigField(integrationTypeId, configFieldDefinitionRequest, options) {
      return localVarFp.appsIntegrationsApiCreateConfigField(integrationTypeId, configFieldDefinitionRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create a new integration
     * @summary Create Integration
     * @param {CreateIntegrationSchema} createIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiCreateIntegration(createIntegrationSchema, options) {
      return localVarFp.appsIntegrationsApiCreateIntegration(createIntegrationSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create new integration type (admin only)
     * @summary Create Integration Type
     * @param {IntegrationTypeRequest} integrationTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiCreateIntegrationType(integrationTypeRequest, options) {
      return localVarFp.appsIntegrationsApiCreateIntegrationType(integrationTypeRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete config field (admin only)
     * @summary Delete Config Field
     * @param {string} integrationTypeId 
     * @param {string} fieldId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiDeleteConfigField(integrationTypeId, fieldId, options) {
      return localVarFp.appsIntegrationsApiDeleteConfigField(integrationTypeId, fieldId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete an integration
     * @summary Delete Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiDeleteIntegration(integrationId, options) {
      return localVarFp.appsIntegrationsApiDeleteIntegration(integrationId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete integration type (admin only, non-builtin only)
     * @summary Delete Integration Type
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiDeleteIntegrationType(integrationTypeId, options) {
      return localVarFp.appsIntegrationsApiDeleteIntegrationType(integrationTypeId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Export integration configuration.  By default, sensitive data is encrypted. Set include_secrets=true to include decrypted sensitive data (use with caution).
     * @summary Export Integration
     * @param {string} integrationId 
     * @param {boolean} [includeSecrets] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiExportIntegration(integrationId, includeSecrets, options) {
      return localVarFp.appsIntegrationsApiExportIntegration(integrationId, includeSecrets, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get list of available integration types
     * @summary Get Available Integration Types
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetAvailableIntegrationTypes(options) {
      return localVarFp.appsIntegrationsApiGetAvailableIntegrationTypes(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get integration details
     * @summary Get Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegration(integrationId, options) {
      return localVarFp.appsIntegrationsApiGetIntegration(integrationId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get integration error statistics for the dashboard health strip.  Returns count of failed integration usage logs in the last 24 hours and timestamp of the most recent error.  Returns:     200: Error statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/integrations/error-stats     Response: { \"error_count_24h\": 5, \"last_error_at\": \"2025-10-05T12:34:56Z\" }
     * @summary Get Integration Error Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegrationErrorStats(options) {
      return localVarFp.appsIntegrationsApiGetIntegrationErrorStats(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get usage statistics for an integration
     * @summary Get Integration Stats
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegrationStats(integrationId, options) {
      return localVarFp.appsIntegrationsApiGetIntegrationStats(integrationId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get specific integration type (admin only)
     * @summary Get Integration Type
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiGetIntegrationType(integrationTypeId, options) {
      return localVarFp.appsIntegrationsApiGetIntegrationType(integrationTypeId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Import integration from exported data.  If an integration with the same name exists: - Set overwrite=true to replace it - Set overwrite=false to create with a new name (default)
     * @summary Import Integration
     * @param {ImportIntegrationSchema} importIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiImportIntegration(importIntegrationSchema, options) {
      return localVarFp.appsIntegrationsApiImportIntegration(importIntegrationSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * List config fields for an integration type (admin only)
     * @summary List Config Fields
     * @param {string} integrationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiListConfigFields(integrationTypeId, options) {
      return localVarFp.appsIntegrationsApiListConfigFields(integrationTypeId, options).then((request) => request(axios2, basePath));
    },
    /**
     * List all integration types (admin only)
     * @summary List Integration Types
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {string | null} [category] 
     * @param {boolean | null} [isActive] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiListIntegrationTypes(page, pageSize, category, isActive, search, options) {
      return localVarFp.appsIntegrationsApiListIntegrationTypes(page, pageSize, category, isActive, search, options).then((request) => request(axios2, basePath));
    },
    /**
     * List user\'s integrations with optional filtering
     * @summary List Integrations
     * @param {string | null} [type] 
     * @param {boolean | null} [isActive] 
     * @param {boolean | null} [isVerified] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiListIntegrations(type, isActive, isVerified, search, options) {
      return localVarFp.appsIntegrationsApiListIntegrations(type, isActive, isVerified, search, options).then((request) => request(axios2, basePath));
    },
    /**
     * Initiate OAuth flow for an integration
     * @summary Oauth Authorize
     * @param {string} integrationType 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiOauthAuthorize(integrationType, options) {
      return localVarFp.appsIntegrationsApiOauthAuthorize(integrationType, options).then((request) => request(axios2, basePath));
    },
    /**
     * Handle OAuth callback
     * @summary Oauth Callback
     * @param {string} integrationType 
     * @param {string} code 
     * @param {string} state 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiOauthCallback(integrationType, code, state, options) {
      return localVarFp.appsIntegrationsApiOauthCallback(integrationType, code, state, options).then((request) => request(axios2, basePath));
    },
    /**
     * Test all active integrations for the user
     * @summary Test Bulk Integrations
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiTestBulkIntegrations(options) {
      return localVarFp.appsIntegrationsApiTestBulkIntegrations(options).then((request) => request(axios2, basePath));
    },
    /**
     * Test an integration to verify it works
     * @summary Test Integration
     * @param {string} integrationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiTestIntegration(integrationId, options) {
      return localVarFp.appsIntegrationsApiTestIntegration(integrationId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update config field (admin only)
     * @summary Update Config Field
     * @param {string} integrationTypeId 
     * @param {string} fieldId 
     * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiUpdateConfigField(integrationTypeId, fieldId, configFieldDefinitionRequest, options) {
      return localVarFp.appsIntegrationsApiUpdateConfigField(integrationTypeId, fieldId, configFieldDefinitionRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update an integration
     * @summary Update Integration
     * @param {string} integrationId 
     * @param {UpdateIntegrationSchema} updateIntegrationSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiUpdateIntegration(integrationId, updateIntegrationSchema, options) {
      return localVarFp.appsIntegrationsApiUpdateIntegration(integrationId, updateIntegrationSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update integration type (admin only)
     * @summary Update Integration Type
     * @param {string} integrationTypeId 
     * @param {IntegrationTypeRequest} integrationTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsIntegrationsApiUpdateIntegrationType(integrationTypeId, integrationTypeRequest, options) {
      return localVarFp.appsIntegrationsApiUpdateIntegrationType(integrationTypeId, integrationTypeRequest, options).then((request) => request(axios2, basePath));
    }
  };
};
var IntegrationsApi = class extends BaseAPI {
  /**
   * Export multiple integrations at once.  If integration_ids is not provided, exports all user\'s integrations.
   * @summary Bulk Export Integrations
   * @param {boolean} [includeSecrets] 
   * @param {Array<string | null> | null} [requestBody] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiBulkExportIntegrations(includeSecrets, requestBody, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiBulkExportIntegrations(includeSecrets, requestBody, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Import multiple integrations at once.
   * @summary Bulk Import Integrations
   * @param {Array<ExportIntegrationSchema>} exportIntegrationSchema 
   * @param {boolean} [overwrite] 
   * @param {string | null} [decryptKey] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiBulkImportIntegrations(exportIntegrationSchema, overwrite, decryptKey, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiBulkImportIntegrations(exportIntegrationSchema, overwrite, decryptKey, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create config field for integration type (admin only)
   * @summary Create Config Field
   * @param {string} integrationTypeId 
   * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiCreateConfigField(integrationTypeId, configFieldDefinitionRequest, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiCreateConfigField(integrationTypeId, configFieldDefinitionRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create a new integration
   * @summary Create Integration
   * @param {CreateIntegrationSchema} createIntegrationSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiCreateIntegration(createIntegrationSchema, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiCreateIntegration(createIntegrationSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create new integration type (admin only)
   * @summary Create Integration Type
   * @param {IntegrationTypeRequest} integrationTypeRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiCreateIntegrationType(integrationTypeRequest, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiCreateIntegrationType(integrationTypeRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete config field (admin only)
   * @summary Delete Config Field
   * @param {string} integrationTypeId 
   * @param {string} fieldId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiDeleteConfigField(integrationTypeId, fieldId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiDeleteConfigField(integrationTypeId, fieldId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete an integration
   * @summary Delete Integration
   * @param {string} integrationId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiDeleteIntegration(integrationId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiDeleteIntegration(integrationId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete integration type (admin only, non-builtin only)
   * @summary Delete Integration Type
   * @param {string} integrationTypeId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiDeleteIntegrationType(integrationTypeId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiDeleteIntegrationType(integrationTypeId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Export integration configuration.  By default, sensitive data is encrypted. Set include_secrets=true to include decrypted sensitive data (use with caution).
   * @summary Export Integration
   * @param {string} integrationId 
   * @param {boolean} [includeSecrets] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiExportIntegration(integrationId, includeSecrets, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiExportIntegration(integrationId, includeSecrets, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get list of available integration types
   * @summary Get Available Integration Types
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiGetAvailableIntegrationTypes(options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiGetAvailableIntegrationTypes(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get integration details
   * @summary Get Integration
   * @param {string} integrationId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiGetIntegration(integrationId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiGetIntegration(integrationId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get integration error statistics for the dashboard health strip.  Returns count of failed integration usage logs in the last 24 hours and timestamp of the most recent error.  Returns:     200: Error statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/integrations/error-stats     Response: { \"error_count_24h\": 5, \"last_error_at\": \"2025-10-05T12:34:56Z\" }
   * @summary Get Integration Error Stats
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiGetIntegrationErrorStats(options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiGetIntegrationErrorStats(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get usage statistics for an integration
   * @summary Get Integration Stats
   * @param {string} integrationId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiGetIntegrationStats(integrationId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiGetIntegrationStats(integrationId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get specific integration type (admin only)
   * @summary Get Integration Type
   * @param {string} integrationTypeId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiGetIntegrationType(integrationTypeId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiGetIntegrationType(integrationTypeId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Import integration from exported data.  If an integration with the same name exists: - Set overwrite=true to replace it - Set overwrite=false to create with a new name (default)
   * @summary Import Integration
   * @param {ImportIntegrationSchema} importIntegrationSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiImportIntegration(importIntegrationSchema, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiImportIntegration(importIntegrationSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List config fields for an integration type (admin only)
   * @summary List Config Fields
   * @param {string} integrationTypeId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiListConfigFields(integrationTypeId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiListConfigFields(integrationTypeId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List all integration types (admin only)
   * @summary List Integration Types
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {string | null} [category] 
   * @param {boolean | null} [isActive] 
   * @param {string | null} [search] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiListIntegrationTypes(page, pageSize, category, isActive, search, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiListIntegrationTypes(page, pageSize, category, isActive, search, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List user\'s integrations with optional filtering
   * @summary List Integrations
   * @param {string | null} [type] 
   * @param {boolean | null} [isActive] 
   * @param {boolean | null} [isVerified] 
   * @param {string | null} [search] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiListIntegrations(type, isActive, isVerified, search, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiListIntegrations(type, isActive, isVerified, search, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Initiate OAuth flow for an integration
   * @summary Oauth Authorize
   * @param {string} integrationType 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiOauthAuthorize(integrationType, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiOauthAuthorize(integrationType, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Handle OAuth callback
   * @summary Oauth Callback
   * @param {string} integrationType 
   * @param {string} code 
   * @param {string} state 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiOauthCallback(integrationType, code, state, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiOauthCallback(integrationType, code, state, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test all active integrations for the user
   * @summary Test Bulk Integrations
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiTestBulkIntegrations(options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiTestBulkIntegrations(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test an integration to verify it works
   * @summary Test Integration
   * @param {string} integrationId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiTestIntegration(integrationId, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiTestIntegration(integrationId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update config field (admin only)
   * @summary Update Config Field
   * @param {string} integrationTypeId 
   * @param {string} fieldId 
   * @param {ConfigFieldDefinitionRequest} configFieldDefinitionRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiUpdateConfigField(integrationTypeId, fieldId, configFieldDefinitionRequest, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiUpdateConfigField(integrationTypeId, fieldId, configFieldDefinitionRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update an integration
   * @summary Update Integration
   * @param {string} integrationId 
   * @param {UpdateIntegrationSchema} updateIntegrationSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiUpdateIntegration(integrationId, updateIntegrationSchema, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiUpdateIntegration(integrationId, updateIntegrationSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update integration type (admin only)
   * @summary Update Integration Type
   * @param {string} integrationTypeId 
   * @param {IntegrationTypeRequest} integrationTypeRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IntegrationsApi
   */
  appsIntegrationsApiUpdateIntegrationType(integrationTypeId, integrationTypeRequest, options) {
    return IntegrationsApiFp(this.configuration).appsIntegrationsApiUpdateIntegrationType(integrationTypeId, integrationTypeRequest, options).then((request) => request(this.axios, this.basePath));
  }
};
var PublicApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Returns the complete OpenAPI 3.0 specification
     * @summary Get Api Docs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiGetApiDocs: async (options = {}) => {
      const localVarPath = `/api/v1/public/docs`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Returns documentation for all available WebSocket endpoints.  This endpoint helps developers discover and understand the WebSocket routes available in the SpatialFlow API.
     * @summary Get Websocket Routes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiGetWebsocketRoutes: async (options = {}) => {
      const localVarPath = `/api/v1/public/websocket-routes`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check endpoint for public service
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/public/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Register for SpatialFlow.io
     * @summary Signup
     * @param {SignupRequest} signupRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiSignup: async (signupRequest, options = {}) => {
      assertParamExists("appsPublicApiSignup", "signupRequest", signupRequest);
      const localVarPath = `/api/v1/public/signup`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(signupRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Public status endpoint with beta program information.
     * @summary Status
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiStatus: async (options = {}) => {
      const localVarPath = `/api/v1/public/status`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Interactive Swagger UI for exploring and testing the API  Note: In production, this would serve an HTML page with Swagger UI. For now, returning a redirect to the docs endpoint.
     * @summary Swagger Ui
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiSwaggerUi: async (options = {}) => {
      const localVarPath = `/api/v1/public/docs/ui`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var PublicApiFp = function(configuration) {
  const localVarAxiosParamCreator = PublicApiAxiosParamCreator(configuration);
  return {
    /**
     * Returns the complete OpenAPI 3.0 specification
     * @summary Get Api Docs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicApiGetApiDocs(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicApiGetApiDocs(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicApi.appsPublicApiGetApiDocs"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Returns documentation for all available WebSocket endpoints.  This endpoint helps developers discover and understand the WebSocket routes available in the SpatialFlow API.
     * @summary Get Websocket Routes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicApiGetWebsocketRoutes(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicApiGetWebsocketRoutes(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicApi.appsPublicApiGetWebsocketRoutes"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check endpoint for public service
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicApi.appsPublicApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Register for SpatialFlow.io
     * @summary Signup
     * @param {SignupRequest} signupRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicApiSignup(signupRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicApiSignup(signupRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicApi.appsPublicApiSignup"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Public status endpoint with beta program information.
     * @summary Status
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicApiStatus(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicApiStatus(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicApi.appsPublicApiStatus"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Interactive Swagger UI for exploring and testing the API  Note: In production, this would serve an HTML page with Swagger UI. For now, returning a redirect to the docs endpoint.
     * @summary Swagger Ui
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicApiSwaggerUi(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicApiSwaggerUi(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicApi.appsPublicApiSwaggerUi"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var PublicApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = PublicApiFp(configuration);
  return {
    /**
     * Returns the complete OpenAPI 3.0 specification
     * @summary Get Api Docs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiGetApiDocs(options) {
      return localVarFp.appsPublicApiGetApiDocs(options).then((request) => request(axios2, basePath));
    },
    /**
     * Returns documentation for all available WebSocket endpoints.  This endpoint helps developers discover and understand the WebSocket routes available in the SpatialFlow API.
     * @summary Get Websocket Routes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiGetWebsocketRoutes(options) {
      return localVarFp.appsPublicApiGetWebsocketRoutes(options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check endpoint for public service
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiHealthCheck(options) {
      return localVarFp.appsPublicApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Register for SpatialFlow.io
     * @summary Signup
     * @param {SignupRequest} signupRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiSignup(signupRequest, options) {
      return localVarFp.appsPublicApiSignup(signupRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Public status endpoint with beta program information.
     * @summary Status
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiStatus(options) {
      return localVarFp.appsPublicApiStatus(options).then((request) => request(axios2, basePath));
    },
    /**
     * Interactive Swagger UI for exploring and testing the API  Note: In production, this would serve an HTML page with Swagger UI. For now, returning a redirect to the docs endpoint.
     * @summary Swagger Ui
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicApiSwaggerUi(options) {
      return localVarFp.appsPublicApiSwaggerUi(options).then((request) => request(axios2, basePath));
    }
  };
};
var PublicApi = class extends BaseAPI {
  /**
   * Returns the complete OpenAPI 3.0 specification
   * @summary Get Api Docs
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  appsPublicApiGetApiDocs(options) {
    return PublicApiFp(this.configuration).appsPublicApiGetApiDocs(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Returns documentation for all available WebSocket endpoints.  This endpoint helps developers discover and understand the WebSocket routes available in the SpatialFlow API.
   * @summary Get Websocket Routes
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  appsPublicApiGetWebsocketRoutes(options) {
    return PublicApiFp(this.configuration).appsPublicApiGetWebsocketRoutes(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check endpoint for public service
   * @summary Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  appsPublicApiHealthCheck(options) {
    return PublicApiFp(this.configuration).appsPublicApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Register for SpatialFlow.io
   * @summary Signup
   * @param {SignupRequest} signupRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  appsPublicApiSignup(signupRequest, options) {
    return PublicApiFp(this.configuration).appsPublicApiSignup(signupRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Public status endpoint with beta program information.
   * @summary Status
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  appsPublicApiStatus(options) {
    return PublicApiFp(this.configuration).appsPublicApiStatus(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Interactive Swagger UI for exploring and testing the API  Note: In production, this would serve an HTML page with Swagger UI. For now, returning a redirect to the docs endpoint.
   * @summary Swagger Ui
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  appsPublicApiSwaggerUi(options) {
    return PublicApiFp(this.configuration).appsPublicApiSwaggerUi(options).then((request) => request(this.axios, this.basePath));
  }
};
var PublicLocationIngestApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Get location ingestion statistics for the authenticated organization.  Authentication: API Key (Bearer token)  Returns:     - total_ingested_today: Total locations ingested today     - total_ingested_week: Total locations ingested this week     - devices_active: Number of active devices     - last_ingest: Timestamp of last location ingestion  Example:     ```bash     curl -X GET https://api.spatialflow.io/api/v1/locations/stats \\       -H \"Authorization: Bearer sf_live_abc123...\"     ```
     * @summary Get Ingest Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicLocationsApiGetIngestStats: async (options = {}) => {
      const localVarPath = `/api/v1/v1/locations/stats`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Ingest a single location point.  This endpoint accepts location updates from external systems and queues them for asynchronous processing with GPS jitter reduction filters.  Authentication: API Key (Bearer token) Rate Limit: 1000 requests/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Location queued for processing     400 Bad Request: Invalid location data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"device_id\": \"truck-005\",         \"lat\": 40.7589,         \"lon\": -73.9851,         \"ts\": \"2025-10-01T14:30:00Z\",         \"accuracy\": 8.5       }\'     ```
     * @summary Ingest Location
     * @param {LocationPointIn} locationPointIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicLocationsApiIngestLocation: async (locationPointIn, options = {}) => {
      assertParamExists("appsPublicLocationsApiIngestLocation", "locationPointIn", locationPointIn);
      const localVarPath = `/api/v1/v1/locations`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(locationPointIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Ingest a batch of location points.  Accepts up to 5000 locations per batch (PRD §3.4). Each location is validated and processed asynchronously as a single batch task.  **Idempotency:** If `idempotency_key` is provided, duplicate requests with the same key within 24 hours will return the original response without reprocessing.  Authentication: API Key (Bearer token) Rate Limit: 100 batches/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Locations queued (includes counts of accepted/rejected)     400 Bad Request: Invalid batch data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations/batch \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"locations\": [           {\"device_id\": \"truck-005\", \"lat\": 40.7589, \"lon\": -73.9851, \"ts\": \"2025-10-01T14:30:00Z\"},           {\"device_id\": \"truck-005\", \"lat\": 40.7590, \"lon\": -73.9850, \"ts\": \"2025-10-01T14:31:00Z\"}         ],         \"idempotency_key\": \"batch-20251001-001\"       }\'     ```
     * @summary Ingest Location Batch
     * @param {LocationBatchIn} locationBatchIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicLocationsApiIngestLocationBatch: async (locationBatchIn, options = {}) => {
      assertParamExists("appsPublicLocationsApiIngestLocationBatch", "locationBatchIn", locationBatchIn);
      const localVarPath = `/api/v1/v1/locations/batch`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(locationBatchIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var PublicLocationIngestApiFp = function(configuration) {
  const localVarAxiosParamCreator = PublicLocationIngestApiAxiosParamCreator(configuration);
  return {
    /**
     * Get location ingestion statistics for the authenticated organization.  Authentication: API Key (Bearer token)  Returns:     - total_ingested_today: Total locations ingested today     - total_ingested_week: Total locations ingested this week     - devices_active: Number of active devices     - last_ingest: Timestamp of last location ingestion  Example:     ```bash     curl -X GET https://api.spatialflow.io/api/v1/locations/stats \\       -H \"Authorization: Bearer sf_live_abc123...\"     ```
     * @summary Get Ingest Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicLocationsApiGetIngestStats(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicLocationsApiGetIngestStats(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicLocationIngestApi.appsPublicLocationsApiGetIngestStats"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Ingest a single location point.  This endpoint accepts location updates from external systems and queues them for asynchronous processing with GPS jitter reduction filters.  Authentication: API Key (Bearer token) Rate Limit: 1000 requests/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Location queued for processing     400 Bad Request: Invalid location data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"device_id\": \"truck-005\",         \"lat\": 40.7589,         \"lon\": -73.9851,         \"ts\": \"2025-10-01T14:30:00Z\",         \"accuracy\": 8.5       }\'     ```
     * @summary Ingest Location
     * @param {LocationPointIn} locationPointIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicLocationsApiIngestLocation(locationPointIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicLocationsApiIngestLocation(locationPointIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicLocationIngestApi.appsPublicLocationsApiIngestLocation"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Ingest a batch of location points.  Accepts up to 5000 locations per batch (PRD §3.4). Each location is validated and processed asynchronously as a single batch task.  **Idempotency:** If `idempotency_key` is provided, duplicate requests with the same key within 24 hours will return the original response without reprocessing.  Authentication: API Key (Bearer token) Rate Limit: 100 batches/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Locations queued (includes counts of accepted/rejected)     400 Bad Request: Invalid batch data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations/batch \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"locations\": [           {\"device_id\": \"truck-005\", \"lat\": 40.7589, \"lon\": -73.9851, \"ts\": \"2025-10-01T14:30:00Z\"},           {\"device_id\": \"truck-005\", \"lat\": 40.7590, \"lon\": -73.9850, \"ts\": \"2025-10-01T14:31:00Z\"}         ],         \"idempotency_key\": \"batch-20251001-001\"       }\'     ```
     * @summary Ingest Location Batch
     * @param {LocationBatchIn} locationBatchIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsPublicLocationsApiIngestLocationBatch(locationBatchIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsPublicLocationsApiIngestLocationBatch(locationBatchIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["PublicLocationIngestApi.appsPublicLocationsApiIngestLocationBatch"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var PublicLocationIngestApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = PublicLocationIngestApiFp(configuration);
  return {
    /**
     * Get location ingestion statistics for the authenticated organization.  Authentication: API Key (Bearer token)  Returns:     - total_ingested_today: Total locations ingested today     - total_ingested_week: Total locations ingested this week     - devices_active: Number of active devices     - last_ingest: Timestamp of last location ingestion  Example:     ```bash     curl -X GET https://api.spatialflow.io/api/v1/locations/stats \\       -H \"Authorization: Bearer sf_live_abc123...\"     ```
     * @summary Get Ingest Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicLocationsApiGetIngestStats(options) {
      return localVarFp.appsPublicLocationsApiGetIngestStats(options).then((request) => request(axios2, basePath));
    },
    /**
     * Ingest a single location point.  This endpoint accepts location updates from external systems and queues them for asynchronous processing with GPS jitter reduction filters.  Authentication: API Key (Bearer token) Rate Limit: 1000 requests/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Location queued for processing     400 Bad Request: Invalid location data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"device_id\": \"truck-005\",         \"lat\": 40.7589,         \"lon\": -73.9851,         \"ts\": \"2025-10-01T14:30:00Z\",         \"accuracy\": 8.5       }\'     ```
     * @summary Ingest Location
     * @param {LocationPointIn} locationPointIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicLocationsApiIngestLocation(locationPointIn, options) {
      return localVarFp.appsPublicLocationsApiIngestLocation(locationPointIn, options).then((request) => request(axios2, basePath));
    },
    /**
     * Ingest a batch of location points.  Accepts up to 5000 locations per batch (PRD §3.4). Each location is validated and processed asynchronously as a single batch task.  **Idempotency:** If `idempotency_key` is provided, duplicate requests with the same key within 24 hours will return the original response without reprocessing.  Authentication: API Key (Bearer token) Rate Limit: 100 batches/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Locations queued (includes counts of accepted/rejected)     400 Bad Request: Invalid batch data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations/batch \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"locations\": [           {\"device_id\": \"truck-005\", \"lat\": 40.7589, \"lon\": -73.9851, \"ts\": \"2025-10-01T14:30:00Z\"},           {\"device_id\": \"truck-005\", \"lat\": 40.7590, \"lon\": -73.9850, \"ts\": \"2025-10-01T14:31:00Z\"}         ],         \"idempotency_key\": \"batch-20251001-001\"       }\'     ```
     * @summary Ingest Location Batch
     * @param {LocationBatchIn} locationBatchIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsPublicLocationsApiIngestLocationBatch(locationBatchIn, options) {
      return localVarFp.appsPublicLocationsApiIngestLocationBatch(locationBatchIn, options).then((request) => request(axios2, basePath));
    }
  };
};
var PublicLocationIngestApi = class extends BaseAPI {
  /**
   * Get location ingestion statistics for the authenticated organization.  Authentication: API Key (Bearer token)  Returns:     - total_ingested_today: Total locations ingested today     - total_ingested_week: Total locations ingested this week     - devices_active: Number of active devices     - last_ingest: Timestamp of last location ingestion  Example:     ```bash     curl -X GET https://api.spatialflow.io/api/v1/locations/stats \\       -H \"Authorization: Bearer sf_live_abc123...\"     ```
   * @summary Get Ingest Stats
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicLocationIngestApi
   */
  appsPublicLocationsApiGetIngestStats(options) {
    return PublicLocationIngestApiFp(this.configuration).appsPublicLocationsApiGetIngestStats(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Ingest a single location point.  This endpoint accepts location updates from external systems and queues them for asynchronous processing with GPS jitter reduction filters.  Authentication: API Key (Bearer token) Rate Limit: 1000 requests/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Location queued for processing     400 Bad Request: Invalid location data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"device_id\": \"truck-005\",         \"lat\": 40.7589,         \"lon\": -73.9851,         \"ts\": \"2025-10-01T14:30:00Z\",         \"accuracy\": 8.5       }\'     ```
   * @summary Ingest Location
   * @param {LocationPointIn} locationPointIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicLocationIngestApi
   */
  appsPublicLocationsApiIngestLocation(locationPointIn, options) {
    return PublicLocationIngestApiFp(this.configuration).appsPublicLocationsApiIngestLocation(locationPointIn, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Ingest a batch of location points.  Accepts up to 5000 locations per batch (PRD §3.4). Each location is validated and processed asynchronously as a single batch task.  **Idempotency:** If `idempotency_key` is provided, duplicate requests with the same key within 24 hours will return the original response without reprocessing.  Authentication: API Key (Bearer token) Rate Limit: 100 batches/minute per API key  PRD Reference: §3.4 Public Ingest API  Returns:     202 Accepted: Locations queued (includes counts of accepted/rejected)     400 Bad Request: Invalid batch data     401 Unauthorized: Missing or invalid API key     429 Too Many Requests: Rate limit exceeded  Example:     ```bash     curl -X POST https://api.spatialflow.io/api/v1/locations/batch \\       -H \"Authorization: Bearer sf_live_abc123...\" \\       -H \"Content-Type: application/json\" \\       -d \'{         \"locations\": [           {\"device_id\": \"truck-005\", \"lat\": 40.7589, \"lon\": -73.9851, \"ts\": \"2025-10-01T14:30:00Z\"},           {\"device_id\": \"truck-005\", \"lat\": 40.7590, \"lon\": -73.9850, \"ts\": \"2025-10-01T14:31:00Z\"}         ],         \"idempotency_key\": \"batch-20251001-001\"       }\'     ```
   * @summary Ingest Location Batch
   * @param {LocationBatchIn} locationBatchIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicLocationIngestApi
   */
  appsPublicLocationsApiIngestLocationBatch(locationBatchIn, options) {
    return PublicLocationIngestApiFp(this.configuration).appsPublicLocationsApiIngestLocationBatch(locationBatchIn, options).then((request) => request(this.axios, this.basePath));
  }
};
var StorageApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Generate presigned URL for file upload.
     * @summary Create Presigned Url
     * @param {PresignedUrlRequest} presignedUrlRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiCreatePresignedUrl: async (presignedUrlRequest, options = {}) => {
      assertParamExists("appsStorageApiCreatePresignedUrl", "presignedUrlRequest", presignedUrlRequest);
      const localVarPath = `/api/v1/storage/presigned-url`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(presignedUrlRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete a file from storage.
     * @summary Delete File
     * @param {string} fileType 
     * @param {string} filename 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiDeleteFile: async (fileType, filename, options = {}) => {
      assertParamExists("appsStorageApiDeleteFile", "fileType", fileType);
      assertParamExists("appsStorageApiDeleteFile", "filename", filename);
      const localVarPath = `/api/v1/storage/{file_type}/{filename}`.replace(`{${"file_type"}}`, encodeURIComponent(String(fileType))).replace(`{${"filename"}}`, encodeURIComponent(String(filename)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get presigned download URL for a file.
     * @summary Get Download Url
     * @param {string} fileId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiGetDownloadUrl: async (fileId, options = {}) => {
      assertParamExists("appsStorageApiGetDownloadUrl", "fileId", fileId);
      const localVarPath = `/api/v1/storage/download/{file_id}`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get available file types and their configurations.
     * @summary Get File Types
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiGetFileTypes: async (options = {}) => {
      const localVarPath = `/api/v1/storage/types`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check for storage service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/storage/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List files in a category.
     * @summary List Files
     * @param {string} fileType 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiListFiles: async (fileType, options = {}) => {
      assertParamExists("appsStorageApiListFiles", "fileType", fileType);
      const localVarPath = `/api/v1/storage/list/{file_type}`.replace(`{${"file_type"}}`, encodeURIComponent(String(fileType)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var StorageApiFp = function(configuration) {
  const localVarAxiosParamCreator = StorageApiAxiosParamCreator(configuration);
  return {
    /**
     * Generate presigned URL for file upload.
     * @summary Create Presigned Url
     * @param {PresignedUrlRequest} presignedUrlRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsStorageApiCreatePresignedUrl(presignedUrlRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsStorageApiCreatePresignedUrl(presignedUrlRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["StorageApi.appsStorageApiCreatePresignedUrl"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete a file from storage.
     * @summary Delete File
     * @param {string} fileType 
     * @param {string} filename 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsStorageApiDeleteFile(fileType, filename, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsStorageApiDeleteFile(fileType, filename, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["StorageApi.appsStorageApiDeleteFile"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get presigned download URL for a file.
     * @summary Get Download Url
     * @param {string} fileId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsStorageApiGetDownloadUrl(fileId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsStorageApiGetDownloadUrl(fileId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["StorageApi.appsStorageApiGetDownloadUrl"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get available file types and their configurations.
     * @summary Get File Types
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsStorageApiGetFileTypes(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsStorageApiGetFileTypes(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["StorageApi.appsStorageApiGetFileTypes"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check for storage service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsStorageApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsStorageApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["StorageApi.appsStorageApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List files in a category.
     * @summary List Files
     * @param {string} fileType 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsStorageApiListFiles(fileType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsStorageApiListFiles(fileType, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["StorageApi.appsStorageApiListFiles"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var StorageApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = StorageApiFp(configuration);
  return {
    /**
     * Generate presigned URL for file upload.
     * @summary Create Presigned Url
     * @param {PresignedUrlRequest} presignedUrlRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiCreatePresignedUrl(presignedUrlRequest, options) {
      return localVarFp.appsStorageApiCreatePresignedUrl(presignedUrlRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete a file from storage.
     * @summary Delete File
     * @param {string} fileType 
     * @param {string} filename 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiDeleteFile(fileType, filename, options) {
      return localVarFp.appsStorageApiDeleteFile(fileType, filename, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get presigned download URL for a file.
     * @summary Get Download Url
     * @param {string} fileId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiGetDownloadUrl(fileId, options) {
      return localVarFp.appsStorageApiGetDownloadUrl(fileId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get available file types and their configurations.
     * @summary Get File Types
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiGetFileTypes(options) {
      return localVarFp.appsStorageApiGetFileTypes(options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check for storage service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiHealthCheck(options) {
      return localVarFp.appsStorageApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * List files in a category.
     * @summary List Files
     * @param {string} fileType 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsStorageApiListFiles(fileType, options) {
      return localVarFp.appsStorageApiListFiles(fileType, options).then((request) => request(axios2, basePath));
    }
  };
};
var StorageApi = class extends BaseAPI {
  /**
   * Generate presigned URL for file upload.
   * @summary Create Presigned Url
   * @param {PresignedUrlRequest} presignedUrlRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageApi
   */
  appsStorageApiCreatePresignedUrl(presignedUrlRequest, options) {
    return StorageApiFp(this.configuration).appsStorageApiCreatePresignedUrl(presignedUrlRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete a file from storage.
   * @summary Delete File
   * @param {string} fileType 
   * @param {string} filename 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageApi
   */
  appsStorageApiDeleteFile(fileType, filename, options) {
    return StorageApiFp(this.configuration).appsStorageApiDeleteFile(fileType, filename, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get presigned download URL for a file.
   * @summary Get Download Url
   * @param {string} fileId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageApi
   */
  appsStorageApiGetDownloadUrl(fileId, options) {
    return StorageApiFp(this.configuration).appsStorageApiGetDownloadUrl(fileId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get available file types and their configurations.
   * @summary Get File Types
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageApi
   */
  appsStorageApiGetFileTypes(options) {
    return StorageApiFp(this.configuration).appsStorageApiGetFileTypes(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check for storage service.
   * @summary Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageApi
   */
  appsStorageApiHealthCheck(options) {
    return StorageApiFp(this.configuration).appsStorageApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List files in a category.
   * @summary List Files
   * @param {string} fileType 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageApi
   */
  appsStorageApiListFiles(fileType, options) {
    return StorageApiFp(this.configuration).appsStorageApiListFiles(fileType, options).then((request) => request(this.axios, this.basePath));
  }
};
var SubscriptionsApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Cancel the current user\'s subscription at period end.
     * @summary Cancel Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiCancelSubscription: async (options = {}) => {
      const localVarPath = `/api/v1/subscriptions/cancel`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create a Stripe checkout session for subscription purchase.
     * @summary Create Checkout Session
     * @param {CheckoutSessionRequest} checkoutSessionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiCreateCheckoutSession: async (checkoutSessionRequest, options = {}) => {
      assertParamExists("appsSubscriptionsApiCreateCheckoutSession", "checkoutSessionRequest", checkoutSessionRequest);
      const localVarPath = `/api/v1/subscriptions/create-checkout-session`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(checkoutSessionRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create a Stripe customer portal session for subscription management.
     * @summary Create Portal Session
     * @param {PortalSessionRequest} portalSessionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiCreatePortalSession: async (portalSessionRequest, options = {}) => {
      assertParamExists("appsSubscriptionsApiCreatePortalSession", "portalSessionRequest", portalSessionRequest);
      const localVarPath = `/api/v1/subscriptions/create-portal-session`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(portalSessionRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get current user\'s subscription details.
     * @summary Get Current Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiGetCurrentSubscription: async (options = {}) => {
      const localVarPath = `/api/v1/subscriptions/current`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get all available subscription plans.
     * @summary Get Subscription Plans
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiGetSubscriptionPlans: async (options = {}) => {
      const localVarPath = `/api/v1/subscriptions/plans`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get detailed usage metrics for the current billing period.
     * @summary Get Usage Metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiGetUsageMetrics: async (options = {}) => {
      const localVarPath = `/api/v1/subscriptions/usage`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Handle Stripe webhook events.  Note: This endpoint doesn\'t use standard Django Ninja response handling because it needs to work with raw request body for signature verification.
     * @summary Handle Stripe Webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiHandleStripeWebhook: async (options = {}) => {
      const localVarPath = `/api/v1/subscriptions/stripe-webhook`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check endpoint for subscription service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/subscriptions/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Reactivate a cancelled subscription before period end.
     * @summary Reactivate Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiReactivateSubscription: async (options = {}) => {
      const localVarPath = `/api/v1/subscriptions/reactivate`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var SubscriptionsApiFp = function(configuration) {
  const localVarAxiosParamCreator = SubscriptionsApiAxiosParamCreator(configuration);
  return {
    /**
     * Cancel the current user\'s subscription at period end.
     * @summary Cancel Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiCancelSubscription(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiCancelSubscription(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiCancelSubscription"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create a Stripe checkout session for subscription purchase.
     * @summary Create Checkout Session
     * @param {CheckoutSessionRequest} checkoutSessionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiCreateCheckoutSession(checkoutSessionRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiCreateCheckoutSession(checkoutSessionRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiCreateCheckoutSession"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create a Stripe customer portal session for subscription management.
     * @summary Create Portal Session
     * @param {PortalSessionRequest} portalSessionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiCreatePortalSession(portalSessionRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiCreatePortalSession(portalSessionRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiCreatePortalSession"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get current user\'s subscription details.
     * @summary Get Current Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiGetCurrentSubscription(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiGetCurrentSubscription(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiGetCurrentSubscription"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get all available subscription plans.
     * @summary Get Subscription Plans
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiGetSubscriptionPlans(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiGetSubscriptionPlans(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiGetSubscriptionPlans"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get detailed usage metrics for the current billing period.
     * @summary Get Usage Metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiGetUsageMetrics(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiGetUsageMetrics(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiGetUsageMetrics"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Handle Stripe webhook events.  Note: This endpoint doesn\'t use standard Django Ninja response handling because it needs to work with raw request body for signature verification.
     * @summary Handle Stripe Webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiHandleStripeWebhook(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiHandleStripeWebhook(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiHandleStripeWebhook"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check endpoint for subscription service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Reactivate a cancelled subscription before period end.
     * @summary Reactivate Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsSubscriptionsApiReactivateSubscription(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsSubscriptionsApiReactivateSubscription(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SubscriptionsApi.appsSubscriptionsApiReactivateSubscription"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var SubscriptionsApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = SubscriptionsApiFp(configuration);
  return {
    /**
     * Cancel the current user\'s subscription at period end.
     * @summary Cancel Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiCancelSubscription(options) {
      return localVarFp.appsSubscriptionsApiCancelSubscription(options).then((request) => request(axios2, basePath));
    },
    /**
     * Create a Stripe checkout session for subscription purchase.
     * @summary Create Checkout Session
     * @param {CheckoutSessionRequest} checkoutSessionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiCreateCheckoutSession(checkoutSessionRequest, options) {
      return localVarFp.appsSubscriptionsApiCreateCheckoutSession(checkoutSessionRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create a Stripe customer portal session for subscription management.
     * @summary Create Portal Session
     * @param {PortalSessionRequest} portalSessionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiCreatePortalSession(portalSessionRequest, options) {
      return localVarFp.appsSubscriptionsApiCreatePortalSession(portalSessionRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get current user\'s subscription details.
     * @summary Get Current Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiGetCurrentSubscription(options) {
      return localVarFp.appsSubscriptionsApiGetCurrentSubscription(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get all available subscription plans.
     * @summary Get Subscription Plans
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiGetSubscriptionPlans(options) {
      return localVarFp.appsSubscriptionsApiGetSubscriptionPlans(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get detailed usage metrics for the current billing period.
     * @summary Get Usage Metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiGetUsageMetrics(options) {
      return localVarFp.appsSubscriptionsApiGetUsageMetrics(options).then((request) => request(axios2, basePath));
    },
    /**
     * Handle Stripe webhook events.  Note: This endpoint doesn\'t use standard Django Ninja response handling because it needs to work with raw request body for signature verification.
     * @summary Handle Stripe Webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiHandleStripeWebhook(options) {
      return localVarFp.appsSubscriptionsApiHandleStripeWebhook(options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check endpoint for subscription service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiHealthCheck(options) {
      return localVarFp.appsSubscriptionsApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Reactivate a cancelled subscription before period end.
     * @summary Reactivate Subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsSubscriptionsApiReactivateSubscription(options) {
      return localVarFp.appsSubscriptionsApiReactivateSubscription(options).then((request) => request(axios2, basePath));
    }
  };
};
var SubscriptionsApi = class extends BaseAPI {
  /**
   * Cancel the current user\'s subscription at period end.
   * @summary Cancel Subscription
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiCancelSubscription(options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiCancelSubscription(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create a Stripe checkout session for subscription purchase.
   * @summary Create Checkout Session
   * @param {CheckoutSessionRequest} checkoutSessionRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiCreateCheckoutSession(checkoutSessionRequest, options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiCreateCheckoutSession(checkoutSessionRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create a Stripe customer portal session for subscription management.
   * @summary Create Portal Session
   * @param {PortalSessionRequest} portalSessionRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiCreatePortalSession(portalSessionRequest, options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiCreatePortalSession(portalSessionRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get current user\'s subscription details.
   * @summary Get Current Subscription
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiGetCurrentSubscription(options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiGetCurrentSubscription(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get all available subscription plans.
   * @summary Get Subscription Plans
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiGetSubscriptionPlans(options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiGetSubscriptionPlans(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get detailed usage metrics for the current billing period.
   * @summary Get Usage Metrics
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiGetUsageMetrics(options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiGetUsageMetrics(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Handle Stripe webhook events.  Note: This endpoint doesn\'t use standard Django Ninja response handling because it needs to work with raw request body for signature verification.
   * @summary Handle Stripe Webhook
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiHandleStripeWebhook(options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiHandleStripeWebhook(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check endpoint for subscription service.
   * @summary Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiHealthCheck(options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Reactivate a cancelled subscription before period end.
   * @summary Reactivate Subscription
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  appsSubscriptionsApiReactivateSubscription(options) {
    return SubscriptionsApiFp(this.configuration).appsSubscriptionsApiReactivateSubscription(options).then((request) => request(this.axios, this.basePath));
  }
};
var SystemApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Basic health check for API.
     * @summary Api Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsCoreHealthApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Readiness check for API with dependency checks.
     * @summary Api Health Check Ready
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsCoreHealthApiHealthCheckReady: async (options = {}) => {
      const localVarPath = `/api/v1/health/ready`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var SystemApiFp = function(configuration) {
  const localVarAxiosParamCreator = SystemApiAxiosParamCreator(configuration);
  return {
    /**
     * Basic health check for API.
     * @summary Api Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsCoreHealthApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsCoreHealthApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SystemApi.appsCoreHealthApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Readiness check for API with dependency checks.
     * @summary Api Health Check Ready
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsCoreHealthApiHealthCheckReady(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsCoreHealthApiHealthCheckReady(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["SystemApi.appsCoreHealthApiHealthCheckReady"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var SystemApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = SystemApiFp(configuration);
  return {
    /**
     * Basic health check for API.
     * @summary Api Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsCoreHealthApiHealthCheck(options) {
      return localVarFp.appsCoreHealthApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Readiness check for API with dependency checks.
     * @summary Api Health Check Ready
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsCoreHealthApiHealthCheckReady(options) {
      return localVarFp.appsCoreHealthApiHealthCheckReady(options).then((request) => request(axios2, basePath));
    }
  };
};
var SystemApi = class extends BaseAPI {
  /**
   * Basic health check for API.
   * @summary Api Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SystemApi
   */
  appsCoreHealthApiHealthCheck(options) {
    return SystemApiFp(this.configuration).appsCoreHealthApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Readiness check for API with dependency checks.
   * @summary Api Health Check Ready
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SystemApi
   */
  appsCoreHealthApiHealthCheckReady(options) {
    return SystemApiFp(this.configuration).appsCoreHealthApiHealthCheckReady(options).then((request) => request(this.axios, this.basePath));
  }
};
var TilesApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Placeholder for raster tile support. Currently returns 404 as we only support vector tiles.
     * @summary Get Raster Tile
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetRasterTile: async (z, x, y, options = {}) => {
      assertParamExists("appsTilesApiGetRasterTile", "z", z);
      assertParamExists("appsTilesApiGetRasterTile", "x", x);
      assertParamExists("appsTilesApiGetRasterTile", "y", y);
      const localVarPath = `/api/v1/tiles/{z}/{x}/{y}.png`.replace(`{${"z"}}`, encodeURIComponent(String(z))).replace(`{${"x"}}`, encodeURIComponent(String(x))).replace(`{${"y"}}`, encodeURIComponent(String(y)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Generate MVT tile for geofences.  Args:     z: Zoom level (0-16)     x: Tile X coordinate     y: Tile Y coordinate  Returns:     MVT tile binary data or 204 No Content for empty tiles
     * @summary Get Tile
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetTile: async (z, x, y, options = {}) => {
      assertParamExists("appsTilesApiGetTile", "z", z);
      assertParamExists("appsTilesApiGetTile", "x", x);
      assertParamExists("appsTilesApiGetTile", "y", y);
      const localVarPath = `/api/v1/tiles/{z}/{x}/{y}.mvt`.replace(`{${"z"}}`, encodeURIComponent(String(z))).replace(`{${"x"}}`, encodeURIComponent(String(x))).replace(`{${"y"}}`, encodeURIComponent(String(y)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get metadata about available tiles.  Returns information about zoom levels, bounds, and layer details.
     * @summary Get Tile Metadata
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetTileMetadata: async (options = {}) => {
      const localVarPath = `/api/v1/tiles/metadata`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get a custom tile style configuration.  Future endpoint for custom map styles.
     * @summary Get Tile Style
     * @param {string} styleId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetTileStyle: async (styleId, options = {}) => {
      assertParamExists("appsTilesApiGetTileStyle", "styleId", styleId);
      const localVarPath = `/api/v1/tiles/style/{style_id}`.replace(`{${"style_id"}}`, encodeURIComponent(String(styleId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check endpoint for tiles service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/tiles/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Invalidate all cached tiles for the current workspace.  This should be called when geofences are modified.
     * @summary Invalidate Tiles
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiInvalidateTiles: async (options = {}) => {
      const localVarPath = `/api/v1/tiles/invalidate`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var TilesApiFp = function(configuration) {
  const localVarAxiosParamCreator = TilesApiAxiosParamCreator(configuration);
  return {
    /**
     * Placeholder for raster tile support. Currently returns 404 as we only support vector tiles.
     * @summary Get Raster Tile
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTilesApiGetRasterTile(z, x, y, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTilesApiGetRasterTile(z, x, y, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TilesApi.appsTilesApiGetRasterTile"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Generate MVT tile for geofences.  Args:     z: Zoom level (0-16)     x: Tile X coordinate     y: Tile Y coordinate  Returns:     MVT tile binary data or 204 No Content for empty tiles
     * @summary Get Tile
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTilesApiGetTile(z, x, y, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTilesApiGetTile(z, x, y, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TilesApi.appsTilesApiGetTile"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get metadata about available tiles.  Returns information about zoom levels, bounds, and layer details.
     * @summary Get Tile Metadata
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTilesApiGetTileMetadata(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTilesApiGetTileMetadata(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TilesApi.appsTilesApiGetTileMetadata"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get a custom tile style configuration.  Future endpoint for custom map styles.
     * @summary Get Tile Style
     * @param {string} styleId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTilesApiGetTileStyle(styleId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTilesApiGetTileStyle(styleId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TilesApi.appsTilesApiGetTileStyle"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check endpoint for tiles service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTilesApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTilesApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TilesApi.appsTilesApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Invalidate all cached tiles for the current workspace.  This should be called when geofences are modified.
     * @summary Invalidate Tiles
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsTilesApiInvalidateTiles(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsTilesApiInvalidateTiles(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TilesApi.appsTilesApiInvalidateTiles"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var TilesApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = TilesApiFp(configuration);
  return {
    /**
     * Placeholder for raster tile support. Currently returns 404 as we only support vector tiles.
     * @summary Get Raster Tile
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetRasterTile(z, x, y, options) {
      return localVarFp.appsTilesApiGetRasterTile(z, x, y, options).then((request) => request(axios2, basePath));
    },
    /**
     * Generate MVT tile for geofences.  Args:     z: Zoom level (0-16)     x: Tile X coordinate     y: Tile Y coordinate  Returns:     MVT tile binary data or 204 No Content for empty tiles
     * @summary Get Tile
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetTile(z, x, y, options) {
      return localVarFp.appsTilesApiGetTile(z, x, y, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get metadata about available tiles.  Returns information about zoom levels, bounds, and layer details.
     * @summary Get Tile Metadata
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetTileMetadata(options) {
      return localVarFp.appsTilesApiGetTileMetadata(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get a custom tile style configuration.  Future endpoint for custom map styles.
     * @summary Get Tile Style
     * @param {string} styleId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiGetTileStyle(styleId, options) {
      return localVarFp.appsTilesApiGetTileStyle(styleId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check endpoint for tiles service.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiHealthCheck(options) {
      return localVarFp.appsTilesApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Invalidate all cached tiles for the current workspace.  This should be called when geofences are modified.
     * @summary Invalidate Tiles
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsTilesApiInvalidateTiles(options) {
      return localVarFp.appsTilesApiInvalidateTiles(options).then((request) => request(axios2, basePath));
    }
  };
};
var TilesApi = class extends BaseAPI {
  /**
   * Placeholder for raster tile support. Currently returns 404 as we only support vector tiles.
   * @summary Get Raster Tile
   * @param {number} z 
   * @param {number} x 
   * @param {number} y 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TilesApi
   */
  appsTilesApiGetRasterTile(z, x, y, options) {
    return TilesApiFp(this.configuration).appsTilesApiGetRasterTile(z, x, y, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Generate MVT tile for geofences.  Args:     z: Zoom level (0-16)     x: Tile X coordinate     y: Tile Y coordinate  Returns:     MVT tile binary data or 204 No Content for empty tiles
   * @summary Get Tile
   * @param {number} z 
   * @param {number} x 
   * @param {number} y 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TilesApi
   */
  appsTilesApiGetTile(z, x, y, options) {
    return TilesApiFp(this.configuration).appsTilesApiGetTile(z, x, y, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get metadata about available tiles.  Returns information about zoom levels, bounds, and layer details.
   * @summary Get Tile Metadata
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TilesApi
   */
  appsTilesApiGetTileMetadata(options) {
    return TilesApiFp(this.configuration).appsTilesApiGetTileMetadata(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get a custom tile style configuration.  Future endpoint for custom map styles.
   * @summary Get Tile Style
   * @param {string} styleId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TilesApi
   */
  appsTilesApiGetTileStyle(styleId, options) {
    return TilesApiFp(this.configuration).appsTilesApiGetTileStyle(styleId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check endpoint for tiles service.
   * @summary Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TilesApi
   */
  appsTilesApiHealthCheck(options) {
    return TilesApiFp(this.configuration).appsTilesApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Invalidate all cached tiles for the current workspace.  This should be called when geofences are modified.
   * @summary Invalidate Tiles
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TilesApi
   */
  appsTilesApiInvalidateTiles(options) {
    return TilesApiFp(this.configuration).appsTilesApiInvalidateTiles(options).then((request) => request(this.axios, this.basePath));
  }
};
var WebhooksApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Create a new webhook endpoint.
     * @summary Create Webhook
     * @param {CreateWebhookRequest} createWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiCreateWebhook: async (createWebhookRequest, options = {}) => {
      assertParamExists("appsWebhooksApiCreateWebhook", "createWebhookRequest", createWebhookRequest);
      const localVarPath = `/api/v1/webhooks/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(createWebhookRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete a webhook.
     * @summary Delete Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiDeleteWebhook: async (webhookId, options = {}) => {
      assertParamExists("appsWebhooksApiDeleteWebhook", "webhookId", webhookId);
      const localVarPath = `/api/v1/webhooks/{webhook_id}`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get Dead Letter Queue statistics for the workspace.  Returns aggregated metrics about failed webhook deliveries including total entries, requeued count, and breakdown by webhook.  Returns:     200: DLQ statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq/stats
     * @summary Get Dlq Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetDlqStats: async (options = {}) => {
      const localVarPath = `/api/v1/webhooks/dlq/stats`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get a specific webhook by ID.
     * @summary Get Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhook: async (webhookId, options = {}) => {
      assertParamExists("appsWebhooksApiGetWebhook", "webhookId", webhookId);
      const localVarPath = `/api/v1/webhooks/{webhook_id}`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get delivery history for a webhook.
     * @summary Get Webhook Deliveries
     * @param {string} webhookId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {string | null} [status] 
     * @param {string | null} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookDeliveries: async (webhookId, limit, offset, status, eventType, options = {}) => {
      assertParamExists("appsWebhooksApiGetWebhookDeliveries", "webhookId", webhookId);
      const localVarPath = `/api/v1/webhooks/{webhook_id}/deliveries`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      if (status !== void 0) {
        localVarQueryParameter["status"] = status;
      }
      if (eventType !== void 0) {
        localVarQueryParameter["event_type"] = eventType;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get detailed delivery information.
     * @summary Get Webhook Delivery Detail
     * @param {string} webhookId 
     * @param {string} deliveryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookDeliveryDetail: async (webhookId, deliveryId, options = {}) => {
      assertParamExists("appsWebhooksApiGetWebhookDeliveryDetail", "webhookId", webhookId);
      assertParamExists("appsWebhooksApiGetWebhookDeliveryDetail", "deliveryId", deliveryId);
      const localVarPath = `/api/v1/webhooks/{webhook_id}/deliveries/{delivery_id}`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId))).replace(`{${"delivery_id"}}`, encodeURIComponent(String(deliveryId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get current webhook delivery metrics (admin only).
     * @summary Get Webhook Metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookMetrics: async (options = {}) => {
      const localVarPath = `/api/v1/webhooks/metrics`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get webhook delivery success rate timeline for sparkline visualization.  Aggregates webhook delivery success rates over the specified time range, returning hourly or daily buckets depending on the range duration.  Args:     time_range: One of \'today\', \'week\', \'month\', \'custom\' (default: \'today\')     start_date: ISO date string for custom range start (YYYY-MM-DD)     end_date: ISO date string for custom range end (YYYY-MM-DD)  Returns:     200: Success rate timeline with current overall rate     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/success-timeline?time_range=week     Response: {         \"timeline\": [             {\"timestamp\": \"2025-10-01T00:00:00Z\", \"success_rate\": 95.2, \"total\": 100, \"successful\": 95},             ...         ],         \"current_rate\": 96.5,         \"total_deliveries\": 1000,         \"successful_deliveries\": 965     }
     * @summary Get Webhook Success Timeline
     * @param {string} [timeRange] 
     * @param {string | null} [startDate] 
     * @param {string | null} [endDate] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookSuccessTimeline: async (timeRange, startDate, endDate, options = {}) => {
      const localVarPath = `/api/v1/webhooks/success-timeline`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (timeRange !== void 0) {
        localVarQueryParameter["time_range"] = timeRange;
      }
      if (startDate !== void 0) {
        localVarQueryParameter["start_date"] = startDate;
      }
      if (endDate !== void 0) {
        localVarQueryParameter["end_date"] = endDate;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List webhook deliveries in Dead Letter Queue.  Returns failed webhook deliveries that have exhausted all retry attempts. Entries can be filtered by requeue status and are paginated for performance.  Args:     limit: Maximum number of entries to return (default: 50, max: 100)     offset: Number of entries to skip for pagination (default: 0)     requeued: Filter by requeue status (None = all, True = requeued only, False = not requeued)  Returns:     200: List of DLQ entries with pagination metadata     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq?limit=20&requeued=false
     * @summary List Dlq Entries
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [requeued] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiListDlqEntries: async (limit, offset, requeued, options = {}) => {
      const localVarPath = `/api/v1/webhooks/dlq`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      if (requeued !== void 0) {
        localVarQueryParameter["requeued"] = requeued;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List user\'s webhooks with pagination.
     * @summary List Webhooks
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [isActive] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiListWebhooks: async (limit, offset, isActive, options = {}) => {
      const localVarPath = `/api/v1/webhooks/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      if (isActive !== void 0) {
        localVarQueryParameter["is_active"] = isActive;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Receive incoming webhook from external service with signature verification.  This endpoint is PUBLIC and used when SpatialFlow receives webhooks from external services (e.g., payment providers, third-party integrations). The signature is verified using the configured secret for the webhook.  Security: This endpoint does not require authentication since external services cannot authenticate with our org context. Security is provided by signature validation.
     * @summary Receive Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiReceiveWebhook: async (webhookId, options = {}) => {
      assertParamExists("appsWebhooksApiReceiveWebhook", "webhookId", webhookId);
      const localVarPath = `/api/v1/webhooks/receive/{webhook_id}`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Manually retry a failed webhook delivery from Dead Letter Queue.  Marks the DLQ entry as requeued and creates a new delivery attempt. The webhook will go through the full retry logic again (7 attempts).  Args:     dlq_id: UUID of the DLQ entry to retry  Returns:     200: Successfully queued for retry with new task ID     400: Entry already requeued     401: Unauthorized - invalid or missing authentication     404: DLQ entry not found or doesn\'t belong to workspace  Example:     POST /api/v1/webhooks/dlq/550e8400-e29b-41d4-a716-446655440000/retry
     * @summary Retry From Dlq
     * @param {string} dlqId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiRetryFromDlq: async (dlqId, options = {}) => {
      assertParamExists("appsWebhooksApiRetryFromDlq", "dlqId", dlqId);
      const localVarPath = `/api/v1/webhooks/dlq/{dlq_id}/retry`.replace(`{${"dlq_id"}}`, encodeURIComponent(String(dlqId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Retry a failed webhook delivery.
     * @summary Retry Webhook Delivery
     * @param {string} webhookId 
     * @param {string} deliveryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiRetryWebhookDelivery: async (webhookId, deliveryId, options = {}) => {
      assertParamExists("appsWebhooksApiRetryWebhookDelivery", "webhookId", webhookId);
      assertParamExists("appsWebhooksApiRetryWebhookDelivery", "deliveryId", deliveryId);
      const localVarPath = `/api/v1/webhooks/{webhook_id}/deliveries/{delivery_id}/retry`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId))).replace(`{${"delivery_id"}}`, encodeURIComponent(String(deliveryId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test a webhook with a sample payload.
     * @summary Test Webhook
     * @param {string} webhookId 
     * @param {TestWebhookRequest} testWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiTestWebhook: async (webhookId, testWebhookRequest, options = {}) => {
      assertParamExists("appsWebhooksApiTestWebhook", "webhookId", webhookId);
      assertParamExists("appsWebhooksApiTestWebhook", "testWebhookRequest", testWebhookRequest);
      const localVarPath = `/api/v1/webhooks/{webhook_id}/test`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(testWebhookRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update an existing webhook.
     * @summary Update Webhook
     * @param {string} webhookId 
     * @param {UpdateWebhookRequest} updateWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiUpdateWebhook: async (webhookId, updateWebhookRequest, options = {}) => {
      assertParamExists("appsWebhooksApiUpdateWebhook", "webhookId", webhookId);
      assertParamExists("appsWebhooksApiUpdateWebhook", "updateWebhookRequest", updateWebhookRequest);
      const localVarPath = `/api/v1/webhooks/{webhook_id}`.replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateWebhookRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check for webhook service.
     * @summary Webhook Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiWebhookHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/webhooks/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var WebhooksApiFp = function(configuration) {
  const localVarAxiosParamCreator = WebhooksApiAxiosParamCreator(configuration);
  return {
    /**
     * Create a new webhook endpoint.
     * @summary Create Webhook
     * @param {CreateWebhookRequest} createWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiCreateWebhook(createWebhookRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiCreateWebhook(createWebhookRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiCreateWebhook"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete a webhook.
     * @summary Delete Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiDeleteWebhook(webhookId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiDeleteWebhook(webhookId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiDeleteWebhook"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get Dead Letter Queue statistics for the workspace.  Returns aggregated metrics about failed webhook deliveries including total entries, requeued count, and breakdown by webhook.  Returns:     200: DLQ statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq/stats
     * @summary Get Dlq Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiGetDlqStats(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiGetDlqStats(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiGetDlqStats"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get a specific webhook by ID.
     * @summary Get Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiGetWebhook(webhookId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiGetWebhook(webhookId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiGetWebhook"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get delivery history for a webhook.
     * @summary Get Webhook Deliveries
     * @param {string} webhookId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {string | null} [status] 
     * @param {string | null} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiGetWebhookDeliveries(webhookId, limit, offset, status, eventType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiGetWebhookDeliveries(webhookId, limit, offset, status, eventType, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiGetWebhookDeliveries"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get detailed delivery information.
     * @summary Get Webhook Delivery Detail
     * @param {string} webhookId 
     * @param {string} deliveryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiGetWebhookDeliveryDetail(webhookId, deliveryId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiGetWebhookDeliveryDetail(webhookId, deliveryId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiGetWebhookDeliveryDetail"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get current webhook delivery metrics (admin only).
     * @summary Get Webhook Metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiGetWebhookMetrics(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiGetWebhookMetrics(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiGetWebhookMetrics"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get webhook delivery success rate timeline for sparkline visualization.  Aggregates webhook delivery success rates over the specified time range, returning hourly or daily buckets depending on the range duration.  Args:     time_range: One of \'today\', \'week\', \'month\', \'custom\' (default: \'today\')     start_date: ISO date string for custom range start (YYYY-MM-DD)     end_date: ISO date string for custom range end (YYYY-MM-DD)  Returns:     200: Success rate timeline with current overall rate     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/success-timeline?time_range=week     Response: {         \"timeline\": [             {\"timestamp\": \"2025-10-01T00:00:00Z\", \"success_rate\": 95.2, \"total\": 100, \"successful\": 95},             ...         ],         \"current_rate\": 96.5,         \"total_deliveries\": 1000,         \"successful_deliveries\": 965     }
     * @summary Get Webhook Success Timeline
     * @param {string} [timeRange] 
     * @param {string | null} [startDate] 
     * @param {string | null} [endDate] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiGetWebhookSuccessTimeline(timeRange, startDate, endDate, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiGetWebhookSuccessTimeline(timeRange, startDate, endDate, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiGetWebhookSuccessTimeline"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List webhook deliveries in Dead Letter Queue.  Returns failed webhook deliveries that have exhausted all retry attempts. Entries can be filtered by requeue status and are paginated for performance.  Args:     limit: Maximum number of entries to return (default: 50, max: 100)     offset: Number of entries to skip for pagination (default: 0)     requeued: Filter by requeue status (None = all, True = requeued only, False = not requeued)  Returns:     200: List of DLQ entries with pagination metadata     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq?limit=20&requeued=false
     * @summary List Dlq Entries
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [requeued] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiListDlqEntries(limit, offset, requeued, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiListDlqEntries(limit, offset, requeued, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiListDlqEntries"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List user\'s webhooks with pagination.
     * @summary List Webhooks
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [isActive] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiListWebhooks(limit, offset, isActive, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiListWebhooks(limit, offset, isActive, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiListWebhooks"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Receive incoming webhook from external service with signature verification.  This endpoint is PUBLIC and used when SpatialFlow receives webhooks from external services (e.g., payment providers, third-party integrations). The signature is verified using the configured secret for the webhook.  Security: This endpoint does not require authentication since external services cannot authenticate with our org context. Security is provided by signature validation.
     * @summary Receive Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiReceiveWebhook(webhookId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiReceiveWebhook(webhookId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiReceiveWebhook"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Manually retry a failed webhook delivery from Dead Letter Queue.  Marks the DLQ entry as requeued and creates a new delivery attempt. The webhook will go through the full retry logic again (7 attempts).  Args:     dlq_id: UUID of the DLQ entry to retry  Returns:     200: Successfully queued for retry with new task ID     400: Entry already requeued     401: Unauthorized - invalid or missing authentication     404: DLQ entry not found or doesn\'t belong to workspace  Example:     POST /api/v1/webhooks/dlq/550e8400-e29b-41d4-a716-446655440000/retry
     * @summary Retry From Dlq
     * @param {string} dlqId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiRetryFromDlq(dlqId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiRetryFromDlq(dlqId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiRetryFromDlq"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Retry a failed webhook delivery.
     * @summary Retry Webhook Delivery
     * @param {string} webhookId 
     * @param {string} deliveryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiRetryWebhookDelivery(webhookId, deliveryId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiRetryWebhookDelivery(webhookId, deliveryId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiRetryWebhookDelivery"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test a webhook with a sample payload.
     * @summary Test Webhook
     * @param {string} webhookId 
     * @param {TestWebhookRequest} testWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiTestWebhook(webhookId, testWebhookRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiTestWebhook(webhookId, testWebhookRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiTestWebhook"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update an existing webhook.
     * @summary Update Webhook
     * @param {string} webhookId 
     * @param {UpdateWebhookRequest} updateWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiUpdateWebhook(webhookId, updateWebhookRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiUpdateWebhook(webhookId, updateWebhookRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiUpdateWebhook"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check for webhook service.
     * @summary Webhook Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWebhooksApiWebhookHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWebhooksApiWebhookHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WebhooksApi.appsWebhooksApiWebhookHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var WebhooksApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = WebhooksApiFp(configuration);
  return {
    /**
     * Create a new webhook endpoint.
     * @summary Create Webhook
     * @param {CreateWebhookRequest} createWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiCreateWebhook(createWebhookRequest, options) {
      return localVarFp.appsWebhooksApiCreateWebhook(createWebhookRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete a webhook.
     * @summary Delete Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiDeleteWebhook(webhookId, options) {
      return localVarFp.appsWebhooksApiDeleteWebhook(webhookId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get Dead Letter Queue statistics for the workspace.  Returns aggregated metrics about failed webhook deliveries including total entries, requeued count, and breakdown by webhook.  Returns:     200: DLQ statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq/stats
     * @summary Get Dlq Stats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetDlqStats(options) {
      return localVarFp.appsWebhooksApiGetDlqStats(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get a specific webhook by ID.
     * @summary Get Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhook(webhookId, options) {
      return localVarFp.appsWebhooksApiGetWebhook(webhookId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get delivery history for a webhook.
     * @summary Get Webhook Deliveries
     * @param {string} webhookId 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {string | null} [status] 
     * @param {string | null} [eventType] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookDeliveries(webhookId, limit, offset, status, eventType, options) {
      return localVarFp.appsWebhooksApiGetWebhookDeliveries(webhookId, limit, offset, status, eventType, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get detailed delivery information.
     * @summary Get Webhook Delivery Detail
     * @param {string} webhookId 
     * @param {string} deliveryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookDeliveryDetail(webhookId, deliveryId, options) {
      return localVarFp.appsWebhooksApiGetWebhookDeliveryDetail(webhookId, deliveryId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get current webhook delivery metrics (admin only).
     * @summary Get Webhook Metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookMetrics(options) {
      return localVarFp.appsWebhooksApiGetWebhookMetrics(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get webhook delivery success rate timeline for sparkline visualization.  Aggregates webhook delivery success rates over the specified time range, returning hourly or daily buckets depending on the range duration.  Args:     time_range: One of \'today\', \'week\', \'month\', \'custom\' (default: \'today\')     start_date: ISO date string for custom range start (YYYY-MM-DD)     end_date: ISO date string for custom range end (YYYY-MM-DD)  Returns:     200: Success rate timeline with current overall rate     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/success-timeline?time_range=week     Response: {         \"timeline\": [             {\"timestamp\": \"2025-10-01T00:00:00Z\", \"success_rate\": 95.2, \"total\": 100, \"successful\": 95},             ...         ],         \"current_rate\": 96.5,         \"total_deliveries\": 1000,         \"successful_deliveries\": 965     }
     * @summary Get Webhook Success Timeline
     * @param {string} [timeRange] 
     * @param {string | null} [startDate] 
     * @param {string | null} [endDate] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiGetWebhookSuccessTimeline(timeRange, startDate, endDate, options) {
      return localVarFp.appsWebhooksApiGetWebhookSuccessTimeline(timeRange, startDate, endDate, options).then((request) => request(axios2, basePath));
    },
    /**
     * List webhook deliveries in Dead Letter Queue.  Returns failed webhook deliveries that have exhausted all retry attempts. Entries can be filtered by requeue status and are paginated for performance.  Args:     limit: Maximum number of entries to return (default: 50, max: 100)     offset: Number of entries to skip for pagination (default: 0)     requeued: Filter by requeue status (None = all, True = requeued only, False = not requeued)  Returns:     200: List of DLQ entries with pagination metadata     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq?limit=20&requeued=false
     * @summary List Dlq Entries
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [requeued] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiListDlqEntries(limit, offset, requeued, options) {
      return localVarFp.appsWebhooksApiListDlqEntries(limit, offset, requeued, options).then((request) => request(axios2, basePath));
    },
    /**
     * List user\'s webhooks with pagination.
     * @summary List Webhooks
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [isActive] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiListWebhooks(limit, offset, isActive, options) {
      return localVarFp.appsWebhooksApiListWebhooks(limit, offset, isActive, options).then((request) => request(axios2, basePath));
    },
    /**
     * Receive incoming webhook from external service with signature verification.  This endpoint is PUBLIC and used when SpatialFlow receives webhooks from external services (e.g., payment providers, third-party integrations). The signature is verified using the configured secret for the webhook.  Security: This endpoint does not require authentication since external services cannot authenticate with our org context. Security is provided by signature validation.
     * @summary Receive Webhook
     * @param {string} webhookId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiReceiveWebhook(webhookId, options) {
      return localVarFp.appsWebhooksApiReceiveWebhook(webhookId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Manually retry a failed webhook delivery from Dead Letter Queue.  Marks the DLQ entry as requeued and creates a new delivery attempt. The webhook will go through the full retry logic again (7 attempts).  Args:     dlq_id: UUID of the DLQ entry to retry  Returns:     200: Successfully queued for retry with new task ID     400: Entry already requeued     401: Unauthorized - invalid or missing authentication     404: DLQ entry not found or doesn\'t belong to workspace  Example:     POST /api/v1/webhooks/dlq/550e8400-e29b-41d4-a716-446655440000/retry
     * @summary Retry From Dlq
     * @param {string} dlqId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiRetryFromDlq(dlqId, options) {
      return localVarFp.appsWebhooksApiRetryFromDlq(dlqId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Retry a failed webhook delivery.
     * @summary Retry Webhook Delivery
     * @param {string} webhookId 
     * @param {string} deliveryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiRetryWebhookDelivery(webhookId, deliveryId, options) {
      return localVarFp.appsWebhooksApiRetryWebhookDelivery(webhookId, deliveryId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Test a webhook with a sample payload.
     * @summary Test Webhook
     * @param {string} webhookId 
     * @param {TestWebhookRequest} testWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiTestWebhook(webhookId, testWebhookRequest, options) {
      return localVarFp.appsWebhooksApiTestWebhook(webhookId, testWebhookRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update an existing webhook.
     * @summary Update Webhook
     * @param {string} webhookId 
     * @param {UpdateWebhookRequest} updateWebhookRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiUpdateWebhook(webhookId, updateWebhookRequest, options) {
      return localVarFp.appsWebhooksApiUpdateWebhook(webhookId, updateWebhookRequest, options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check for webhook service.
     * @summary Webhook Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWebhooksApiWebhookHealthCheck(options) {
      return localVarFp.appsWebhooksApiWebhookHealthCheck(options).then((request) => request(axios2, basePath));
    }
  };
};
var WebhooksApi = class extends BaseAPI {
  /**
   * Create a new webhook endpoint.
   * @summary Create Webhook
   * @param {CreateWebhookRequest} createWebhookRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiCreateWebhook(createWebhookRequest, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiCreateWebhook(createWebhookRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete a webhook.
   * @summary Delete Webhook
   * @param {string} webhookId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiDeleteWebhook(webhookId, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiDeleteWebhook(webhookId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get Dead Letter Queue statistics for the workspace.  Returns aggregated metrics about failed webhook deliveries including total entries, requeued count, and breakdown by webhook.  Returns:     200: DLQ statistics     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq/stats
   * @summary Get Dlq Stats
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiGetDlqStats(options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiGetDlqStats(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get a specific webhook by ID.
   * @summary Get Webhook
   * @param {string} webhookId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiGetWebhook(webhookId, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiGetWebhook(webhookId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get delivery history for a webhook.
   * @summary Get Webhook Deliveries
   * @param {string} webhookId 
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {string | null} [status] 
   * @param {string | null} [eventType] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiGetWebhookDeliveries(webhookId, limit, offset, status, eventType, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiGetWebhookDeliveries(webhookId, limit, offset, status, eventType, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get detailed delivery information.
   * @summary Get Webhook Delivery Detail
   * @param {string} webhookId 
   * @param {string} deliveryId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiGetWebhookDeliveryDetail(webhookId, deliveryId, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiGetWebhookDeliveryDetail(webhookId, deliveryId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get current webhook delivery metrics (admin only).
   * @summary Get Webhook Metrics
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiGetWebhookMetrics(options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiGetWebhookMetrics(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get webhook delivery success rate timeline for sparkline visualization.  Aggregates webhook delivery success rates over the specified time range, returning hourly or daily buckets depending on the range duration.  Args:     time_range: One of \'today\', \'week\', \'month\', \'custom\' (default: \'today\')     start_date: ISO date string for custom range start (YYYY-MM-DD)     end_date: ISO date string for custom range end (YYYY-MM-DD)  Returns:     200: Success rate timeline with current overall rate     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/success-timeline?time_range=week     Response: {         \"timeline\": [             {\"timestamp\": \"2025-10-01T00:00:00Z\", \"success_rate\": 95.2, \"total\": 100, \"successful\": 95},             ...         ],         \"current_rate\": 96.5,         \"total_deliveries\": 1000,         \"successful_deliveries\": 965     }
   * @summary Get Webhook Success Timeline
   * @param {string} [timeRange] 
   * @param {string | null} [startDate] 
   * @param {string | null} [endDate] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiGetWebhookSuccessTimeline(timeRange, startDate, endDate, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiGetWebhookSuccessTimeline(timeRange, startDate, endDate, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List webhook deliveries in Dead Letter Queue.  Returns failed webhook deliveries that have exhausted all retry attempts. Entries can be filtered by requeue status and are paginated for performance.  Args:     limit: Maximum number of entries to return (default: 50, max: 100)     offset: Number of entries to skip for pagination (default: 0)     requeued: Filter by requeue status (None = all, True = requeued only, False = not requeued)  Returns:     200: List of DLQ entries with pagination metadata     401: Unauthorized - invalid or missing authentication  Example:     GET /api/v1/webhooks/dlq?limit=20&requeued=false
   * @summary List Dlq Entries
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {boolean | null} [requeued] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiListDlqEntries(limit, offset, requeued, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiListDlqEntries(limit, offset, requeued, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List user\'s webhooks with pagination.
   * @summary List Webhooks
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {boolean | null} [isActive] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiListWebhooks(limit, offset, isActive, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiListWebhooks(limit, offset, isActive, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Receive incoming webhook from external service with signature verification.  This endpoint is PUBLIC and used when SpatialFlow receives webhooks from external services (e.g., payment providers, third-party integrations). The signature is verified using the configured secret for the webhook.  Security: This endpoint does not require authentication since external services cannot authenticate with our org context. Security is provided by signature validation.
   * @summary Receive Webhook
   * @param {string} webhookId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiReceiveWebhook(webhookId, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiReceiveWebhook(webhookId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Manually retry a failed webhook delivery from Dead Letter Queue.  Marks the DLQ entry as requeued and creates a new delivery attempt. The webhook will go through the full retry logic again (7 attempts).  Args:     dlq_id: UUID of the DLQ entry to retry  Returns:     200: Successfully queued for retry with new task ID     400: Entry already requeued     401: Unauthorized - invalid or missing authentication     404: DLQ entry not found or doesn\'t belong to workspace  Example:     POST /api/v1/webhooks/dlq/550e8400-e29b-41d4-a716-446655440000/retry
   * @summary Retry From Dlq
   * @param {string} dlqId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiRetryFromDlq(dlqId, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiRetryFromDlq(dlqId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Retry a failed webhook delivery.
   * @summary Retry Webhook Delivery
   * @param {string} webhookId 
   * @param {string} deliveryId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiRetryWebhookDelivery(webhookId, deliveryId, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiRetryWebhookDelivery(webhookId, deliveryId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test a webhook with a sample payload.
   * @summary Test Webhook
   * @param {string} webhookId 
   * @param {TestWebhookRequest} testWebhookRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiTestWebhook(webhookId, testWebhookRequest, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiTestWebhook(webhookId, testWebhookRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update an existing webhook.
   * @summary Update Webhook
   * @param {string} webhookId 
   * @param {UpdateWebhookRequest} updateWebhookRequest 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiUpdateWebhook(webhookId, updateWebhookRequest, options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiUpdateWebhook(webhookId, updateWebhookRequest, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check for webhook service.
   * @summary Webhook Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebhooksApi
   */
  appsWebhooksApiWebhookHealthCheck(options) {
    return WebhooksApiFp(this.configuration).appsWebhooksApiWebhookHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
};
var WorkflowsApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Create a new workflow.
     * @summary Create Workflow
     * @param {WorkflowIn} workflowIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiCreateWorkflow: async (workflowIn, options = {}) => {
      assertParamExists("appsWorkflowsApiCreateWorkflow", "workflowIn", workflowIn);
      const localVarPath = `/api/v1/workflows`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(workflowIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Create a workflow from a template.
     * @summary Create Workflow From Template
     * @param {string} templateId 
     * @param {CreateFromTemplateIn} createFromTemplateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiCreateWorkflowFromTemplate: async (templateId, createFromTemplateIn, options = {}) => {
      assertParamExists("appsWorkflowsApiCreateWorkflowFromTemplate", "templateId", templateId);
      assertParamExists("appsWorkflowsApiCreateWorkflowFromTemplate", "createFromTemplateIn", createFromTemplateIn);
      const localVarPath = `/api/v1/workflows/templates/{template_id}/use`.replace(`{${"template_id"}}`, encodeURIComponent(String(templateId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(createFromTemplateIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Delete a workflow.
     * @summary Delete Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiDeleteWorkflow: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiDeleteWorkflow", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Duplicate an existing workflow.
     * @summary Duplicate Workflow
     * @param {string} workflowId 
     * @param {string} name 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiDuplicateWorkflow: async (workflowId, name, options = {}) => {
      assertParamExists("appsWorkflowsApiDuplicateWorkflow", "workflowId", workflowId);
      assertParamExists("appsWorkflowsApiDuplicateWorkflow", "name", name);
      const localVarPath = `/api/v1/workflows/{workflow_id}/duplicate`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (name !== void 0) {
        localVarQueryParameter["name"] = name;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Manually execute a workflow.
     * @summary Execute Workflow
     * @param {string} workflowId 
     * @param {{ [key: string]: any; } | null} [testData] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiExecuteWorkflow: async (workflowId, testData, options = {}) => {
      assertParamExists("appsWorkflowsApiExecuteWorkflow", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/execute`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (testData !== void 0) {
        for (const [key, value] of Object.entries(testData)) {
          localVarQueryParameter[key] = value;
        }
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Export workflow as JSON.
     * @summary Export Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiExportWorkflow: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiExportWorkflow", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/export`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get available retry policies and configuration options.
     * @summary Get Available Retry Policies
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetAvailableRetryPolicies: async (options = {}) => {
      const localVarPath = `/api/v1/workflows/retry-policies`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get detailed execution information including steps.
     * @summary Get Execution Details
     * @param {string} executionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetExecutionDetails: async (executionId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetExecutionDetails", "executionId", executionId);
      const localVarPath = `/api/v1/workflows/executions/{execution_id}`.replace(`{${"execution_id"}}`, encodeURIComponent(String(executionId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get overall system performance summary for the user.
     * @summary Get System Performance Summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetSystemPerformanceSummary: async (options = {}) => {
      const localVarPath = `/api/v1/workflows/performance/summary`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Compare a specific version with the current workflow state.  Returns a diff showing what changed between the version and current state.
     * @summary Get Version Diff
     * @param {string} workflowId 
     * @param {number} versionNumber 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetVersionDiff: async (workflowId, versionNumber, options = {}) => {
      assertParamExists("appsWorkflowsApiGetVersionDiff", "workflowId", workflowId);
      assertParamExists("appsWorkflowsApiGetVersionDiff", "versionNumber", versionNumber);
      const localVarPath = `/api/v1/workflows/{workflow_id}/versions/{version_number}/diff`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId))).replace(`{${"version_number"}}`, encodeURIComponent(String(versionNumber)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get workflow details.
     * @summary Get Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflow: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflow", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Identify performance bottlenecks in a workflow.
     * @summary Get Workflow Bottlenecks
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowBottlenecks: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowBottlenecks", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/performance/bottlenecks`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get detailed execution information for a specific workflow execution.
     * @summary Get Workflow Execution Detail
     * @param {string} workflowId 
     * @param {string} executionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowExecutionDetail: async (workflowId, executionId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowExecutionDetail", "workflowId", workflowId);
      assertParamExists("appsWorkflowsApiGetWorkflowExecutionDetail", "executionId", executionId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/executions/{execution_id}`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId))).replace(`{${"execution_id"}}`, encodeURIComponent(String(executionId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get execution history for a specific workflow.
     * @summary Get Workflow Executions
     * @param {string} workflowId 
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowExecutions: async (workflowId, status, limit, offset, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowExecutions", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/executions`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (status !== void 0) {
        localVarQueryParameter["status"] = status;
      }
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get performance metrics for a workflow.
     * @summary Get Workflow Performance
     * @param {string} workflowId 
     * @param {string | null} [startDate] 
     * @param {string | null} [endDate] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowPerformance: async (workflowId, startDate, endDate, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowPerformance", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/performance`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (startDate !== void 0) {
        localVarQueryParameter["start_date"] = startDate instanceof Date ? startDate.toISOString() : startDate;
      }
      if (endDate !== void 0) {
        localVarQueryParameter["end_date"] = endDate instanceof Date ? endDate.toISOString() : endDate;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get retry policy configuration for a workflow.
     * @summary Get Workflow Retry Policy
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowRetryPolicy: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowRetryPolicy", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/retry-policy`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get detailed statistics for a workflow.
     * @summary Get Workflow Statistics
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowStatistics: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowStatistics", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/statistics`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get performance breakdown by workflow step.
     * @summary Get Workflow Step Performance
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowStepPerformance: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowStepPerformance", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/performance/steps`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get workflow template details.
     * @summary Get Workflow Template
     * @param {string} templateId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowTemplate: async (templateId, options = {}) => {
      assertParamExists("appsWorkflowsApiGetWorkflowTemplate", "templateId", templateId);
      const localVarPath = `/api/v1/workflows/templates/{template_id}`.replace(`{${"template_id"}}`, encodeURIComponent(String(templateId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Health check endpoint.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiHealthCheck: async (options = {}) => {
      const localVarPath = `/api/v1/workflows/health`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Import workflow from JSON.
     * @summary Import Workflow
     * @param {WorkflowImportSchema} workflowImportSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiImportWorkflow: async (workflowImportSchema, options = {}) => {
      assertParamExists("appsWorkflowsApiImportWorkflow", "workflowImportSchema", workflowImportSchema);
      const localVarPath = `/api/v1/workflows/import`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(workflowImportSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List workflow executions with filtering.
     * @summary List Workflow Executions
     * @param {string | null} [workflowId] 
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflowExecutions: async (workflowId, status, limit, offset, options = {}) => {
      const localVarPath = `/api/v1/workflows/executions`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (workflowId !== void 0) {
        localVarQueryParameter["workflow_id"] = workflowId;
      }
      if (status !== void 0) {
        localVarQueryParameter["status"] = status;
      }
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List available workflow templates.
     * @summary List Workflow Templates
     * @param {string | null} [category] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflowTemplates: async (category, options = {}) => {
      const localVarPath = `/api/v1/workflows/templates`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (category !== void 0) {
        localVarQueryParameter["category"] = category;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List all versions of a workflow.  Returns versions in descending order (newest first).
     * @summary List Workflow Versions
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflowVersions: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiListWorkflowVersions", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/versions`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * List user\'s workflows with filtering.
     * @summary List Workflows
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [isActive] 
     * @param {string | null} [category] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflows: async (limit, offset, isActive, category, search, options = {}) => {
      const localVarPath = `/api/v1/workflows`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      if (limit !== void 0) {
        localVarQueryParameter["limit"] = limit;
      }
      if (offset !== void 0) {
        localVarQueryParameter["offset"] = offset;
      }
      if (isActive !== void 0) {
        localVarQueryParameter["is_active"] = isActive;
      }
      if (category !== void 0) {
        localVarQueryParameter["category"] = category;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Restore a workflow to a previous version.  This creates a new version with the snapshot data from the specified version.
     * @summary Restore Workflow Version
     * @param {string} workflowId 
     * @param {number} versionNumber 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiRestoreWorkflowVersion: async (workflowId, versionNumber, options = {}) => {
      assertParamExists("appsWorkflowsApiRestoreWorkflowVersion", "workflowId", workflowId);
      assertParamExists("appsWorkflowsApiRestoreWorkflowVersion", "versionNumber", versionNumber);
      const localVarPath = `/api/v1/workflows/{workflow_id}/versions/{version_number}/restore`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId))).replace(`{${"version_number"}}`, encodeURIComponent(String(versionNumber)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Test workflow configuration with sample data.
     * @summary Test Workflow
     * @param {string} workflowId 
     * @param {TestWorkflowIn} testWorkflowIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiTestWorkflow: async (workflowId, testWorkflowIn, options = {}) => {
      assertParamExists("appsWorkflowsApiTestWorkflow", "workflowId", workflowId);
      assertParamExists("appsWorkflowsApiTestWorkflow", "testWorkflowIn", testWorkflowIn);
      const localVarPath = `/api/v1/workflows/{workflow_id}/test`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(testWorkflowIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Toggle workflow between active and paused states.
     * @summary Toggle Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiToggleWorkflow: async (workflowId, options = {}) => {
      assertParamExists("appsWorkflowsApiToggleWorkflow", "workflowId", workflowId);
      const localVarPath = `/api/v1/workflows/{workflow_id}/toggle`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update workflow configuration.
     * @summary Update Workflow
     * @param {string} workflowId 
     * @param {WorkflowUpdate} workflowUpdate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiUpdateWorkflow: async (workflowId, workflowUpdate, options = {}) => {
      assertParamExists("appsWorkflowsApiUpdateWorkflow", "workflowId", workflowId);
      assertParamExists("appsWorkflowsApiUpdateWorkflow", "workflowUpdate", workflowUpdate);
      const localVarPath = `/api/v1/workflows/{workflow_id}`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(workflowUpdate, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update retry policy configuration for a workflow.
     * @summary Update Workflow Retry Policy
     * @param {string} workflowId 
     * @param {WorkflowRetryPolicyUpdateSchema} workflowRetryPolicyUpdateSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiUpdateWorkflowRetryPolicy: async (workflowId, workflowRetryPolicyUpdateSchema, options = {}) => {
      assertParamExists("appsWorkflowsApiUpdateWorkflowRetryPolicy", "workflowId", workflowId);
      assertParamExists("appsWorkflowsApiUpdateWorkflowRetryPolicy", "workflowRetryPolicyUpdateSchema", workflowRetryPolicyUpdateSchema);
      const localVarPath = `/api/v1/workflows/{workflow_id}/retry-policy`.replace(`{${"workflow_id"}}`, encodeURIComponent(String(workflowId)));
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-API-KEY", configuration);
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(workflowRetryPolicyUpdateSchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var WorkflowsApiFp = function(configuration) {
  const localVarAxiosParamCreator = WorkflowsApiAxiosParamCreator(configuration);
  return {
    /**
     * Create a new workflow.
     * @summary Create Workflow
     * @param {WorkflowIn} workflowIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiCreateWorkflow(workflowIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiCreateWorkflow(workflowIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiCreateWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Create a workflow from a template.
     * @summary Create Workflow From Template
     * @param {string} templateId 
     * @param {CreateFromTemplateIn} createFromTemplateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiCreateWorkflowFromTemplate(templateId, createFromTemplateIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiCreateWorkflowFromTemplate(templateId, createFromTemplateIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiCreateWorkflowFromTemplate"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Delete a workflow.
     * @summary Delete Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiDeleteWorkflow(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiDeleteWorkflow(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiDeleteWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Duplicate an existing workflow.
     * @summary Duplicate Workflow
     * @param {string} workflowId 
     * @param {string} name 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiDuplicateWorkflow(workflowId, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiDuplicateWorkflow(workflowId, name, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiDuplicateWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Manually execute a workflow.
     * @summary Execute Workflow
     * @param {string} workflowId 
     * @param {{ [key: string]: any; } | null} [testData] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiExecuteWorkflow(workflowId, testData, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiExecuteWorkflow(workflowId, testData, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiExecuteWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Export workflow as JSON.
     * @summary Export Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiExportWorkflow(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiExportWorkflow(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiExportWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get available retry policies and configuration options.
     * @summary Get Available Retry Policies
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetAvailableRetryPolicies(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetAvailableRetryPolicies(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetAvailableRetryPolicies"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get detailed execution information including steps.
     * @summary Get Execution Details
     * @param {string} executionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetExecutionDetails(executionId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetExecutionDetails(executionId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetExecutionDetails"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get overall system performance summary for the user.
     * @summary Get System Performance Summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetSystemPerformanceSummary(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetSystemPerformanceSummary(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetSystemPerformanceSummary"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Compare a specific version with the current workflow state.  Returns a diff showing what changed between the version and current state.
     * @summary Get Version Diff
     * @param {string} workflowId 
     * @param {number} versionNumber 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetVersionDiff(workflowId, versionNumber, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetVersionDiff(workflowId, versionNumber, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetVersionDiff"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get workflow details.
     * @summary Get Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflow(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflow(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Identify performance bottlenecks in a workflow.
     * @summary Get Workflow Bottlenecks
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowBottlenecks(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowBottlenecks(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowBottlenecks"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get detailed execution information for a specific workflow execution.
     * @summary Get Workflow Execution Detail
     * @param {string} workflowId 
     * @param {string} executionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowExecutionDetail(workflowId, executionId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowExecutionDetail(workflowId, executionId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowExecutionDetail"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get execution history for a specific workflow.
     * @summary Get Workflow Executions
     * @param {string} workflowId 
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowExecutions(workflowId, status, limit, offset, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowExecutions(workflowId, status, limit, offset, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowExecutions"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get performance metrics for a workflow.
     * @summary Get Workflow Performance
     * @param {string} workflowId 
     * @param {string | null} [startDate] 
     * @param {string | null} [endDate] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowPerformance(workflowId, startDate, endDate, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowPerformance(workflowId, startDate, endDate, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowPerformance"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get retry policy configuration for a workflow.
     * @summary Get Workflow Retry Policy
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowRetryPolicy(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowRetryPolicy(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowRetryPolicy"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get detailed statistics for a workflow.
     * @summary Get Workflow Statistics
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowStatistics(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowStatistics(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowStatistics"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get performance breakdown by workflow step.
     * @summary Get Workflow Step Performance
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowStepPerformance(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowStepPerformance(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowStepPerformance"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get workflow template details.
     * @summary Get Workflow Template
     * @param {string} templateId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiGetWorkflowTemplate(templateId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiGetWorkflowTemplate(templateId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiGetWorkflowTemplate"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Health check endpoint.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiHealthCheck(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiHealthCheck(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiHealthCheck"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Import workflow from JSON.
     * @summary Import Workflow
     * @param {WorkflowImportSchema} workflowImportSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiImportWorkflow(workflowImportSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiImportWorkflow(workflowImportSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiImportWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List workflow executions with filtering.
     * @summary List Workflow Executions
     * @param {string | null} [workflowId] 
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiListWorkflowExecutions(workflowId, status, limit, offset, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiListWorkflowExecutions(workflowId, status, limit, offset, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiListWorkflowExecutions"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List available workflow templates.
     * @summary List Workflow Templates
     * @param {string | null} [category] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiListWorkflowTemplates(category, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiListWorkflowTemplates(category, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiListWorkflowTemplates"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List all versions of a workflow.  Returns versions in descending order (newest first).
     * @summary List Workflow Versions
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiListWorkflowVersions(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiListWorkflowVersions(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiListWorkflowVersions"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * List user\'s workflows with filtering.
     * @summary List Workflows
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [isActive] 
     * @param {string | null} [category] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiListWorkflows(limit, offset, isActive, category, search, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiListWorkflows(limit, offset, isActive, category, search, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiListWorkflows"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Restore a workflow to a previous version.  This creates a new version with the snapshot data from the specified version.
     * @summary Restore Workflow Version
     * @param {string} workflowId 
     * @param {number} versionNumber 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiRestoreWorkflowVersion(workflowId, versionNumber, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiRestoreWorkflowVersion(workflowId, versionNumber, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiRestoreWorkflowVersion"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Test workflow configuration with sample data.
     * @summary Test Workflow
     * @param {string} workflowId 
     * @param {TestWorkflowIn} testWorkflowIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiTestWorkflow(workflowId, testWorkflowIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiTestWorkflow(workflowId, testWorkflowIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiTestWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Toggle workflow between active and paused states.
     * @summary Toggle Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiToggleWorkflow(workflowId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiToggleWorkflow(workflowId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiToggleWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update workflow configuration.
     * @summary Update Workflow
     * @param {string} workflowId 
     * @param {WorkflowUpdate} workflowUpdate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiUpdateWorkflow(workflowId, workflowUpdate, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiUpdateWorkflow(workflowId, workflowUpdate, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiUpdateWorkflow"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update retry policy configuration for a workflow.
     * @summary Update Workflow Retry Policy
     * @param {string} workflowId 
     * @param {WorkflowRetryPolicyUpdateSchema} workflowRetryPolicyUpdateSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkflowsApiUpdateWorkflowRetryPolicy(workflowId, workflowRetryPolicyUpdateSchema, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkflowsApiUpdateWorkflowRetryPolicy(workflowId, workflowRetryPolicyUpdateSchema, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkflowsApi.appsWorkflowsApiUpdateWorkflowRetryPolicy"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var WorkflowsApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = WorkflowsApiFp(configuration);
  return {
    /**
     * Create a new workflow.
     * @summary Create Workflow
     * @param {WorkflowIn} workflowIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiCreateWorkflow(workflowIn, options) {
      return localVarFp.appsWorkflowsApiCreateWorkflow(workflowIn, options).then((request) => request(axios2, basePath));
    },
    /**
     * Create a workflow from a template.
     * @summary Create Workflow From Template
     * @param {string} templateId 
     * @param {CreateFromTemplateIn} createFromTemplateIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiCreateWorkflowFromTemplate(templateId, createFromTemplateIn, options) {
      return localVarFp.appsWorkflowsApiCreateWorkflowFromTemplate(templateId, createFromTemplateIn, options).then((request) => request(axios2, basePath));
    },
    /**
     * Delete a workflow.
     * @summary Delete Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiDeleteWorkflow(workflowId, options) {
      return localVarFp.appsWorkflowsApiDeleteWorkflow(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Duplicate an existing workflow.
     * @summary Duplicate Workflow
     * @param {string} workflowId 
     * @param {string} name 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiDuplicateWorkflow(workflowId, name, options) {
      return localVarFp.appsWorkflowsApiDuplicateWorkflow(workflowId, name, options).then((request) => request(axios2, basePath));
    },
    /**
     * Manually execute a workflow.
     * @summary Execute Workflow
     * @param {string} workflowId 
     * @param {{ [key: string]: any; } | null} [testData] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiExecuteWorkflow(workflowId, testData, options) {
      return localVarFp.appsWorkflowsApiExecuteWorkflow(workflowId, testData, options).then((request) => request(axios2, basePath));
    },
    /**
     * Export workflow as JSON.
     * @summary Export Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiExportWorkflow(workflowId, options) {
      return localVarFp.appsWorkflowsApiExportWorkflow(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get available retry policies and configuration options.
     * @summary Get Available Retry Policies
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetAvailableRetryPolicies(options) {
      return localVarFp.appsWorkflowsApiGetAvailableRetryPolicies(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get detailed execution information including steps.
     * @summary Get Execution Details
     * @param {string} executionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetExecutionDetails(executionId, options) {
      return localVarFp.appsWorkflowsApiGetExecutionDetails(executionId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get overall system performance summary for the user.
     * @summary Get System Performance Summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetSystemPerformanceSummary(options) {
      return localVarFp.appsWorkflowsApiGetSystemPerformanceSummary(options).then((request) => request(axios2, basePath));
    },
    /**
     * Compare a specific version with the current workflow state.  Returns a diff showing what changed between the version and current state.
     * @summary Get Version Diff
     * @param {string} workflowId 
     * @param {number} versionNumber 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetVersionDiff(workflowId, versionNumber, options) {
      return localVarFp.appsWorkflowsApiGetVersionDiff(workflowId, versionNumber, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get workflow details.
     * @summary Get Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflow(workflowId, options) {
      return localVarFp.appsWorkflowsApiGetWorkflow(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Identify performance bottlenecks in a workflow.
     * @summary Get Workflow Bottlenecks
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowBottlenecks(workflowId, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowBottlenecks(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get detailed execution information for a specific workflow execution.
     * @summary Get Workflow Execution Detail
     * @param {string} workflowId 
     * @param {string} executionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowExecutionDetail(workflowId, executionId, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowExecutionDetail(workflowId, executionId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get execution history for a specific workflow.
     * @summary Get Workflow Executions
     * @param {string} workflowId 
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowExecutions(workflowId, status, limit, offset, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowExecutions(workflowId, status, limit, offset, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get performance metrics for a workflow.
     * @summary Get Workflow Performance
     * @param {string} workflowId 
     * @param {string | null} [startDate] 
     * @param {string | null} [endDate] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowPerformance(workflowId, startDate, endDate, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowPerformance(workflowId, startDate, endDate, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get retry policy configuration for a workflow.
     * @summary Get Workflow Retry Policy
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowRetryPolicy(workflowId, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowRetryPolicy(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get detailed statistics for a workflow.
     * @summary Get Workflow Statistics
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowStatistics(workflowId, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowStatistics(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get performance breakdown by workflow step.
     * @summary Get Workflow Step Performance
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowStepPerformance(workflowId, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowStepPerformance(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Get workflow template details.
     * @summary Get Workflow Template
     * @param {string} templateId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiGetWorkflowTemplate(templateId, options) {
      return localVarFp.appsWorkflowsApiGetWorkflowTemplate(templateId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Health check endpoint.
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiHealthCheck(options) {
      return localVarFp.appsWorkflowsApiHealthCheck(options).then((request) => request(axios2, basePath));
    },
    /**
     * Import workflow from JSON.
     * @summary Import Workflow
     * @param {WorkflowImportSchema} workflowImportSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiImportWorkflow(workflowImportSchema, options) {
      return localVarFp.appsWorkflowsApiImportWorkflow(workflowImportSchema, options).then((request) => request(axios2, basePath));
    },
    /**
     * List workflow executions with filtering.
     * @summary List Workflow Executions
     * @param {string | null} [workflowId] 
     * @param {string | null} [status] 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflowExecutions(workflowId, status, limit, offset, options) {
      return localVarFp.appsWorkflowsApiListWorkflowExecutions(workflowId, status, limit, offset, options).then((request) => request(axios2, basePath));
    },
    /**
     * List available workflow templates.
     * @summary List Workflow Templates
     * @param {string | null} [category] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflowTemplates(category, options) {
      return localVarFp.appsWorkflowsApiListWorkflowTemplates(category, options).then((request) => request(axios2, basePath));
    },
    /**
     * List all versions of a workflow.  Returns versions in descending order (newest first).
     * @summary List Workflow Versions
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflowVersions(workflowId, options) {
      return localVarFp.appsWorkflowsApiListWorkflowVersions(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * List user\'s workflows with filtering.
     * @summary List Workflows
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {boolean | null} [isActive] 
     * @param {string | null} [category] 
     * @param {string | null} [search] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiListWorkflows(limit, offset, isActive, category, search, options) {
      return localVarFp.appsWorkflowsApiListWorkflows(limit, offset, isActive, category, search, options).then((request) => request(axios2, basePath));
    },
    /**
     * Restore a workflow to a previous version.  This creates a new version with the snapshot data from the specified version.
     * @summary Restore Workflow Version
     * @param {string} workflowId 
     * @param {number} versionNumber 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiRestoreWorkflowVersion(workflowId, versionNumber, options) {
      return localVarFp.appsWorkflowsApiRestoreWorkflowVersion(workflowId, versionNumber, options).then((request) => request(axios2, basePath));
    },
    /**
     * Test workflow configuration with sample data.
     * @summary Test Workflow
     * @param {string} workflowId 
     * @param {TestWorkflowIn} testWorkflowIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiTestWorkflow(workflowId, testWorkflowIn, options) {
      return localVarFp.appsWorkflowsApiTestWorkflow(workflowId, testWorkflowIn, options).then((request) => request(axios2, basePath));
    },
    /**
     * Toggle workflow between active and paused states.
     * @summary Toggle Workflow
     * @param {string} workflowId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiToggleWorkflow(workflowId, options) {
      return localVarFp.appsWorkflowsApiToggleWorkflow(workflowId, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update workflow configuration.
     * @summary Update Workflow
     * @param {string} workflowId 
     * @param {WorkflowUpdate} workflowUpdate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiUpdateWorkflow(workflowId, workflowUpdate, options) {
      return localVarFp.appsWorkflowsApiUpdateWorkflow(workflowId, workflowUpdate, options).then((request) => request(axios2, basePath));
    },
    /**
     * Update retry policy configuration for a workflow.
     * @summary Update Workflow Retry Policy
     * @param {string} workflowId 
     * @param {WorkflowRetryPolicyUpdateSchema} workflowRetryPolicyUpdateSchema 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkflowsApiUpdateWorkflowRetryPolicy(workflowId, workflowRetryPolicyUpdateSchema, options) {
      return localVarFp.appsWorkflowsApiUpdateWorkflowRetryPolicy(workflowId, workflowRetryPolicyUpdateSchema, options).then((request) => request(axios2, basePath));
    }
  };
};
var WorkflowsApi = class extends BaseAPI {
  /**
   * Create a new workflow.
   * @summary Create Workflow
   * @param {WorkflowIn} workflowIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiCreateWorkflow(workflowIn, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiCreateWorkflow(workflowIn, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Create a workflow from a template.
   * @summary Create Workflow From Template
   * @param {string} templateId 
   * @param {CreateFromTemplateIn} createFromTemplateIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiCreateWorkflowFromTemplate(templateId, createFromTemplateIn, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiCreateWorkflowFromTemplate(templateId, createFromTemplateIn, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete a workflow.
   * @summary Delete Workflow
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiDeleteWorkflow(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiDeleteWorkflow(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Duplicate an existing workflow.
   * @summary Duplicate Workflow
   * @param {string} workflowId 
   * @param {string} name 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiDuplicateWorkflow(workflowId, name, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiDuplicateWorkflow(workflowId, name, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Manually execute a workflow.
   * @summary Execute Workflow
   * @param {string} workflowId 
   * @param {{ [key: string]: any; } | null} [testData] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiExecuteWorkflow(workflowId, testData, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiExecuteWorkflow(workflowId, testData, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Export workflow as JSON.
   * @summary Export Workflow
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiExportWorkflow(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiExportWorkflow(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get available retry policies and configuration options.
   * @summary Get Available Retry Policies
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetAvailableRetryPolicies(options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetAvailableRetryPolicies(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get detailed execution information including steps.
   * @summary Get Execution Details
   * @param {string} executionId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetExecutionDetails(executionId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetExecutionDetails(executionId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get overall system performance summary for the user.
   * @summary Get System Performance Summary
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetSystemPerformanceSummary(options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetSystemPerformanceSummary(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Compare a specific version with the current workflow state.  Returns a diff showing what changed between the version and current state.
   * @summary Get Version Diff
   * @param {string} workflowId 
   * @param {number} versionNumber 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetVersionDiff(workflowId, versionNumber, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetVersionDiff(workflowId, versionNumber, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get workflow details.
   * @summary Get Workflow
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflow(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflow(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Identify performance bottlenecks in a workflow.
   * @summary Get Workflow Bottlenecks
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowBottlenecks(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowBottlenecks(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get detailed execution information for a specific workflow execution.
   * @summary Get Workflow Execution Detail
   * @param {string} workflowId 
   * @param {string} executionId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowExecutionDetail(workflowId, executionId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowExecutionDetail(workflowId, executionId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get execution history for a specific workflow.
   * @summary Get Workflow Executions
   * @param {string} workflowId 
   * @param {string | null} [status] 
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowExecutions(workflowId, status, limit, offset, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowExecutions(workflowId, status, limit, offset, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get performance metrics for a workflow.
   * @summary Get Workflow Performance
   * @param {string} workflowId 
   * @param {string | null} [startDate] 
   * @param {string | null} [endDate] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowPerformance(workflowId, startDate, endDate, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowPerformance(workflowId, startDate, endDate, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get retry policy configuration for a workflow.
   * @summary Get Workflow Retry Policy
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowRetryPolicy(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowRetryPolicy(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get detailed statistics for a workflow.
   * @summary Get Workflow Statistics
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowStatistics(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowStatistics(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get performance breakdown by workflow step.
   * @summary Get Workflow Step Performance
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowStepPerformance(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowStepPerformance(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get workflow template details.
   * @summary Get Workflow Template
   * @param {string} templateId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiGetWorkflowTemplate(templateId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiGetWorkflowTemplate(templateId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Health check endpoint.
   * @summary Health Check
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiHealthCheck(options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiHealthCheck(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Import workflow from JSON.
   * @summary Import Workflow
   * @param {WorkflowImportSchema} workflowImportSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiImportWorkflow(workflowImportSchema, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiImportWorkflow(workflowImportSchema, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List workflow executions with filtering.
   * @summary List Workflow Executions
   * @param {string | null} [workflowId] 
   * @param {string | null} [status] 
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiListWorkflowExecutions(workflowId, status, limit, offset, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiListWorkflowExecutions(workflowId, status, limit, offset, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List available workflow templates.
   * @summary List Workflow Templates
   * @param {string | null} [category] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiListWorkflowTemplates(category, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiListWorkflowTemplates(category, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List all versions of a workflow.  Returns versions in descending order (newest first).
   * @summary List Workflow Versions
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiListWorkflowVersions(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiListWorkflowVersions(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * List user\'s workflows with filtering.
   * @summary List Workflows
   * @param {number} [limit] 
   * @param {number} [offset] 
   * @param {boolean | null} [isActive] 
   * @param {string | null} [category] 
   * @param {string | null} [search] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiListWorkflows(limit, offset, isActive, category, search, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiListWorkflows(limit, offset, isActive, category, search, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Restore a workflow to a previous version.  This creates a new version with the snapshot data from the specified version.
   * @summary Restore Workflow Version
   * @param {string} workflowId 
   * @param {number} versionNumber 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiRestoreWorkflowVersion(workflowId, versionNumber, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiRestoreWorkflowVersion(workflowId, versionNumber, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Test workflow configuration with sample data.
   * @summary Test Workflow
   * @param {string} workflowId 
   * @param {TestWorkflowIn} testWorkflowIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiTestWorkflow(workflowId, testWorkflowIn, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiTestWorkflow(workflowId, testWorkflowIn, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Toggle workflow between active and paused states.
   * @summary Toggle Workflow
   * @param {string} workflowId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiToggleWorkflow(workflowId, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiToggleWorkflow(workflowId, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update workflow configuration.
   * @summary Update Workflow
   * @param {string} workflowId 
   * @param {WorkflowUpdate} workflowUpdate 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiUpdateWorkflow(workflowId, workflowUpdate, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiUpdateWorkflow(workflowId, workflowUpdate, options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update retry policy configuration for a workflow.
   * @summary Update Workflow Retry Policy
   * @param {string} workflowId 
   * @param {WorkflowRetryPolicyUpdateSchema} workflowRetryPolicyUpdateSchema 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowsApi
   */
  appsWorkflowsApiUpdateWorkflowRetryPolicy(workflowId, workflowRetryPolicyUpdateSchema, options) {
    return WorkflowsApiFp(this.configuration).appsWorkflowsApiUpdateWorkflowRetryPolicy(workflowId, workflowRetryPolicyUpdateSchema, options).then((request) => request(this.axios, this.basePath));
  }
};
var WorkspacesApiAxiosParamCreator = function(configuration) {
  return {
    /**
     * Get the user\'s workspace.
     * @summary Get Workspace
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkspacesApiGetWorkspace: async (options = {}) => {
      const localVarPath = `/api/v1/workspaces/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get current period usage metrics for billing.  Returns aggregated usage for the current day (midnight to now). Usage is calculated hourly and includes: - Location events (DeviceLocation records) - Action deliveries (successful webhook deliveries) - Event units (locations + 0.5 * actions)  **Event Units Calculation (PRD §7):** - 1 location event = 1 event unit - 1 action delivery = 0.5 event units  **Tier Limits (PRD §7):** - Developer: 500,000 event units/month - Pro: 5,000,000 event units/month - Enterprise: Unlimited  **Example Response:** ```json {     \"location_events\": 10000,     \"action_deliveries\": 5000,     \"event_units\": 12500,     \"tier\": \"developer\",     \"tier_limit\": 500000,     \"period_start\": \"2025-10-01T00:00:00Z\",     \"period_end\": \"2025-10-01T23:59:59Z\" } ```  PRD Reference: §7 Pricing & Packaging Roadmap: Phase 2, Task 2.3
     * @summary Get Workspace Usage
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkspacesApiGetWorkspaceUsage: async (options = {}) => {
      const localVarPath = `/api/v1/workspaces/usage`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Update the user\'s workspace.
     * @summary Update Workspace
     * @param {WorkspaceIn} workspaceIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkspacesApiUpdateWorkspace: async (workspaceIn, options = {}) => {
      assertParamExists("appsWorkspacesApiUpdateWorkspace", "workspaceIn", workspaceIn);
      const localVarPath = `/api/v1/workspaces/`;
      const localVarUrlObj = new url.URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setBearerAuthToObject(localVarHeaderParameter, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(workspaceIn, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var WorkspacesApiFp = function(configuration) {
  const localVarAxiosParamCreator = WorkspacesApiAxiosParamCreator(configuration);
  return {
    /**
     * Get the user\'s workspace.
     * @summary Get Workspace
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkspacesApiGetWorkspace(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkspacesApiGetWorkspace(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkspacesApi.appsWorkspacesApiGetWorkspace"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Get current period usage metrics for billing.  Returns aggregated usage for the current day (midnight to now). Usage is calculated hourly and includes: - Location events (DeviceLocation records) - Action deliveries (successful webhook deliveries) - Event units (locations + 0.5 * actions)  **Event Units Calculation (PRD §7):** - 1 location event = 1 event unit - 1 action delivery = 0.5 event units  **Tier Limits (PRD §7):** - Developer: 500,000 event units/month - Pro: 5,000,000 event units/month - Enterprise: Unlimited  **Example Response:** ```json {     \"location_events\": 10000,     \"action_deliveries\": 5000,     \"event_units\": 12500,     \"tier\": \"developer\",     \"tier_limit\": 500000,     \"period_start\": \"2025-10-01T00:00:00Z\",     \"period_end\": \"2025-10-01T23:59:59Z\" } ```  PRD Reference: §7 Pricing & Packaging Roadmap: Phase 2, Task 2.3
     * @summary Get Workspace Usage
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkspacesApiGetWorkspaceUsage(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkspacesApiGetWorkspaceUsage(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkspacesApi.appsWorkspacesApiGetWorkspaceUsage"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    },
    /**
     * Update the user\'s workspace.
     * @summary Update Workspace
     * @param {WorkspaceIn} workspaceIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async appsWorkspacesApiUpdateWorkspace(workspaceIn, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.appsWorkspacesApiUpdateWorkspace(workspaceIn, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["WorkspacesApi.appsWorkspacesApiUpdateWorkspace"]?.[localVarOperationServerIndex]?.url;
      return (axios2, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios2__default.default, BASE_PATH, configuration)(axios2, localVarOperationServerBasePath || basePath);
    }
  };
};
var WorkspacesApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = WorkspacesApiFp(configuration);
  return {
    /**
     * Get the user\'s workspace.
     * @summary Get Workspace
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkspacesApiGetWorkspace(options) {
      return localVarFp.appsWorkspacesApiGetWorkspace(options).then((request) => request(axios2, basePath));
    },
    /**
     * Get current period usage metrics for billing.  Returns aggregated usage for the current day (midnight to now). Usage is calculated hourly and includes: - Location events (DeviceLocation records) - Action deliveries (successful webhook deliveries) - Event units (locations + 0.5 * actions)  **Event Units Calculation (PRD §7):** - 1 location event = 1 event unit - 1 action delivery = 0.5 event units  **Tier Limits (PRD §7):** - Developer: 500,000 event units/month - Pro: 5,000,000 event units/month - Enterprise: Unlimited  **Example Response:** ```json {     \"location_events\": 10000,     \"action_deliveries\": 5000,     \"event_units\": 12500,     \"tier\": \"developer\",     \"tier_limit\": 500000,     \"period_start\": \"2025-10-01T00:00:00Z\",     \"period_end\": \"2025-10-01T23:59:59Z\" } ```  PRD Reference: §7 Pricing & Packaging Roadmap: Phase 2, Task 2.3
     * @summary Get Workspace Usage
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkspacesApiGetWorkspaceUsage(options) {
      return localVarFp.appsWorkspacesApiGetWorkspaceUsage(options).then((request) => request(axios2, basePath));
    },
    /**
     * Update the user\'s workspace.
     * @summary Update Workspace
     * @param {WorkspaceIn} workspaceIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    appsWorkspacesApiUpdateWorkspace(workspaceIn, options) {
      return localVarFp.appsWorkspacesApiUpdateWorkspace(workspaceIn, options).then((request) => request(axios2, basePath));
    }
  };
};
var WorkspacesApi = class extends BaseAPI {
  /**
   * Get the user\'s workspace.
   * @summary Get Workspace
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkspacesApi
   */
  appsWorkspacesApiGetWorkspace(options) {
    return WorkspacesApiFp(this.configuration).appsWorkspacesApiGetWorkspace(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Get current period usage metrics for billing.  Returns aggregated usage for the current day (midnight to now). Usage is calculated hourly and includes: - Location events (DeviceLocation records) - Action deliveries (successful webhook deliveries) - Event units (locations + 0.5 * actions)  **Event Units Calculation (PRD §7):** - 1 location event = 1 event unit - 1 action delivery = 0.5 event units  **Tier Limits (PRD §7):** - Developer: 500,000 event units/month - Pro: 5,000,000 event units/month - Enterprise: Unlimited  **Example Response:** ```json {     \"location_events\": 10000,     \"action_deliveries\": 5000,     \"event_units\": 12500,     \"tier\": \"developer\",     \"tier_limit\": 500000,     \"period_start\": \"2025-10-01T00:00:00Z\",     \"period_end\": \"2025-10-01T23:59:59Z\" } ```  PRD Reference: §7 Pricing & Packaging Roadmap: Phase 2, Task 2.3
   * @summary Get Workspace Usage
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkspacesApi
   */
  appsWorkspacesApiGetWorkspaceUsage(options) {
    return WorkspacesApiFp(this.configuration).appsWorkspacesApiGetWorkspaceUsage(options).then((request) => request(this.axios, this.basePath));
  }
  /**
   * Update the user\'s workspace.
   * @summary Update Workspace
   * @param {WorkspaceIn} workspaceIn 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkspacesApi
   */
  appsWorkspacesApiUpdateWorkspace(workspaceIn, options) {
    return WorkspacesApiFp(this.configuration).appsWorkspacesApiUpdateWorkspace(workspaceIn, options).then((request) => request(this.axios, this.basePath));
  }
};

// src/_generated/configuration.ts
var Configuration = class {
  constructor(param = {}) {
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.serverIndex = param.serverIndex;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  isJsonMime(mime) {
    const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
  }
};

// src/errors.ts
var SpatialFlowError = class extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "SpatialFlowError";
    this.statusCode = details.statusCode;
    this.detail = details.detail;
    this.errorCode = details.errorCode;
    this.headers = details.headers || {};
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  toString() {
    const parts = [this.message];
    if (this.statusCode) {
      parts.unshift(`[${this.statusCode}]`);
    }
    if (this.detail && this.detail !== this.message) {
      parts.push(`- ${this.detail}`);
    }
    return parts.join(" ");
  }
};
var AuthenticationError = class extends SpatialFlowError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "AuthenticationError";
  }
};
var PermissionError = class extends SpatialFlowError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "PermissionError";
  }
};
var NotFoundError = class extends SpatialFlowError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "NotFoundError";
  }
};
var ValidationError = class extends SpatialFlowError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "ValidationError";
    this.errors = details.errors || [];
  }
};
var RateLimitError = class extends SpatialFlowError {
  constructor(message, details = {}) {
    super(message, { ...details, statusCode: details.statusCode ?? 429 });
    this.name = "RateLimitError";
    this.retryAfter = details.retryAfter ?? this.parseRetryAfter(details.headers);
  }
  parseRetryAfter(headers) {
    if (!headers) return void 0;
    const retryAfter = headers["Retry-After"] || headers["retry-after"];
    if (retryAfter) {
      const parsed = parseInt(retryAfter, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return void 0;
  }
};
var ServerError = class extends SpatialFlowError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "ServerError";
  }
};
var ConflictError = class extends SpatialFlowError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "ConflictError";
  }
};
var TimeoutError = class extends SpatialFlowError {
  constructor(message = "Request timed out", details = {}) {
    super(message, details);
    this.name = "TimeoutError";
  }
};
var ConnectionError = class extends SpatialFlowError {
  constructor(message = "Unable to connect to API", details = {}) {
    super(message, details);
    this.name = "ConnectionError";
  }
};
function raiseForStatus(statusCode, message = "API request failed", options = {}) {
  let { detail, errorCode } = options;
  const { headers, body } = options;
  if (body && !detail) {
    if (typeof body === "object" && body !== null) {
      const bodyObj = body;
      if (typeof bodyObj.detail === "string") {
        detail = bodyObj.detail;
      } else if (Array.isArray(bodyObj.detail)) {
        detail = bodyObj.detail.map(String).join("; ");
      }
      if (typeof bodyObj.error_code === "string") {
        errorCode = errorCode || bodyObj.error_code;
      }
    }
  }
  const details = {
    statusCode,
    detail,
    errorCode,
    headers
  };
  if (statusCode === 400 || statusCode === 422) {
    let errors = [];
    if (typeof body === "object" && body !== null && Array.isArray(body.detail)) {
      errors = body.detail;
    }
    throw new ValidationError(message, { ...details, errors });
  } else if (statusCode === 401) {
    throw new AuthenticationError(message, details);
  } else if (statusCode === 403) {
    throw new PermissionError(message, details);
  } else if (statusCode === 404) {
    throw new NotFoundError(message, details);
  } else if (statusCode === 409) {
    throw new ConflictError(message, details);
  } else if (statusCode === 429) {
    throw new RateLimitError(message, details);
  } else if (statusCode >= 500 && statusCode < 600) {
    throw new ServerError(message, details);
  } else if (statusCode >= 400) {
    throw new SpatialFlowError(message, details);
  }
  throw new SpatialFlowError(message, details);
}

// src/client.ts
var VERSION = "0.1.0";
var DEFAULT_BASE_URL = BASE_PATH;
var DEFAULT_TIMEOUT = 3e4;
var DEFAULT_MAX_RETRIES = 3;
var SpatialFlow = class {
  constructor(options) {
    const { apiKey, accessToken, baseUrl, timeout, maxRetries } = options;
    if (!apiKey && !accessToken) {
      throw new Error("Either apiKey or accessToken must be provided");
    }
    if (apiKey && accessToken) {
      throw new Error("Provide either apiKey or accessToken, not both");
    }
    this.maxRetries = maxRetries ?? DEFAULT_MAX_RETRIES;
    this.axiosInstance = globalAxios2__default.default.create({
      baseURL: baseUrl ?? DEFAULT_BASE_URL,
      timeout: timeout ?? DEFAULT_TIMEOUT,
      headers: {
        "User-Agent": `spatialflow-node/${VERSION}`
      }
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
      (error) => this.handleError(error)
    );
    this.config = new Configuration({
      basePath: baseUrl ?? DEFAULT_BASE_URL,
      apiKey: apiKey ? () => apiKey : void 0,
      accessToken
    });
  }
  /**
   * Handle axios errors and convert to SpatialFlow errors.
   */
  async handleError(error) {
    if (error.response) {
      const { status, data, headers } = error.response;
      const headerRecord = {};
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          if (typeof value === "string") {
            headerRecord[key] = value;
          }
        });
      }
      raiseForStatus(status, error.message, {
        body: data,
        headers: headerRecord
      });
    } else if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      throw new SpatialFlowError("Request timed out", {
        detail: error.message
      });
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      throw new SpatialFlowError("Unable to connect to API", {
        detail: error.message
      });
    }
    throw new SpatialFlowError(error.message || "Unknown error");
  }
  /**
   * Access geofence operations.
   */
  get geofences() {
    if (!this._geofences) {
      this._geofences = new GeofencesApi(
        this.config,
        void 0,
        this.axiosInstance
      );
    }
    return this._geofences;
  }
  /**
   * Access workflow operations.
   */
  get workflows() {
    if (!this._workflows) {
      this._workflows = new WorkflowsApi(
        this.config,
        void 0,
        this.axiosInstance
      );
    }
    return this._workflows;
  }
  /**
   * Access webhook operations.
   */
  get webhooks() {
    if (!this._webhooks) {
      this._webhooks = new WebhooksApi(
        this.config,
        void 0,
        this.axiosInstance
      );
    }
    return this._webhooks;
  }
  /**
   * Access device operations.
   */
  get devices() {
    if (!this._devices) {
      this._devices = new DevicesApi(
        this.config,
        void 0,
        this.axiosInstance
      );
    }
    return this._devices;
  }
  /**
   * Access account operations.
   */
  get account() {
    if (!this._account) {
      this._account = new AccountApi(
        this.config,
        void 0,
        this.axiosInstance
      );
    }
    return this._account;
  }
};
var WebhookSignatureError = class extends SpatialFlowError {
  constructor(message) {
    super(message);
    this.name = "WebhookSignatureError";
  }
};
function verifyWebhookSignature(options) {
  const { payload, signature, secret, tolerance = 300 } = options;
  const payloadStr = Buffer.isBuffer(payload) ? payload.toString("utf-8") : payload;
  const payloadBytes = Buffer.from(payloadStr, "utf-8");
  const parts = {};
  for (const part of signature.split(",")) {
    const [key, value] = part.split("=", 2);
    if (key && value) {
      parts[key] = value;
    }
  }
  const timestampStr = parts["t"];
  const sigHash = parts["v1"];
  if (!timestampStr || !sigHash) {
    throw new WebhookSignatureError(
      "Invalid signature format. Expected: t=<timestamp>,v1=<signature>"
    );
  }
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    throw new WebhookSignatureError("Invalid timestamp in signature");
  }
  if (tolerance > 0) {
    const now = Math.floor(Date.now() / 1e3);
    const age = now - timestamp;
    if (age > tolerance) {
      throw new WebhookSignatureError(
        `Webhook timestamp too old: ${age}s (tolerance: ${tolerance}s)`
      );
    }
    if (age < -tolerance) {
      throw new WebhookSignatureError(
        `Webhook timestamp in future: ${-age}s (tolerance: ${tolerance}s)`
      );
    }
  }
  const signedPayload = Buffer.concat([
    Buffer.from(`${timestamp}.`, "utf-8"),
    payloadBytes
  ]);
  const expectedSig = crypto__default.default.createHmac("sha256", secret).update(signedPayload).digest("hex");
  if (!crypto__default.default.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(sigHash))) {
    throw new WebhookSignatureError("Signature verification failed");
  }
  try {
    return JSON.parse(payloadStr);
  } catch (e) {
    throw new WebhookSignatureError(`Failed to parse webhook payload as JSON: ${e}`);
  }
}
var verifySignature = verifyWebhookSignature;

// src/pagination.ts
async function* paginate(options) {
  const {
    fetchPage,
    extractItems = defaultExtractItems,
    extractCount = defaultExtractCount,
    extractNext = defaultExtractNext,
    limit = 100
  } = options;
  let offset = 0;
  let hasMore = true;
  while (hasMore) {
    const response = await fetchPage(offset, limit);
    const items = extractItems(response);
    const nextUrl = extractNext(response);
    for (const item of items) {
      yield item;
    }
    if (!nextUrl || items.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }
}
async function collectAll(options) {
  const items = [];
  for await (const item of paginate(options)) {
    items.push(item);
  }
  return items;
}
function defaultExtractItems(response) {
  const r = response;
  if (r.data && typeof r.data === "object") {
    const data = r.data;
    if (Array.isArray(data.results)) return data.results;
  }
  if (Array.isArray(r.results)) return r.results;
  return [];
}
function defaultExtractCount(response) {
  const r = response;
  if (r.data && typeof r.data === "object") {
    const data = r.data;
    if (typeof data.count === "number") return data.count;
  }
  if (typeof r.count === "number") return r.count;
  return 0;
}
function defaultExtractNext(response) {
  const r = response;
  if (r.data && typeof r.data === "object") {
    const data = r.data;
    if (typeof data.next === "string" || data.next === null) {
      return data.next;
    }
  }
  if (typeof r.next === "string" || r.next === null) {
    return r.next;
  }
  return void 0;
}

// src/jobs.ts
var JobTimeoutError = class extends TimeoutError {
  constructor(jobId, timeoutMs, lastStatus) {
    let message = `Job ${jobId} did not complete within ${timeoutMs / 1e3} seconds`;
    if (lastStatus) {
      message += ` (last status: ${lastStatus})`;
    }
    super(message);
    this.name = "JobTimeoutError";
    this.jobId = jobId;
    this.timeoutMs = timeoutMs;
    this.lastStatus = lastStatus;
  }
};
var JobFailedError = class extends SpatialFlowError {
  constructor(jobId, errorMessage, results) {
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
};
async function pollJob(options) {
  const {
    fetchStatus,
    timeout = 3e5,
    pollInterval = 2e3,
    terminalStatuses = ["completed", "failed"],
    onStatus,
    extractJobId = defaultExtractJobId,
    extractStatus = defaultExtractStatus
  } = options;
  let elapsed = 0;
  let lastStatus;
  let lastResponse;
  while (elapsed < timeout) {
    const response = await fetchStatus();
    lastResponse = response;
    const status = extractStatus(response);
    lastStatus = status;
    if (onStatus) {
      onStatus(status, response);
    }
    if (terminalStatuses.includes(status)) {
      const jobId2 = extractJobId(response);
      return buildJobResult(jobId2, status, response);
    }
    await sleep(pollInterval);
    elapsed += pollInterval;
  }
  const jobId = lastResponse ? extractJobId(lastResponse) : "unknown";
  throw new JobTimeoutError(jobId, timeout, lastStatus);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function defaultExtractJobId(response) {
  const r = response;
  if (r.data && typeof r.data === "object") {
    const data = r.data;
    if (typeof data.job_id === "string") return data.job_id;
    if (typeof data.jobId === "string") return data.jobId;
  }
  if (typeof r.job_id === "string") return r.job_id;
  if (typeof r.jobId === "string") return r.jobId;
  return "unknown";
}
function defaultExtractStatus(response) {
  const r = response;
  if (r.data && typeof r.data === "object") {
    const data = r.data;
    if (typeof data.status === "string") return data.status;
  }
  if (typeof r.status === "string") return r.status;
  return "unknown";
}
function getField(response, name, defaultValue) {
  const r = response;
  if (r.data && typeof r.data === "object") {
    const data = r.data;
    if (name in data) return data[name];
  }
  if (name in r) return r[name];
  return defaultValue;
}
function buildJobResult(jobId, status, response) {
  if (status === "failed") {
    const errorMessage = getField(
      response,
      "error_message",
      void 0
    );
    const results2 = getField(
      response,
      "results",
      void 0
    );
    throw new JobFailedError(jobId, errorMessage, results2);
  }
  const results = getField(response, "results", {});
  return {
    jobId,
    status,
    createdCount: getField(response, "created_count", 0),
    failedCount: getField(response, "failed_count", 0),
    totalFeatures: getField(response, "total_features", 0),
    results,
    duration: getField(response, "duration", void 0),
    rawResponse: response,
    createdGeofences: results.created_geofences || [],
    errors: results.errors || [],
    warnings: results.warnings || []
  };
}
var CONTENT_TYPES = {
  ".geojson": "application/geo+json",
  ".json": "application/json",
  ".kml": "application/vnd.google-earth.kml+xml",
  ".gpx": "application/gpx+xml"
};
async function uploadGeofences(options) {
  const {
    client,
    filePath,
    groupName,
    timeout = 3e5,
    pollInterval = 2e3,
    onStatus
  } = options;
  if (!fs__namespace.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const filename = path__namespace.basename(filePath);
  const fileSize = fs__namespace.statSync(filePath).size;
  const ext = path__namespace.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) {
    throw new Error(
      `Unsupported file type: ${ext}. Supported types: ${Object.keys(CONTENT_TYPES).join(", ")}`
    );
  }
  const presignedResponse = await client.storage.appsStorageApiCreatePresignedUrl({
    presignedUrlRequest: {
      file_type: "geofences",
      filename,
      file_size: fileSize
    }
  });
  const presignedData = extractData(presignedResponse);
  const uploadUrl = presignedData.upload_url;
  const fileId = presignedData.file_id;
  if (!uploadUrl) {
    throw new Error(
      "Failed to get presigned upload URL from storage API. Response missing 'upload_url' field."
    );
  }
  if (!fileId) {
    throw new Error(
      "Failed to get file ID from storage API. Response missing 'file_id' field."
    );
  }
  const fileContent = fs__namespace.readFileSync(filePath);
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: fileContent,
    headers: {
      "Content-Type": contentType
    }
  });
  if (!uploadResponse.ok) {
    const text = await uploadResponse.text();
    throw new Error(
      `Failed to upload file to S3: ${uploadResponse.status} - ${text}`
    );
  }
  const jobResponse = await client.geofences.appsGeofencesApiUploadGeofencesAsync({
    uploadGeofencesRequest: {
      file_id: fileId,
      ...groupName && { group_name: groupName }
    }
  });
  const jobData = extractData(jobResponse);
  const jobId = jobData.job_id;
  if (!jobId) {
    throw new Error(
      "Failed to start upload job. Response missing 'job_id' field."
    );
  }
  return pollJob({
    fetchStatus: () => client.geofences.appsGeofencesApiGetUploadJobStatus({ jobId }),
    timeout,
    pollInterval,
    onStatus
  });
}
function extractData(response) {
  const r = response;
  if (r.data && typeof r.data === "object") {
    return r.data;
  }
  if (typeof response === "object" && response !== null) {
    return response;
  }
  return {};
}

exports.AccountApi = AccountApi;
exports.AccountApiAxiosParamCreator = AccountApiAxiosParamCreator;
exports.AccountApiFactory = AccountApiFactory;
exports.AccountApiFp = AccountApiFp;
exports.AdminApi = AdminApi;
exports.AdminApiAxiosParamCreator = AdminApiAxiosParamCreator;
exports.AdminApiFactory = AdminApiFactory;
exports.AdminApiFp = AdminApiFp;
exports.AuthTypeEnum = AuthTypeEnum;
exports.AuthenticationApi = AuthenticationApi;
exports.AuthenticationApiAxiosParamCreator = AuthenticationApiAxiosParamCreator;
exports.AuthenticationApiFactory = AuthenticationApiFactory;
exports.AuthenticationApiFp = AuthenticationApiFp;
exports.AuthenticationError = AuthenticationError;
exports.BASE_PATH = BASE_PATH;
exports.BillingApi = BillingApi;
exports.BillingApiAxiosParamCreator = BillingApiAxiosParamCreator;
exports.BillingApiFactory = BillingApiFactory;
exports.BillingApiFp = BillingApiFp;
exports.Configuration = Configuration;
exports.ConflictError = ConflictError;
exports.ConnectionError = ConnectionError;
exports.DEFAULT_BASE_URL = DEFAULT_BASE_URL;
exports.DefaultApi = DefaultApi;
exports.DefaultApiAxiosParamCreator = DefaultApiAxiosParamCreator;
exports.DefaultApiFactory = DefaultApiFactory;
exports.DefaultApiFp = DefaultApiFp;
exports.DeliveryStatusEnum = DeliveryStatusEnum;
exports.DevicesApi = DevicesApi;
exports.DevicesApiAxiosParamCreator = DevicesApiAxiosParamCreator;
exports.DevicesApiFactory = DevicesApiFactory;
exports.DevicesApiFp = DevicesApiFp;
exports.E2ETestApi = E2ETestApi;
exports.E2ETestApiAxiosParamCreator = E2ETestApiAxiosParamCreator;
exports.E2ETestApiFactory = E2ETestApiFactory;
exports.E2ETestApiFp = E2ETestApiFp;
exports.EmailApi = EmailApi;
exports.EmailApiAxiosParamCreator = EmailApiAxiosParamCreator;
exports.EmailApiFactory = EmailApiFactory;
exports.EmailApiFp = EmailApiFp;
exports.GPXSimulatorApi = GPXSimulatorApi;
exports.GPXSimulatorApiAxiosParamCreator = GPXSimulatorApiAxiosParamCreator;
exports.GPXSimulatorApiFactory = GPXSimulatorApiFactory;
exports.GPXSimulatorApiFp = GPXSimulatorApiFp;
exports.GeofencesApi = GeofencesApi;
exports.GeofencesApiAxiosParamCreator = GeofencesApiAxiosParamCreator;
exports.GeofencesApiFactory = GeofencesApiFactory;
exports.GeofencesApiFp = GeofencesApiFp;
exports.IntegrationsApi = IntegrationsApi;
exports.IntegrationsApiAxiosParamCreator = IntegrationsApiAxiosParamCreator;
exports.IntegrationsApiFactory = IntegrationsApiFactory;
exports.IntegrationsApiFp = IntegrationsApiFp;
exports.JobFailedError = JobFailedError;
exports.JobTimeoutError = JobTimeoutError;
exports.MethodEnum = MethodEnum;
exports.NotFoundError = NotFoundError;
exports.PermissionError = PermissionError;
exports.PublicApi = PublicApi;
exports.PublicApiAxiosParamCreator = PublicApiAxiosParamCreator;
exports.PublicApiFactory = PublicApiFactory;
exports.PublicApiFp = PublicApiFp;
exports.PublicLocationIngestApi = PublicLocationIngestApi;
exports.PublicLocationIngestApiAxiosParamCreator = PublicLocationIngestApiAxiosParamCreator;
exports.PublicLocationIngestApiFactory = PublicLocationIngestApiFactory;
exports.PublicLocationIngestApiFp = PublicLocationIngestApiFp;
exports.RateLimitError = RateLimitError;
exports.RetryStrategyEnum = RetryStrategyEnum;
exports.ServerError = ServerError;
exports.SignupRequestSelectedPlanEnum = SignupRequestSelectedPlanEnum;
exports.SpatialFlow = SpatialFlow;
exports.SpatialFlowError = SpatialFlowError;
exports.StorageApi = StorageApi;
exports.StorageApiAxiosParamCreator = StorageApiAxiosParamCreator;
exports.StorageApiFactory = StorageApiFactory;
exports.StorageApiFp = StorageApiFp;
exports.SubscriptionsApi = SubscriptionsApi;
exports.SubscriptionsApiAxiosParamCreator = SubscriptionsApiAxiosParamCreator;
exports.SubscriptionsApiFactory = SubscriptionsApiFactory;
exports.SubscriptionsApiFp = SubscriptionsApiFp;
exports.SystemApi = SystemApi;
exports.SystemApiAxiosParamCreator = SystemApiAxiosParamCreator;
exports.SystemApiFactory = SystemApiFactory;
exports.SystemApiFp = SystemApiFp;
exports.TilesApi = TilesApi;
exports.TilesApiAxiosParamCreator = TilesApiAxiosParamCreator;
exports.TilesApiFactory = TilesApiFactory;
exports.TilesApiFp = TilesApiFp;
exports.TimeoutError = TimeoutError;
exports.VERSION = VERSION;
exports.ValidationError = ValidationError;
exports.WebhookSignatureError = WebhookSignatureError;
exports.WebhooksApi = WebhooksApi;
exports.WebhooksApiAxiosParamCreator = WebhooksApiAxiosParamCreator;
exports.WebhooksApiFactory = WebhooksApiFactory;
exports.WebhooksApiFp = WebhooksApiFp;
exports.WorkflowsApi = WorkflowsApi;
exports.WorkflowsApiAxiosParamCreator = WorkflowsApiAxiosParamCreator;
exports.WorkflowsApiFactory = WorkflowsApiFactory;
exports.WorkflowsApiFp = WorkflowsApiFp;
exports.WorkspacesApi = WorkspacesApi;
exports.WorkspacesApiAxiosParamCreator = WorkspacesApiAxiosParamCreator;
exports.WorkspacesApiFactory = WorkspacesApiFactory;
exports.WorkspacesApiFp = WorkspacesApiFp;
exports.collectAll = collectAll;
exports.paginate = paginate;
exports.pollJob = pollJob;
exports.raiseForStatus = raiseForStatus;
exports.uploadGeofences = uploadGeofences;
exports.verifySignature = verifySignature;
exports.verifyWebhookSignature = verifyWebhookSignature;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map