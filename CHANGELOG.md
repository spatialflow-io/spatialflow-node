# Changelog

All notable changes to the SpatialFlow Node.js SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.2.0] - 2026-10-22

### Added

- `POST /api/v1/devices/batch-update` (spec v1.62.0): each point in `locations` (`LocationUpdateIn`) takes an optional `fix_id`, a UUID string naming the fix. A later point with the same `fix_id` for the same device is answered with status `duplicate` and is not stored, evaluated or counted again, even when its other fields differ. The match holds for at least 48 hours after the first copy is processed. A `fix_id` that is not a UUID rejects only its own point, with error code `INVALID_FIX_ID`. `POST /api/v1/devices/{device_id}/location` ignores the field.

## [3.1.0] - 2026-10-21

### Added

- `GET /api/v1/workflow-runs-to-retry` (spec v1.60.0): the live workflows in the workspace with failed runs that Retry failed runs could queue, by name, as `OperationsApi.appsOperationsApiListWorkflowRunsToRetry()` returning `WorkflowRunsToRetryListOut`: `results` of `WorkflowRunsToRetryOut` (`workflow_id`, `workflow_name`, `retryable_count`, `capped`), `next_cursor` and `has_more`. Pass `cursor` (and optionally `limit`) to continue, or `incident_id` to page through the workflows one incident is about with live counts. Each count looks at a bounded number of the workflow's failed runs, and `capped` marks a lower bound. Owner or manager only; other roles get 403.

### Changed

- `GET /api/v1/devices/dashboard-stats/timeline` (spec v1.57.0): `in_geofence_count` on each bucket (`TimelineBucketOut`) and on `previous` (`TimelinePreviousOut`) can now be null. A bucket that ends before the workspace's location retention cutoff reads null instead of 0, and `previous` reads null when any of its buckets does. Each bucket counts the devices whose position at the bucket's end is inside an active geofence, the same test as the live `in_geofence_count` on `/dashboard-stats`.
- `GET /api/v1/devices/dashboard-stats/timeline` (spec v1.58.0): `live_count` and `offline_stale_count` on each bucket (`TimelineBucketOut`) and on `previous` (`TimelinePreviousOut`) can now be null, like `in_geofence_count`. Both read null when the bucket's live window, the two minutes before its end, starts before the workspace's location retention cutoff, since retention may have deleted the fixes they count, and `previous` reads null when any of its buckets does. Other buckets return the same values as before.

### Deprecated

- `POST /api/v1/auth/oauth/{provider}/link` (spec v1.59.0). It no longer starts a link: every call returns 400, and it never returned the provider's authorization URL, so no call could have completed a link. The generated `AuthenticationApi` keeps `appsAuthenticationOauthApiLinkOauthAccount(provider)` and `OAuthLinkResponse` with the same signature until the next major SDK release removes them. `GET /api/v1/auth/oauth/user/linked-accounts` and `DELETE /api/v1/auth/oauth/{provider}/disconnect` are unchanged.

### Removed

- `GET /api/v1/admin/users/stats` (spec v1.61.0): a platform-admin route that always returned an empty list. No SDK exposed it, so no SDK method is affected.

## [3.0.0] - 2026-10-19

**Breaking changes.** The GPX simulator endpoints and the `gpx_simulator` API are gone from the generated client, and `appsWorkflowsApiExecuteWorkflow(workflowId, executeWorkflowIn?)` takes the optional `test_data` as a JSON request body instead of a `testData` query parameter.

### Added

- Geofence group workflow lookup (spec v1.55.0). `GET /api/v1/geofences/groups/workflows` takes repeated `group_id` and an optional `destination_name` and returns the active workflows whose geofence trigger expands any of those groups (`GroupWorkflowsOut`; each `GroupWorkflowItemOut` has `id`, `name`, the matched `group_ids` and the trigger's own `geofence_ids`), plus `destination_group_id`, the id that name resolves to even when the group has no active members. It needs the `workflows:read` and `geofences:read` permissions.
- Failed workflow runs can be retried (spec v1.53.0). `POST /api/v1/workflows/{workflow_id}/runs/{run_id}/retry` retries one run (`RunRetryOut`). `GET /api/v1/workflows/{workflow_id}/retry-failed-runs` counts the runs a batch would retry (`RetryFailedRunsPreviewOut`, whose `blocked_reason` says why when the workflow itself prevents retries, such as test mode), and `POST` to it queues up to `batch_limit` of them, oldest first (`RetryFailedRunsOut`; `not_queued` lists runs whose retries couldn't be queued). Both POSTs return 409 for a run or batch that can't be retried and 503 when nothing could be queued. Run history executions (`ExecutionOut`) carry optional `retry_of`, `retried_by`, `retryable` and `retry_blocked_reason`.
- Run history actions (`ActionDeliveryOut`) carry two optional properties for a failed webhook delivery: `response_status_code`, the receiver's HTTP status, and `response_excerpt`, the start of its reply as plain text with echoed secrets withheld.
- The Google and Apple mobile token exchanges (`GoogleTokenExchangeResponse`, `AppleTokenExchangeResponse`, spec v1.56.0) carry two optional properties when the request accepted an invitation: `already_member`, true when the account already belonged to the invited workspace, and `role`, the role it holds there. Accepting an invitation never changes an existing member's role.

### Changed

- Creating an integration (`CreateIntegrationSchema`) no longer requires `name`. Leave it out or send it blank, and the API names the integration after its type, numbered when the name is taken ("Webhook", "Webhook 2", ...). The create returns 409 with `error_code` `INTEGRATION_NAME_BUSY` when concurrent creates in the workspace took every name it tried; retry it.
- The generated client is rebuilt from OpenAPI spec v1.52.0. `appsWorkflowsApiExecuteWorkflow(workflowId, executeWorkflowIn?)` takes the optional `test_data` as a JSON request body (`ExecuteWorkflowIn`) instead of a `testData` query parameter, which the endpoint could not parse.

### Fixed

- `paginate` and `collectAll` work on the list endpoints without custom extractors. The default extractors read the `geofences`, `workflows`, `webhooks` and `deliveries` arrays (or a plain array, as the device events endpoint returns), and end the loop from `next`, `pagination.has_more`, `page`/`page_size`/`total` or the `X-Has-More` header, whichever the response has. Geofence lists carry none of these, so a short page ends the loop.
- `maxRetries` takes effect. GET, HEAD, OPTIONS, PUT and DELETE requests are retried up to `maxRetries` times on timeouts, connection failures, and 429, 500, 502, 503 and 504 responses, with exponential backoff, or the `Retry-After` wait when the response has one. A `Retry-After` over 30 seconds is not waited out: the request rejects with the error, whose `retryAfter` says when to retry. POST and PATCH requests are not retried. A request cancelled with an `AbortSignal` rejects with axios's `CanceledError`, including during a retry wait.
- Timeouts reject with `TimeoutError` and connection failures with `ConnectionError`, as the exports suggest. Both extend `SpatialFlowError`, so existing catch blocks still match.
- `pollJob` and `uploadGeofences` treat `timeout` as a wall-clock deadline. Time spent in status calls counts, the wait between polls is cut short at the deadline, and a status call still running then is aborted. `fetchStatus` receives an `AbortSignal` for that call and the rejection is a `JobTimeoutError` even when the call ignores the signal.
- The `SpatialFlow` doc comments show the positional call style and the `.data` response property.

### Removed

- The GPX simulator endpoints (spec v1.54.0): `/api/v1/gpx/routes`, `/api/v1/gpx/routes/upload`, `/api/v1/gpx/routes/{route_id}`, `/api/v1/gpx/routes/{route_id}/playback` and `/api/v1/gpx/playbacks` with its get, pause, resume and cancel routes, along with the `GPXRouteOut`, `GPXPlaybackOut` and `StartPlaybackRequest` models. The feature was retired and the service held no routes or playbacks. The generated client no longer has the `gpx_simulator` API. Geofence uploads still accept GPX files.

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
