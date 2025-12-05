/**
 * SpatialFlow SDK Error Classes
 *
 * Provides a clean error hierarchy for handling API errors.
 */

export interface ErrorDetails {
  statusCode?: number;
  detail?: string;
  errorCode?: string;
  headers?: Record<string, string>;
}

/**
 * Base error class for all SpatialFlow SDK errors.
 */
export class SpatialFlowError extends Error {
  readonly statusCode?: number;
  readonly detail?: string;
  readonly errorCode?: string;
  readonly headers: Record<string, string>;

  constructor(message: string, details: ErrorDetails = {}) {
    super(message);
    this.name = "SpatialFlowError";
    this.statusCode = details.statusCode;
    this.detail = details.detail;
    this.errorCode = details.errorCode;
    this.headers = details.headers || {};

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  override toString(): string {
    const parts = [this.message];
    if (this.statusCode) {
      parts.unshift(`[${this.statusCode}]`);
    }
    if (this.detail && this.detail !== this.message) {
      parts.push(`- ${this.detail}`);
    }
    return parts.join(" ");
  }
}

/**
 * Raised when authentication fails (401 Unauthorized).
 *
 * This typically means:
 * - API key is invalid or expired
 * - JWT token is invalid or expired
 * - No authentication credentials provided
 */
export class AuthenticationError extends SpatialFlowError {
  constructor(message: string, details: ErrorDetails = {}) {
    super(message, details);
    this.name = "AuthenticationError";
  }
}

/**
 * Raised when the authenticated user lacks permission (403 Forbidden).
 *
 * This typically means:
 * - User doesn't have access to this resource
 * - API key doesn't have the required scope
 * - Organization limits exceeded
 */
export class PermissionError extends SpatialFlowError {
  constructor(message: string, details: ErrorDetails = {}) {
    super(message, details);
    this.name = "PermissionError";
  }
}

/**
 * Raised when a resource is not found (404 Not Found).
 *
 * Check that:
 * - The resource ID is correct
 * - The resource hasn't been deleted
 * - You have access to the resource
 */
export class NotFoundError extends SpatialFlowError {
  constructor(message: string, details: ErrorDetails = {}) {
    super(message, details);
    this.name = "NotFoundError";
  }
}

export interface ValidationErrorDetails extends ErrorDetails {
  errors?: Array<{ loc?: string[]; msg?: string; type?: string }>;
}

/**
 * Raised when request validation fails (400 Bad Request or 422 Unprocessable Entity).
 *
 * Check that:
 * - Required fields are provided
 * - Field values match expected types/formats
 * - Geometry is valid GeoJSON
 */
export class ValidationError extends SpatialFlowError {
  readonly errors: Array<{ loc?: string[]; msg?: string; type?: string }>;

  constructor(message: string, details: ValidationErrorDetails = {}) {
    super(message, details);
    this.name = "ValidationError";
    this.errors = details.errors || [];
  }
}

/**
 * Raised when rate limit is exceeded (429 Too Many Requests).
 *
 * The `retryAfter` property indicates when you can retry.
 */
export class RateLimitError extends SpatialFlowError {
  readonly retryAfter?: number;

  constructor(
    message: string,
    details: ErrorDetails & { retryAfter?: number } = {}
  ) {
    super(message, { ...details, statusCode: details.statusCode ?? 429 });
    this.name = "RateLimitError";
    this.retryAfter =
      details.retryAfter ?? this.parseRetryAfter(details.headers);
  }

  private parseRetryAfter(
    headers?: Record<string, string>
  ): number | undefined {
    if (!headers) return undefined;
    const retryAfter = headers["Retry-After"] || headers["retry-after"];
    if (retryAfter) {
      const parsed = parseInt(retryAfter, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return undefined;
  }
}

/**
 * Raised when the server encounters an error (5xx status codes).
 *
 * This is typically a temporary issue. Retry with exponential backoff.
 */
export class ServerError extends SpatialFlowError {
  constructor(message: string, details: ErrorDetails = {}) {
    super(message, details);
    this.name = "ServerError";
  }
}

/**
 * Raised when there's a resource conflict (409 Conflict).
 *
 * This typically means:
 * - Resource already exists with that name/identifier
 * - Concurrent modification conflict
 */
export class ConflictError extends SpatialFlowError {
  constructor(message: string, details: ErrorDetails = {}) {
    super(message, details);
    this.name = "ConflictError";
  }
}

/**
 * Raised when a request times out.
 */
export class TimeoutError extends SpatialFlowError {
  constructor(message: string = "Request timed out", details: ErrorDetails = {}) {
    super(message, details);
    this.name = "TimeoutError";
  }
}

/**
 * Raised when unable to connect to the API.
 */
export class ConnectionError extends SpatialFlowError {
  constructor(
    message: string = "Unable to connect to API",
    details: ErrorDetails = {}
  ) {
    super(message, details);
    this.name = "ConnectionError";
  }
}

/**
 * Raise the appropriate error based on HTTP status code.
 */
export function raiseForStatus(
  statusCode: number,
  message: string = "API request failed",
  options: {
    detail?: string;
    errorCode?: string;
    headers?: Record<string, string>;
    body?: unknown;
  } = {}
): never {
  let { detail, errorCode } = options;
  const { headers, body } = options;

  // Extract detail from body if not provided
  if (body && !detail) {
    if (typeof body === "object" && body !== null) {
      const bodyObj = body as Record<string, unknown>;
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

  const details: ErrorDetails = {
    statusCode,
    detail,
    errorCode,
    headers,
  };

  if (statusCode === 400 || statusCode === 422) {
    let errors: ValidationErrorDetails["errors"] = [];
    if (
      typeof body === "object" &&
      body !== null &&
      Array.isArray((body as Record<string, unknown>).detail)
    ) {
      errors = (body as Record<string, unknown>).detail as typeof errors;
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

  // This should never be reached, but TypeScript needs it
  throw new SpatialFlowError(message, details);
}
