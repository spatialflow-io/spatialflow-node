/**
 * Webhook signature verification for SpatialFlow SDK.
 *
 * Provides HMAC-SHA256 signature verification for webhook payloads.
 */

import crypto from "crypto";
import { SpatialFlowError } from "./errors";

/**
 * Error thrown when webhook signature verification fails.
 */
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

  /**
   * Your webhook signing secret.
   */
  secret: string;

  /**
   * Maximum age of the webhook in seconds (default 300 = 5 minutes).
   * Set to 0 to disable timestamp checking.
   */
  tolerance?: number;
}

export interface WebhookEvent {
  /**
   * The event type (e.g., "geofence.entered", "workflow.completed").
   */
  type: string;

  /**
   * The event data.
   */
  data: Record<string, unknown>;

  /**
   * When the event was created (ISO timestamp).
   */
  created_at?: string;

  /**
   * Unique event ID.
   */
  id?: string;
}

/**
 * Verify a webhook signature and return the parsed payload.
 *
 * SpatialFlow webhooks include an HMAC-SHA256 signature in the
 * `X-SF-Signature` header. This function verifies that signature
 * and optionally checks the timestamp to prevent replay attacks.
 *
 * @param options - Verification options
 * @returns The parsed webhook event
 * @throws {WebhookSignatureError} If signature is invalid or timestamp is too old
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
  const { payload, signature, secret, tolerance = 300 } = options;

  // Normalize payload to string
  const payloadStr = Buffer.isBuffer(payload) ? payload.toString("utf-8") : payload;
  const payloadBytes = Buffer.from(payloadStr, "utf-8");

  // Parse the signature header
  // Format: t=<timestamp>,v1=<signature>
  const parts: Record<string, string> = {};
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

  // Check timestamp tolerance (replay attack prevention)
  if (tolerance > 0) {
    const now = Math.floor(Date.now() / 1000);
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

  // Compute expected signature
  // The signed payload is: timestamp.payload
  const signedPayload = Buffer.concat([
    Buffer.from(`${timestamp}.`, "utf-8"),
    payloadBytes,
  ]);

  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  // Constant-time comparison to prevent timing attacks
  if (!crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(sigHash))) {
    throw new WebhookSignatureError("Signature verification failed");
  }

  // Parse and return the payload
  try {
    return JSON.parse(payloadStr) as WebhookEvent;
  } catch (e) {
    throw new WebhookSignatureError(`Failed to parse webhook payload as JSON: ${e}`);
  }
}

// Convenience alias
export const verifySignature = verifyWebhookSignature;
