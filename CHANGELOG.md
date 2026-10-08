# Changelog

All notable changes to the SpatialFlow Node.js SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-10-08

**Breaking changes.** The generated methods for endpoints that no longer exist are removed. See Removed below.

### Added

- `verifyWorkflowSignature` verifies a workflow Webhook action delivery: `X-SpatialFlow-Signature` (`sha256=<hex>` HMAC-SHA256 over `<timestamp>.<raw body>`) and `X-SpatialFlow-Timestamp`, with a default 300 second tolerance in both directions. A body that isn't JSON is returned as text. `verifyWebhookSignature` is unchanged.
- The generated client is rebuilt from OpenAPI spec v1.36.0, which adds 71 operations since 1.1.0 (shifts, sessions, geofence groups, workspace members and invitations among them).

### Fixed

- **Webhook signature verification**: `verifyWebhookSignature` now matches the platform's `X-SF-Signature: sha256=<hex>` (HMAC-SHA256 over the raw body). The previous implementation expected a Stripe-style `t=<timestamp>,v1=<sig>` header and rejected every real webhook.
- **Webhook payload mapping**: the returned event maps the backend `event` and `timestamp` keys to `type` / `created_at` (still accepting the legacy `type` / `created_at` shape), so `event.type` is populated.
- The `tolerance` option is retained but deprecated and ignored.
- `client.storage.appsStorageApiDeleteFile` takes the `file_id` an upload returned and deletes the file. The previous `(fileType, filename)` form could not find uploaded files.

### Removed

- Generated methods whose endpoints no longer exist in the API; they returned 404. These are the simulation methods (`/simulations`, 15 operations: create, get, list, update, delete, start, stop, pause, resume, reset, events, route upload and removal, track points), the route tester (`/route-tester/test`, 2 operations), the test helpers (`/test/*`, 4 operations: create user, cleanup, seed and clean up E2E data), and the `GET` email verification calls under `/auth/verify-email`, which verification by `POST` replaced.

## [1.1.0] - 2026-04-05

### Added

- `client.storage`, the generated `StorageApi` for presigned uploads, file listing and downloads.

### Changed

- The generated API client is rebuilt from OpenAPI spec v1.1.0. Schemas that were untyped objects are now typed, including geofence geometry, the login response's user, the created API key, workflow import, retry policy, integration configs and simulation details.
- Every operation's generated types include the standard 4xx error responses.
- `VERSION` and the `User-Agent` header report `1.1.0` (they reported `0.1.0` before).

## [0.1.0] - 2025-12-04

### Added

- Initial alpha release
- **Authentication**: API key and JWT token support
- **Client**: `SpatialFlow` client class with resource accessors
- **Resources**: Full CRUD for geofences, workflows, webhooks, devices
- **Pagination**: `paginate()` async generator and `collectAll()` utility
- **Webhook verification**: `verifyWebhookSignature()` with HMAC-SHA256
- **Job polling**: `pollJob()` for async job status tracking
- **File uploads**: `uploadGeofences()` for GeoJSON/KML/GPX imports
- **Typed errors**: `AuthenticationError`, `NotFoundError`, `ValidationError`, etc.
- **TypeScript**: Full type definitions for all APIs and models

### Technical Details

- Generated from OpenAPI spec using openapi-generator-cli 7.10.0
- TypeScript generator with axios HTTP client
- Requires Node.js 18+ (for global fetch in upload helpers)
- Dual ESM/CJS build with tsup
- Dependencies: axios
