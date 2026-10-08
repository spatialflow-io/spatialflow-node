/**
 * Webhook signature verification for SpatialFlow SDK.
 *
 * Provides HMAC-SHA256 signature verification for webhook payloads.
 */

import crypto from "crypto";
import { SpatialFlowError } from "./errors";

export class WebhookSignatureError extends SpatialFlowError {
  constructor(message: string) {
    super(message);
    this.name = "WebhookSignatureError";
  }
}

export interface VerifyWebhookOptions {
  /**
   * The raw webhook payload (request body).
   */
  payload: string | Buffer;

  /**
   * The signature from the X-SF-Signature header.
   */
  signature: string;

  secret: string;

  /**
   * Deprecated and ignored. The SpatialFlow signature does not include a
   * timestamp, so there is no time-based replay window. To guard against
   * replays, deduplicate on the signed `id` in the payload, recording it in
   * the same transaction as the work and acknowledging only committed work;
   * the `X-Idempotency-Key` and `X-SF-Event-ID` headers are not signed. The
   * default payload has an `id`; a custom payload template must include one.
   */
  tolerance?: number;
}

export interface WebhookEvent {
  /**
   * The event type (e.g., "geofence.entered", "workflow.completed").
   */
  type: string;

  data: Record<string, unknown>;

  /**
   * When the event was created (ISO timestamp).
   */
  created_at?: string;

  id?: string;
}

/**
 * Verify a webhook signature and return the parsed payload.
 *
 * SpatialFlow signs each delivery with an HMAC-SHA256 of the raw request
 * body and sends it in the `X-SF-Signature` header, hex-encoded and prefixed
 * with `sha256=`. This function recomputes that HMAC and compares it in
 * constant time.
 *
 * @throws {WebhookSignatureError} If the signature is missing, malformed, does not match, or the payload is not valid JSON
 *
 * @example
 * ```typescript
 * import { verifyWebhookSignature } from "@spatialflow/sdk";
 *
 * // In your Express webhook handler
 * app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
 *   try {
 *     const event = verifyWebhookSignature({
 *       payload: req.body,
 *       signature: req.headers["x-sf-signature"] as string,
 *       secret: process.env.WEBHOOK_SECRET!,
 *     });
 *
 *     // Process verified event
 *     console.log(`Event type: ${event.type}`);
 *     res.sendStatus(200);
 *   } catch (e) {
 *     if (e instanceof WebhookSignatureError) {
 *       res.status(400).json({ error: e.message });
 *     } else {
 *       throw e;
 *     }
 *   }
 * });
 * ```
 */
export function verifyWebhookSignature(options: VerifyWebhookOptions): WebhookEvent {
  const { payload, signature, secret } = options;

  // Normalize payload to bytes (the signature covers the raw body)
  const payloadStr = Buffer.isBuffer(payload) ? payload.toString("utf-8") : payload;
  const payloadBytes = Buffer.from(payloadStr, "utf-8");

  if (!signature) {
    throw new WebhookSignatureError("Missing signature header");
  }

  // The header is `sha256=<hex>`; tolerate a bare hex digest as well.
  let sigHash = signature.trim();
  if (sigHash.startsWith("sha256=")) {
    sigHash = sigHash.slice("sha256=".length);
  }
  if (!sigHash) {
    throw new WebhookSignatureError(
      "Invalid signature format. Expected: sha256=<hex digest>"
    );
  }

  // Compute expected signature: HMAC-SHA256 of the raw request body.
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payloadBytes)
    .digest("hex");

  // Constant-time comparison to prevent timing attacks. Guard the length so
  // timingSafeEqual does not throw on a malformed (wrong-length) signature.
  const expectedBuf = Buffer.from(expectedSig);
  const providedBuf = Buffer.from(sigHash);
  if (
    expectedBuf.length !== providedBuf.length ||
    !crypto.timingSafeEqual(expectedBuf, providedBuf)
  ) {
    throw new WebhookSignatureError("Signature verification failed");
  }

  // The backend delivers { id, event, timestamp, data }; normalize to this
  // SDK's WebhookEvent shape so event.type carries the backend "event" value.
  try {
    const parsed = JSON.parse(payloadStr) as Record<string, unknown>;
    return {
      ...parsed,
      type: (parsed.event ?? parsed.type) as string,
      created_at: (parsed.timestamp ?? parsed.created_at) as string | undefined,
    } as WebhookEvent;
  } catch (e) {
    throw new WebhookSignatureError(`Failed to parse webhook payload as JSON: ${e}`);
  }
}

export const verifySignature = verifyWebhookSignature;

export interface VerifyWorkflowOptions {
  /**
   * The raw request body, exactly as received.
   */
  payload: string | Buffer;

  /**
   * The X-SpatialFlow-Signature header (`sha256=<hex>`).
   */
  signature: string;

  /**
   * The X-SpatialFlow-Timestamp header (unix seconds).
   */
  timestamp: string;

  secret: string;

  /**
   * Maximum age of the timestamp, in seconds, in either direction.
   * Defaults to 300.
   */
  tolerance?: number;
}

/**
 * Verify a workflow webhook action delivery and return the parsed body.
 *
 * A workflow Webhook action with a signing secret sends
 * `X-SpatialFlow-Timestamp` (unix seconds) and `X-SpatialFlow-Signature`
 * (`sha256=<hex>`), an HMAC-SHA256 of `"<timestamp>.<raw body>"`. This is a
 * different contract from the workspace webhook header handled by
 * {@link verifyWebhookSignature}.
 *
 * The workflow action sends whatever body the workflow configures, so the
 * parsed JSON is returned as is, and a body that isn't JSON is returned as
 * text.
 *
 * @throws {WebhookSignatureError} If the signature or timestamp is missing or malformed, the timestamp is outside the tolerance, or the signature does not match
 *
 * @example
 * ```typescript
 * const body = verifyWorkflowSignature({
 *   payload: req.body,
 *   signature: req.headers["x-spatialflow-signature"] as string,
 *   timestamp: req.headers["x-spatialflow-timestamp"] as string,
 *   secret: process.env.WEBHOOK_SECRET!,
 * });
 * ```
 */
export function verifyWorkflowSignature(options: VerifyWorkflowOptions): unknown {
  const { payload, signature, secret, tolerance = 300 } = options;

  if (!signature) {
    throw new WebhookSignatureError("Missing signature header");
  }

  const timestamp = (options.timestamp ?? "").trim();
  if (!/^[0-9]+$/.test(timestamp)) {
    throw new WebhookSignatureError("Missing or invalid timestamp header");
  }
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > tolerance) {
    throw new WebhookSignatureError("Timestamp outside the tolerance window");
  }

  let sigHash = signature.trim();
  if (sigHash.startsWith("sha256=")) {
    sigHash = sigHash.slice("sha256=".length);
  }
  if (!sigHash) {
    throw new WebhookSignatureError(
      "Invalid signature format. Expected: sha256=<hex digest>"
    );
  }

  // Sign the original bytes: decoding a Buffer to a string first would replace
  // invalid UTF-8 and let an altered body verify.
  const payloadBytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, "utf-8");
  const expectedBuf = Buffer.from(
    crypto
      .createHmac("sha256", secret)
      .update(`${timestamp}.`, "utf-8")
      .update(payloadBytes)
      .digest("hex")
  );
  const providedBuf = Buffer.from(sigHash);
  if (
    expectedBuf.length !== providedBuf.length ||
    !crypto.timingSafeEqual(expectedBuf, providedBuf)
  ) {
    throw new WebhookSignatureError("Signature verification failed");
  }

  const text = payloadBytes.toString("utf-8");
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
