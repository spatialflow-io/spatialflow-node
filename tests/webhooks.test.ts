import { describe, it, expect } from "vitest";
import * as crypto from "crypto";
import {
  verifyWebhookSignature,
  verifyWorkflowSignature,
  WebhookSignatureError,
} from "../src/webhooks";

// Mirrors the backend: HMAC-SHA256 of the raw body, hex-encoded, `sha256=` prefix.
function createSignature(payload: string | Buffer, secret: string): string {
  const payloadStr =
    typeof payload === "string" ? payload : payload.toString("utf-8");
  const digest = crypto
    .createHmac("sha256", secret)
    .update(Buffer.from(payloadStr, "utf-8"))
    .digest("hex");
  return `sha256=${digest}`;
}

describe("verifyWebhookSignature", () => {
  const secret = "test_secret_key";

  it("should verify a valid signature and map the backend event key", () => {
    // Backend delivery shape: { id, event, timestamp, data }.
    const payload = JSON.stringify({
      id: "del-1",
      event: "geofence.entered",
      timestamp: "2025-10-01T14:30:00Z",
      data: { id: "123" },
    });
    const signature = createSignature(payload, secret);

    const result = verifyWebhookSignature({ payload, signature, secret });

    expect(result.type).toBe("geofence.entered");
    expect(result.id).toBe("del-1");
    expect(result.created_at).toBe("2025-10-01T14:30:00Z");
    expect(result.data.id).toBe("123");
  });

  it("should also accept the legacy { type, created_at } payload shape", () => {
    const payload = JSON.stringify({
      type: "geofence.exit",
      created_at: "2025-10-01T15:00:00Z",
      data: {},
    });
    const signature = createSignature(payload, secret);

    const result = verifyWebhookSignature({ payload, signature, secret });

    expect(result.type).toBe("geofence.exit");
    expect(result.created_at).toBe("2025-10-01T15:00:00Z");
  });

  it("should verify a valid signature with Buffer payload", () => {
    const payload = Buffer.from(JSON.stringify({ event: "test.event" }));
    const signature = createSignature(payload, secret);

    const result = verifyWebhookSignature({ payload, signature, secret });

    expect(result.type).toBe("test.event");
  });

  it("should accept a bare hex digest with no sha256= prefix", () => {
    const payload = JSON.stringify({ event: "test.event" });
    const digest = crypto
      .createHmac("sha256", secret)
      .update(Buffer.from(payload, "utf-8"))
      .digest("hex");

    const result = verifyWebhookSignature({ payload, signature: digest, secret });

    expect(result.type).toBe("test.event");
  });

  it("should throw on missing signature", () => {
    expect(() =>
      verifyWebhookSignature({ payload: "{}", signature: "", secret })
    ).toThrow(/Missing signature/);
  });

  it("should throw on an empty digest", () => {
    expect(() =>
      verifyWebhookSignature({ payload: "{}", signature: "sha256=", secret })
    ).toThrow(/Invalid signature format/);
  });

  it("should reject a non-ASCII signature without throwing a raw error", () => {
    expect(() =>
      verifyWebhookSignature({ payload: "{}", signature: "sha256=éé", secret })
    ).toThrow(WebhookSignatureError);
  });

  it("should throw on wrong secret", () => {
    const payload = JSON.stringify({ type: "test" });
    const signature = createSignature(payload, "correct_secret");

    expect(() =>
      verifyWebhookSignature({ payload, signature, secret: "wrong_secret" })
    ).toThrow(/verification failed/);
  });

  it("should throw on tampered payload", () => {
    const originalPayload = JSON.stringify({ type: "original" });
    const signature = createSignature(originalPayload, secret);

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
    const signature = createSignature(payload, secret);

    expect(() =>
      verifyWebhookSignature({ payload, signature, secret })
    ).toThrow(/Failed to parse webhook payload/);
  });

  it("should accept but ignore the deprecated tolerance option", () => {
    const payload = JSON.stringify({ type: "test" });
    const signature = createSignature(payload, secret);

    const result = verifyWebhookSignature({
      payload,
      signature,
      secret,
      tolerance: 0,
    });

    expect(result.type).toBe("test");
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

describe("verifyWorkflowSignature", () => {
  const secret = "workflow_secret"; // pragma: allowlist secret
  const now = () => Math.floor(Date.now() / 1000);

  // Mirrors the backend: HMAC-SHA256 over `<timestamp>.<body>`.
  function sign(body: string, timestamp: string, key = secret): string {
    const digest = crypto
      .createHmac("sha256", key)
      .update(`${timestamp}.${body}`)
      .digest("hex");
    return `sha256=${digest}`;
  }

  function verify(body: string | Buffer, signature: string, timestamp: string, tolerance?: number) {
    return verifyWorkflowSignature({ payload: body, signature, timestamp, secret, tolerance });
  }

  it("accepts a genuine delivery and returns the parsed body untouched", () => {
    const body = JSON.stringify({ alert: "geofence.enter", event: "x", timestamp: "t" });
    const ts = String(now());

    expect(verify(body, sign(body, ts), ts)).toEqual({
      alert: "geofence.enter",
      event: "x",
      timestamp: "t",
    });
  });

  it("accepts a Buffer payload", () => {
    const body = '{"a":1}';
    const ts = String(now());

    expect(verify(Buffer.from(body), sign(body, ts), ts)).toEqual({ a: 1 });
  });

  it("rejects a forged signature", () => {
    const body = '{"a":1}';
    const ts = String(now());

    expect(() => verify(body, sign(body, ts, "wrong"), ts)).toThrow(/verification failed/);
  });

  it("rejects a tampered body and a changed timestamp", () => {
    const ts = String(now());
    const signature = sign('{"a":1}', ts);

    expect(() => verify('{"a":2}', signature, ts)).toThrow(WebhookSignatureError);
    expect(() => verify('{"a":1}', signature, String(now() + 1))).toThrow(WebhookSignatureError);
  });

  it("rejects a subscription signature", () => {
    const body = '{"a":1}';

    expect(() => verify(body, createSignature(body, secret), String(now()))).toThrow(
      WebhookSignatureError
    );
  });

  it("rejects a stale timestamp", () => {
    const body = '{"a":1}';
    const ts = String(now() - 301);

    expect(() => verify(body, sign(body, ts), ts)).toThrow(/tolerance/);
  });

  it("rejects a future timestamp", () => {
    const body = '{"a":1}';
    const ts = String(now() + 301);

    expect(() => verify(body, sign(body, ts), ts)).toThrow(/tolerance/);
  });

  it("honors a custom tolerance", () => {
    const body = '{"a":1}';
    const ts = String(now() - 600);

    expect(verify(body, sign(body, ts), ts, 900)).toEqual({ a: 1 });
  });

  it.each([undefined, "", "abc", "12.5", "-5", "1e9", "0x10"])(
    "rejects a missing or garbage timestamp (%s)",
    (ts) => {
      const body = '{"a":1}';

      expect(() => verify(body, sign(body, String(now())), ts as string)).toThrow(/timestamp/);
    }
  );

  it.each(["", "sha256=", "sha256=zz", "sha256=00"])(
    "rejects a missing or malformed signature (%s)",
    (signature) => {
      expect(() => verify('{"a":1}', signature, String(now()))).toThrow(WebhookSignatureError);
    }
  );

  it("rejects a body whose bytes were swapped for invalid UTF-8", () => {
    const head = Buffer.from('{"message":"');
    const tail = Buffer.from('"}');
    // U+FFFD is what a UTF-8 decoder substitutes for an invalid byte
    const genuine = Buffer.concat([head, Buffer.from("\ufffd"), tail]);
    const altered = Buffer.concat([head, Buffer.from([0xff]), tail]);
    const ts = String(now());
    const signature = sign(genuine.toString("utf-8"), ts);

    expect(verify(genuine, signature, ts)).toEqual({ message: "\ufffd" });
    expect(() => verify(altered, signature, ts)).toThrow(WebhookSignatureError);
  });

  it("returns a body that isn't JSON as text", () => {
    const body = "alert=entered&zone=dock";
    const ts = String(now());

    expect(verify(body, sign(body, ts), ts)).toBe(body);
  });
});

describe("verifyWebhookSignature is unchanged", () => {
  it("signs the body only and still maps the backend event key", () => {
    const body = JSON.stringify({ id: "d1", event: "webhook.test", data: {} });

    const event = verifyWebhookSignature({
      payload: body,
      signature: createSignature(body, "test_secret_key"),
      secret: "test_secret_key",
      tolerance: 0,
    });

    expect(event.type).toBe("webhook.test");
  });
});
