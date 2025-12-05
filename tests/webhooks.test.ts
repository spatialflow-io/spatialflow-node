import { describe, it, expect } from "vitest";
import * as crypto from "crypto";
import {
  verifyWebhookSignature,
  WebhookSignatureError,
} from "../src/webhooks";

function createSignature(
  payload: string | Buffer,
  secret: string,
  timestamp: number
): string {
  const payloadStr = typeof payload === "string" ? payload : payload.toString();
  const signedPayload = `${timestamp}.${payloadStr}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");
  return `t=${timestamp},v1=${signature}`;
}

describe("verifyWebhookSignature", () => {
  const secret = "test_secret_key";

  it("should verify a valid signature", () => {
    const payload = JSON.stringify({ type: "geofence.entered", data: { id: "123" } });
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = createSignature(payload, secret, timestamp);

    const result = verifyWebhookSignature({
      payload,
      signature,
      secret,
    });

    expect(result.type).toBe("geofence.entered");
    expect(result.data.id).toBe("123");
  });

  it("should verify a valid signature with Buffer payload", () => {
    const payload = Buffer.from(JSON.stringify({ type: "test.event" }));
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = createSignature(payload, secret, timestamp);

    const result = verifyWebhookSignature({
      payload,
      signature,
      secret,
    });

    expect(result.type).toBe("test.event");
  });

  it("should throw on invalid signature format", () => {
    expect(() =>
      verifyWebhookSignature({
        payload: "{}",
        signature: "invalid_format",
        secret,
      })
    ).toThrow(WebhookSignatureError);
  });

  it("should throw on missing timestamp", () => {
    expect(() =>
      verifyWebhookSignature({
        payload: "{}",
        signature: "v1=abcd1234",
        secret,
      })
    ).toThrow(/Invalid signature format/);
  });

  it("should throw on missing signature", () => {
    expect(() =>
      verifyWebhookSignature({
        payload: "{}",
        signature: "t=12345",
        secret,
      })
    ).toThrow(/Invalid signature format/);
  });

  it("should throw on expired timestamp", () => {
    const payload = JSON.stringify({ type: "test" });
    const oldTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 minutes ago
    const signature = createSignature(payload, secret, oldTimestamp);

    expect(() =>
      verifyWebhookSignature({
        payload,
        signature,
        secret,
        tolerance: 300, // 5 minute tolerance
      })
    ).toThrow(/too old/);
  });

  it("should respect custom tolerance", () => {
    const payload = JSON.stringify({ type: "test" });
    const oldTimestamp = Math.floor(Date.now() / 1000) - 400; // ~6 minutes ago
    const signature = createSignature(payload, secret, oldTimestamp);

    // Should fail with 5 minute tolerance
    expect(() =>
      verifyWebhookSignature({
        payload,
        signature,
        secret,
        tolerance: 300,
      })
    ).toThrow(/too old/);

    // Should pass with 10 minute tolerance
    const result = verifyWebhookSignature({
      payload,
      signature,
      secret,
      tolerance: 600,
    });
    expect(result.type).toBe("test");
  });

  it("should throw on wrong secret", () => {
    const payload = JSON.stringify({ type: "test" });
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = createSignature(payload, "correct_secret", timestamp);

    expect(() =>
      verifyWebhookSignature({
        payload,
        signature,
        secret: "wrong_secret",
      })
    ).toThrow(/verification failed/);
  });

  it("should throw on tampered payload", () => {
    const originalPayload = JSON.stringify({ type: "original" });
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = createSignature(originalPayload, secret, timestamp);

    expect(() =>
      verifyWebhookSignature({
        payload: JSON.stringify({ type: "tampered" }),
        signature,
        secret,
      })
    ).toThrow(/verification failed/);
  });

  it("should throw on invalid JSON payload", () => {
    const payload = "not valid json";
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = createSignature(payload, secret, timestamp);

    expect(() =>
      verifyWebhookSignature({
        payload,
        signature,
        secret,
      })
    ).toThrow(/Failed to parse webhook payload/);
  });
});

describe("WebhookSignatureError", () => {
  it("should be instanceof Error", () => {
    const error = new WebhookSignatureError("test message");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("WebhookSignatureError");
    expect(error.message).toBe("test message");
  });
});
